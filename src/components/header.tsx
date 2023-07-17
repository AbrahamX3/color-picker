import { ImageIcon } from "lucide-react";

import ThemeToggle from "./theme-toggle";

export default function Header() {
  return (
    <nav className="flex w-full items-center justify-between align-middle">
      <span className="flex items-center gap-x-2 align-middle">
        <ImageIcon className="h-6 w-6" />
        <h1 className="text-xl font-bold">Image Color Picker</h1>
      </span>
      <ThemeToggle />
    </nav>
  );
}
