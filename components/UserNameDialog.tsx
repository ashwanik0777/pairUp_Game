import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

export function UserNameDialog() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("playerName");
    if (!storedName) {
      setOpen(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      localStorage.setItem("playerName", name.trim());
      setOpen(false);
      // Dispatch a custom event so other components can update if needed
      window.dispatchEvent(new Event("playerNameUpdated"));
    }
  };

  return (
    <Dialog open={open} onOpenChange={(val) => {
      // Prevent closing if no name is set
      if (!val && localStorage.getItem("playerName")) {
        setOpen(val);
      }
    }}>
      <DialogContent className="sm:max-w-[425px]" onInteractOutside={(e) => {
        // Prevent closing by clicking outside if no name is set
        if (!localStorage.getItem("playerName")) {
          e.preventDefault();
        }
      }}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-purple-600" />
            Welcome to PairUp!
          </DialogTitle>
          <DialogDescription>
            Please enter your name to get started. This will be used to track your high scores on the leaderboard.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <Input
              id="name"
              placeholder="Enter your name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
              autoFocus
            />
          </div>
          <DialogFooter>
            <Button type="submit" disabled={!name.trim()} className="bg-purple-600 hover:bg-purple-700 text-white">
              Start Playing
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
