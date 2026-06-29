export interface StatCardProps {
    icon: React.ReactNode;
    label: string;
    value: string | number;
    sub: string;
    change?: number;
    highlight?: boolean;
  }

export interface PanelCardProps {
    icon: React.ReactNode;
    title: string;
    badge?: string | number;
    children: React.ReactNode;
  }

 export interface TooltipPayloadEntry {
    dataKey: string;
    value: number;
  }

  export interface CustomTooltipProps {
    active?: boolean;
    payload?: TooltipPayloadEntry[];
    label?: string;
  }

  export const CHART_LINES = [
    { key: "patientCalls", label: "Patient Calls", color: "#5B0AFF" },
    { key: "answered",     label: "Answered",      color: "#14B67D" },
    { key: "missed",       label: "Missed",        color: "#FC692D" },
    { key: "transferred",  label: "Transferred",   color: "#94A3B8" },
    { key: "appointments", label: "Appointments",  color: "#94A3B8" },
    { key: "abandoned",    label: "Abandoned",     color: "#94A3B8" },
    { key: "uniqueCall",   label: "Unique Call",   color: "#94A3B8" },
    { key: "voicemail",    label: "Voicemail",     color: "#94A3B8" },
  ];