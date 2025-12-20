"use client";

import { ThemeProvider } from "@/contexts/ThemeContext";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { UserNameDialog } from "@/components/UserNameDialog";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="light" switchable>
      <TooltipProvider>
        {children}
        <Toaster />
        <UserNameDialog />
      </TooltipProvider>
    </ThemeProvider>
  );
}
