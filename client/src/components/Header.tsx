import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Gamepad2, Github } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-backdrop-filter:bg-background/60"
    >
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Link href="/">
            <a className="flex items-center gap-2 transition-transform hover:scale-105">
              <div className="rounded-lg bg-primary/10 p-2 text-primary">
                <Gamepad2 className="h-6 w-6" />
              </div>
              <span className="text-xl font-bold tracking-tight bg-linear-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                PairUp
              </span>
            </a>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <Link href="/">
            <a className="transition-colors hover:text-primary">Game</a>
          </Link>
          <Link href="/leaderboard">
            <a className="transition-colors hover:text-primary">Leaderboard</a>
          </Link>
          <Link href="/about">
            <a className="transition-colors hover:text-primary">About</a>
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <a href="https://github.com" target="_blank" rel="noreferrer">
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </a>
          </Button>
          
          {toggleTheme && (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="animate-in fade-in zoom-in"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5 text-yellow-500" />
              ) : (
                <Moon className="h-5 w-5 text-slate-700" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
          )}
        </div>
      </div>
    </motion.header>
  );
}
