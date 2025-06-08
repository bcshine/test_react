import React from 'react';
import { GameResult } from '../types';
import './CouponScreen.css';

interface CouponScreenProps {
  result: GameResult;
  onRestart: () => void;
}

const CouponScreen: React.FC<CouponScreenProps> = ({ result, onRestart }) => {
  // 쿠폰 코드 생성 (실제로는 서버에서 생성)
  const generateCouponCode = () => {
    return 'SSFOREST' + Math.random().toString(36).substr(2, 6).toUpperCase();
  };

  // 유효기간 계산 (1개월 후)
  const getExpirationDate = () => {
    const date = new Date();
    date.setMonth(date.getMonth() + 1);
    return date.toLocaleDateString('ko-KR');
  };

  const couponCode = generateCouponCode();
  const expirationDate = getExpirationDate();

  return (
    <div className="coupon-screen">
      <div className="coupon-content">
        <div className="congratulations">
          <h1>축하합니다!</h1>
          <p>쿠폰을 받으세요</p>
        </div>

        <div className="coupon-container">
          <div className="coupon">
            <div className="coupon-header">
              <h3>🎁 신성의 숲 선물 쿠폰 🎁</h3>
            </div>
            
            <div className="coupon-body">
              <div className="prize-info">
                <span className="prize-emoji">🍊</span>
                <span className="prize-name">{result.prize}</span>
              </div>
              
              <div className="coupon-details">
                <div className="detail-row">
                  <span className="label">쿠폰 코드:</span>
                  <span className="value coupon-code">{couponCode}</span>
                </div>
                
                <div className="detail-row">
                  <span className="label">유효기간:</span>
                  <span className="value">{expirationDate}까지</span>
                </div>
                
                <div className="usage-info">
                  <p className="usage-title">사용법:</p>
                  <p className="usage-text">
                    쿠폰을 저장하고, 신성의 숲 인포메이션에 제시하세요
                  </p>
                </div>
              </div>
            </div>
            
            <div className="coupon-footer">
              <div className="qr-placeholder">
                📱 QR 코드
              </div>
            </div>
          </div>
        </div>

        <div className="message-container">
          <p className="daily-message">내일도 귤나무를 골라보세요!</p>
          
          <div className="brand-message">
            <p>신성의 숲은 고객님의 더 좋은 경험을 위하여,</p>
            <p>항상 최선을 다하겠습니다.</p>
          </div>
        </div>

        <div className="action-buttons">
          <button className="save-button">
            📱 쿠폰 저장하기
          </button>
          
          <button className="restart-button" onClick={onRestart}>
            🔄 다시 시작하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default CouponScreen; 