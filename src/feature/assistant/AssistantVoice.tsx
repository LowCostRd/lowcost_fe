import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Step from "../../component/Step";
import StepProgress from "../../component/StepProgress";
import type { StepConfig } from "../../type/general";
import type { Specialty } from "../../type/assistant";
import evelynIcon from "../../assets/assistant/voice/dp.png";
import michealIcon from "../../assets/assistant/voice/Mask group (22).png";
import williamIcon from "../../assets/assistant/voice/Mask group (23).png";
import mannyIcon from "../../assets/assistant/voice/dp (1).png";
import liamIcon from "../../assets/assistant/voice/Mask group (24).png";
import sandraIcon from "../../assets/assistant/voice/Mask group (25).png"

interface Voice {
  id: string;
  name: string;
  gender: "Female" | "Male";
  description: string;
  avatar: string;
}

const VOICES: Voice[] = [
  { id: "evelyn", name: "Evelyn AI", gender: "Female", description: "Warm and friendly", avatar: evelynIcon },
  { id: "michael", name: "Michael AI", gender: "Male", description: "Professional and clear", avatar: michealIcon},
  { id: "william", name: "William AI", gender: "Male", description: "Calm and reassuring", avatar: williamIcon },
  { id: "manny", name: "Manny AI", gender: "Female", description: "Soft and empathetic", avatar: mannyIcon },
  { id: "liam", name: "Liam AI", gender: "Male", description: "Confident and authoritative", avatar: liamIcon},
  { id: "sandra", name: "Sandra AI", gender: "Female", description: "Energetic and upbeat", avatar: sandraIcon },
];

const STEPS: StepConfig[] = [
  { id: 1, label: "Name your Assistant" },
  { id: 2, label: "Choose Voice" },
  { id: 3, label: "Assistant Roles" },
];

const AssistantVoice = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [selectedVoice, setSelectedVoice] = useState<string>("evelyn");
  const [showAll, setShowAll] = useState(false);

  const specialty = location.state?.specialty as Specialty | undefined;
  const assistantName = location.state?.assistantName as string || "Assistant";

  const displayTitle = specialty 
    ? `Let's Set Up Your ${specialty.title} Assistant`
    : `Let's Set Up Your ${assistantName}`;

  const visibleVoices = showAll ? VOICES : VOICES.slice(0, 3);

  const handleNext = () => {
    navigate("/my-assistants/setup/roles", { 
      state: { ...location.state, selectedVoice } 
    });
  };

  const handlePlayAudio = (voiceId: string) => {
    console.log(`Playing preview for: ${voiceId}`);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      {/* ── Step Progress Bar ── */}
      <div className="sticky top-0 z-50 bg-white">
        <div className="py-5">
          <Step steps={STEPS} currentStep={2} />
        </div>
        <hr className="border-gray-200 w-full" />
      </div>

      {/* ── Back + Step Counter ── */}
      <div className="px-34 pt-12 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[#1F2937] font-semibold text-[18px] hover:text-[#5B0AFF] cursor-pointer transition-colors">
          <svg width="14" height="14" viewBox="0 0 17 17" fill="none">
            <path d="M10.6211 14.1106L6.00281 9.49229C5.4574 8.94688 5.4574 8.05438 6.00281 7.50896L10.6211 2.89062" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back
        </button>
        <StepProgress currentStep={2} totalSteps={3} />
      </div>

      {/* ── Main Content ── */}
      <div className="flex-1 flex flex-col items-center pt-14 px-4">
        <div className="text-center mb-4">
          <h1 className="text-[29px] font-bold text-[#1F2937] leading-tight mb-2">{displayTitle}</h1>
          <p className="text-[#6B7280] font-normal mt-5 mb-20 text-[19px]">We'll have your assistant ready in just 3 simple steps</p>
        </div>

        <div className="w-full max-w-200">
          <label className="block text-[#1F2937] font-semibold text-[16px] mb-6">Choose a voice for your assistant</label>

          <div className="space-y-4 mb-8">
            {visibleVoices.map((voice) => (
              <div
                key={voice.id}
                onClick={() => setSelectedVoice(voice.id)}
                className={`relative flex items-center p-6 rounded-2xl border cursor-pointer transition-all duration-200 ${
                  selectedVoice === voice.id 
                    ? "border-[#5B0AFF] bg-[#F5F3FF] shadow-[0_0_10px_-2px_rgba(111,66,239,0.4)]" 
                    : "border-[#94A3B8] bg-white "
                }`}
              >
                <img src={voice.avatar} alt={voice.name} className="w-20 h-20 rounded-full object-cover mr-5" />
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="font-semibold text-[#1F2937] text-[16px]">{voice.name}</h3>
                    <span className="text-[11px] w-20 text-center  rounded-full bg-[#F3EDFF] text-[#5B0AFF] font-medium  ">
                      {voice.gender}
                    </span>
                  </div>
                  <p className="text-[#6B7280] text-[15px] font-normal">{voice.description}</p>
                </div>

                {/* Speaker + Tooltip Container */}
                <div className="relative group/tooltip">
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-black text-white text-[12px] py-1.5 px-3 rounded-lg opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20">
                    Listen
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-black"></div>
                  </div>

                  <button
                    onClick={() => handlePlayAudio(voice.id)}
                    className={`p-3 rounded-full transition-all border cursor-pointer ${
                      selectedVoice === voice.id 
                      ? "bg-[#5B0AFF] border-[#5B0AFF] text-white shadow-md" 
                      : "bg-white border-gray-200 text-[#6B7280] hover:bg-gray-50"
                    }`}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 9.99979V13.9998C2 15.9998 3 16.9998 5 16.9998H6.43C6.8 16.9998 7.17 17.1098 7.49 17.2998L10.41 19.1298C12.93 20.7098 15 19.5598 15 16.5898V7.40979C15 4.42979 12.93 3.28979 10.41 4.86979L7.49 6.69979C7.17 6.88979 6.8 6.99979 6.43 6.99979H5C3 6.99979 2 7.99979 2 9.99979Z" stroke="currentColor" stroke-width="1.5"/>
                    <path d="M18 8C19.78 10.37 19.78 13.63 18 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M19.8281 5.5C22.7181 9.35 22.7181 14.65 19.8281 18.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>

                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Hint Message */}
          <div className="bg-[#F5F3FF] rounded-full py-4 px-12 flex items-center gap-3 mb-8">
            <div className=" p-1  flex items-center justify-center">
             <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.1641 15.3588H10.8307L7.12239 17.8254C6.57239 18.1921 5.83073 17.8004 5.83073 17.1338V15.3588C3.33073 15.3588 1.66406 13.6921 1.66406 11.1921V6.19206C1.66406 3.69206 3.33073 2.02539 5.83073 2.02539H14.1641C16.6641 2.02539 18.3307 3.69206 18.3307 6.19206V11.1921C18.3307 13.6921 16.6641 15.3588 14.1641 15.3588Z" stroke="#220068" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M10.0005 9.4668V9.29183C10.0005 8.72516 10.3505 8.42515 10.7005 8.18348C11.0422 7.95015 11.3838 7.65016 11.3838 7.10016C11.3838 6.33349 10.7672 5.7168 10.0005 5.7168C9.23383 5.7168 8.61719 6.33349 8.61719 7.10016" stroke="#220068" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M9.99885 11.4577H10.0064" stroke="#220068" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>

            </div>
            <p className="text-[#220068] text-[14px] font-medium tracking-tight">Click the speaker icon to hear each voice</p>
          </div>

          {/* See More Toggle */}
          <div className="relative flex items-center justify-end mb-12">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#E5E7EB]"></div>
            </div>
            <button 
              onClick={() => setShowAll(!showAll)}
              className="relative bg-white px-6 text-[#6B7280] text-[14px] font-normal  flex items-center gap-2 cursor-pointer transition-colors"
            >
              Show {showAll ? "Less" : "3 More"} Voices
              <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg"
              className={`transition-transform duration-300 ${showAll ? "rotate-180" : ""}`}
              >
                <path d="M14.1106 6.37495L9.49229 10.9933C8.94688 11.5387 8.05438 11.5387 7.50896 10.9933L2.89063 6.37495" stroke="#6B7280" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>

            </button>
          </div>

          <button
            onClick={handleNext}
            className="w-full py-4 rounded-xl bg-[#5B0AFF]  text-white font-semibold text-[15px] transition-all cursor-pointer mb-12 "
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssistantVoice;