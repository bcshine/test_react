import React, { useEffect, useState } from 'react';
import { PRIZES, GameResult } from '../types';
import './SlotMachine.css';

interface SlotMachineProps {
  onResult: (result: GameResult) => void;
}

const SlotMachine: React.FC<SlotMachineProps> = ({ onResult }) => {
  const [isSpinning, setIsSpinning] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // 슬롯 머신 회전 애니메이션
    const spinInterval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % PRIZES.length);
    }, 100);

    // 3초 후 결과 설정
    const resultTimer = setTimeout(() => {
      clearInterval(spinInterval);
      setIsSpinning(false);
      
      // 랜덤 결과 선택
      const randomPrize = PRIZES[Math.floor(Math.random() * PRIZES.length)];
      const result: GameResult = {
        type: randomPrize.type,
        prize: randomPrize.name,
        message: randomPrize.message,
      };
      
      // 1초 후 결과 화면으로 전환
      setTimeout(() => {
        onResult(result);
      }, 1000);
    }, 3000);

    // 효과음 재생 (웹 환경에서는 사용자 상호작용 후에만 가능)
    const playSound = () => {
      const audio = new Audio();
      audio.src = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHLmuW5iBAO'; // 더미 사운드
      audio.play().catch(() => {}); // 에러 무시
    };

    if (isSpinning) {
      playSound();
    }

    return () => {
      clearInterval(spinInterval);
      clearTimeout(resultTimer);
    };
  }, [onResult, isSpinning]);

  return (
    <div className="slot-machine">
      <div className="slot-container">
        <div className="slot-header">
          <h2>🎰 럭키 슬롯 🎰</h2>
        </div>
        
        <div className={`slot-display ${isSpinning ? 'spinning' : 'stopped'}`}>
          <div className="slot-item">
            🍊 {PRIZES[currentIndex].name}
          </div>
        </div>
        
        <div className="slot-lights">
          {[1, 2, 3, 4, 5].map((light) => (
            <div 
              key={light} 
              className={`light ${isSpinning ? 'blinking' : ''}`}
            />
          ))}
        </div>
      </div>
      
      {isSpinning && (
        <div className="spinning-text">
          <p>결과를 확인하는 중...</p>
          <div className="loading-dots">
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SlotMachine; 