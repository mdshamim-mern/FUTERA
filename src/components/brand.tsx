import Link from "next/link";

export function Brand() {
  return <Link href="/" aria-label="FUTERA home" className="brand-link">
    <span className="brand-mark" aria-hidden="true"><svg viewBox="0 0 40 40" fill="none"><path d="M10 9h24l-5 6H17v5h12l-5 6h-7v7h-7V9Z" fill="currentColor"/><path d="m27 30 7-9v9h-7Z" fill="var(--primary)"/></svg></span>
    <span className="brand-type" aria-hidden="true"><span className="brand-word">FUT<span>ERA</span></span><span className="brand-caption">Build beyond ordinary</span></span>
  </Link>;
}
