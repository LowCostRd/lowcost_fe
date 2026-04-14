import Step from "../component/Step";
import Onboarding from "../component/Onboarding";
import { useEffect, useRef, useState } from "react";
import shieldTick from "../assets/onboarding/shield-tick.png";
import { Link } from "react-router-dom";

interface StepConfig {
  id: number;
  label: string;
}

const INITIAL_SECONDS = 600;
const email = "dummy@gmail.com";

const VerifyEmail = () => {
  const STEPS: StepConfig[] = [
    { id: 1, label: 'Account setup' },
    { id: 2, label: 'Verify email' },
    { id: 3, label: 'Practice identity' },
    { id: 4, label: 'Practice details' },
    { id: 5, label: 'Compliance & terms' },
  ];

  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [seconds, setSeconds] = useState(INITIAL_SECONDS);
  const [expired, setExpired] = useState(false);
  const [wrong, setWrong] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (expired || seconds <= 0) return;

    const id = setTimeout(() => {
      if (seconds - 1 <= 0) {
        setExpired(true);
      } else {
        setSeconds((s) => s - 1);
      }
    }, 1000);

    return () => clearTimeout(id);
  }, [seconds, expired]);

  const timerLabel = expired
    ? "Code expired"
    : `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")} Minutes Remaining`;

  const handleChange = (value: string, index: number) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    const next = [...otp];
    next[index] = digit;
    setOtp(next);

    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    if (index === 5 && digit) {
      setWrong(true);
    } else {
      setWrong(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResend = () => {
    setOtp(Array(6).fill(""));
    setSeconds(INITIAL_SECONDS);
    setExpired(false);
    setWrong(false);
    inputRefs.current[0]?.focus();
  };

  return (
    <div className="">
      <Onboarding>
        <div className="w-full">
          <Step steps={STEPS} currentStep={2} />
          <hr className="border-gray-200 w-full" />

          <div className="mt-20 lg:px-10 xl:px-36">
            <h1 className="font-medium leading-6 text-[28px] text-[#1F2937] mb-2" style={{letterSpacing : 1}}>
              Verify Your Email
            </h1>
            <p className="text-[15px] text-[#1F2937] font-normal mb-7 leading-relaxed">
              We sent a 6-digit code to{" "}
              <span className="font-normal text-[#1F2937]">{email}</span>.
              Enter it below to confirm your identity.
            </p>

            {/* OTP Inputs */}
            <div className="flex gap-3 mb-2">
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => { inputRefs.current[i] = el; }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, i)}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                  className={`w-12.5 h-12.5 border rounded-lg text-center text-xl font-semibold caret-transparent  focus:outline-none transition
                    ${wrong && i === 5
                      ? "bg-[#FFF1F4] text-[#CA2044] border-[#CA2044]"
                      : digit
                      ? "bg-[#F3EDFF] text-[#5B0AFF] border-[#5B0AFF]"
                      : "bg-white border-[#94A3B8]"
                    }`}
                />
              ))}
            </div>

    
            {wrong && (
              <p className="text-[#CA2044] text-sm font-normal mt-1 mb-2">
                Enter the correct numbers sent to your email
              </p>
            )}

            {/* Timer */}
            <p className="text-sm font-semibold text-[#1F2937] mb-2 mt-3">{timerLabel}</p>

            {/* Resend */}
            <p className="text-sm text-[#6B7280] mb-6">
              Didn't receive the code?{" "}
              <button
                onClick={handleResend}
                className="text-[#5B0AFF] font-medium cursor-pointer"
              >
                Click to Resend
              </button>
            </p>

            {/* Info box */}
            <div className="bg-[#F7F6FA] rounded-lg p-4 flex gap-2 items-start mb-7">
              <img src={shieldTick} alt="Security" className="w-5 h-5" />
              <div>
                <h4 className="text-md font-medium text-[#1F2937] mb-1">Why we verify your email</h4>
                <p className="text-sm text-[#6B7280] leading-relaxed">
                  Conversa handles sensitive patient call data. We verify every account to ensure
                  only authorized personnel can deploy AI for a healthcare practice.
                </p>
              </div>
            </div>

            {/* Actions */}
            <button className="w-full bg-[#7C3AED]  text-[#F5F3FF] font-semibold rounded-lg py-3.5 text-md transition mb-3 cursor-pointer">
              Verify &amp; Continue
            </button>
            <button className="w-full bg-[#F7F6FA] text-[#6B7280] font-medium rounded-lg py-3.5 text-sm transition cursor-pointer">
                <Link to={"/"}>
                     ← Go Back
                </Link>
            </button>
          </div>
        </div>
      </Onboarding>
    </div>
  );
};

export default VerifyEmail;