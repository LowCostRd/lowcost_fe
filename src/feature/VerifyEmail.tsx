import Step from "../component/Step";
import processImg from "../assets/onboarding/Group (10).png";

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
    <div className="flex w-full h-screen justify-evenly">
      
   
      <div className="">
        <img src={processImg} className="w-full max-w-md" />
      </div>

      <div className="">
        <Step steps={STEPS} currentStep={3} />
           <hr className="mt-4 border-gray-300 max-w-full" />
      </div>

    </div>
  );
};

export default VerifyEmail;