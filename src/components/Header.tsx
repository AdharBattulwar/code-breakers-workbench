
import React from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header className="border-b sticky top-0 bg-background z-10">
      <div className="container mx-auto py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold">Code Breakers Workbench</h1>
        </div>
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex space-x-4">
            <Button variant="link" asChild>
              <Link to="/">Encryption Tools</Link>
            </Button>
            <Button variant="link" asChild>
              <Link to="/historical">Historical Ciphers</Link>
            </Button>
            <Button variant="link" asChild>
              <Link to="/about">About</Link>
            </Button>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
