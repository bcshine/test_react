import React, { useEffect, useState } from 'react';
import { GameResult } from '../types';
import './ResultScreen.css';

interface ResultScreenProps {
  result: GameResult;
  onNext: () => void;
  onClose: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ result, onNext, onClose }) => {
  const [showEffect, setShowEffect] = useState(false);

  useEffect(() => {
    // 결과 발표 효과 시작
    setShowEffect(true);
    
    // 효과 자동 종료
    const effectTimer = setTimeout(() => {
      setShowEffect(false);
    }, 3000);

    return () => clearTimeout(effectTimer);
  }, []);

  const isWin = result.type === 'win';

  return (
    <div className={`result-screen ${isWin ? 'win' : 'lose'}`}>
      {/* 배경 효과 */}
      <div className={`effect-background ${showEffect ? 'active' : ''}`}>
        {isWin ? (
          <div className="fireworks">
            {[1, 2, 3, 4, 5].map((firework) => (
              <div key={firework} className={`firework firework-${firework}`}>
                🎆
              </div>
            ))}
            <div className="confetti">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((piece) => (
                <div key={piece} className={`confetti-piece confetti-${piece}`}>
                  🎊
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="airplane-effect">
            <div className="airplane">✈️</div>
          </div>
        )}
      </div>

      {/* 결과 내용 */}
      <div className="result-content">
        <div className="result-icon">
          {isWin ? '🎉' : '❌'}
        </div>
        
        <div className="result-message">
          <h2>{result.message}</h2>
        </div>
        
        <div className="result-prize">
          <div className="prize-display">
            🍊 {result.prize}
          </div>
        </div>
        
        <div className="button-container">
          {isWin ? (
            <button className="coupon-button" onClick={onNext}>
              쿠폰 받기
            </button>
          ) : null}
          
          <button className="close-button" onClick={onClose}>
            {isWin ? '닫기' : '다시 도전하기'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultScreen; 