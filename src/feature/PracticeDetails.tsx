import { useState } from "react";
import Onboarding from "../component/Onboarding";
import PractitionerDropdown from "../component/PractitionerDropdown";
import Step from "../component/Step";
import arrLeft from "../assets/general/arrow-left.png";

interface StepConfig {
  id: number;
  label: string;
}

const INSURANCE_PLANS = [
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
];

const STEPS: StepConfig[] = [
  { id: 1, label: "Account setup" },
  { id: 2, label: "Verify email" },
  { id: 3, label: "Practice identity" },
  { id: 4, label: "Practice details" },
  { id: 5, label: "Compliance & terms" },
];

const PracticeDetails = () => {
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [practitioners, setPractitioners] = useState("");
  const [selectedPlans, setSelectedPlans] = useState<Set<string>>(new Set());
  const [errors, setErrors] = useState({
    phone: false,
    practitioners: false,
    plans: false,
  });

  const togglePlan = (plan: string) => {
    setSelectedPlans((prev) => {
      const next = new Set(prev);
      if (next.has(plan)) {
        next.delete(plan);
      } else {
        next.add(plan);
      }
      return next;
    });
    if (errors.plans) setErrors((prev) => ({ ...prev, plans: false }));
  };

  const handleContinue = () => {
    const newErrors = {
      phone: phone.trim() === "",
      practitioners: practitioners === "",
      plans: selectedPlans.size === 0,
    };
    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(Boolean);
    if (!hasErrors) {
      // proceed to next step
    }
  };

  const isFormComplete =
  phone.trim() !== "" &&
  practitioners !== "" &&
  selectedPlans.size > 0;

  return (
    <div>
      <Onboarding>
        <div className="w-full">
          <Step steps={STEPS} currentStep={4} />
          <hr className="border-gray-200 w-full" />

          <div className="mt-14 lg:px-10 xl:px-36">
            <h1
              className="font-semibold text-[30px] text-[#1F2937] mb-2"
              style={{ letterSpacing: 1 }}
            >
              Practice Details
            </h1>
            <p className="text-[15px] text-[#1F2937] mb-8">
              The AI uses this to answer patient questions accurately from day one.
            </p>

   
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-[15px] font-semibold text-[#1F2937] mb-1">
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
                  className={`w-full  h-10.5 px-3 border rounded-lg text-[14px] text-[#1F2937] placeholder-[#9498B8] outline-none transition
                    ${
                      errors.phone
                        ? "border-[#CA2044] bg-[#FFF1F4]"
                        : "border-[#94A3B8]"
                    }`}
                />
                {errors.phone ? (
                  <p className="text-xs text-[#CA2044] mt-1">
                    Phone number is required
                  </p>
                ) : (
                  <p className="text-xs text-[#606671] font-normal mt-1">
                    Your existing number, separate from your AI line
                  </p>
                )}
              </div>

              <div>
                <label className="block text-[15px] font-semibold text-[#1F2937] mb-1">
                  Website{" "}
                  <span className="font-normal">(optional)</span>
                </label>
                <input
                  type="text"
                  placeholder="Ex. www.hospital.com"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="w-full h-10.5 px-3 border border-[#94A3B8] rounded-lg text-sm text-[#1F2937] placeholder-[#9498B8] outline-none"
                />
              </div>
            </div>

            {/* Practitioners */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-[#1F2937] mb-1">
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
                <p className="text-xs text-[#CA2044] mt-1">
                  Please select a range
                </p>
              )}
            </div>

            {/* Insurance plans */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-[#1F2937] mb-1">
                Accepted insurance plans *
              </label>
              <p className="text-xs text-[#6B7280] font-normal mb-3">
                The AI will confirm these plans when patients ask about coverage.
              </p>
              <div className="flex flex-wrap gap-2">
                {INSURANCE_PLANS.map((plan) => (
                  <button
                    key={plan}
                    type="button"
                    onClick={() => togglePlan(plan)}
                    className={`px-4 py-1.5 rounded-full text-sm transition-all cursor-pointer
                      ${
                        selectedPlans.has(plan)
                          ? "bg-[#F3EDFF]  text-[#5B0AFF] font-medium"
                          : "bg-[#F7F7F8] text-[#606671] "
                      }`}
                  >
                    {plan}
                  </button>
                ))}
              </div>
              {errors.plans && (
                <p className="text-xs text-[#CA2044] mt-2">
                  Select at least one option
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button className="flex items-center gap-2 h-11.5 px-6 outline-none bg-[#F7F6FA] rounded-lg text-sm font-semibold text-[#6B7280] cursor-pointer">
              <img src={arrLeft} alt="" className="w-4.5 h-4.5" />
              Go back
            </button>
             <button
              onClick={handleContinue}
              className={`flex-1 h-11.5 text-white font-semibold rounded-lg text-sm  cursor-pointer
                ${isFormComplete ? "bg-[#5B0AFF]" : "bg-[#7C3AED]"}`}
            >
              Continue
            </button>
            </div>
          </div>
        </div>
      </Onboarding>
    </div>
  );
};

export default PracticeDetails;