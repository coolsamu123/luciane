export type TileConfig = {
  key: string;
  dur: number;
  href: string;
  accent: "warm" | "deep";
  src?: string;
  poster?: string;
};

export function Tile({
  config,
  label,
}: {
  config: TileConfig;
  label: string;
}) {
  const style = {
    "--dur": `${config.dur}s`,
    "--delay": `${-(config.dur * 0.37)}s`,
  } as React.CSSProperties;

  return (
    <a
      href={config.href}
      className="tile group relative block overflow-hidden border-r border-b border-bone/[0.04] aspect-square md:aspect-auto"
      style={style}
    >
      {config.src ? (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={config.src}
          poster={config.poster}
          muted
          autoPlay
          loop
          playsInline
        />
      ) : (
        <div className={`absolute inset-0 tile-drift tile-drift--${config.accent}`} />
      )}
      <div className="absolute inset-0 bg-ink/30 group-hover:bg-ink/10 transition-colors duration-500" />
      <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-7">
        <span className="font-mono text-[10px] uppercase tracking-widest text-bone/40 mb-2 group-hover:text-bone/70 transition-colors">
          {String(config.dur).padEnd(4, "0").slice(0, 4)}s
        </span>
        <span className="font-serif text-2xl md:text-3xl lg:text-4xl text-bone/70 group-hover:text-bone transition-colors">
          {label}
        </span>
      </div>
    </a>
  );
}
