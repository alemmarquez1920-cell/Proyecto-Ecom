/** Logo Alameda del Kit Depilación: gota verde con línea blanca y la palabra en minúscula. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg viewBox="0 0 18 22" className="h-[1.375em] w-[1.125em]" aria-hidden="true">
        <path d="M9 1 C14 6 16 10 16 14 A7 7 0 0 1 2 14 C2 10 4 6 9 1 Z" fill="#1E5B46" />
        <path d="M9 8 V19" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
      <span className="font-display font-bold tracking-tight text-verde">alameda</span>
    </span>
  );
}
