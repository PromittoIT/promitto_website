'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  ArrowRightIcon,
  PauseIcon,
  PlayIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
} from '@heroicons/react/24/outline';

export type BannerSlide = {
  tab: string;
  title: string;
  description: string;
};

export type BannerAction = {
  href: string;
  label: string;
  primary?: boolean;
};

export type BannerFilter = {
  label: string;
  value: string;
};

type Props = {
  videoSrc: string;
  poster?: string;
  /** Text content. Leave slides empty for a video-only banner. */
  eyebrow?: string;
  slides?: BannerSlide[];
  actions?: BannerAction[];
  /** "hero" fills the screen; "inset" is a rounded card that fits inside a page section. */
  variant?: 'hero' | 'inset';
  rotateMs?: number;
  /** Pill buttons that filter something outside the banner (replaces the slide tabs). */
  filters?: BannerFilter[];
  activeFilter?: string | null;
  onFilterChange?: (value: string | null) => void;
  /** Show a sound on/off button. The video still starts muted (browsers block autoplay with sound). */
  withSound?: boolean;
  /** Extra content under the buttons (e.g. the search bar). */
  children?: React.ReactNode;
  /** Single button on the left, vertically centered (for video-only banners). */
  cta?: BannerAction;
};

const pill = (on: boolean) =>
  `relative overflow-hidden rounded-full border px-3 py-1.5 text-xs font-semibold backdrop-blur-md transition-all duration-300 sm:px-5 sm:py-2 sm:text-sm ${
    on
      ? 'border-secondary bg-secondary text-primary shadow-lg shadow-secondary/30'
      : 'border-white/25 bg-white/10 text-white hover:bg-white/20'
  }`;

const roundBtn =
  'flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white hover:text-primary sm:h-11 sm:w-11';

const VideoBanner = ({
  videoSrc,
  poster,
  eyebrow = '',
  slides = [],
  actions = [],
  variant = 'hero',
  rotateMs = 6000,
  filters,
  activeFilter = null,
  onFilterChange,
  withSound = false,
  cta,
  children,
}: Props) => {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isHero = variant === 'hero';
  const hasText = slides.length > 0;

  // Rotate the headline; restarts whenever the user picks a tab.
  useEffect(() => {
    if (slides.length < 2) return;
    const id = setInterval(() => setActive((i) => (i + 1) % slides.length), rotateMs);
    return () => clearInterval(id);
  }, [active, slides.length, rotateMs]);

  // Respect reduced-motion: start paused.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      videoRef.current?.pause();
      setPlaying(false);
    }
  }, []);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  const toggleSound = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    // Turning sound on should also resume a paused video.
    if (!v.muted && v.paused) {
      v.play();
      setPlaying(true);
    }
  };

  const slide = slides[active];
  const Heading = isHero ? 'h1' : 'h2';

  // Hero: 85% of three quarters of (one screen + 4rem).
  const frame = isHero
    ? 'min-h-[calc(63.75vh+2.55rem)]'
    : hasText
      ? 'min-h-[520px] rounded-3xl shadow-2xl xl:min-h-0 xl:aspect-[21/9]'
      : 'aspect-video rounded-3xl shadow-2xl';

  return (
    <section
      className={`relative overflow-hidden bg-primary ${frame}`}
      style={isHero ? { zIndex: 1 } : undefined}
    >
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src={videoSrc}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload={isHero ? 'auto' : 'metadata'}
        aria-hidden={withSound ? undefined : true}
      />

      {/* Promitto navy wash from the left (only behind text), plus a soft bottom fade for the controls */}
      {hasText && (
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/70 to-primary/10" />
      )}
      <div
        className={`absolute inset-x-0 bottom-0 bg-gradient-to-t to-transparent ${
          isHero ? 'h-48 from-black/50' : 'h-40 from-primary/70'
        }`}
      />

      <div
        className={`relative z-10 flex h-full flex-col ${
          isHero
            ? 'min-h-[calc(63.75vh+2.55rem)]'
            : hasText
              ? 'min-h-[520px] xl:absolute xl:inset-0 xl:min-h-0'
              : 'absolute inset-0'
        }`}
      >
        {hasText && (
          <div
            className={
              isHero
                ? 'mx-auto flex w-full max-w-7xl flex-1 items-center px-4 pt-8 pb-36 sm:px-6 sm:pb-24 lg:px-8'
                : 'flex w-full flex-1 items-center px-6 pt-10 pb-28 sm:px-10 lg:px-14'
            }
          >
            <div className={`text-white ${isHero ? 'w-full' : 'max-w-xl'}`}>
              <div className={isHero ? 'max-w-3xl' : undefined}>
              {eyebrow && (
                <div className={`flex items-center gap-3 ${isHero ? 'mb-4' : 'mb-4'}`}>
                  <span className="h-[3px] w-10 rounded-full bg-secondary" />
                  <span className="text-sm font-semibold uppercase tracking-[0.25em] text-secondary">
                    {eyebrow}
                  </span>
                </div>
              )}

              <div key={active} className="animate-hero-fade-up">
                <Heading
                  className={`font-black leading-[1.05] tracking-tight ${
                    isHero ? 'text-4xl md:text-5xl lg:text-6xl' : 'text-4xl md:text-5xl'
                  }`}
                >
                  {slide.title}
                </Heading>
                <p
                  className={`max-w-2xl font-light leading-relaxed text-white/90 ${
                    isHero ? 'mt-4 text-lg md:text-xl' : 'mt-4 text-base md:text-lg'
                  }`}
                >
                  {slide.description}
                </p>
              </div>
              </div>

              {/* Hero: buttons and search are centered across the banner */}
              {actions.length > 0 && (
                <div className={`flex flex-col gap-4 sm:flex-row ${isHero ? 'mt-7 sm:justify-center' : 'mt-8'}`}>
                  {actions.map((a) =>
                    a.primary ? (
                      <Link
                        key={a.href}
                        href={a.href}
                        className={`group inline-flex items-center justify-center gap-2 rounded-full bg-secondary font-bold text-primary shadow-lg transition-all duration-300 hover:bg-white hover:shadow-xl ${
                          isHero ? 'px-8 py-3.5 text-lg' : 'px-7 py-3 text-base'
                        }`}
                      >
                        {a.label}
                        <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </Link>
                    ) : (
                      <Link
                        key={a.href}
                        href={a.href}
                        className={`inline-flex items-center justify-center rounded-full border-2 border-white/40 font-bold text-white backdrop-blur-sm transition-all duration-300 hover:border-white hover:bg-white hover:text-primary ${
                          isHero ? 'px-8 py-3.5 text-lg' : 'px-7 py-3 text-base'
                        }`}
                      >
                        {a.label}
                      </Link>
                    )
                  )}
                </div>
              )}

              {children && (
                <div className={isHero ? 'mx-auto w-full max-w-4xl' : undefined}>{children}</div>
              )}
            </div>
          </div>
        )}

        {cta && (
          <div className="absolute left-0 top-0 px-10 pt-5 sm:pt-8 lg:px-14">
            <Link
              href={cta.href}
              className="group inline-flex items-center gap-2 rounded-full bg-secondary px-5 py-2.5 text-sm font-bold text-primary shadow-lg transition-all duration-300 hover:bg-white hover:shadow-xl sm:px-7 sm:py-3 sm:text-base"
            >
              {cta.label}
              <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1 sm:h-5 sm:w-5" />
            </Link>
          </div>
        )}

        {/* Bottom bar: filter or message tabs + video controls */}
        <div className={`absolute inset-x-0 ${isHero ? 'bottom-8' : 'bottom-3 sm:bottom-6'}`}>
          <div
            className={`flex items-center gap-3 ${
              isHero
                ? // Hero: tabs centered; side padding leaves room for the pause button on the right
                  'relative mx-auto max-w-7xl justify-center px-14 sm:px-16 lg:px-20'
                : 'justify-between px-3 sm:px-10 lg:px-14'
            }`}
          >
            {filters ? (
              <div className="flex flex-wrap gap-1.5 sm:gap-3" role="group" aria-label="Filter by bedrooms">
                {filters.map((f) => {
                  const on = f.value === activeFilter;
                  return (
                    <button
                      key={f.value}
                      aria-pressed={on}
                      onClick={() => onFilterChange?.(on ? null : f.value)}
                      className={pill(on)}
                    >
                      {f.label}
                    </button>
                  );
                })}
              </div>
            ) : (
              <div
                className={`flex flex-wrap gap-2 sm:gap-3 ${isHero ? 'justify-center' : ''}`}
                role="tablist"
                aria-label={`${eyebrow} highlights`}
              >
                {slides.length > 1 &&
                  slides.map((s, i) => (
                    <button
                      key={s.tab}
                      role="tab"
                      aria-selected={i === active}
                      onClick={() => setActive(i)}
                      className={pill(i === active)}
                    >
                      {s.tab}
                      {i === active && (
                        <span
                          key={active}
                          className="absolute bottom-0 left-0 h-[3px] bg-primary/40 animate-hero-progress"
                          style={{ animationDuration: `${rotateMs}ms` }}
                        />
                      )}
                    </button>
                  ))}
              </div>
            )}

            <div className={`flex shrink-0 gap-2 ${isHero ? 'absolute right-4 sm:right-6 lg:right-8' : ''}`}>
              {withSound && (
                <button
                  onClick={toggleSound}
                  aria-label={muted ? 'Turn sound on' : 'Mute sound'}
                  aria-pressed={!muted}
                  className={`${roundBtn} ${muted ? '' : '!border-secondary !bg-secondary !text-primary'}`}
                >
                  {muted ? <SpeakerXMarkIcon className="h-5 w-5" /> : <SpeakerWaveIcon className="h-5 w-5" />}
                </button>
              )}
              <button
                onClick={togglePlay}
                aria-label={playing ? 'Pause video' : 'Play video'}
                className={roundBtn}
              >
                {playing ? <PauseIcon className="h-5 w-5" /> : <PlayIcon className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoBanner;
