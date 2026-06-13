import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import type { StepConfig } from "../../type/general";
import Step from "../../component/Step";
import StepProgress from "../../component/StepProgress";
import type { AssistantNameConfig, AssistantNameProps, Specialty} from "../../type/assistant";
import { useAgentStore } from "../../store/AssistantStore";
import Icons from "../../assets/Icons";


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

  const { createAgent, updateAgentName, updateAgentSpecialty, isLoading, agentId, agentName, agentSpecialty, setAgent } = useAgentStore();
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


  useEffect(() => {
    if (agentId && agentName && name === "") {
      setName(agentName);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  const goNext = (id: string) => {
    if (onNext) {
      onNext(name.trim());
    } else {
      setTimeout(() => {
        navigate("/my-assistants/setup/voice", {
          state: {
            assistantName: name.trim(),
            specialty: specialty,
            agentId: id,
          },
        });
      }, 1000);
    }
  };

  const handleNext = async () => {
    if (!name.trim()) return;

    // No agent yet → create
    if (!agentId) {
      if (!specialty?.title) {
        toast.error("Specialty not found. Please go back and select one.");
        return;
      }

      const payload = {
        name: name.trim(),
        specialty: specialty.title,
      };

      try {
        const newAgentId = await createAgent(payload);
        setAgent({ agentId: newAgentId, agentName: name.trim(), agentSpecialty: specialty.title });

        toast.success("Agent created successfully!", {
          position: "top-right",
          autoClose: 4000,
          style: { fontSize: "16px" },
        });

        goNext(newAgentId);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Something went wrong";
        toast.error(message);
      }

      return;
    }

    // Agent exists → check what changed
    const nameChanged = agentName !== name.trim();
    const specialtyChanged = !!specialty?.title && agentSpecialty !== specialty.title;

    if (!nameChanged && !specialtyChanged) {
      goNext(agentId);
      return;
    }

    try {
      if (nameChanged) {
        await updateAgentName(agentId, name.trim());
      }
      if (specialtyChanged) {
        await updateAgentSpecialty(agentId, specialty!.title);
      }

      setAgent({
        agentId,
        agentName: name.trim(),
        agentSpecialty: specialtyChanged ? specialty!.title : agentSpecialty || undefined,
      });

      toast.success("Assistant updated!", {
        position: "top-right",
        autoClose: 4000,
        style: { fontSize: "16px" },
      });

      goNext(agentId);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      toast.error(message);
    }
  };
  const handleSuggestion = (label: string) => {
    setName((prev) => (prev === label ? "" : label.slice(0, merged.maxLength)));
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <ToastContainer />
      {/* ── Step Progress Bar ── */}
      <div className="sticky top-0 z-50 bg-white">
        <div className="py-5">
          <Step steps={STEPS} currentStep={1} />
        </div>
        <hr className="border-gray-200 w-full" />
      </div>

      {/* ── Back + Step Counter ── */}
      <div className="px-34 pt-12 flex items-center justify-between">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-[#1F2937] font-semibold text-[18px] hover:text-[#5B0AFF] cursor-pointer"
        >
          <svg width="14" height="14" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.6211 14.1106L6.00281 9.49229C5.4574 8.94688 5.4574 8.05438 6.00281 7.50896L10.6211 2.89062" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
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
          <h1 className="text-[29px] font-semibold text-[#1F2937] leading-tight mb-2">
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
                  className={`px-4 py-2 rounded-full text-[13px] cursor-pointer font-medium transition-all
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
            disabled={!name.trim() || isLoading}
            className={`w-full py-4 rounded-xl text-white font-semibold text-[15px] transition-all cursor-pointer flex items-center justify-center min-h-[52px]
              ${
                name.trim() && !isLoading
                  ? "bg-[#5B0AFF] hover:bg-[#4A08D4] active:scale-[0.99]"
                  : "bg-[#C4B5FD] cursor-not-allowed"
              }`}
          >
            {isLoading ? (
              <span className="inline-flex items-center justify-center w-5 h-5">
                {Icons.SpinningIcon}
              </span>
            ) : (
              "Next"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssistantName;