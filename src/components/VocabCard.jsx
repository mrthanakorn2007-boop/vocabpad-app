import React, { useState, useEffect } from 'react';
import { Volume2, Eye, EyeOff, CheckCircle, XCircle, RefreshCcw, HelpCircle, Ear } from 'lucide-react';

export default function VocabCard({ word, ipa, definition, example, mode, streak, onCorrect, onIncorrect }) {
       const [showSpoiler, setShowSpoiler] = useState(false);
       const [userAnswer, setUserAnswer] = useState('');
       const [checkStatus, setCheckStatus] = useState('idle'); // 'idle' | 'correct' | 'incorrect'

       // ตั้งค่าเริ่มต้นตามโหมด
       useEffect(() => {
              setUserAnswer('');
              setCheckStatus('idle');
              // โหมด Spelling: เปิดเฉลยไว้เลย (แต่จะ Mask คำศัพท์ในประโยคตัวอย่าง)
              // โหมด Flashcard: ปิดเฉลยไว้
              setShowSpoiler(mode === 'spelling');
       }, [word, mode]);

       // 🔊 ระบบเสียง Effect (Web Audio API)
       const playSound = (type) => {
              const AudioContext = window.AudioContext || window.webkitAudioContext;
              if (!AudioContext) return;
              const ctx = new AudioContext();
              const osc = ctx.createOscillator();
              const gain = ctx.createGain();
              osc.connect(gain);
              gain.connect(ctx.destination);

              if (type === 'correct') {
                     osc.type = 'sine';
                     osc.frequency.setValueAtTime(800, ctx.currentTime);
                     osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.1);
                     gain.gain.setValueAtTime(0.3, ctx.currentTime);
                     gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
                     osc.start();
                     osc.stop(ctx.currentTime + 0.5);
              } else {
                     osc.type = 'sawtooth';
                     osc.frequency.setValueAtTime(150, ctx.currentTime);
                     osc.frequency.linearRampToValueAtTime(100, ctx.currentTime + 0.3);
                     gain.gain.setValueAtTime(0.3, ctx.currentTime);
                     gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.3);
                     osc.start();
                     osc.stop(ctx.currentTime + 0.3);
              }
       };

       const speak = () => {
              window.speechSynthesis.cancel();
              const utterance = new SpeechSynthesisUtterance(word);
              utterance.lang = 'en-US';
              utterance.rate = 0.8;
              window.speechSynthesis.speak(utterance);
       };

       // 🟢 ตรวจคำตอบ
       const handleCheck = () => {
              if (!userAnswer.trim()) return;

              let isCorrect = false;
              const input = userAnswer.trim().toLowerCase();

              if (mode === 'flashcard') {
                     const answer = definition.toLowerCase();
                     isCorrect = answer.includes(input) || input.includes(answer);
              } else {
                     isCorrect = input === word.toLowerCase();
              }

              if (isCorrect) {
                     setCheckStatus('correct');
                     playSound('correct');
                     onCorrect();
                     setShowSpoiler(true); // เปิดเฉลยหมด
              } else {
                     setCheckStatus('incorrect');
                     playSound('wrong');
                     onIncorrect();
              }
       };

       const handleKeyDown = (e) => {
              if (e.key === 'Enter' && checkStatus === 'idle') handleCheck();
       };

       // 🛠️ ฟังก์ชันเซ็นเซอร์คำศัพท์ในประโยคตัวอย่าง (Masking)
       const getMaskedExample = (text) => {
              // ถ้าไม่ได้อยู่ในโหมด Spelling หรือตอบถูกแล้ว ให้โชว์เต็มๆ
              if (mode !== 'spelling' || checkStatus === 'correct') return text;

              // ถ้าอยู่ในโหมด Spelling และยังตอบไม่ถูก ให้แทนที่คำศัพท์ด้วย ______
              // ใช้ RegExp แบบ 'gi' (Global, Case-insensitive) เพื่อจับคำไม่ว่าจะตัวเล็กหรือใหญ่
              const regex = new RegExp(word, 'gi');
              return text.replace(regex, '_______');
       };

       return (
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 flex flex-col h-full relative overflow-hidden">

                     {/* 1. Area แสดงโจทย์ */}
                     <div className="flex-1 overflow-y-auto p-4 pb-2 overscroll-contain flex flex-col items-center">

                            {/* Streak Fire Overlay */}
                            {streak >= 5 && checkStatus === 'correct' && (
                                   <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-50">
                                          <div className="text-9xl animate-ping opacity-50">🔥</div>
                                   </div>
                            )}

                            {/* 🅰️ Flashcard Mode */}
                            {mode === 'flashcard' && (
                                   <div className="text-center mt-6 mb-4">
                                          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 tracking-tight">{word}</h2>
                                          <div className="flex items-center justify-center gap-2 mt-2">
                                                 <span className="text-gray-400 font-mono text-lg">/{ipa}/</span>
                                                 <button onClick={speak} className="p-2 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition"><Volume2 size={20} /></button>
                                          </div>
                                   </div>
                            )}

                            {/* 🅱️ Spelling Mode */}
                            {mode === 'spelling' && (
                                   <div className="text-center mt-6 mb-4 w-full">
                                          {checkStatus === 'correct' ? (
                                                 <h2 className="text-4xl font-bold text-green-600 animate-in zoom-in">{word}</h2>
                                          ) : (
                                                 <div className="flex flex-col items-center gap-3">
                                                        <div className="flex gap-2 text-4xl font-bold text-gray-300 tracking-widest select-none">
                                                               {/* สร้างขีดตามจำนวนตัวอักษร */}
                                                               {word.split('').map((_, i) => <span key={i} className="border-b-4 border-gray-200 w-8 h-12 block"></span>)}
                                                        </div>
                                                        <button onClick={speak} className="mt-2 px-6 py-3 bg-purple-100 text-purple-600 rounded-full hover:bg-purple-200 transition flex items-center gap-2 font-bold shadow-sm active:scale-95">
                                                               <Ear size={24} /> กดเพื่อฟังเสียง
                                                        </button>
                                                 </div>
                                          )}
                                   </div>
                            )}

                            {/* Status Box */}
                            {checkStatus !== 'idle' && (
                                   <div className={`w-full max-w-md p-3 rounded-xl flex items-center gap-3 mb-4 animate-in slide-in-from-bottom-2
                ${checkStatus === 'correct' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}
            `}>
                                          {checkStatus === 'correct' ? <CheckCircle size={24} /> : <XCircle size={24} />}
                                          <div>
                                                 <p className="font-bold">{checkStatus === 'correct' ? `เยี่ยมมาก! (+10 คะแนน)` : 'ยังไม่ถูก ลองใหม่นะ'}</p>
                                          </div>
                                   </div>
                            )}

                            {/* เฉลย / คำใบ้ (Spoiler Box) */}
                            <div
                                   className={`w-full max-w-md p-5 bg-gray-50 rounded-2xl relative transition-all duration-300 border 
           ${showSpoiler ? 'bg-white shadow-sm border-gray-200' : 'hover:bg-gray-100 border-transparent cursor-pointer'}`}
                                   onClick={() => !showSpoiler && setShowSpoiler(true)}
                            >
                                   <div className="flex justify-between items-center mb-2">
                                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                                                 {mode === 'spelling' ? 'คำแปล / คำใบ้' : 'เฉลยความหมาย'}
                                          </span>
                                          {showSpoiler ? <EyeOff size={16} className="text-gray-400" /> : <Eye size={16} className="text-gray-400" />}
                                   </div>

                                   <div className={`transition-all duration-300 ${showSpoiler ? 'opacity-100 blur-0' : 'opacity-0 blur-md select-none'}`}>
                                          <p className="text-gray-800 font-medium text-lg leading-relaxed font-sans">{definition}</p>

                                          {/* 👇 ส่วนที่แก้ไข: ใช้ฟังก์ชัน getMaskedExample แทน example ตรงๆ */}
                                          {example && (
                                                 <div className="mt-2 pt-2 border-t border-gray-100">
                                                        <p className="text-gray-500 italic text-sm font-serif">
                                                               " {getMaskedExample(example)} "
                                                        </p>
                                                 </div>
                                          )}
                                   </div>

                                   {!showSpoiler && (
                                          <div className="absolute inset-0 flex items-center justify-center">
                                                 <span className="text-gray-400 text-sm bg-white/80 px-3 py-1 rounded-full backdrop-blur-sm">แตะเพื่อดู</span>
                                          </div>
                                   )}
                            </div>
                     </div>

                     {/* 2. Input Zone */}
                     <div className="flex-none p-4 pt-3 border-t border-gray-100 bg-white z-10 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                            <label className="text-xs font-bold text-gray-400 uppercase mb-2 flex items-center gap-2">
                                   {mode === 'spelling' ? <><Ear size={14} /> พิมพ์คำศัพท์ภาษาอังกฤษที่ได้ยิน</> : <><HelpCircle size={14} /> พิมพ์ความหมายไทย</>}
                            </label>

                            <div className="flex flex-col gap-3">
                                   <input
                                          type="text"
                                          value={userAnswer}
                                          onChange={(e) => setUserAnswer(e.target.value)}
                                          onKeyDown={handleKeyDown}
                                          disabled={checkStatus === 'correct'}
                                          onFocus={(e) => setTimeout(() => e.target.scrollIntoView({ behavior: 'smooth', block: 'center' }), 300)}
                                          onBlur={() => { window.scrollTo(0, 0); }}
                                          placeholder={mode === 'spelling' ? "Type english word..." : "พิมพ์คำแปล..."}
                                          className={`w-full bg-gray-50 border rounded-xl px-4 py-3 text-lg outline-none focus:ring-2 transition
                    ${checkStatus === 'correct' ? 'border-green-400 bg-green-50 text-green-700' :
                                                        checkStatus === 'incorrect' ? 'border-red-400 focus:ring-red-400' : 'border-gray-200 focus:ring-blue-500'}
                `}
                                          autoComplete="off"
                                          autoCorrect="off"
                                          spellCheck="false"
                                   />

                                   {checkStatus === 'idle' || checkStatus === 'incorrect' ? (
                                          <button
                                                 onClick={handleCheck}
                                                 className={`w-full py-3 rounded-xl font-bold text-lg text-white transition shadow-md active:scale-95 flex items-center justify-center gap-2
                        ${mode === 'spelling' ? 'bg-purple-600 hover:bg-purple-700' : 'bg-black hover:bg-gray-800'}
                    `}
                                          >
                                                 Check Answer
                                          </button>
                                   ) : (
                                          <button
                                                 onClick={() => { setUserAnswer(''); setCheckStatus('idle'); setShowSpoiler(mode === 'spelling'); }}
                                                 className="w-full py-3 rounded-xl font-bold text-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition flex items-center justify-center gap-2"
                                          >
                                                 <RefreshCcw size={20} /> ลองใหม่ / Reset
                                          </button>
                                   )}
                            </div>
                     </div>
              </div>
       );
}