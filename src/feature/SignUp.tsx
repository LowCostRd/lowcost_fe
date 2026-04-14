import { useState } from "react";
import Onboarding from "../component/Onboarding";
import Step from "../component/Step";
import "./style/signup.css";
import Icons from "../assets/Icons";
import Input from "../component/input";
import Select from "../component/Select";
import Button from "../component/Botton";
const SignUp = () => {
  const steps = [
      { id: 1, label: 'Account setup' },
    { id: 2, label: 'Verify email' },
    { id: 3, label: 'Practice identity' },
    { id: 4, label: 'Practice details' },
    { id: 5, label: 'Compliance & terms' },
  ];

  const [currentStep] = useState(1);
  const [role, setRole] = useState("");
  const options = [
    { label: "Practice Manager", value: "practice_manager" },
    { label: "Hospital Administrator", value: "hospital_administrator" },
    { label: "Chief Executive Officer", value: "chief_executive_officer" },
    { label: "Chief Operations Officer", value: "chief_operations_officer" },
    { label: "Medical Director", value: "medical_director" },
    { label: "Practice Owner", value: "practice_owner" },
    { label: "Front Desk Manager", value: "front_desk_manager" },
    { label: "IT Manager", value: "it_manager" },
    { label: "Other", value: "other" },
  ];
  return (
    <Onboarding>
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
              {" "}
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

          <div className="setup-general-input-box">
            <div className="setup-inner-box">
              <Input
                label="Full name"
                placeholder="Ex. Amara Johnson"
                required
              />
              <Select
                label="Job Title"
                placeholder="Select your role"
                required
                onChange={(value) => setRole(value)}
                options={options}
                value={role}
              />
            </div>
            <div>
              <Input
                label="Email address"
                placeholder="Ex. amara@hospital.com"
                required
                type="email"
                hint="Use the email you want to receive notifications and billing information on"
              />
            </div>

            <div className="setup-inner-box">
              <Input
                label="Password "
                placeholder="At least 8 characters"
                required
                type="password"
              />
              <Input
                label="Confirm password"
                placeholder="Re-enter your password"
                required
                type="password"
              />
            </div>
            <div className="setup-button-wrap">
              <Button label="Get Started" variant="primary" />
            </div>
            <div className="login-link-wrap">
              <p className="link-text">
                Already have an account?
                <span className="link-inner-text"> Sign in</span>
              </p>
            </div>
            <div className="terms-of-service-box">
              <p className="terms-of-service-text">
                By continuing you agree to our
                <span className="terms-of-service-inner-text">
                  Terms of Service
                </span>
                and{" "}
                <span className="terms-of-service-inner-text">
                  Privacy Policy
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Onboarding>
  );
};

export default SignUp;
