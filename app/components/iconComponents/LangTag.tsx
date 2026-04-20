'use client';
import Image from 'next/image';

interface Props {
  name: string;
  icon: string;
  color: string;
}

const colorMap: Record<string, string> = {
  orange: 'text-orange-500 decoration-orange-500',
  blue: 'text-blue-500 decoration-blue-500',
  yellow: 'text-yellow-500 decoration-yellow-500',
  green: 'text-green-500 decoration-green-500',
  teal: 'text-teal-500 decoration-teal-500',
  white: 'text-white decoration-white',
  red: 'text-red-500 decoration-red-500',
};

function LangTag({ name, icon, color }: Props) {
  const colorClass = colorMap[color] || 'text-gray-500 decoration-gray-500';

  return (
    <span className="relative inline-block group cursor-default">
      <span className={`relative inline-block ${colorClass}`}>
        {name}
        <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-current transition-all duration-300 ease-out group-hover:w-full"></span>
      </span>
      <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-[calc(100%+8px)] z-50 flex flex-col items-center opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 ease-out w-30 h-30">
        <Image 
          src={icon} 
          alt={name} 
          width={100} 
          height={100} 
          className="rounded-xl shadow-lg bg-white dark:bg-neutral-900" 
        />
      </span>
    </span>
  );
}

export default LangTag;
