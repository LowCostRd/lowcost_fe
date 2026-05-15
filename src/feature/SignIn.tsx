import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthStore } from "../store/AuthStore";
import { handleLogin } from "../services/authService";
import Onboarding from "../component/Onboarding";
import "./style/signup.css";
import Icons from "../assets/Icons";
import Input from "../component/input";
import Button from "../component/Botton";
import LoadingScreen from "../component/LoadingScreen";
import type { LoginHandlerResult } from "../type/auth";

const ONBOARDING_ROUTES: Record<string, string> = {
  "verify-email": "/verify-email",
  "practice-identity": "/practice-identity",
  "practice-details": "/practice-details",
  "compliance-terms": "/compliance-terms",
};

const SignIn = () => {
  const { login, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [showSuccessLoader, setShowSuccessLoader] = useState(false);

  const isFormFilled = email.trim() !== "" && password.trim() !== "";

  const validate = () => {
    const newErrors = {
      email:
        email.trim() === ""
          ? "Email is required"
          : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
          ? "Enter a valid email address"
          : "",
      password: password.trim() === "" ? "Password is required" : "",
    };
    setErrors(newErrors);
    return Object.values(newErrors).every((e) => e === "");
  };

const handleSubmit = async () => {
  if (!validate()) return;

  try {
    const result: LoginHandlerResult = await handleLogin({
      data: { email, password },
      login,
    });

    if (result?.unverified) {
      toast.info("Please verify your email to continue.", {
        position: "top-right",
        autoClose: 3000,
        style: { fontSize: "16px" },
      });
      setTimeout(() => {
        navigate("/verify-email", { state: { email } });
      }, 1000);
      return;
    }

    if (result?.success) {
      setShowSuccessLoader(true);
      const { onboardingStep } = useAuthStore.getState();

      const redirectTo =
        onboardingStep && onboardingStep !== "complete"
          ? ONBOARDING_ROUTES[onboardingStep] ?? "/practice-identity"
          : "/dashboard";

      setTimeout(() => {
        navigate(redirectTo, { state: { email } });
      }, 1500);
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : "Something went wrong";
    toast.error(message);
  }
};

  return (
    <Onboarding>
      {showSuccessLoader && <LoadingScreen />}
      <ToastContainer />

      <div className="w-full">
        <div className="mt-30 w-full max-w-200 mx-auto">
          <div className="account-setup-header-wrap mb-20">
            <p className="account-setup-header-text">Sign In</p>
          </div>

          <div className="setup-options-wrap">
            <div className="setup-options-wrap-inner">
              <div className="setup-option-box">
                <div className="option-icon-box">
                  <figure className="img-box">{Icons.google}</figure>
                </div>
                <p className="option-text">Sign in with Google</p>
              </div>
              <div className="setup-option-box">
                <div className="option-icon-box">
                  <figure className="img-box">{Icons.microsoft}</figure>
                </div>
                <p className="option-text">Sign in with Microsoft</p>
              </div>
            </div>
            <div className="setup-option-box-under">
              <p className="setup-line"></p>
              <p className="divider-text">or</p>
              <p className="setup-line"></p>
            </div>
          </div>

          <div className="setup-general-input-box">
            <div>
              <Input
                label="Email address"
                placeholder="Ex. amara@hospital.com"
                required
                type="email"
                error={errors.email}
                value={email}
                hint="Use the email you want to receive notifications and billing information on"
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
                }}
              />
            </div>

            <div className="setup-inner-box">
              <Input
                label="Password"
                placeholder="At least 8 characters"
                required
                type="password"
                value={password}
                error={errors.password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors((prev) => ({ ...prev, password: "" }));
                }}
              />
            </div>

            <div className="setup-button-wrap">
              <Button
                label={isLoading ? Icons.SpinningIcon : "Sign In"}
                variant="primary"
                onClick={handleSubmit}
                filled={isFormFilled}
              />
            </div>

            <Link to="/signup">
              <p className="link-text">
                You don't have an account?
                <span className="link-inner-text"> Sign up</span>
              </p>
            </Link>
          </div>
        </div>
      </div>
    </Onboarding>
  );
};

export default SignIn;