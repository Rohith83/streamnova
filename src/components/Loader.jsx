export default function Loader() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#050505]">
      <div className="animate-loader-fade flex flex-col items-center gap-6">
        <div className="text-5xl sm:text-7xl font-black tracking-tight">
          <span className="text-red-600">Stream</span>
          <span className="text-white">Nova</span>
        </div>

        <div className="h-1 w-52 overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-1/2 animate-stream-loader rounded-full bg-red-600" />
        </div>

        <p className="text-xs uppercase tracking-[0.35em] text-white/50">
          Loading Experience
        </p>
      </div>
    </div>
  );
}