import Step from "../component/Step";
import Onboarding from "../component/Onboarding";
import { useEffect, useRef, useState, useCallback } from "react";
import shieldTick from "../assets/onboarding/shield-tick.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import arrLeft from "../assets/general/arrow-left.png";
import type { StepConfig } from "../type/general";
import { INITIAL_SECONDS } from "../constant/general";
import { ToastContainer } from "react-toastify";
import { handleEmailVerification } from "../services/authService";
import { useAuthStore } from "../store/AuthStore";
import Icons from "../assets/Icons";

const VerifyEmail = () => {
  const STEPS: StepConfig[] = [
    { id: 1, label: "Account setup" },
    { id: 2, label: "Verify email" },
    { id: 3, label: "Practice identity" },
    { id: 4, label: "Practice details" },
    { id: 5, label: "Compliance & terms" },
  ];

  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [seconds, setSeconds] = useState(INITIAL_SECONDS);
  const [isExpired, setIsExpired] = useState(false);
  const [error, setError] = useState<string>(""); 
  const [isSubmitting, setIsSubmitting] = useState(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "";

  const { verifyEmail, isLoading: storeLoading } = useAuthStore();

  // Timer
  useEffect(() => {
    if (isExpired || seconds <= 0) return;

    const timer = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          setIsExpired(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds, isExpired]);

  useEffect(() => {
  const timeout = setTimeout(() => {
    inputRefs.current[0]?.focus();
  }, 50);

  return () => clearTimeout(timeout);
}, []);

  const timerLabel = isExpired
    ? "Code expired"
    : `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;

  // Handle OTP input change
  const handleChange = (value: string, index: number) => {
    const digit = value.replace(/\D/g, "").slice(-1); 
    if (digit === otp[index]) return; 

    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);
    setError(""); 

   
    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all 6 digits are filled
    if (index === 5 && digit && newOtp.every((d) => d !== "")) {
      handleSubmit(newOtp.join(""));
    }
  };

  // Handle backspace
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      } else if (otp[index]) {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }
  };

  // Paste support
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();
    const digits = pastedData.replace(/\D/g, "").slice(0, 6);

    if (digits.length === 0) return;

    const newOtp = [...otp];
    digits.split("").forEach((digit, i) => {
      if (i < 6) newOtp[i] = digit;
    });
    setOtp(newOtp);
    setError("");

    
    const lastIndex = Math.min(digits.length - 1, 5);
    inputRefs.current[lastIndex]?.focus();

    // Auto submit if complete
    if (digits.length === 6) {
      handleSubmit(digits);
    }
  };

  const handleResend = useCallback(async () => {
    // TODO: Call your actual resend OTP API here
    // Example: await resendEmailCode(email);

    setOtp(Array(6).fill(""));
    setSeconds(INITIAL_SECONDS);
    setIsExpired(false);
    setError("");
    inputRefs.current[0]?.focus();

    // Optional: show toast
    // toast.success("New code sent to your email");
  }, [email]);

  const isOtpComplete = otp.every((digit) => digit !== "");

  const handleSubmit = async (codeToSubmit?: string) => {
    const code = codeToSubmit || otp.join("");
    if (!code || code.length !== 6 || !email) return;

    setIsSubmitting(true);
    setError("");

    try {
      await handleEmailVerification({
        data: {
          email_address: email,
          otp: code,
        },
        verifyEmail,
        navigate,
      });
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Invalid or expired verification code. Please try again.";
      setError(message);
      setOtp(Array(6).fill("")); 
      inputRefs.current[0]?.focus();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Onboarding>
      <ToastContainer />
      <div className="w-full">
        <Step steps={STEPS} currentStep={2} />
        <hr className="border-[#E5E7EB] w-full" />

        <div className="mt-34 w-full max-w-180.5 mx-auto">
          <h1 className="font-semibold leading-6 text-[28px] text-[#1F2937] mb-6" style={{ letterSpacing: 1 }}>
            Verify Your Email
          </h1>

          <p className="text-[14px] text-[#1F2937] font-normal mb-10">
            We sent a 6-digit code to{" "}
            <span className="font-medium text-[#1F2937]">{email || "your email"}</span>.
            Enter it below to confirm your identity.
          </p>
        {/* OTP Inputs */}
        <div className="flex gap-3 mb-7">
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={(el) => {
                inputRefs.current[i] = el;
              }}  
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              onPaste={handlePaste}
              className={`w-16.5 h-16.5 border rounded-lg text-center text-xl font-semibold caret-transparent focus:outline-none transition-all
                ${error
                  ? "bg-[#FFF1F4] text-[#CA2044] border-[#CA2044]"
                  : digit
                  ? "bg-[#F3EDFF] text-[#5B0AFF] border-[#5B0AFF]"
                  : "bg-white border-[#94A3B8]"
                }`}
              disabled={isSubmitting}
            />
          ))}
        </div>

          {/* Error Message */}
          {error && (
            <p className="text-[#CA2044] text-[14px] font-normal mt-1 mb-7">{error}</p>
          )}

          {/* Timer */}
         {isExpired ? (
            <p className="text-[14px] font-semibold text-[#CA2044] mb-5 mt-3">
              Code expired. Please resend a new code.
            </p>
          ) : (
            <p className="text-[16px] font-semibold text-[#1F2937] mb-5 mt-3">
              {timerLabel} Minutes Remaining
            </p>
          )}

          {/* Resend */}
          <p className="text-[14px] text-[#6B7280] mb-12">
            Didn't receive the code?{" "}
            <button
              onClick={handleResend}
              disabled={isSubmitting}
              className="text-[#5B0AFF] font-medium hover:underline disabled:opacity-50 cursor-pointer"
            >
              Click to Resend
            </button>
          </p>

          {/* Info Box */}
          <div className="bg-[#F7F6FA] rounded-lg px-6 py-8 flex gap-4 mb-18">
            <img src={shieldTick} alt="Security" className="w-8 h-8 flex-shrink-0" />
            <div>
              <h4 className="text-[15px] font-medium text-[#1F2937] mb-1">
                Why we verify your email
              </h4>
              <p className="text-[12px] text-[#6B7280] leading-relaxed">
                Conversa handles sensitive patient call data. We verify every account to ensure
                only authorized personnel can deploy AI for a healthcare practice.
              </p>
            </div>
          </div>
            <button
              type="button"
              onClick={() => handleSubmit()}
              disabled={!isOtpComplete || isSubmitting || storeLoading}
              className={`w-full font-semibold rounded-lg h-18 text-[14px] transition mb-4 flex items-center justify-center
                ${
                  isOtpComplete
                    ? "bg-[#5B0AFF] cursor-pointer"
                    : "bg-[#7C3AED] cursor-not-allowed opacity-75"
                }
                text-[#F5F3FF]`}
            >
              {isSubmitting || storeLoading ? Icons.SpinningIcon : "Verify & Continue"}
            </button>

          

          <Link to="/">
            <button className="w-full flex items-center justify-center gap-2 bg-[#F7F6FA] text-[#6B7280] font-semibold rounded-lg h-18 text-[14px] cursor-pointer ">
              <img src={arrLeft} alt="" className="w-7 h-7" />
              Go Back
            </button>
          </Link>
        </div>
      </div>
    </Onboarding>
  );
};

export default VerifyEmail;