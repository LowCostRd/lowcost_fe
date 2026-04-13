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

      <div className="w-1/2 ">
        <img src={processImg} className="w-1/2" />
      </div>

      <div className="max-w-full ">
        <div className="min-w-max px-12 py-2">
          <Step steps={STEPS} currentStep={2} />
        </div>
        <hr className=" border-gray-300" />
      </div>

    </div>
  );
};

export default VerifyEmail;