import React, { useState, useEffect, useRef } from 'react';
import OptionManager from './OptionManager';
import { LuckyWheel } from '@lucky-canvas/react'

interface WheelOption {
  range: number;
  background: string;
  fonts?: Array<{
    text: string;
    top?: string | number;
    fontColor?: string;
    fontSize?: string | number;
    fontWeight?: string | number;
  }>;
  imgs?: Array<{
    src: string;
    width?: string | number;
    height?: string | number;
    top?: string | number;
  }>;
}

interface WheelButton {
  radius: string;
  background: string;
  pointer?: boolean;
  fonts?: Array<{
    text: string;
    top?: string | number;
    fontColor?: string;
    fontSize?: string | number;
    fontWeight?: string | number;
  }>;
}

const Wheel: React.FC = () => {
  const [options, setOptions] = useState<WheelOption[]>(() => {
    return [
      {
        range: 20,
        background: '#FF6B6B',
        fonts: [{ text: '0.1g金子', fontColor: '#ffffff', fontSize: 14 }],
        imgs: [{ src: '/img/gold.png', width: '30px', top: '20px' }]
      },
      {
        range: 30,
        background: '#4ECDC4',
        fonts: [{ text: '10元现金', fontColor: '#ffffff', fontSize: 14 }],
        imgs: [{ src: '/img/money.png', width: '30px', top: '20px' }]
      },
      {
        range: 50,
        background: '#45B7D1',
        fonts: [{ text: '盲盒', fontColor: '#ffffff', fontSize: 14 }],
        imgs: [{ src: '/img/treasure.png', width: '30px', top: '20px' }]
      },
    ];
  });

  useEffect(() => {
    const savedOptions = localStorage.getItem('wheelOptions');
    if (savedOptions) {
      setOptions(JSON.parse(savedOptions));
    }
  }, [])

  const [result, setResult] = useState<string | null>(null);

  const [blocks] = useState([
    { padding: '10px', background: '#869cfa' }
  ])
  const [prizes, setPrizes] = useState<any[]>([])
  const [buttons, setButtons] = useState<WheelButton[]>(() => {
    return [
      { radius: '40%', background: '#617df2' },
      { radius: '35%', background: '#afc8ff' },
      {
        radius: '30%', background: '#869cfa',
        pointer: true,
        fonts: [{ text: '开始', top: '-10px' }]
      }
    ];
  });

  // useEffect(() => {
  //   const savedButtons = localStorage.getItem('wheelButtons');
  //   if (savedButtons) {
  //     setButtons(JSON.parse(savedButtons));
  //   }
  // }, []);

  useEffect(() => {
    localStorage.setItem('wheelButtons', JSON.stringify(buttons));
  }, [buttons]);

  const myLucky = useRef<any>(null)

  useEffect(() => {
    setOptions((prevOptions) => {
      const savedOptions = localStorage.getItem('wheelOptions');
      return savedOptions ? JSON.parse(savedOptions) : [
        { range: 20, background: '#FF6B6B' },
        { range: 30, background: '#4ECDC4' },
        { range: 50, background: '#45B7D1' },
      ];
    })
  }, [])

  useEffect(() => {
    localStorage.setItem('wheelOptions', JSON.stringify(options));
  }, [options]);

  useEffect(() => {
    // 直接使用options作为prizes
    setPrizes(options);
  }, [options])

  const handleStart = () => {
    if (myLucky.current) {
      myLucky.current.play()
      
      // 在一定时间后停止转盘
      setTimeout(() => {
        // 计算总范围
        const totalRange = options.reduce((sum, option) => sum + option.range, 0);
        
        // 生成随机数
        const random = Math.random() * totalRange;
        
        // 根据随机数和range确定中奖索引
        let currentSum = 0;
        const winningIndex = options.findIndex(option => {
          currentSum += option.range;
          return random <= currentSum;
        });

        // 停止在选中的奖品上
        myLucky.current.stop(winningIndex);
      }, 5000); // 5秒后停止，您��以根据需要调整这个时间
    }
  }

  return (
    <div>
      <LuckyWheel
        ref={myLucky}
        width="300px"
        height="300px"
        blocks={blocks}
        prizes={prizes}
        buttons={buttons}
        onStart={handleStart}
        onEnd={(prize: { fonts: { text: any; }[]; }) => {
          setResult(prize.fonts?.[0]?.text || null)
        }}
      />
      {result && (
        <div
          style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#ff4d4f',
            textAlign: 'center',
            margin: '20px 0',
            animation: 'bounce 0.5s ease infinite alternate'
          }}
        >
          恭喜！您抽中了：
          <span
            style={{
              display: 'inline-block',
              animation: 'tada 1s ease infinite'
            }}
          >
            {result}
          </span>
        </div>
      )}
      <style jsx>{`
        @keyframes bounce {
          from { transform: translateY(0); }
          to { transform: translateY(-10px); }
        }
        @keyframes tada {
          0% { transform: scale(1); }
          10%, 20% { transform: scale(0.9) rotate(-3deg); }
          30%, 50%, 70%, 90% { transform: scale(1.1) rotate(3deg); }
          40%, 60%, 80% { transform: scale(1.1) rotate(-3deg); }
          100% { transform: scale(1) rotate(0); }
        }
      `}</style>
      <OptionManager 
        options={options} 
        setOptions={setOptions} 
        buttons={buttons}
        setButtons={setButtons}
      />
    </div>
  );
};

export default Wheel;