import React, { useRef, useEffect, useState } from 'react';
import { Trash2, Eraser, PenTool, Highlighter, ChevronLeft, ChevronRight } from 'lucide-react';

// ✅ รับ prop ชื่อ autoClearTrigger เข้ามา (ตัวนี้จะเป็นตัวบอกให้ล้าง)
export default function CanvasPad({ autoClearTrigger, onPrevWord, onNextWord }) {
       const canvasRef = useRef(null);
       const containerRef = useRef(null);
       const [tool, setTool] = useState('pen');
       const isDrawing = useRef(false);

       // --- 1. Setup Canvas Resolution ---
       useEffect(() => {
              const canvas = canvasRef.current;
              const container = containerRef.current;
              if (!canvas || !container) return;

              const resizeCanvas = () => {
                     const dpr = window.devicePixelRatio || 1;
                     const rect = container.getBoundingClientRect();

                     canvas.width = rect.width * dpr;
                     canvas.height = rect.height * dpr;
                     canvas.style.width = `${rect.width}px`;
                     canvas.style.height = `${rect.height}px`;

                     const ctx = canvas.getContext('2d');
                     ctx.scale(dpr, dpr);
                     ctx.lineCap = 'round';
                     ctx.lineJoin = 'round';
              };

              resizeCanvas();
              window.addEventListener('resize', resizeCanvas);
              return () => window.removeEventListener('resize', resizeCanvas);
       }, []);

       // --- 🆕 ส่วนที่เพิ่มใหม่: Auto Clear ---
       useEffect(() => {
              // เมื่อค่า autoClearTrigger เปลี่ยน (เปลี่ยนคำศัพท์) ให้ล้างกระดานทันที
              if (autoClearTrigger) {
                     clearCanvas();
              }
       }, [autoClearTrigger]); // <--- จับตาดูตัวแปรนี้ไว้


       // --- 2. Ultra Low Latency Event Handlers ---
       useEffect(() => {
              const canvas = canvasRef.current;
              if (!canvas) return;

              const getPos = (e) => {
                     const rect = canvas.getBoundingClientRect();
                     return {
                            x: e.clientX - rect.left,
                            y: e.clientY - rect.top
                     };
              };

              const blockTouch = (e) => {
                     if (e.cancelable) e.preventDefault();
              };

              const handlePointerDown = (e) => {
                     if (e.pointerType === 'touch') return;
                     if (e.cancelable) e.preventDefault();

                     canvas.setPointerCapture(e.pointerId);
                     isDrawing.current = true;
                     const { x, y } = getPos(e);
                     const ctx = canvas.getContext('2d');
                     ctx.beginPath();
                     ctx.moveTo(x, y);
              };

              const handlePointerMove = (e) => {
                     if (!isDrawing.current || e.pointerType === 'touch') return;
                     if (e.cancelable) e.preventDefault();

                     const events = e.getCoalescedEvents ? e.getCoalescedEvents() : [e];
                     const ctx = canvas.getContext('2d');
                     const pressure = e.pressure !== undefined ? e.pressure : 0.5;

                     if (tool === 'eraser') {
                            ctx.globalCompositeOperation = 'destination-out';
                            ctx.lineWidth = 30;
                     } else if (tool === 'marker') {
                            ctx.globalCompositeOperation = 'multiply';
                            ctx.strokeStyle = 'rgba(255, 224, 102, 0.5)';
                            ctx.lineWidth = 20;
                     } else {
                            ctx.globalCompositeOperation = 'source-over';
                            ctx.strokeStyle = '#2d3748';
                            ctx.lineWidth = Math.max(1, pressure * 4);
                     }

                     events.forEach((ev) => {
                            const { x, y } = getPos(ev);
                            ctx.lineTo(x, y);
                            ctx.stroke();
                            ctx.beginPath();
                            ctx.moveTo(x, y);
                     });
              };

              const handlePointerUp = (e) => {
                     if (e.pointerType === 'touch') return;
                     isDrawing.current = false;
                     canvas.releasePointerCapture(e.pointerId);
                     const ctx = canvas.getContext('2d');
                     ctx.closePath();
              };

              const opts = { passive: false };
              canvas.addEventListener('touchstart', blockTouch, opts);
              canvas.addEventListener('touchmove', blockTouch, opts);
              canvas.addEventListener('touchend', blockTouch, opts);
              canvas.addEventListener('pointerdown', handlePointerDown, opts);
              canvas.addEventListener('pointermove', handlePointerMove, opts);
              canvas.addEventListener('pointerup', handlePointerUp, opts);
              canvas.addEventListener('pointerleave', handlePointerUp, opts);

              return () => {
                     canvas.removeEventListener('touchstart', blockTouch);
                     canvas.removeEventListener('touchmove', blockTouch);
                     canvas.removeEventListener('touchend', blockTouch);
                     canvas.removeEventListener('pointerdown', handlePointerDown);
                     canvas.removeEventListener('pointermove', handlePointerMove);
                     canvas.removeEventListener('pointerup', handlePointerUp);
                     canvas.removeEventListener('pointerleave', handlePointerUp);
              };
       }, [tool]);

       const clearCanvas = () => {
              const canvas = canvasRef.current;
              const ctx = canvas.getContext('2d');
              ctx.clearRect(0, 0, canvas.width, canvas.height);
       };

       return (
              <div
                     ref={containerRef}
                     className="relative w-full h-full bg-[#fdfbf7] rounded-3xl shadow-inner border border-gray-200 overflow-hidden select-none"
                     style={{
                            backgroundImage: 'linear-gradient(#e2e8f0 1px, transparent 1px)',
                            backgroundSize: '100% 50px',
                            backgroundPosition: '0 40px',
                            touchAction: 'none'
                     }}
              >
                     <div className="absolute top-0 bottom-0 left-[40px] w-px bg-red-200 h-full pointer-events-none"></div>

                     <div className="absolute top-4 right-4 flex flex-col md:flex-row gap-2 bg-white/90 backdrop-blur p-2 rounded-2xl shadow-lg border z-10">
                            <button onClick={() => setTool('pen')} className={`p-3 rounded-xl transition ${tool === 'pen' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-500 hover:bg-gray-100'}`}><PenTool size={20} /></button>
                            <button onClick={() => setTool('marker')} className={`p-3 rounded-xl transition ${tool === 'marker' ? 'bg-yellow-400 text-white shadow-md' : 'text-gray-500 hover:bg-gray-100'}`}><Highlighter size={20} /></button>
                            <button onClick={() => setTool('eraser')} className={`p-3 rounded-xl transition ${tool === 'eraser' ? 'bg-gray-600 text-white shadow-md' : 'text-gray-500 hover:bg-gray-100'}`}><Eraser size={20} /></button>
                            <div className="h-px w-full md:w-px md:h-full bg-gray-200 mx-1"></div>
                            <button onClick={clearCanvas} className="p-3 rounded-xl text-red-500 hover:bg-red-50 transition"><Trash2 size={20} /></button>
                            <div className="h-px w-full md:w-px md:h-full bg-gray-200 mx-1"></div>
                            <button onClick={() => onPrevWord && onPrevWord()} title="คำก่อนหน้า" className="p-2 rounded-xl text-gray-600 hover:bg-gray-100 transition"><ChevronLeft size={18} /></button>
                            <button onClick={() => onNextWord && onNextWord()} title="คำถัดไป" className="p-2 rounded-xl text-gray-600 hover:bg-gray-100 transition"><ChevronRight size={18} /></button>
                     </div>

                     <canvas
                            ref={canvasRef}
                            style={{ touchAction: 'none', width: '100%', height: '100%' }}
                            className="cursor-crosshair block absolute inset-0 z-0"
                     />
              </div>
       );
}