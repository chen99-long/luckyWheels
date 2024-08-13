// components/Wheel.tsx
import React, { useState, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import OptionManager from './OptionManager';

// ... (保留之前的样式定义)


const WheelContainer = styled.div`
  width: 300px;
  height: 300px;
  position: relative;
  margin: 50px auto;
`

const WheelSvg = styled(motion.div)`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  position: relative;
  overflow: hidden;
`

const SpinButton = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 10px 20px;
  font-size: 18px;
  cursor: pointer;
  z-index: 10;
`

const ResultDisplay = styled.div`
  margin-top: 20px;
  text-align: center;
  font-size: 1.2rem;
  font-weight: bold;
`;



const Wheel: React.FC = () => {

  // 音频
  const spinSound = useRef<HTMLAudioElement | null>(null);
  const winSound = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
      spinSound.current = new Audio('/sounds/spin.mp3');
      winSound.current = new Audio('/sounds/win.mp3');
  }, []);

  
  const [rotation, setRotation] = useState<number>(0);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [options, setOptions] = useState<WheelOption[]>(() => {
    // if (typeof window !== 'undefined') {
    //   const savedOptions = localStorage.getItem('wheelOptions');
    //   return savedOptions ? JSON.parse(savedOptions) : [
    //     { label: '选项1', probability: 0.2, color: '#FF6B6B' },
    //     { label: '选项2', probability: 0.3, color: '#4ECDC4' },
    //     { label: '选项3', probability: 0.5, color: '#45B7D1' },
    //   ];
    // }
    return [];
  });
  const [result, setResult] = useState<string | null>(null);

  useEffect(()=>{
    setOptions((prevOptions) => {
      const savedOptions = localStorage.getItem('wheelOptions');
      return savedOptions ? JSON.parse(savedOptions) : [
        { label: '选项1', probability: 0.2, color: '#FF6B6B' },
        { label: '选项2', probability: 0.3, color: '#4ECDC4' },
        { label: '选项3', probability: 0.5, color: '#45B7D1' },
      ];
    })
  },[])
  useEffect(() => {
    localStorage.setItem('wheelOptions', JSON.stringify(options));
  }, [options]);

  const spinWheel = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setResult(null);
    const newRotation = rotation + 1440 + Math.random() * 360;
    setRotation(newRotation);
    
    if (spinSound.current) {
      spinSound.current.currentTime = 0; // 重置音频到开始
      spinSound.current.play();
    }
    
    setTimeout(() => {
      setIsSpinning(false);
      const winningIndex = Math.floor((newRotation % 360) / (360 / options.length));
      setResult(options[winningIndex].label);
      
      if (spinSound.current) {
        spinSound.current.pause(); // 停止旋转音效
        spinSound.current.currentTime = 0; // 重置音频到开始
      }
      
      if (winSound.current) {
        winSound.current.currentTime = 0; // 重置音频到开始
        winSound.current.play();
        // const msg = new SpeechSynthesisUtterance(`恭喜！您抽中了${result}`);
        //     msg.lang = 'zh-CN';  // 设置语言为中文
        //     window.speechSynthesis.speak(msg);
      }
    }, 5000); // 动画持续时间
  };

  // 在组件卸载时停止所有音频
  useEffect(() => {
    return () => {
      if (spinSound.current) {
        spinSound.current.pause();
      }
      if (winSound.current) {
        winSound.current.pause();
      }
    };
  }, []);

  const renderSectors = () => {
    let startAngle = 0
    const total = options.reduce((sum, option) => sum + option.probability, 0)

    return options.map((option, index) => {
      const angle = (option.probability / total) * 360
      const endAngle = startAngle + angle
      const largeArcFlag = angle > 180 ? 1 : 0
      const x1 = 150 + 150 * Math.cos((startAngle * Math.PI) / 180)
      const y1 = 150 + 150 * Math.sin((startAngle * Math.PI) / 180)
      const x2 = 150 + 150 * Math.cos((endAngle * Math.PI) / 180)
      const y2 = 150 + 150 * Math.sin((endAngle * Math.PI) / 180)

      const pathData = `M150,150 L${x1},${y1} A150,150 0 ${largeArcFlag},1 ${x2},${y2} Z`

      const result = (
  
        <g key={index}>
          <path d={pathData} fill={option.color} />
          <text
            x={150 + 120 * Math.cos(((startAngle + angle / 2) * Math.PI) / 180)}
            y={150 + 120 * Math.sin(((startAngle + angle / 2) * Math.PI) / 180)}
            fill="white"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="12"
            transform={`rotate(${startAngle + angle / 2}, 
              ${150 + 120 * Math.cos(((startAngle + angle / 2) * Math.PI) / 180)}, 
              ${150 + 120 * Math.sin(((startAngle + angle / 2) * Math.PI) / 180)})`}
          >
            {option.label}
          </text>
        </g>
        
      )

      startAngle = endAngle
      return result
    })
  }

  return (
    <div>
      <WheelContainer>
        <AnimatePresence>
          <WheelSvg
            animate={{ rotate: rotation }}
            transition={{ duration: 5, type: "spring" }}
          >
            <svg width="100%" height="100%" viewBox="0 0 300 300">
              {renderSectors()}
            </svg>
          </WheelSvg>
        </AnimatePresence>
        <SpinButton onClick={spinWheel} disabled={isSpinning}>
          {isSpinning ? '旋转中...' : '旋转'}
        </SpinButton>
      </WheelContainer>
      {result && <ResultDisplay>恭喜！您抽中了：{result}</ResultDisplay>}
      <OptionManager options={options} setOptions={setOptions} />
    </div>
  );
};

export default Wheel;