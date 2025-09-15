import { useState, useEffect } from "react";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import { SettingsModal } from "./components/SettingsModal";
import TimerCircle from "./components/TimerCircle";

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
        if (t > 0) return t - 1;

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


  return (
    <div className="relative min-h-screen bg-gray-600">
      <button
        onClick={() => setShowSettings(true)}
        disabled={isRunning}
        className={`absolute top-4 right-4 p-2 rounded-full transition-colors duration-200 ${isRunning
          ? "cursor-not-allowed"
          : "hover:bg-gray-500"
          }`}
        title="Settings"
      >
        <Cog6ToothIcon className="w-6 h-6 text-white" />
      </button>

      <div className="flex flex-col items-center justify-center min-h-screen">
        <TimerCircle
          timeLeft={timeLeft}
          totalTime={isWork ? workMinutes * 60 : shortBreakMinutes * 60}
          isWork={isWork}
          isRunning={isRunning}
          workSessions={workSessions}
          onClick={toggleTimer}
        />
      </div>

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
