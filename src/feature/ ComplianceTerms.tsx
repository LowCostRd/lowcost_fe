import { useState } from "react";
import Onboarding from "../component/Onboarding";
import Step from "../component/Step";
import { Link } from "react-router-dom";
import arrLeft from "../assets/general/arrow-left.png";
import hospitalIcon from "../assets/onboarding/hospital.png";
import documentIcon from "../assets/onboarding/document-text.png";
import shieldIcon from "../assets/onboarding/shield-security.png";
import editIcon from "../assets/onboarding/edit-2.png";

interface StepConfig {
  id: number;
  label: string;
}

interface Agreement {
  id: string;
  icon: string | React.ReactNode;
  title: string;
  badge: string;
  badgeColor: "orange" | "purple";
  description: string;
  link?: { label: string; href: string };
}

const AGREEMENTS: Agreement[] = [
  {
    id: "hipaa",
    icon: hospitalIcon,           // changed to string path
    title: "HIPAA Business Associate Agreement (BAA)",
    badge: "Required",
    badgeColor: "orange",
    description:
      "I am an authorized representative of this healthcare practice and I agree to Conversa's Business Associate Agreement, governing how patient data is handled in compliance with HIPAA.",
  },
  {
    id: "tos",
    icon: documentIcon,
    title: "Terms of Service",
    badge: "Required",
    badgeColor: "orange",
    description:
      "I have read and agree to Conversa's Terms of Service, including policies around permitted use of the AI platform in a healthcare setting.",
    link: { label: "Read Terms of Service", href: "#" },
  },
  {
    id: "dpa",
    icon: shieldIcon,
    title: "Data Processing Agreement",
    badge: "Required",
    badgeColor: "orange",
    description:
      "I agree to Conversa's Data Processing Agreement, which governs how patient call data is stored, processed, and protected.",
    link: { label: "Read Data Processing Agreement", href: "#" },
  },
  {
    id: "accuracy",
    icon: editIcon,
    title: "Practice information accuracy",
    badge: "Declaration",
    badgeColor: "purple",
    description:
      "I confirm that the practice name, registration number, and all details I have provided are accurate and belong to a legitimately registered healthcare facility. I understand that providing false information may result in account termination.",
  },
];

const STEPS: StepConfig[] = [
  { id: 1, label: "Account setup" },
  { id: 2, label: "Verify email" },
  { id: 3, label: "Practice identity" },
  { id: 4, label: "Practice details" },
  { id: 5, label: "Compliance & terms" },
];

const ComplianceTerms = () => {
  const [checked, setChecked] = useState<Set<string>>(new Set());

  const toggleCheck = (id: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const allChecked = AGREEMENTS.every((a) => checked.has(a.id));

  return (
    <Onboarding>
      <div className="w-full">
        <Step steps={STEPS} currentStep={5} />
        <hr className="border-[#E5E7EB] w-full mt-6" />

        <div className="mt-36 w-full max-w-180.5 mx-auto">
          <h1 className="font-semibold text-[30px] text-[#1F2937] mb-3 tracking-[0.5px]">
            Compliance & Agreements
          </h1>

          <p className="text-[14px] text-[#1F2937] mb-12 font-normal leading-relaxed">
            Because you are deploying AI to handle patient calls, we are required to obtain
            these confirmations before activating your account.{" "}
            <span className="font-medium text-[#1F2937]">
              All 4 confirmations are required to activate your account.
            </span>
          </p>

          {/* Agreement Cards */}
          <div className="flex flex-col gap-4 mb-10">
            {AGREEMENTS.map((agreement) => {
              const isChecked = checked.has(agreement.id);

              return (
                <div
                  key={agreement.id}
                  onClick={() => toggleCheck(agreement.id)}
                  className={`relative rounded-2xl border p-6 cursor-pointer w-200 transition-all duration-200 bg-white
                    ${isChecked
                      ? "border-[#5B0AFF] shadow-sm"
                      : "border-[#E5E7EB] hover:border-gray-300"
                    }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    {/* Left content */}
                    <div className="flex items-start gap-4 flex-1">

                      <div className="w-11 h-11 rounded-full bg-[#FAFAFA] flex items-center justify-center shrink-0 ">
                        <img
                          src={agreement.icon as string}
                          alt={agreement.title}
                          className="w-6 h-6"
                        />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[15px] font-semibold text-[#1F2937]">
                            {agreement.title}
                          </span>
                          <span
                            className={`text-[10px] font-medium px-2.5 py-0.5 rounded-full whitespace-nowrap
                              ${agreement.badgeColor === "orange"
                                ? "bg-[#FFFCE1] text-[#A16207]"
                                : "bg-[#F2EBFF] text-[#5B0AFF]"
                              }`}
                          >
                            {agreement.badge}
                          </span>
                        </div>

                        <p className="text-[12px] text-[#6B7280] mt-3 ">
                          {agreement.description}
                        </p>

                        {agreement.link && (
                          <a
                            href={agreement.link.href}
                            onClick={(e) => e.stopPropagation()}
                            className="text-[12px] text-[#5B0AFF] hover:text-[#7C3AED] underline mt-2 inline-block transition-colors"
                          >
                            {agreement.link.label}
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Custom Checkbox */}
                    <div
                      className={`w-5 h-5 rounded-md shrink-0 flex items-center justify-center border mt-1 transition-all
                        ${isChecked
                          ? "bg-[#5B0AFF] border-[#5B0AFF]"
                          : "border-[#DADCEE] bg-white"
                        }`}
                    >
                      {isChecked && (
                        <svg
                          className="w-3 h-3 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mb-10">
            <Link to="/">
              <button
                type="button"
                className="flex items-center justify-center gap-2 h-18.5 text-[14px] px-6 border border-gray-300 rounded-xl text-sm font-medium text-[#6B7280] bg-white hover:bg-gray-50 transition w-full sm:w-auto"
              >
                <img src={arrLeft} alt="" className="w-7 h-7" />
                Go Back
              </button>
            </Link>

            <button
              type="button"
              disabled={!allChecked}
              className={`flex-1 h-18.5 text-white font-semibold rounded-xl text-[14px] transition
                ${allChecked 
                  ? "bg-[#5B0AFF] hover:bg-[#4C0CE6]" 
                  : "bg-[#7C3AED] opacity-75 cursor-not-allowed"
                }`}
            >
              Confirm & Activate Account
            </button>
          </div>
        </div>
      </div>
    </Onboarding>
  );
};

export default ComplianceTerms;