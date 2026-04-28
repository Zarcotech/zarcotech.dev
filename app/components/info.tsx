function Info() {
  return (
    <div className="select-none w-[320px] rounded-2xl border border-gray-300/70 bg-white/70 p-4 text-gray-900 shadow-xl backdrop-blur-sm dark:border-white/30 dark:bg-black/35 dark:text-white z-50" style={{pointerEvents: 'none'}}>
      <div className="mb-4 flex items-start gap-3">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl/50 bg-gray-200/70 text-xs text-gray-800 dark:bg-white/10 dark:text-white/85">
          <img src="/icons/pfp.png" alt="pfp" className="rounded-lg h-21 w-full object-cover object-center" />
        </div>
        <div>
          <h1 className="text-2xl font-bold leading-tight">Zarcotech</h1>
          <p className="mt-1 text-sm text-gray-700 dark:text-white/85">Software developer</p>
        </div>
      </div>
      <p className="text-sm leading-relaxed text-gray-800 dark:text-white/90">
        Passionate about building impactful software and contributing to the open source community.
      </p>
    </div>
  );
}

export default Info;
