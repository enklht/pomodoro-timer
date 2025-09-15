import React from 'react';

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
    const progressHeight = isWork
        ? (timeLeft / totalTime) * 100     // refill during break
        : 100 - (timeLeft / totalTime) * 100; // drain during work

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
        w-40 sm:w-64 md:w-80 lg:w-96
        h-40 sm:h-64 md:h-80 lg:h-96
        rounded-full
        relative
        overflow-hidden
        cursor-pointer
        shadow-lg
        transition-transform duration-200 ease-out hover:scale-110
      `}
        >
            {/* Animated liquid fill */}
            <div
                className={`
                    absolute bottom-0 left-0 w-full
                    transition-[height] duration-1000 linear
                    ${isWork ? 'bg-red-400' : 'bg-blue-400'}
                `}
                style={{ height: `${progressHeight}%` }}
            />

            {/* Timer content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <div className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
                    {formatTime(timeLeft)}
                </div>
                <div className="text-base sm:text-xl md:text-2xl lg:text-3xl mt-2">
                    {sessionType}
                </div>
                <div className="mt-2 text-xs sm:text-sm md:text-base opacity-75">
                    {actionText}
                </div>
            </div>
        </div>
    );
};

export default TimerCircle;
