import React, { useState, useEffect } from "react";

interface NumberCounterProps {
  originNum: number;
  targetNum: number;
}

const NumberCounter: React.FC<NumberCounterProps> = ({
  originNum,
  targetNum,
}) => {
  const [currentNum, setCurrentNum] = useState(originNum);

  useEffect(() => {
    if (targetNum === 0) return;
    let frameId: number;

    const animateNumber = () => {
      const step = (targetNum - originNum) / 10; // Adjust the animation speed as needed
      setCurrentNum((prevNum) => {
        const newNum = prevNum + step;
        return newNum < targetNum ? newNum : targetNum;
      });

      if (currentNum < targetNum) {
        frameId = requestAnimationFrame(animateNumber);
      }
    };

    animateNumber();

    return () => cancelAnimationFrame(frameId);
  }, [originNum, targetNum, setCurrentNum]);

  return <>{currentNum?.toFixed(2)}</>;
};

export default NumberCounter;
