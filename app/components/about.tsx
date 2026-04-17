"use client";

import { useState } from "react";
import { FaUserCircle, FaCode } from "react-icons/fa";
import { TbWorldBolt } from "react-icons/tb";
import AboutModal from "./AboutModal";
import ProjectsModal from "./ProjectsModal";
import SocialsModal from "./SocialsModal";

type Modal = "about" | "projects" | "socials" | null;

function About() {
  const [open, setOpen] = useState<Modal>(null);

  return (
    <>
      <div className="flex flex-row gap-4 p-4">
        <div
          onClick={() => setOpen("about")}
          className="group h-32 w-64 border-2 border-gray-300 dark:border-neutral-700 rounded-md flex items-center p-4 gap-4 cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105"
        >
          <FaUserCircle
            size={40}
            className="transition-transform duration-300 group-hover:rotate-12 group-hover:scale-125"
          />
          <div className="flex-2 text-center">
            <span className="font-bold">About Me</span>
          </div>
        </div>

        <div
          onClick={() => setOpen("projects")}
          className="group h-32 w-64 border-2 border-gray-300 dark:border-neutral-700 rounded-md flex items-center p-4 gap-4 cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105"
        >
          <FaCode
            size={40}
            className="transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-125"
          />
          <div className="flex-2 text-center">
            <span className="font-bold">My Projects</span>
          </div>
        </div>

        <div
          onClick={() => setOpen("socials")}
          className="group h-32 w-64 border-2 border-gray-300 dark:border-neutral-700 rounded-md flex items-center p-4 gap-4 cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105"
        >
          <TbWorldBolt
            size={40}
            className="transition-transform duration-500 group-hover:rotate-180 group-hover:scale-125"
          />
          <div className="flex-2 text-center">
            <span className="font-bold">Socials</span>
          </div>
        </div>
      </div>

      {open === "about" && <AboutModal onClose={() => setOpen(null)} />}
      {open === "projects" && <ProjectsModal onClose={() => setOpen(null)} />}
      {open === "socials" && <SocialsModal onClose={() => setOpen(null)} />}
    </>
  );
}

export default About;
