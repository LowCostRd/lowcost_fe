export interface StepProgressProps {
  currentStep: number;
  totalSteps: number;
}

export interface Suggestion {
  label: string;
}

export interface AssistantNameConfig {
  title: string;
  subtitle: string;
  inputPlaceholder: string;
  inputHint: string;
  maxLength: number;
  suggestions: Suggestion[];
  steps: {id: number, label: string }[];
  currentStep: number;
}

export interface AssistantNameProps {
  config?: Partial<AssistantNameConfig>;
  onBack?: () => void;
  onNext?: (name: string) => void;
}

export type Specialty = {
  id: string;
  icon: string ;
  title: string;
  description: string;
  badge?: string | null;
  modalDescription: string;
  handles: string[];
};