
import { Container } from "./UI/Container";
import { useTimersContext, type Timer as TimerProps } from "./store/timers-context";
import react, { useState, useEffect, useRef } from 'react';

export default function TimerDesign({ name, duration }: TimerProps) {

    const interval = useRef<number | null>(null);
    const [remainingTime, setRemainingTime] = useState<number>(duration * 1000);
    const { isRunning } = useTimersContext();

    if (remainingTime <= 0 && interval.current) {
        clearInterval(interval.current)
    }

    useEffect(() => {
        let timer: number;
        if (isRunning) {
            timer = interval.current = setInterval(function () {
                setRemainingTime(prevTime => {
                    return (prevTime - 50)
                })
            }, 50)
        } else if (!isRunning) {
            clearInterval(interval.current)
        }

        setRemainingTime((prevTime) => {
            if (prevTime <= 0) {
                return prevTime
            }
            return prevTime - 50
        });



        return () => {
            clearInterval(timer)
        }

    }, [isRunning])

    const formattedRemainingTime = (remainingTime / 1000).toFixed(2);


    return (
        <Container as="article">
            <h2>{name}</h2>
            <p><progress max={duration * 1000} value={remainingTime} /></p>
            <p>{formattedRemainingTime}</p>
        </Container>
    )
}