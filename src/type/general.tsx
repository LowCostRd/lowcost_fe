export interface InputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: "text" | "email" | "password";
  error?: string;
  hint?: string;
  required?: boolean;
  showStrength?: boolean;
}

export interface StepConfig {
  id: number;
  label: string;
}

export interface Agreement {
  id: string;
  icon: string | React.ReactNode;
  title: string;
  badge: string;
  badgeColor: "orange" | "purple";
  description: string;
  link?: { label: string; href: string };
}
