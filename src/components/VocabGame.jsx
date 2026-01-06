import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, BookOpen, Shuffle, Trophy, Flame, Ear, PenTool, HelpCircle, X, Volume2, Home, Check, RefreshCcw, Keyboard } from 'lucide-react';
import CanvasPad from './CanvasPad';
import VocabCard from './VocabCard';
import { vocabCategories } from '../data/vocabSets'; // ถอยออกไป 1 ชั้นเพื่อหา data

// --- Helper Functions & Sub-components ---
const shuffleArray = (array) => {
       const newArr = [...array];
       for (let i = newArr.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
       }
       return newArr;
};

function HelpModal({ onClose }) {
       return (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
                     <div className="bg-white p-6 rounded-2xl max-w-md w-full shadow-2xl">
                            <div className="flex justify-between items-center mb-4"><h3 className="font-bold text-lg flex items-center gap-2"><Volume2 className="text-blue-600" size={20} /> วิธีตั้งค่าเสียง (iPad)</h3><button onClick={onClose}><X size={20} className="text-gray-400 hover:text-black" /></button></div>
                            <div className="space-y-3 text-sm text-gray-600"><p className="bg-yellow-50 p-3 rounded-lg border border-yellow-100 text-yellow-800">💡 หากเสียงฟังยาก ให้โหลดเสียงคุณภาพสูง:</p><p>1. ไปที่ <strong>Settings</strong> {'>'} <strong>Accessibility</strong></p><p>2. เลือก <strong>Spoken Content</strong> {'>'} <strong>Voices</strong></p><p>3. เลือก <strong>English</strong> และดาวน์โหลดเสียง <strong>Samantha</strong> หรือ <strong>Siri</strong></p></div>
                            <button onClick={onClose} className="mt-6 w-full bg-black text-white py-3 rounded-xl font-bold hover:bg-gray-800">เข้าใจแล้ว (OK)</button>
                     </div>
              </div>
       );
}

function Navbar({ categories, currentCatId, onCategoryChange, score, streak, mode, setMode, onHome, onShowHelp, inputMode, setInputMode }) {
       return (
              <nav className="flex-none flex justify-between items-center p-2 px-3 md:p-3 md:px-6 bg-white shadow-sm border-b z-20 relative h-16">
                     <div className="flex items-center gap-2 md:gap-3 flex-shrink-1 min-w-0">
                            <button onClick={onHome} className="p-2 bg-gray-100 rounded-xl text-gray-500 hover:bg-black hover:text-white transition-all active:scale-95 shadow-sm group" title="กลับสู่หน้าหลัก"><Home size={20} className="md:w-[22px] md:h-[22px] group-hover:scale-110 transition-transform" /></button>
                            <div className="flex flex-col min-w-0">
                                   <h1 className="text-lg md:text-xl font-bold text-gray-800 hidden sm:block leading-none ml-1 truncate">VocabPad</h1>
                                   <div className="flex items-center gap-1 mt-0 sm:mt-1 md:mt-0 ml-1">
                                          <BookOpen size={14} className="text-gray-400 flex-shrink-0" />
                                          <select value={currentCatId} onChange={(e) => onCategoryChange(e.target.value)} className="text-xs md:text-sm font-medium text-gray-600 bg-transparent border-none focus:ring-0 cursor-pointer hover:text-blue-600 outline-none p-0 w-24 md:w-auto truncate">
                                                 {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.title}</option>)}
                                          </select>
                                   </div>
                            </div>
                     </div>
                     <div className="hidden xs:flex items-center gap-2 md:gap-4 bg-gray-100 px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-gray-200 shadow-inner">
                            <div className="flex items-center gap-1 text-yellow-600 font-bold text-sm md:text-base"><Trophy size={16} className="md:w-[18px]" /><span>{score}</span></div>
                            <div className={`flex items-center gap-1 font-bold text-sm md:text-base transition-all duration-500 ${streak >= 5 ? 'text-orange-500 animate-pulse scale-110' : 'text-gray-400'}`}><Flame size={16} className="md:w-[18px]" fill={streak >= 5 ? "currentColor" : "none"} /><span>{streak}</span></div>
                     </div>
                     <div className="flex items-center gap-1.5 md:gap-2">
                            <button onClick={() => setInputMode(inputMode === 'handwriting' ? 'keyboard' : 'handwriting')} className={`p-2 rounded-md transition border flex items-center justify-center w-9 h-9 md:w-10 md:h-10 ${inputMode === 'keyboard' ? 'bg-black text-white border-black' : 'bg-white text-gray-600 border-gray-200'}`} title="สลับโหมด">{inputMode === 'handwriting' ? <PenTool size={18} className="md:w-5 md:h-5" /> : <Keyboard size={18} className="md:w-5 md:h-5" />}</button>
                            <button onClick={onShowHelp} className="p-2 rounded-md text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition w-9 h-9 md:w-10 md:h-10 flex items-center justify-center" title="วิธีตั้งค่าเสียง"><HelpCircle size={20} /></button>
                            <div className="flex bg-gray-100 p-1 rounded-lg border border-gray-200 ml-1 md:ml-2">
                                   <button onClick={() => setMode('flashcard')} className={`p-1.5 md:p-2 rounded-md transition-all ${mode === 'flashcard' ? 'bg-white shadow text-blue-600' : 'text-gray-400 hover:text-gray-600'}`} title="Flashcard"><BookOpen size={18} /></button>
                                   <button onClick={() => setMode('spelling')} className={`p-1.5 md:p-2 rounded-md transition-all ${mode === 'spelling' ? 'bg-white shadow text-purple-600' : 'text-gray-400 hover:text-gray-600'}`} title="Spelling"><Ear size={18} /></button>
                            </div>
                     </div>
              </nav>
       );
}

// --- Main Component ---
export default function VocabGame({ onBackToLanding }) {
       const [currentCatId, setCurrentCatId] = useState(() => localStorage.getItem('vocab_cat') || vocabCategories[0].id);
       const [currentIndex, setCurrentIndex] = useState(() => parseInt(localStorage.getItem('vocab_idx') || '0'));
       const [isShuffled, setIsShuffled] = useState(false);
       const [shuffledList, setShuffledList] = useState([]);
       const [score, setScore] = useState(() => parseInt(localStorage.getItem('vocab_score') || '0'));
       const [streak, setStreak] = useState(0);
       const [mode, setMode] = useState('flashcard');
       const [showHelp, setShowHelp] = useState(false);
       const [inputMode, setInputMode] = useState('handwriting');
       const [userAnswer, setUserAnswer] = useState('');
       const [checkStatus, setCheckStatus] = useState('idle');

       const currentCategory = vocabCategories.find(c => c.id === currentCatId) || vocabCategories[0];
       const originalList = currentCategory ? currentCategory.words : [];
       const displayList = isShuffled ? shuffledList : originalList;
       const currentWordData = displayList[currentIndex];

       useEffect(() => { if (isShuffled && shuffledList.length === 0 && originalList.length > 0) setShuffledList(shuffleArray(originalList)); }, [currentCatId, isShuffled, originalList]);
       useEffect(() => { localStorage.setItem('vocab_cat', currentCatId); localStorage.setItem('vocab_idx', currentIndex); localStorage.setItem('vocab_score', score); }, [currentCatId, currentIndex, score]);
       useEffect(() => { setUserAnswer(''); setCheckStatus('idle'); }, [currentIndex, currentCatId, mode]);

       const handleCategoryChange = (newId) => { setCurrentCatId(newId); setCurrentIndex(0); setShuffledList(isShuffled ? shuffleArray(vocabCategories.find(c => c.id === newId).words) : []); };
       const toggleShuffle = () => { setIsShuffled(!isShuffled); setCurrentIndex(0); setShuffledList(!isShuffled ? shuffleArray(originalList) : []); };
       const handleNext = useCallback(() => { if (displayList.length === 0) return; setCurrentIndex((prev) => (prev + 1) % displayList.length); }, [displayList.length]);
       const handlePrev = () => { if (displayList.length === 0) return; setCurrentIndex((prev) => (prev - 1 + displayList.length) % displayList.length); };

       const playSound = (type) => {
              const AudioContext = window.AudioContext || window.webkitAudioContext;
              if (!AudioContext) return; const ctx = new AudioContext(); const osc = ctx.createOscillator(); const gain = ctx.createGain(); osc.connect(gain); gain.connect(ctx.destination);
              if (type === 'correct') { osc.type = 'sine'; osc.frequency.setValueAtTime(800, ctx.currentTime); osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.1); gain.gain.setValueAtTime(0.3, ctx.currentTime); gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5); } else { osc.type = 'sawtooth'; osc.frequency.setValueAtTime(150, ctx.currentTime); osc.frequency.linearRampToValueAtTime(100, ctx.currentTime + 0.3); gain.gain.setValueAtTime(0.3, ctx.currentTime); gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.3); } osc.start(); osc.stop(ctx.currentTime + 0.5);
       };

       const speak = () => { if (!currentWordData) return; window.speechSynthesis.cancel(); const utterance = new SpeechSynthesisUtterance(currentWordData.word); const voices = window.speechSynthesis.getVoices(); const preferredVoice = voices.find(voice => (voice.name.includes('Google') && voice.lang.includes('en-US')) || (voice.name.includes('Samantha') && voice.lang.includes('en')) || voice.lang === 'en-US'); if (preferredVoice) utterance.voice = preferredVoice; utterance.rate = 0.7; window.speechSynthesis.speak(utterance); };
       const handleCheck = () => { if (!userAnswer.trim()) return; let isCorrect = false; const input = userAnswer.trim().toLowerCase(); if (mode === 'flashcard') { const answer = currentWordData.definition.toLowerCase(); isCorrect = answer.includes(input) || input.includes(answer); } else { isCorrect = input === currentWordData.word.toLowerCase(); } if (isCorrect) { setCheckStatus('correct'); playSound('correct'); setScore(s => s + 10); setStreak(s => s + 1); setTimeout(() => { handleNext(); }, 1500); } else { setCheckStatus('incorrect'); playSound('wrong'); setStreak(0); } };

       return (
              <div className="h-[100dvh] w-screen bg-gray-50 flex flex-col overflow-hidden fixed inset-0 font-sans">
                     <Navbar categories={vocabCategories} currentCatId={currentCatId} onCategoryChange={handleCategoryChange} score={score} streak={streak} mode={mode} setMode={setMode} onHome={onBackToLanding} onShowHelp={() => setShowHelp(true)} inputMode={inputMode} setInputMode={setInputMode} />
                     {showHelp && <HelpModal onClose={() => setShowHelp(false)} />}

                     <div className="flex-1 flex flex-col md:flex-row gap-3 md:gap-4 p-3 md:p-4 min-h-0 overflow-hidden">
                            <section className="flex-shrink-0 flex flex-col gap-2 md:gap-3 h-[40%] md:h-full md:w-[45%] min-h-0">
                                   <div className="flex justify-between items-center px-1">
                                          <button onClick={handlePrev} className="p-2 bg-white rounded-full shadow-sm text-gray-500 hover:text-blue-600 active:scale-90"><ChevronLeft size={20} className="md:w-6 md:h-6" /></button>
                                          <div className="flex items-center gap-2">
                                                 <span className="text-[10px] md:text-xs font-bold text-gray-400 bg-gray-200/50 px-3 py-1 rounded-full">{currentIndex + 1} / {displayList.length}</span>
                                                 <button onClick={toggleShuffle} className={`p-1 md:p-1.5 rounded-full transition-all border ${isShuffled ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-400 border-gray-200'}`}><Shuffle size={14} className="md:w-4 md:h-4" /></button>
                                          </div>
                                          <button onClick={handleNext} className="p-2 bg-white rounded-full shadow-sm text-gray-500 hover:text-blue-600 active:scale-90"><ChevronRight size={20} className="md:w-6 md:h-6" /></button>
                                   </div>
                                   <div className="flex-1 min-h-0 relative perspective-1000">
                                          {currentWordData ? (<VocabCard {...currentWordData} mode={mode} checkStatus={checkStatus} onSpeak={speak} />) : <div className="text-center text-gray-400 mt-10">No data.</div>}
                                          {streak >= 5 && checkStatus === 'correct' && (<div className="absolute inset-0 pointer-events-none flex items-center justify-center z-50"><div className="text-8xl md:text-9xl animate-ping opacity-50">🔥</div></div>)}
                                   </div>
                            </section>

                            <section className="flex-1 h-full min-h-0 bg-white rounded-2xl md:rounded-3xl shadow-sm border border-gray-200 overflow-hidden relative flex flex-col transition-all duration-300">
                                   {inputMode === 'handwriting' && (
                                          <>
                                                 <div className="flex-1 relative bg-white animate-in fade-in"><CanvasPad autoClearTrigger={currentWordData ? currentWordData.word : ''} /></div>
                                                 <div className="flex-none p-3 md:p-4 bg-gray-50 border-t border-gray-200 z-10">
                                                        <div className="flex flex-col gap-2">
                                                               <label className="text-[10px] md:text-xs font-bold text-gray-400 uppercase flex items-center gap-2 ml-1"><PenTool size={12} /> Handwriting</label>
                                                               <div className="flex gap-2">
                                                                      <input type="text" value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && checkStatus === 'idle' && handleCheck()} disabled={checkStatus === 'correct'} placeholder={mode === 'spelling' ? "Type here..." : "พิมพ์คำแปล..."} className={`flex-1 bg-white border-2 rounded-xl px-3 py-2 md:px-4 md:py-3 text-lg md:text-xl outline-none focus:ring-4 transition-all ${checkStatus === 'correct' ? 'border-green-500 text-green-700 bg-green-50' : checkStatus === 'incorrect' ? 'border-red-400 focus:ring-red-200' : 'border-gray-200 focus:border-black focus:ring-gray-100'}`} autoComplete="off" />
                                                                      {checkStatus === 'idle' || checkStatus === 'incorrect' ? (<button onClick={handleCheck} className={`px-4 md:px-6 rounded-xl font-bold text-lg text-white shadow-lg active:scale-95 transition-all flex items-center justify-center ${mode === 'spelling' ? 'bg-purple-600 hover:bg-purple-700' : 'bg-black hover:bg-gray-800'}`}><Check size={24} className="md:w-[28px]" strokeWidth={3} /></button>) : (<button onClick={() => { setUserAnswer(''); setCheckStatus('idle'); }} className="px-4 md:px-6 rounded-xl font-bold text-lg bg-gray-200 text-gray-600 hover:bg-gray-300 transition-all flex items-center justify-center"><RefreshCcw size={24} className="md:w-[28px]" /></button>)}
                                                               </div>
                                                        </div>
                                                 </div>
                                          </>
                                   )}
                                   {inputMode === 'keyboard' && (
                                          <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 bg-gray-50 animate-in zoom-in-95 duration-300">
                                                 <div className="w-full max-w-xl flex flex-col gap-3 md:gap-4 h-full md:h-auto justify-center">
                                                        <label className="text-xs font-bold text-gray-400 uppercase flex items-center gap-2"><Keyboard size={16} /> Focus Mode</label>
                                                        <textarea value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && checkStatus === 'idle' && handleCheck()} disabled={checkStatus === 'correct'} placeholder={mode === 'spelling' ? "Type answer..." : "พิมพ์คำแปล..."} className={`w-full flex-1 md:h-48 bg-white border-4 rounded-3xl p-4 md:p-6 text-2xl md:text-3xl font-medium outline-none shadow-sm resize-none transition-all ${checkStatus === 'correct' ? 'border-green-500 text-green-700 bg-green-50' : checkStatus === 'incorrect' ? 'border-red-400 focus:ring-red-200 focus:border-red-400' : 'border-gray-200 focus:border-black focus:shadow-xl'}`} autoFocus />
                                                        {checkStatus === 'idle' || checkStatus === 'incorrect' ? (<button onClick={handleCheck} className={`w-full py-4 md:py-5 rounded-2xl font-bold text-xl md:text-2xl text-white shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 ${mode === 'spelling' ? 'bg-purple-600 hover:bg-purple-700' : 'bg-black hover:bg-gray-800'}`}>Check <Check size={24} className="md:w-[32px]" strokeWidth={3} /></button>) : (<button onClick={() => { setUserAnswer(''); setCheckStatus('idle'); }} className="w-full py-4 md:py-5 rounded-2xl font-bold text-xl md:text-2xl bg-gray-200 text-gray-600 hover:bg-gray-300 transition-all flex items-center justify-center gap-3"><RefreshCcw size={24} className="md:w-[32px]" /> Next</button>)}
                                                 </div>
                                          </div>
                                   )}
                            </section>
                     </div>
              </div>
       );
}