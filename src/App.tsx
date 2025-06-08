import React, { useState, useEffect } from 'react';

// 상품 목록
const prizes = [
  { id: 1, name: '🍊음료수 한잔', probability: 1/6, isWin: true },
  { id: 2, name: '🍊커피 한잔', probability: 1/6, isWin: true },
  { id: 3, name: '🍊귤 2개 선물', probability: 1/6, isWin: true },
  { id: 4, name: '🍊1000원 쿠폰', probability: 1/6, isWin: true },
  { id: 5, name: '🍊컵라면 하나', probability: 1/6, isWin: true },
  { id: 6, name: '🍊꽝', probability: 1/6, isWin: false }
];

// 귤 색상 (빨강, 주황, 노랑, 초록, 파랑, 보라)
const orangeColors = ['#FF6B6B', '#FF8E53', '#FFD93D', '#6BCF7F', '#4ECDC4', '#A8E6CF'];

function App() {
  const [scene, setScene] = useState(1);
  const [selectedOrange, setSelectedOrange] = useState<number | null>(null);
  const [slotAnimation, setSlotAnimation] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [couponCode, setCouponCode] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  // 컴포넌트 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  // 쿠폰 코드 생성
  const generateCouponCode = () => {
    return 'SF' + Date.now().toString().slice(-8) + Math.random().toString(36).substr(2, 4).toUpperCase();
  };

  // 상품 추첨
  const drawPrize = () => {
    const random = Math.random();
    let cumulative = 0;
    
    for (const prize of prizes) {
      cumulative += prize.probability;
      if (random <= cumulative) {
        return prize;
      }
    }
    return prizes[prizes.length - 1]; // 기본값
  };

  // 오렌지 선택 처리
  const selectOrange = (index: number) => {
    // 기존 타이머가 있으면 클리어
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    setSelectedOrange(index);
    setScene(3);
    setSlotAnimation(true);

    // 5초 후 결과 표시
    const newTimeoutId = setTimeout(() => {
      const prize = drawPrize();
      setResult(prize);
      setSlotAnimation(false);
      setScene(4);

      if (prize.isWin) {
        // 당첨 시 쿠폰 정보 생성
        setCouponCode(generateCouponCode());
        const expDate = new Date();
        expDate.setDate(expDate.getDate() + 30);
        setExpirationDate(expDate.toLocaleDateString('ko-KR'));
      }
      setTimeoutId(null);
    }, 4000);
    
    setTimeoutId(newTimeoutId);
  };

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      fontFamily: '"Nexon Lv1 Gothic OTF", "Noto Sans KR", Arial, sans-serif',
      overflow: 'hidden',
      maxWidth: '600px',
      margin: '0 auto',
      position: 'relative'
    }}>
      {/* Scene 1: 시작 화면 */}
      {scene === 1 && (
        <div style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #a8e6cf 0%, #88d8a3 50%, #69c380 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative'
        }}>
          <div style={{
            textAlign: 'center',
            background: 'rgba(255, 255, 255, 0.95)',
            padding: '50px 40px',
            borderRadius: '30px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
            maxWidth: '90%',
            animation: 'fadeInUp 1s ease-out'
          }}>
            <h1 style={{ 
              fontSize: '3rem', 
              color: '#2d5016', 
              marginBottom: '20px',
              fontWeight: '800',
              textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
            }}>
              신성의 숲
            </h1>
            
            <img 
              src="/sf3.png" 
              alt="신성의 숲 로고" 
              style={{ 
                width: '150px', 
                margin: '20px 0',
                backgroundColor: 'transparent',
                objectFit: 'contain',
                mixBlendMode: 'multiply'
              }}
            />
            
                         <div style={{ margin: '40px 0' }}>
               <p style={{ 
                 fontSize: '1.5rem', 
                 color: '#e17055', 
                 marginBottom: '15px', 
                 fontWeight: '700',
                 
               }}>
                 🍊 귤나무를 골라 보세요 🍊
               </p>
               <p style={{ fontSize: '1.1rem', color: '#636e72', marginBottom: '8px' }}>
                 행운의 선물을 드립니다
               </p>
               <p style={{ fontSize: '1.1rem', color: '#636e72' }}>
                 어떤 선물이 나올까요?
               </p>
             </div>
            
            <button 
              onClick={() => setScene(2)}
              style={{
                background: 'linear-gradient(45deg, #00b894, #00cec9)',
                border: 'none',
                borderRadius: '30px',
                color: 'white',
                fontSize: '1.4rem',
                fontWeight: '700',
                padding: '18px 50px',
                cursor: 'pointer',
                marginTop: '20px',
                boxShadow: '0 8px 25px rgba(0, 184, 148, 0.4)',
                transition: 'all 0.3s ease',
                transform: 'translateY(0)'
              }}
                             onMouseEnter={(e) => {
                 (e.target as HTMLElement).style.transform = 'translateY(-3px)';
                 (e.target as HTMLElement).style.boxShadow = '0 12px 35px rgba(0, 184, 148, 0.5)';
               }}
               onMouseLeave={(e) => {
                 (e.target as HTMLElement).style.transform = 'translateY(0)';
                 (e.target as HTMLElement).style.boxShadow = '0 8px 25px rgba(0, 184, 148, 0.4)';
               }}
            >
                             시작하기
            </button>
          </div>
        </div>
      )}

             {/* Scene 2: 오렌지 선택 */}
       {scene === 2 && (
         <div style={{
           width: '100%',
           height: '100%',
           background: 'linear-gradient(135deg, #74b9ff 0%, #0984e3 50%, #6c5ce7 100%)',
           display: 'flex',
           flexDirection: 'column',
           alignItems: 'center',
           justifyContent: 'center',
           color: 'white',
           padding: '20px',
           position: 'relative',
           overflow: 'hidden'
         }}>
           {/* 위쪽 귤나무들 */}
           <div style={{
             position: 'absolute',
             top: '10px',
             left: '15px',
             fontSize: '4rem',
             opacity: 0.3,
             transform: 'rotate(-15deg)',
             zIndex: 1
           }}>🌳</div>
           
           <div style={{
             position: 'absolute',
             top: '20px',
             right: '15px',
             fontSize: '3.5rem',
             opacity: 0.25,
             transform: 'rotate(20deg)',
             zIndex: 1
           }}>🌳</div>
           
           <div style={{
             position: 'absolute',
             top: '15px',
             left: '50%',
             transform: 'translateX(-50%) rotate(5deg)',
             fontSize: '3rem',
             opacity: 0.2,
             zIndex: 1
           }}>🌳</div>
           
           <div style={{
             position: 'absolute',
             top: '5px',
             left: '30%',
             fontSize: '2.5rem',
             opacity: 0.15,
             transform: 'rotate(-8deg)',
             zIndex: 1
           }}>🌳</div>
           
           <div style={{
             position: 'absolute',
             top: '8px',
             right: '35%',
             fontSize: '2.8rem',
             opacity: 0.18,
             transform: 'rotate(12deg)',
             zIndex: 1
           }}>🌳</div>
           
           {/* 좌측 귤나무들 */}
           <div style={{
             position: 'absolute',
             left: '5px',
             top: '30%',
             fontSize: '3.5rem',
             opacity: 0.2,
             transform: 'rotate(-20deg)',
             zIndex: 1
           }}>🌳</div>
           
           <div style={{
             position: 'absolute',
             left: '0px',
             top: '50%',
             fontSize: '3rem',
             opacity: 0.15,
             transform: 'rotate(15deg)',
             zIndex: 1
           }}>🌳</div>
           
           <div style={{
             position: 'absolute',
             left: '8px',
             top: '70%',
             fontSize: '2.8rem',
             opacity: 0.18,
             transform: 'rotate(-10deg)',
             zIndex: 1
           }}>🌳</div>
           
           {/* 우측 귤나무들 */}
           <div style={{
             position: 'absolute',
             right: '5px',
             top: '35%',
             fontSize: '3.5rem',
             opacity: 0.2,
             transform: 'rotate(18deg)',
             zIndex: 1
           }}>🌳</div>
           
           <div style={{
             position: 'absolute',
             right: '0px',
             top: '55%',
             fontSize: '3rem',
             opacity: 0.15,
             transform: 'rotate(-15deg)',
             zIndex: 1
           }}>🌳</div>
           
           <div style={{
             position: 'absolute',
             right: '8px',
             top: '75%',
             fontSize: '2.8rem',
             opacity: 0.18,
             transform: 'rotate(12deg)',
             zIndex: 1
           }}>🌳</div>
           
           {/* 아래쪽 귤나무들 */}
           <div style={{
             position: 'absolute',
             bottom: '10px',
             left: '15px',
             fontSize: '4.5rem',
             opacity: 0.3,
             transform: 'rotate(10deg)',
             zIndex: 1
           }}>🌳</div>
           
           <div style={{
             position: 'absolute',
             bottom: '5px',
             right: '15px',
             fontSize: '4rem',
             opacity: 0.25,
             transform: 'rotate(-12deg)',
             zIndex: 1
           }}>🌳</div>
           
           <div style={{
             position: 'absolute',
             bottom: '15px',
             left: '50%',
             transform: 'translateX(-50%) rotate(-8deg)',
             fontSize: '3.5rem',
             opacity: 0.2,
             zIndex: 1
           }}>🌳</div>
           
           <div style={{
             position: 'absolute',
             bottom: '8px',
             left: '25%',
             fontSize: '3rem',
             opacity: 0.18,
             transform: 'rotate(15deg)',
             zIndex: 1
           }}>🌳</div>
           
           <div style={{
             position: 'absolute',
             bottom: '12px',
             right: '30%',
             fontSize: '3.2rem',
             opacity: 0.16,
             transform: 'rotate(-18deg)',
             zIndex: 1
           }}>🌳</div>
           
           {/* 메인 콘텐츠 */}
           <div style={{ position: 'relative', zIndex: 2 }}>
             <h2 style={{ 
               fontSize: '2.5rem', 
               marginBottom: '40px',
               textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
               fontWeight: '700',
               textAlign: 'center'
             }}>
               귤, 하나 골라주세요!
             </h2>
             
             <div style={{
               display: 'grid',
               gridTemplateColumns: 'repeat(3, 1fr)',
               gap: '25px',
               rowGap: '80px',
               margin: '40px auto',
               maxWidth: '600px',
               justifyItems: 'center'
             }}>
               {orangeColors.map((color, index) => (
                 <div
                   key={index}
                   onClick={() => selectOrange(index)}
                   style={{
                     width: '120px',
                     height: '120px',
                     backgroundColor: color,
                     borderRadius: '50%',
                     display: 'flex',
                     alignItems: 'center',
                     justifyContent: 'center',
                     fontSize: '3rem',
                     cursor: 'pointer',
                     border: '4px solid rgba(255, 255, 255, 0.9)',
                     boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)',
                     transition: 'all 0.3s ease',
                     position: 'relative',
                     margin: '10px'
                   }}
                   onMouseEnter={(e) => {
                     (e.target as HTMLElement).style.transform = 'scale(1.05) rotate(5deg)';
                     (e.target as HTMLElement).style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.4)';
                   }}
                   onMouseLeave={(e) => {
                     (e.target as HTMLElement).style.transform = 'scale(1) rotate(0deg)';
                     (e.target as HTMLElement).style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.3)';
                   }}
                 >
                   🍊
                   <span style={{
                     position: 'absolute',
                     bottom: '-35px',
                     fontSize: '1rem',
                     fontWeight: '600',
                     color: 'white',
                     textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
                   }}>
                     {index + 1}번
                   </span>
                 </div>
               ))}
             </div>
             
             <button 
               onClick={() => setScene(1)}
               style={{
                 background: 'rgba(255, 255, 255, 0.2)',
                 border: '2px solid white',
                 borderRadius: '25px',
                 color: 'white',
                 fontSize: '1.1rem',
                 padding: '12px 35px',
                 cursor: 'pointer',
                 marginTop: '30px',
                 fontWeight: '600',
                 display: 'block',
                 margin: '80px auto 0'
               }}
             >
               ← 처음으로
             </button>
           </div>
         </div>
       )}

      {/* Scene 3: 슬롯머신 애니메이션 */}
      {scene === 3 && (
        <div style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #fd79a8 0%, #e84393 50%, #a29bfe 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* 반짝이는 배경 효과 */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '30px 30px',
            animation: slotAnimation ? 'sparkle 2s linear infinite' : 'none',
            zIndex: 1
          }} />
          
          <h2 style={{ 
            fontSize: '2.5rem', 
            marginBottom: '50px',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            fontWeight: '700',
            zIndex: 2,
            position: 'relative'
          }}>
            🎰 추첨 중... 🎰
          </h2>
          
          {/* 큰 중앙 룰렛 */}
          <div style={{
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            background: 'conic-gradient(from 0deg, #ff6b6b, #feca57, #48ca48, #74b9ff, #a55eea, #ff9ff3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
                         animation: slotAnimation ? 'rouletteSpinFast 0.1s linear infinite' : 'none',
            border: '8px solid white',
            boxShadow: '0 0 30px rgba(255,255,255,0.5)',
            marginBottom: '40px',
            zIndex: 2
          }}>
            {/* 중앙 귤 */}
            <div style={{
              width: '80px',
              height: '80px',
              background: 'white',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '3rem',
                             animation: slotAnimation ? 'bounceOrange 0.5s ease-in-out infinite alternate' : 'none'
            }}>
              🍊
            </div>
            
            {/* 룰렛 포인터 */}
            <div style={{
              position: 'absolute',
              top: '-15px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 0,
              height: 0,
              borderLeft: '15px solid transparent',
              borderRight: '15px solid transparent',
              borderTop: '25px solid white',
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
            }} />
          </div>
          
          {/* 주변 작은 귤들이 돌아다니는 효과 */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                fontSize: '2rem',
                                 animation: slotAnimation ? `orbit${i} 1s linear infinite` : 'none',
                zIndex: 1
              }}
            >
              🍊
            </div>
          ))}
          
          <p style={{ 
            fontSize: '1.5rem',
            fontWeight: '600',
            textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
            zIndex: 2,
            position: 'relative'
          }}>
            ✨ 행운의 귤을 선택하고 있습니다... ✨
          </p>

          <style>
            {`
              @keyframes rouletteSpinFast {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
              
              @keyframes bounceOrange {
                0% { transform: scale(1); }
                100% { transform: scale(1.1); }
              }
              
              @keyframes sparkle {
                0% { transform: translateX(0) translateY(0); }
                100% { transform: translateX(-30px) translateY(-30px); }
              }
              
              @keyframes orbit0 {
                0% { top: 30%; left: 50%; transform: translate(-50%, -50%) rotate(0deg) translateX(150px) rotate(0deg); }
                100% { top: 30%; left: 50%; transform: translate(-50%, -50%) rotate(360deg) translateX(150px) rotate(-360deg); }
              }
              
              @keyframes orbit1 {
                0% { top: 40%; left: 50%; transform: translate(-50%, -50%) rotate(60deg) translateX(130px) rotate(-60deg); }
                100% { top: 40%; left: 50%; transform: translate(-50%, -50%) rotate(420deg) translateX(130px) rotate(-420deg); }
              }
              
              @keyframes orbit2 {
                0% { top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(120deg) translateX(140px) rotate(-120deg); }
                100% { top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(480deg) translateX(140px) rotate(-480deg); }
              }
              
              @keyframes orbit3 {
                0% { top: 60%; left: 50%; transform: translate(-50%, -50%) rotate(180deg) translateX(120px) rotate(-180deg); }
                100% { top: 60%; left: 50%; transform: translate(-50%, -50%) rotate(540deg) translateX(120px) rotate(-540deg); }
              }
              
              @keyframes orbit4 {
                0% { top: 45%; left: 50%; transform: translate(-50%, -50%) rotate(240deg) translateX(160px) rotate(-240deg); }
                100% { top: 45%; left: 50%; transform: translate(-50%, -50%) rotate(600deg) translateX(160px) rotate(-600deg); }
              }
              
              @keyframes orbit5 {
                0% { top: 35%; left: 50%; transform: translate(-50%, -50%) rotate(300deg) translateX(135px) rotate(-300deg); }
                100% { top: 35%; left: 50%; transform: translate(-50%, -50%) rotate(660deg) translateX(135px) rotate(-660deg); }
              }
            `}
          </style>
        </div>
      )}

      {/* Scene 4: 결과 발표 */}
      {scene === 4 && result && (
        <div style={{
          width: '100%',
          height: '100%',
          background: result.isWin 
            ? 'linear-gradient(135deg, #fdcb6e 0%, #e17055 50%, #d63031 100%)'
            : 'linear-gradient(135deg, #636e72 0%, #2d3436 50%, #000000 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {result.isWin && (
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'radial-gradient(circle, transparent 20%, rgba(255,215,0,0.1) 20.5%, rgba(255,215,0,0.1) 80%, transparent 80.5%)',
              animation: 'firework 2s ease-out infinite'
            }} />
          )}
          
          <h2 style={{ 
            fontSize: '2rem', 
            marginBottom: '30px',
            textShadow: '3px 3px 6px rgba(0,0,0,0.5)',
            fontWeight: '800',
            textAlign: 'center',
            padding: '0 20px',
            lineHeight: '1.3',
            whiteSpace: 'pre-line'
          }}>
            {result.isWin ? '🎉 축하합니다! 🎉' : '❌ 아쉽지만 꽝!\n내일 또 도전해보세요~'}
          </h2>
          
          <div style={{
            background: 'rgba(255, 255, 255, 0.15)',
            padding: '40px',
            borderRadius: '20px',
            textAlign: 'center',
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
            marginBottom: '40px'
          }}>
            <p style={{ 
              fontSize: '2rem', 
              fontWeight: '700',
              marginBottom: '20px'
            }}>
              {result.name}
            </p>
            
            {result.isWin ? (
              <p style={{ fontSize: '1.3rem', opacity: 0.9 }}>
                선물을 받아가세요! 🎁
              </p>
            ) : (
              <p style={{ fontSize: '1.3rem', opacity: 0.9 }}>
                다음 기회에 다시 도전해보세요! 💪
              </p>
            )}
          </div>
          
          {/* 당첨이면 쿠폰받기, 꽝이면 처음으로 버튼 */}
          {result.isWin ? (
            <button 
              onClick={() => {
                console.log('🚨 당첨! 쿠폰받기 버튼 클릭됨!');
                
                // 모든 타이머 정리
                if (timeoutId) {
                  clearTimeout(timeoutId);
                  setTimeoutId(null);
                }
                
                // 쿠폰 정보 생성
                if (!couponCode) {
                  setCouponCode(generateCouponCode());
                  const expDate = new Date();
                  expDate.setDate(expDate.getDate() + 30);
                  setExpirationDate(expDate.toLocaleDateString('ko-KR'));
                }
                
                // Scene 5로 이동
                console.log('🎯 쿠폰 화면으로 이동!');
                setScene(5);
              }}
              style={{
                background: 'linear-gradient(45deg, #e74c3c, #c0392b)',
                border: '3px solid #fff',
                borderRadius: '30px',
                color: 'white',
                fontSize: '1.5rem',
                fontWeight: '800',
                padding: '20px 50px',
                cursor: 'pointer',
                boxShadow: '0 10px 30px rgba(231, 76, 60, 0.5)',
                display: 'block',
                margin: '0 auto',
                minWidth: '200px',
                transition: 'all 0.2s ease',
                transform: 'scale(1)',
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.transform = 'scale(1.05)';
                (e.target as HTMLElement).style.boxShadow = '0 15px 40px rgba(231, 76, 60, 0.7)';
                (e.target as HTMLElement).style.background = 'linear-gradient(45deg, #f39c12, #e67e22)';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.transform = 'scale(1)';
                (e.target as HTMLElement).style.boxShadow = '0 10px 30px rgba(231, 76, 60, 0.5)';
                (e.target as HTMLElement).style.background = 'linear-gradient(45deg, #e74c3c, #c0392b)';
              }}
            >
              💎 쿠폰 받기 💎
            </button>
          ) : (
            <button 
              onClick={() => {
                console.log('😢 꽝! 처음으로 버튼 클릭됨!');
                
                // 모든 타이머 정리
                if (timeoutId) {
                  clearTimeout(timeoutId);
                  setTimeoutId(null);
                }
                
                // 게임 상태 리셋
                setScene(1);
                setResult(null);
                setSelectedOrange(null);
                setCouponCode('');
                setExpirationDate('');
                
                console.log('🏠 처음 화면으로 이동!');
              }}
              style={{
                background: 'linear-gradient(45deg, #636e72, #2d3436)',
                border: '3px solid #fff',
                borderRadius: '30px',
                color: 'white',
                fontSize: '1.5rem',
                fontWeight: '800',
                padding: '20px 50px',
                cursor: 'pointer',
                boxShadow: '0 10px 30px rgba(99, 110, 114, 0.5)',
                display: 'block',
                margin: '0 auto',
                minWidth: '200px',
                transition: 'all 0.2s ease',
                transform: 'scale(1)',
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.transform = 'scale(1.05)';
                (e.target as HTMLElement).style.boxShadow = '0 15px 40px rgba(99, 110, 114, 0.7)';
                (e.target as HTMLElement).style.background = 'linear-gradient(45deg, #74b9ff, #0984e3)';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.transform = 'scale(1)';
                (e.target as HTMLElement).style.boxShadow = '0 10px 30px rgba(99, 110, 114, 0.5)';
                (e.target as HTMLElement).style.background = 'linear-gradient(45deg, #636e72, #2d3436)';
              }}
            >
              🏠 처음으로
            </button>
          )}

          <style>
            {`
              @keyframes firework {
                0% { transform: scale(0) rotate(0deg); opacity: 1; }
                50% { transform: scale(1) rotate(180deg); opacity: 0.8; }
                100% { transform: scale(1.2) rotate(360deg); opacity: 0; }
              }
            `}
          </style>
        </div>
      )}

      {/* Scene 5: 쿠폰 수령 */}
      {scene === 5 && (
        <div style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #00b894 0%, #00cec9 50%, #74b9ff 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          padding: '20px'
        }}>
          <h1 style={{ 
            fontSize: '2.8rem', 
            marginBottom: '20px',
            textShadow: '3px 3px 6px rgba(0,0,0,0.4)',
            fontWeight: '800',
            color: '#fff',
            textAlign: 'center'
          }}>
            🌲 신성의 숲 쿠폰 🌲
          </h1>
          
          <h2 style={{ 
            fontSize: '1.8rem', 
            marginBottom: '40px',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            fontWeight: '600',
            opacity: 0.9
          }}>
            축하합니다! 쿠폰을 받으세요.
          </h2>
          
          <div 
            id="coupon-card"
            style={{
              background: 'white',
              color: '#2d3436',
              padding: '50px 40px',
              borderRadius: '20px',
              textAlign: 'center',
              boxShadow: '0 15px 40px rgba(0,0,0,0.3)',
              maxWidth: '90%',
              border: '3px dashed #00b894',
              position: 'relative'
            }}>
            <h3 style={{ 
              fontSize: '1.8rem', 
              marginBottom: '30px',
              color: '#00b894',
              fontWeight: '700'
            }}>
              {result ? result.name : '🍊 1000원 쿠폰'}
            </h3>
            
            <div style={{ marginBottom: '30px' }}>
              <p style={{ fontSize: '1.1rem', marginBottom: '10px', fontWeight: '600' }}>
                쿠폰 코드
              </p>
              <div style={{
                background: '#ddd',
                padding: '15px',
                borderRadius: '10px',
                fontSize: '1.5rem',
                fontWeight: '700',
                fontFamily: 'monospace',
                letterSpacing: '2px',
                color: '#2d3436'
              }}>
                {couponCode}
              </div>
            </div>
            
                         <div style={{ marginBottom: '30px' }}>
               <p style={{ fontSize: '1.1rem', marginBottom: '10px', fontWeight: '600' }}>
                 유효기간
               </p>
               <p style={{ fontSize: '1.3rem', color: '#e17055', fontWeight: '700' }}>
                 수령일로부터 1개월 ({expirationDate}까지)
               </p>
             </div>
             
             <div style={{ marginBottom: '20px' }}>
               <p style={{ fontSize: '1.1rem', marginBottom: '10px', fontWeight: '600' }}>
                 사용법
               </p>
               <p style={{ fontSize: '0.9rem', color: '#636e72' }}>
                 쿠폰을 저장하고, 신성의숲 인포메이션에 제시하세요
               </p>
             </div>
             
             <p style={{ 
               fontSize: '1rem', 
               color: '#00b894',
               fontWeight: '600',
               marginBottom: '20px'
             }}>
               내일도 귤나무를 골라보세요!
             </p>
             
             <p style={{ 
               fontSize: '0.9rem', 
               color: '#636e72',
               fontStyle: 'italic',
               textAlign: 'center',
               lineHeight: '1.4'
             }}>
               신성의 숲은 고객님의 더 좋은 만족을 위하여,<br />
               항상 최선을 다하겠습니다.
             </p>
          </div>
          
          {/* 버튼들 */}
          <div style={{
            display: 'flex',
            gap: '20px',
            marginTop: '30px',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            <button 
              onClick={async () => {
                try {
                  console.log('📷 고급 쿠폰 저장 시작');
                  
                  // 고해상도 캔버스 생성
                  const canvas = document.createElement('canvas');
                  const ctx = canvas.getContext('2d');
                  
                  // 쿠폰 크기 설정 (A4 비율에 맞춤, 고해상도)
                  canvas.width = 800;
                  canvas.height = 1000;
                  
                  if (ctx) {
                    // 전체 배경을 흰색으로
                    ctx.fillStyle = '#ffffff';
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                    
                    // 배경에 미묘한 패턴 추가
                    ctx.fillStyle = '#f8f9fa';
                    for (let i = 0; i < canvas.width; i += 40) {
                      for (let j = 0; j < canvas.height; j += 40) {
                        if ((i + j) % 80 === 0) {
                          ctx.fillRect(i, j, 20, 20);
                        }
                      }
                    }
                    
                    // 상단 여백과 메인 배경
                    const topMargin = 60;
                    const sideMargin = 60;
                    const cardWidth = canvas.width - sideMargin * 2;
                    const cardHeight = canvas.height - topMargin * 2;
                    
                    // 메인 카드 배경 (그라데이션)
                    const gradient = ctx.createLinearGradient(0, topMargin, 0, topMargin + cardHeight);
                    gradient.addColorStop(0, '#ffffff');
                    gradient.addColorStop(0.1, '#f8f9fa');
                    gradient.addColorStop(0.9, '#e9ecef');
                    gradient.addColorStop(1, '#dee2e6');
                    
                    ctx.fillStyle = gradient;
                    ctx.fillRect(sideMargin, topMargin, cardWidth, cardHeight);
                    
                    // 테두리 (이중 선)
                    ctx.strokeStyle = '#00b894';
                    ctx.lineWidth = 4;
                    ctx.strokeRect(sideMargin, topMargin, cardWidth, cardHeight);
                    
                    ctx.strokeStyle = '#00b894';
                    ctx.lineWidth = 2;
                    ctx.strokeRect(sideMargin + 15, topMargin + 15, cardWidth - 30, cardHeight - 30);
                    
                    // 점선 테두리 효과
                    ctx.setLineDash([10, 5]);
                    ctx.strokeStyle = '#74b9ff';
                    ctx.lineWidth = 2;
                    ctx.strokeRect(sideMargin + 30, topMargin + 30, cardWidth - 60, cardHeight - 60);
                    ctx.setLineDash([]);
                    
                    // 상단 로고 영역 배경
                    const headerGradient = ctx.createLinearGradient(0, topMargin + 50, 0, topMargin + 150);
                    headerGradient.addColorStop(0, 'rgba(0, 184, 148, 0.1)');
                    headerGradient.addColorStop(1, 'rgba(0, 184, 148, 0.03)');
                    ctx.fillStyle = headerGradient;
                    ctx.fillRect(sideMargin + 30, topMargin + 50, cardWidth - 60, 100);
                    
                    // 텍스트 설정
                    ctx.textAlign = 'center';
                    ctx.fillStyle = '#00b894';
                    
                    // 메인 제목
                    ctx.font = 'bold 48px "Nexon Lv1 Gothic OTF", Arial, sans-serif';
                    ctx.fillText('🌲 신성의 숲 쿠폰 🌲', canvas.width / 2, topMargin + 110);
                    
                    // 부제목
                    ctx.font = 'bold 32px "Nexon Lv1 Gothic OTF", Arial, sans-serif';
                    ctx.fillStyle = '#2d3436';
                    ctx.fillText('FOREST COUPON', canvas.width / 2, topMargin + 160);
                    
                    // 구분선
                    ctx.strokeStyle = '#00b894';
                    ctx.lineWidth = 3;
                    ctx.beginPath();
                    ctx.moveTo(sideMargin + 100, topMargin + 190);
                    ctx.lineTo(canvas.width - sideMargin - 100, topMargin + 190);
                    ctx.stroke();
                    
                    // 상품명
                    ctx.font = 'bold 42px "Nexon Lv1 Gothic OTF", Arial, sans-serif';
                    ctx.fillStyle = '#e74c3c';
                    ctx.fillText(result ? result.name : '🍊 1000원 쿠폰', canvas.width / 2, topMargin + 270);
                    
                    // 쿠폰코드 섹션 배경
                    ctx.fillStyle = '#f1f2f6';
                    ctx.fillRect(sideMargin + 60, topMargin + 320, cardWidth - 120, 120);
                    ctx.strokeStyle = '#ddd';
                    ctx.lineWidth = 2;
                    ctx.strokeRect(sideMargin + 60, topMargin + 320, cardWidth - 120, 120);
                    
                    // 쿠폰 코드 라벨
                    ctx.font = 'bold 24px "Nexon Lv1 Gothic OTF", Arial, sans-serif';
                    ctx.fillStyle = '#636e72';
                    ctx.fillText('쿠폰 코드', canvas.width / 2, topMargin + 350);
                    
                    // 쿠폰 코드
                    ctx.font = 'bold 36px "Courier New", monospace';
                    ctx.fillStyle = '#2d3436';
                    ctx.fillText(couponCode, canvas.width / 2, topMargin + 400);
                    
                    // 유효기간
                    ctx.font = 'bold 28px "Nexon Lv1 Gothic OTF", Arial, sans-serif';
                    ctx.fillStyle = '#e17055';
                    ctx.fillText('유효기간', canvas.width / 2, topMargin + 480);
                    
                    ctx.font = '24px "Nexon Lv1 Gothic OTF", Arial, sans-serif';
                    ctx.fillStyle = '#2d3436';
                    ctx.fillText(`${expirationDate}까지`, canvas.width / 2, topMargin + 520);
                    
                    // 사용법 섹션
                    ctx.font = 'bold 24px "Nexon Lv1 Gothic OTF", Arial, sans-serif';
                    ctx.fillStyle = '#636e72';
                    ctx.fillText('사용법', canvas.width / 2, topMargin + 580);
                    
                    ctx.font = '20px "Nexon Lv1 Gothic OTF", Arial, sans-serif';
                    ctx.fillStyle = '#2d3436';
                    ctx.fillText('신성의숲 인포메이션에 이 쿠폰을 제시하세요', canvas.width / 2, topMargin + 620);
                    
                    // 장식적 요소들
                    ctx.fillStyle = '#00b894';
                    ctx.font = '30px Arial';
                    ctx.fillText('🌿', sideMargin + 80, topMargin + 700);
                    ctx.fillText('🌿', canvas.width - sideMargin - 80, topMargin + 700);
                    ctx.fillText('🍊', sideMargin + 120, topMargin + 750);
                    ctx.fillText('🍊', canvas.width - sideMargin - 120, topMargin + 750);
                    
                    // 하단 문구
                    ctx.font = 'bold 20px "Nexon Lv1 Gothic OTF", Arial, sans-serif';
                    ctx.fillStyle = '#00b894';
                    ctx.fillText('내일도 귤나무를 골라보세요!', canvas.width / 2, topMargin + 730);
                    
                    ctx.font = '16px "Nexon Lv1 Gothic OTF", Arial, sans-serif';
                    ctx.fillStyle = '#636e72';
                    ctx.fillText('신성의 숲은 고객님의 더 좋은 만족을 위하여', canvas.width / 2, topMargin + 780);
                    ctx.fillText('항상 최선을 다하겠습니다.', canvas.width / 2, topMargin + 810);
                    
                    // QR코드 영역 (실제 QR은 아니지만 QR처럼 보이는 패턴)
                    ctx.fillStyle = '#2d3436';
                    const qrSize = 80;
                    const qrX = canvas.width - sideMargin - 60 - qrSize;
                    const qrY = topMargin + cardHeight - 150;
                    
                    // QR 배경
                    ctx.fillRect(qrX, qrY, qrSize, qrSize);
                    
                    // QR 패턴 (간단한 체크무늬)
                    ctx.fillStyle = '#ffffff';
                    for (let i = 0; i < 8; i++) {
                      for (let j = 0; j < 8; j++) {
                        if ((i + j) % 2 === 0) {
                          const cellSize = qrSize / 8;
                          ctx.fillRect(qrX + i * cellSize, qrY + j * cellSize, cellSize, cellSize);
                        }
                      }
                    }
                    
                    // QR 라벨
                    ctx.font = '12px "Nexon Lv1 Gothic OTF", Arial, sans-serif';
                    ctx.fillStyle = '#636e72';
                    ctx.textAlign = 'right';
                    ctx.fillText('신성의숲', qrX + qrSize, qrY + qrSize + 20);
                    
                    // 이미지 다운로드
                    const link = document.createElement('a');
                    link.download = `신성의숲_고급쿠폰_${couponCode}.png`;
                    link.href = canvas.toDataURL('image/png', 1.0);
                    link.click();
                    
                    console.log('✅ 고급 쿠폰 저장 완료');
                  }
                } catch (error) {
                  console.error('❌ 쿠폰 저장 실패:', error);
                  alert('쿠폰 저장에 실패했습니다.\n스크린샷을 찍어서 저장해주세요!');
                }
              }}
              style={{
                background: 'linear-gradient(45deg, #e74c3c, #c0392b)',
                border: '2px solid white',
                borderRadius: '25px',
                color: 'white',
                fontSize: '1.2rem',
                fontWeight: '700',
                padding: '15px 30px',
                cursor: 'pointer',
                boxShadow: '0 5px 15px rgba(231, 76, 60, 0.4)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.transform = 'translateY(-2px)';
                (e.target as HTMLElement).style.boxShadow = '0 8px 20px rgba(231, 76, 60, 0.6)';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.transform = 'translateY(0)';
                (e.target as HTMLElement).style.boxShadow = '0 5px 15px rgba(231, 76, 60, 0.4)';
              }}
            >
              💾 고급 쿠폰 저장
            </button>
            
            <button 
              onClick={() => {
                // 기존 타이머가 있으면 클리어
                if (timeoutId) {
                  clearTimeout(timeoutId);
                  setTimeoutId(null);
                }
                
                setScene(1);
                setResult(null);
                setSelectedOrange(null);
                setCouponCode('');
                setExpirationDate('');
              }}
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                border: '2px solid white',
                borderRadius: '25px',
                color: 'white',
                fontSize: '1.1rem',
                padding: '12px 35px',
                cursor: 'pointer',
                fontWeight: '600',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.background = 'rgba(255, 255, 255, 0.3)';
                (e.target as HTMLElement).style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.background = 'rgba(255, 255, 255, 0.2)';
                (e.target as HTMLElement).style.transform = 'translateY(0)';
              }}
            >
              🏠 새 게임 시작
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
