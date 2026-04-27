"use client";

import LangTag from "./iconComponents/LangTag";
import { useEffect } from 'react';

interface Props {
  onClose: () => void;
}

function AboutPopup({ onClose }: Props) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
       if (e.key === 'Escape') {
          onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);
  
  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-blue/50 backdrop-blur-[10px] transition-opacity duration-300"
      onClick={onClose}
    >
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-max bg-blue-800 text-white text-xs rounded px-2 py-1">
        Tip: Hover on the colored text to see the icon!
      </div>
      <div
        className="bg-white dark:bg-transparent rounded-xl w-[100%] max-w-[100vw] p-8 shadow-2xl -translate-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[2rem] font-bold">Hey, my name is Zarcotech and I am...</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors text-2xl leading-none"
          >
            &times;
          </button>
        </div>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-[1.5rem]">
          a developer who loves building clean, fast, and
          functional web experiences. I work across the full stack and enjoy
          crafting projects that are both useful and well-designed. Currently my
          skills are focused on{" "}
          <LangTag name="HTML" icon="/icons/html.png" color="orange"/>,{" "}
          <LangTag name="CSS" icon="/icons/css.png"  color="blue" />, and{" "}
          <LangTag name="JavaScript" icon="/icons/js.png"  color="yellow" />, and I also am
          fluent in the{" "}
          <LangTag name="Node.js" icon="/icons/nodejs.png" color="green" />,{" "}
          <LangTag name="React" icon="/icons/react.png" color="blue" />, and{" "} 
          <LangTag name="Next.js" icon="/icons/nextjs.png" color="white" /> {" "} frameworks. I
          would like to try to get my focus in the AI and neural networks field. I started
          programming during the COVID-19 pandemic, and I&apos;ve been hooked ever since.
          I started learning basic logic using <LangTag name="Scratch" icon="/icons/scratch.png" color="yellow" />.
          Then I moved on to learning <LangTag name="Python" icon="/icons/python.png" color="blue" />, using a lot
          of <LangTag name="Tkinter" icon="/icons/tkinter.png" color="white" /> to create simple GUI applications
          such as calculators, login systems, and more. Now, I am learning <LangTag name="C++" icon="/icons/c++.png" color="blue"/> and <LangTag name="Rust" icon="/icons/rust.png" color="red"/>.
        </p>
      </div>
      

    </div>
  );
}

export default AboutPopup;
