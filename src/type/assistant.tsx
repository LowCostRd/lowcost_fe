import telephone from "../assets/assistant/roles/📞.png";
import clock from "../assets/assistant/roles/⏰.png";
import book from "../assets/assistant/roles/📋.png";
import shield from "../assets/assistant/roles/🛡️.png";
import bell from "../assets/assistant/roles/🔔.png";
import reshare from "../assets/assistant/roles/🔄.png";
import moon from "../assets/assistant/roles/🌙.png";
import pill from "../assets/assistant/roles/💊 (1).png";
import sos from "../assets/assistant/roles/🆘.png";
import hospital from "../assets/assistant/roles/🏥 (2).png";
import mail from "../assets/assistant/roles/📩.png";
import emergency from "../assets/assistant/roles/🚨.png";
import test from "../assets/assistant/roles/🔬.png";
import glasses from "../assets/assistant/roles/👓.png";
import vaccine from "../assets/assistant/roles/💉.png";
import tool from "../assets/assistant/roles/🩺.png";
import parent from "../assets/assistant/roles/👨_👩_👧.png";
import star from "../assets/assistant/roles/✨ (1).png";
import follow from "../assets/assistant/roles/📄.png";
import cream from "../assets/assistant/roles/🧴.png";
import pregnant from "../assets/assistant/roles/🤰.png";
import spark from "../assets/assistant/roles/⚡.png";
import xray from "../assets/assistant/roles/🩻.png";
import boy from "../assets/assistant/roles/🏃.png";
import box from "../assets/assistant/roles/📦.png";
import globe from "../assets/assistant/roles/⚗️.png";
import time from "../assets/assistant/roles/🕐.png";
import van from "../assets/assistant/roles/🚚.png"


export interface StepProgressProps {
  currentStep: number;
  totalSteps: number;
}

export interface Suggestion {
  label: string;
}

export interface AssistantNameConfig {
  title: string;
  subtitle: string;
  inputPlaceholder: string;
  inputHint: string;
  maxLength: number;
  suggestions: Suggestion[];
  steps: { id: number; label: string }[];
  currentStep: number;
}

export interface AssistantNameProps {
  config?: Partial<AssistantNameConfig>;
  onBack?: () => void;
  onNext?: (name: string) => void;
}

export type Specialty = {
  id: string;
  icon: string;
  title: string;
  description: string;
  badge?: string | null;
  modalDescription: string;
  handles: string[];
};


export interface Role {
  id: string;
  title: string;
  description: string;
  icon: string;
  locked?: boolean;
}


export const SPECIALTY_ROLES: Record<string, Role[]> = {
  dental: [
    { id: "answer_calls",      title: "Answer phone calls",          description: "AI answers when patients call your practice, 24/7",              icon: telephone },
    { id: "book_appointments", title: "Book appointments",            description: "Schedule cleanings, checkups, and treatments automatically",      icon: clock },
    { id: "answer_insurance",  title: "Answer insurance questions",   description: "Verify coverage and explain benefits to patients",                icon: hospital },
    { id: "send_reminders",    title: "Send appointment reminders",   description: "Automatically call or text patients before their visit",          icon: bell },
    { id: "followup",          title: "Follow up after visits",       description: "Check in with patients after procedures to ensure recovery",      icon: mail },
    { id: "emergency_routing", title: "Emergency call routing",       description: "Identify urgent cases and transfer to on-call staff",             icon: emergency },
  ],

  mental: [
    { id: "answer_calls",       title: "Answer phone calls",          description: "AI answers when patients call your practice, 24/7",                     icon: telephone },
    { id: "book_appointments",  title: "Book appointments",            description: "Schedule initial consultations, therapy and follow-up sessions",        icon: clock },
    { id: "intake_forms",       title: "Intake form assistance",       description: "Guide new patients through intake questionnaire over the phone",        icon: book },
    { id: "answer_insurance",   title: "Answer insurance questions",   description: "Verify mental health coverage and therapy session limits",              icon: shield},
    { id: "send_reminders",     title: "Send session reminders",       description: "Remind patients of upcoming therapy appointments",                      icon: bell},
    { id: "cancellation",       title: "Cancellation & rescheduling",  description: "Handle session changes with appropriate sensitivity",                   icon: reshare },
    { id: "afterhours_routing", title: "After-hours support routing",  description: "Direct after-hours callers to crisis lines or on-call clinicians",     icon: moon },
    { id: "medication_routing", title: "Medication query routing",     description: "Route psychiatric medication questions to the right clinician",         icon: pill },
    { id: "crisis_escalation",  title: "Crisis escalation",            description: "Always enabled — safety override. Cannot be disabled.",                icon: sos, locked: true },
  ],

  cardiology: [
    { id: "answer_calls",       title: "Answer phone calls",          description: "AI handles patient calls around the clock",                       icon: telephone},
    { id: "book_appointments",  title: "Book appointments",            description: "Schedule consultations and follow-ups automatically",             icon: clock },
    { id: "answer_insurance",   title: "Answer insurance questions",   description: "Verify cardiac procedure coverage and pre-authorizations",        icon: book },
    { id: "send_reminders",     title: "Send appointment reminders",   description: "Remind patients about upcoming tests and check-ups",              icon: shield },
    { id: "medication_refills", title: "Medication refill requests",   description: "Collect and route prescription refill requests to your team",     icon: bell},
    { id: "emergency_routing",  title: "Emergency call routing",       description: "Triage urgent cardiac symptoms and connect to on-call staff",     icon: reshare },
  ],

  dermatology: [
    { id: "answer_calls",      title: "Answer phone calls",          description: "AI answers when patients call your clinic, 24/7",                 icon: telephone},
    { id: "book_appointments", title: "Book appointments",            description: "Schedule skin consultations, screenings and cosmetic procedures",        icon: clock },
    { id: "procedure_enquires",  title: "Procedure enquiries",   description: "Answer questions about treatments like Botox, fillers and laser",              icon: star },
    { id: "clarification",  title: "Answer insurance questions",   description: "Clarify what's covered — medical vs cosmetic procedures",              icon: shield },
    { id: "send_reminders",    title: "Send appointment reminders",   description: "Remind parents before consultations and procedures",       icon: bell},
    { id: "instruction",    title: "Pre-procedure instructions",   description: "Send patients preparation instructions before their visit",       icon: follow},
    { id: "emergency_routing", title: "Emergency call routing",       description: "Escalate urgent skin reactions or post-procedure complications",     icon: emergency},
    { id: "followup",          title: "Follow up after treatments",   description: "Check in with patients post-treatment for recovery support",             icon: mail },
    { id: "skincare_enquries",          title: "Product & skincare queries",   description: "Answer questions about prescribed skincare products",             icon: cream },
  ],

    general: [
    { id: "answer_calls",      title: "Answer phone calls",          description: "AI answers when patients call your clinic, 24/7",                 icon: telephone},
    { id: "book_appointments", title: "Book appointments",            description: "Schedule GP visits, check ups and consultations",        icon: clock },
    { id: "answer_insurance",  title: "Prescription enquiries",   description: "Handle repeat prescription request and queries",              icon: pill },
    { id: "referral",    title: "Referral management",   description: "Assist patients with specialist referral questions",       icon: book},
    { id: "result",          title: "Test result inquiries",   description: "Guide patients on how to access their results",             icon: test },
    { id: "insurance", title: "Answer insurance questions",       description: "Verify coverage and explain accepted plans",     icon: shield},
    { id: "reminder",          title: "Send appointment reminders",   description: "Automatically remind patients before their visit",             icon: bell },
    { id: "emergency_routing", title: "Emergency call routing",       description: "Identify urgent cases and transfer to on-call staff",     icon: emergency},
    { id: "followup",          title: "Follow up after visits",   description: "Check in with patients after consultations",             icon: mail },

  ],

  optometry: [
    { id: "answer_calls",      title: "Answer phone calls",          description: "AI answers when patients call your clinic, 24/7",                 icon: telephone},
    { id: "book_appointments", title: "Book appointments",            description: "Schedule eye exams, contact lens fitting and consultation",        icon: clock },
    { id: "eye_wear", title: "Eye wear & contact lens orders",            description: "Help patients order glasses, lenses and accessories",        icon: glasses },
    { id: "insurance", title: "Answer insurance questions",       description: "Verify vision coverage and explain optical benefits",     icon: shield},
    { id: "prescription",  title: "Prescription enquiries",   description: "Guide patients on their eye prescription details",              icon: pill },
    { id: "reminder",          title: "Send appointment reminders",   description: "Remind patients of upcoming eye exams",             icon: bell },
    { id: "followup",          title: "Follow up after visits",   description: "Check in with patients after procedures like cataract surgery",             icon: mail },
    { id: "emergency_routing", title: "Emergency call routing",       description: "Route urgent eye injury or sudden vision loss calls immediately",     icon: emergency},
  ],

    pediatrics: [
    { id: "answer_calls",      title: "Answer phone calls",          description: "AI answers when patients call your clinic, 24/7",                 icon: telephone},
    { id: "book_appointments", title: "Book appointments",            description: "Schedule well-child visits, vaccination and sick visits",        icon: clock },
    { id: "vaccine", title: "Vaccination & immunization",            description: "Answer questions about vaccine schedules and availability",        icon: vaccine },
    { id: "insurance", title: "Answer insurance questions",       description: "Verify child health coverage and explain benefits",     icon: shield},
    { id: "reminder",          title: "Send appointment reminders",   description: "Remind parents before scheduled visits",             icon: bell },
    { id: "triad",          title: "Sick child triage guidance",   description: "Help parents determine urgency and next steps",             icon: tool },
    { id: "emergency_routing", title: "Emergency call routing",       description: "Immediately escalate urgent pediatric emergencies to staff",     icon: emergency},
    { id: "followup",          title: "Follow up after visits",   description: "Check in with parents after procedures or sick visits",             icon: mail },
    { id: "Parent communication",          title: "Follow up after visits",   description: "Send updates and health tips to parents or caregiver between visits",  icon: parent },

  ],

    obgyn: [
    { id: "answer_calls",       title: "Answer phone calls",          description: "AI answers when patients call your practice, 24/7",                     icon: telephone },
    { id: "book_appointments",  title: "Book appointments",            description: "Schedule prenatal visits, annual exams and consultations",        icon: clock },
    { id: "care",               title: "Prenatal care enquiries",       description: "Answer questions about pregnancy milestones and prenatal visits",        icon: pregnant },
    { id: "answer_insurance",   title: "Answer insurance questions",   description: "Verify maternity coverage and explain prenatal benefits",              icon: shield},
    { id: "send_reminders",     title: "Send appointment reminders",       description: "Remind patients of upcoming prenatal and gynecology visits",                      icon: bell},
    { id: "result",          title: "Test results guidance",   description: "Guide patients on accessing ultrasound and lab results",             icon: test },
    { id: "emergency_routing", title: "Emergency call routing",       description: "Escalate urgent obstetric emergencies immediately",     icon: emergency},
    { id: "followup",          title: "Follow up after delivery",   description: "Post-partum check-in calls for new mothers",             icon: mail },
    { id: "labour",  title: "Labor & delivery routing",            description: "Always enabled — safety override. Cannot be disabled.",                icon: spark, locked: true },
  ],

    orthopedics: [
    { id: "answer_calls",      title: "Answer phone calls",          description: "AI answers when patients call your clinic, 24/7",                 icon: telephone},
    { id: "book_appointments", title: "Book appointments",            description: "Schedule consultations, post-surgery follow-ups and physio sessions",        icon: clock },
    { id: "instruction",    title: "Pre-surgery instructions",   description: "Send patients preparation guidelines before orthopedic procedures",       icon: follow},
    { id: "clarification",  title: "Answer insurance questions",   description: "Verify coverage for surgical procedures and physiotherapy",              icon: shield },
    { id: "send_reminders",    title: "Send appointment reminders",   description: "Remind patients before consultations and surgery dates",       icon: bell},
    { id: "physiotherapy_scheduling",  title: "Physiotherapy scheduling",   description: "Book and manage physiotherapy and rehabilitation sessions",              icon: boy },
    { id: "emergency_routing", title: "Emergency call routing",       description: "Escalate acute trauma, fracture or post-surgical complications",     icon: emergency},
    { id: "followup",          title: "Post-surgery follow up",   description: "Check in with patients on recovery progress and wound healing",             icon: mail },
    { id: "xray",          title: "X-ray & imaging enquiries",   description: "Guide patients on accessing imaging results and reports",             icon: xray },
  ],


    pharmacy: [
    { id: "answer_calls",      title: "Answer phone calls",          description: "AI answers when patients call your clinic, 24/7",                 icon: telephone},
    { id: "refill_request", title: "Prescription refill requests",            description: "Accept and process repeat prescription refill requests",        icon: reshare },
    { id: "queries",  title: "Medication availability queries",   description: "Check and communicate medication stock availability",              icon: box },
    {id: "insurance", title: "Insurance & coverage queries",       description: "Verify prescription coverage and co-pay information",     icon: shield},
    { id: "reminder",          title: "Prescription notifications",   description: "Notify patients when their prescription is ready for collection",             icon: bell },
    { id: "drug_interaction_queries", title: "Drug interaction queries",       description: "Route complex drug interaction questions to the pharmacist",     icon: globe},
    { id: "emergency_routing", title: "Emergency medication routing",       description: "Escalate urgent medication needs to on-call pharmacist",     icon: emergency},
    { id: "opening_hours_location",    title: "Opening hours & location",   description: "Answer questions about pharmacy hours and branch locations",       icon: time},
    { id: "delivery",          title: "Delivery & collection",   description: "Handle prescription delivery requests and collection scheduling",             icon: van },


  ],


  default: [
    { id: "answer_calls",      title: "Answer phone calls",          description: "AI answers when patients call your practice, 24/7",               icon: telephone },
    { id: "book_appointments", title: "Book appointments",            description: "Schedule patient visits and follow-ups automatically",            icon: clock },
    { id: "send_reminders",    title: "Send appointment reminders",   description: "Automatically call or text patients before their visit",          icon: shield },
    { id: "emergency_routing", title: "Emergency call routing",       description: "Immediately escalate urgent pediatric emergencies to staff",             icon: reshare },
  ],
};