import React from 'react';
import { ChevronLeft, Code, Cpu, Database, Layers, PenTool, Zap, Layout } from 'lucide-react';

// Sub-component
function TechCard({ title, name, children }) {
       return (
              <div className="flex flex-col items-center justify-center p-6 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                     {children}
                     <h4 className="font-bold text-gray-800 text-sm">{name}</h4>
                     <span className="text-xs text-gray-400 mt-1 uppercase tracking-wide">{title}</span>
              </div>
       );
}

export default function ProjectDocs({ onBack }) {
       return (
              // 👇 แก้ไขตรงนี้: เพิ่ม fixed inset-0 overflow-y-auto เพื่อให้เลื่อนหน้าจอได้
              <div className="fixed inset-0 w-full h-[100dvh] bg-white text-gray-800 font-sans selection:bg-blue-100 overflow-y-auto z-50">

                     {/* Header */}
                     <div className="relative overflow-hidden bg-slate-900 text-white py-20 px-6">
                            <div className="absolute top-0 left-0 w-full h-full opacity-10"
                                   style={{ backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`, backgroundSize: '40px 40px' }}>
                            </div>

                            <div className="max-w-4xl mx-auto relative z-10">
                                   <button onClick={onBack} className="mb-8 flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                                          <ChevronLeft size={20} /> Back to App
                                   </button>
                                   <div className="flex items-center gap-3 mb-4">
                                          <span className="px-3 py-1 rounded-full bg-blue-600 text-xs font-bold uppercase tracking-wider">Technical Documentation</span>
                                          <span className="px-3 py-1 rounded-full bg-gray-700 text-xs font-bold uppercase tracking-wider">Interview Prep</span>
                                   </div>
                                   <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">
                                          Vocab<span className="text-blue-500">Pad</span> Architecture
                                   </h1>
                                   <p className="text-xl text-gray-300 max-w-2xl leading-relaxed">
                                          เจาะลึกเบื้องหลังการพัฒนา: การออกแบบระบบ, Tech Stack, และการแก้ปัญหาทางเทคนิคสำหรับแอปพลิเคชันเพื่อการศึกษาบน iPad
                                   </p>
                            </div>
                     </div>

                     <div className="max-w-4xl mx-auto px-6 mt-12 space-y-16 pb-24">

                            {/* 1. Project Overview */}
                            <section>
                                   <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 border-b pb-4">
                                          <Layout className="text-blue-600" /> Project Overview
                                   </h2>
                                   <p className="text-lg text-gray-600 leading-relaxed">
                                          <strong>VocabPad</strong> คือ Progressive Web Application (PWA) ที่ถูกออกแบบโดยเน้นหลักการ <em>Mobile-First</em> และ <em>Touch-Interface Optimization</em> เพื่อแก้ปัญหาการเรียนคำศัพท์แบบเดิมๆ ด้วยการผสาน 3 แนวคิดหลัก:
                                   </p>
                                   <ul className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                                          <li className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                                                 <strong className="block text-blue-700 mb-1">Interactive Learning</strong>
                                                 การเขียนตอบจริง (Handwriting) ช่วยกระตุ้นความจำได้ดีกว่าการพิมพ์
                                          </li>
                                          <li className="bg-purple-50 p-4 rounded-xl border border-purple-100">
                                                 <strong className="block text-purple-700 mb-1">Gamification Loop</strong>
                                                 ระบบ Score, Streak และ Feedback Loop (เสียง/Visual) เพื่อดึงดูดผู้ใช้งาน
                                          </li>
                                          <li className="bg-orange-50 p-4 rounded-xl border border-orange-100">
                                                 <strong className="block text-orange-700 mb-1">Accessibility</strong>
                                                 การใช้ Web Speech API เพื่อฝึกทักษะการฟัง (Listening) และการออกเสียง
                                          </li>
                                   </ul>
                            </section>

                            {/* 2. Tech Stack */}
                            <section>
                                   <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 border-b pb-4">
                                          <Cpu className="text-blue-600" /> Tech Stack & Tools
                                   </h2>
                                   <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

                                          <TechCard title="Core Framework" name="React.js (Vite)">
                                                 <img
                                                        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
                                                        alt="React"
                                                        className="w-14 h-14 mb-3 object-contain animate-spin-slow"
                                                        style={{ animationDuration: '10s' }}
                                                 />
                                          </TechCard>

                                          <TechCard title="Styling" name="Tailwind CSS">
                                                 <img
                                                        src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg"
                                                        alt="Tailwind"
                                                        className="w-14 h-14 mb-3 object-contain"
                                                 />
                                          </TechCard>

                                          <TechCard title="Icons Library" name="Lucide React">
                                                 <div className="w-14 h-14 mb-3 flex items-center justify-center text-pink-500">
                                                        <PenTool size={48} strokeWidth={1.5} />
                                                 </div>
                                          </TechCard>

                                          <TechCard title="Deployment" name="Vercel">
                                                 <img
                                                        src="https://assets.vercel.com/image/upload/v1588805858/repositories/vercel/logo.png"
                                                        alt="Vercel"
                                                        className="w-14 h-14 mb-3 object-contain"
                                                 />
                                          </TechCard>

                                   </div>
                            </section>

                            {/* 3. Implementation */}
                            <section>
                                   <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 border-b pb-4">
                                          <Code className="text-blue-600" /> Technical Implementation
                                   </h2>

                                   <div className="space-y-8">
                                          <div className="flex gap-4">
                                                 <div className="flex-shrink-0 w-12 h-12 bg-black text-white rounded-xl flex items-center justify-center font-bold">1</div>
                                                 <div>
                                                        <h3 className="text-xl font-bold text-gray-900 mb-2">HTML5 Canvas Logic</h3>
                                                        <p className="text-gray-600 mb-2">
                                                               ระบบกระดานเขียนไม่ได้ใช้ Library สำเร็จรูป แต่เขียน Logic ขึ้นเองผ่าน <code>HTML5 Canvas API</code> โดยจัดการ Event Listeners ทั้ง Mouse และ Touch Events:
                                                        </p>
                                                        <ul className="list-disc list-inside text-sm text-gray-500 space-y-1 bg-gray-50 p-4 rounded-lg border">
                                                               <li><strong>Touch Start/Move/End:</strong> คำนวณพิกัด (Offset) เพื่อวาดเส้นตามนิ้วมือ</li>
                                                               <li><strong>Context Ref:</strong> ใช้ <code>useRef</code> ในการเข้าถึง Canvas DOM โดยตรงเพื่อประสิทธิภาพสูงสุด</li>
                                                        </ul>
                                                 </div>
                                          </div>

                                          <div className="flex gap-4">
                                                 <div className="flex-shrink-0 w-12 h-12 bg-black text-white rounded-xl flex items-center justify-center font-bold">2</div>
                                                 <div>
                                                        <h3 className="text-xl font-bold text-gray-900 mb-2">State Management & Data Flow</h3>
                                                        <p className="text-gray-600 mb-2">
                                                               ใช้ <strong>React Hooks (useState, useEffect)</strong> ในการจัดการ Global State ของแอปพลิเคชัน:
                                                        </p>
                                                        <ul className="list-disc list-inside text-sm text-gray-500 space-y-1 bg-gray-50 p-4 rounded-lg border">
                                                               <li><strong>Separation of Concerns:</strong> แยก Logic เกม ออกจาก UI เพื่อให้โค้ดสะอาด</li>
                                                               <li><strong>Component Props:</strong> ส่งข้อมูลแบบ One-way Data Flow จาก Parent สู่ Child components</li>
                                                        </ul>
                                                 </div>
                                          </div>

                                          <div className="flex gap-4">
                                                 <div className="flex-shrink-0 w-12 h-12 bg-black text-white rounded-xl flex items-center justify-center font-bold">3</div>
                                                 <div>
                                                        <h3 className="text-xl font-bold text-gray-900 mb-2">Data Persistence</h3>
                                                        <p className="text-gray-600 mb-2">
                                                               เพื่อให้ผู้ใช้เรียนต่อได้ทันทีโดยไม่ต้อง Login หรือต่อเน็ต ผมเลือกใช้ <strong>LocalStorage API</strong>:
                                                        </p>
                                                        <div className="bg-gray-900 text-gray-300 p-3 rounded-lg text-xs font-mono mt-2">
                                                               localStorage.setItem('vocab_score', score);
                                                        </div>
                                                 </div>
                                          </div>
                                   </div>
                            </section>

                            {/* 4. UX/UI */}
                            <section>
                                   <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 border-b pb-4">
                                          <Zap className="text-blue-600" /> UX/UI Engineering
                                   </h2>
                                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                          <div className="p-5 border rounded-2xl hover:shadow-lg transition">
                                                 <h3 className="font-bold text-lg mb-2">📱 Responsive Auto-Layout</h3>
                                                 <p className="text-gray-600 text-sm">
                                                        ใช้ <strong>Flexbox & CSS Grid</strong> ในการจัดการ Layout สองรูปแบบ:
                                                        <br />- <strong>Mobile:</strong> Stack แนวตั้ง (Card บน / Canvas ล่าง)
                                                        <br />- <strong>iPad/Desktop:</strong> Split Screen แนวนอน
                                                 </p>
                                          </div>
                                          <div className="p-5 border rounded-2xl hover:shadow-lg transition">
                                                 <h3 className="font-bold text-lg mb-2">🎨 iPad Optimization</h3>
                                                 <p className="text-gray-600 text-sm">
                                                        แก้ปัญหา <em>"Rubber-banding effect"</em> (อาการจอยืดหยุ่นบน iOS) โดยการ Lock Body Scroll และจัดการ Touch Actions ให้เหมือน Native App
                                                 </p>
                                          </div>
                                   </div>
                            </section>

                     </div>
              </div>
       );
}