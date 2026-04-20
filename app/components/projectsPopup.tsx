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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-[10px]"
      onClick={onClose}
    >
      <div
        className="rounded-xl w-[100%] max-w-[100vw] p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-[2rem]">My Projects</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors text-2xl leading-none"
          >
            &times;
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((p) => (
            <div 
              key={p.name} 
              className="backdrop-blur-[15px] rounded-lg p-4"
            >
              <p className="font-semibold text-sm text-[1.5rem]">{p.name}</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 text-[1rem]">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProjectsPopup;
