"use client";

import { useEffect, useRef, useState } from "react";
import { withBase } from "@/lib/path";

type Section = {
  id: string;
  kicker: string;
  body: string;
  emphasis?: boolean;
  italic?: boolean;
};

type Labels = {
  scrollHint: string;
  soundOn: string;
  soundOff: string;
};

export function BReader({
  sections,
  labels,
}: {
  sections: Section[];
  labels: Labels;
}) {
  const [active, setActive] = useState(0);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max <= 0 ? 0 : h.scrollTop / max);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const idx = Number(e.target.getAttribute("data-idx"));
            if (!Number.isNaN(idx)) setActive(idx);
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = muted;
  }, [muted]);

  return (
    <>
      <div className="fixed inset-0 z-0">
        <VideoPlaceholder videoRef={videoRef} />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-ink/50 to-ink/80" />
      </div>

      <div className="relative z-10">
        {sections.map((s, i) => (
          <section
            key={s.id}
            ref={(el) => { refs.current[i] = el; }}
            data-idx={i}
            className="min-h-svh flex items-end px-6 md:px-12 pb-24 md:pb-32"
          >
            <div
              className={`max-w-3xl transition-opacity duration-700 ${
                active === i ? "opacity-100" : "opacity-30"
              }`}
            >
              <div className="font-mono text-[11px] uppercase tracking-widest text-bone/70 mb-4">
                {s.kicker}
              </div>
              <p
                className={
                  s.emphasis
                    ? "font-serif text-bone text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.95] tracking-tightest"
                    : s.italic
                      ? "font-serif italic text-bone/90 text-3xl md:text-4xl"
                      : "font-serif text-bone/90 text-2xl md:text-4xl leading-snug text-balance"
                }
              >
                {s.body}
              </p>
            </div>
          </section>
        ))}
      </div>

      <aside className="fixed top-1/2 right-3 md:right-5 -translate-y-1/2 z-20 hidden sm:flex flex-col items-center gap-2">
        <div className="h-48 w-px bg-bone/15 relative">
          <div
            className="absolute top-0 left-0 w-px bg-ocre"
            style={{ height: `${progress * 100}%` }}
          />
          {sections.map((_, i) => (
            <span
              key={i}
              className={`absolute -left-[3px] w-[7px] h-px ${
                active === i ? "bg-ocre" : "bg-bone/30"
              }`}
              style={{ top: `${(i / Math.max(1, sections.length - 1)) * 100}%` }}
            />
          ))}
        </div>
        <span className="font-mono text-[10px] uppercase tracking-widest text-bone/40 rotate-90 origin-center mt-6 whitespace-nowrap">
          {String(active + 1).padStart(2, "0")} / {String(sections.length).padStart(2, "0")}
        </span>
      </aside>

      <button
        onClick={() => setMuted((m) => !m)}
        className="fixed bottom-5 right-5 z-30 font-mono text-[11px] uppercase tracking-widest text-bone/70 hover:text-bone transition-colors"
      >
        {muted ? `◎ ${labels.soundOff}` : `● ${labels.soundOn}`}
      </button>

      {active === 0 && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-20 font-mono text-[10px] uppercase tracking-widest text-bone/40 animate-pulse">
          {labels.scrollHint} ↓
        </div>
      )}
    </>
  );
}

function VideoPlaceholder({
  videoRef,
}: {
  videoRef: React.RefObject<HTMLVideoElement | null>;
}) {
  return (
    <div className="absolute inset-0 b-placeholder">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        poster={withBase("/posters/b-loop.jpg")}
        muted
        autoPlay
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
      >
        <source
          src={withBase("/clips/b-loop-720.mp4")}
          type="video/mp4"
          media="(min-width: 768px)"
        />
        <source
          src={withBase("/clips/b-loop-480.mp4")}
          type="video/mp4"
        />
      </video>
    </div>
  );
}
