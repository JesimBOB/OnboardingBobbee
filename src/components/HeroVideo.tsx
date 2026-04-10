type HeroVideoProps = {
  title: string;
  description: string;
  videoSrc?: string;
};

const videoHighlights = [
  { label: "Format", value: "message d'accueil" },
  { label: "Contenu", value: "mission + reperes" },
  { label: "Usage", value: "sur le premier ecran" }
];

export function HeroVideo({ title, description, videoSrc }: HeroVideoProps) {
  const videoFrame = videoSrc ? (
    <div className="overflow-hidden rounded-3xl border border-white/70 shadow-card">
      <video
        className="aspect-video w-full object-cover"
        controls
        preload="metadata"
        aria-label={title}
      >
        <source src={videoSrc} />
        Votre navigateur ne supporte pas la lecture video.
      </video>
    </div>
  ) : (
    <div className="relative aspect-video overflow-hidden rounded-3xl border border-white/50 bg-[linear-gradient(135deg,#6e4913_0%,#c98529_42%,#f8d874_100%)] shadow-card">
      <div className="honeycomb-overlay absolute inset-0 opacity-15" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.3),transparent_35%),linear-gradient(180deg,transparent_45%,rgba(53,39,25,0.12)_100%)]"
        aria-hidden="true"
      />

      <div className="absolute left-6 top-6 rounded-full border border-white/30 bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-white/95 backdrop-blur-sm">
        Vidéo de bienvenue
      </div>

      <div className="relative flex h-full flex-col justify-center gap-6 p-6 text-white sm:p-8">
        <div className="grid place-items-center">
          <div className="grid h-20 w-20 place-items-center rounded-full bg-white text-honey-700 shadow-card">
            <span className="ml-1 block h-0 w-0 border-y-[12px] border-l-[18px] border-y-transparent border-l-honey-500" />
          </div>
        </div>

        <div className="mx-auto max-w-xl space-y-3 text-center">
          <p className="text-xl font-semibold sm:text-2xl leading-tight">Un message d'accueil pour poser le cadre.</p>
          <p className="text-sm leading-6 text-white/90 sm:text-base">
            Branchez ici la vidéo officielle BOBBEE. Le composant accepte déjà une source vidéo locale dès que vous en avez une.
          </p>
        </div>
      </div>

      <div className="absolute inset-x-5 bottom-5 flex flex-wrap items-center gap-3 rounded-2xl bg-white/95 px-4 py-3 text-sm text-hive-ink shadow-soft-md backdrop-blur-sm">
        <span className="h-2 w-2 rounded-full bg-honey-500" aria-hidden="true" />
        <span className="font-semibold">Présentation BOBBEE</span>
        <span className="h-1 w-1 rounded-full bg-hive-line" aria-hidden="true" />
        <span className="text-hive-ink/70">4 min</span>
        <span className="h-1 w-1 rounded-full bg-hive-line" aria-hidden="true" />
        <span className="text-hive-ink/70">Vision + repères + installation</span>
      </div>
    </div>
  );

  return (
    <section className="panel relative overflow-hidden p-6 sm:p-8">
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(248,216,116,0.12),transparent_40%),linear-gradient(180deg,rgba(255,255,255,0.85),rgba(255,250,240,0.95))]"
        aria-hidden="true"
      />

      <div className="relative space-y-6">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="eyebrow">Vidéo d'accueil</p>
            <span className="inline-block rounded-full border border-hive-line/50 bg-honey-25/80 px-3 py-1.5 text-xs font-semibold text-hive-ink/70 tracking-wider">
              Lecture centrale
            </span>
          </div>
          <h2 className="font-display text-3xl leading-snug text-hive-ink sm:text-4xl font-semibold">{title}</h2>
          <p className="max-w-2xl text-sm leading-7 text-hive-ink/75 sm:text-base">{description}</p>
        </div>

        {videoFrame}

        <dl className="grid gap-3 sm:grid-cols-3">
          {videoHighlights.map((item) => (
            <div key={item.label} className="rounded-2xl border border-hive-line/40 bg-white/70 p-5 backdrop-blur-sm transition-all duration-250 hover:bg-white/85 hover:shadow-soft">
              <dt className="text-xs font-semibold uppercase tracking-wider text-hive-ink/60">{item.label}</dt>
              <dd className="mt-2.5 text-sm font-semibold text-hive-ink">{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
