import { classNames } from "../utils/helpers";

export function CardSkeleton({ className = "" }) {
  return (
    <div className={classNames("flex-shrink-0", className)}>
      <div className="skeleton rounded-xl aspect-[2/3] w-full mb-2" />
      <div className="skeleton h-3 w-3/4 rounded mb-1" />
      <div className="skeleton h-3 w-1/2 rounded" />
    </div>
  );
}

export function RowSkeleton({ count = 6 }) {
  return (
    <div className="flex gap-4 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} className="w-[160px] sm:w-[200px]" />
      ))}
    </div>
  );
}

export function GridSkeleton({ count = 12 }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="skeleton w-full h-[70vh] rounded-b-2xl" />
  );
}

export function DetailsSkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="skeleton w-full h-[40vh] rounded-2xl mb-8" />
      <div className="flex gap-6">
        <div className="skeleton w-48 h-72 rounded-xl flex-shrink-0" />
        <div className="flex-1 space-y-3">
          <div className="skeleton h-8 w-2/3 rounded" />
          <div className="skeleton h-4 w-1/3 rounded" />
          <div className="skeleton h-4 w-full rounded" />
          <div className="skeleton h-4 w-full rounded" />
          <div className="skeleton h-4 w-1/2 rounded" />
        </div>
      </div>
    </div>
  );
}
