import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '../../../../components/Header';
import Footer from '../../../../components/Footer';
import { profiles, getProfile } from '../../../../data/team';

// One page per person with a profile, built at compile time.
export function generateStaticParams() {
  return profiles.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const d = getProfile(params.slug);
  if (!d) return { title: 'Our Team | Promitto' };
  return { title: `${d.name} | ${d.team === 'board' ? 'Promitto Board of Directors' : 'Promitto Leadership'}` };
}

export default function DirectorProfilePage({ params }: { params: { slug: string } }) {
  const d = getProfile(params.slug);
  if (!d) notFound();
  const bio = d.bio;

  return (
    <main className="min-h-screen bg-white font-sans">
      <Header />

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Link
            href={`/about/team/#${d.team}`}
            className="inline-flex items-center gap-1 text-sm font-semibold text-accent transition-colors hover:text-primary"
          >
            &larr; Back to Our Team
          </Link>

          <div className="mt-8 grid gap-8 md:grid-cols-[280px_1fr] md:gap-12">
            <div className="relative mx-auto aspect-[3/4] w-full max-w-[280px] overflow-hidden rounded-2xl bg-gray-100 shadow-lg">
              <Image src={d.image} alt={d.name} fill sizes="280px" className="object-cover object-top" priority />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-primary md:text-4xl">{d.name}</h1>
              <p className="mt-2 text-lg font-semibold text-accent">{d.role}</p>
              {d.position && <p className="mt-1 text-gray-500">{d.position}</p>}
              <div className="mt-6 space-y-4 leading-relaxed text-gray-700">
                {bio.split('\n\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
