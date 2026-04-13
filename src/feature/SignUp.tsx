import { useState } from "react";
import Onboarding from "../component/Onboarding";
import Step from "../component/Step";

const SignUp = () => {
  const steps = [
    { id: 1, label: "Account" },
    { id: 2, label: "Profile" },
    { id: 3, label: "Review" },
  ];
  const [currentStep] = useState(1);
  return (
    <div className="">
      <Onboarding>
        <div>
          <Step steps={steps} currentStep={currentStep} />
        </div>
      </Onboarding>
    </div>
  );
};

export default SignUp;
