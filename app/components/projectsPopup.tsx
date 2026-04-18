"use client";

interface Props {
  onClose: () => void;
}

function ProjectsPopup({ onClose }: Props) {
  const projects = [
    { name: "Zarcotech's Portfolio", desc: "My personal portfolio along with interactive information about my presence(s)" },
    { name: "novaJS", desc: "A built-in Bash script CLI in browser to teach others, embed to webOSes, and more." },
    { name: "Nocturn", desc: "A combination of APIs and interface to run a music app. Currently in deprication due to an incoming of a rewrite." },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-xl w-[520px] max-w-[90vw] p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">My Projects</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors text-2xl leading-none"
          >
            &times;
          </button>
        </div>
        <div className="flex flex-col gap-3">
          {projects.map((p) => (
            <div
              key={p.name}
              className="border border-gray-200 dark:border-neutral-700 rounded-lg p-4"
            >
              <p className="font-semibold text-sm">{p.name}</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProjectsPopup;
