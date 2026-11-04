'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import BoardMemberModal, { BoardMember } from '../../../components/BoardMemberModal';

type TeamTab = 'board' | 'management';

const teamTabs: { id: TeamTab; label: string }[] = [
  { id: 'board', label: 'Board of Directors' },
  { id: 'management', label: 'Our Leadership' },
];

const TeamPage = () => {
  const [selectedMember, setSelectedMember] = useState<BoardMember | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TeamTab>('board');

  // Allow linking straight to a tab: /about/team/#management
  // (also reacts when only the #hash changes, e.g. a menu link while already on this page)
  useEffect(() => {
    const syncFromHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'board' || hash === 'management') setActiveTab(hash);
    };
    syncFromHash();
    window.addEventListener('hashchange', syncFromHash);
    return () => window.removeEventListener('hashchange', syncFromHash);
  }, []);

  const selectTab = (tab: TeamTab) => {
    setActiveTab(tab);
    window.history.replaceState(null, '', `#${tab}`);
  };

  const boardMembers: BoardMember[] = [
    {
      name: 'Eng. Joel Kanyi Kimani',
      role: 'Chair',
      position: 'Founder & Group Chairman, Pavicon Group',
      image: '/images/board/Joel Kanyi Kimani.jpeg',
      bio: 'Joel Kanyi Kimani is the Founder and Group Chairman of Pavicon Group, a leading multidisciplinary engineering and technology company operating across Africa. With nearly two decades of leadership experience, he has grown Pavicon into a diversified enterprise delivering telecommunications, ICT, fibre optics, renewable energy, power, civil, and building solutions. He provides strategic leadership, oversees corporate governance and financial performance, and drives key partnerships across the Group. Joel holds a BSc in Mechatronics Engineering, an Executive MBA from Strathmore Business School, and professional certifications in project management, fibre optics, and logistics.',
    },
    {
      name: 'James Kagoni',
      role: 'Executive Member',
      position: 'Chief Executive Officer, Promitto Limited',
      image: '/images/board/jimmy-kagoni.png',
      bio: "James is a strategic business and investment leader with extensive experience in financial services, investment banking, construction financing, and real estate. As CEO of Promitto Limited, he drives strategic growth, financial performance, operational excellence, and expansion within the construction financing and property development sector. He has held senior roles in investment banking and portfolio management, including at SBG Securities, Dyer & Blair, and Ngenye Kariuki, and has also led institutional restructuring initiatives. James holds a BCom in Finance, a Master's in Leadership, and professional qualifications including CFA Level I and CPS (4), while pursuing an MBA in Strategic Management at Strathmore University.",
    },
    {
      name: 'Stephen W. Kihara',
      role: 'Executive Member',
      position: 'Chief Finance Officer, Promitto Limited',
      image: '/steve.jpeg',
      bio: 'Stephen is a strategic finance executive serving as Chief Finance Officer at Promitto Limited, overseeing finance, investment, credit, and corporate planning. He leads financial strategy, budgeting, performance management, treasury, reporting, and capital allocation to support sustainable growth and strong governance. Before joining Promitto, he held senior finance roles at Text Book Centre and other leading organizations. Stephen holds a BSc in International Business Management from KCA University and is a CPA(K), with additional training in strategic management, investment analysis, and Six Sigma.',
    },
    {
      name: 'Adreen Gichore',
      role: 'Executive Member',
      position: 'Chief of Staff, Promitto Limited',
      image: '/images/board/adreen.jpeg',
      bio: "Adreen is the Chief of Staff at Promitto Limited, providing executive leadership across operations, HR, credit, administration, governance, and risk management. She works closely with the CEO to drive strategic execution and organizational performance. She brings experience in financial services and administration, having held roles at cooperative financial institutions, Stockbridge Investments, Faulu Microfinance Bank, and Wambugu & Muriuki Advocates. She holds a Bachelor's degree in Community Development and Communication from Makerere University.",
    },
    {
      name: 'Fred Gachoka',
      role: 'Non-Executive Member',
      position: 'Senior Account Executive, OpenText',
      image: '/images/board/Fred Gachoka.jpeg',
      bio: "Fred Gachoka is a global business development and technology sales executive with over 15 years of experience in technical sales, SaaS solutions, and business operations. He currently serves as a Senior Account Executive at OpenText in Emerging Markets and previously held senior leadership roles at SAP, where he drove major technology deals across East and West Africa. His achievements include securing multi-million-euro enterprise opportunities and pioneering major public-sector CRM and cloud deals in Kenya. Fred has also held senior positions at Oracle, FVC, Dimension Data, and MTN Business. He holds a Bachelor's degree in Business Information Technology from Strathmore University and is pursuing an MBA at Strathmore Business School.",
    },
    {
      name: 'Mary Waceke Munene',
      role: 'Non-Executive Member',
      position: 'Senior Business Data Analyst',
      image: '/images/board/waceke-munene.png',
      bio: "Mary is a Senior Business Data Analyst, currently with the State Government of Arizona's Department of Education in the USA. She has 6 years of experience in data science and is well versed in using analytics to transform data into tangible business results.\n\nShe has worked as a business analyst with leading American organizations, including Apple and J.P. Morgan Chase, collaborating with top-tier global talent in analytics and artificial intelligence. Mary holds a Bachelor of Commerce (Finance) from JKUAT and a Master of Science in Data Analytics from Grand Canyon University, USA.",
    },
  ];

  const handleMemberClick = (member: BoardMember) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMember(null);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-secondary/5 font-sans">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[440px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/about_us_hero_image.jpeg"
            alt="About Promitto Limited"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/60 to-transparent"></div>
        </div>
        <div className="relative z-10 h-full flex items-end pb-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-3xl">
              <div className="flex items-center mb-4">
                <div className="w-1 h-16 bg-secondary mr-6"></div>
                <h1 className="text-4xl md:text-5xl font-bold text-white">
                  Our Team
                </h1>
              </div>
              <p className="text-xl text-white font-medium leading-relaxed">
                Meet the dedicated professionals behind Promitto's success
              </p>
            </div>
          </div>
        </div>

        {/* Team switcher: sits inside the bottom of the hero */}
        <div className="absolute inset-x-0 bottom-6 z-20 px-4">
          <div
            role="tablist"
            aria-label="Team"
            className="mx-auto flex max-w-2xl rounded-full border-4 border-white bg-gray-100 p-1.5 shadow-xl"
          >
            {teamTabs.map((tab) => {
              const on = tab.id === activeTab;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  id={`tab-${tab.id}`}
                  aria-selected={on}
                  aria-controls={`panel-${tab.id}`}
                  onClick={() => selectTab(tab.id)}
                  className={`flex-1 rounded-full px-4 py-3 text-sm font-bold transition-all duration-300 sm:py-4 sm:text-base ${
                    on
                      ? 'bg-primary text-white shadow-lg'
                      : 'text-primary/70 hover:bg-white hover:text-primary'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Board Members Section */}
      {activeTab === 'board' && (
      <section id="panel-board" role="tabpanel" aria-labelledby="tab-board" className="pt-14 pb-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="sr-only">Board of Directors</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {boardMembers.map((member) => (
              <button
                type="button"
                key={member.name}
                className="flex flex-col items-center text-center bg-gray-50 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
                onClick={() => handleMemberClick(member)}
              >
                <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-primary mb-1">{member.name}</h3>
                <p className="text-secondary font-semibold">{member.role}</p>
                <p className="mt-1 text-sm text-gray-500">{member.position}</p>
                <span className="mt-4 text-sm font-semibold text-primary/70">
                  Read profile &rarr;
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* Management Team */}
      {activeTab === 'management' && (
      <section id="panel-management" role="tabpanel" aria-labelledby="tab-management" className="pt-14 pb-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="sr-only">Our Leadership</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Jimmy Kagoni', title: 'Chief Executive Officer', img: '/images/board/jimmy-kagoni.png' },
              { name: 'Machira Minyati', title: 'Project Manager', img: '/machira.jpg' },
              { name: 'Steve Kihara', title: 'Chief Finance Officer', img: '/steve.jpeg' },
              { name: 'Anastaciah Wajohi', title: 'Head of Customer Service', img: '/anastaciah.jpg' },
              { name: 'David Mwangi', title: 'Risk Manager', img: '/david.png' },
            ].map((member, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
                {member.img ? (
                  <div className="relative w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden ">
                    <Image
                      src={member.img}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-2xl text-white font-bold">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                )}
                <h4 className="text-xl font-bold text-primary mb-2">{member.name}</h4>
                <p className="text-secondary font-semibold">{member.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* Board Member Modal */}
      <BoardMemberModal
        member={selectedMember}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />

      <Footer />
    </main>
  );
};

export default TeamPage;
