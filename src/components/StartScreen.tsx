import React from 'react';
import './StartScreen.css';

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div className="start-screen">
      <div className="background">
        <div className="orchard">
          {[1, 2, 3, 4, 5, 6].map((tree) => (
            <div key={tree} className={`tree tree-${tree}`}>
              🌳
            </div>
          ))}
        </div>
      </div>
      
      <div className="content">
        <h1 className="title">신성의 숲</h1>
        
        <div className="logo-container">
          <img src="/sf3.png" alt="신성의 숲 로고" className="logo" />
        </div>
        
        <div className="message">
          <p className="main-text">🍊 귤나무를 골라보세요 🍊</p>
          <p className="sub-text">행운의 선물을 드립니다</p>
          <p className="sub-text">어떤 선물이 나올까요?</p>
        </div>
        
        <button className="start-button" onClick={onStart}>
          시작하기
        </button>
      </div>
    </div>
  );
};

export default StartScreen; 