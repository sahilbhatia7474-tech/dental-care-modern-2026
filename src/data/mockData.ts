import { DentalService, Doctor, ReviewItem } from '../types';

export const CLINIC_SERVICES: DentalService[] = [
  {
    id: 'general',
    icon: '🦷',
    name: 'General Dentistry',
    shortDesc: 'Routine examinations, ultrasonic cleanings, preventive care, composite fillings, and digital X-rays.',
    fullDesc: 'Comprehensive oral health assessments using low-radiation 3D digital imaging, gentle ultrasonic plaque scaling, fluoride mineralization treatments, and mercury-free aesthetic tooth-colored composite restorations.',
    features: ['Comprehensive 3D digital scan', 'Painless ultrasonic scale & polish', 'Tooth-colored biocompatible fillings', 'Oral cancer early screening'],
    estimatedCost: '$90 – $220',
    duration: '45 – 60 mins',
    recovery: 'Immediate',
    category: 'general'
  },
  {
    id: 'cosmetic',
    icon: '💎',
    name: 'Cosmetic Dentistry',
    shortDesc: 'Smile-focused treatments designed to improve appearance naturally with veneers, whitening, and bonding.',
    fullDesc: 'Custom aesthetic smile transformations using porcelain veneers, laser in-office power whitening (up to 8 shades lighter in 1 hour), and composite edge bonding designed with digital smile preview software.',
    features: ['1-Hour Laser Teeth Whitening', 'Handcrafted Porcelain Veneers', 'Minimal-prep Composite Bonding', 'Digital Smile Design simulation'],
    estimatedCost: '$250 – $1,200/tooth',
    duration: '60 – 90 mins',
    recovery: 'Immediate to 2 days',
    category: 'cosmetic'
  },
  {
    id: 'implants',
    icon: '🦷',
    name: 'Dental Implants',
    shortDesc: 'Reliable titanium and zirconia restorative solutions designed for lifetime function, comfort, and confidence.',
    fullDesc: 'Precision surgical placement of biocompatible titanium and ceramic implants using computer-guided 3D surgical guides. Permanent tooth replacements that feel, chew, and look just like natural teeth.',
    features: ['Computer-guided 3D surgical placement', 'Single tooth & All-on-4 full arch', 'Natural-feeling zirconia crowns', 'Lifetime structural warranty'],
    estimatedCost: '$1,500 – $3,200',
    duration: '2 – 3 visits',
    recovery: '3 – 5 days initial healing',
    category: 'restorative'
  },
  {
    id: 'emergency',
    icon: '✚',
    name: 'Emergency Care',
    shortDesc: 'Prompt same-day support when unexpected dental pain, chipped teeth, abscess, or urgent concerns arise.',
    fullDesc: 'Priority emergency response for severe acute toothaches, cracked or knocked-out teeth, lost crowns, painful wisdom teeth, and bleeding gums with gentle immediate pain relief protocols.',
    features: ['Guaranteed same-day triage', 'Immediate digital diagnosis & pain block', 'Emergency tooth re-implantation & splinting', 'Direct on-call dentist line'],
    estimatedCost: '$120 – $350 (Triage + Stabilization)',
    duration: '30 – 60 mins',
    recovery: 'Varies by procedure',
    category: 'emergency'
  },
  {
    id: 'ortho',
    icon: '🦷',
    name: 'Orthodontic Care',
    shortDesc: 'Modern clear aligners and discreet braces to improve alignment, bite mechanics, and oral health.',
    fullDesc: 'Custom clear aligner therapy (Invisalign® & Spark™) and aesthetic ceramic brackets for teens and adults. Straighten teeth comfortably without uncomfortable metal wires or dietary limitations.',
    features: ['Virtually invisible clear aligners', '3D time-lapse tooth movement preview', 'Accelerated tooth movement options', 'Includes post-treatment retainers'],
    estimatedCost: '$2,200 – $4,800 total plan',
    duration: '6 – 18 months',
    recovery: 'Zero downtime',
    category: 'ortho'
  },
  {
    id: 'preventive',
    icon: '🛡️',
    name: 'Preventive & Gum Care',
    shortDesc: 'Personalized periodontal therapy and enamel protection to keep your natural smile healthy for decades.',
    fullDesc: 'Deep periodontal pocket therapy, laser bacterial reduction, saliva pH testing, nightguards for grinding (bruxism), and custom preventive home maintenance regimens tailored to your oral microbiome.',
    features: ['Laser periodontal gum therapy', 'Custom sleep nightguards for grinding', 'Enamel remineralization protocols', 'Microbiome saliva wellness check'],
    estimatedCost: '$110 – $300',
    duration: '45 mins',
    recovery: 'Immediate',
    category: 'preventive'
  }
];

export const CLINIC_DOCTORS: Doctor[] = [
  {
    id: 'dr-sarah-chen',
    name: 'Dr. Sarah Chen, DDS',
    title: 'Lead Cosmetic & Restorative Dentist',
    specialty: 'Aesthetic Smile Design & Porcelain Veneers',
    experienceYears: 14,
    availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    bio: 'Fellow of the American Academy of Cosmetic Dentistry. Passionate about gentle, anxiety-free dentistry.'
  },
  {
    id: 'dr-marcus-vance',
    name: 'Dr. Marcus Vance, DMD, MS',
    title: 'Board-Certified Oral Surgeon & Implantologist',
    specialty: 'Dental Implants, Bone Grafting & Sedation',
    experienceYears: 16,
    availableDays: ['Mon', 'Wed', 'Thu', 'Sat'],
    bio: 'Specialist in minimally invasive 3D guided implant surgeries and emergency trauma restorations.'
  },
  {
    id: 'dr-priya-patel',
    name: 'Dr. Priya Patel, BDS, MS',
    title: 'Orthodontist & Preventive Care Specialist',
    specialty: 'Clear Aligners & Pediatric Dental Care',
    experienceYears: 11,
    availableDays: ['Tue', 'Wed', 'Fri', 'Sat'],
    bio: 'Dedicated to helping patients of all ages achieve balanced, healthy smiles with modern clear aligners.'
  }
];

export const CLINIC_REVIEWS: ReviewItem[] = [
  {
    id: 'r1',
    author: 'Priya M.',
    rating: 5,
    date: '2 days ago',
    service: 'Cosmetic Veneers',
    comment: 'The entire experience felt calm and professional. Dr. Sarah Chen explained every detail of my digital smile preview. My new smile looks completely natural!',
    tag: 'Cosmetic'
  },
  {
    id: 'r2',
    author: 'Rahul K.',
    rating: 5,
    date: '1 week ago',
    service: 'Same-Day Emergency',
    comment: 'I had been avoiding the dentist for years due to anxiety. When an old molar cracked on a Saturday morning, their same-day team had me out of pain within an hour with zero stress.',
    tag: 'Emergency'
  },
  {
    id: 'r3',
    author: 'Ananya S.',
    rating: 5,
    date: '2 weeks ago',
    service: 'Clear Aligners',
    comment: 'From online booking to the monthly check-ins, everything was smooth, clear, and genuinely caring. The 3D scan took less than 5 minutes without goopy molds!',
    tag: 'Orthodontics'
  },
  {
    id: 'r4',
    author: 'David L.',
    rating: 5,
    date: '3 weeks ago',
    service: 'Single Tooth Implant',
    comment: 'Dr. Vance placed my implant with guided 3D technology. I felt no discomfort during the procedure and healed very quickly. Truly world-class clinic standards.',
    tag: 'Implants'
  },
  {
    id: 'r5',
    author: 'Elena R.',
    rating: 5,
    date: '1 month ago',
    service: 'Routine Cleaning & Checkup',
    comment: 'Warm atmosphere, modern equipment, and friendly staff. The ultrasonic cleaning was the most gentle I have ever experienced. Highly recommend DENTAL+.',
    tag: 'General'
  }
];

export const EMERGENCY_FIRST_AID_GUIDES = [
  {
    id: 'knocked-out',
    title: 'Knocked-Out Permanent Tooth',
    urgency: 'Immediate (Within 60 mins)',
    color: 'border-red-500/40 text-red-400',
    steps: [
      'Find the tooth immediately; hold it ONLY by the crown (white top), never touch the root.',
      'If dirty, rinse gently with cold milk or saline for 5 seconds. Do not scrub.',
      'If possible, gently place the tooth back into its socket and bite softly on clean gauze.',
      'Otherwise, submerge the tooth in cold milk or saliva and bring it immediately to the clinic.'
    ]
  },
  {
    id: 'severe-toothache',
    title: 'Severe Throbbing Toothache',
    urgency: 'Same-Day Priority',
    color: 'border-orange-500/40 text-orange-400',
    steps: [
      'Rinse mouth thoroughly with warm salt water (1/2 tsp salt in 1 cup warm water).',
      'Use dental floss to gently remove any lodged food debris between the teeth.',
      'Apply a cold compress to the outside of your cheek (15 mins on, 15 mins off).',
      'Never place aspirin directly on the gums as it causes chemical burns.'
    ]
  },
  {
    id: 'broken-chipped',
    title: 'Chipped or Cracked Tooth',
    urgency: 'Within 24 Hours',
    color: 'border-amber-500/40 text-amber-400',
    steps: [
      'Save any broken tooth fragments in a clean container with milk or saline.',
      'Rinse your mouth gently with warm water to clear sharp debris.',
      'Cover sharp edges with sugar-free gum or dental wax to protect your tongue.',
      'Avoid chewing on that side and avoid very hot or ice-cold beverages.'
    ]
  }
];
