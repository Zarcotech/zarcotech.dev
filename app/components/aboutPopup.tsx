"use client";

import LangTag from "./iconComponents/LangTag";

interface Props {
  onClose: () => void;
}

function AboutPopup({ onClose }: Props) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-xl w-[960px] max-w-[90vw] p-8 shadow-2xl h-[480px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">About Me</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors text-2xl leading-none"
          >
            &times;
          </button>
        </div>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-xl">
          Hey, I&apos;m a developer who loves building clean, fast, and
          functional web experiences. I work across the full stack and enjoy
          crafting projects that are both useful and well-designed. Currently my
          skills are focused on{" "}
          <LangTag name="HTML" icon="/icons/html.png" />,{" "}
          <LangTag name="CSS" icon="/icons/css.png" />, and{" "}
          <LangTag name="JavaScript" icon="/icons/js.png" />, and I also am
          fluent in the{" "}
          <LangTag name="Node.js" icon="/icons/nodejs.png" />,{" "}
          <LangTag name="React" icon="/icons/react.png" />, and{" "}
          <LangTag name="Next.js" icon="/icons/nextjs.png" /> frameworks. I
          would like to try to get my focus in the AI and neural networks field.
        </p>
      </div>
    </div>
  );
}

export default AboutPopup;
