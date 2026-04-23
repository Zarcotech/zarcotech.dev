function Info() {
  return (
    <div className="w-[320px] rounded-2xl border border-white/30 bg-black/35 p-4 text-white shadow-xl backdrop-blur-sm">
      <div className="mb-4 flex items-start gap-3">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl/50 bg-white/10 text-xs text-white/85">
          <img src="https://zarcotech.dev/pfp.png" alt="pfp" className="rounded-lg h-21 w-full object-cover object-center" />
        </div>
        <div>
          <h1 className="text-2xl font-bold leading-tight">Zarcotech</h1>
          <p className="mt-1 text-sm text-white/85">Software developer</p>
        </div>
      </div>
      <p className="text-sm leading-relaxed text-white/90">
        Passionate about building impactful software and contributing to the open source community.
      </p>
    </div>
  );
}

export default Info;
