import { FaUserCircle } from "react-icons/fa";



function About() {
  return (
    <div className="grid grid-flow-row auto-rows-max">
      <div className="border-box h-32 w-64 border-2 border-gray-300 rounded-md flex items-center p-4 gap-4">
        <FaUserCircle size={40} className="text-500"/> 
        <div className="flex-2 text-center">
          <span>About Me</span>
        </div>
      </div>
    </div>
  )
}

export default About;