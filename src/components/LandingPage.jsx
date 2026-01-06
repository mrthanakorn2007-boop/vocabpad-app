import React from 'react';
import { ChevronRight, BookOpen, Ear, PenTool, FileText } from 'lucide-react';

export default function LandingPage({ onStart, onOpenDocs }) {
       return (
              <div className="min-h-[100dvh] w-full flex flex-col items-center justify-center relative overflow-hidden text-gray-800 font-sans p-4 md:p-6"
                     style={{
                            backgroundColor: '#fdfbf7',
                            backgroundImage: `linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px)`,
                            backgroundSize: '24px 24px'
                     }}>

                     {/* --- Background Blobs (ลูกบอลสีฟุ้งๆ) --- */}
                     <div className="absolute top-[-10%] right-[-5%] w-64 h-64 bg-yellow-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
                     <div className="absolute bottom-[-10%] left-[-5%] w-80 h-80 bg-blue-200 rounded-full blur-3xl opacity-30 animate-pulse delay-1000"></div>

                     {/* --- Main Card --- */}
                     <div className="max-w-2xl w-full bg-white/80 backdrop-blur-sm p-6 md:p-12 rounded-3xl shadow-xl border border-gray-100 flex flex-col items-center text-center animate-in zoom-in duration-500 z-10">

                            {/* Logo Icon */}
                            <div className="mb-4 md:mb-6 bg-black text-white p-3 md:p-4 rounded-2xl shadow-lg transform -rotate-3">
                                   <span className="text-3xl md:text-4xl">📝</span>
                            </div>

                            {/* Title */}
                            <h1 className="text-4xl md:text-6xl font-black mb-3 md:mb-4 tracking-tight text-gray-900">
                                   Vocab<span className="text-blue-600">Pad</span>
                            </h1>

                            {/* Subtitle */}
                            <p className="text-base md:text-xl text-gray-600 mb-6 md:mb-8 font-medium leading-relaxed">
                                   เปลี่ยน iPad ให้เป็นสมุดฝึกศัพท์อัจฉริยะ <br />
                                   <span className="text-gray-400 text-sm md:text-base font-normal">ฟังเสียง • เขียนตอบ • สะสมคะแนน</span>
                            </p>

                            {/* Features Grid (3 กล่อง) */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full mb-6 md:mb-8 text-left">
                                   {/* Feature 1 */}
                                   <div className="p-3 md:p-4 bg-blue-50 rounded-xl border border-blue-100 transition hover:-translate-y-1">
                                          <BookOpen className="text-blue-500 mb-1 md:mb-2" size={20} />
                                          <h3 className="font-bold text-gray-800 text-xs md:text-sm">คลังศัพท์คุณภาพ</h3>
                                          <p className="text-[10px] md:text-xs text-gray-500 mt-1">รวมศัพท์สอบ TCAS และศัพท์ใช้บ่อยกว่า 1,000 คำ</p>
                                   </div>
                                   {/* Feature 2 */}
                                   <div className="p-3 md:p-4 bg-purple-50 rounded-xl border border-purple-100 transition hover:-translate-y-1">
                                          <Ear className="text-purple-500 mb-1 md:mb-2" size={20} />
                                          <h3 className="font-bold text-gray-800 text-xs md:text-sm">Spelling Mode</h3>
                                          <p className="text-[10px] md:text-xs text-gray-500 mt-1">ปิดศัพท์ ฟังเสียง แล้วเขียนตอบเพื่อทดสอบหู</p>
                                   </div>
                                   {/* Feature 3 */}
                                   <div className="p-3 md:p-4 bg-orange-50 rounded-xl border border-orange-100 transition hover:-translate-y-1">
                                          <PenTool className="text-orange-500 mb-1 md:mb-2" size={20} />
                                          <h3 className="font-bold text-gray-800 text-xs md:text-sm">Handwriting</h3>
                                          <p className="text-[10px] md:text-xs text-gray-500 mt-1">พื้นที่เขียนทดอิสระ รองรับ Apple Pencil</p>
                                   </div>
                            </div>

                            {/* Badge */}
                            <div className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-gray-100 rounded-full text-[10px] md:text-xs font-bold text-gray-500 mb-6 md:mb-8 border border-gray-200">
                                   <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                   Optimized for iPad & Tablet
                            </div>

                            {/* Start Button */}
                            <button onClick={onStart} className="group relative w-full md:w-auto px-8 py-3 md:px-10 md:py-4 bg-black text-white rounded-2xl font-bold text-lg md:text-xl shadow-lg hover:shadow-2xl hover:bg-gray-900 transition-all active:scale-95 flex items-center justify-center gap-3">
                                   Start Learning
                                   <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                            </button>
                     </div>

                     {/* --- Footer: Link to Docs --- */}
                     <div className="absolute bottom-6 flex flex-col items-center gap-2 z-20 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
                            <button
                                   onClick={onOpenDocs}
                                   className="group flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/50 border border-transparent hover:border-blue-200 hover:bg-white hover:shadow-sm transition-all text-xs text-gray-500 hover:text-blue-600 font-mono"
                            >
                                   <FileText size={12} className="group-hover:text-blue-500" />
                                   Documentation & Tech Stack
                            </button>
                            <p className="text-[10px] text-gray-400 font-sans">VocabPad v1.3 • Built for Education</p>
                     </div>

              </div>
       );
}