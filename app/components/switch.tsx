"use client";

import { useState } from "react";

interface SwitchProps { checked?: boolean; onToggle?: (checked: boolean) => void; }
const Switch = ({ onToggle }: SwitchProps) => {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    const newChecked = !checked;
    setChecked(newChecked);
    if (onToggle) onToggle(newChecked);
  };

  return (
    <div className="inline-flex items-center gap-3 rounded-full border border-white/30 bg-black/30 px-3 py-2 backdrop-blur-sm">
      <span className="text-xs font-semibold uppercase tracking-wide">Theme</span>
      <label className="relative inline-block h-7 w-12 cursor-pointer [-webkit-tap-highlight-color:_transparent]" htmlFor="switch">
        <input
          className="peer sr-only"
          id="switch"
          type="checkbox"
          checked={checked}
          onChange={handleChange}
          aria-label="Toggle dark mode"
        />
        <span className="absolute inset-0 rounded-full bg-white/40 transition peer-checked:bg-white/20" />
        <span className="absolute inset-y-0 start-0 m-0.5 size-6 rounded-full bg-white transition-all peer-checked:start-5" />
      </label>
    </div>
  );
};

export default Switch;
