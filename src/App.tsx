/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

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
  Layers,
  Zap
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
  type Substance
} from './types.ts';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type Screen = 'home' | 'theory' | 'layers' | 'classification' | 'quiz' | 'millionaire' | 'results';

export default function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const [xp, setXp] = useState(0);
  const [currentTheory, setCurrentTheory] = useState(0);
  const [progress, setProgress] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [level, setLevel] = useState(1);

  useEffect(() => {
    const saved = localStorage.getItem('biosphere-progress');
    if (saved) {
      const data = JSON.parse(saved);
      setXp(data.xp || 0);
      setLevel(Math.floor(data.xp / 100) + 1);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('biosphere-progress', JSON.stringify({ xp }));
    setLevel(Math.floor(xp / 100) + 1);
  }, [xp]);

  const addXp = (amount: number) => {
    setXp(prev => prev + amount);
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.9 },
      colors: ['#22c55e', '#10b981', '#34d399']
    });
  };

  const nextScreen = (to: Screen) => {
    setScreen(to);
    window.scrollTo(0, 0);
  };

  // --- Sub-components (Screens) ---

  const HomeScreen = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4"
    >
      <div className="relative mb-8">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="w-48 h-48 bg-green-100 rounded-full flex items-center justify-center border-4 border-green-500 shadow-xl"
        >
          <Globe size={120} className="text-green-600" />
        </motion.div>
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -bottom-4 -right-4 bg-yellow-400 text-white p-4 rounded-2xl shadow-lg border-2 border-white"
        >
          <Zap size={32} />
        </motion.div>
      </div>
      
      <h1 className="text-5xl md:text-6xl font-bold text-green-800 mb-4 tracking-tight">
        Біосфера
      </h1>
      <p className="text-xl text-gray-600 mb-12 max-w-lg">
        Досліджуй живу оболонку нашої планети та навчись бути господарем власного майбутнього.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl px-4">
        <button 
          onClick={() => nextScreen('theory')}
          className="group relative flex items-center gap-4 bg-white border-2 border-green-500 p-6 rounded-3xl hover:bg-green-50 transition-all shadow-md active:scale-95"
        >
          <div className="bg-green-500 text-white p-3 rounded-xl group-hover:scale-110 transition-transform">
            <BookOpen size={24} />
          </div>
          <div className="text-left">
            <h3 className="font-bold text-green-900">Теорія</h3>
            <p className="text-sm text-gray-500">Вивчай основи</p>
          </div>
        </button>

        <button 
          onClick={() => nextScreen('layers')}
          className="group relative flex items-center gap-4 bg-white border-2 border-blue-500 p-6 rounded-3xl hover:bg-blue-50 transition-all shadow-md active:scale-95"
        >
          <div className="bg-blue-500 text-white p-3 rounded-xl group-hover:scale-110 transition-transform">
            <Layers size={24} />
          </div>
          <div className="text-left">
            <h3 className="font-bold text-blue-900">Інтерактив</h3>
            <p className="text-sm text-gray-500">Межі та шари</p>
          </div>
        </button>
      </div>

      <button 
        onClick={() => nextScreen('theory')}
        className="mt-12 bg-green-600 text-white px-10 py-4 rounded-full font-bold text-lg shadow-xl hover:bg-green-700 transition-colors flex items-center gap-2 group"
      >
        Почати Подорож
        <ArrowRight className="group-hover:translate-x-1 transition-transform" />
      </button>
    </motion.div>
  );

  // --- Theory System ---

  const TheoryVisuals = ({ id }: { id: string }) => {
    switch (id) {
      case 'intro':
        return (
          <div className="relative w-full h-48 bg-emerald-50 rounded-2xl flex items-center justify-center overflow-hidden border border-emerald-100 mb-8">
            <div className="absolute inset-0 opacity-10">
               <Globe size={200} className="absolute -top-10 -right-10 text-emerald-900" />
            </div>
            <div className="flex items-center gap-4 z-10">
              <div className="bg-white p-4 rounded-xl shadow-md text-center border border-emerald-100 italic">
                <span className="block text-2xl mb-1">👴</span>
                <span className="text-[10px] font-bold uppercase text-emerald-800">Вернадський</span>
              </div>
              <ArrowRight className="text-emerald-300" />
              <div className="bg-emerald-500 p-4 rounded-full shadow-lg text-white">
                <Globe size={48} />
              </div>
            </div>
          </div>
        );
      case 'boundaries':
        return (
          <div className="relative w-full h-48 bg-blue-50 rounded-2xl flex items-center justify-center border border-blue-100 mb-8">
            <div className="flex flex-col items-center gap-1">
              <div className="w-40 h-8 bg-sky-200 rounded-t-lg border-x-2 border-t-2 border-sky-400 flex items-center justify-center text-[10px] font-bold text-sky-800">АТМОСФЕРА (25КМ)</div>
              <div className="w-48 h-12 bg-emerald-300 flex items-center justify-center text-[10px] font-bold text-emerald-900 border-x-2 border-emerald-500">БІОСФЕРА (ЗОНА ЖИТТЯ)</div>
              <div className="w-40 h-8 bg-amber-400 rounded-b-lg border-x-2 border-b-2 border-amber-600 flex items-center justify-center text-[10px] font-bold text-amber-900">ЛІТОСФЕРА (4КМ)</div>
            </div>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 w-16 h-32 bg-cyan-400/30 rounded-full border-2 border-cyan-500 flex items-center justify-center rotate-12">
               <span className="text-[8px] font-black text-cyan-800 -rotate-12">ОКЕАН (11КМ)</span>
            </div>
          </div>
        );
      case 'substances_types':
        return (
          <div className="grid grid-cols-4 gap-2 w-full h-48 p-4 bg-gray-50 rounded-2xl border border-gray-100 mb-8">
             <div className="bg-emerald-100 border border-emerald-200 rounded-xl p-2 flex flex-col items-center justify-center">
                <span className="text-2xl">🌿</span>
                <span className="text-[8px] font-bold uppercase mt-1">Жива</span>
             </div>
             <div className="bg-orange-100 border border-orange-200 rounded-xl p-2 flex flex-col items-center justify-center">
                <span className="text-2xl">⛽</span>
                <span className="text-[8px] font-bold uppercase mt-1">Біогенна</span>
             </div>
             <div className="bg-blue-100 border border-blue-200 rounded-xl p-2 flex flex-col items-center justify-center">
                <span className="text-2xl">🏖️</span>
                <span className="text-[8px] font-bold uppercase mt-1">Біокосна</span>
             </div>
             <div className="bg-slate-200 border border-slate-300 rounded-xl p-2 flex flex-col items-center justify-center">
                <span className="text-2xl">💎</span>
                <span className="text-[8px] font-bold uppercase mt-1">Косна</span>
             </div>
          </div>
        );
      case 'functions':
        return (
          <div className="relative w-full h-48 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center justify-center mb-8">
             <motion.div 
               animate={{ scale: [1, 1.1, 1] }} 
               transition={{ repeat: Infinity, duration: 3 }}
               className="w-32 h-32 bg-white rounded-full border-4 border-emerald-500 flex items-center justify-center shadow-lg"
             >
                <Zap className="text-amber-500" size={48} fill="currentColor" />
             </motion.div>
             <div className="absolute top-4 left-4 text-[8px] font-bold text-gray-400 border border-gray-200 p-1 rounded uppercase">Газова</div>
             <div className="absolute bottom-4 right-4 text-[8px] font-bold text-gray-400 border border-gray-200 p-1 rounded uppercase">Концентраційна</div>
          </div>
        );
      case 'cycle':
        return (
          <div className="relative w-full h-48 bg-indigo-50 rounded-2xl border border-indigo-100 flex items-center justify-center mb-8">
             <motion.div 
                animate={{ rotate: 360 }} 
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="w-32 h-32 border-4 border-dashed border-indigo-300 rounded-full flex items-center justify-center"
             >
                <div className="absolute top-0 -translate-y-1/2 bg-white p-2 rounded-lg border border-indigo-100">☀️</div>
                <div className="absolute bottom-0 translate-y-1/2 bg-white p-2 rounded-lg border border-indigo-100">🌋</div>
             </motion.div>
             <div className="text-indigo-900 font-bold text-sm tracking-tighter">КОЛООБІГ</div>
          </div>
        );
      case 'extremophiles':
        return (
          <div className="relative w-full h-48 bg-red-50 rounded-2xl border border-red-100 overflow-hidden mb-8">
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
               <Zap size={120} className="text-red-500" />
            </div>
            <div className="relative z-10 flex gap-4 p-4 items-center justify-center h-full">
               <div className="bg-white p-3 rounded-xl shadow-sm border border-red-100 flex flex-col items-center">
                  <span className="text-2xl">🌋</span>
                  <span className="text-[10px] font-bold text-red-600">100°C+</span>
               </div>
               <div className="bg-white p-3 rounded-xl shadow-sm border border-red-100 flex flex-col items-center">
                  <span className="text-2xl">🏔️</span>
                  <span className="text-[10px] font-bold text-red-600">8300M</span>
               </div>
               <div className="bg-white p-3 rounded-xl shadow-sm border border-red-100 flex flex-col items-center">
                  <span className="text-2xl">🦠</span>
                  <span className="text-[10px] font-bold text-red-600">ЕКСТРЕМОФІЛИ</span>
               </div>
            </div>
          </div>
        );
      case 'noosphere_concept':
        return (
          <div className="relative w-full h-48 bg-violet-50 rounded-2xl border border-violet-100 flex items-center justify-center mb-8">
             <div className="relative">
                <Globe size={80} className="text-violet-500 opacity-30" />
                <motion.div 
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute inset-0 bg-violet-400 rounded-full blur-2xl"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                   <Zap size={40} className="text-violet-600" />
                </div>
             </div>
             <div className="ml-6 space-y-1">
                <div className="text-[10px] font-bold text-violet-700 uppercase tracking-tighter">Сфера Розуму</div>
                <div className="text-[8px] text-violet-400 font-mono">БІОСФЕРА → НООСФЕРА</div>
             </div>
          </div>
        );
      case 'noosphere_signs':
        return (
          <div className="grid grid-cols-3 gap-2 w-full h-48 p-4 bg-emerald-50 rounded-2xl border border-emerald-100 mb-8 overflow-hidden">
             {[
               { i: '🚀', t: 'Космос' },
               { i: '🔋', t: 'Енергія' },
               { i: '🧬', t: 'Синтез' },
               { i: '⛓️', t: 'Метали' },
               { i: '🕊️', t: 'Мир' },
               { i: '📖', t: 'Наука' }
             ].map((sign, idx) => (
               <div key={idx} className="bg-white/80 rounded-lg flex flex-col items-center justify-center p-1 border border-emerald-100">
                  <span className="text-xl">{sign.i}</span>
                  <span className="text-[8px] font-bold text-emerald-800 uppercase mt-1">{sign.t}</span>
               </div>
             ))}
          </div>
        );
      default:
        return (
          <div className="w-full h-48 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-center mb-8">
            <Globe className="text-gray-200" size={64} />
          </div>
        );
    }
  };

  const TheoryScreen = () => {
    const slide = THEORY_CONTENT[currentTheory];
    return (
      <motion.div 
        key={currentTheory}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-12 gap-8"
      >
        <div className="col-span-12 lg:col-span-8 flex flex-col h-full">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 relative overflow-hidden h-full flex flex-col">
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-emerald-600 font-bold tracking-widest uppercase text-[10px]">Модуль {currentTheory + 1}</span>
                <h2 className="text-3xl font-bold text-gray-900">{slide.title}</h2>
              </div>
              <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Знання</span>
            </div>

            <TheoryVisuals id={slide.id} />

            <div className="flex-1">
              <h3 className="text-xl font-bold text-emerald-700 mb-8 pb-4 border-b border-emerald-50 italic">
                {slide.accentTitle}
              </h3>
              <ul className="space-y-6">
                {slide.content.map((item, id) => (
                  <motion.li 
                    key={id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: id * 0.1 }}
                    className="flex gap-4 items-start text-lg text-gray-600 leading-relaxed group"
                  >
                    <div className="mt-1.5 bg-emerald-50 text-emerald-600 rounded-lg p-2 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                      <CheckCircle2 size={18} />
                    </div>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-50 flex items-center justify-between">
              <button 
                disabled={currentTheory === 0}
                onClick={() => setCurrentTheory(prev => prev - 1)}
                className={cn(
                  "px-8 py-3 rounded-2xl font-bold transition-all text-sm uppercase tracking-widest flex items-center gap-2",
                  currentTheory === 0 ? "text-gray-300 pointer-events-none" : "text-gray-500 hover:text-emerald-600"
                )}
              >
                Назад
              </button>
              
              <div className="flex gap-4">
                {currentTheory === THEORY_CONTENT.length - 1 ? (
                  <button 
                    onClick={() => { addXp(20); nextScreen('layers'); }}
                    className="bg-emerald-600 text-white px-10 py-4 rounded-2xl font-bold shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition-all flex items-center gap-3"
                  >
                    Наступний етап <ArrowRight size={18} />
                  </button>
                ) : (
                  <button 
                    onClick={() => setCurrentTheory(prev => prev + 1)}
                    className="bg-emerald-600 text-white px-10 py-4 rounded-2xl font-bold shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition-all"
                  >
                    Продовжити
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <aside className="col-span-12 lg:col-span-4 flex flex-col space-y-6">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col shrink-0">
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6">Зміст курсу</div>
            <nav className="space-y-2">
              {THEORY_CONTENT.map((mod, i) => (
                <button
                  key={mod.id}
                  onClick={() => setCurrentTheory(i)}
                  className={cn(
                    "w-full flex items-center space-x-3 p-4 rounded-2xl font-semibold transition-all text-left border-l-4",
                    currentTheory === i 
                      ? "bg-emerald-50 text-emerald-700 border-emerald-500" 
                      : i < currentTheory 
                        ? "text-emerald-400 opacity-60 border-transparent" 
                        : "text-gray-400 border-transparent hover:bg-gray-50"
                  )}
                >
                  <span className="text-base">{['👴', '📏', '🌩️', '⚗️', '⚙️', '⚖️', '🔄', '🧠', '✨'][i]}</span>
                  <span className="text-[11px] truncate leading-tight">{mod.title}</span>
                </button>
              ))}
            </nav>
          </div>
          
          <div className="bg-emerald-800 rounded-[2rem] p-6 text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 text-emerald-700/30 uppercase text-6xl font-black select-none pointer-events-none">TIP</div>
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-3">Біосферна довідка</p>
            <p className="text-xs font-medium leading-relaxed relative z-10 italic">
               Сумарна біомаса усіх організмів Землі становить лише 0.01% від маси всієї планети, але вона змінює її обличчя до невпізнаваності.
            </p>
          </div>
        </aside>
      </motion.div>
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
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <span className="text-emerald-600 font-bold tracking-widest uppercase text-[10px]">Інтерактив</span>
          <h2 className="text-4xl font-bold text-gray-900 mt-2">Межі Біосфери</h2>
          <p className="text-gray-500 mt-4 max-w-md mx-auto">Натискай на зони діаграми, щоб дослідити умови існування життя в кожній оболонці.</p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-100">
            <div className="relative h-[500px] w-full flex flex-col justify-end gap-2 p-6 bg-gradient-to-b from-sky-300 via-sky-100 to-amber-100 rounded-[2rem] overflow-hidden border-4 border-white shadow-inner">
              <motion.div 
                whileHover={{ scale: 1.01, backgroundColor: 'rgba(255,255,255,0.3)' }}
                onClick={() => setSelectedLayer('atmo')}
                className={cn(
                  "h-1/3 rounded-2xl flex items-center justify-center border-2 border-dashed border-white/60 cursor-pointer transition-all",
                  selectedLayer === 'atmo' ? "bg-white/40 border-solid border-sky-500" : "bg-white/10"
                )}
              >
                <div className="text-center">
                  <p className="font-bold text-sky-900 uppercase tracking-widest text-sm">Атмосфера</p>
                  <p className="text-sky-700 text-[10px] font-bold">Озоновий Екран</p>
                </div>
              </motion.div>

              <div className="flex-1 flex gap-2">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedLayer('hydro')}
                  className={cn(
                    "flex-1 rounded-2xl flex items-center justify-center border-2 border-dashed border-white/60 cursor-pointer transition-all",
                    selectedLayer === 'hydro' ? "bg-emerald-500/40 border-solid border-emerald-600" : "bg-emerald-400/20"
                  )}
                >
                  <p className="font-bold text-emerald-900 uppercase tracking-widest text-xs">Гідросфера</p>
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedLayer('litho')}
                  className={cn(
                    "w-1/3 rounded-2xl flex items-center justify-center border-2 border-dashed border-white/60 cursor-pointer transition-all",
                    selectedLayer === 'litho' ? "bg-amber-600/40 border-solid border-amber-800" : "bg-amber-600/20"
                  )}
                >
                  <p className="font-bold text-amber-900 uppercase tracking-widest text-xs">Літосфера</p>
                </motion.div>
              </div>

              <div className="absolute top-8 left-8 text-[10px] font-black text-white/60 tracking-widest uppercase flex flex-col gap-4">
                <span>↑ 25 KM</span>
                <div className="h-20 w-[2px] bg-white/30 ml-4"></div>
                <span>0 KM</span>
                <div className="h-10 w-[2px] bg-white/30 ml-4"></div>
                <span>↓ 11 KM</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <AnimatePresence mode="wait">
              {selectedLayer ? (
                <motion.div 
                  key={selectedLayer}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={cn("p-8 rounded-[2rem] border-2 shadow-lg", layers.find(l => l.id === selectedLayer)?.color)}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm text-2xl">
                      {selectedLayer === 'atmo' ? '☁️' : selectedLayer === 'hydro' ? '🌊' : '⛰️'}
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold">{layers.find(l => l.id === selectedLayer)?.name}</h4>
                      <p className="text-xs font-black uppercase tracking-widest opacity-60">Межа: {layers.find(l => l.id === selectedLayer)?.height}</p>
                    </div>
                  </div>
                  <p className="text-lg leading-relaxed">{layers.find(l => l.id === selectedLayer)?.desc}</p>
                  
                  <div className="mt-8 pt-8 border-t border-black/5 flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-widest opacity-40">Елемент Системи</span>
                    <button className="text-sm font-bold flex items-center gap-2 hover:translate-x-1 transition-transform">
                      Детальніше <ArrowRight size={16} />
                    </button>
                  </div>
                </motion.div>
              ) : (
                <div className="p-12 border-2 border-dashed border-emerald-200 bg-white/50 rounded-[2rem] flex flex-col items-center justify-center text-emerald-300 text-center">
                  <MousePointer2 size={48} className="mb-4 animate-bounce text-emerald-400" />
                  <p className="font-bold text-emerald-800">Оберіть сферу на діаграмі</p>
                  <p className="text-xs mt-2">Клацніть на частину схеми зліва</p>
                </div>
              )}
            </AnimatePresence>
            
            <button 
              onClick={() => nextScreen('classification')}
              className={cn(
                "w-full py-5 rounded-2xl font-bold shadow-lg flex items-center justify-center gap-3 transition-all active:scale-95",
                selectedLayer ? "bg-emerald-600 text-white shadow-emerald-100 hover:bg-emerald-700" : "bg-gray-200 text-gray-400 pointer-events-none"
              )}
            >
              Перейти до Сортування <ArrowRight size={20} />
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
      { id: 'living', name: 'Жива', icon: '🌱', color: 'border-emerald-200 bg-emerald-50 text-emerald-800' },
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
        if (isCorrect) addXp(10);
      }, 800);
    };

    if (!currentItem) {
      return (
        <div className="max-w-2xl mx-auto py-20 text-center bg-white rounded-[3rem] p-12 shadow-sm border border-gray-100">
            <div className="w-24 h-24 bg-emerald-100 rounded-3xl flex items-center justify-center text-emerald-600 mx-auto mb-8 shadow-inner">
               <Trophy size={48} />
            </div>
            <h2 className="text-4xl font-bold mb-4 tracking-tight">Дослідник Гідний Вернадського!</h2>
            <p className="text-gray-500 text-lg mb-10">Ви успішно класифікували всі типи речовин біосфери. Ваша майстерність зростає.</p>
            <button 
              onClick={() => nextScreen('quiz')}
              className="bg-emerald-600 text-white px-12 py-5 rounded-2xl font-bold shadow-xl shadow-emerald-100 flex items-center gap-3 mx-auto hover:bg-emerald-700 transition-all active:scale-95"
            >
              Фінальне Тестування <ArrowRight />
            </button>
        </div>
      );
    }

    return (
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <span className="text-emerald-600 font-bold tracking-widest uppercase text-[10px]">Класифікація</span>
          <h2 className="text-4xl font-bold text-gray-900 mt-2">Типи Речовин</h2>
          <p className="text-gray-500 mt-4">Перетягніть (або натисніть) речовину до її правильної категорії.</p>
        </div>
        
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div 
                key={currentItem.id}
                initial={{ scale: 0.9, opacity: 0, y: 10 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 1.1, opacity: 0, filter: 'blur(10px)' }}
                className={cn(
                  "w-full aspect-[4/3] bg-white rounded-[3rem] shadow-2xl border flex flex-col items-center justify-center p-12 text-center transition-all",
                  feedback === null ? "border-gray-100 shadow-emerald-900/5" : (feedback.correct ? "border-emerald-500 bg-emerald-50 ring-4 ring-emerald-500/20" : "border-red-400 bg-red-50 ring-4 ring-red-500/20")
                )}
              >
                <div className="text-6xl mb-6 transform scale-125">📦</div>
                <h3 className="text-4xl font-black mb-4 text-gray-900 tracking-tight">{currentItem.name}</h3>
                <p className="text-gray-400 text-sm italic font-medium">{currentItem.description}</p>
                
                {feedback && (
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }} 
                    animate={{ y: 0, opacity: 1 }}
                    className={cn("absolute bottom-10 font-bold text-lg px-6 py-2 rounded-full", feedback.correct ? "bg-emerald-500 text-white" : "bg-red-500 text-white")}
                  >
                    {feedback.correct ? "ВІРНО!" : "НЕВІРНО"}
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 gap-4">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => handleAssign(cat.id)}
                disabled={!!feedback}
                className={cn(
                  "p-8 rounded-[2rem] border-2 font-bold transition-all active:scale-95 group text-left flex flex-col justify-between h-40 shadow-sm",
                  cat.color,
                  "hover:shadow-md hover:-translate-y-1"
                )}
              >
                <div className="text-3xl bg-white/50 w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">{cat.icon}</div>
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-1">Речовина</div>
                  <div className="text-xl">{cat.name}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const QuizScreen = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selected, setSelected] = useState<number | null>(null);
    const [isComplete, setIsComplete] = useState(false);
    const [results, setResults] = useState<boolean[]>([]);

    const question = QUIZ_QUESTIONS[currentQuestion];

    const handleAnswer = (idx: number) => {
      setSelected(idx);
      const isCorrect = idx === question.correct;
      setResults(prev => [...prev, isCorrect]);
      if (isCorrect) {
        addXp(15);
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
        <div className="max-w-2xl mx-auto py-20 text-center bg-white rounded-[3rem] p-12 border border-emerald-100 shadow-sm">
          <div className="w-32 h-32 bg-emerald-500 rounded-full flex items-center justify-center text-white mx-auto mb-10 shadow-xl shadow-emerald-200">
             <Trophy size={64} />
          </div>
          <h2 className="text-4xl font-bold mb-4 tracking-tighter text-gray-900">Результати Лабораторної</h2>
          
          <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto mb-12">
            <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
              <div className="text-3xl font-black text-emerald-600">{quizScore}</div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Бали</div>
            </div>
            <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100 col-span-2">
              <div className="text-3xl font-black text-amber-600">{Math.round((quizScore / QUIZ_QUESTIONS.length)*100)}%</div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Точність</div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <button 
              onClick={() => nextScreen('millionaire')}
              className="bg-indigo-900 text-white px-10 py-5 rounded-2xl font-bold shadow-xl flex items-center justify-center gap-3 hover:bg-emerald-900 transition-all active:scale-95"
            >
              <Zap strokeWidth={3} size={24} className="text-amber-400" /> Міні-гра: Біо-Мільйонер
            </button>
            <button 
              onClick={() => {
                setQuizScore(0);
                setCurrentQuestion(0);
                setSelected(null);
                setResults([]);
                setIsComplete(false);
              }}
              className="text-gray-400 font-bold hover:text-emerald-600 transition-colors text-sm uppercase tracking-widest"
            >
              Перескласти тест
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-10">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Питання {currentQuestion + 1} / {QUIZ_QUESTIONS.length}</span>
            <div className="flex gap-1">
              {QUIZ_QUESTIONS.map((_, i) => (
                <div key={i} className={cn("w-3 h-3 rounded-full", i === currentQuestion ? "bg-emerald-500" : i < currentQuestion ? "bg-emerald-200" : "bg-gray-100")} />
              ))}
            </div>
          </div>
          
          <h2 className="text-3xl font-bold mb-12 text-gray-900 tracking-tight leading-tight">{question.text}</h2>
          
          <div className="space-y-3">
            {question.options.map((opt, i) => (
              <button
                key={i}
                disabled={selected !== null}
                onClick={() => handleAnswer(i)}
                className={cn(
                  "w-full p-5 text-left rounded-2xl border-2 transition-all font-bold text-sm flex items-center group",
                  selected === null ? "border-gray-50 bg-gray-50 hover:border-emerald-500 hover:bg-emerald-50 text-gray-600" : 
                  i === question.correct ? "border-emerald-500 bg-emerald-500 text-white shadow-lg shadow-emerald-100" : 
                  i === selected ? "border-red-500 bg-red-100 text-red-900" : "border-gray-50 bg-gray-50 text-gray-400"
                )}
              >
                <span className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center mr-4 font-black transition-colors",
                  selected === null ? "bg-white text-gray-300 group-hover:bg-emerald-500 group-hover:text-white" : 
                  i === question.correct ? "bg-white/20 text-white" : "bg-white text-gray-300"
                )}>
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="flex-1">{opt}</span>
                {selected !== null && i === question.correct && <CheckCircle2 className="text-white" />}
              </button>
            ))}
          </div>

          <AnimatePresence>
            {selected !== null && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                className="mt-10 pt-10 border-t border-gray-100"
              >
                <div className="bg-emerald-50/50 p-6 rounded-2xl border border-emerald-100 mb-8">
                  <p className="text-emerald-800 text-sm font-medium italic leading-relaxed">
                    <span className="font-bold block mb-1 uppercase text-[10px] tracking-widest text-emerald-400">Пояснення:</span>
                    {question.explanation}
                  </p>
                </div>
                <button 
                  onClick={next}
                  className="w-full bg-emerald-600 text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-xl hover:bg-emerald-700 transition"
                >
                  {currentQuestion === QUIZ_QUESTIONS.length - 1 ? 'Перейти до результатів' : 'Наступне питання'} <ArrowRight size={20} />
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
    const moneyScale = ['1K', '5K', '10K', '50K', '100K', '500K', '1M'];

    const handleAnswer = (idx: number) => {
      setSelected(idx);
      setTimeout(() => {
        if (idx === question.correct) {
          if (currentIdx === MILLIONAIRE_QUESTIONS.length - 1) {
            setWon(true);
            setGameOver(true);
            addXp(100);
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
        <div className="max-w-3xl mx-auto py-20 text-center bg-gradient-to-br from-indigo-950 to-emerald-950 text-white rounded-[4rem] p-16 shadow-[0_40px_100px_rgba(0,0,0,0.3)] border border-white/10">
          <div className="relative inline-block mb-12">
            <Trophy size={140} className={cn("mx-auto", won ? "text-amber-400 filter drop-shadow-[0_0_20px_rgba(251,191,36,0.5)]" : "text-gray-600")} />
            {won && <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity }} className="absolute -top-4 -right-4 bg-red-500 p-4 rounded-full text-2xl">🔥</motion.div>}
          </div>
          <h2 className="text-6xl font-black mb-6 tracking-tighter">{won ? "ВИ — ЕКО-МІЛЬЙОНЕР!" : "ГРУ ЗАКІНЧЕНО"}</h2>
          <p className="text-xl mb-16 opacity-60 font-medium max-w-lg mx-auto leading-relaxed">{won ? "Ваша повага до Вернадського та знання біосфери приголомшливі. Сфера розуму — це ви!" : "Одна маленька помилка — і колообіг речовин перервано. Спробуйте ще раз!"}</p>
          <div className="flex gap-6 justify-center flex-wrap">
            <button 
              onClick={() => nextScreen('results')}
              className="bg-white text-indigo-950 px-12 py-5 rounded-2xl font-bold shadow-2xl hover:bg-emerald-50 transition-all active:scale-95"
            >
              Завершити подорож
            </button>
            <button 
              onClick={() => {
                setCurrentIdx(0);
                setGameOver(false);
                setWon(false);
                setSelected(null);
              }}
              className="bg-white/10 border-2 border-white/10 px-12 py-5 rounded-2xl font-bold hover:bg-white/20 transition-all active:scale-95 backdrop-blur-md"
            >
              Взяти Реванш
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col lg:grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-8 w-full">
          <div className="bg-white p-12 rounded-[4rem] shadow-sm border border-gray-100 relative overflow-hidden h-[600px] flex flex-col justify-center">
            <div className="absolute top-0 right-0 p-8 text-emerald-50/50 font-black text-[12rem] leading-none select-none pointer-events-none">Q</div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <span className="bg-amber-100 text-amber-700 font-black text-xs tracking-widest uppercase px-4 py-2 rounded-full border border-amber-200">Рівень {currentIdx + 1}</span>
                <span className="text-emerald-300 font-black text-sm tracking-widest uppercase">Мільйон на кону</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-16 leading-tight tracking-tight">{question.text}</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {question.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswer(i)}
                    disabled={selected !== null}
                    className={cn(
                      "p-8 text-left border-2 rounded-3xl transition-all font-bold relative overflow-hidden group min-h-[100px] flex items-center",
                      selected === null ? "border-gray-50 bg-gray-50 hover:border-emerald-500 hover:bg-emerald-50 text-gray-600" : 
                      i === selected ? (i === question.correct ? "border-emerald-500 bg-emerald-500 text-white shadow-xl shadow-emerald-200" : "border-red-500 bg-red-500 text-white") : 
                      "border-gray-100 bg-gray-50 opacity-40"
                    )}
                  >
                    <span className={cn(
                      "text-xl mr-6 font-black opacity-20",
                      selected === i ? "opacity-40" : "group-hover:opacity-40"
                    )}>
                      {['A', 'B', 'C', 'D'][i]}
                    </span>
                    <span className="text-lg">{opt}</span>
                    {selected === i && selected === question.correct && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute right-8 text-white">
                        <CheckCircle2 size={32} />
                      </motion.div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 w-full h-full flex flex-col justify-center">
             <div className="bg-indigo-950 p-10 rounded-[3rem] border border-white/10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/80"></div>
                </div>
                <h3 className="text-white/40 font-black mb-8 text-[10px] uppercase tracking-[0.2em] px-2 relative z-10">Піраміда Виграшу</h3>
                <ul className="space-y-4 relative z-10">
                    {[...moneyScale].reverse().map((m, i) => {
                      const idx = moneyScale.length - 1 - i;
                      const isActive = idx === currentIdx;
                      const isDone = idx < currentIdx;
                      return (
                        <motion.li 
                          key={i} 
                          animate={isActive ? { scale: [1, 1.05, 1], x: [0, 10, 0] } : {}}
                          transition={{ repeat: Infinity, duration: 2 }}
                          className={cn(
                          "p-6 rounded-2xl font-black text-xl flex justify-between items-center transition-all",
                          isActive ? "bg-amber-400 text-indigo-950 shadow-[0_10px_30px_rgba(251,191,36,0.3)] ring-4 ring-amber-400/20" : isDone ? "text-emerald-400 opacity-80" : "text-white/20 border border-white/5"
                        )}>
                          <span className="text-xs opacity-40 font-mono tracking-tighter">0{idx + 1}</span>
                          <span className="tracking-tighter italic">{m} XP</span>
                        </motion.li>
                      );
                    })}
                </ul>
             </div>
        </div>
      </div>
    );
  };

  const ResultScreen = () => {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="relative inline-block mb-12">
          <motion.div 
            animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="w-48 h-48 bg-white rounded-[3rem] shadow-2xl flex items-center justify-center p-10 border border-emerald-100"
          >
            <div className="w-full h-full bg-emerald-500 rounded-[2.5rem] flex items-center justify-center text-white shadow-inner">
               <Trophy size={80} />
            </div>
          </motion.div>
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-4 -right-4 bg-amber-400 text-white rounded-2xl w-16 h-16 flex items-center justify-center font-black text-2xl border-4 border-white shadow-xl shadow-amber-200"
          >
             {level}
          </motion.div>
        </div>

        <h2 className="text-6xl font-black mb-4 tracking-tighter text-gray-900">Місія Виконана!</h2>
        <p className="text-gray-400 text-xl mb-16 font-medium max-w-sm mx-auto">Біосфера вдячна вам. Тепер ви володієте знаннями цілісної системи.</p>

        <div className="grid grid-cols-2 gap-8 mb-16">
          <div className="bg-white p-12 rounded-[2.5rem] shadow-sm border border-gray-100 group hover:shadow-md transition-shadow">
             <div className="text- emerald-500 font-black text-6xl mb-2 tracking-tighter">{xp}</div>
             <div className="text-[10px] font-black text-gray-300 uppercase tracking-widest group-hover:text-emerald-400 transition-colors">XP Зароблено</div>
          </div>
          <div className="bg-white p-12 rounded-[2.5rem] shadow-sm border border-gray-100 group hover:shadow-md transition-shadow">
             <div className="text-indigo-600 font-black text-6xl mb-2 tracking-tighter">LV.{level}</div>
             <div className="text-[10px] font-black text-gray-300 uppercase tracking-widest group-hover:text-indigo-400 transition-colors">Ранг Еколога</div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-6">
           <button 
             onClick={() => {
                setXp(0);
                setLevel(1);
                nextScreen('home');
             }}
             className="bg-gray-900 text-white px-12 py-5 rounded-2xl font-bold shadow-2xl flex items-center justify-center gap-3 hover:bg-black transition-all active:scale-95"
           >
             <RefreshCcw className="text-emerald-400" /> Розпочати Нову Группу Дослідження
           </button>
           <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Прогрес синхронізовано з локальним сховищем</p>
        </div>
      </div>
    );
  };

  // --- Layout Wrappers ---

  return (
    <div className="min-h-screen bg-[#F4F7F5] text-gray-800 font-sans selection:bg-emerald-100 selection:text-emerald-900 overflow-x-hidden">
      <header className="sticky top-0 z-50 bg-white border-b border-emerald-100 px-8 py-4 shadow-sm shrink-0">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <button 
            onClick={() => nextScreen('home')}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center text-white shadow-md shadow-emerald-200">
               <Globe size={24} />
            </div>
            <h1 className="text-xl font-bold text-emerald-800 tracking-tight uppercase">Біосфера <span className="text-emerald-400">Lab</span></h1>
          </button>
          
          <div className="flex items-center space-x-6">
            <div className="hidden sm:flex flex-col items-end">
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Твій прогрес</span>
                <span className="text-sm font-bold text-emerald-600">{Math.min(100, (xp % 100))}%</span>
              </div>
              <div className="w-48 h-2 bg-gray-100 rounded-full mt-1 overflow-hidden">
                 <motion.div 
                   className="h-full bg-emerald-500"
                   animate={{ width: `${(xp % 100)}%` }}
                 />
              </div>
            </div>
            <div className="h-10 w-[1px] bg-gray-200 mx-2 hidden sm:block"></div>
            <div className="bg-amber-50 px-3 py-1 rounded-full border border-amber-200 flex items-center space-x-1 shadow-sm">
               <span className="text-lg text-amber-500">⚡</span>
               <span className="font-bold text-amber-700">{xp} XP</span>
            </div>
            <div className="hidden lg:flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full border-2 border-emerald-500 p-0.5">
                <div className="w-full h-full bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-bold text-xs">АН</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto pb-24 pt-10 px-4">
        <AnimatePresence mode="wait">
          {screen === 'home' && (
            <motion.div 
              key="home"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="grid grid-cols-12 gap-8 min-h-[70vh] items-center"
            >
              <div className="col-span-12 lg:col-span-7 flex flex-col items-start text-left">
                <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6">Освітній Портал</span>
                <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
                  Досліджуй <br/> <span className="text-emerald-500">Біосферу</span> Землі
                </h1>
                <p className="text-lg text-gray-500 mb-10 max-w-lg leading-relaxed">
                  Поринь у світ інтерактивної біології. Вивчай межі життя, типи речовин за Вернадським та еволюцію ноосфери у реальному часі.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button 
                    onClick={() => nextScreen('theory')}
                    className="bg-emerald-600 text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition-all flex items-center gap-3 active:scale-95"
                  >
                    Розпочати навчання <ArrowRight />
                  </button>
                  <button 
                    onClick={() => nextScreen('layers')}
                    className="border-2 border-gray-200 bg-white text-gray-700 px-10 py-5 rounded-2xl font-bold text-lg hover:border-emerald-200 hover:bg-emerald-50 transition-all active:scale-95"
                  >
                    Демо-тест
                  </button>
                </div>
                
                <div className="mt-12 flex items-center space-x-6 text-gray-400">
                  <div className="flex flex-col items-start">
                    <span className="text-2xl font-bold text-gray-800">4</span>
                    <span className="text-[10px] uppercase font-bold tracking-widest">Модулі</span>
                  </div>
                  <div className="w-[1px] h-8 bg-gray-200"></div>
                  <div className="flex flex-col items-start">
                    <span className="text-2xl font-bold text-gray-800">12</span>
                    <span className="text-[10px] uppercase font-bold tracking-widest">Завдання</span>
                  </div>
                  <div className="w-[1px] h-8 bg-gray-200"></div>
                  <div className="flex flex-col items-start">
                    <span className="text-2xl font-bold text-gray-800">∞</span>
                    <span className="text-[10px] uppercase font-bold tracking-widest">Знань</span>
                  </div>
                </div>
              </div>

              <div className="col-span-12 lg:col-span-5 hidden lg:block">
                <div className="relative">
                  <motion.div 
                    animate={{ y: [0, -20, 0] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    className="w-full aspect-square bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-3xl shadow-xl border border-white flex items-center justify-center p-12 relative overflow-hidden"
                  >
                    <div className="absolute inset-0 opacity-20 pointer-events-none">
                      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-emerald-300 rounded-full blur-3xl"></div>
                      <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-blue-300 rounded-full blur-3xl"></div>
                    </div>
                    <Globe size={300} className="text-emerald-600/80 relative z-10" />
                  </motion.div>
                  
                  {/* Dashboard Widget Mockup */}
                  <div className="absolute -bottom-8 -left-8 bg-gradient-to-br from-indigo-900 to-emerald-900 rounded-3xl p-6 text-white w-64 shadow-2xl">
                    <div className="flex justify-between items-start">
                      <h4 className="text-[10px] font-bold uppercase tracking-widest opacity-60">Твій статус</h4>
                      <span className="text-lg">🏆</span>
                    </div>
                    <div className="mt-3">
                      <p className="text-lg font-bold italic">Lab Explorer</p>
                      <div className="mt-3 flex items-center space-x-2">
                        <div className="flex-1 h-1 bg-white/20 rounded-full">
                          <div className="w-1/3 h-full bg-amber-400"></div>
                        </div>
                        <span className="text-[8px] font-bold">LVL {level}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {screen === 'theory' && <TheoryScreen key="theory" />}

          {screen === 'layers' && <LayersScreen key="layers" />}
          {screen === 'classification' && <ClassificationScreen key="classification" />}
          {screen === 'quiz' && <QuizScreen key="quiz" />}
          {screen === 'millionaire' && <MillionaireGame key="millionaire" />}
          {screen === 'results' && <ResultScreen key="results" />}
        </AnimatePresence>
      </main>

      <footer className="h-12 bg-white border-t border-gray-100 px-8 flex items-center justify-between text-[10px] font-bold text-gray-400 shrink-0 uppercase tracking-widest fixed bottom-0 left-0 right-0 z-40">
        <div className="flex space-x-8">
          <span className="flex items-center"><span className="w-2 h-2 bg-emerald-500 rounded-full mr-2 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>Система активна</span>
          <span className="hidden sm:inline">Учнів онлайн: 1,402</span>
        </div>
        <div className="flex space-x-6">
          <button className="hover:text-emerald-600 transition-colors">Допомога</button>
          <button className="hover:text-emerald-600 transition-colors">Методичка</button>
        </div>
      </footer>
    </div>

  );
}
