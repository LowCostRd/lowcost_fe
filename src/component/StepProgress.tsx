import type { StepProgressProps } from "../type/assistant";


const StepProgress = ({ currentStep, totalSteps }: StepProgressProps) => {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="flex flex-col items-start min-w-45">
   
      <p className="text-[14px] font-semibold text-[#6B7280] leading-tight mb-3">
        Step <span className="tabular-nums">{currentStep}</span> of {totalSteps}
      </p>
      
      <div className="h-2 w-full bg-[#F3F0FF] rounded-full overflow-hidden">
    
        <div 
          className="h-full bg-[#5B0AFF] rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  );
};

export default StepProgress;