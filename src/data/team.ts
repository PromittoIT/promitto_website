// People shown on About > Our Team, and their profile pages (/about/team/<slug>/).

export interface Director {
  /** URL part of the profile page */
  slug: string;
  name: string;
  /** Board role, e.g. Chair / Executive Member / Non-Executive Member */
  role: string;
  /** Job title and organisation */
  position: string;
  image: string;
  /** Full profile; blank lines separate paragraphs */
  bio: string;
}

export interface LeadershipMember {
  name: string;
  title: string;
  image: string;
  /** Director profile to open for this person, if they also sit on the board */
  profileSlug?: string;
}

export const directors: Director[] = [
  {
    slug: 'joel-kanyi-kimani',
    name: 'Eng. Joel Kanyi Kimani',
    role: 'Chair',
    position: 'Founder & Group Chairman, Pavicon Group',
    image: '/images/board/Joel Kanyi Kimani.jpeg',
    bio: 'Joel Kanyi Kimani is the Founder and Group Chairman of Pavicon Group, a leading multidisciplinary engineering and technology company operating across Africa. With nearly two decades of leadership experience, he has grown Pavicon into a diversified enterprise delivering telecommunications, ICT, fibre optics, renewable energy, power, civil, and building solutions. He provides strategic leadership, oversees corporate governance and financial performance, and drives key partnerships across the Group. Joel holds a BSc in Mechatronics Engineering, an Executive MBA from Strathmore Business School, and professional certifications in project management, fibre optics, and logistics.',
  },
  {
    slug: 'james-kagoni',
    name: 'James Kagoni',
    role: 'Executive Member',
    position: 'Chief Executive Officer, Promitto Limited',
    image: '/images/board/jimmy-kagoni.png',
    bio: "James is a strategic business and investment leader with extensive experience in financial services, investment banking, construction financing, and real estate. As CEO of Promitto Limited, he drives strategic growth, financial performance, operational excellence, and expansion within the construction financing and property development sector. He has held senior roles in investment banking and portfolio management, including at SBG Securities, Dyer & Blair, and Ngenye Kariuki, and has also led institutional restructuring initiatives. James holds a BCom in Finance, a Master's in Leadership, and professional qualifications including CFA Level I and CPS (4), while pursuing an MBA in Strategic Management at Strathmore University.",
  },
  {
    slug: 'stephen-kihara',
    name: 'Stephen W. Kihara',
    role: 'Executive Member',
    position: 'Chief Finance Officer, Promitto Limited',
    image: '/steve.jpeg',
    bio: 'Stephen is a strategic finance executive serving as Chief Finance Officer at Promitto Limited, overseeing finance, investment, credit, and corporate planning. He leads financial strategy, budgeting, performance management, treasury, reporting, and capital allocation to support sustainable growth and strong governance. Before joining Promitto, he held senior finance roles at Text Book Centre and other leading organizations. Stephen holds a BSc in International Business Management from KCA University and is a CPA(K), with additional training in strategic management, investment analysis, and Six Sigma.',
  },
  {
    slug: 'adreen-gichore',
    name: 'Adreen Gichore',
    role: 'Executive Member',
    position: 'Chief of Staff, Promitto Limited',
    image: '/images/board/adreen.jpeg',
    bio: "Adreen is the Chief of Staff at Promitto Limited, providing executive leadership across operations, HR, credit, administration, governance, and risk management. She works closely with the CEO to drive strategic execution and organizational performance. She brings experience in financial services and administration, having held roles at cooperative financial institutions, Stockbridge Investments, Faulu Microfinance Bank, and Wambugu & Muriuki Advocates. She holds a Bachelor's degree in Community Development and Communication from Makerere University.",
  },
  {
    slug: 'fred-gachoka',
    name: 'Fred Gachoka',
    role: 'Non-Executive Member',
    position: 'Senior Account Executive, OpenText',
    image: '/images/board/Fred Gachoka.jpeg',
    bio: "Fred Gachoka is a global business development and technology sales executive with over 15 years of experience in technical sales, SaaS solutions, and business operations. He currently serves as a Senior Account Executive at OpenText in Emerging Markets and previously held senior leadership roles at SAP, where he drove major technology deals across East and West Africa. His achievements include securing multi-million-euro enterprise opportunities and pioneering major public-sector CRM and cloud deals in Kenya. Fred has also held senior positions at Oracle, FVC, Dimension Data, and MTN Business. He holds a Bachelor's degree in Business Information Technology from Strathmore University and is pursuing an MBA at Strathmore Business School.",
  },
  {
    slug: 'mary-waceke-munene',
    name: 'Mary Waceke Munene',
    role: 'Non-Executive Member',
    position: 'Senior Business Data Analyst',
    image: '/images/board/waceke-munene.png',
    bio: "Mary is a Senior Business Data Analyst, currently with the State Government of Arizona's Department of Education in the USA. She has 6 years of experience in data science and is well versed in using analytics to transform data into tangible business results.\n\nShe has worked as a business analyst with leading American organizations, including Apple and J.P. Morgan Chase, collaborating with top-tier global talent in analytics and artificial intelligence. Mary holds a Bachelor of Commerce (Finance) from JKUAT and a Master of Science in Data Analytics from Grand Canyon University, USA.",
  },
];

export const leadership: LeadershipMember[] = [
  { name: 'Jimmy Kagoni', title: 'Chief Executive Officer', image: '/images/board/jimmy-kagoni.png', profileSlug: 'james-kagoni' },
  { name: 'Machira Minyati', title: 'Project Manager', image: '/machira.jpg' },
  { name: 'Steve Kihara', title: 'Chief Finance Officer', image: '/steve.jpeg', profileSlug: 'stephen-kihara' },
  { name: 'Anastaciah Wajohi', title: 'Head of Customer Service', image: '/anastaciah.jpg' },
  { name: 'David Mwangi', title: 'Risk Manager', image: '/david.png' },
];

export const getDirector = (slug: string) => directors.find((d) => d.slug === slug);
