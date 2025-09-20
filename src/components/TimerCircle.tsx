import React from 'react';
import "./TimerCircle.css"

interface TimerCircleProps {
    timeLeft: number;
    totalTime: number;
    isWork: boolean;
    isRunning: boolean;
    workSessions: number;
    onClick: () => void;
}

export const TimerCircle: React.FC<TimerCircleProps> = ({
    timeLeft,
    totalTime,
    isWork,
    isRunning,
    workSessions,
    onClick
}) => {
    const progress = isWork
        ? (timeLeft / totalTime)     // refill during break
        : 1 - (timeLeft / totalTime); // drain during work

    const formatTime = (seconds: number) => {
        const m = String(Math.floor(seconds / 60)).padStart(2, '0');
        const s = String(seconds % 60).padStart(2, '0');
        return `${m}:${s}`;
    };

    const sessionType = isWork ? "Work" : workSessions % 4 === 0 ? "Long Break" : "Short Break";
    const actionText = isRunning ? "Click to Pause" : "Click to Start";

    return (
        <div
            onClick={onClick}
            className={`
                w-64 md:w-80 lg:w-96
                h-64 md:h-80 lg:h-96
                bg-gray-500
                rounded-full relative
                overflow-hidden cursor-pointer shadow-lg
                transition-[scale] duration-200 ease-out hover:scale-105
            `}
        >
            {/* Animated liquid fill */}
            <div
                className={`
                    absolute bottom-0 left-0 w-full
                    transition-height-color
                    overflow-hidden
                    ${isWork ? 'bg-red-400' : 'bg-blue-400'}
                `}
                style={{
                    height: `${progress * 100}%`,
                } as React.CSSProperties}
            >
                {isRunning && [
                    <div className="bubble" />,
                    <div className="bubble" />,
                    <div className="bubble" />,
                    <div className="bubble" />,
                    <div className="bubble" />
                ]}
            </div>

            {/* Timer content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <div className="text-4xl md:text-5xl lg:text-6xl font-bold">
                    {formatTime(timeLeft)}
                </div>
                <div className="text-xl md:text-2xl lg:text-3xl mt-2">
                    {sessionType}
                </div>
                <div className="mt-2 text-sm md:text-base opacity-75">
                    {actionText}
                </div>
            </div>
        </div >
    );
};

export default TimerCircle;
