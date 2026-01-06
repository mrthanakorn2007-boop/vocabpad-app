import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import VocabGame from './components/VocabGame';
import ProjectDocs from './components/ProjectDocs'; // 👈 Import ไฟล์ใหม่

function App() {
  const [currentPage, setCurrentPage] = useState('landing'); // 'landing' | 'game' | 'docs'

  // iPad Scroll Lock
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
      {currentPage === 'landing' && (
        <LandingPage
          onStart={() => setCurrentPage('game')}
          onOpenDocs={() => setCurrentPage('docs')} // 👈 ส่งฟังก์ชันเปิด Docs
        />
      )}

      {currentPage === 'game' && (
        <VocabGame onBackToLanding={() => setCurrentPage('landing')} />
      )}

      {currentPage === 'docs' && (
        <ProjectDocs onBack={() => setCurrentPage('landing')} />
      )}
    </>
  );
}

export default App;