import express from 'express';
import path from 'path';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory store for appointments during the session
interface StoredAppointment {
  id: string;
  confirmationCode: string;
  patientName: string;
  phone: string;
  email?: string;
  serviceId: string;
  serviceName: string;
  doctorId?: string;
  doctorName?: string;
  date: string;
  timeSlot: string;
  notes?: string;
  urgency: 'routine' | 'urgent' | 'emergency';
  status: 'confirmed' | 'pending';
  createdAt: string;
}

const appointmentsStore: StoredAppointment[] = [
  {
    id: 'demo-1',
    confirmationCode: 'DEN-49102',
    patientName: 'Sarah Jenkins',
    phone: '+91 9953239674',
    email: 'sarah.j@example.com',
    serviceId: 'general',
    serviceName: 'General Dentistry - Comprehensive Cleaning',
    doctorId: 'dr-sarah-chen',
    doctorName: 'Dr. Sarah Chen, DDS',
    date: '2026-08-16',
    timeSlot: '10:00 AM',
    notes: 'Routine 6-month checkup and cleaning.',
    urgency: 'routine',
    status: 'confirmed',
    createdAt: new Date().toISOString()
  }
];

// Lazy Gemini API client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });
  }
  return aiClient;
}

// 1. Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    clinic: 'DENTAL+ Modern Care',
    geminiConfigured: Boolean(process.env.GEMINI_API_KEY)
  });
});

// 2. Chat / AI Dental Assistant endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, userMessage } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      // Graceful fallback if no API key is set
      const lower = (userMessage || '').toLowerCase();
      let fallbackText = "Hello! I am your DENTAL+ Virtual Patient Assistant. How can I assist you with your dental care today?";
      let urgency: 'low' | 'moderate' | 'high' | 'emergency' = 'low';
      let suggestedService = 'General Dentistry';

      if (lower.includes('pain') || lower.includes('ache') || lower.includes('hurt')) {
        urgency = 'high';
        suggestedService = 'Emergency Care';
        fallbackText = "I understand you are experiencing dental pain. For acute pain, we recommend rinsing with warm salt water, applying a cold compress to your cheek, and avoiding chewing on that side. We advise scheduling a same-day evaluation so our dentists can resolve the root cause.";
      } else if (lower.includes('whiten') || lower.includes('veneer') || lower.includes('cosmetic')) {
        suggestedService = 'Cosmetic Dentistry';
        fallbackText = "Our cosmetic dental offerings include 1-Hour In-Office Laser Teeth Whitening (up to 8 shades brighter) and bespoke Porcelain Veneers. Would you like to schedule a digital smile preview consultation?";
      } else if (lower.includes('implant') || lower.includes('missing')) {
        suggestedService = 'Dental Implants';
        fallbackText = "Dental implants provide permanent, natural-feeling restorations using 3D guided computer placement. We offer complimentary implant consultations with digital CT scans.";
      } else if (lower.includes('aligner') || lower.includes('brace') || lower.includes('straight')) {
        suggestedService = 'Orthodontic Care';
        fallbackText = "We offer discreet Clear Aligners (Invisalign® & Spark™) to gently straighten your teeth with no food restrictions and virtual progress tracking.";
      }

      return res.json({
        content: fallbackText,
        urgencyLevel: urgency,
        suggestedService
      });
    }

    const systemInstruction = `You are "Dr. Pearl", the intelligent and compassionate virtual patient assistant for DENTAL+ (a modern high-tech dental clinic).
Your goal is to provide warm, medically sound dental education, triage patient symptoms, guide them on home comfort measures, explain procedures, and encourage appropriate clinic appointments.

CLINIC INFORMATION:
- Clinic: DENTAL+ Modern Dentistry
- Hours: Mon-Sat 9:00 AM - 7:00 PM, Sunday by appointment. Same-day emergency slots always reserved.
- Phone: +91 9953239674
- Contact / Lead: Sahil Bhatia (Email: sahilbhatia7474@gmail.com)
- Key doctors:
  * Dr. Sarah Chen, DDS (Cosmetic Dentistry, Veneers, Digital Smile Design)
  * Dr. Marcus Vance, DMD, MS (Board-Certified Oral Surgeon, Guided Implants, Sedation)
  * Dr. Priya Patel, BDS, MS (Orthodontics, Clear Aligners, Pediatric & Preventive)
- Core services: General Dentistry, Cosmetic Dentistry, Dental Implants, Emergency Care, Orthodontic Care, Preventive & Gum Care.

GUIDELINES:
1. Always maintain a calming, professional, empathetic tone.
2. If patient describes severe pain, facial swelling, trauma, knocked-out tooth, or heavy bleeding, mark as Emergency / Urgent immediately and give clear safety steps (e.g. cold compress, keep tooth in milk, do not place aspirin on gums).
3. Always clarify that while you offer clinical guidance, a physical dental exam with digital imaging is required for formal diagnosis.
4. Conclude with a helpful suggestion or offer to help book their appointment with the best specialist.`;

    // Construct conversation history for Gemini
    const contents: any[] = [];
    if (Array.isArray(messages) && messages.length > 0) {
      for (const m of messages.slice(-8)) {
        if (m.role === 'user' || m.role === 'assistant') {
          contents.push({
            role: m.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: m.content }]
          });
        }
      }
    }
    contents.push({
      role: 'user',
      parts: [{ text: userMessage }]
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents,
      config: {
        systemInstruction,
        temperature: 0.7
      }
    });

    const text = response.text || "I am here to help with all your dental care questions. Would you like to schedule an appointment or explore our services?";

    // Derive urgency level
    let urgencyLevel: 'low' | 'moderate' | 'high' | 'emergency' = 'low';
    const lowerText = (userMessage + ' ' + text).toLowerCase();
    if (lowerText.includes('knocked out') || lowerText.includes('severe swelling') || lowerText.includes('unbearable') || lowerText.includes('emergency') || lowerText.includes('abscess')) {
      urgencyLevel = 'emergency';
    } else if (lowerText.includes('pain') || lowerText.includes('ache') || lowerText.includes('swollen') || lowerText.includes('chipped') || lowerText.includes('broken')) {
      urgencyLevel = 'high';
    } else if (lowerText.includes('sensitive') || lowerText.includes('bleeding gums') || lowerText.includes('stain')) {
      urgencyLevel = 'moderate';
    }

    // Derive suggested service
    let suggestedService = 'General Dentistry';
    if (lowerText.includes('implant') || lowerText.includes('missing tooth')) suggestedService = 'Dental Implants';
    else if (lowerText.includes('whiten') || lowerText.includes('veneer') || lowerText.includes('cosmetic')) suggestedService = 'Cosmetic Dentistry';
    else if (lowerText.includes('align') || lowerText.includes('brace') || lowerText.includes('crooked')) suggestedService = 'Orthodontic Care';
    else if (urgencyLevel === 'emergency' || urgencyLevel === 'high') suggestedService = 'Emergency Care';

    res.json({
      content: text,
      urgencyLevel,
      suggestedService
    });
  } catch (error: any) {
    console.error('Error in /api/chat:', error);
    res.status(500).json({
      error: 'Failed to process AI assistant query',
      content: "I'm temporarily experiencing a connection issue. Please feel free to call our emergency hotline at +91 9953239674 or use the online booking form below."
    });
  }
});

// 3. Symptom Checker AI Endpoint
app.post('/api/symptom-check', async (req, res) => {
  try {
    const { primaryConcern, painScale, duration, symptoms } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      // Fallback structured result
      const isHigh = Number(painScale) >= 7 || (symptoms || []).includes('swelling') || primaryConcern === 'trauma';
      return res.json({
        triageLevel: isHigh ? 'Dental Emergency' : 'Moderate Attention',
        summary: `Assessment for ${primaryConcern || 'dental concern'}: Reported discomfort level ${painScale}/10.`,
        recommendedService: isHigh ? 'Emergency Care' : 'General Dentistry',
        homeCareTips: [
          'Rinse gently with warm salt water every 3 hours.',
          'Avoid chewing directly on the affected side.',
          'Apply an external cold pack if swelling or heat is felt.'
        ],
        whenToSeekImmediateCare: 'If you experience facial swelling spreading to the eye/neck, fever, or difficulty swallowing, contact our emergency line immediately.'
      });
    }

    const prompt = `Analyze this dental patient symptom profile and return practical clinical triage advice:
- Primary Concern: ${primaryConcern}
- Pain Scale (1-10): ${painScale}
- Duration: ${duration}
- Associated Symptoms: ${Array.isArray(symptoms) ? symptoms.join(', ') : symptoms}

Provide a concise, reassuring patient triage response with:
1. Triage Level: ("Routine", "Moderate Attention", "Urgent", or "Dental Emergency")
2. Summary: (2-3 sentences explaining what could be happening)
3. Recommended Service: ("General Dentistry", "Cosmetic Dentistry", "Dental Implants", "Emergency Care", "Orthodontic Care", or "Preventive & Gum Care")
4. Home Care Tips: (array of 3 specific, safe soothing actions)
5. When to seek immediate care: (1 clear red flag sentence)`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });

    const parsed = JSON.parse(response.text || '{}');
    res.json({
      triageLevel: parsed.triageLevel || (Number(painScale) >= 7 ? 'Dental Emergency' : 'Moderate Attention'),
      summary: parsed.summary || 'Our dental team recommends an in-person evaluation with digital X-rays to inspect the tooth root and surrounding tissue.',
      recommendedService: parsed.recommendedService || 'General Dentistry',
      homeCareTips: parsed.homeCareTips || [
        'Rinse gently with warm salt water.',
        'Use over-the-counter anti-inflammatory as directed.',
        'Avoid extreme hot, cold, or sugary foods.'
      ],
      whenToSeekImmediateCare: parsed.whenToSeekImmediateCare || 'Seek immediate care if swelling spreads or pain prevents sleep.'
    });
  } catch (error) {
    console.error('Error in /api/symptom-check:', error);
    res.status(500).json({ error: 'Failed to analyze symptoms' });
  }
});

// 4. Appointment creation endpoint
app.post('/api/appointments', (req, res) => {
  try {
    const {
      patientName,
      phone,
      email,
      serviceId,
      serviceName,
      doctorId,
      doctorName,
      date,
      timeSlot,
      notes,
      urgency
    } = req.body;

    if (!patientName || !phone || !date || !timeSlot) {
      return res.status(400).json({ error: 'Missing required appointment fields (patientName, phone, date, timeSlot).' });
    }

    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const confirmationCode = `DEN-${randomSuffix}`;

    const newAppointment: StoredAppointment = {
      id: `apt-${Date.now()}`,
      confirmationCode,
      patientName,
      phone,
      email: email || '',
      serviceId: serviceId || 'general',
      serviceName: serviceName || 'General Dentistry',
      doctorId: doctorId || 'dr-sarah-chen',
      doctorName: doctorName || 'Dr. Sarah Chen, DDS',
      date,
      timeSlot,
      notes: notes || '',
      urgency: urgency || 'routine',
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    appointmentsStore.unshift(newAppointment);

    res.status(201).json({
      success: true,
      message: 'Appointment scheduled successfully!',
      appointment: newAppointment
    });
  } catch (error) {
    console.error('Error in /api/appointments:', error);
    res.status(500).json({ error: 'Failed to schedule appointment' });
  }
});

// 5. Appointment lookup endpoint
app.get('/api/appointments', (req, res) => {
  const { code, phone } = req.query;

  if (code) {
    const found = appointmentsStore.find(
      (a) => a.confirmationCode.toLowerCase() === String(code).trim().toLowerCase()
    );
    return res.json({ appointments: found ? [found] : [] });
  }

  if (phone) {
    const found = appointmentsStore.filter((a) =>
      a.phone.replace(/\D/g, '').includes(String(phone).replace(/\D/g, ''))
    );
    return res.json({ appointments: found });
  }

  // Return last 10 for demo/manage purposes
  res.json({ appointments: appointmentsStore.slice(0, 10) });
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Dental Care Applet Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
