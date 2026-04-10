const firstSteps = [
  "Comprendre la culture BOBBEE",
  "Rencontrer les bons relais",
  "Installer son poste sans friction"
];

export function OnboardingIllustration() {
  return (
    <section className="panel relative overflow-hidden p-6 sm:p-8">
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(248,216,116,0.34),transparent_42%),linear-gradient(180deg,rgba(255,255,255,0.86),rgba(255,248,235,0.96))]"
        aria-hidden="true"
      />

      <div className="relative space-y-6">
        <div className="overflow-hidden rounded-[2rem] border border-hive-line/80 bg-white/72 p-4 shadow-soft">
          <div
            role="img"
            aria-labelledby="onboarding-illustration-title onboarding-illustration-description"
            className="space-y-5"
          >
            <div className="rounded-[1.75rem] bg-[linear-gradient(180deg,#fffaf1_0%,#ffe6a3_100%)] p-4">
              <svg viewBox="0 0 360 260" className="w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="8" y="10" width="344" height="240" rx="30" fill="#FFFDF8" opacity=".58" />

                <g opacity=".45" stroke="#E8C66B" strokeWidth="4">
                  <path d="M255 38 273 48 273 68 255 78 237 68 237 48Z" />
                  <path d="M291 58 309 68 309 88 291 98 273 88 273 68Z" />
                  <path d="M255 78 273 88 273 108 255 118 237 108 237 88Z" />
                  <path d="M219 58 237 68 237 88 219 98 201 88 201 68Z" />
                </g>

                <g>
                  <rect x="40" y="86" width="178" height="118" rx="28" fill="#FFF8EB" stroke="#E9D3A8" strokeWidth="4" />
                  <circle cx="85" cy="126" r="24" fill="#EEB24B" />
                  <circle cx="85" cy="118" r="10" fill="#FFF8EB" />
                  <path d="M63 156c5-14 17-20 31-20s26 6 31 20" fill="#F2C559" />
                  <rect x="126" y="112" width="60" height="10" rx="5" fill="#8C5C16" opacity=".26" />
                  <rect x="126" y="132" width="48" height="10" rx="5" fill="#8C5C16" opacity=".18" />
                  <rect x="126" y="154" width="66" height="10" rx="5" fill="#8C5C16" opacity=".18" />
                </g>

                <g>
                  <rect x="222" y="98" width="98" height="74" rx="22" fill="#FFFDF8" stroke="#E9D3A8" strokeWidth="4" />
                  <circle cx="272" cy="135" r="20" fill="#7B8F5B" />
                  <path d="m264 136 6 6 11-12" stroke="#FFF8EB" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                </g>

                <g>
                  <rect x="220" y="182" width="106" height="54" rx="20" fill="#FFFFFF" stroke="#E9D3A8" strokeWidth="4" />
                  <circle cx="244" cy="209" r="8" fill="#EEB24B" />
                  <path d="M262 209h36" stroke="#8C5C16" strokeWidth="6" strokeLinecap="round" opacity=".28" />
                </g>

                <g>
                  <circle cx="56" cy="54" r="20" fill="#FFFFFF" opacity=".8" />
                  <path d="M48 54h16M56 46v16" stroke="#EEB24B" strokeWidth="4" strokeLinecap="round" />
                </g>
              </svg>
            </div>

            <div className="space-y-3 px-1 pb-1">
              <p className="eyebrow">Bienvenue dans la ruche</p>
              <h1
                id="onboarding-illustration-title"
                className="font-display text-4xl leading-tight text-hive-ink sm:text-5xl"
              >
                Un onboarding clair, doux et bien balise.
              </h1>
              <p id="onboarding-illustration-description" className="text-base leading-8 text-hive-ink/75">
                BOBBEE rassemble la presentation, les outils et les bons relais pour que les premiers jours restent
                simples a suivre.
              </p>
            </div>
          </div>
        </div>

        <ul className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
          {firstSteps.map((step, index) => (
            <li key={step} className="rounded-[1.5rem] border border-hive-line bg-white/78 p-4 shadow-soft">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-hive-ink/55">Etape {index + 1}</p>
              <p className="mt-2 text-sm font-semibold text-hive-ink">{step}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
