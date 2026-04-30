import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Leaf, 
  Map as MapIcon, 
  BookOpen, 
  CheckCircle2, 
  Trophy, 
  ArrowRight, 
  RefreshCcw,
  MousePointer2,
  Brain,
  Globe,
  Sun,
  Layers,
  Zap,
  Star,
  Target,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { 
  THEORY_CONTENT, 
  SUBSTANCES_DATA, 
  QUIZ_QUESTIONS, 
  MILLIONAIRE_QUESTIONS,
  type Question,
  type Substance,
  type Screen
} from './types.ts';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const [xp, setXp] = useState(0);
  const [currentTheory, setCurrentTheory] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizResults, setQuizResults] = useState<boolean[]>([]);
  const [level, setLevel] = useState(1);
  const [completedModules, setCompletedModules] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('biosphere-pro-progress');
    if (saved) {
      const data = JSON.parse(saved);
      setXp(data.xp || 0);
      setLevel(Math.floor(data.xp / 100) + 1);
      setCompletedModules(data.completedModules || []);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('biosphere-pro-progress', JSON.stringify({ xp, completedModules }));
    setLevel(Math.floor(xp / 100) + 1);
  }, [xp, completedModules]);

  const addXp = (amount: number) => {
    setXp(prev => prev + amount);
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.9 },
      colors: ['#10b981', '#34d399', '#fbbf24']
    });
  };

  const nextScreen = (to: Screen) => {
    setScreen(to as any);
    window.scrollTo(0, 0);
  };

  // --- Visuals Helper ---
  const TheoryVisuals = ({ id }: { id: string }) => {
    switch (id) {
      case 'intro':
        return (
          <div className="relative w-full h-48 bg-emerald-50 rounded-[2rem] flex items-center justify-center overflow-hidden border border-emerald-100 mb-8">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }} className="absolute inset-0 opacity-10 flex items-center justify-center">
               <Globe size={300} className="text-emerald-900" />
            </motion.div>
            <div className="flex items-center gap-6 z-10">
              <div className="bg-white p-4 rounded-2xl shadow-xl border border-emerald-100 text-center scale-110">
                <span className="block text-3xl mb-1">👴</span>
                <span className="text-[10px] font-black uppercase text-emerald-800">Вернадський</span>
              </div>
              <ArrowRight className="text-emerald-300" size={32} />
              <div className="bg-emerald-500 p-6 rounded-full shadow-2xl text-white">
                <Globe size={54} />
              </div>
            </div>
          </div>
        );
      case 'boundaries':
        return (
          <div className="relative w-full h-48 bg-blue-50 rounded-[2rem] flex items-center justify-center border border-blue-100 mb-8 overflow-hidden">
            <div className="flex flex-col items-center gap-1 z-10">
              <div className="w-48 h-8 bg-sky-200/80 rounded-t-2xl border-x-2 border-t-2 border-sky-400 flex items-center justify-center text-[10px] font-black text-sky-800 uppercase tracking-widest">Атмосфера ↑ 25KM</div>
              <div className="w-56 h-12 bg-white shadow-lg flex items-center justify-center text-sm font-black text-emerald-600 border-2 border-emerald-500 rounded-xl z-20">БІОСФЕРА</div>
              <div className="w-48 h-8 bg-amber-400/80 rounded-b-2xl border-x-2 border-b-2 border-amber-600 flex items-center justify-center text-[10px] font-black text-amber-900 uppercase tracking-widest">Літосфера ↓ 4KM</div>
            </div>
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <div className="absolute top-0 w-full h-1/2 bg-blue-200 blur-3xl"></div>
              <div className="absolute bottom-0 w-full h-1/2 bg-amber-200 blur-3xl"></div>
            </div>
          </div>
        );
      case 'substances':
        return (
          <div className="grid grid-cols-4 gap-4 w-full h-48 p-4 bg-gray-50 rounded-[2rem] border border-gray-100 mb-8">
             {[
               { i: '🌿', t: 'Жива', c: 'bg-emerald-100 border-emerald-200' },
               { i: '⛽', t: 'Біогенна', c: 'bg-orange-100 border-orange-200' },
               { i: '🏖️', t: 'Біокосна', c: 'bg-blue-100 border-blue-200' },
               { i: '💎', t: 'Косна', c: 'bg-slate-200 border-slate-300' }
             ].map((item, idx) => (
               <motion.div 
                 key={idx}
                 whileHover={{ y: -5, scale: 1.05 }}
                 className={cn(item.c, "border rounded-2xl p-2 flex flex-col items-center justify-center shadow-sm")}
               >
                  <span className="text-3xl mb-1">{item.i}</span>
                  <span className="text-[9px] font-black uppercase text-gray-500 tracking-tighter">{item.t}</span>
               </motion.div>
             ))}
          </div>
        );
      case 'energy':
        return (
          <div className="relative w-full h-48 bg-amber-50 rounded-[2rem] border border-amber-100 flex items-center justify-center mb-8">
             <div className="flex items-center gap-10">
                <Sun className="text-amber-500" size={64} fill="currentColor" />
                <ArrowRight className="text-amber-200" size={32} />
                <Leaf className="text-emerald-500" size={64} fill="currentColor" />
                <ArrowRight className="text-amber-200" size={32} />
                <Zap className="text-amber-600" size={64} fill="currentColor" />
             </div>
          </div>
        );
      case 'functions':
        return (
          <div className="relative w-full h-48 bg-emerald-50 rounded-[2rem] border border-emerald-100 flex items-center justify-center mb-8">
             <motion.div 
               animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }} 
               transition={{ repeat: Infinity, duration: 4 }}
               className="w-28 h-28 bg-white rounded-[2rem] border-4 border-emerald-500 flex items-center justify-center shadow-2xl relative z-10"
             >
                <Zap className="text-amber-500" size={48} fill="currentColor" />
             </motion.div>
             <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 p-6 gap-20 opacity-30">
                <Brain className="text-emerald-900" size={40} />
                <Layers className="text-emerald-900" size={40} />
                <Globe className="text-emerald-900" size={40} />
                <Leaf className="text-emerald-900" size={40} />
             </div>
          </div>
        );
      case 'cycles':
        return (
          <div className="relative w-full h-48 bg-blue-50 rounded-[2rem] border border-blue-100 flex items-center justify-center mb-8">
             <motion.div 
               animate={{ rotate: 360 }}
               transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
               className="w-40 h-40 border-4 border-dashed border-blue-300 rounded-full flex items-center justify-center"
             >
                <div className="absolute top-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-[10px] text-white font-bold">C</div>
                <div className="absolute bottom-0 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-[10px] text-white font-bold">N</div>
                <RefreshCcw size={40} className="text-blue-200" />
             </motion.div>
          </div>
        );
      case 'stability':
        return (
          <div className="relative w-full h-48 bg-emerald-50 rounded-[3rem] border border-emerald-100 mb-8 flex items-center justify-center">
             <div className="flex items-center gap-1 text-emerald-500 opacity-20">
                {[...Array(6)].map((_, i) => <Star key={i} size={40} fill="currentColor" />)}
             </div>
             <div className="absolute bg-white p-6 rounded-3xl shadow-xl border border-emerald-500 flex items-center gap-4">
                <Target className="text-emerald-500" size={32} />
                <span className="font-black text-emerald-900 uppercase tracking-widest text-lg">ГОМЕОСТАЗ</span>
             </div>
          </div>
        );
      case 'noosphere':
        return (
          <div className="relative w-full h-48 bg-black rounded-[2.5rem] border border-white/10 flex items-center justify-center mb-8 overflow-hidden">
             <motion.div 
               animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.2, 1] }} 
               transition={{ duration: 5, repeat: Infinity }}
               className="absolute inset-0 bg-emerald-500/20 rounded-full blur-[100px]"
             />
             <div className="relative z-10 flex items-center gap-8">
                <div className="bg-white/10 backdrop-blur-xl p-6 rounded-3xl border border-white/20">
                  <Brain size={48} className="text-emerald-400" />
                </div>
                <div className="h-0.5 w-12 bg-gradient-to-r from-emerald-500 to-transparent"></div>
                <div className="text-left">
                  <h4 className="text-white font-black text-xl leading-none">НООСФЕРА</h4>
                  <p className="text-emerald-400 font-mono text-[10px] mt-2 uppercase tracking-widest">Sphere of Reason</p>
                </div>
             </div>
          </div>
        );
      default:
        return null;
    }
  };

  // --- Screens ---

  const HomeScreen = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center min-h-[85vh] text-center px-4"
    >
      <div className="relative mb-12">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="w-56 h-56 bg-white rounded-[3rem] flex items-center justify-center border-2 border-emerald-500/20 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-emerald-50 opacity-50" />
          <Globe size={140} className="text-emerald-600 relative z-10" />
        </motion.div>
        <motion.div 
          initial={{ scale: 0 }} animate={{ scale: 1 }}
          className="absolute -bottom-6 -right-6 bg-black text-white p-5 rounded-3xl shadow-2xl border-4 border-white"
        >
          <Target size={32} />
        </motion.div>
      </div>

      <h1 className="text-6xl md:text-8xl font-black text-gray-900 mb-6 tracking-tighter">
        БІОСФЕРА <span className="text-emerald-500">PRO</span>
      </h1>
      <p className="text-xl md:text-2xl text-gray-400 mb-12 font-medium max-w-2xl mx-auto leading-tight italic">
        "Життя — це не випадковий гість, а найпотужніша геологічна сила нашої планети." (В.Г. Вернадський)
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mb-16">
         {[
           { icon: <BookOpen />, title: "Глубока Теорія", desc: "8 професійних модулів" },
           { icon: <Zap />, title: "Експертний Ранг", desc: "Система XP та рівнів" },
           { icon: <Globe />, title: "Еко-Етика", desc: "Сталий розвиток та Ноосфера" }
         ].map((item, i) => (
           <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col items-center">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-4">{item.icon}</div>
              <h4 className="font-black text-lg">{item.title}</h4>
              <p className="text-gray-400 text-xs mt-1">{item.desc}</p>
           </div>
         ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
        <button 
          onClick={() => nextScreen('theory')}
          className="bg-white border-2 border-gray-100 p-10 rounded-[3rem] hover:border-emerald-500 hover:shadow-2xl transition-all shadow-sm group text-left relative overflow-hidden"
        >
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-50 rounded-full group-hover:bg-emerald-100 transition-colors" />
          <div className="bg-emerald-500 text-white w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <BookOpen size={28} />
          </div>
          <h3 className="text-2xl font-black text-gray-900">Повний Курс</h3>
          <p className="text-gray-400 mt-2 font-medium">8 розширених модулів знань</p>
        </button>

        <button 
          onClick={() => nextScreen('layers')}
          className="bg-white border-2 border-gray-100 p-10 rounded-[3rem] hover:border-blue-500 hover:shadow-2xl transition-all shadow-sm group text-left relative overflow-hidden"
        >
           <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-50 rounded-full group-hover:bg-blue-100 transition-colors" />
          <div className="bg-blue-500 text-white w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Layers size={28} />
          </div>
          <h3 className="text-2xl font-black text-gray-900">Практикум</h3>
          <p className="text-gray-400 mt-2 font-medium">Симуляції та класифікація</p>
        </button>
      </div>

      <button 
        onClick={() => nextScreen('theory')}
        className="mt-16 bg-black text-white px-16 py-6 rounded-3xl font-black text-xl shadow-2xl hover:bg-emerald-950 transition-all flex items-center gap-4 group active:scale-95"
      >
        РОЗПОЧАТИ КУРС
        <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
      </button>
    </motion.div>
  );

  const TheoryScreen = () => {
    const slide = THEORY_CONTENT[currentTheory];
    return (
      <motion.div 
        key={currentTheory} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8"
      >
        <div className="lg:col-span-8">
           <div className="bg-white rounded-[4rem] p-12 shadow-sm border border-gray-100 relative overflow-hidden flex flex-col h-full">
              <div className="flex justify-between items-start mb-12">
                 <div>
                    <span className="text-emerald-500 font-black text-xs uppercase tracking-[0.3em] flex items-center gap-3">
                       <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                       Модуль 0{currentTheory + 1}
                    </span>
                    <h2 className="text-5xl font-black text-gray-900 mt-4 tracking-tighter leading-none">{slide.title}</h2>
                    <p className="text-gray-400 mt-4 text-lg font-medium">{slide.description}</p>
                 </div>
                 <div className="bg-black text-white w-16 h-16 rounded-[2rem] flex items-center justify-center font-black text-2xl shadow-xl">
                    {currentTheory + 1}
                 </div>
              </div>

              <TheoryVisuals id={slide.id} />

              <div className="flex-1 space-y-16">
                 <section>
                    <h3 className="text-xs font-black text-emerald-800 uppercase tracking-widest mb-8 flex items-center gap-3">
                       <Star size={16} fill="currentColor" /> Ключова концепція
                    </h3>
                    <h4 className="text-3xl font-bold text-gray-900 mb-10 italic leading-tight">"{slide.accentTitle}"</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       {slide.content.map((item, idx) => (
                         <div key={idx} className="bg-gray-50 p-6 rounded-3xl border border-gray-100 flex gap-4 items-start group hover:bg-white hover:shadow-xl transition-all">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 shrink-0 group-hover:scale-150 transition-transform" />
                            <p className="text-gray-600 font-medium leading-relaxed">{item}</p>
                         </div>
                       ))}
                    </div>
                 </section>

                 <section className="bg-indigo-950 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
                    <h3 className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.4em] mb-8 flex items-center gap-3">
                       <BookOpen size={16} /> ГЛОСАРІЙ ТЕРМІНІВ (0{slide.glossary.length})
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                       {slide.glossary.map((g, idx) => (
                         <div key={idx} className="space-y-4 bg-white/5 p-6 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors h-full">
                            <div className="text-lg font-black flex items-center gap-2">
                               <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                               {g.term}
                            </div>
                            <p className="text-indigo-200/60 text-[11px] leading-tight italic">{g.definition}</p>
                            <div className="pt-4 border-t border-white/5 text-[10px]">
                               <span className="text-indigo-400 font-black block mb-1">ФОРМУЛА:</span>
                               {g.simpleExplanation}
                            </div>
                         </div>
                       ))}
                    </div>
                 </section>
              </div>

              <div className="mt-20 pt-10 border-t border-gray-50 flex justify-between items-center">
                 <button 
                   disabled={currentTheory === 0}
                   onClick={() => setCurrentTheory(prev => prev - 1)}
                   className="px-10 py-5 rounded-2xl font-black text-gray-400 hover:text-emerald-600 transition-colors uppercase text-xs tracking-widest disabled:opacity-20"
                 >
                   Повернутись
                 </button>
                 <div className="flex gap-4">
                    <button 
                       onClick={() => nextScreen('module_test')}
                       className="bg-emerald-600 text-white px-12 py-5 rounded-2xl font-black shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition-all flex items-center gap-3"
                    >
                        ПРОЙТИ КОНТРОЛЬ ЗА МОДУЛЕМ <Target size={20} />
                    </button>
                 </div>
              </div>
           </div>
        </div>

        <aside className="lg:col-span-4 space-y-6">
           <div className="bg-white rounded-[3rem] p-10 shadow-sm border border-gray-100">
              <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-8">Мапа вивчення</h4>
              <nav className="space-y-2">
                 {THEORY_CONTENT.map((mod, i) => (
                   <button 
                     key={mod.id} onClick={() => setCurrentTheory(i)}
                     className={cn(
                       "w-full p-4 rounded-2xl flex items-center gap-4 transition-all text-left relative",
                       currentTheory === i ? "bg-emerald-600 text-white shadow-xl shadow-emerald-100" : "text-gray-400 hover:bg-emerald-50"
                     )}
                   >
                     <span className="text-xl">{['👴', '📏', '🪨', '☀️', '⚗️', '🔄', '🛡️', '🧠'][i]}</span>
                     <div className="flex-1">
                        <p className={cn("font-bold text-[10px] uppercase tracking-tighter leading-tight truncate", currentTheory === i ? "text-white" : "text-gray-600")}>{mod.title}</p>
                        {completedModules.includes(mod.id) && <div className="absolute right-4 top-1/2 -translate-y-1/2"><CheckCircle2 size={16} className="text-emerald-300" /></div>}
                     </div>
                   </button>
                 ))}
              </nav>
           </div>

           <div className="bg-amber-400 rounded-[3rem] p-10 text-amber-950 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-20"><Target size={80} /></div>
              <h4 className="text-[10px] font-black uppercase tracking-widest mb-4 opacity-60">Висновок для життя</h4>
              <p className="text-lg font-bold leading-tight italic">
                 {slide.importance}
              </p>
           </div>
        </aside>
      </motion.div>
    );
  };

  const ModuleTestScreen = () => {
    const moduleId = THEORY_CONTENT[currentTheory].id;
    const questions = QUIZ_QUESTIONS.filter(q => q.moduleId === moduleId);
    const [qIdx, setQIdx] = useState(0);
    const [selected, setSelected] = useState<number | null>(null);
    const [localScore, setLocalScore] = useState(0);
    const [done, setDone] = useState(false);

    const question = questions[qIdx];

    const handleAnswer = (idx: number) => {
      setSelected(idx);
      if (idx === question.correct) {
        setLocalScore(prev => prev + 1);
        addXp(20);
      }
    };

    const next = () => {
      if (qIdx < questions.length - 1) {
        setQIdx(prev => prev + 1);
        setSelected(null);
      } else {
        setDone(true);
        if (!completedModules.includes(moduleId)) {
            setCompletedModules(prev => [...prev, moduleId]);
            addXp(50); // Bonus for completing a module
        }
      }
    };

    if (done) {
        const isLastModule = currentTheory === THEORY_CONTENT.length - 1;
        return (
            <div className="max-w-4xl mx-auto py-20 text-center bg-white rounded-[5rem] p-16 shadow-sm border border-gray-100 flex flex-col items-center">
                <motion.div 
                    initial={{ scale: 0 }} animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
                    className="w-40 h-40 bg-emerald-500 rounded-[3rem] flex items-center justify-center text-white mb-12 shadow-2xl relative"
                >
                    <Trophy size={80} />
                    <motion.div 
                        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                        className="absolute inset-0 bg-emerald-400 rounded-full -z-10 blur-2xl"
                    />
                </motion.div>
                
                <h2 className="text-6xl font-black mb-4 tracking-tighter leading-none">МОДУЛЬ ЗАСВОЄНО!</h2>
                <p className="text-gray-400 text-xl mb-12 font-medium max-w-lg">
                    Ви успішно пройшли 0{currentTheory + 1}-ий етап. Ранг знань підвищено.
                </p>

                <div className="flex gap-8 mb-16">
                    <div className="text-center">
                        <div className="text-3xl font-black text-emerald-600">{localScore}/{questions.length}</div>
                        <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Вірних відповідей</div>
                    </div>
                    <div className="w-px h-10 bg-gray-100 self-center" />
                    <div className="text-center">
                        <div className="text-3xl font-black text-amber-500">+{localScore * 20 + 50}</div>
                        <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Набрано XP</div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4 w-full justify-center">
                    {!isLastModule ? (
                        <button 
                            onClick={() => { setCurrentTheory(prev => prev + 1); nextScreen('theory'); }}
                            className="bg-black text-white px-16 py-6 rounded-3xl font-black text-xl hover:bg-emerald-600 transition-all shadow-2xl active:scale-95 flex items-center gap-4"
                        >
                            НАСТУПНИЙ МОДУЛЬ <ArrowRight size={24} />
                        </button>
                    ) : (
                        <button 
                            onClick={() => nextScreen('quiz')}
                            className="bg-emerald-600 text-white px-16 py-6 rounded-3xl font-black text-xl hover:bg-black transition-all shadow-2xl active:scale-95 flex items-center gap-4"
                        >
                            ФІНАЛЬНИЙ ЕКЗАМЕН <Target size={24} />
                        </button>
                    )}
                    <button 
                        onClick={() => nextScreen('home')}
                        className="px-10 py-6 rounded-3xl font-bold text-gray-400 hover:text-gray-900 transition-colors"
                    >
                        На головну
                    </button>
                </div>
            </div>
        );
    }

    if (!question) return null;

    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <div className="bg-white p-16 rounded-[4rem] shadow-sm border border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 left-0 h-1 bg-emerald-500 transition-all duration-500" style={{ width: `${((qIdx + 1) / questions.length) * 100}%` }} />
                
                <div className="flex justify-between items-center mb-10">
                    <span className="text-xs font-black text-emerald-500 uppercase tracking-widest px-4 py-2 bg-emerald-50 rounded-xl">ЕКЗАМЕН МОДУЛЯ 0{currentTheory + 1}</span>
                    <span className="text-xs font-black text-gray-300">Питання {qIdx + 1} з {questions.length}</span>
                </div>

                <h2 className="text-3xl font-black mb-12 leading-tight tracking-tight text-gray-900">{question.text}</h2>
                
                <div className="space-y-4">
                    {question.options.map((opt, i) => (
                        <button 
                            key={i} disabled={selected !== null} onClick={() => handleAnswer(i)}
                            className={cn(
                                "w-full p-6 text-left rounded-[2.5rem] border-2 font-bold text-lg transition-all flex items-center justify-between group",
                                selected === null ? "bg-gray-50 border-gray-50 hover:border-emerald-500 hover:bg-emerald-50 text-gray-700" : 
                                i === question.correct ? "bg-emerald-500 border-emerald-500 text-white shadow-xl" : 
                                i === selected ? "bg-red-500 border-red-500 text-white" : "bg-gray-50 border-gray-50 opacity-40 text-gray-400"
                            )}
                        >
                            <div className="flex items-center gap-4">
                                <div className={cn(
                                    "w-10 h-10 rounded-2xl flex items-center justify-center font-black transition-colors",
                                    selected === null ? "bg-white text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white" : "bg-white/20 text-white"
                                )}>
                                    {['A', 'B', 'C', 'D'][i]}
                                </div>
                                <span className="flex-1">{opt}</span>
                            </div>
                            {selected !== null && i === question.correct && <CheckCircle2 size={24} className="shrink-0" />}
                            {selected !== null && i === selected && i !== question.correct && <AlertCircle size={24} className="shrink-0" />}
                        </button>
                    ))}
                </div>

                <AnimatePresence>
                    {selected !== null && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-12 pt-8 border-t border-gray-100">
                             <div className={cn(
                               "p-8 rounded-[3rem] border-2 mb-10 transition-colors",
                               selected === question.correct ? "bg-emerald-50 border-emerald-100 text-emerald-900" : "bg-red-50 border-red-100 text-red-900"
                             )}>
                                <div className="flex items-center gap-3 mb-4">
                                   <div className={cn("w-10 h-10 rounded-full flex items-center justify-center text-white", selected === question.correct ? "bg-emerald-500" : "bg-red-500")}>
                                      {selected === question.correct ? <CheckCircle2 size={22} /> : <AlertCircle size={22} />}
                                   </div>
                                   <span className="font-black uppercase tracking-widest text-[10px]">{selected === question.correct ? 'Чудово!' : 'Майже...'}</span>
                                </div>
                                <p className="text-lg font-medium leading-relaxed italic">
                                    {selected === question.correct ? (typeof question.explanation === 'object' ? question.explanation.correct : question.explanation) : (typeof question.explanation === 'object' ? question.explanation.incorrect : question.explanation)}
                                </p>
                             </div>
                            <button onClick={next} className="w-full bg-black text-white px-16 py-6 rounded-3xl font-black text-lg hover:bg-emerald-950 transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3">
                                {qIdx === questions.length - 1 ? 'ЗАКІНЧИТИ ТЕСТ' : 'НАСТУПНЕ ПИТАННЯ'} <ArrowRight size={22} />
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
  };

  const QuizScreen = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selected, setSelected] = useState<number | null>(null);
    const [isComplete, setIsComplete] = useState(false);
    
    const question = QUIZ_QUESTIONS[currentQuestion];

    const handleAnswer = (idx: number) => {
      setSelected(idx);
      const isCorrect = idx === question.correct;
      setQuizResults(prev => [...prev, isCorrect]);
      if (isCorrect) {
        addXp(20);
        setQuizScore(prev => prev + 1);
      }
    };

    const next = () => {
      if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelected(null);
      } else {
        setIsComplete(true);
      }
    };

    if (isComplete) {
      return (
        <div className="max-w-4xl mx-auto py-20 text-center bg-white rounded-[5rem] p-16 shadow-sm border border-gray-100 flex flex-col items-center">
           <div className="w-40 h-40 bg-emerald-500 rounded-[3rem] flex items-center justify-center text-white mb-12 shadow-2xl relative">
              <Trophy size={100} />
              <div className="absolute inset-0 bg-emerald-400 rounded-full -z-10 blur-3xl opacity-30 animate-pulse" />
           </div>
           <h2 className="text-6xl font-black mb-4 tracking-tighter text-gray-900 uppercase">ДИПЛОМ ОФОРМЛЕНО!</h2>
           <p className="text-gray-400 text-xl mb-16 font-medium max-w-lg mx-auto leading-relaxed">Ваші знання біосфери пройшли перевірку. Ви готові до епохи Розуму.</p>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 max-w-2xl mx-auto w-full">
              <div className="bg-gray-50 p-10 rounded-[3rem] border border-gray-100">
                 <div className="text-5xl font-black text-emerald-600 mb-2">{quizScore}</div>
                 <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Бали</div>
              </div>
              <div className="bg-black p-10 rounded-[3rem] text-white col-span-2 relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-4 opacity-10"><Target size={80} /></div>
                 <div className="text-5xl font-black text-emerald-400 mb-2">{Math.round((quizScore / QUIZ_QUESTIONS.length) * 100)}%</div>
                 <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">РЕЗУЛЬТАТИВНІСТЬ</div>
              </div>
           </div>

           <div className="flex flex-col items-center gap-6 w-full">
              <button 
                onClick={() => nextScreen('millionaire')}
                className="bg-indigo-900 text-white px-20 py-7 rounded-[2.5rem] font-black text-xl shadow-2xl hover:bg-emerald-950 transition-all flex items-center gap-4 active:scale-95"
              >
                <Zap size={28} className="text-amber-400" /> ГРА: ЕКО-МІЛЬЙОНЕР
              </button>
              <button onClick={() => nextScreen('results')} className="text-gray-400 font-black uppercase text-[10px] tracking-widest hover:text-emerald-600 transition-colors">Переглянути аналіз помилок</button>
           </div>
        </div>
      );
    }

    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
         <div className="bg-white p-16 rounded-[4rem] shadow-sm border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 h-1 bg-emerald-500 transition-all duration-500" style={{ width: `${((currentQuestion + 1) / QUIZ_QUESTIONS.length) * 100}%` }} />
            
            <div className="flex justify-between items-center mb-12">
               <span className="bg-emerald-50 text-emerald-700 px-6 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest">Питання 0{currentQuestion + 1}</span>
               <div className="flex gap-2">
                 {QUIZ_QUESTIONS.map((_, i) => (
                   <div key={i} className={cn("w-2.5 h-2.5 rounded-full transition-all duration-500", i === currentQuestion ? "bg-emerald-500 scale-125" : i < currentQuestion ? "bg-emerald-200" : "bg-gray-100")} />
                 ))}
               </div>
            </div>

            <h2 className="text-4xl font-bold mb-16 text-gray-900 tracking-tight leading-[1.1]">{question.text}</h2>

            <div className="space-y-4">
               {question.options.map((opt, i) => (
                 <button 
                    key={i} disabled={selected !== null} onClick={() => handleAnswer(i)}
                    className={cn(
                      "w-full p-8 text-left rounded-[2.5rem] border-2 font-bold text-xl transition-all flex items-center group relative overflow-hidden",
                      selected === null ? "bg-gray-50 border-gray-50 hover:border-emerald-500 hover:bg-emerald-50 text-gray-700" : 
                      i === question.correct ? "bg-emerald-500 border-emerald-500 text-white shadow-2xl" : 
                      i === selected ? "bg-red-500 border-red-500 text-white shadow-xl" : "bg-gray-50 border-gray-50 opacity-40 text-gray-400"
                    )}
                 >
                    <div className={cn(
                      "w-12 h-12 rounded-2xl flex items-center justify-center mr-6 font-black text-xl transition-colors",
                      selected === null ? "bg-white text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white" : "bg-white/20 text-white"
                    )}>
                       {['A', 'B', 'C', 'D'][i]}
                    </div>
                    <span className="flex-1">{opt}</span>
                    {selected !== null && i === question.correct && <CheckCircle2 className="ml-auto text-white" size={32} />}
                    {selected !== null && i === selected && i !== question.correct && <AlertCircle className="ml-auto text-white" size={32} />}
                 </button>
               ))}
            </div>

            <AnimatePresence>
               {selected !== null && (
                 <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mt-16 pt-12 border-t border-gray-100">
                    <div className={cn(
                      "p-10 rounded-[3rem] border-2 mb-12",
                      selected === question.correct ? "bg-emerald-50 border-emerald-100 text-emerald-900" : "bg-red-50 border-red-100 text-red-900"
                    )}>
                       <div className="flex items-center gap-4 mb-6">
                          <div className={cn("w-12 h-12 rounded-full flex items-center justify-center text-white", selected === question.correct ? "bg-emerald-500" : "bg-red-500")}>
                             {selected === question.correct ? <CheckCircle2 size={28} /> : <AlertCircle size={28} />}
                          </div>
                          <span className="font-black uppercase tracking-[0.2em] text-xs">Коментар експерта</span>
                       </div>
                       <p className="text-xl font-medium leading-relaxed italic">
                          {selected === question.correct ? (typeof question.explanation === 'object' ? question.explanation.correct : question.explanation) : (typeof question.explanation === 'object' ? question.explanation.incorrect : question.explanation)}
                       </p>
                    </div>
                    <button onClick={next} className="w-full bg-black text-white py-8 rounded-[2.5rem] font-black text-xl shadow-2xl hover:bg-emerald-950 transition-all active:scale-95 flex items-center justify-center gap-4">
                       {currentQuestion === QUIZ_QUESTIONS.length - 1 ? 'ПЕРЕГЛЯНУТИ РЕЗУЛЬТАТ' : 'НАСТУПНЕ ПИТАННЯ'} <ArrowRight size={28} />
                    </button>
                 </motion.div>
               )}
            </AnimatePresence>
         </div>
      </div>
    );
  };

  const MillionaireGame = () => {
    const [currentIdx, setCurrentIdx] = useState(0);
    const [selected, setSelected] = useState<number | null>(null);
    const [gameOver, setGameOver] = useState(false);
    const [won, setWon] = useState(false);

    const question = MILLIONAIRE_QUESTIONS[currentIdx];
    const moneyScale = ['1K', '5K', '10K', '25K', '50K', '100K', '250K', '500K', '750K', '1M'];

    const handleAnswer = (idx: number) => {
      setSelected(idx);
      setTimeout(() => {
        if (idx === question.correct) {
          if (currentIdx === MILLIONAIRE_QUESTIONS.length - 1) {
            setWon(true);
            setGameOver(true);
          } else {
            setCurrentIdx(prev => prev + 1);
            setSelected(null);
            addXp(30);
          }
        } else {
          setGameOver(true);
        }
      }, 1500);
    };

    if (gameOver) {
      return (
        <div className="max-w-4xl mx-auto py-20 text-center bg-black text-white rounded-[5rem] p-20 shadow-2xl relative overflow-hidden">
           <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 to-emerald-900/20 blur-3xl opacity-30" />
           <div className="relative z-10">
              <Trophy size={140} className={cn("mx-auto mb-10", won ? "text-amber-400" : "text-gray-700")} />
              <h2 className="text-7xl font-black mb-8 tracking-tighter uppercase">{won ? "ЕКО-МІЛЬЙОНЕР" : "КРАХ СИСТЕМИ"}</h2>
              <p className="text-2xl opacity-60 mb-16 max-w-2xl mx-auto font-medium">
                {won ? "Ваші знання біосфери Вернадського — на рівні доктора наук. Ноосфера під вашим контролем!" : "Світ біології складніший, ніж здається. Одна помилка змінила колообіг речовин. Спробуйте ще раз!"}
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                 <button onClick={() => nextScreen('results')} className="bg-white text-black px-16 py-6 rounded-3xl font-black text-xl hover:bg-emerald-500 hover:text-white transition-all shadow-xl">ФІНАЛЬНИЙ АНАЛІЗ</button>
                 <button onClick={() => { setCurrentIdx(0); setGameOver(false); setWon(false); setSelected(null); }} className="bg-white/10 border-2 border-white/20 text-white px-16 py-6 rounded-3xl font-black text-xl hover:bg-white/20 transition-all backdrop-blur-xl">РЕВАНШ</button>
              </div>
           </div>
        </div>
      );
    }

    return (
      <div className="max-w-6xl mx-auto px-4 py-8 grid lg:grid-cols-12 gap-12 items-center">
         <div className="lg:col-span-8">
            <div className="bg-white p-12 rounded-[5rem] shadow-sm border border-gray-100 min-h-[650px] flex flex-col justify-center relative overflow-hidden">
               <div className="absolute top-0 right-0 p-12 opacity-5 font-black text-[15rem] leading-none select-none">Q</div>
               <div className="relative z-10 px-4">
                  <div className="flex items-center gap-4 mb-10">
                    <span className="bg-amber-100 text-amber-700 font-black text-xs uppercase px-5 py-2 rounded-full border border-amber-200 tracking-widest">Питання 0{currentIdx + 1}</span>
                    <span className="text-emerald-400 font-bold uppercase text-[10px] tracking-[0.3em]">На кону: {moneyScale[currentIdx]} XP</span>
                  </div>
                  <h2 className="text-5xl font-black text-gray-900 mb-20 leading-tight tracking-tighter">{question.text}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {question.options.map((opt, i) => (
                      <button 
                        key={i} onClick={() => handleAnswer(i)} disabled={selected !== null}
                        className={cn(
                          "p-10 text-left border-3 rounded-[2.5rem] font-bold text-xl transition-all relative group flex items-center min-h-[120px]",
                          selected === null ? "bg-gray-50 border-gray-50 hover:border-emerald-500 hover:bg-emerald-50 text-gray-600" : 
                          i === question.correct ? "bg-emerald-500 border-emerald-500 text-white shadow-2xl z-10" :
                          i === selected ? "bg-red-500 border-red-500 text-white z-10" : "bg-gray-50 border-gray-50 opacity-10"
                        )}
                      >
                         <span className="text-3xl font-black mr-8 opacity-20">{['A', 'B', 'C', 'D'][i]}</span>
                         <span className="flex-1">{opt}</span>
                         {selected !== null && i === question.correct && <CheckCircle2 className="text-white ml-4 animate-bounce" size={32} />}
                         {selected !== null && i === selected && i !== question.correct && <AlertCircle className="text-white ml-4" size={32} />}
                      </button>
                    ))}
                  </div>
               </div>
            </div>
         </div>
         <div className="lg:col-span-4 self-stretch">
            <div className="bg-indigo-950 p-12 rounded-[5rem] text-white h-full flex flex-col shadow-2xl border border-white/5 relative overflow-hidden">
               <h3 className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.5em] mb-12 text-center">ШКАЛА ВИГРАШУ</h3>
               <div className="flex flex-col-reverse justify-between flex-1 gap-4 relative z-10">
                  {moneyScale.map((m, i) => (
                    <motion.div 
                       key={i} 
                       animate={i === currentIdx ? { scale: [1, 1.05, 1], x: [0, 10, 0] } : {}}
                       transition={{ repeat: Infinity, duration: 2 }}
                       className={cn(
                         "p-6 rounded-3xl font-black text-2xl flex justify-between items-center transition-all",
                         i === currentIdx ? "bg-amber-400 text-indigo-950 shadow-2xl scale-110" : i < currentIdx ? "text-emerald-400 opacity-60" : "text-white/10 border border-white/5"
                       )}
                    >
                       <span className="text-xs opacity-40 font-mono tracking-tighter">0{i + 1}</span>
                       <span className="italic">{m} XP</span>
                    </motion.div>
                  ))}
               </div>
            </div>
         </div>
      </div>
    );
  };

  const ResultAnalysisScreen = () => {
    const accuracy = Math.round((quizScore / QUIZ_QUESTIONS.length) * 100);
    const strengths = quizResults.filter(r => r).length >= 3 ? ['Розуміння функцій біосфери', 'Знання геосфер планети'] : ['Базові поняття'];
    const weaknesses = quizResults.filter(r => !r).length > 0 ? ['Класифікація речовин за Вернадським', 'Ноосферна етика'] : [];

    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
         <div className="bg-white rounded-[5rem] p-16 shadow-sm border border-gray-100 flex flex-col items-center text-center">
            <div className="w-40 h-40 bg-black rounded-[3rem] flex items-center justify-center text-white mb-12 shadow-2xl">
               <Brain size={80} />
            </div>
            <h2 className="text-6xl font-black mb-4 tracking-tighter">АНАЛІЗ КОМПЕТЕНЦІЙ</h2>
            <p className="text-gray-400 text-xl mb-16 font-medium max-w-sm">Детальний розбір вашого навчального профілю.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full text-left mb-20">
               <div className="bg-emerald-50 rounded-[3rem] p-10 border border-emerald-100">
                  <h4 className="flex items-center gap-4 text-emerald-800 font-black text-xl mb-8">
                    <CheckCircle2 size={32} /> СИЛЬНІ СТОРОНИ
                  </h4>
                  <ul className="space-y-4">
                     {strengths.map((s, i) => (
                       <li key={i} className="flex gap-4 items-center font-bold text-emerald-900/70">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full" /> {s}
                       </li>
                     ))}
                  </ul>
               </div>

               <div className="bg-red-50 rounded-[3rem] p-10 border border-red-100">
                  <h4 className="flex items-center gap-4 text-red-800 font-black text-xl mb-8">
                    <AlertCircle size={32} /> ЗОНИ РОСТУ
                  </h4>
                  <ul className="space-y-4">
                     {weaknesses.length > 0 ? weaknesses.map((w, i) => (
                       <li key={i} className="flex gap-4 items-center font-bold text-red-900/70">
                          <div className="w-2 h-2 bg-red-500 rounded-full" /> {w}
                       </li>
                     )) : <li className="font-bold text-emerald-600">Слабких місць не виявлено!</li>}
                  </ul>
               </div>
            </div>

            <div className="w-full bg-gray-50 rounded-[4rem] p-12 border border-gray-100">
                <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-10">Персональні рекомендації</h4>
                <div className="space-y-6">
                   <div className="flex gap-8 items-center text-left">
                      <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-3xl shadow-sm shrink-0">📚</div>
                      <div>
                         <p className="font-black text-lg">Повторити Модуль 0{weaknesses.length > 0 ? 3 : 1}</p>
                         <p className="text-gray-400 text-sm">Приділіть увагу причинно-наслідковим зв'язкам утворення біокосних речовин.</p>
                      </div>
                   </div>
                   <div className="flex gap-8 items-center text-left">
                      <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-3xl shadow-sm shrink-0">🔬</div>
                      <div>
                         <p className="font-black text-lg">Занурення у "Функції життя"</p>
                         <p className="text-gray-400 text-sm">Перегляньте газуву функцію. Це база для розуміння клімату.</p>
                      </div>
                   </div>
                </div>
            </div>

            <button 
               onClick={() => nextScreen('home')}
               className="mt-20 bg-black text-white px-20 py-6 rounded-3xl font-black text-xl shadow-2xl hover:bg-emerald-600 transition-all active:scale-95 flex items-center gap-4"
            >
               <RefreshCcw size={28} /> РОЗПОЧАТИ КУРС ЗАНОВО
            </button>
         </div>
      </div>
    );
  };

  const LayersScreen = () => {
    const [selectedLayer, setSelectedLayer] = useState<string | null>(null);
    const layers = [
      { id: 'atmo', name: 'Атмосфера', height: '20-25 км', desc: 'Верхня межа — озоновий шар. Вище 22 км життя трапляється рідко (спори).', color: 'bg-sky-50 text-sky-700 border-sky-200 shadow-sky-100' },
      { id: 'hydro', name: 'Гідросфера', height: '11 км', desc: 'Освоєна життям повністю. Найглибша точка — Маріанська западина.', color: 'bg-emerald-50 text-emerald-700 border-emerald-200 shadow-emerald-100' },
      { id: 'litho', name: 'Літосфера', height: '3-4 км', desc: 'Верхня частина земної кори. Обмежена температурою (~100°C).', color: 'bg-amber-50 text-amber-700 border-amber-200 shadow-amber-100' },
    ];

    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-16">
          <span className="text-emerald-500 font-black tracking-widest uppercase text-xs">Інтерактивна Лабораторія</span>
          <h2 className="text-5xl font-black text-gray-900 mt-2 tracking-tighter">МЕЖІ БІОСФЕРИ</h2>
          <p className="text-gray-400 mt-6 max-w-lg mx-auto text-lg">Натисніть на зони діаграми, щоб розширити межі свого розуміння планетарних оболонок.</p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 bg-white p-10 rounded-[4rem] shadow-sm border border-gray-100">
            <div className="relative h-[600px] w-full flex flex-col justify-end gap-3 p-8 bg-gradient-to-b from-sky-400 via-sky-100 to-amber-100 rounded-[3rem] overflow-hidden border-8 border-white shadow-2xl">
              <motion.div 
                whileHover={{ backgroundColor: 'rgba(255,255,255,0.4)' }}
                onClick={() => setSelectedLayer('atmo')}
                className={cn(
                  "h-1/3 rounded-3xl flex items-center justify-center border-4 border-dashed border-white/60 cursor-pointer transition-all",
                  selectedLayer === 'atmo' ? "bg-white/50 border-solid border-sky-500 shadow-lg" : "bg-white/10"
                )}
              >
                <div className="text-center">
                  <p className="font-black text-sky-900 uppercase tracking-widest text-lg">Атмосфера</p>
                  <p className="text-sky-700 text-xs font-bold">ОЗОНОВИЙ ШАР</p>
                </div>
              </motion.div>

              <div className="flex-1 flex gap-3">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedLayer('hydro')}
                  className={cn(
                    "flex-1 rounded-3xl flex items-center justify-center border-4 border-dashed border-white/60 cursor-pointer transition-all",
                    selectedLayer === 'hydro' ? "bg-emerald-500/40 border-solid border-emerald-600 shadow-lg" : "bg-emerald-400/20"
                  )}
                >
                  <p className="font-black text-emerald-900 uppercase tracking-widest text-sm">Гідросфера</p>
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedLayer('litho')}
                  className={cn(
                    "w-2/5 rounded-3xl flex items-center justify-center border-4 border-dashed border-white/60 cursor-pointer transition-all",
                    selectedLayer === 'litho' ? "bg-amber-600/40 border-solid border-amber-800 shadow-lg" : "bg-amber-600/20"
                  )}
                >
                  <p className="font-black text-amber-900 uppercase tracking-widest text-sm">Літосфера</p>
                </motion.div>
              </div>

              <div className="absolute top-12 left-12 text-xs font-black text-sky-950/40 tracking-widest uppercase flex flex-col gap-6">
                <span>↑ 25 KM</span>
                <div className="h-24 w-[3px] bg-white/40 ml-4"></div>
                <span>0 KM</span>
                <div className="h-12 w-[3px] bg-white/40 ml-4"></div>
                <span>↓ 11 KM</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-8">
            <AnimatePresence mode="wait">
              {selectedLayer ? (
                <motion.div 
                  key={selectedLayer}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={cn("p-10 rounded-[3rem] border-3 shadow-2xl", layers.find(l => l.id === selectedLayer)?.color)}
                >
                  <div className="flex items-center gap-6 mb-8">
                    <div className="w-16 h-16 rounded-[1.5rem] bg-white flex items-center justify-center shadow-lg text-4xl">
                      {selectedLayer === 'atmo' ? '☁️' : selectedLayer === 'hydro' ? '🌊' : '⛰️'}
                    </div>
                    <div>
                      <h4 className="text-3xl font-black leading-none">{layers.find(l => l.id === selectedLayer)?.name}</h4>
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 mt-3">Вертикальна Межа: {layers.find(l => l.id === selectedLayer)?.height}</p>
                    </div>
                  </div>
                  <p className="text-xl leading-relaxed italic">{layers.find(l => l.id === selectedLayer)?.desc}</p>
                  
                  <div className="mt-10 pt-8 border-t border-black/5 flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-widest opacity-30">Аналіз Зони</span>
                    <button className="text-sm font-black flex items-center gap-2 hover:translate-x-2 transition-transform">
                      ДОКЛАДНІШЕ <ArrowRight size={20} />
                    </button>
                  </div>
                </motion.div>
              ) : (
                <div className="p-16 border-4 border-dashed border-emerald-200 bg-white rounded-[3rem] flex flex-col items-center justify-center text-emerald-300 text-center min-h-[300px]">
                  <MousePointer2 size={64} className="mb-6 animate-bounce text-emerald-400" />
                  <p className="font-black text-2xl text-emerald-800">ОБЕРІТЬ СФЕРУ</p>
                  <p className="font-medium text-emerald-600/50 mt-2">Клацніть на діаграму зліва</p>
                </div>
              )}
            </AnimatePresence>
            
            <button 
              onClick={() => nextScreen('classification')}
              className={cn(
                "w-full py-8 rounded-[2rem] font-black text-xl shadow-2xl flex items-center justify-center gap-4 transition-all active:scale-95",
                selectedLayer ? "bg-black text-white hover:bg-emerald-950" : "bg-gray-200 text-gray-400 pointer-events-none"
              )}
            >
              ПЕРЕЙТИ ДО СОРТУВАННЯ <ArrowRight size={24} />
            </button>
          </div>
        </div>
      </div>
    );
  };

  const ClassificationScreen = () => {
    const [items, setItems] = useState<Substance[]>(SUBSTANCES_DATA);
    const [assignments, setAssignments] = useState<Record<string, string>>({});
    const [feedback, setFeedback] = useState<{ id: string, correct: boolean } | null>(null);

    const categories = [
      { id: 'living', name: 'Жива', icon: '🌿', color: 'border-emerald-200 bg-emerald-50 text-emerald-800' },
      { id: 'biogenic', name: 'Біогенна', icon: '🪨', color: 'border-amber-200 bg-amber-50 text-amber-800' },
      { id: 'bioinert', name: 'Біокосна', icon: '🏖️', color: 'border-blue-200 bg-blue-50 text-blue-800' },
      { id: 'inert', name: 'Косна', icon: '💎', color: 'border-slate-200 bg-slate-50 text-slate-800' },
    ];

    const currentItem = items.find(i => !assignments[i.id]);

    const handleAssign = (category: string) => {
      if (!currentItem) return;
      
      const isCorrect = currentItem.type === category;
      setFeedback({ id: currentItem.id, correct: isCorrect });
      
      setTimeout(() => {
        setAssignments(prev => ({ ...prev, [currentItem.id]: category }));
        setFeedback(null);
        if (isCorrect) addXp(15);
      }, 1000);
    };

    if (!currentItem) {
      return (
        <div className="max-w-3xl mx-auto py-20 text-center bg-white rounded-[5rem] p-20 shadow-sm border border-gray-100">
            <div className="w-32 h-32 bg-emerald-100 rounded-[2.5rem] flex items-center justify-center text-emerald-600 mx-auto mb-10 shadow-inner relative">
               <Trophy size={64} />
               <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity }} className="absolute -top-2 -right-2 bg-amber-400 p-2 rounded-full border-4 border-white"><Star size={16} fill="white" /></motion.div>
            </div>
            <h2 className="text-5xl font-black mb-6 tracking-tighter">МАЙСТЕР КЛАСИФІКАЦІЇ</h2>
            <p className="text-gray-400 text-xl mb-16 font-medium leading-relaxed">Ви безпомилково розрізняєте типи речовин у біосфері. Рівень усвідомлення: Максимальний.</p>
            <button 
              onClick={() => nextScreen('quiz')}
              className="bg-black text-white px-16 py-6 rounded-3xl font-black text-xl shadow-2xl flex items-center gap-4 mx-auto hover:bg-emerald-950 transition-all active:scale-95"
            >
              ПЕРЕЙТИ ДО ЕКЗАМЕНУ <ArrowRight />
            </button>
        </div>
      );
    }

    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-20">
          <span className="text-emerald-500 font-black tracking-widest uppercase text-xs">Практичний Тренажер</span>
          <h2 className="text-5xl font-black text-gray-900 mt-2 tracking-tighter">КЛАСИФІКАЦІЯ МАТЕРІЇ</h2>
          <p className="text-gray-400 mt-6 max-w-lg mx-auto text-lg leading-tight">Вернадський розділив світ на 4 типи. Чи зможете ви розставити все по своїх місцях?</p>
        </div>
        
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div 
                key={currentItem.id}
                initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                exit={{ scale: 1.2, opacity: 0, rotate: 10, filter: 'blur(20px)' }}
                className={cn(
                  "w-full aspect-square bg-white rounded-[4rem] shadow-2xl border flex flex-col items-center justify-center p-16 text-center transition-all relative overflow-hidden",
                  feedback === null ? "border-gray-50 ring-1 ring-gray-100" : (feedback.correct ? "border-emerald-500 bg-emerald-50 ring-8 ring-emerald-500/10" : "border-red-400 bg-red-50 ring-8 ring-red-500/10")
                )}
              >
                <div className="text-8xl mb-10 transform scale-150 filter drop-shadow-xl">📦</div>
                <h3 className="text-5xl font-black mb-6 text-gray-900 tracking-tighter uppercase">{currentItem.name}</h3>
                <p className="text-gray-400 text-lg italic font-bold">"{currentItem.description}"</p>
                
                {feedback && (
                  <motion.div 
                    initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                    className={cn("absolute bottom-16 font-black text-xl px-10 py-3 rounded-2xl shadow-xl", feedback.correct ? "bg-emerald-500 text-white" : "bg-red-500 text-white")}
                  >
                    {feedback.correct ? "ВІРНО!" : "ПОМИЛКА"}
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 gap-6">
            {categories.map(cat => (
              <button
                key={cat.id} onClick={() => handleAssign(cat.id)} disabled={!!feedback}
                className={cn(
                  "p-10 rounded-[3rem] border-3 font-black text-2xl transition-all active:scale-95 group text-left flex flex-col justify-between h-56 shadow-sm relative overflow-hidden",
                  cat.color, "hover:shadow-2xl hover:-translate-y-2"
                )}
              >
                <div className="text-4xl bg-white/50 w-16 h-16 rounded-[1.5rem] flex items-center justify-center group-hover:rotate-12 group-hover:scale-110 transition-all">{cat.icon}</div>
                <div>
                  <div className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 mb-2">МАТЕРІЯ</div>
                  <div className="text-3xl tracking-tighter uppercase leading-none">{cat.name}</div>
                </div>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // --- Layout Wrappers ---

  return (
    <div className="min-h-screen bg-[#F4F7F5] text-gray-800 font-sans selection:bg-emerald-100 selection:text-emerald-900 overflow-x-hidden">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-emerald-100 px-8 py-5 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <button onClick={() => nextScreen('home')} className="flex items-center gap-4 group">
            <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center text-white shadow-xl group-hover:bg-emerald-600 transition-all">
               <Globe size={28} />
            </div>
            <div className="text-left leading-none">
              <h1 className="text-2xl font-black text-gray-900 tracking-tighter uppercase">БІОСФЕРА <span className="text-emerald-500">PRO</span></h1>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Science Research Portal</p>
            </div>
          </button>
          
          <div className="flex items-center space-x-8">
            <div className="hidden md:flex flex-col items-end">
              <div className="flex items-center space-x-3 mb-1">
                <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Професійний Ранг</span>
                <span className="text-sm font-black text-emerald-600">LVL {level}</span>
              </div>
              <div className="w-56 h-2 bg-gray-100 rounded-full overflow-hidden">
                 <motion.div className="h-full bg-emerald-500" animate={{ width: `${(xp % 100)}%` }} />
              </div>
            </div>
            <div className="bg-black px-6 py-2 rounded-2xl flex items-center space-x-3 shadow-xl">
               <span className="text-xl">⚡</span>
               <span className="font-black text-white text-lg">{xp} XP</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto pb-32 pt-16 px-6">
        <AnimatePresence mode="wait">
          {screen === 'home' && <HomeScreen key="home" />}
          {screen === 'theory' && <TheoryScreen key="theory" />}
          {screen === 'module_test' && <ModuleTestScreen key="module_test" />}
          {screen === 'layers' && <LayersScreen key="layers" />}
          {screen === 'classification' && <ClassificationScreen key="classification" />}
          {screen === 'quiz' && <QuizScreen key="quiz" />}
          {screen === 'millionaire' && <MillionaireGame key="millionaire" />}
          {screen === 'results' && <ResultAnalysisScreen key="results" />}
        </AnimatePresence>
      </main>

      <footer className="bg-white border-t border-gray-100 px-10 py-6 flex flex-col md:flex-row items-center justify-between text-[10px] font-bold text-gray-400 uppercase tracking-widest fixed bottom-0 left-0 right-0 z-40">
        <div className="flex space-x-10 mb-4 md:mb-0">
          <span className="flex items-center gap-2"><div className="w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)] animate-pulse" /> СЕРВЕР: ВЕРНАДСЬКИЙ-ALPHA</span>
          <span className="hidden sm:inline">ДАТА: {new Date().toLocaleDateString()}</span>
        </div>
        <div className="flex space-x-10">
          <button className="hover:text-emerald-500 transition-colors">Методичні вказівки</button>
          <button className="hover:text-emerald-500 transition-colors">Експорт результатів</button>
        </div>
      </footer>
    </div>
  );
}
