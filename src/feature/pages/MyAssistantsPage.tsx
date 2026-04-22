import { useState } from "react";
import type { Specialty } from "../../type/general";
import AssistantModal from "../../component/AssistantModal";
import hospitalIcon from "../../assets/assistant/🏥.png";
import teethIcon from "../../assets/assistant/🦷.png";
import eyeIcon from "../../assets/assistant/👁️.png";
import babyIcon from "../../assets/assistant/👶.png";
import brainIcon from "../../assets/assistant/🧠.png";
import starIcon from "../../assets/assistant/✨.png";
import womanIcon from "../../assets/assistant/🤰.png";
import boneIcon from "../../assets/assistant/🦴.png";
import drugIcon from "../../assets/assistant/💊.png";



const specialties: Specialty[] = [
  {
    id: "general",
    icon: hospitalIcon,
    title: "General Practice",
    description: "Family medicine, internal medicine, and primary care",
    badge: "Most Popular",
    modalDescription: "Family medicine, internal medicine, and primary care",
    handles: ["Appointment scheduling", "Insurance verification", "Referral coordination", "Prescription follow-ups", "Patient triage"],
  },
  {
    id: "dental",
    icon: teethIcon,
    title: "Dental Practice",
    description: "General dentistry, orthodontics, and dental specialists",
    badge: null,
    modalDescription: "General dentistry, orthodontics, and dental specialists",
    handles: ["Appointment scheduling", "Insurance verification", "Treatment questions", "Emergency routing", "Follow-up reminders"],
  },
  {
    id: "optometry",
    icon: eyeIcon,
    title: "Optometry Practice",
    description: "Eye exams, vision care, and optical services",
    badge: null,
    modalDescription: "Eye exams, vision care, and optical services",
    handles: ["Exam scheduling", "Lens & frame inquiries", "Insurance eligibility checks", "Vision plan questions", "Prescription renewals"],
  },
  {
    id: "pediatrics",
    icon: babyIcon,
    title: "Pediatrics",
    description: "Children's healthcare and family-friendly communication",
    badge: "New",
    modalDescription: "Children's healthcare and family-friendly communication",
    handles: ["Well-child visit scheduling", "Vaccine reminders", "Growth & development FAQs", "Parent education", "After-hours triage"],
  },
  {
    id: "mental",
    icon: brainIcon,
    title: "Mental Health",
    description: "Therapy, counseling, and psychiatric services",
    badge: null,
    modalDescription: "Therapy, counseling, and psychiatric services",
    handles: ["Session scheduling", "Crisis resource routing", "Intake form assistance", "Medication questions", "Insurance & billing support"],
  },
  {
    id: "dermatology",
    icon: starIcon,
    title: "Dermatology",
    description: "Skin care, cosmetic procedures, and dermatology",
    badge: null,
    modalDescription: "Skin care, cosmetic procedures, and dermatology",
    handles: ["Appointment booking", "Pre/post-care instructions", "Cosmetic consultation inquiries", "Prescription refill requests", "Follow-up scheduling"],
  },
  {
    id: "obgyn",
    icon: womanIcon,
    title: "OB/GYN",
    description: "Women's health, prenatal care, and gynecology",
    badge: null,
    modalDescription: "Women's health, prenatal care, and gynecology",
    handles: ["OB appointment scheduling", "Prenatal FAQs", "Lab result follow-ups", "Birth plan coordination", "Insurance verification"],
  },
  {
    id: "orthopedics",
    icon: boneIcon,
    title: "Orthopedics",
    description: "Bone, joint, and sports medicine specialists",
    badge: null,
    modalDescription: "Bone, joint, and sports medicine specialists",
    handles: ["Consultation scheduling", "Post-surgery follow-ups", "Physical therapy coordination", "Imaging appointment booking", "Injury assessment routing"],
  },
  {
    id: "pharmacy",
    icon: drugIcon,
    title: "Pharmacy",
    description: "Prescription refills, medication questions, and pharmacy services",
    badge: null,
    modalDescription: "Prescription refills, medication questions, and pharmacy services",
    handles: ["Refill requests", "Drug interaction FAQs", "Insurance & copay questions", "Ready pickup notifications", "Transfer coordination"],
  },
];



const MyAssistantsPage = () => {
  const [activeModal, setActiveModal] = useState<Specialty | null>(null);

  return (
    <div className="min-h-screen justify-center flex flex-col py-20">
      {/* Header */}
      <div className="text-center ">
        <h1
          className="font-bold text-[28px] text-[#1F2937] mb-6 "
        >
          Set Up Your Medical Assistant
        </h1>
        <p className="text-[#6B7280] font-semibold text-[18px] ">
          Choose a template designed for your practice
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 gap-8 max-xl:max-w-300 mt-20 max-w-360 mx-auto"
      
      >
        {specialties.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveModal(item)}
         

           className="bg-white p-10 text-left outline-none cursor-pointer border border-transparent hover:border-[#5B0AFF] relative rounded-[14px] transition-all duration-200 hover:shadow-[0_10px_30px_rgba(91,10,255,0.15)]"
          >
            {item.badge && (
              <span

                className="absolute top-7 right-6 text-[10px] font-medium p-0.5 px-4 rounded-3xl bg-[#F7F3FF] text-[#5B0AFF]"
              >
                {item.badge}
              </span>
            )}

            <div
              style={{
                width: "50px",
                height: "50px",
                background: "#F9FAFB",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.4rem",
                marginBottom: "14px",
              }}
            >
              <img src={item.icon} className="w-10 h-10"/>
            </div>

            <div className="text-[18px] text-[#1F2937] font-semibold mb-1.5" style={{letterSpacing: "-0.01em" }}>
              {item.title}
            </div>

            <p className="text-[#6B7280] text-[14px] m-0 leading-7 mt-2 font-normal">
              {item.description}
            </p>
          </button>
        ))}
      </div>

      {/* Modal */}
      {activeModal && (
        <AssistantModal
          item={activeModal}
          onClose={() => setActiveModal(null)}
          onContinue={() => {
            alert(`Setting up ${activeModal.title}...`);
            setActiveModal(null);
          }}
        />
      )}

     <button
        className="bg-[#5B0AFF] fixed bottom-7 right-7 text-white border-none p-4 rounded-[500px] px-12 font-normal text-[14px] cursor-pointer"
        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.05)"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)"; }}
      >
        Help
      </button>
    </div>
  );
};

export default MyAssistantsPage;