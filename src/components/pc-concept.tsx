export function PcConcept() {
  return (
    <svg viewBox="0 0 520 540" fill="none" role="img" aria-labelledby="pc-title" className="h-auto w-full">
      <title id="pc-title">Original FUTERA concept PC illustration, not a product for sale</title>
      <defs>
        <linearGradient id="case" x1="110" y1="70" x2="415" y2="480" gradientUnits="userSpaceOnUse"><stop stopColor="#25313E"/><stop offset="1" stopColor="#0C1017"/></linearGradient>
        <linearGradient id="panel" x1="150" y1="100" x2="380" y2="420" gradientUnits="userSpaceOnUse"><stop stopColor="#14222D"/><stop offset="1" stopColor="#080C12"/></linearGradient>
        <linearGradient id="light" x1="170" y1="80" x2="450" y2="430" gradientUnits="userSpaceOnUse"><stop stopColor="#22D3EE"/><stop offset="1" stopColor="#8273BE" stopOpacity=".3"/></linearGradient>
        <radialGradient id="halo"><stop stopColor="#22D3EE" stopOpacity=".12"/><stop offset="1" stopColor="#22D3EE" stopOpacity="0"/></radialGradient>
      </defs>
      <circle cx="275" cy="280" r="250" fill="url(#halo)"/>
      <path d="m40 447 240-118 204 119-241 69L40 447Z" stroke="#26313D" strokeDasharray="3 7"/>
      <ellipse cx="275" cy="471" rx="173" ry="25" fill="#000" opacity=".4"/>
      <path d="m125 93 215-44 100 55v339l-219 49-96-63V93Z" fill="url(#case)" stroke="#465463"/>
      <path d="m125 93 96 56 219-45M221 149v343" stroke="#536574"/>
      <path d="m141 120 63 38v296l-63-39V120Z" fill="#0B1119" stroke="#30414D"/>
      <path d="m238 163 185-41v303l-185 42V163Z" fill="url(#panel)" stroke="#3B4C58"/>
      <path d="m245 170 171-38v285l-171 40V170Z" stroke="url(#light)" strokeOpacity=".5"/>
      <path d="m262 206 64-14v90l-64 14v-90Z" fill="#1B2731" stroke="#42535E"/>
      <path d="m276 220 36-8v45l-36 8v-45Z" fill="#101A23" stroke="#22D3EE"/>
      <path d="m339 188 8-2v106l-8 2V188Zm16-4 8-2v106l-8 2V184Z" fill="#22D3EE" opacity=".7"/>
      <path d="m257 320 144-31v40l-144 32v-41Z" fill="#25303C" stroke="#75828E"/>
      <path d="m266 346 122-27" stroke="#22D3EE" strokeWidth="3"/>
      <path d="m254 387 153-34v53l-153 34v-53Z" fill="#131C26" stroke="#2D3D4A"/>
      {[201, 294, 386].map((cy) => <g key={cy} transform={`translate(173 ${cy}) skewY(30)`}><ellipse rx="24" ry="34" fill="#101C26" stroke="#324853"/><ellipse rx="18" ry="26" stroke="url(#light)" strokeWidth="3"/><ellipse rx="6" ry="9" fill="#2D5661"/><path d="m0-10 8-10M7 1l8 8M-3 8l-5 11M-7-4l-8-8" stroke="#46616D" strokeWidth="4"/></g>)}
      <path d="m148 91 176-35 62 34-177 39-61-38Z" fill="#17222C" stroke="#3C4D59"/>
      <path d="m189 87 107-23m-96 30 107-23m-96 30 107-23" stroke="#63737E" strokeOpacity=".5"/>
      <circle cx="401" cy="114" r="3" fill="#22D3EE"/>
      <path d="M146 440v15l28 17v-15m214-5v13l25-6v-13" stroke="#64717B" strokeWidth="5"/>
      <path d="M115 171H60m0 0v-32M445 346h30v34" stroke="#22D3EE" strokeOpacity=".5"/>
      <circle cx="115" cy="171" r="3" fill="#22D3EE"/><circle cx="445" cy="346" r="3" fill="#22D3EE"/>
      <text x="47" y="124" fill="#899BAA" fontSize="10" fontFamily="monospace" letterSpacing="2">F / 01</text>
    </svg>
  );
}
