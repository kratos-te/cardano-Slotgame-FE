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


