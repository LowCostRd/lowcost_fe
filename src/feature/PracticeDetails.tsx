import { useState } from "react";
import Onboarding from "../component/Onboarding";
import PractitionerDropdown from "../component/PractitionerDropdown";
import Step from "../component/Step";
import arrLeft from "../assets/general/arrow-left.png";
import type { StepConfig } from "../type/general";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import { useGetStore } from "../store/GetStore";
import { useAuthStore } from "../store/AuthStore";
import { handleRegisterPracticeDetails } from "../services/authService";
import Icons from "../assets/Icons";

const INSURANCE_PLANS_BY_COUNTRY: Record<string, string[]> = {
  Australia: [
    "Medicare (Australia)",
    "Medibank",
    "Bupa Australia",
    "HCF",
    "NIB Health Funds",
    "HBF Health",
    "Australian Unity",
    "CBHS Health Fund",
    "Defence Health",
    "Frank Health Insurance",
    "Private Pay / Self-Pay",
    "Other",
  ],
  Brazil: [
    "Unimed",
    "Bradesco Saúde",
    "SulAmérica Saúde",
    "Amil",
    "Hapvida",
    "NotreDame Intermédica",
    "Porto Seguro Saúde",
    "Prevent Senior",
    "Cassi",
    "Geap Saúde",
    "SUS (Sistema Único de Saúde)",
    "Private Pay / Self-Pay",
    "Other",
  ],
  Canada: [
    "Provincial Health Insurance (OHIP / AHCIP / MSP etc.)",
    "Sun Life Financial",
    "Manulife",
    "Great-West Life (Canada Life)",
    "Blue Cross Canada",
    "Green Shield Canada",
    "Desjardins Insurance",
    "Industrial Alliance",
    "Chambers of Commerce Group Insurance",
    "TELUS Health",
    "Private Pay / Self-Pay",
    "Other",
  ],
  France: [
    "Assurance Maladie (CPAM)",
    "MGEN",
    "Harmonie Mutuelle",
    "Malakoff Humanis",
    "Axa Santé",
    "April Santé",
    "Allianz Santé",
    "Swiss Life France",
    "Groupama Santé",
    "Generali Santé",
    "Private Pay / Self-Pay",
    "Other",
  ],
  Germany: [
    "AOK",
    "Techniker Krankenkasse (TK)",
    "BARMER",
    "DAK-Gesundheit",
    "KKH",
    "HEK",
    "Allianz Private Krankenversicherung",
    "DKV (Deutsche Krankenversicherung)",
    "AXA Krankenversicherung",
    "Debeka",
    "Private Pay / Self-Pay",
    "Other",
  ],
  Ireland: [
    "VHI Healthcare",
    "Laya Healthcare",
    "Irish Life Health",
    "HSE (Health Service Executive)",
    "GloHealth",
    "Aviva Health",
    "Private Pay / Self-Pay",
    "Other",
  ],
  Japan: [
    "National Health Insurance (Kokumin Kenko Hoken)",
    "Employee Health Insurance (Kenpo)",
    "Japan Health Insurance Association (Kyokai Kenpo)",
    "Mutual Aid Association Insurance",
    "Late-stage Medical Care System (Kouki Koreisha)",
    "Sony Health Insurance",
    "Hitachi Health Insurance",
    "Private Pay / Self-Pay",
    "Other",
  ],
  Netherlands: [
    "Zilveren Kruis",
    "CZ",
    "VGZ",
    "Menzis",
    "DSW Zorgverzekeraar",
    "ONVZ",
    "A.S.R. Zorgverzekering",
    "ENO Zorgverzekering",
    "Zorg en Zekerheid",
    "Private Pay / Self-Pay",
    "Other",
  ],
  "New Zealand": [
    "ACC (Accident Compensation Corporation)",
    "Southern Cross Health Insurance",
    "nib New Zealand",
    "AIA New Zealand",
    "Cigna New Zealand",
    "Partners Life",
    "Fidelity Life",
    "Private Pay / Self-Pay",
    "Other",
  ],
  "South Africa": [
    "Discovery Health",
    "Bonitas Medical Fund",
    "Momentum Health",
    "Medihelp",
    "GEMS (Government Employees Medical Scheme)",
    "Bestmed",
    "Fedhealth",
    "Profmed",
    "Sizwe Hosmed",
    "KeyHealth",
    "Private Pay / Self-Pay",
    "Other",
  ],
  Switzerland: [
    "CSS Versicherung",
    "Helsana",
    "Swica",
    "Concordia",
    "Visana",
    "Sanitas",
    "KPT",
    "Assura",
    "Groupe Mutuel",
    "Atupri",
    "Private Pay / Self-Pay",
    "Other",
  ],
  "United States": [
    "Aetna",
    "Blue Cross Blue Shield",
    "Cigna",
    "Humana",
    "HMO",
    "Medicare",
    "Medicaid",
    "United Healthcare",
    "Anthem",
    "Kaiser Permanente",
    "Molina Healthcare",
    "Oscar Healthcare",
    "Wellcare",
    "Private Pay / Self-Pay",
    "Other",
  ],
  "United Kingdom": [
    "NHS (National Health Service)",
    "Bupa UK",
    "AXA Health",
    "Aviva Health UK",
    "Vitality Health",
    "Nuffield Health",
    "WPA (Western Provident Association)",
    "The Exeter",
    "Simplyhealth",
    "Freedom Health Insurance",
    "Private Pay / Self-Pay",
    "Other",
  ],
  Other: [
    "Public / National Health Insurance",
    "Private Pay / Self-Pay",
    "Other",
  ],
};

const STEPS: StepConfig[] = [
  { id: 1, label: "Account setup" },
  { id: 2, label: "Verify email" },
  { id: 3, label: "Practice identity" },
  { id: 4, label: "Practice details" },
  { id: 5, label: "Compliance & terms" },
];

const PracticeDetails = () => {
  const location = useLocation();
  const country: string = location.state?.country || "Other";

  const insurancePlans =
    INSURANCE_PLANS_BY_COUNTRY[country] ?? INSURANCE_PLANS_BY_COUNTRY["Other"];

  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [practitioners, setPractitioners] = useState("");
  const [selectedPlans, setSelectedPlans] = useState<Set<string>>(new Set());
  const [errors, setErrors] = useState({
    phone: false,
    practitioners: false,
    plans: false,
  });
    const { get_user_by_id } = useGetStore();
    const {registerPracticeDetails,isLoading } = useAuthStore();
    const navigate = useNavigate();
    const user_id = location.state?.user_id || "";

  const togglePlan = (plan: string) => {
    setSelectedPlans((prev) => {
      const next = new Set(prev);
      if (next.has(plan)) next.delete(plan);
      else next.add(plan);
      return next;
    });
    if (errors.plans) setErrors((prev) => ({ ...prev, plans: false }));
  };



  const handleContinue = async () => {
    const newErrors = {
      phone: phone.trim() === "",
      practitioners: practitioners === "",
      plans: selectedPlans.size === 0,
    };
    setErrors(newErrors);
    if (Object.values(newErrors).some(Boolean)) return;

  
      if (!user_id) {
        toast.error("User Id not found. Please login again.");
        return;
      }
       
      try{

         const user = await get_user_by_id({ 
          id: user_id 
        });

        if (!user || !user._id) {
        throw new Error("Unable to retrieve user information.");
      }

 

        const payload = {
          user_id: user._id,
          main_phone_number: phone,
         website: website|| "",
         number_of_practitioners: practitioners,
        insurance_plans: Array.from(selectedPlans)
      };

         await handleRegisterPracticeDetails({
            data: payload,
            register_practice_details: registerPracticeDetails,
            navigate,
          });

      } catch (err) {
    const message = err instanceof Error ? err.message : "Something went wrong";
    toast.error(message);
  }

  };

  const isFormComplete =
    phone.trim() !== "" && practitioners !== "" && selectedPlans.size > 0;

  return (
    <div>
      <Onboarding>
      <ToastContainer />

        <div className="w-full">
          <div className="sticky top-0 z-50">
            <Step steps={STEPS} currentStep={4} />
            <hr className="border-gray-200 w-full" />
          </div>

          <div className="mt-30 w-full max-w-180.5 mx-auto">
            <h1
              className="font-semibold text-[28px] text-[#1F2937] mb-3"
              style={{ letterSpacing: 1 }}
            >
              Practice Details
            </h1>
            <p className="text-[14px] text-[#1F2937] mb-10">
              The AI uses this to answer patient questions accurately from day one.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-[14px] font-semibold text-[#1F2937] mb-3">
                  Main phone number *
                </label>
                <input
                  type="text"
                  placeholder="Ex. (555) 100-2000"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (errors.phone)
                      setErrors((prev) => ({ ...prev, phone: false }));
                  }}
                  className={`w-full h-16 px-8 border rounded-lg text-[14px] text-[#1F2937] focus-within:border-[#7c3aed] caret-[#7c3aed] placeholder-[#9498B8] outline-none transition
                    ${errors.phone ? "border-[#CA2044] bg-[#FFF1F4]" : "border-[#94A3B8]"}`}
                />
                {errors.phone ? (
                  <p className="text-[13px] text-[#CA2044] mt-1">
                    Phone number is required
                  </p>
                ) : (
                  <p className="text-[13px] text-[#606671] font-normal mt-2">
                    Your existing number, separate from your AI line
                  </p>
                )}
              </div>

              <div>
                <label className="block text-[14px] font-semibold text-[#1F2937] mb-3">
                  Website <span className="font-normal">(optional)</span>
                </label>
                <input
                  type="text"
                  placeholder="Ex. www.hospital.com"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="w-full h-16 px-8 border border-[#94A3B8] rounded-lg text-[14px] text-[#1F2937] focus-within:border-[#7c3aed] caret-[#7c3aed] placeholder-[#9498B8] outline-none"
                />
              </div>
            </div>

            {/* Practitioners */}
            <div className="mb-10">
              <label className="block text-[14px] font-semibold text-[#1F2937] mb-3">
                Number of practitioners *
              </label>
              <PractitionerDropdown
                value={practitioners}
                onChange={(val) => {
                  setPractitioners(val);
                  if (errors.practitioners)
                    setErrors((prev) => ({ ...prev, practitioners: false }));
                }}
                hasError={errors.practitioners}
              />
              {errors.practitioners && (
                <p className="text-[13px] text-[#CA2044] mt-1">
                  Please select a range
                </p>
              )}
            </div>

            {/* Insurance plans */}
            <div className="mb-12">
              <label className="block text-[14px] font-semibold text-[#1F2937]">
                Accepted insurance plans *
              </label>
              <p className="text-[13px] text-[#6B7280] font-normal mb-5">
                The AI will confirm these plans when patients ask about coverage.
              </p>
              <div className="flex flex-wrap gap-5">
                {insurancePlans.map((plan) => (
                  <button
                    key={plan}
                    type="button"
                    onClick={() => togglePlan(plan)}
                    className={`px-4 py-1.5 rounded-full text-[13px] transition-all cursor-pointer
                      ${
                        selectedPlans.has(plan)
                          ? "bg-[#F3EDFF] text-[#5B0AFF] font-medium"
                          : "bg-[#F7F7F8] text-[#606671] font-medium"
                      }`}
                  >
                    {plan}
                  </button>
                ))}
              </div>
              {errors.plans && (
                <p className="text-[13px] text-[#CA2044] mt-2">
                  Select at least one option
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Link to="/practice-identity">
                <button className="flex items-center gap-2 h-16.5 px-8 outline-none bg-[#F7F6FA] rounded-lg text-[14px] font-semibold text-[#6B7280] cursor-pointer">
                  <img src={arrLeft} alt="" className="w-7 h-7" />
                  Go back
                </button>
              </Link>
              <button
                onClick={handleContinue}
                className={`flex-1 h-16.5 text-white font-semibold rounded-lg text-[14px] w-100.5 cursor-pointer
                  ${isFormComplete ? "bg-[#5B0AFF]" : "bg-[#9B6AFF]"}`}
              >
                   {isLoading ? (Icons.SpinningIcon) : "Continue"}
              </button>
            </div>
          </div>
        </div>
      </Onboarding>
    </div>
  );
};

export default PracticeDetails;