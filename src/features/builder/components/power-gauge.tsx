import type { estimatePower } from "../compatibility";
export function PowerGauge({ power, capacity }: { power: ReturnType<typeof estimatePower>; capacity?: number }) {
  const ratio=power && capacity?Math.min(1,power.minimumWatts/capacity):0;
  return <div className="rounded-xl border border-border p-4 text-center">
    <svg viewBox="0 0 220 125" className="mx-auto w-full max-w-60" role="img" aria-label={power?`Estimated load ${power.loadWatts} watts; recommended PSU ${power.recommendedWatts} watts` : "Power estimate needs CPU and GPU TDP specifications"}>
      <path d="M20 110 A90 90 0 0 1 200 110" fill="none" stroke="var(--surface-strong)" strokeWidth="12" strokeLinecap="round" />
      <path d="M20 110 A90 90 0 0 1 200 110" fill="none" stroke={ratio>1 || (power && capacity && power.minimumWatts>capacity)?"var(--danger)":"var(--accent)"} strokeWidth="12" strokeLinecap="round" pathLength="100" strokeDasharray={`${ratio*100} 100`} className="transition-all duration-500"/>
      <text x="110" y="88" textAnchor="middle" fill="var(--foreground)" fontSize="30">{power?`${power.loadWatts} W`:"—"}</text>
      <text x="110" y="112" textAnchor="middle" fill="var(--muted-foreground)" fontSize="12">estimated component load</text>
    </svg>
    <p className="text-sm">PSU recommendation: <strong>{power?`${power.recommendedWatts} W+`:"Awaiting specs"}</strong></p>
    <p className="mt-2 text-xs text-muted-foreground">CPU + GPU TDP + 100W, with 30% headroom. Check transient loads and exact manufacturer requirements.</p>
  </div>;
}
