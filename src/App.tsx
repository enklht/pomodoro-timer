import { useState, useEffect } from "react";
import { SettingsModal } from "./components/SettingsModal";

export default function App() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isWork, setIsWork] = useState(true);
  const [workSessions, setWorkSessions] = useState(0);

  const [showSettings, setShowSettings] = useState(false);

  // Settings state
  const [workMinutes, setWorkMinutes] = useState(0.05);
  const [shortBreakMinutes, setShortBreakMinutes] = useState(0.05);
  const [longBreakMinutes, setLongBreakMinutes] = useState(0.05);
  const [autoStart, setAutoStart] = useState(true);

  // Update timer when work/break length changes
  useEffect(() => {
    setTimeLeft(isWork ? workMinutes * 60 : shortBreakMinutes * 60);
  }, [workMinutes, shortBreakMinutes, isWork]);

  // Timer logic
  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setTimeLeft(t => {
        if (t > 1) return t - 1;

        // Time's up
        if (!autoStart) setIsRunning(false);

        let nextTime: number;

        if (isWork) {
          setIsWork(false)
          setWorkSessions(prev => prev + 1);
          nextTime = workSessions % 4 === 0
            ? longBreakMinutes * 60
            : shortBreakMinutes * 60;
        } else {
          setIsWork(true)
          nextTime = workMinutes * 60;
        }

        return nextTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, isWork, workMinutes, shortBreakMinutes, autoStart]);

  const toggleTimer = () => setIsRunning(!isRunning);

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Timer Circle */}
      <div
        onClick={toggleTimer}
        className={`
          w-40 sm:w-64 md:w-80 lg:w-96
          h-40 sm:h-64 md:h-80 lg:h-96
          rounded-full
          flex flex-col items-center justify-center
          text-white cursor-pointer shadow-lg
          transition-transform duration-20 ease-out hover:scale-110
          transition-colors duration-500
          ${isWork ? "bg-red-400" : "bg-blue-400"}
        `}
      >
        <div className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
          {minutes}:{seconds}
        </div>
        <div className="text-base sm:text-xl md:text-2xl lg:text-3xl mt-2">
          {isWork ? "Work" : workSessions % 4 === 0 ? "Long Break" : "Short Break"}
        </div>
        <div className="mt-2 text-xs sm:text-sm md:text-base opacity-75">
          {isRunning ? "Click to Pause" : "Click to Start"}
        </div>
      </div>


      {/* Settings Button */}
      <button
        onClick={() => setShowSettings(true)}
        disabled={isRunning} // disable when timer is running
        className={`mt-8 px-4 py-2 rounded text-white
          ${isRunning
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-gray-600 hover:bg-gray-700"}`}
      >
        Settings
      </button>

      {/* Settings Modal */}
      <SettingsModal
        showSettings={showSettings}
        workMinutes={workMinutes}
        shortBreakMinutes={shortBreakMinutes}
        longBreakMinutes={longBreakMinutes}
        autoStart={autoStart}
        onWorkMinutesChange={setWorkMinutes}
        onShortBreakMinutesChange={setShortBreakMinutes}
        onLongBreakMinutesChange={setLongBreakMinutes}
        onAutoStartChange={setAutoStart}
        onClose={() => setShowSettings(false)}
      />
    </div>
  );
}
