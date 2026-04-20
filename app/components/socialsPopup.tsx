"use client";

interface Props {
  onClose: () => void;
}

function SocialsPopup({ onClose }: Props) {
  const links = [
    { label: "GitHub", href: "https://github.com/Zarcotech" },
    { label: "Discord", href: "https://discord.com" },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-[2px]"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-xl w-[420px] max-w-[90vw] p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Socials</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors text-2xl leading-none"
          >
            &times;
          </button>
        </div>
        <div className="flex flex-col gap-3">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between border border-gray-200 dark:border-neutral-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors"
            >
              <span className="font-medium text-sm">{link.label}</span>
              <span className="text-gray-400 text-sm">↗</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SocialsPopup;
