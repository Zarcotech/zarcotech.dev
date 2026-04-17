import { FaUserCircle } from "react-icons/fa";
import { FaCode } from "react-icons/fa";
import { TbWorldBolt } from "react-icons/tb";

function About() {
  return (
    <div className="flex flex-row gap-4 p-4">
      <div className="h-32 w-64 border-2 border-gray-300 rounded-md flex items-center p-4 gap-4 transition-all duration-300 ease-in-out hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/20 hover:scale-105 cursor-pointer">
        <FaUserCircle size={40} className="text-500"/> 
        <div className="flex-2 text-center">
          <span className="font-bold">About Me</span>
        </div>
      </div>
      <div className="h-32 w-64 border-2 border-gray-300 rounded-md flex items-center p-4 gap-4 transition-all duration-300 ease-in-out hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/20 hover:scale-105 cursor-pointer">
        <FaCode size={40} className="text-500"/> 
        <div className="flex-2 text-center">
          <span className="font-bold">My Projects</span>
        </div>
      </div>
      <div className="h-32 w-64 border-2 border-gray-300 rounded-md flex items-center p-4 gap-4 transition-all duration-300 ease-in-out hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/20 hover:scale-105 cursor-pointer">
        <TbWorldBolt size={40} className="text-500"/> 
        <div className="flex-2 text-center">
          <span className="font-bold">Socials</span>
        </div>
      </div>
    </div>
  )
}

export default About;
