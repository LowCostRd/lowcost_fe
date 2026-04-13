import Step from "../component/Step";
import Onboarding from "../component/Onboarding";

interface StepConfig {
  id: number;
  label: string;
}

const VerifyEmail = () => {
  const STEPS: StepConfig[] = [
    { id: 1, label: 'Account setup' },
    { id: 2, label: 'Verify email' },
    { id: 3, label: 'Practice identity' },
    { id: 4, label: 'Practice details' },
    { id: 5, label: 'Compliance & terms' },
  ];

  return (
    <div className="">
      
    <Onboarding>
        <div className="">
          <Step steps={STEPS} currentStep={2} />

        </div>
      </Onboarding>
      
   
      


    </div>
  );
};

export default VerifyEmail;