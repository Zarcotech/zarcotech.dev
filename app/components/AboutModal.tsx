"use client";

interface Props {
  onClose: () => void;
}

function AboutModal({ onClose }: Props) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-xl w-[480px] max-w-[90vw] p-8 shadow-2xl"
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
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          Hey, I&apos;m a developer who loves building clean, fast, and functional web experiences. I work across the full stack and enjoy crafting projects that are both useful and well-designed.
        </p>
      </div>
    </div>
  );
}

export default AboutModal;
