import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

type Props = {
  name: string;
  subtitle: string;
  image: string;
  /** Short text revealed on hover */
  excerpt?: string;
  /** Profile page; without it the card is not clickable and has no hover reveal */
  href?: string;
};

// Hover / keyboard-focus styles, written out in full so Tailwind generates them.
const HOVER = {
  photo:
    'group-hover:scale-[0.44] group-hover:shadow-xl group-hover:ring-8 group-hover:ring-white ' +
    'group-focus-visible:scale-[0.44] group-focus-visible:shadow-xl group-focus-visible:ring-8 group-focus-visible:ring-white',
  fade: 'group-hover:opacity-0 group-focus-visible:opacity-0',
  panel:
    'group-hover:translate-y-0 group-hover:bg-white group-focus-visible:translate-y-0 group-focus-visible:bg-white',
  name: 'group-hover:text-primary group-focus-visible:text-primary',
  subtitle: 'group-hover:text-accent group-focus-visible:text-accent',
  more: 'group-hover:opacity-100 group-hover:delay-200 group-focus-visible:opacity-100 group-focus-visible:delay-200',
};

/**
 * Portrait card: the photo fills the card with the name over a dark fade.
 * On hover (or keyboard focus) the photo shrinks to a framed thumbnail at the top
 * and a white panel slides up with the excerpt and "Read Profile".
 */
const TeamCard = ({ name, subtitle, image, excerpt, href }: Props) => {
  const interactive = Boolean(href);
  const h = (key: keyof typeof HOVER) => (interactive ? HOVER[key] : '');

  const body = (
    <>
      {/* Photo: full card, shrinks into the top half on hover */}
      <div
        className={`absolute inset-0 z-10 overflow-hidden rounded-2xl transition-all duration-500 ease-in-out [transform-origin:50%_6%] ${h('photo')}`}
      >
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover object-top"
        />
        {/* Dark fade so the name reads over the photo */}
        <div
          className={`absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/85 to-transparent transition-opacity duration-500 ${h('fade')}`}
        />
      </div>

      {/* Text panel: name sits on the photo, then slides up as a white panel */}
      <div
        className={`absolute inset-x-0 bottom-0 z-20 flex h-[54%] translate-y-[calc(100%-5.25rem)] flex-col px-5 pt-4 transition-all duration-500 ease-in-out ${h('panel')}`}
      >
        <h3 className={`line-clamp-1 text-lg font-bold leading-snug text-white transition-colors duration-300 ${h('name')}`}>
          {name}
        </h3>
        <p className={`mt-0.5 line-clamp-1 text-sm font-semibold text-secondary transition-colors duration-300 ${h('subtitle')}`}>
          {subtitle}
        </p>
        {interactive && (
          <div className={`mt-3 flex flex-col opacity-0 transition-opacity duration-300 ${h('more')}`}>
            {excerpt && <p className="line-clamp-4 text-sm leading-relaxed text-gray-600">{excerpt}</p>}
            <span className="mt-3 text-sm font-bold text-primary">Read Profile &rarr;</span>
          </div>
        )}
      </div>
    </>
  );

  const frame =
    'group relative block aspect-[3/4] overflow-hidden rounded-2xl bg-white shadow-md transition-shadow duration-300';

  return interactive ? (
    <Link
      href={href!}
      className={`${frame} hover:shadow-2xl focus:outline-none focus-visible:ring-4 focus-visible:ring-secondary`}
      aria-label={`${name}, ${subtitle}. Read profile`}
    >
      {body}
    </Link>
  ) : (
    <div className={frame}>{body}</div>
  );
};

export default TeamCard;
