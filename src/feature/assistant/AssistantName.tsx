import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { StepConfig } from "../../type/general";
import Step from "../../component/Step";
import StepProgress from "../../component/StepProgress";
import type { AssistantNameConfig, AssistantNameProps, Specialty } from "../../type/assistant";





const defaultConfig: AssistantNameConfig = {
  title: "Let's Set Up Your Assistant",
  subtitle: "We'll have your assistant ready in just 3 simple steps",
  inputPlaceholder: "Ex. Front Desk Assistant",
  inputHint: "Choose a name that makes sense for your team",
  maxLength: 40,
  suggestions: [
    { label: "Front Desk Assistant" },
    { label: "Patient Coordinator" },
    { label: "Booking Assistant" },
    { label: "Reception AI" },
    { label: "Care Coordinator" },
  ],
  steps: [
    { id: 1, label: "Name your Assistant" },
    { id: 2, label: "Choose Voice" },
    { id: 3, label: "Assistant Roles" },
  ],
  currentStep: 1,
};


const AssistantName = ({ config, onBack, onNext }: AssistantNameProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const specialty = location.state?.specialty as Specialty | undefined;


  const STEPS: StepConfig[] = defaultConfig.steps;

  const merged: AssistantNameConfig = {
    ...defaultConfig,
    ...config,
    title: config?.title
      ? config.title
      : specialty
      ? `Let's Set Up Your ${specialty.title} Assistant`
      : defaultConfig.title,
  };

  const [name, setName] = useState("");

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  const handleNext = () => {
    if (!name.trim()) return;
    if (onNext) {
      onNext(name.trim());
    } else {
      navigate("/my-assistants/setup/voice", { 
      state: { 
        assistantName: name.trim(),
        specialty: specialty 
      } 
    });
    }
  };


const handleSuggestion = (label: string) => {
  setName(prev => prev === label ? "" : label.slice(0, merged.maxLength));
};

{merged.suggestions.map((s, i) => (
  <button
    key={i}
    onClick={() => handleSuggestion(s.label)}
    className={`px-4 py-2 rounded-full border text-[13px] font-medium transition-all
      ${
        name === s.label
          ? "border-[#5B0AFF] bg-[#F7F3FF] text-[#5B0AFF]"
          : "border-gray-200 text-gray-600 hover:border-[#5B0AFF] hover:text-[#5B0AFF] hover:bg-[#F7F3FF]"
      }`}
  >
    {s.label}
  </button>
))}

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      {/* ── Step Progress Bar ── */}
        <div className="sticky top-0 z-50">
            <div className="py-5">
                 <Step steps={STEPS} currentStep={1} />
            </div>
            <hr className="border-gray-200 w-full" />
          </div>

      {/* ── Back + Step Counter ── */}
      <div className="px-34  pt-12 flex items-center justify-between">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-[#1F2937] font-semibold text-[18px] hover:text-[#5B0AFF] cursor-pointer"
        >
          <svg width="14" height="14" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.6211 14.1106L6.00281 9.49229C5.4574 8.94688 5.4574 8.05438 6.00281 7.50896L10.6211 2.89062" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>

          Back
        </button>

            <StepProgress 
            currentStep={merged.currentStep} 
            totalSteps={merged.steps.length} 
        />
   
      </div>

      {/* ── Main Content ── */}
      <div className="flex-1 flex flex-col items-center pt-14">
          <div className="text-center mb-4">
            <h1 className="text-[29px] font-bold text-[#1F2937] leading-tight mb-2">
              {merged.title}
            </h1>
            <p className="text-[#6B7280] font-normal mt-5 mb-20 text-[19px]">{merged.subtitle}</p>
          </div>
        <div className="w-full max-w-200">
        

          <div className="mb-16">
            <label className="block text-[#1F2937] font-semibold text-[16px] mb-6">
              What should we call your assistant?
            </label>
            <input
              type="text"
              value={name}
              maxLength={merged.maxLength}
              onChange={(e) => setName(e.target.value)}
              placeholder={merged.inputPlaceholder}
              className="w-full h-17 px-8 border border-[#94A3B8] rounded-lg text-[14px] text-[#1F2937] focus-within:border-[#7c3aed] caret-[#7c3aed] placeholder-[#9498B8] outline-none"
            />
            <div className="flex items-center justify-between mt-2 px-0.5">
              <span className="text-[#606671] text-[13px]">{merged.inputHint}</span>
              <span className="text-[#606671] text-[13px]">
                {name.length}/{merged.maxLength}
              </span>
            </div>
          </div>

          <div className="mb-20">
            <p className="text-[#1F2937] text-[13px] font-normal mb-5">Suggestions:</p>
            <div className="flex flex-wrap gap-2">
              {merged.suggestions.map((s, i) => (
                <button
                  key={i}
                  onClick={() => handleSuggestion(s.label)}
                  className={`px-4 py-2 rounded-full  text-[13px] cursor-pointer font-medium transition-all
                    ${
                      name === s.label
                        ? "bg-[#F3EDFF] text-[#5B0AFF] font-medium"
                        : "bg-[#F7F7F8] text-[#606671] font-medium"
                    }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleNext}
            disabled={!name.trim()}
            className={`w-full py-4 rounded-xl text-white font-semibold text-[15px] transition-all cursor-pointer
              ${
                name.trim()
                  ? "bg-[#5B0AFF] hover:bg-[#4A08D4] active:scale-[0.99]"
                  : "bg-[#C4B5FD] cursor-not-allowed"
              }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssistantName;