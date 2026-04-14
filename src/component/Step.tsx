import React from 'react'

type StepStatus = 'inactive' | 'active' | 'completed'

interface StepConfig {
  id: number
  label: string
}

interface StepProps {
  step: StepConfig
  status: StepStatus
}

const StepBadge = ({ step, status }: StepProps) => {
  const baseStyle: React.CSSProperties = {
    width: 19,
    height: 19,
    borderRadius: 3,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 12,
    fontWeight: 500,
    flexShrink: 0,
  }

  const styles: Record<StepStatus, React.CSSProperties> = {
    inactive: { background: '#E5E7EB', color: '#6B7280' },
    active:   { background: '#5B0AFF', color: '#fff' },
    completed:{ background: '#5B0AFF', color: '#fff' },
  }

  return (
    <div style={{ ...baseStyle, ...styles[status] }}>
      {status === 'completed' ? (
        <svg width={10} height={10} viewBox="0 0 10 10" fill="none">
          <polyline
            points="1.5,5 4,7.5 8.5,2.5"
            stroke="white"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        step.id
      )}
    </div>
  )
}

const labelStyles: Record<StepStatus, React.CSSProperties> = {
  inactive: { fontSize: 14, color: '#6B7280',fontWeight: 300  },
  active:   { fontSize: 14, color: '#5B0AFF', fontWeight: 300 },
  completed:{ fontSize: 14, color: '#5B0AFF',fontWeight: 300  },
}

interface StepperProps {
  steps: StepConfig[]
  currentStep: number;
}

const Step = ({ steps, currentStep }: StepperProps) => {
  
  const getStatus = (stepId: number): StepStatus => {
    if (stepId < currentStep) return 'completed'
    if (stepId === currentStep) return 'active'
    return 'inactive'
  }

  

  return (
    <div className='flex flex-row py-6 justify-evenly ' >
      {steps.map((step) => {
        const status = getStatus(step.id)
        return (
          <div key={step.id} className={`flex items-center  max-xl:gap-1 gap-3 `} >
            <StepBadge step={step} status={status} />
            <span style={labelStyles[status]}>{step.label}</span>
  
          </div>
        )
      })}
      
    </div>
  )
}

export default Step;