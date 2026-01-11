import React, { useState, useEffect } from 'react';
import { Volume2, Eye, EyeOff, CheckCircle, XCircle } from 'lucide-react';

export default function VocabCard({
       word, ipa, definition, example, example_th,
       mode, checkStatus, onSpeak,
       isMastered = false, onToggleMastered
}) {
       const [showSpoiler, setShowSpoiler] = useState(false);

       useEffect(() => {
              setShowSpoiler(mode === 'spelling' || checkStatus === 'correct');
       }, [word, mode, checkStatus]);

       const getMaskedExample = (text) => {
              if (mode !== 'spelling' || checkStatus === 'correct') return text;
              const regex = new RegExp(word, 'gi');
              return text.replace(regex, '_______');
       };

       return (
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 flex flex-col h-full relative overflow-hidden transition-all duration-300">

                     {/* Mastered Button - Top Right Corner */}
                     {onToggleMastered && (
                            <button
                                   onClick={onToggleMastered}
                                   className={`absolute top-3 right-3 z-10 p-2 rounded-full transition-all shadow-sm active:scale-90 ${isMastered
                                                 ? 'bg-green-500 text-white hover:bg-green-600'
                                                 : 'bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-green-500'
                                          }`}
                                   title={isMastered ? "Mastered! Click to unmark" : "Mark as Mastered"}
                            >
                                   <CheckCircle size={18} className="md:w-5 md:h-5" fill={isMastered ? "currentColor" : "none"} />
                            </button>
                     )}

                     {/* Auto Layout: Flex Column + Center Content */}
                     <div className="flex-1 overflow-y-auto p-4 flex flex-col items-center justify-center text-center no-scrollbar">

                            {/* Flashcard Header */}
                            {mode === 'flashcard' && (
                                   <div className="mb-4 md:mb-6 animate-in zoom-in duration-300 w-full">
                                          {/* 📌 Responsive Text: text-4xl บนมือถือ -> text-6xl บน iPad */}
                                          <h2 className="font-bold text-gray-800 tracking-tight text-4xl sm:text-5xl md:text-6xl break-words">{word}</h2>
                                          <div className="flex items-center justify-center gap-2 mt-2">
                                                 <span className="text-gray-400 font-mono text-base md:text-lg">/{ipa}/</span>
                                                 <button onClick={onSpeak} className="p-2 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition shadow-sm active:scale-90"><Volume2 size={20} className="md:w-6 md:h-6" /></button>
                                          </div>
                                   </div>
                            )}

                            {/* Spelling Header */}
                            {mode === 'spelling' && (
                                   <div className="mb-4 md:mb-6 w-full animate-in fade-in">
                                          {checkStatus === 'correct' ? (
                                                 <h2 className="font-bold text-green-600 animate-in zoom-in text-4xl sm:text-5xl md:text-6xl break-words">{word}</h2>
                                          ) : (
                                                 <div className="flex flex-col items-center gap-4">
                                                        <div className="flex gap-1 md:gap-2 flex-wrap justify-center">
                                                               {word.split('').map((_, i) => <span key={i} className="border-b-4 border-gray-200 w-6 h-8 md:w-8 md:h-12 block"></span>)}
                                                        </div>
                                                        <button onClick={onSpeak} className="px-6 py-3 md:px-8 md:py-4 bg-purple-600 text-white rounded-2xl hover:bg-purple-700 transition flex items-center gap-2 font-bold shadow-lg active:scale-95 text-sm md:text-lg">
                                                               <Volume2 size={20} className="md:w-7 md:h-7" /> กดเพื่อฟังเสียง
                                                        </button>
                                                 </div>
                                          )}
                                   </div>
                            )}

                            {/* Status Box */}
                            {checkStatus !== 'idle' && (
                                   <div className={`w-full max-w-md p-3 md:p-4 rounded-2xl flex items-center justify-center gap-3 mb-4 animate-in slide-in-from-bottom-2 shadow-sm
                ${checkStatus === 'correct' ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-red-100 text-red-800 border border-red-200'}
            `}>
                                          {checkStatus === 'correct' ? <CheckCircle size={24} className="md:w-7 md:h-7" /> : <XCircle size={24} className="md:w-7 md:h-7" />}
                                          <p className="font-bold text-base md:text-lg">{checkStatus === 'correct' ? `Correct! (+10)` : 'Incorrect, try again.'}</p>
                                   </div>
                            )}

                            {/* Spoiler Box */}
                            <div
                                   className={`w-full max-w-lg p-4 md:p-6 bg-gray-50 rounded-2xl relative transition-all duration-300 border 
           ${showSpoiler ? 'bg-white shadow-md border-gray-200' : 'hover:bg-gray-100 border-transparent cursor-pointer'}`}
                                   onClick={() => !showSpoiler && setShowSpoiler(true)}
                            >
                                   <div className="flex justify-between items-center mb-2 md:mb-3">
                                          <span className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-wider">{mode === 'spelling' ? 'Hint / Meaning' : 'Definition'}</span>
                                          {showSpoiler ? <EyeOff size={16} className="text-gray-400 md:w-5 md:h-5" /> : <Eye size={16} className="text-gray-400 md:w-5 md:h-5" />}
                                   </div>

                                   <div className={`transition-all duration-300 ${showSpoiler ? 'opacity-100 blur-0' : 'opacity-0 blur-md select-none'}`}>
                                          <p className="text-gray-800 font-medium text-lg md:text-xl leading-relaxed font-sans">{definition}</p>
                                          {example && (
                                                 <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-gray-100 text-left">
                                                        <p className="text-gray-600 italic text-sm md:text-base font-serif">" {getMaskedExample(example)} "</p>
                                                        {example_th && <p className="text-gray-400 text-xs md:text-sm mt-1 font-sans not-italic">({example_th})</p>}
                                                 </div>
                                          )}
                                   </div>

                                   {!showSpoiler && (
                                          <div className="absolute inset-0 flex items-center justify-center">
                                                 <span className="text-gray-500 text-xs md:text-sm bg-white/90 px-4 py-2 rounded-full backdrop-blur-sm shadow-sm font-bold">Tap to reveal</span>
                                          </div>
                                   )}
                            </div>
                     </div>
              </div>
       );
}