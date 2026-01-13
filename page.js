'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Star, Sparkles, MapPin, Zap, Target, TrendingUp, 
  Check, X, Menu, ChevronDown, ChevronRight, Play, ArrowRight,
  Brain, Trophy, Heart,
  Mail, Lock, Eye, EyeOff, Loader2, LogOut, User,
  Globe, Smartphone, XCircle, Plus,
  Utensils, Settings, Key, Save, Trash2, RotateCcw
} from 'lucide-react';

// ============================================
// MAIN APP
// ============================================
export default function NomiApp() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const userData = localStorage.getItem('nomi-user');
      if (userData) {
        setUser(JSON.parse(userData));
        setCurrentPage('dashboard');
      }
    } catch (e) {}
    setIsLoading(false);
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('nomi-user', JSON.stringify(userData));
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('nomi-user');
    setCurrentPage('landing');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-violet-500 animate-spin" />
      </div>
    );
  }

  if (currentPage === 'dashboard' && user) return <Dashboard user={user} onLogout={handleLogout} />;
  if (currentPage === 'login') return <LoginPage onLogin={handleLogin} onBack={() => setCurrentPage('landing')} onSignup={() => setCurrentPage('signup')} />;
  if (currentPage === 'signup') return <SignupPage onLogin={handleLogin} onBack={() => setCurrentPage('landing')} onLoginClick={() => setCurrentPage('login')} />;
  return <LandingPage onLogin={() => setCurrentPage('login')} onSignup={() => setCurrentPage('signup')} />;
}

// ============================================
// LANDING PAGE
// ============================================
const LandingPage = ({ onLogin, onSignup }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const features = [
    { icon: Brain, title: 'AI That Knows You', description: 'Nomi learns your taste preferences and dietary goals for personalized recommendations.' },
    { icon: Trophy, title: 'Restaurant Rankings', description: 'Track and rank every restaurant. Build your personal food journal with smart comparisons.' },
    { icon: Target, title: 'Smart Macro Tracking', description: 'Set calorie and protein goals, log meals, and track your daily progress.' },
    { icon: MapPin, title: 'Location-Aware', description: 'Tell Nomi where you are and get recommendations that fit your calorie budget.' }
  ];

  const faqs = [
    { q: 'How is Nomi different?', a: 'Nomi combines diet tracking with restaurant discovery and AI recommendations — all in one app.' },
    { q: 'Is my data private?', a: 'Yes! All data is stored locally in your browser. Nothing is sent to any server.' },
    { q: 'Do I need an API key?', a: 'Only for AI recommendations. Get one free at console.anthropic.com. Your key stays on your device.' },
    { q: 'Can I use Nomi without AI?', a: 'Absolutely! Diet tracking and restaurant ranking work fully offline.' }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-br from-violet-500 to-fuchsia-500 p-2 rounded-xl">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">Nomi</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-400 hover:text-white">Features</a>
              <a href="#faq" className="text-gray-400 hover:text-white">FAQ</a>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <button onClick={onLogin} className="text-gray-400 hover:text-white">Log in</button>
              <button onClick={onSignup} className="px-4 py-2 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-semibold rounded-lg">Get Started</button>
            </div>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden bg-black/95 border-t border-white/10 px-4 py-6 space-y-4">
            <a href="#features" className="block text-gray-400">Features</a>
            <a href="#faq" className="block text-gray-400">FAQ</a>
            <hr className="border-white/10" />
            <button onClick={onLogin} className="block w-full text-left text-gray-400">Log in</button>
            <button onClick={onSignup} className="block w-full py-2 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-lg text-center font-semibold">Get Started</button>
          </div>
        )}
      </nav>

      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-500/10 border border-violet-500/20 rounded-full text-violet-400 text-sm mb-8">
            <Sparkles className="w-4 h-4" /> The AI That Knows Your Taste
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Meet <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">Nomi</span>
          </h1>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Your AI food companion that tracks nutrition, ranks restaurants, and knows what you'll love.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={onSignup} className="px-8 py-4 bg-gradient-to-r from-violet-500 to-fuchsia-500 font-bold rounded-xl flex items-center justify-center gap-2">
              Start Free <ArrowRight className="w-5 h-5" />
            </button>
            <a href="#features" className="px-8 py-4 bg-white/10 border border-white/20 rounded-xl flex items-center justify-center gap-2">
              Learn More <ChevronDown className="w-5 h-5" />
            </a>
          </div>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-gray-500">
            <div className="flex items-center gap-2"><Check className="w-5 h-5 text-emerald-500" /> Free to use</div>
            <div className="flex items-center gap-2"><Check className="w-5 h-5 text-emerald-500" /> Data stays local</div>
            <div className="flex items-center gap-2"><Check className="w-5 h-5 text-emerald-500" /> No signup required</div>
          </div>
        </div>
      </section>

      <section id="features" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Why foodies love <span className="text-violet-400">Nomi</span></h2>
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((f, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-violet-500/50 transition-colors">
                <div className="bg-violet-500/20 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                  <f.icon className="w-7 h-7 text-violet-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                <p className="text-gray-400">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">FAQ</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/5">
                  <span className="font-semibold">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && <div className="px-6 pb-4 text-gray-400">{faq.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 border border-violet-500/30 rounded-3xl p-12">
            <h2 className="text-4xl font-bold mb-4">Ready to meet Nomi?</h2>
            <p className="text-gray-400 text-lg mb-8">Start tracking your nutrition and discovering great restaurants.</p>
            <button onClick={onSignup} className="px-8 py-4 bg-gradient-to-r from-violet-500 to-fuchsia-500 font-bold rounded-xl">Get Started Free</button>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 py-8 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-violet-500 to-fuchsia-500 p-1.5 rounded-lg">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold">Nomi</span>
          </div>
          <p className="text-gray-500 text-sm">© 2025 Nomi</p>
        </div>
      </footer>
    </div>
  );
};

// ============================================
// AUTH PAGES
// ============================================
const LoginPage = ({ onLogin, onBack, onSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 500));
    if (email && password.length >= 6) onLogin({ email, name: email.split('@')[0] });
    else setError('Invalid email or password');
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white flex">
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-white mb-8">
            <ChevronRight className="w-5 h-5 rotate-180" /> Back
          </button>
          <div className="flex items-center gap-2 mb-8">
            <div className="bg-gradient-to-br from-violet-500 to-fuchsia-500 p-2 rounded-xl"><Sparkles className="w-6 h-6" /></div>
            <span className="text-2xl font-bold">Nomi</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">Welcome back</h1>
          <p className="text-gray-400 mb-8">Log in to continue</p>
          {error && <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6 text-red-400">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-violet-500" placeholder="you@example.com" required />
              </div>
            </div>
            <div>
              <label className="block text-sm mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} className="w-full pl-12 pr-12 py-3 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-violet-500" placeholder="••••••••" required />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">{showPw ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}</button>
              </div>
            </div>
            <button type="submit" disabled={loading} className="w-full py-3 bg-gradient-to-r from-violet-500 to-fuchsia-500 font-bold rounded-xl disabled:opacity-50 flex items-center justify-center">
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Log in'}
            </button>
          </form>
          <p className="text-center text-gray-400 mt-8">No account? <button onClick={onSignup} className="text-violet-400 hover:underline">Sign up</button></p>
        </div>
      </div>
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 items-center justify-center">
        <div className="text-center"><div className="text-6xl mb-4">👋</div><h2 className="text-2xl font-bold">Welcome back!</h2></div>
      </div>
    </div>
  );
};

const SignupPage = ({ onLogin, onBack, onLoginClick }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 6) { setError('Password must be 6+ characters'); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 500));
    onLogin({ email, name });
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white flex">
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 items-center justify-center">
        <div className="text-center"><div className="text-6xl mb-4">🎯</div><h2 className="text-2xl font-bold">Hi, I'm Nomi</h2></div>
      </div>
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-white mb-8">
            <ChevronRight className="w-5 h-5 rotate-180" /> Back
          </button>
          <div className="flex items-center gap-2 mb-8">
            <div className="bg-gradient-to-br from-violet-500 to-fuchsia-500 p-2 rounded-xl"><Sparkles className="w-6 h-6" /></div>
            <span className="text-2xl font-bold">Nomi</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">Create account</h1>
          <p className="text-gray-400 mb-8">Let's get to know your taste</p>
          {error && <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6 text-red-400">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm mb-2">Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-violet-500" placeholder="Your name" required />
              </div>
            </div>
            <div>
              <label className="block text-sm mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-violet-500" placeholder="you@example.com" required />
              </div>
            </div>
            <div>
              <label className="block text-sm mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} className="w-full pl-12 pr-12 py-3 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-violet-500" placeholder="••••••••" required />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">{showPw ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}</button>
              </div>
            </div>
            <button type="submit" disabled={loading} className="w-full py-3 bg-gradient-to-r from-violet-500 to-fuchsia-500 font-bold rounded-xl disabled:opacity-50 flex items-center justify-center">
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Create Account'}
            </button>
          </form>
          <p className="text-center text-gray-400 mt-8">Have an account? <button onClick={onLoginClick} className="text-violet-400 hover:underline">Log in</button></p>
        </div>
      </div>
    </div>
  );
};

// ============================================
// DASHBOARD
// ============================================
const Dashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');
  
  const [dietGoals, setDietGoals] = useState(() => {
    try { return JSON.parse(localStorage.getItem('nomi-goals')) || { calories: 2000, protein: 150 }; } catch { return { calories: 2000, protein: 150 }; }
  });
  
  const [todaysMeals, setTodaysMeals] = useState(() => {
    try { return JSON.parse(localStorage.getItem(`nomi-meals-${new Date().toDateString()}`)) || []; } catch { return []; }
  });

  const [savedMeals, setSavedMeals] = useState(() => {
    try { return JSON.parse(localStorage.getItem('nomi-saved')) || [
      { id: 1, name: 'Oatmeal with Berries', calories: 350, protein: 12, icon: '🥣' },
      { id: 2, name: 'Grilled Chicken Salad', calories: 450, protein: 42, icon: '🥗' },
      { id: 3, name: 'Salmon with Rice', calories: 550, protein: 38, icon: '🍣' },
      { id: 4, name: 'Protein Smoothie', calories: 280, protein: 30, icon: '🥤' },
    ]; } catch { return []; }
  });

  const [restaurants, setRestaurants] = useState(() => {
    try { return JSON.parse(localStorage.getItem('nomi-restaurants')) || []; } catch { return []; }
  });

  const [apiKey, setApiKey] = useState(() => localStorage.getItem('nomi-api-key') || '');
  const [location, setLocation] = useState(() => localStorage.getItem('nomi-location') || '');

  useEffect(() => { localStorage.setItem('nomi-goals', JSON.stringify(dietGoals)); }, [dietGoals]);
  useEffect(() => { localStorage.setItem(`nomi-meals-${new Date().toDateString()}`, JSON.stringify(todaysMeals)); }, [todaysMeals]);
  useEffect(() => { localStorage.setItem('nomi-saved', JSON.stringify(savedMeals)); }, [savedMeals]);
  useEffect(() => { localStorage.setItem('nomi-restaurants', JSON.stringify(restaurants)); }, [restaurants]);
  useEffect(() => { localStorage.setItem('nomi-api-key', apiKey); }, [apiKey]);
  useEffect(() => { localStorage.setItem('nomi-location', location); }, [location]);

  const consumed = todaysMeals.reduce((a, m) => ({ calories: a.calories + m.calories, protein: a.protein + m.protein }), { calories: 0, protein: 0 });
  const remaining = { calories: dietGoals.calories - consumed.calories, protein: dietGoals.protein - consumed.protein };

  const tasteProfile = useMemo(() => {
    if (!restaurants.length) return null;
    const cuisines = {};
    let price = 0, returns = 0;
    restaurants.forEach(r => { cuisines[r.cuisine] = (cuisines[r.cuisine] || 0) + 1; price += r.priceRange || 2; if (r.wouldReturn) returns++; });
    return {
      topCuisines: Object.entries(cuisines).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([c]) => c),
      avgPrice: (price / restaurants.length).toFixed(1),
      returnRate: Math.round((returns / restaurants.length) * 100),
      total: restaurants.length
    };
  }, [restaurants]);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Target },
    { id: 'tracker', label: 'Diet', icon: Utensils },
    { id: 'restaurants', label: 'Rankings', icon: Trophy },
    { id: 'discover', label: 'AI', icon: Sparkles },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <nav className="bg-black/50 border-b border-white/10 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-violet-500 to-fuchsia-500 p-2 rounded-xl"><Sparkles className="w-5 h-5" /></div>
            <span className="font-bold">Nomi</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400 hidden sm:block">Hey, {user.name}!</span>
            <button onClick={onLogout} className="text-gray-400 hover:text-white"><LogOut className="w-5 h-5" /></button>
          </div>
        </div>
      </nav>

      <div className="bg-black/30 border-b border-white/10 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 flex gap-1 py-2 overflow-x-auto">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${activeTab === t.id ? 'bg-violet-500' : 'text-gray-400 hover:bg-white/10'}`}>
              <t.icon className="w-4 h-4" /><span className="hidden sm:inline">{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'overview' && <Overview user={user} remaining={remaining} dietGoals={dietGoals} consumed={consumed} restaurants={restaurants} tasteProfile={tasteProfile} todaysMeals={todaysMeals} />}
        {activeTab === 'tracker' && <Tracker dietGoals={dietGoals} todaysMeals={todaysMeals} setTodaysMeals={setTodaysMeals} savedMeals={savedMeals} setSavedMeals={setSavedMeals} remaining={remaining} consumed={consumed} />}
        {activeTab === 'restaurants' && <Restaurants restaurants={restaurants} setRestaurants={setRestaurants} />}
        {activeTab === 'discover' && <Discover apiKey={apiKey} location={location} setLocation={setLocation} remaining={remaining} tasteProfile={tasteProfile} restaurants={restaurants} />}
        {activeTab === 'settings' && <SettingsTab apiKey={apiKey} setApiKey={setApiKey} dietGoals={dietGoals} setDietGoals={setDietGoals} />}
      </main>
    </div>
  );
};

// ============================================
// OVERVIEW
// ============================================
const Overview = ({ user, remaining, dietGoals, consumed, restaurants, tasteProfile, todaysMeals }) => (
  <div className="space-y-6">
    <h1 className="text-2xl font-bold">Hey, {user.name}! ✨</h1>
    
    <div className="grid md:grid-cols-4 gap-4">
      <StatCard icon={Zap} color="violet" label="Calories Left" value={remaining.calories} sub={`of ${dietGoals.calories}`} pct={(consumed.calories / dietGoals.calories) * 100} />
      <StatCard icon={TrendingUp} color="blue" label="Protein Left" value={`${remaining.protein}g`} sub={`of ${dietGoals.protein}g`} pct={(consumed.protein / dietGoals.protein) * 100} />
      <StatCard icon={Trophy} color="amber" label="Restaurants" value={restaurants.length} sub="ranked" />
      <StatCard icon={Utensils} color="fuchsia" label="Meals Today" value={todaysMeals.length} sub="logged" />
    </div>

    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <h3 className="font-semibold mb-4 flex items-center gap-2"><Utensils className="w-5 h-5 text-violet-400" /> Today's Meals</h3>
        {todaysMeals.length === 0 ? <p className="text-gray-500 text-center py-8">No meals logged yet</p> : (
          <div className="space-y-3">{todaysMeals.slice(0, 4).map((m, i) => (
            <div key={i} className="flex items-center gap-3 py-2 border-b border-white/5 last:border-0">
              <span className="text-xl">{m.icon || '🍽️'}</span>
              <div className="flex-1"><p className="font-medium">{m.name}</p><p className="text-sm text-gray-500">{m.calories} cal • {m.protein}g</p></div>
            </div>
          ))}</div>
        )}
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <h3 className="font-semibold mb-4 flex items-center gap-2"><Heart className="w-5 h-5 text-fuchsia-400" /> Taste Profile</h3>
        {!tasteProfile ? <p className="text-gray-500 text-center py-8">Rank restaurants to build your profile!</p> : (
          <div className="space-y-4">
            <div><p className="text-gray-400 text-sm mb-2">Top Cuisines</p>
              <div className="flex flex-wrap gap-2">{tasteProfile.topCuisines.map((c, i) => <span key={i} className="px-3 py-1 bg-violet-500/20 text-violet-300 rounded-full text-sm">{c}</span>)}</div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div><p className="text-2xl font-bold text-violet-400">{'$'.repeat(Math.round(tasteProfile.avgPrice))}</p><p className="text-xs text-gray-500">Avg Price</p></div>
              <div><p className="text-2xl font-bold text-emerald-400">{tasteProfile.returnRate}%</p><p className="text-xs text-gray-500">Return Rate</p></div>
              <div><p className="text-2xl font-bold text-amber-400">{tasteProfile.total}</p><p className="text-xs text-gray-500">Visits</p></div>
            </div>
          </div>
        )}
      </div>
    </div>

    {restaurants.length > 0 && (
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <h3 className="font-semibold mb-4 flex items-center gap-2"><Trophy className="w-5 h-5 text-amber-400" /> Top Restaurants</h3>
        <div className="space-y-3">{restaurants.slice(0, 5).map((r, i) => (
          <div key={r.id} className="flex items-center gap-4 py-2 border-b border-white/5 last:border-0">
            <span className={`font-bold w-8 ${i === 0 ? 'text-amber-400' : i === 1 ? 'text-gray-300' : i === 2 ? 'text-amber-600' : 'text-gray-500'}`}>#{i + 1}</span>
            <div className="flex-1"><p className="font-medium">{r.name}</p><p className="text-sm text-gray-500">{r.cuisine} • {'$'.repeat(r.priceRange || 2)}</p></div>
            <span className="text-violet-400 font-bold">{r.score?.toFixed(1)}</span>
          </div>
        ))}</div>
      </div>
    )}
  </div>
);

const StatCard = ({ icon: Icon, color, label, value, sub, pct }) => (
  <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
    <div className="flex items-center gap-3 mb-4">
      <div className={`bg-${color}-500/20 p-2 rounded-lg`}><Icon className={`w-5 h-5 text-${color}-400`} /></div>
      <span className="text-gray-400">{label}</span>
    </div>
    <div className={`text-3xl font-bold text-${color}-400`}>{value}</div>
    <div className="text-sm text-gray-500 mt-1">{sub}</div>
    {pct !== undefined && (
      <div className="mt-3 h-2 bg-white/10 rounded-full overflow-hidden">
        <div className={`h-2 rounded-full bg-${color}-500 transition-all`} style={{ width: `${Math.min(100, pct)}%` }} />
      </div>
    )}
  </div>
);

// ============================================
// DIET TRACKER
// ============================================
const Tracker = ({ todaysMeals, setTodaysMeals, savedMeals, setSavedMeals, remaining, consumed, dietGoals }) => {
  const [showAdd, setShowAdd] = useState(false);
  const [showQuick, setShowQuick] = useState(false);
  const [meal, setMeal] = useState({ name: '', calories: '', protein: '', icon: '🍽️' });
  const icons = ['🍽️', '🥣', '🥗', '🍕', '🍔', '🌮', '🍣', '🥤', '🍳', '🥪', '🍜', '🥡'];

  const addMeal = () => {
    if (meal.name && meal.calories) {
      setTodaysMeals([...todaysMeals, { ...meal, id: Date.now(), calories: +meal.calories, protein: +meal.protein || 0, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
      setMeal({ name: '', calories: '', protein: '', icon: '🍽️' });
      setShowAdd(false);
    }
  };

  const saveMeal = () => {
    if (meal.name && meal.calories) {
      setSavedMeals([...savedMeals, { id: Date.now(), name: meal.name, calories: +meal.calories, protein: +meal.protein || 0, icon: meal.icon }]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Diet Tracker</h1>
        <div className="flex gap-2">
          <button onClick={() => setShowQuick(true)} className="px-4 py-2 bg-white/10 rounded-lg flex items-center gap-2"><Zap className="w-4 h-4" /> Quick</button>
          <button onClick={() => setShowAdd(true)} className="px-4 py-2 bg-violet-500 rounded-lg flex items-center gap-2"><Plus className="w-4 h-4" /> Log</button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <ProgressCard label="Calories" value={remaining.calories} total={dietGoals.calories} consumed={consumed.calories} color="violet" />
        <ProgressCard label="Protein" value={`${remaining.protein}g`} total={`${dietGoals.protein}g`} consumed={`${consumed.protein}g`} color="blue" />
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <h3 className="font-semibold mb-4">Today's Meals</h3>
        {todaysMeals.length === 0 ? (
          <div className="text-center py-12"><Utensils className="w-12 h-12 text-gray-600 mx-auto mb-3" /><p className="text-gray-500">No meals yet</p></div>
        ) : (
          <div className="space-y-3">{todaysMeals.map(m => (
            <div key={m.id} className="flex items-center gap-4 p-3 bg-black/30 rounded-xl">
              <span className="text-2xl">{m.icon}</span>
              <div className="flex-1"><p className="font-medium">{m.name}</p><p className="text-sm text-gray-500">{m.time}</p></div>
              <div className="text-right"><p className="font-semibold text-violet-400">{m.calories} cal</p><p className="text-sm text-gray-500">{m.protein}g</p></div>
              <button onClick={() => setTodaysMeals(todaysMeals.filter(x => x.id !== m.id))} className="text-gray-400 hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
            </div>
          ))}</div>
        )}
      </div>

      {showAdd && (
        <Modal onClose={() => setShowAdd(false)} title="Log a Meal">
          <div className="space-y-4">
            <div><label className="block text-sm mb-2">Icon</label><div className="flex flex-wrap gap-2">{icons.map(i => <button key={i} onClick={() => setMeal({ ...meal, icon: i })} className={`text-2xl p-2 rounded-lg ${meal.icon === i ? 'bg-violet-500/30 ring-2 ring-violet-500' : 'bg-white/5'}`}>{i}</button>)}</div></div>
            <div><label className="block text-sm mb-2">Name</label><input value={meal.name} onChange={e => setMeal({ ...meal, name: e.target.value })} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl outline-none" placeholder="Grilled Chicken" /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="block text-sm mb-2">Calories</label><input type="number" value={meal.calories} onChange={e => setMeal({ ...meal, calories: e.target.value })} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl outline-none" placeholder="450" /></div>
              <div><label className="block text-sm mb-2">Protein (g)</label><input type="number" value={meal.protein} onChange={e => setMeal({ ...meal, protein: e.target.value })} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl outline-none" placeholder="35" /></div>
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button onClick={() => setShowAdd(false)} className="flex-1 py-3 bg-white/10 rounded-xl">Cancel</button>
            <button onClick={saveMeal} className="py-3 px-4 bg-white/10 rounded-xl" title="Save"><Heart className="w-5 h-5" /></button>
            <button onClick={addMeal} className="flex-1 py-3 bg-violet-500 rounded-xl font-semibold">Add</button>
          </div>
        </Modal>
      )}

      {showQuick && (
        <Modal onClose={() => setShowQuick(false)} title="Quick Add">
          <div className="space-y-2 max-h-80 overflow-y-auto">{savedMeals.map(m => (
            <button key={m.id} onClick={() => { setTodaysMeals([...todaysMeals, { ...m, id: Date.now(), time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]); setShowQuick(false); }} className="w-full flex items-center gap-4 p-4 bg-white/5 hover:bg-white/10 rounded-xl text-left">
              <span className="text-2xl">{m.icon}</span>
              <div className="flex-1"><p className="font-medium">{m.name}</p><p className="text-sm text-gray-500">{m.calories} cal • {m.protein}g</p></div>
              <Plus className="w-5 h-5 text-violet-400" />
            </button>
          ))}</div>
          {savedMeals.length === 0 && <p className="text-center text-gray-500 py-8">No saved meals</p>}
        </Modal>
      )}
    </div>
  );
};

const ProgressCard = ({ label, value, total, consumed, color }) => (
  <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
    <div className="flex items-center justify-between mb-4">
      <h3 className="font-semibold">{label}</h3>
      <span className={`text-2xl font-bold text-${color}-400`}>{value} left</span>
    </div>
    <div className="h-4 bg-white/10 rounded-full overflow-hidden mb-2">
      <div className={`h-4 rounded-full bg-${color}-500 transition-all`} style={{ width: `${Math.min(100, (parseFloat(consumed) / parseFloat(total)) * 100)}%` }} />
    </div>
    <p className="text-sm text-gray-500">{consumed} / {total}</p>
  </div>
);

// ============================================
// RESTAURANTS
// ============================================
const Restaurants = ({ restaurants, setRestaurants }) => {
  const [showAdd, setShowAdd] = useState(false);
  const [comparing, setComparing] = useState(null);
  const [newR, setNewR] = useState({ name: '', cuisine: 'American', priceRange: 2, location: '', wouldReturn: true });
  const cuisines = ['American', 'Italian', 'Japanese', 'Chinese', 'Mexican', 'Thai', 'Indian', 'Mediterranean', 'Korean', 'Vietnamese', 'French', 'Other'];

  const addRestaurant = () => {
    if (!newR.name) return;
    const r = { ...newR, id: Date.now(), rank: restaurants.length + 1, score: 5 };
    if (restaurants.length === 0) { r.rank = 1; r.score = 10; setRestaurants([r]); setNewR({ name: '', cuisine: 'American', priceRange: 2, location: '', wouldReturn: true }); setShowAdd(false); }
    else { setComparing(r); setShowAdd(false); }
  };

  const handleCompare = (better) => {
    let updated = [...restaurants];
    const idx = better ? 0 : 1;
    comparing.rank = idx + 1;
    updated.splice(idx, 0, comparing);
    updated = updated.map((r, i) => ({ ...r, rank: i + 1, score: updated.length === 1 ? 10 : Math.max(1, 10 - (i * (9 / (updated.length - 1)))) }));
    setRestaurants(updated);
    setComparing(null);
    setNewR({ name: '', cuisine: 'American', priceRange: 2, location: '', wouldReturn: true });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Restaurant Rankings</h1>
        <button onClick={() => setShowAdd(true)} className="px-4 py-2 bg-violet-500 rounded-lg flex items-center gap-2"><Plus className="w-4 h-4" /> Add</button>
      </div>

      {restaurants.length === 0 ? (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
          <Trophy className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No restaurants yet</h3>
          <button onClick={() => setShowAdd(true)} className="px-6 py-3 bg-violet-500 rounded-xl">Add First Restaurant</button>
        </div>
      ) : (
        <div className="space-y-3">{restaurants.map((r, i) => (
          <div key={r.id} className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-4">
            <div className={`text-2xl font-bold w-12 text-center ${i === 0 ? 'text-amber-400' : i === 1 ? 'text-gray-300' : i === 2 ? 'text-amber-600' : 'text-gray-500'}`}>#{i + 1}</div>
            <div className="flex-1"><h3 className="font-semibold">{r.name}</h3><p className="text-sm text-gray-500">{r.cuisine} • {'$'.repeat(r.priceRange)}{r.location && ` • ${r.location}`}</p></div>
            <div className="flex items-center gap-3">
              {r.wouldReturn && <RotateCcw className="w-4 h-4 text-emerald-400" />}
              <span className="text-xl font-bold text-violet-400">{r.score?.toFixed(1)}</span>
              <button onClick={() => { let u = restaurants.filter(x => x.id !== r.id); u = u.map((x, i) => ({ ...x, rank: i + 1, score: u.length === 1 ? 10 : Math.max(1, 10 - (i * (9 / (u.length - 1)))) })); setRestaurants(u); }} className="text-gray-400 hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}</div>
      )}

      {showAdd && (
        <Modal onClose={() => setShowAdd(false)} title="Add Restaurant">
          <div className="space-y-4">
            <div><label className="block text-sm mb-2">Name</label><input value={newR.name} onChange={e => setNewR({ ...newR, name: e.target.value })} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl outline-none" placeholder="Joe's Pizza" /></div>
            <div><label className="block text-sm mb-2">Cuisine</label><select value={newR.cuisine} onChange={e => setNewR({ ...newR, cuisine: e.target.value })} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl outline-none">{cuisines.map(c => <option key={c} value={c}>{c}</option>)}</select></div>
            <div><label className="block text-sm mb-2">Price</label><div className="flex gap-2">{[1, 2, 3, 4].map(p => <button key={p} onClick={() => setNewR({ ...newR, priceRange: p })} className={`flex-1 py-2 rounded-lg ${newR.priceRange === p ? 'bg-violet-500' : 'bg-white/5'}`}>{'$'.repeat(p)}</button>)}</div></div>
            <div><label className="block text-sm mb-2">Location</label><input value={newR.location} onChange={e => setNewR({ ...newR, location: e.target.value })} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl outline-none" placeholder="Downtown" /></div>
            <label className="flex items-center gap-3"><input type="checkbox" checked={newR.wouldReturn} onChange={e => setNewR({ ...newR, wouldReturn: e.target.checked })} className="w-5 h-5 rounded" /> Would return</label>
          </div>
          <div className="flex gap-3 mt-6">
            <button onClick={() => setShowAdd(false)} className="flex-1 py-3 bg-white/10 rounded-xl">Cancel</button>
            <button onClick={addRestaurant} disabled={!newR.name} className="flex-1 py-3 bg-violet-500 rounded-xl font-semibold disabled:opacity-50">{restaurants.length === 0 ? 'Add' : 'Next'}</button>
          </div>
        </Modal>
      )}

      {comparing && (
        <Modal onClose={() => { setComparing(null); setNewR({ name: '', cuisine: 'American', priceRange: 2, location: '', wouldReturn: true }); }} title="Compare">
          <p className="text-gray-400 text-center mb-6">Is {comparing.name} better than #{1}?</p>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white/5 rounded-xl p-4 text-center border-2 border-violet-500"><p className="text-sm text-violet-400 mb-1">NEW</p><p className="font-bold">{comparing.name}</p></div>
            <div className="bg-white/5 rounded-xl p-4 text-center border border-white/10"><p className="text-sm text-amber-400 mb-1">#1</p><p className="font-bold">{restaurants[0]?.name}</p></div>
          </div>
          <div className="flex gap-3">
            <button onClick={() => handleCompare(true)} className="flex-1 py-4 bg-violet-500 rounded-xl font-semibold">{comparing.name} better</button>
            <button onClick={() => handleCompare(false)} className="flex-1 py-4 bg-white/10 rounded-xl font-semibold">{restaurants[0]?.name} better</button>
          </div>
        </Modal>
      )}
    </div>
  );
};

// ============================================
// AI DISCOVER
// ============================================
const Discover = ({ apiKey, location, setLocation, remaining, tasteProfile, restaurants }) => {
  const [loading, setLoading] = useState(false);
  const [rec, setRec] = useState(null);
  const [error, setError] = useState('');

  const getRec = async () => {
    if (!apiKey) { setError('Add your API key in Settings'); return; }
    if (!location) { setError('Enter your location'); return; }
    setLoading(true); setError(''); setRec(null);

    const prompt = `You are Nomi, an AI food assistant. Recommend a restaurant and dish.

User data:
- Location: ${location}
- Calories left: ${remaining.calories}
- Protein left: ${remaining.protein}g
- Taste: ${tasteProfile ? `Likes ${tasteProfile.topCuisines.join(', ')}. Price: ${'$'.repeat(Math.round(tasteProfile.avgPrice))}` : 'No profile yet'}
- Favorites: ${restaurants.slice(0, 3).map(r => r.name).join(', ') || 'None'}

Respond with JSON only:
{"restaurant":"Name","dish":"Dish","calories":500,"protein":35,"reason":"Why it fits","healthScore":8.5,"tasteMatch":9.0}`;

    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01', 'anthropic-dangerous-direct-browser-access': 'true' },
        body: JSON.stringify({ model: 'claude-sonnet-4-20250514', max_tokens: 500, messages: [{ role: 'user', content: prompt }] })
      });
      if (!res.ok) throw new Error('API failed. Check your key.');
      const data = await res.json();
      const match = data.content[0].text.match(/\{[\s\S]*\}/);
      if (match) setRec(JSON.parse(match[0]));
      else setError('Could not parse response');
    } catch (e) { setError(e.message); }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold">AI Discover</h1><p className="text-gray-400">Get personalized recommendations</p></div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <label className="block text-sm mb-2">Your Location</label>
        <div className="flex gap-3">
          <div className="relative flex-1">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input value={location} onChange={e => setLocation(e.target.value)} className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl outline-none" placeholder="SoHo, New York" />
          </div>
          <button onClick={getRec} disabled={loading || !apiKey} className="px-6 py-3 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-xl font-semibold disabled:opacity-50 flex items-center gap-2">
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />} Get Rec
          </button>
        </div>
      </div>

      {error && <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-400 flex items-center gap-3"><XCircle className="w-5 h-5" /> {error}</div>}
      {!apiKey && <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 text-amber-400 flex items-center gap-3"><Key className="w-5 h-5" /> Add API key in Settings</div>}

      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white/5 border border-white/10 rounded-xl p-4"><p className="text-sm text-gray-400 mb-1">Calories Left</p><p className={`text-2xl font-bold ${remaining.calories < 200 ? 'text-red-400' : 'text-violet-400'}`}>{remaining.calories}</p></div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-4"><p className="text-sm text-gray-400 mb-1">Protein Left</p><p className={`text-2xl font-bold ${remaining.protein < 20 ? 'text-red-400' : 'text-blue-400'}`}>{remaining.protein}g</p></div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-4"><p className="text-sm text-gray-400 mb-1">Top Cuisine</p><p className="text-2xl font-bold text-fuchsia-400">{tasteProfile?.topCuisines[0] || '—'}</p></div>
      </div>

      {rec && (
        <div className="bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 border border-violet-500/30 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="bg-violet-500/30 p-3 rounded-xl"><Sparkles className="w-8 h-8 text-violet-300" /></div>
            <div className="flex-1">
              <p className="text-violet-300 text-sm mb-1">Nomi Recommends</p>
              <h3 className="text-2xl font-bold mb-1">{rec.restaurant}</h3>
              <p className="text-lg text-gray-300 mb-4">{rec.dish}</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                <div className="bg-black/30 rounded-lg p-3"><p className="text-xs text-gray-400">Calories</p><p className="text-lg font-bold text-violet-400">{rec.calories}</p></div>
                <div className="bg-black/30 rounded-lg p-3"><p className="text-xs text-gray-400">Protein</p><p className="text-lg font-bold text-blue-400">{rec.protein}g</p></div>
                <div className="bg-black/30 rounded-lg p-3"><p className="text-xs text-gray-400">Health</p><p className="text-lg font-bold text-emerald-400">{rec.healthScore}/10</p></div>
                <div className="bg-black/30 rounded-lg p-3"><p className="text-xs text-gray-400">Taste</p><p className="text-lg font-bold text-fuchsia-400">{rec.tasteMatch}/10</p></div>
              </div>
              <p className="text-gray-300">{rec.reason}</p>
            </div>
          </div>
        </div>
      )}

      {loading && <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center"><Loader2 className="w-12 h-12 text-violet-400 animate-spin mx-auto mb-4" /><p className="text-gray-400">Finding the perfect meal...</p></div>}
    </div>
  );
};

// ============================================
// SETTINGS
// ============================================
const SettingsTab = ({ apiKey, setApiKey, dietGoals, setDietGoals }) => {
  const [showKey, setShowKey] = useState(false);
  const [goals, setGoals] = useState(dietGoals);
  const [saved, setSaved] = useState(false);

  const saveGoals = () => { setDietGoals(goals); setSaved(true); setTimeout(() => setSaved(false), 2000); };
  const clearAll = () => { if (confirm('Clear all data?')) { localStorage.clear(); window.location.reload(); } };

  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-2xl font-bold">Settings</h1>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-4"><Key className="w-5 h-5 text-violet-400" /><h3 className="font-semibold">API Key</h3></div>
        <p className="text-sm text-gray-400 mb-4">Get your key at <a href="https://console.anthropic.com" target="_blank" className="text-violet-400 hover:underline">console.anthropic.com</a></p>
        <div className="relative">
          <input type={showKey ? 'text' : 'password'} value={apiKey} onChange={e => setApiKey(e.target.value)} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl outline-none pr-12" placeholder="sk-ant-..." />
          <button onClick={() => setShowKey(!showKey)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">{showKey ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}</button>
        </div>
        <p className="text-xs text-gray-500 mt-2">Stored locally only</p>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-4"><Target className="w-5 h-5 text-violet-400" /><h3 className="font-semibold">Daily Goals</h3></div>
        <div className="space-y-4">
          <div><label className="block text-sm mb-2">Calories</label><input type="number" value={goals.calories} onChange={e => setGoals({ ...goals, calories: +e.target.value })} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl outline-none" /></div>
          <div><label className="block text-sm mb-2">Protein (g)</label><input type="number" value={goals.protein} onChange={e => setGoals({ ...goals, protein: +e.target.value })} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl outline-none" /></div>
        </div>
        <button onClick={saveGoals} className="mt-4 px-6 py-2 bg-violet-500 rounded-lg flex items-center gap-2">{saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />} {saved ? 'Saved!' : 'Save'}</button>
      </div>

      <div className="bg-white/5 border border-red-500/30 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-4"><Trash2 className="w-5 h-5 text-red-400" /><h3 className="font-semibold text-red-400">Danger Zone</h3></div>
        <p className="text-sm text-gray-400 mb-4">Clear all data. Cannot be undone.</p>
        <button onClick={clearAll} className="px-6 py-2 bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg">Clear All Data</button>
      </div>
    </div>
  );
};

// ============================================
// MODAL
// ============================================
const Modal = ({ children, onClose, title }) => (
  <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
    <div className="bg-gray-900 rounded-2xl p-6 w-full max-w-md border border-white/10">
      <h3 className="text-xl font-bold mb-6">{title}</h3>
      {children}
    </div>
  </div>
);
