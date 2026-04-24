import { useSearchParams, useNavigate } from "react-router-dom";
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
import type { Specialty } from "../../type/assistant";

const specialties: Specialty[] = [
  {
    id: "general",
    icon: hospitalIcon,
    title: "General Practice",
    description: "Family medicine, internal medicine, and primary care",
    badge: "Most Popular",
    modalDescription: "Perfect for GP surgeries, family medicine clinics, and primary care practices handling a wide range of patient needs.",
    handles: ["Appointment booking & check-ups", "Prescription enquiries", "Referral management", "Test result guidance", "Emergency call routing"],
  },
  {
    id: "dental",
    icon: teethIcon,
    title: "Dental Practice",
    description: "General dentistry, orthodontics, and dental specialists",
    badge: null,
    modalDescription: "Perfect for general dentistry, orthodontics,and dental specialists",
    handles: ["Appointment scheduling", "Insurance verification", "Treatment questions", "Emergency routing", "Follow-up reminders"],
  },
  {
    id: "optometry",
    icon: eyeIcon,
    title: "Optometry Practice",
    description: "Eye exams, vision care, and optical services",
    badge: null,
    modalDescription: "Built for optometry clinics and optical shops managing eye exams, contact lens orders, and eyewear enquiries.",
    handles: ["Eye exam booking", "Contact lens & eyewear orders", "Prescription queries", "Insurance verification", "Post-procedure follow-up"],
  },
  {
    id: "pediatrics",
    icon: babyIcon,
    title: "Pediatrics",
    description: "Children's healthcare and family-friendly communication",
    badge: "New",
    modalDescription: "Tailored for pediatric clinics and children's hospitals. Warm, reassuring tone designed to put parents at ease.",
    handles: ["Well-child & sick visit booking", "Vaccination schedule queries", "Parent & caregiver communication", "Sick child triage guidance", "Emergency escalation"],
  },
  {
    id: "mental",
    icon: brainIcon,
    title: "Mental Health",
    description: "Therapy, counseling, and psychiatric services",
    badge: null,
    modalDescription: "Sensitive, calm communication built for therapy practices and psychiatric clinics. Includes crisis escalation protocols.",
    handles: ["Therapy session booking", "Intake form assistance", "Crisis escalation (hard override)", "After-hours crisis routing", "Session reminders"],
  },
  {
    id: "dermatology",
    icon: starIcon,
    title: "Dermatology",
    description: "Skin care, cosmetic procedures, and dermatology",
    badge: null,
    modalDescription: "For dermatology clinics and medical spas handling skin consultations, cosmetic procedures, and skincare queries.",
    handles: ["Consultation booking", "Procedure enquiries", "Pre & post-procedure instructions", "Insurance verification", "Follow-up care"],
  },
  {
    id: "obgyn",
    icon: womanIcon,
    title: "OB/GYN",
    description: "Women's health, prenatal care, and gynecology",
    badge: null,
    modalDescription: "Designed for obstetrics and gynecology practices. Includes labor & delivery escalation and prenatal care support.",
    handles: ["Prenatal visit booking", "Labour & delivery routing (override)", "Test result guidance", "Post-partum follow-up", "Insurance verification"],
  },
  {
    id: "orthopedics",
    icon: boneIcon,
    title: "Orthopedics",
    description: "Bone, joint, and sports medicine specialists",
    badge: null,
    modalDescription: "For orthopedic surgeons, sports medicine clinics, and physiotherapy practices managing surgical and rehabilitation patients.",
    handles: ["Consultation & surgery booking", "Pre-surgery instructions", "Post-surgery follow-up", "Physiotherapy scheduling", "Imaging enquiries"],
  },
  {
    id: "pharmacy",
    icon: drugIcon,
    title: "Pharmacy",
    description: "Prescription refills, medication questions, and pharmacy services",
    badge: null,
    modalDescription: "For retail pharmacies and hospital dispensaries handling prescription refills, medication queries, and delivery management.",
    handles: ["Prescription refill requests", "Medication availability queries", "Ready notification calls", "Delivery & collection management", "Emergency medication routing"],
  },
];

const MyAssistantsPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const activeId = searchParams.get("specialty");
  const activeModal = specialties.find((s) => s.id === activeId) || null;

  const handleOpenModal = (id: string) => {
    setSearchParams({ specialty: id });
  };

  const handleCloseModal = () => {
    setSearchParams({}); 
  };

  return (
    <div className="min-h-screen justify-center flex flex-col py-20">
      {/* Header */}
      <div className="text-center ">
        <h1 className="font-semibold text-[28px] text-[#1F2937] mb-6 ">
          Set Up Your Medical Assistant
        </h1>
        <p className="text-[#6B7280] font-semibold text-[18px] ">
          Choose a template designed for your practice
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 gap-8 max-xl:max-w-300 mt-20 max-w-360 mx-auto">
        {specialties.map((item) => (
          <button
            key={item.id}
            onClick={() => handleOpenModal(item.id)}
            className="bg-white p-10 text-left outline-none cursor-pointer border border-transparent hover:border-[#5B0AFF] relative rounded-[14px] transition-all duration-200 hover:shadow-[0_0_10px_-2px_rgba(111,66,239,0.4)]"
          >
            {item.badge && (
              <span className="absolute top-7 right-6 text-[10px] font-medium p-0.5 px-4 rounded-3xl bg-[#F7F3FF] text-[#5B0AFF]">
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
              <img src={item.icon} className="w-10 h-10" alt={item.title} />
            </div>

            <div className="text-[18px] text-[#1F2937] font-semibold mb-1.5" style={{ letterSpacing: "-0.01em" }}>
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
          onClose={handleCloseModal}
          onContinue={() => {

            navigate("/my-assistants/setup/name", {
              state: { specialty: activeModal },
            });
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