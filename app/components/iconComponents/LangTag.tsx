"use client";

import Image from "next/image";

interface Props {
  name: string;
  icon: string;
}

function LangTag({ name, icon }: Props) {
  return (
    <span className="relative inline-block group cursor-default">
      <span className="underline decoration-dotted underline-offset-4">
        {name}
      </span>
      <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-[calc(100%+8px)] z-50 flex flex-col items-center opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 ease-out w-30 h-30">
        <Image
          src={icon}
          alt={name}
          width={300}
          height={300}
          className="rounded-xl shadow-lg"
        />
        <span className="block w-2 h-2 bg-white dark:bg-neutral-900 rotate-45 shadow mt-[-5px]" />
      </span>
    </span>
  );
}

export default LangTag;
