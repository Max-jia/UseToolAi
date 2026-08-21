import { PenLine, Palette, Clapperboard, Terminal, Zap, Mic, TrendingUp, BarChart3, Wrench, type LucideIcon } from "lucide-react";

// Single source of truth for category icons, shared by the homepage
// category wall and the All Categories page.
export const categoryIcons: Record<string, LucideIcon> = {
  "Writing & Text": PenLine,
  "Image & Design": Palette,
  "Video & Animation": Clapperboard,
  "Productivity": Zap,
  "Code & Development": Terminal,
  "Audio & Voice": Mic,
  "Marketing & SEO": TrendingUp,
  "Data & Analytics": BarChart3,
};

export const fallbackCategoryIcon = Wrench;
