export default function Loader() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#040404]">
      <div className="flex flex-col items-center gap-8 animate-loader-fade">
        <img
          src="/logo.png"
          alt="StreamNova"
          className="w-44 sm:w-60 animate-logo"
        />

        <div className="h-1 w-56 overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-1/2 rounded-full bg-red-600 animate-stream-loader" />
        </div>
      </div>
    </div>
  );
}