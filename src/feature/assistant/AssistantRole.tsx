import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Step from "../../component/Step";
import StepProgress from "../../component/StepProgress";
import type { StepConfig } from "../../type/general";
import { SPECIALTY_ROLES, type Role, type Specialty } from "../../type/assistant";
import RoleCard from "../../component/RoleCard";
import info from "../../assets/assistant/roles/info-circle (1).png"

const STEPS: StepConfig[] = [
  { id: 1, label: "Name your Assistant" },
  { id: 2, label: "Choose Voice" },
  { id: 3, label: "Assistant Roles" },
];



const AssistantRole = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const specialty = location.state?.specialty as Specialty | undefined;
  const assistantName = (location.state?.assistantName as string) || "Assistant";
  const roles: Role[] =
    location.state?.roles ??
    SPECIALTY_ROLES[specialty?.id ?? ""] ??
    SPECIALTY_ROLES.default;

 
  const lockedIds = roles.filter((r) => r.locked).map((r) => r.id);
  const firstOptionalId = roles.find((r) => !r.locked)?.id;
  const optionalRoles = roles.filter((r) => !r.locked || r.id === "answer_calls");
  const lockedRoles = roles.filter((r) => r.locked && r.id !== "answer_calls"); 

  const [selectedRoles, setSelectedRoles] = useState<string[]>([
    ...lockedIds,
    ...(firstOptionalId ? [firstOptionalId] : []),
  ]);

  // ── Modal state ──
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const PHONE_NUMBER = "(555) 987-6543";

  const displayTitle = specialty
    ? `Let's Set Up Your ${specialty.title} Assistant`
    : `Let's Set Up Your ${assistantName}`;

  const toggleRole = (roleId: string) => {
    setSelectedRoles((prev) =>
      prev.includes(roleId) ? prev.filter((id) => id !== roleId) : [...prev, roleId]
    );
  };

  const handleCreate = () => {
    setShowSuccessModal(true);
  };

  const handleGoToDashboard = () => {
    setShowSuccessModal(false);
    navigate("/dashboard", {
      state: { ...location.state, selectedRoles },
    });
  };

  const handleTestAssistant = () => {
    // Handle test assistant action
    console.log("Test Assistant clicked");
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(PHONE_NUMBER.replace(/\D/g, ""));
  };

  
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">

      <div className="sticky top-0 z-50 bg-white">
        <div className="py-5">
          <Step steps={STEPS} currentStep={3} />
        </div>
        <hr className="border-gray-200 w-full" />
      </div>

      {/* ── Back + Step Counter ── */}
      <div className="px-34 pt-12 flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#1F2937] font-semibold text-[18px] hover:text-[#5B0AFF] cursor-pointer transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 17 17" fill="none">
            <path
              d="M10.6211 14.1106L6.00281 9.49229C5.4574 8.94688 5.4574 8.05438 6.00281 7.50896L10.6211 2.89062"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back
        </button>
        <StepProgress currentStep={3} totalSteps={3} />
      </div>

      {/* ── Main Content ── */}
      <div className="flex-1 flex flex-col items-center pt-14 px-4">
        <div className="text-center mb-10">
          <h1 className="text-[29px] font-semibold text-[#1F2937] leading-tight mb-2">
            {displayTitle}
          </h1>
          <p className="text-[#6B7280] font-normal mt-5 mb-12 text-[19px]">
            We'll have your assistant ready in just 3 simple steps
          </p>
        </div>

        <div className="w-full max-w-225">
          <label className="block text-[#1F2937] font-semibold text-[16px] mb-6">
            What should your assistant handle?
          </label>

          {/* ── Optional roles grid ── */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            {optionalRoles.map((role) => (
              <RoleCard
                key={role.id}
                role={role}
                isSelected={selectedRoles.includes(role.id)}
                onToggle={toggleRole}
              />
            ))}
          </div>

          {/* ── Locked (safety) roles — rendered below optional rows ── */}
          {lockedRoles.length > 0 && (
            <div className="grid grid-cols-2 gap-4 mb-8">
              {lockedRoles.map((role) => (
                <RoleCard
                  key={role.id}
                  role={role}
                  isSelected={true}
                  onToggle={() => {}}
                />
              ))}
              {/* Pad grid if odd number of locked roles */}
              {lockedRoles.length % 2 !== 0 && <div />}
            </div>
          )}

          {/* ── Hint Message ── */}
              <div className="bg-[#F5F3FF] rounded-full py-4 px-12 mt-8 flex items-center gap-3 mb-8">
            <div className=" p-1  flex items-center justify-center">
             <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.1641 15.3588H10.8307L7.12239 17.8254C6.57239 18.1921 5.83073 17.8004 5.83073 17.1338V15.3588C3.33073 15.3588 1.66406 13.6921 1.66406 11.1921V6.19206C1.66406 3.69206 3.33073 2.02539 5.83073 2.02539H14.1641C16.6641 2.02539 18.3307 3.69206 18.3307 6.19206V11.1921C18.3307 13.6921 16.6641 15.3588 14.1641 15.3588Z" stroke="#220068" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10.0005 9.4668V9.29183C10.0005 8.72516 10.3505 8.42515 10.7005 8.18348C11.0422 7.95015 11.3838 7.65016 11.3838 7.10016C11.3838 6.33349 10.7672 5.7168 10.0005 5.7168C9.23383 5.7168 8.61719 6.33349 8.61719 7.10016" stroke="#220068" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9.99885 11.4577H10.0064" stroke="#220068" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            </div>
            <p className="text-[#220068] text-[14px] font-medium tracking-tight">Select all that apply. You can always change these later</p>
          </div>

          {/* ── Create Assistant Button ── */}
          <button
            onClick={handleCreate}
            className="w-full py-4 rounded-xl bg-[#5B0AFF] text-white font-semibold text-[15px] transition-all cursor-pointer mb-12 hover:bg-[#4a08d6] active:scale-[0.99]"
          >
            Create Assistant
          </button>
        </div>
      </div>

      {/* ── Success Modal ── */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setShowSuccessModal(false)}
          />

          {/* Modal Card */}
          <div className="relative bg-white rounded-[25px]  w-full max-w-152.5 mx-4 px-20 py-14 flex flex-col items-center text-center">
            
            {/* Animated check icon */}
            <div className="relative mb-6">
              {/* Decorative sparkle dots */}
              <svg width="148" height="97" viewBox="0 0 148 97" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="78.4141" cy="52" r="44" fill="#F5F3FF"/>
              <circle cx="78.4141" cy="52" r="36" fill="#5B0AFF"/>
              <path d="M62.4141 53L73.4141 63L93.4141 42" stroke="white" stroke-width="2"/>
              <circle cx="33.4141" cy="94" r="2.5" fill="#5B0AFF" stroke="#7C3AED"/>
              <path d="M138.414 37.5H147.414M142.918 33.0039V42.0039" stroke="#7C3AED"/>
              <path d="M1.58224 64.6333L13.5936 61.466M6.01089 57.0478L9.17813 69.0592" stroke="#7C3AED"/>
              <circle cx="127.414" cy="93" r="3.5" stroke="#7C3AED"/>
              <circle cx="59.4141" cy="13" r="4.5" stroke="#7C3AED"/>
              <circle cx="124.914" cy="1.5" r="1" stroke="#7C3AED"/>
              </svg>

            </div>

            {/* Title */}
            <h2 className="text-[23px] font-bold text-[#1F2937] leading-snug mb-1">
              Success!<br />Your Assistant is Ready
            </h2>

            {/* Phone number section */}
            <p className="text-[#6B7280] text-[15px] mt-5 mb-1">Your New Phone Number</p>
            <div className="flex items-center gap-2 mb-10">
              <span className="text-[#1F2937] text-[14px] font-bold mt-2 tracking-wide">{PHONE_NUMBER}</span>
              <button
                onClick={handleCopyPhone}
                className="text-[#6B7280] mt-2 hover:text-[#5B0AFF] transition-colors cursor-pointer"
                title="Copy number"
              >
               <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18.0515 8.70139L17.2348 12.1847C16.5348 15.1931 15.1515 16.4097 12.5515 16.1597C12.1348 16.1264 11.6848 16.0514 11.2015 15.9347L9.80145 15.6014C6.32645 14.7764 5.25145 13.0597 6.06812 9.57639L6.88479 6.08472C7.05145 5.37639 7.25145 4.75972 7.50145 4.25139C8.47645 2.23472 10.1348 1.69306 12.9181 2.35139L14.3098 2.67639C17.8015 3.49306 18.8681 5.21806 18.0515 8.70139Z" stroke="#1F2937" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M12.5513 16.1583C12.0346 16.5083 11.3846 16.8 10.5929 17.0583L9.27626 17.4917C5.96793 18.5583 4.22626 17.6667 3.15126 14.3583L2.08459 11.0667C1.01793 7.75833 1.90126 6.00833 5.20959 4.94167L6.52626 4.50833C6.86793 4.4 7.19293 4.30833 7.50126 4.25C7.25126 4.75833 7.05126 5.375 6.88459 6.08333L6.06793 9.575C5.25126 13.0583 6.32626 14.775 9.80126 15.6L11.2013 15.9333C11.6846 16.05 12.1346 16.125 12.5513 16.1583Z" stroke="#1F2937" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>

              </button>
            </div>

            {/* Info banner */}
            <div className="w-full max-w-120 bg-[#F5F3FF] rounded-xl px-4 py-4 flex items-start gap-3 mb-16">
               <img src={info} className="w-[16px] h-[16px]"/>

              <p className="text-[#220068] text-[13px] font-medium text-left leading-6">
                Forward calls from your main line, or give this number directly to patients.
              </p>
            </div>

            {/* CTA Buttons */}
            <button
              onClick={handleGoToDashboard}
              className="w-full py-4 rounded-xl bg-[#5B0AFF] text-white font-semibold text-[15px] hover:bg-[#4a08d6] active:scale-[0.99] transition-all cursor-pointer mb-3"
            >
              Go to Dashboard
            </button>

            <button
              onClick={handleTestAssistant}
              className="w-full py-4 flex rounded-xl items-center justify-center gap-2 text-[#1F2937] font-semibold text-[15px] border border-[#F5F3FF] transition-colors cursor-pointer"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.47 11.47 0 003.58.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.58a1 1 0 01-.25 1.01l-2.2 2.2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Test Assistant
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssistantRole;