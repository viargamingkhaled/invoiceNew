import { Theme } from '@/types';

export const THEME: Theme = {
  name: "Ledger Calm",
  bg: "bg-[#F6F7F8]", // Surface
  text: "text-[#0B1221]", // Text
  card: "bg-[#FFFFFF]", // Panel
  border: "border-black/10",
  muted: "text-[#6B7280]", // Muted
  primary: {
    text: "text-[#0F766E]", // Primary teal
    bg: "bg-[#0F766E]", // Primary teal
    hover: "hover:bg-[#0D6B63]", // Darker teal
    ring: "focus:ring-[#0F766E]/30",
  },
  accent: {
    text: "text-[#14B8A6]", // Accent teal
    bg: "bg-[#14B8A6]", // Accent teal
  },
  success: {
    text: "text-[#22C55E]", // Success green
    bg: "bg-[#22C55E]", // Success green
  },
  warning: {
    text: "text-[#EAB308]", // Warning yellow
    bg: "bg-[#EAB308]", // Warning yellow
  },
};



