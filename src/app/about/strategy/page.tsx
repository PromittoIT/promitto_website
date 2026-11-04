import React from 'react';
import Image from 'next/image';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

// Content from "Promitto Limited Strategic Plan & Vision (2026 - 2028)" (public/strategy).

const deliveryModels = [
  'Partnerships (Government & Institutions, Saccos)',
  'Joint Ventures',
  'Buy and Build',
  '30 - 70% Arrangement',
];

const strategicGoals = [
  {
    title: 'Operational Efficiency in Project Management',
    points: [
      'Efficient systems',
      'Standardized processes',
      'Clear communication',
      'Timely project delivery',
      'Prudent financial management',
      'Customer satisfaction',
      'Reduction in error rate',
    ],
  },
  {
    title: 'Growth',
    points: [
      'High value, high volume projects',
      'Revenue growth',
      'Loan book',
      'Regional expansion',
      'Mortgage establishment / partnerships',
    ],
  },
  {
    title: 'Dominance',
    points: ['60% market share'],
  },
  {
    title: 'Shareholders Value',
    points: ['IRR of at least 20% per annum', 'IPO listing'],
  },
];

const excellencePeriods = ['Dec 2026', 'Jun 2027', 'Dec 2027', 'Jun 2028', 'Dec 2028'];

const excellenceTargets: { measure: string; values: number[] }[] = [
  { measure: 'Efficient System', values: [60, 80, 90, 100, 100] },
  { measure: 'Clear Communication', values: [80, 100, 100, 100, 100] },
  { measure: 'Standardized Processes', values: [55, 75, 95, 100, 100] },
  { measure: 'Timely Project Delivery', values: [70, 90, 100, 100, 100] },
  { measure: 'Prudent Financial Management', values: [70, 90, 100, 100, 100] },
  { measure: 'Customer Satisfaction', values: [70, 90, 100, 100, 100] },
  { measure: 'Error Reduction', values: [65, 85, 95, 100, 100] },
];

const growthTargets = [
  { label: 'Revenue Growth', detail: 'Double-digit growth annually' },
  { label: 'Company Valuation', detail: '10B by 2028' },
  { label: 'Loan Book', detail: 'Growing our construction financing book' },
  { label: 'Partnerships', detail: 'Expanding institutional partnerships' },
];

const roadMap = [
  { stage: 'Sourcing', teams: ['Marketing', 'B. Development', 'Customer Service', 'Finance', 'Super Agents', 'Head of Corporate'] },
  { stage: 'Packaging', teams: ['Architect', 'Quantity Surveyor', 'Legal'] },
  { stage: 'Analyzing', teams: ['Finance', 'Quantity Surveyors', 'Risk'] },
  { stage: 'Funding', teams: ['Credit', 'Finance'] },
  { stage: 'Implementing', teams: ['Project Managers', 'Contractors'] },
];

const coreValues = [
  'Integrity',
  'Innovation',
  'Agility',
  'Transparency',
  'Impact',
  'Operational Excellence',
  'Professionalism',
];

const SectionTitle = ({ eyebrow, title, light = false }: { eyebrow: string; title: string; light?: boolean }) => (
  <div className="mb-10 text-center">
    <div className="mb-3 flex items-center justify-center gap-3">
      <span className="h-[3px] w-8 rounded-full bg-secondary" />
      <span className="text-sm font-semibold uppercase tracking-[0.25em] text-secondary">{eyebrow}</span>
      <span className="h-[3px] w-8 rounded-full bg-secondary" />
    </div>
    <h2 className={`text-3xl font-bold md:text-4xl ${light ? 'text-white' : 'text-primary'}`}>{title}</h2>
  </div>
);

// Shade a target cell: amber once it hits 100%, lighter tints below that.
const cellTone = (v: number) =>
  v >= 100 ? 'bg-secondary text-primary font-bold' : v >= 85 ? 'bg-secondary/40 text-primary' : 'bg-secondary/15 text-primary';

export default function StrategyPage() {
  return (
    <main className="min-h-screen bg-white font-sans">
      <Header />

      {/* Hero */}
      <section className="relative h-[400px] overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/about_us_hero_image.jpeg" alt="Promitto team on site" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/20" />
        </div>
        <div className="relative z-10 flex h-full items-end pb-12">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="mb-4 flex items-center">
                <div className="mr-6 h-16 w-1 bg-secondary" />
                <h1 className="text-4xl font-bold text-white md:text-5xl">Our Strategy</h1>
              </div>
              <p className="text-xl font-medium leading-relaxed text-white">Strategic Plan &amp; Vision (2026 - 2028)</p>
            </div>
          </div>
        </div>
      </section>

      {/* Promitto + Vision */}
      <section className="py-16">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="mb-6 text-3xl font-bold text-primary">Promitto</h2>
            <div className="space-y-4 text-lg leading-relaxed text-gray-700">
              <p>
                Promitto Limited is a home ownership company, offering a unique combination of project management and
                construction financing under one roof.
              </p>
              <p>
                This innovative model has disrupted the traditional construction system by introducing simplicity,
                efficiency in cost management, and homeownership-friendly repayment structures.
              </p>
              <p>
                Clients select their preferred architectural designs from our in-house portfolio or submit their custom
                design that is quoted against. The client will then deposit at least{' '}
                <span className="font-bold text-primary">30% of the project cost</span> and the business funds the rest
                of the project cost.
              </p>
            </div>
          </div>

          <div className="rounded-3xl bg-primary p-8 text-white shadow-2xl md:p-10">
            <span className="text-sm font-semibold uppercase tracking-[0.25em] text-secondary">Our Vision</span>
            <p className="mt-4 text-2xl font-bold leading-snug md:text-3xl">
              To offer structured and innovative housing programs in Africa
            </p>
            <div className="mt-8 overflow-hidden rounded-2xl bg-white p-3">
              <Image
                src="/strategy/structured.jpeg"
                alt="Unstructured versus structured housing development"
                width={768}
                height={341}
                className="h-auto w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Achieved through */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-5xl px-4">
          <SectionTitle eyebrow="How we deliver" title="Achieved Through" />
          <div className="grid gap-6 sm:grid-cols-2">
            {['Project Management', 'Construction Financing'].map((pillar) => (
              <div
                key={pillar}
                className="rounded-2xl border-2 border-primary bg-white px-6 py-5 text-center text-xl font-bold text-primary shadow-md"
              >
                {pillar}
              </div>
            ))}
          </div>
          {/* Connector */}
          <div className="mx-auto hidden h-10 w-1/2 rounded-b-3xl border-x-2 border-b-2 border-primary/40 sm:block" />
          <div className="mx-auto h-8 w-0.5 bg-primary/40" />
          <div className="rounded-2xl bg-primary p-6 shadow-xl">
            <div className="flex flex-wrap justify-center gap-3">
              {deliveryModels.map((m) => (
                <span key={m} className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/20">
                  {m}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4 Strategic goals */}
      <section className="bg-primary py-16">
        <div className="mx-auto max-w-7xl px-4">
          <SectionTitle eyebrow="2026 - 2028" title="The 4 Strategic Goals" light />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {strategicGoals.map((goal, i) => (
              <div key={goal.title} className="relative rounded-2xl bg-white/5 p-6 pt-10 ring-1 ring-white/15">
                <span className="absolute -top-5 left-6 flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-lg font-black text-primary shadow-lg">
                  {i + 1}
                </span>
                <h3 className="mb-4 text-lg font-bold text-white">{goal.title}</h3>
                <ul className="space-y-2">
                  {goal.points.map((pt) => (
                    <li key={pt} className="flex gap-2 text-sm text-white/85">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Operational excellence */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4">
          <SectionTitle eyebrow="Goal 1" title="Operational Excellence Targets" />
          <div className="overflow-x-auto rounded-2xl shadow-lg ring-1 ring-gray-200">
            <table className="w-full min-w-[640px] border-collapse text-sm">
              <thead>
                <tr className="bg-primary text-white">
                  <th className="px-4 py-3 text-left font-semibold">Measure</th>
                  {excellencePeriods.map((p) => (
                    <th key={p} className="px-3 py-3 text-center font-semibold">{p}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {excellenceTargets.map((row) => (
                  <tr key={row.measure} className="border-t border-gray-200">
                    <td className="bg-white px-4 py-3 font-medium text-primary">{row.measure}</td>
                    {row.values.map((v, i) => (
                      <td key={i} className="p-1.5">
                        <div className={`rounded-md py-2 text-center ${cellTone(v)}`}>{v}%</div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Growth, dominance, shareholder value */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-6xl space-y-16 px-4">
          <div>
            <SectionTitle eyebrow="Goal 2" title="Growth" />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {growthTargets.map((g) => (
                <div key={g.label} className="rounded-2xl border-t-4 border-secondary bg-white p-6 shadow-md">
                  <h3 className="text-lg font-bold text-primary">{g.label}</h3>
                  <p className="mt-2 text-gray-600">{g.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <SectionTitle eyebrow="Goal 3" title="Dominance" />
            <div className="overflow-hidden rounded-3xl shadow-xl">
              <Image
                src="/strategy/dominance-map.jpg"
                alt="Target of 60% market share across Promitto's African markets and Kenyan regions"
                width={1324}
                height={890}
                className="h-auto w-full"
              />
            </div>
            <p className="mt-4 text-center text-lg text-gray-700">
              A target of <span className="font-bold text-primary">60% market share</span> across our African markets and
              key regions in Kenya.
            </p>
          </div>

          <div>
            <SectionTitle eyebrow="Goal 4" title="Shareholders Value" />
            <div className="mx-auto grid max-w-3xl gap-6 sm:grid-cols-2">
              <div className="rounded-2xl bg-primary p-8 text-center text-white shadow-xl">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">Dividends</p>
                <p className="mt-3 text-4xl font-black">20%</p>
                <p className="mt-1 text-white/80">Annual return</p>
              </div>
              <div className="rounded-2xl bg-primary p-8 text-center text-white shadow-xl">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">IPO</p>
                <p className="mt-3 text-4xl font-black">2028</p>
                <p className="mt-1 text-white/80">Listing target</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Road map */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          <SectionTitle eyebrow="How a project flows" title="Strategic Road Map" />
          <ol className="grid gap-4 md:grid-cols-5">
            {roadMap.map((step, i) => (
              <li key={step.stage} className="relative rounded-2xl bg-white p-5 shadow-md ring-1 ring-gray-200">
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <h3 className="text-base font-bold uppercase tracking-wide text-primary">{step.stage}</h3>
                </div>
                <ul className="space-y-1.5 text-sm text-gray-700">
                  {step.teams.map((t) => (
                    <li key={t} className="rounded-md bg-gray-50 px-3 py-1.5">{t}</li>
                  ))}
                </ul>
                {i < roadMap.length - 1 && (
                  <span className="absolute -right-3 top-8 z-10 hidden h-6 w-6 items-center justify-center rounded-full bg-secondary text-xs font-bold text-primary md:flex">
                    &rarr;
                  </span>
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Core values */}
      <section className="bg-primary py-16">
        <div className="mx-auto max-w-5xl px-4">
          <SectionTitle eyebrow="What guides us" title="Core Values" light />
          <div className="flex flex-wrap justify-center gap-3">
            {coreValues.map((v) => (
              <span key={v} className="rounded-full bg-secondary px-5 py-2.5 font-semibold text-primary shadow-lg">
                {v}
              </span>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
