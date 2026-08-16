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
    id: 'dr-sahil',
    name: 'Dr. Sahil Bhatia, BDS, MDS',
    title: 'Lead Dental Surgeon & Implantologist',
    specialty: '3D Guided Implants, Cosmetic Smile Design & Emergency Care',
    experienceYears: 12,
    availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    bio: 'Specialist in painless dentistry, 3D computer-guided implants, laser dentistry, and modern aesthetic smile design in Delhi.'
  },
  {
    id: 'dr-ananya-sharma',
    name: 'Dr. Ananya Sharma, BDS, MDS (Ortho)',
    title: 'Senior Orthodontist & Clear Aligner Specialist',
    specialty: 'Clear Aligners (Invisalign®) & Aesthetic Braces',
    experienceYears: 10,
    availableDays: ['Mon', 'Wed', 'Thu', 'Fri', 'Sat'],
    bio: 'Certified Clear Aligner provider dedicated to gentle, predictable smile straightening for teens and adults.'
  },
  {
    id: 'dr-rohit-verma',
    name: 'Dr. Rohit Verma, BDS, MDS (Endo)',
    title: 'Microscopic Endodontist & Restorative Specialist',
    specialty: 'Single-Sitting Painless RCT & Laser Gum Therapy',
    experienceYears: 11,
    availableDays: ['Tue', 'Wed', 'Thu', 'Fri', 'Sun'],
    bio: 'Expert in rotary single-visit root canal treatments with digital apex locators and ultrasonic disinfection.'
  }
];

export const CLINIC_REVIEWS: ReviewItem[] = [
  {
    id: 'r1',
    author: 'Rohan Sharma',
    location: 'South Delhi, New Delhi',
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=256&q=80',
    rating: 5,
    date: '3 days ago',
    service: 'Laser Teeth Whitening & Veneers',
    comment: 'Dr. Sahil and the entire clinic team in Delhi are unbelievable! I did the 1-hour laser whitening and composite bonding before my wedding. The results look so natural and bright without any sensitivity. 5-star experience from start to finish!',
    tag: 'Cosmetic',
    verifiedGoogle: true
  },
  {
    id: 'r2',
    author: 'Ananya Verma',
    location: 'Greater Kailash, Delhi',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80',
    rating: 5,
    date: '1 week ago',
    service: 'Custom Clear Aligners',
    comment: 'I was hesitant about traditional braces in my 20s. Dr. Sahil mapped my teeth with the 3D digital scanner in under 5 minutes without messy impression trays. 6 months into clear aligners and my smile has completely transformed. Highly recommended in Delhi!',
    tag: 'Orthodontics',
    verifiedGoogle: true
  },
  {
    id: 'r3',
    author: 'Dr. Vikram Malhotra',
    location: 'Connaught Place, Delhi',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
    rating: 5,
    date: '2 weeks ago',
    service: '3D Guided Dental Implant',
    comment: 'As a surgeon myself, I appreciate precision. Dr. Sahil placed my titanium molar implant using 3D guided computer planning. The procedure was genuinely painless, healed smoothly in days, and feels 100% like my natural tooth.',
    tag: 'Implants',
    verifiedGoogle: true
  },
  {
    id: 'r4',
    author: 'Pooja Kapoor',
    location: 'Dwarka, New Delhi',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&q=80',
    rating: 5,
    date: '3 weeks ago',
    service: 'Emergency Cracked Tooth & RCT',
    comment: 'Called their emergency line at +91 9953239674 on a Saturday morning when my tooth cracked during breakfast. They gave me a priority same-day slot within 45 minutes and relieved the acute pain immediately. Lifesavers!',
    tag: 'Emergency',
    verifiedGoogle: true
  },
  {
    id: 'r5',
    author: 'Aditya Mehra',
    location: 'Saket, South Delhi',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80',
    rating: 5,
    date: '1 month ago',
    service: 'Ultrasonic Cleaning & Routine Scan',
    comment: 'Cleanest and most modern clinic I have visited in Delhi. The ultrasonic cleaning was super gentle, zero gum pain, and upfront transparent pricing with zero surprise charges.',
    tag: 'General',
    verifiedGoogle: true
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
