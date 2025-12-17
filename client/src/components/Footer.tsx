import { Heart } from "lucide-react";
import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="w-full border-t bg-background/50 backdrop-blur-sm py-4 mt-auto">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-10 md:flex-row px-4">
        <p className="text-sm text-muted-foreground text-center md:text-left">
          &copy; {new Date().getFullYear()} PairUp. All rights reserved.
        </p>
        
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <span>
          Made with <Heart className="inline w-4 h-4 text-red-500 mx-1" fill="currentColor" /> by{" "}
          <a
            href="https://ashwani.me"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-foreground hover:text-primary hover:underline transition-colors"
          >
            Ashwani Kushwaha
          </a>
          </span>
        </div>

        <div className="flex gap-4 text-sm text-muted-foreground">
          <Link href="/privacy" className="hover:text-primary transition-colors cursor-pointer">Privacy</Link>
          <Link href="/terms" className="hover:text-primary transition-colors cursor-pointer">Terms</Link>
          <Link href="/contact" className="hover:text-primary transition-colors cursor-pointer">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
