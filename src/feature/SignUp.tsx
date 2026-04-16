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
  const [fullName, setFullName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");



  const options = [
    { label: "Practice Manager", value: "practice manager" },
    { label: "Hospital Administrator", value: "hospital administrator" },
    { label: "Chief Executive Officer", value: "chief executive officer" },
    { label: "Chief Operations Officer", value: "chief operations officer" },
    { label: "Medical Director", value: "medical director" },
    { label: "Practice Owner", value: "practice owner" },
    { label: "Front Desk Manager", value: "front desk manager" },
    { label: "IT Manager", value: "it manager" },
    { label: "Other", value: "other" },
  ];

  const isFormFilled =
  fullName.trim() !== "" &&
  role !== "" &&
  email.trim() !== "" &&
  password.trim() !== "" &&
  confirmPassword.trim() !== "";




  const [errors, setErrors] = useState({
  fullName: "",
  role: "",
  email: "",
  password: "",
  confirmPassword: "",
});

const passwordRules = [
  { label: "One lowercase letter (e.g. a)", test: (p: string) => /[a-z]/.test(p) },
  { label: "One uppercase letter (e.g. A)", test: (p: string) => /[A-Z]/.test(p) },
  { label: "One number (e.g. 7)",           test: (p: string) => /[0-9]/.test(p) },
  { label: "One special character",         test: (p: string) => /[^A-Za-z0-9]/.test(p) },
  { label: "Minimum 8 characters",          test: (p: string) => p.length >= 8 },
];

const validate = () => {
  const newErrors = {
    fullName: fullName.trim() === "" ? "Full name is required" : "",
    role: role === "" ? "Please select your job title" : "",
    email: email.trim() === "" 
      ? "Email is required" 
      : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) 
        ? "Enter a valid email address" 
        : "",
          password: password.trim() === ""
        ? "Password is required"
        : passwordRules.some((r) => !r.test(password))
          ? "Please ensure your password meets all requirements"
          : "",
    confirmPassword: confirmPassword.trim() === "" 
      ? "Please confirm your password" : password.trim() === "" ? "Password is required"
      : confirmPassword !== password 
        ? "Passwords do not match" 
        : "",
  };

  setErrors(newErrors);
  return Object.values(newErrors).every((e) => e === "");
};

const handleSubmit = () => {
  if (!validate()) return;
  // proceed with signup
};
  return (
    <Onboarding>
      <div className="w-full"> 
         <Step steps={steps} currentStep={currentStep} />
         <hr className="border-[#E5E7EB] w-full " />
      <div className="mt-30 w-full max-w-200 mx-auto">
       
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
                 onChange={
                  (e) =>
                    {
                      setFullName(e.target.value)
                      if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: "" }));
                    }
                
                }
                required
                error={errors.fullName}
              />
              <Select
                label="Select your role"
                placeholder="Select your role"
                required
                onChange={(value) => {
                  setRole(value)
                  if (errors.role) setErrors((prev) => ({ ...prev, role: "" }));
                }}
                options={options}
                value={role}
                error={errors.role}  
              />
            </div>
            <div>
              <Input
                label="Email address"
                placeholder="Ex. amara@hospital.com"
                required
                type="email"
                 error={errors.email}
                hint="Use the email you want to receive notifications and billing information on"
                onChange={(e) => 
                {
                  setEmail(e.target.value)
                  if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
                }}
                
              />
            </div>

            <div className="setup-inner-box">
              <Input
                label="Password "
                placeholder="At least 8 characters"
                required
                type="password"
                showStrength 
                 value={password} 
                 error={errors.password}
                onChange={(e) => 
                {
                  setPassword(e.target.value)
                if (errors.password) setErrors((prev) => ({ ...prev, password: "" }));
                }}
              />
              <Input
                label="Confirm password"
                placeholder="Re-enter your password"
                required
                type="password"
                
                error={errors.confirmPassword} 
                onChange={(e) => {setConfirmPassword(e.target.value)
                  if (errors.confirmPassword) setErrors((prev) => ({ ...prev, confirmPassword: "" }));
                }}
               
              />
            </div>
            <div className="setup-button-wrap">
              <Button label="Create Account" variant="primary"   onClick={handleSubmit}   filled={isFormFilled} />
            </div>
            <div className="login-link-wrap">
              <p className="link-text">
                Already have an account?
                <span className="link-inner-text"> Sign in</span>
              </p>
            </div>
            <div className="terms-of-service-box">
              <p className="terms-of-service-text">
                By continuing you agree to our {" "}
                <span className="terms-of-service-inner-text">
                  Terms of Service {" "}
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
