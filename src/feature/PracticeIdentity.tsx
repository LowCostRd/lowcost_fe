import Onboarding from "../component/Onboarding";
import Step from "../component/Step";
import type { StepConfig } from "../type/general";

const PracticeIdentity = () => {

    const STEPS: StepConfig[] = [
      { id: 1, label: "Account setup" },
      { id: 2, label: "Verify email" },
      { id: 3, label: "Practice identity" },
      { id: 4, label: "Practice details" },
      { id: 5, label: "Compliance & terms" },
    ];
    return(
          <div>
      <Onboarding>
        <div className="w-full">
          <Step steps={STEPS} currentStep={3} />
          <hr className="border-gray-200 w-full" />

          </div>
          </Onboarding>
          </div>
    )
}

export default PracticeIdentity;