import { useState, useEffect } from "react"
import axios from "axios";
import { API_URL } from "../config";

export function sleep(duration: number): Promise<void> {
    return new Promise(resolve => {
        const start = performance.now();

        function tick(timestamp: DOMHighResTimeStamp) {
            const elapsed = timestamp - start;
            if (elapsed >= duration) {
                resolve();
            } else {
                requestAnimationFrame(tick);
            }
        }

        requestAnimationFrame(tick);
    });
}

export function getRandomNumberInRange(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateRandomNumbers(length: number): number[] {
    const validNumbers = [0, 1, 2, 3, 4, 5, 6, 7];
    const randomNumbers: number[] = [];

    for (let i = 0; i < length; i++) {
        const randomIndex = getRandomNumberInRange(0, validNumbers.length - 1);
        const randomNumber = validNumbers[randomIndex];
        randomNumbers.push(randomNumber);
    }
    return randomNumbers;
}



export function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });
  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    // Add event listener
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}