export interface DentalService {
  id: string;
  icon: string;
  name: string;
  shortDesc: string;
  fullDesc: string;
  features: string[];
  estimatedCost: string;
  duration: string;
  recovery: string;
  category: 'general' | 'cosmetic' | 'restorative' | 'emergency' | 'ortho' | 'preventive';
}

export interface Doctor {
  id: string;
  name: string;
  title: string;
  specialty: string;
  experienceYears: number;
  availableDays: string[];
  photoUrl?: string;
  bio: string;
}

export interface AppointmentRequest {
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
  status: 'confirmed' | 'pending' | 'rescheduled';
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  urgencyLevel?: 'low' | 'moderate' | 'high' | 'emergency';
  suggestedService?: string;
  quickAction?: {
    type: 'book' | 'emergency' | 'view_service';
    label: string;
    payload?: string;
  };
}

export interface ReviewItem {
  id: string;
  author: string;
  location?: string;
  avatarUrl?: string;
  rating: number;
  date: string;
  service: string;
  comment: string;
  tag: string;
  verifiedGoogle?: boolean;
}

export interface SymptomResult {
  triageLevel: 'Routine' | 'Moderate Attention' | 'Urgent' | 'Dental Emergency';
  summary: string;
  recommendedService: string;
  homeCareTips: string[];
  whenToSeekImmediateCare: string;
}
