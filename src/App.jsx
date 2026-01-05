import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, BookOpen, Shuffle, Trophy, Flame, Ear, PenTool, CheckCircle, Play } from 'lucide-react';
import CanvasPad from './components/CanvasPad';
import VocabCard from './components/VocabCard';
import { vocabCategories } from './data/vocabSets';

// --- Helper: Shuffle ---
const shuffleArray = (array) => {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

// ==========================================
// 1. LANDING PAGE COMPONENT (หน้าแรก)
// ==========================================
function LandingPage({ onStart }) {
  return (
    <div className="min-h-[100dvh] w-full flex flex-col items-center justify-center relative overflow-hidden text-gray-800 font-sans p-6"
      style={{
        backgroundColor: '#fdfbf7',
        backgroundImage: `
                linear-gradient(#e5e7eb 1px, transparent 1px),
                linear-gradient(90deg, #e5e7eb 1px, transparent 1px)
            `,
        backgroundSize: '24px 24px'
      }}
    >
      {/* Decorative Circle */}
      <div className="absolute top-[-10%] right-[-5%] w-64 h-64 bg-yellow-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-80 h-80 bg-blue-200 rounded-full blur-3xl opacity-30 animate-pulse delay-1000"></div>

      <div className="max-w-2xl w-full bg-white/80 backdrop-blur-sm p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100 flex flex-col items-center text-center animate-in zoom-in duration-500">

        {/* Logo */}
        <div className="mb-6 flex items-center justify-center">
          <span className="text-4xl font-black text-blue-600">Vocab</span>
          <span className="text-4xl font-black text-purple-600">Pad</span>
          <span className="text-4xl"></span>
        </div>

        <h1 className="text-5xl md:text-6xl font-black mb-4 tracking-tight text-gray-900">
          Vocab<span className="text-blue-600">Pad</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-600 mb-8 font-medium leading-relaxed">
          เปลี่ยน iPad ให้เป็นสมุดฝึกศัพท์อัจฉริยะ <br />
          <span className="text-gray-400 text-base font-normal">ฟังเสียง • เขียนตอบ • สะสมคะแนน</span>
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mb-8 text-left">
          <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
            <BookOpen className="text-blue-500 mb-2" size={24} />
            <h3 className="font-bold text-gray-800 text-sm">คลังศัพท์คุณภาพ</h3>
            <p className="text-xs text-gray-500 mt-1">รวมศัพท์สอบ TCAS และศัพท์ใช้บ่อยกว่า 1,000 คำ</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-xl border border-purple-100">
            <Ear className="text-purple-500 mb-2" size={24} />
            <h3 className="font-bold text-gray-800 text-sm">Spelling Mode</h3>
            <p className="text-xs text-gray-500 mt-1">ปิดศัพท์ ฟังเสียง แล้วเขียนตอบเพื่อทดสอบหู</p>
          </div>
          <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
            <PenTool className="text-orange-500 mb-2" size={24} />
            <h3 className="font-bold text-gray-800 text-sm">Handwriting</h3>
            <p className="text-xs text-gray-500 mt-1">พื้นที่เขียนทดอิสระ รองรับ Apple Pencil</p>
          </div>
        </div>

        {/* iPad Badge */}
        <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-xs font-bold text-gray-500 mb-8 border border-gray-200">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          Optimized for iPad & Tablet Usage
        </div>

        {/* Start Button */}
        <button
          onClick={onStart}
          className="group relative w-full md:w-auto px-10 py-4 bg-black text-white rounded-2xl font-bold text-xl shadow-lg hover:shadow-2xl hover:bg-gray-900 transition-all active:scale-95 flex items-center justify-center gap-3"
        >
          Start Learning
          <ChevronRight className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <p className="absolute bottom-6 text-xs text-gray-400 font-mono">VocabPad v1.0 • Built for Education</p>
    </div>
  );
}


// ==========================================
// 2. MAIN APP COMPONENTS (Navbar, Game)
// ==========================================
function Navbar({ categories, currentCatId, onCategoryChange, score, streak, mode, setMode, onHome }) {
  return (
    <nav className="flex-none flex justify-between items-center p-3 px-4 md:px-6 bg-white shadow-sm border-b z-20 relative">
      <div className="flex items-center gap-3">
        <button onClick={onHome} className="text-2xl hover:scale-110 transition active:scale-95" title="Back to Home"></button>
        <div className="flex flex-col">
          <h1 className="text-xl font-bold text-gray-800 hidden md:block leading-none">VocabPad</h1>
          <div className="flex items-center gap-1 mt-1 md:mt-0">
            <BookOpen size={14} className="text-gray-400" />
            <select
              value={currentCatId}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="text-sm font-medium text-gray-600 bg-transparent border-none focus:ring-0 cursor-pointer hover:text-blue-600 outline-none p-0 max-w-[150px]"
            >
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.title}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 bg-gray-100 px-4 py-2 rounded-full border border-gray-200 shadow-inner">
        <div className="flex items-center gap-1.5 text-yellow-600 font-bold">
          <Trophy size={18} />
          <span>{score}</span>
        </div>
        <div className={`flex items-center gap-1.5 font-bold transition-all duration-500 ${streak >= 5 ? 'text-orange-500 animate-pulse scale-110' : 'text-gray-400'}`}>
          <Flame size={18} fill={streak >= 5 ? "currentColor" : "none"} />
          <span>{streak}</span>
        </div>
      </div>

      <div className="flex bg-gray-100 p-1 rounded-lg border border-gray-200">
        <button onClick={() => setMode('flashcard')} className={`p-2 rounded-md transition-all ${mode === 'flashcard' ? 'bg-white shadow text-blue-600' : 'text-gray-400 hover:text-gray-600'}`} title="Flashcard Mode"><BookOpen size={18} /></button>
        <button onClick={() => setMode('spelling')} className={`p-2 rounded-md transition-all ${mode === 'spelling' ? 'bg-white shadow text-purple-600' : 'text-gray-400 hover:text-gray-600'}`} title="Spelling Mode"><Ear size={18} /></button>
      </div>
    </nav>
  );
}

function VocabApp({ onBackToLanding }) {
  // Load State
  const [currentCatId, setCurrentCatId] = useState(() => localStorage.getItem('vocab_cat') || vocabCategories[0].id);
  const [currentIndex, setCurrentIndex] = useState(() => parseInt(localStorage.getItem('vocab_idx') || '0'));
  const [isShuffled, setIsShuffled] = useState(false);
  const [shuffledList, setShuffledList] = useState([]);

  // Game State
  const [score, setScore] = useState(() => parseInt(localStorage.getItem('vocab_score') || '0'));
  const [streak, setStreak] = useState(0);
  const [mode, setMode] = useState('flashcard');

  const currentCategory = vocabCategories.find(c => c.id === currentCatId) || vocabCategories[0];
  const originalList = currentCategory.words;
  const displayList = isShuffled ? shuffledList : originalList;
  const currentWordData = displayList[currentIndex];

  useEffect(() => {
    if (isShuffled && shuffledList.length === 0) setShuffledList(shuffleArray(originalList));
  }, [currentCatId, isShuffled]);

  useEffect(() => {
    localStorage.setItem('vocab_cat', currentCatId);
    localStorage.setItem('vocab_idx', currentIndex);
    localStorage.setItem('vocab_score', score);
  }, [currentCatId, currentIndex, score]);

  const handleCategoryChange = (newId) => {
    setCurrentCatId(newId);
    setCurrentIndex(0);
    setShuffledList(isShuffled ? shuffleArray(vocabCategories.find(c => c.id === newId).words) : []);
  };

  const toggleShuffle = () => {
    setIsShuffled(!isShuffled);
    setCurrentIndex(0);
    setShuffledList(!isShuffled ? shuffleArray(originalList) : []);
  };

  const handleNext = () => {
    if (displayList.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % displayList.length);
  };

  const handlePrev = () => {
    if (displayList.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + displayList.length) % displayList.length);
  };

  return (
    <div className="h-[100dvh] w-screen bg-gray-50 flex flex-col overflow-hidden fixed inset-0 font-sans">
      <Navbar
        categories={vocabCategories}
        currentCatId={currentCatId}
        onCategoryChange={handleCategoryChange}
        score={score}
        streak={streak}
        mode={mode}
        setMode={setMode}
        onHome={onBackToLanding} // เพิ่มปุ่มกลับหน้าแรก
      />

      <div className="flex-1 flex flex-col md:flex-row gap-4 p-4 min-h-0 overflow-hidden">
        <section className="h-[55%] md:h-full md:w-[40%] flex-shrink-0 min-h-0 flex flex-col gap-3">
          <div className="flex justify-between items-center px-2">
            <button onClick={handlePrev} className="p-2 bg-white rounded-full shadow-sm text-gray-500 hover:text-blue-600 active:scale-90"><ChevronLeft /></button>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-gray-400 bg-gray-200/50 px-3 py-1 rounded-full">{currentIndex + 1} / {displayList.length}</span>
              <button onClick={toggleShuffle} className={`p-1.5 rounded-full transition-all border ${isShuffled ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-400 border-gray-200'}`}><Shuffle size={14} /></button>
            </div>
            <button onClick={handleNext} className="p-2 bg-white rounded-full shadow-sm text-gray-500 hover:text-blue-600 active:scale-90"><ChevronRight /></button>
          </div>

          <div className="flex-1 min-h-0 relative perspective-1000">
            {currentWordData ? (
              <VocabCard
                key={currentWordData.word + mode}
                {...currentWordData}
                mode={mode}
                streak={streak}
                onCorrect={() => {
                  setScore(s => s + 10);
                  setStreak(s => s + 1);
                }}
                onIncorrect={() => setStreak(0)}
              />
            ) : <div className="text-center text-gray-400 mt-10">Loading...</div>}
          </div>
        </section>

        <section className="flex-1 h-full min-h-0 bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden relative">
          <CanvasPad autoClearTrigger={currentWordData ? currentWordData.word : ''} />
        </section>
      </div>
    </div>
  );
}

// ==========================================
// 3. ROOT APP COMPONENT
// ==========================================
function App() {
  const [hasStarted, setHasStarted] = useState(false);

  // iPad Scroll Lock (ย้ายมาไว้ที่ Root เพื่อให้ครอบคลุมทั้งแอป)
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.height = '100%';
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
    };
  }, []);

  return (
    <>
      {hasStarted ? (
        <VocabApp onBackToLanding={() => setHasStarted(false)} />
      ) : (
        <LandingPage onStart={() => setHasStarted(true)} />
      )}
    </>
  );
}

export default App;