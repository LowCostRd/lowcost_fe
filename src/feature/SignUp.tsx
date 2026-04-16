import { useState } from "react";
import Onboarding from "../component/Onboarding";
import Step from "../component/Step";
import "./style/signup.css";
import Icons from "../assets/Icons";
import Input from "../component/input";
import Select from "../component/Select";
import Button from "../component/Botton";

import { registerUser } from "../redux/thunks/onboardingThunk";
import { useAppDispatch, useAppSelector } from "../redux/store/hooks";

const SignUp = () => {
  const steps = [
    { id: 1, label: "Account setup" },
    { id: 2, label: "Verify email" },
    { id: 3, label: "Practice identity" },
    { id: 4, label: "Practice details" },
    { id: 5, label: "Compliance & terms" },
  ];

  const dispatch = useAppDispatch();

  const { loading, error, success } = useAppSelector(
    (state) => state.onboarding,
  );

  const [currentStep] = useState(1);
  const [confirm_password, setConfirmPassword ] = useState("");

  const [form, setForm] = useState({
    full_name: "",
    email_address: "",
    password: "",
    role: "",

  });

  const options = [
    { label: "Practice Manager", value: "practice manager" },
    { label: "Hospital Administrator", value: "hospital administrator" },
    { label: "Chief Executive Officer", value: "chief executive officer" },
    {
      label: "Chief Operations Officer",
      value: "chief operations coordinator",
    },
    { label: "Medical Director", value: "medical director" },
    { label: "Practice Owner", value: "practice owner" },
    { label: "Front Desk Manager", value: "front desk manager" },
    { label: "IT Manager", value: "it manager" },
    { label: "Other", value: "other" },
  ];

  const handleSubmit = () => {
    if (
      !form.full_name ||
      !form.email_address ||
      !form.password ||
      !form.role
    ) {
      alert("Please fill in all fields");
      return;
    }

    if (!options.some((option) => option.value === form.role)) {
      alert("Please select a role");
      return;
    }

    if (form.password !== confirm_password) {
      alert("Passwords do not match");
      return;
    }

    dispatch(
      registerUser({
        full_name: form.full_name,
        email_address: form.email_address,
        password: form.password,
        role: form.role,
      }),
    );
  };

  return (
    <Onboarding>
      <div>
         <Step steps={steps} currentStep={currentStep} />
         <hr className="border-[#E5E7EB] w-full " />
      <div className="account-setup-general-wrap">
        <Step steps={steps} currentStep={currentStep} />

        <div className="account-setup-inner-wrap">
          <div className="account-setup-header-wrap">
            <p className="account-setup-header-text">Create Your Account</p>
            <p className="account-setup-body-text">
              Who is setting up Conversa for this practice?
            </p>
          </div>

          <div className="setup-options-wrap">
            <div className="setup-options-wrap-inner">
              <div className="setup-option-box">
                <div className="option-icon-box">
                  <figure className="img-box">{Icons.google}</figure>
                </div>
                <p className="option-text">Sign up with Google</p>
              </div>

              <div className="setup-option-box">
                <div className="option-icon-box">
                  <figure className="img-box">{Icons.microsoft}</figure>
                </div>
                <p className="option-text">Sign up with Microsoft</p>
              </div>
            </div>

            <div className="setup-option-box-under">
              <p className="setup-line"></p>
              <p className="divider-text">or</p>
              <p className="setup-line"></p>
            </div>
          </div>

          {error && <p className="error-text">{error}</p>}
          {success && (
            <p className="success-text">Account created successfully</p>
          )}

          <div className="setup-general-input-box">
            <div className="setup-inner-box">
              <Input
                label="Full name"
                placeholder="Ex. Amara Johnson"
                required
                value={form.full_name}
                onChange={(e) =>
                  setForm({ ...form, full_name: e.target.value })
                }
              />

              <Select
                label="Job Title"
                placeholder="Select your role"
                required
                onChange={(value) => setForm({ ...form, role: value })}
                options={options}
                value={form.role}
              />
            </div>

            <Input
              label="Email address"
              placeholder="Ex. amara@hospital.com"
              required
              type="email"
              value={form.email_address}
              onChange={(e) =>
                setForm({ ...form, email_address: e.target.value })
              }
            />

            <div className="setup-inner-box">
              <Input
                label="Password"
                placeholder="At least 8 characters"
                required
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />

              <Input
                label="Confirm password"
                placeholder="Re-enter your password"
                required
                type="password"
                value={confirm_password}
                onChange={(e) =>
                    setConfirmPassword(e.target.value)
                }
              />
            </div>

            <div className="setup-button-wrap">
              <Button
                label={loading ? "Creating account..." : "Get Started"}
                variant="primary"
                onClick={handleSubmit}
              />
            </div>

            <div className="login-link-wrap">
              <p className="link-text">
                Already have an account?
                <span className="link-inner-text"> Sign in</span>
              </p>
            </div>

            <div className="terms-of-service-box">
              <p className="terms-of-service-text">
                By continuing you agree to our{" "}
                <span className="terms-of-service-inner-text">
                  Terms of Service
                </span>{" "}
                and{" "}
                <span className="terms-of-service-inner-text">
                   Privacy Policy
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      </div>
    </Onboarding>
  );
};

export default SignUp;
