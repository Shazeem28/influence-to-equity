"use client";

import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';
import {
  TrendingUp,
  Users,
  ShieldCheck,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  Info,
  ChevronRight,
  XCircle,
} from 'lucide-react';

// --- DATA FROM RESEARCH PAPER ---

const skimsRevenueData = [
  { year: '2020', revenue: 145 },
  { year: '2021', revenue: 275 },
  { year: '2022', revenue: 500 },
  { year: '2023', revenue: 750 },
  { year: '2024', revenue: 1000 },
];

const adidasStockData = [
  { period: '2019', price: 270, event: 'Stable' },
  { period: '2020', price: 280, event: 'COVID Crash' },
  { period: '2021', price: 330, event: 'Peak' },
  { period: '2022', price: 140, event: 'Yeezy End' },
  { period: '2023', price: 160, event: 'Recovery' },
];

// --- COMPONENTS ---

const Navigation = ({ activeTab, setActiveTab }) => (
  <nav className="bg-slate-900 text-white p-4 shadow-lg sticky top-0 z-50">
    <div className="max-w-6xl mx-auto flex justify-between items-center">
      <div
        className="flex items-center space-x-2 cursor-pointer"
        onClick={() => setActiveTab('Home')}
      >
        <div className="bg-blue-500 p-1 rounded">
          <TrendingUp size={20} className="text-white" />
        </div>
        <span className="font-bold text-xl tracking-tight">Influence to Equity</span>
      </div>
      <div className="hidden md:flex space-x-6">
        {['Home', 'ADI Calculator', 'Case Studies'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`text-sm font-medium transition-colors hover:text-blue-400 ${
              activeTab === tab
                ? 'text-blue-400 border-b-2 border-blue-400 pb-1'
                : 'text-slate-300'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      {/* Mobile Menu */}
      <div className="md:hidden">
        <select
          value={activeTab}
          onChange={(e) => setActiveTab(e.target.value)}
          className="bg-slate-800 text-white border-none rounded p-1"
        >
          {['Home', 'ADI Calculator', 'Case Studies'].map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>
    </div>
  </nav>
);

const Hero = ({ setActiveTab }) => (
  <div className="bg-gradient-to-b from-slate-900 to-slate-800 text-white py-20 px-4">
    <div className="max-w-4xl mx-auto text-center">
      <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
        Can Creator Brands Build <span className="text-blue-400">Lasting Value?</span>
      </h1>
      <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
        From SKIMS to Yeezy, discover why some celebrity brands become institutions while
        others fade. Powered by the <strong>ADI Framework</strong>.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <button
          onClick={() => setActiveTab('ADI Calculator')}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg transition-all flex items-center justify-center gap-2"
        >
          Validate a Brand <ChevronRight size={18} />
        </button>
        <button
          onClick={() => setActiveTab('Case Studies')}
          className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-8 rounded-lg transition-all"
        >
          View Case Studies
        </button>
      </div>
    </div>
  </div>
);

const MetricInput = ({ label, value, setValue, min, max, unit, tooltip }) => (
  <div className="mb-6">
    <div className="flex justify-between mb-2">
      <label className="font-semibold text-slate-700 flex items-center gap-2">
        {label}
        <div className="group relative">
          <Info size={14} className="text-slate-400 cursor-help" />
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-2 bg-slate-800 text-white text-xs rounded hidden group-hover:block z-10 shadow-xl">
            {tooltip}
          </div>
        </div>
      </label>
      <span className="font-mono text-blue-600 font-bold">
        {value}
        {unit}
      </span>
    </div>
    <input
      type="range"
      min={min}
      max={max}
      value={value}
      onChange={(e) => setValue(Number(e.target.value))}
      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
    />
  </div>
);

const Calculator = () => {
  // Authenticity Metrics
  const [organicEMV, setOrganicEMV] = useState(50);
  const [founderContent, setFounderContent] = useState(15);

  // Differentiation Metrics
  const [repeatPurchase, setRepeatPurchase] = useState(20);
  const [reviewSentiment, setReviewSentiment] = useState(3.5);

  // Institutionalization Metrics
  const [founderOwnership, setFounderOwnership] = useState(80);
  const [governanceScore, setGovernanceScore] = useState(3); // 1-5 scale

  const [totalScore, setTotalScore] = useState(0);
  const [verdict, setVerdict] = useState('');

  useEffect(() => {
    // Algorithm based on paper's evaluation guides

    // 1. Authenticity Score (Max 33)
    let authScore = 0;
    authScore += (organicEMV / 100) * 16.5;
    authScore += Math.min(founderContent / 30, 1) * 16.5;

    // 2. Differentiation Score (Max 33)
    let diffScore = 0;
    diffScore += Math.min(repeatPurchase / 35, 1) * 16.5; // Cap at 35%
    diffScore += Math.min((reviewSentiment - 1) / 4, 1) * 16.5; // Scale 1-5

    // 3. Institutionalization Score (Max 34)
    let instScore = 0;
    instScore += (founderOwnership < 50 ? 1 : (100 - founderOwnership) / 50) * 17;
    instScore += (governanceScore / 5) * 17;

    const total = Math.round(authScore + diffScore + instScore);
    setTotalScore(total);

    if (total >= 80) setVerdict('Institutional Grade (e.g., SKIMS, Casamigos)');
    else if (total >= 50) setVerdict('Sustainable Niche (e.g., Fenty)');
    else setVerdict('Hype Cycle / High Risk (e.g., Item Beauty, Yeezy)');
  }, [
    organicEMV,
    founderContent,
    repeatPurchase,
    reviewSentiment,
    founderOwnership,
    governanceScore,
  ]);

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
        <div className="bg-slate-50 p-6 border-b border-slate-100">
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <BarChart3 className="text-blue-500" /> ADI Validator Engine
          </h2>
          <p className="text-slate-600 mt-1">
            Input brand metrics to assess long-term equity potential.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 p-8">
          <div>
            <h3 className="text-blue-600 font-bold uppercase text-xs tracking-wider mb-4 flex items-center gap-2">
              <Users size={16} /> Pillar 1: Authenticity
            </h3>
            <MetricInput
              label="Organic Earned Media %"
              value={organicEMV}
              setValue={setOrganicEMV}
              min={0}
              max={100}
              unit="%"
              tooltip="Percentage of mentions that are unpaid. Rhode achieved 99% organic EMV."
            />
            <MetricInput
              label="Founder Content Frequency"
              value={founderContent}
              setValue={setFounderContent}
              min={0}
              max={100}
              unit="%"
              tooltip="How often the creator posts about the product. Target is ≥30%."
            />

            <h3 className="text-purple-600 font-bold uppercase text-xs tracking-wider mb-4 mt-8 flex items-center gap-2">
              <CheckCircle size={16} /> Pillar 2: Differentiation
            </h3>
            <MetricInput
              label="Repeat Purchase Rate"
              value={repeatPurchase}
              setValue={setRepeatPurchase}
              min={0}
              max={60}
              unit="%"
              tooltip="Percentage of customers who buy again. SKIMS is >50%."
            />
            <MetricInput
              label="Review Sentiment (1-5)"
              value={reviewSentiment}
              setValue={setReviewSentiment}
              min={1}
              max={5}
              unit=" stars"
              tooltip="Average 3rd party review score. >4.0 signals quality."
            />
          </div>

          <div>
            <h3 className="text-emerald-600 font-bold uppercase text-xs tracking-wider mb-4 flex items-center gap-2">
              <ShieldCheck size={16} /> Pillar 3: Institutionalization
            </h3>
            <MetricInput
              label="Founder Ownership"
              value={founderOwnership}
              setValue={setFounderOwnership}
              min={0}
              max={100}
              unit="%"
              tooltip="High ownership (>50%) often signals key-person risk."
            />
            <MetricInput
              label="Governance Strength"
              value={governanceScore}
              setValue={setGovernanceScore}
              min={1}
              max={5}
              unit="/5"
              tooltip="Presence of independent board, experienced ops team, and crisis protocols."
            />

            <div className="mt-10 p-6 bg-slate-900 rounded-xl text-center text-white shadow-inner relative overflow-hidden">
              <div className="relative z-10">
                <div className="text-slate-400 text-sm uppercase tracking-widest font-semibold mb-2">
                  Predicted Longevity Score
                </div>
                <div
                  className={`text-6xl font-black mb-2 ${
                    totalScore > 75
                      ? 'text-green-400'
                      : totalScore > 45
                      ? 'text-yellow-400'
                      : 'text-red-400'
                  }`}
                >
                  {totalScore}
                </div>
                <div className="text-lg font-medium text-blue-200">{verdict}</div>
              </div>
              <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-spin-slow"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Comparison Components ---

const ComparisonPillar = ({
  pillarNumber,
  title,
  icon: Icon,
  description,
  color,
  successBrand,
  failureBrand,
  children,
}) => (
  <div className="mb-20 relative">
    <div className="flex items-center gap-3 mb-6">
      <div className="p-3 rounded-xl shadow-lg text-white" style={{ backgroundColor: color }}>
        <Icon size={24} />
      </div>
      <div>
        <h2 className="text-3xl font-extrabold text-slate-900">
          {pillarNumber}. {title}
        </h2>
        <div
          className="h-1 w-20 mt-2 rounded-full opacity-50"
          style={{ backgroundColor: color }}
        ></div>
      </div>
    </div>

    <p
      className="text-slate-600 text-lg mb-8 max-w-4xl leading-relaxed border-l-4 pl-4"
      style={{ borderColor: color }}
    >
      {description}
    </p>

    <div className="grid md:grid-cols-2 gap-8">
      {/* Success Card */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-100 flex flex-col">
        <div className="p-6 text-white relative overflow-hidden" style={{ backgroundColor: color }}>
          <div className="flex justify-between items-start relative z-10">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest opacity-75 mb-1">
                The Winner
              </div>
              <h3 className="text-3xl font-black">{successBrand.name}</h3>
              <p className="text-white/90 font-medium">{successBrand.founder}</p>
            </div>
            <CheckCircle size={32} className="text-white opacity-90" />
          </div>
          {/* Decoration */}
          <div className="absolute -right-6 -bottom-6 opacity-10 transform rotate-12">
            <Icon size={140} />
          </div>
        </div>

        <div className="p-6 flex-grow flex flex-col">
          <div className="mb-6">
            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wide mb-3">
              Winning Strategy
            </h4>
            <p className="text-slate-700 leading-relaxed">{successBrand.strategy}</p>
          </div>

          <div className="mt-auto bg-slate-50 rounded-xl p-4 grid grid-cols-2 gap-4 border border-slate-100">
            {successBrand.metrics.map((m, i) => (
              <div key={i}>
                <div className="text-xs text-slate-400 font-bold uppercase">{m.label}</div>
                <div className="text-lg font-bold text-slate-800">{m.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Failure Card */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-100 flex flex-col">
        <div className="p-6 bg-slate-800 text-white relative overflow-hidden">
          <div className="flex justify-between items-start relative z-10">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest opacity-50 mb-1 text-red-400">
                The Cautionary Tale
              </div>
              <h3 className="text-3xl font-black">{failureBrand.name}</h3>
              <p className="text-white/70 font-medium">{failureBrand.founder}</p>
            </div>
            <XCircle size={32} className="text-red-400" />
          </div>
        </div>

        <div className="p-6 flex-grow flex flex-col">
          <div className="mb-6">
            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wide mb-3">
              Why It Failed
            </h4>
            <p className="text-slate-700 leading-relaxed">{failureBrand.strategy}</p>
          </div>

          <div className="mt-auto bg-slate-50 rounded-xl p-4 grid grid-cols-2 gap-4 border border-slate-100">
            {failureBrand.metrics.map((m, i) => (
              <div key={i}>
                <div className="text-xs text-slate-400 font-bold uppercase">{m.label}</div>
                <div className="text-lg font-bold text-slate-800">{m.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* Embedded Chart Section if children exist */}
    {children && (
      <div className="mt-8 bg-white p-8 rounded-2xl shadow-md border border-slate-200">
        {children}
      </div>
    )}
  </div>
);

const CaseStudies = () => (
  <div className="max-w-6xl mx-auto py-16 px-4">
    {/* 1. Authenticity */}
    <ComparisonPillar
      pillarNumber="1"
      title="Authenticity"
      icon={Users}
      color="#3b82f6"
      description="Authenticity is not about follower count; it's about credibility and congruence. The most successful brands align the creator's values, expertise, and audience with the product's purpose."
      successBrand={{
        name: 'Rhode',
        founder: 'Hailey Bieber',
        strategy:
          "Built on Bieber's established 'clean girl' aesthetic. She consistently used the product in organic content, creating a seamless extension of her persona.",
        metrics: [
          { label: 'Organic EMV', value: '99%' },
          { label: 'Revenue (2025)', value: '$200M+' },
        ],
      }}
      failureBrand={{
        name: 'Item Beauty',
        founder: 'Addison Rae',
        strategy:
          "A misalignment between a dancer's teen audience and a prestige-priced 'clean' beauty line. The involvement felt surface-level and transactional.",
        metrics: [
          { label: 'Sephora Status', value: 'Removed' },
          { label: 'Follower Growth', value: '-6%' },
        ],
      }}
    />

    {/* 2. Differentiation */}
    <ComparisonPillar
      pillarNumber="2"
      title="Product Differentiation"
      icon={CheckCircle}
      color="#8b5cf6"
      description="Product differentiation transforms trust into loyalty. In today's market, consumers judge creator-led brands by product quality, innovation, and reliability—not just the name."
      successBrand={{
        name: 'SKIMS',
        founder: 'Kim Kardashian',
        strategy:
          'Invested heavily in fabric R&D and inclusive sizing (XXS-5X). The product solves a genuine market gap (shapewear) rather than just being merch.',
        metrics: [
          { label: 'Repeat Purchase', value: '>50%' },
          { label: 'Valuation', value: '$4B+' },
        ],
      }}
      failureBrand={{
        name: 'The Honest Co.',
        founder: 'Jessica Alba',
        strategy:
          "Relied on 'clean/safe' claims that were legally challenged. When product efficacy was questioned, the celebrity halo couldn't save the retention rates.",
        metrics: [
          { label: 'IPO Valuation', value: '$1.7B' },
          { label: 'Post-IPO Trend', value: 'Declining' },
        ],
      }}
    >
      {/* Chart embedded in the Differentiation section */}
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-slate-900 mb-2">The 'Product First' Payoff</h3>
          <p className="text-slate-600 mb-4">
            SKIMS' focus on product innovation led to explosive revenue growth that outpaced typical
            celebrity brands.
          </p>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div> SKIMS Revenue ($M)
          </div>
        </div>
        <div className="h-64 w-full md:w-2/3">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={skimsRevenueData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="year" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip
                cursor={{ fill: '#f8fafc' }}
                contentStyle={{
                  borderRadius: '8px',
                  border: 'none',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                }}
              />
              <Bar dataKey="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={50} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </ComparisonPillar>

    {/* 3. Institutionalization */}
    <ComparisonPillar
      pillarNumber="3"
      title="Institutionalization"
      icon={ShieldCheck}
      color="#10b981"
      description="Institutionalization ensures success outlasts the creator. Enduring brands build systems, teams, and governance that reduce key-person risk."
      successBrand={{
        name: 'Casamigos',
        founder: 'George Clooney',
        strategy:
          "Distributed leadership among 3 founders. Built a brand ethos ('House of Friends') larger than Clooney himself, enabling a successful exit to Diageo.",
        metrics: [
          { label: 'Exit Value', value: '$1B' },
          { label: 'Volume', value: '2.7M Cases' },
        ],
      }}
      failureBrand={{
        name: 'Yeezy',
        founder: 'Kanye West',
        strategy:
          '100% founder ownership with no board or governance. Adidas had no control over the founder\'s conduct, leading to a catastrophic collapse.',
        metrics: [
          { label: 'Lost Revenue', value: '~$1.7B' },
          { label: 'Governance', value: 'None' },
        ],
      }}
    >
      {/* Chart embedded in the Institutionalization section */}
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-slate-900 mb-2">The Cost of Key-Person Risk</h3>
          <p className="text-slate-600 mb-4">
            Without institutional governance, Adidas suffered a massive stock drop when the
            partnership imploded.
          </p>
          <div className="p-4 bg-red-50 rounded-lg border border-red-100 text-red-800 text-sm font-medium">
            <AlertTriangle size={16} className="inline mr-2" />
            Event: Adidas ends Yeezy partnership (~69% drop from peak)
          </div>
        </div>
        <div className="h-64 w-full md:w-2/3">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={adidasStockData}>
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="period" axisLine={false} tickLine={false} />
              <YAxis domain={[100, 400]} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  borderRadius: '8px',
                  border: 'none',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                }}
              />
              <Area
                type="monotone"
                dataKey="price"
                stroke="#ef4444"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorPrice)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </ComparisonPillar>
  </div>
);

// Top-level page component
export default function Home() {
  const [activeTab, setActiveTab] = useState('Home');
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-grow">
        {activeTab === 'Home' && <Hero setActiveTab={setActiveTab} />}
        {activeTab === 'ADI Calculator' && <Calculator />}
        {activeTab === 'Case Studies' && <CaseStudies />}
      </main>
      <footer className="bg-slate-900 text-slate-400 py-8 text-center text-sm">
        <p>Made by Shazeem Kudchiwala</p>
      </footer>
    </div>
  );
}