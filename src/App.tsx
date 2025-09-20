import { useState, useEffect } from "react";
import { Cog6ToothIcon, ArrowRightIcon, ArrowPathIcon } from "@heroicons/react/24/outline";
import { playSound } from 'react-sounds';
import { SettingsModal } from "./components/SettingsModal";
import TimerCircle from "./components/TimerCircle";

export default function App() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isWork, setIsWork] = useState(true);
  const [workSessions, setWorkSessions] = useState(0);

  const [showSettings, setShowSettings] = useState(false);

  // Settings state
  const [workMinutes, setWorkMinutes] = useState(25);
  const [shortBreakMinutes, setShortBreakMinutes] = useState(5);
  const [longBreakMinutes, setLongBreakMinutes] = useState(15);
  const [longBreakInterval, setLongBreakInterval] = useState(4);
  const [autoStart, setAutoStart] = useState(true);
  const [notify, setNotify] = useState(true);

  const playCompletedSound = () => playSound("notification/completed");

  const getTimeForSession = (isWorkSession: boolean, sessions: number) =>
    isWorkSession
      ? workMinutes * 60
      : sessions % longBreakInterval === 0
        ? longBreakMinutes * 60
        : shortBreakMinutes * 60;

  useEffect(() => {
    setTimeLeft(getTimeForSession(isWork, workSessions))
  }, [workMinutes, shortBreakMinutes, longBreakMinutes])

  // Timer logic
  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setTimeLeft(t => {
        if (t > 0) return t - 1;

        // Time's up
        if (notify) playCompletedSound();

        if (isWork) setWorkSessions(prev => prev + 1);
        setIsWork(!isWork)

        if (!autoStart) setIsRunning(false);

        return getTimeForSession(!isWork, isWork ? workSessions + 1 : workSessions);
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, isWork, workMinutes, shortBreakMinutes, autoStart]);

  const toggleTimer = () => setIsRunning(!isRunning);

  const handleSkip = () => {
    setTimeLeft(getTimeForSession(!isWork, isWork ? workSessions + 1 : workSessions));

    if (isWork) setWorkSessions(prev => prev + 1);
    setIsWork(!isWork);

    if (!autoStart) setIsRunning(false);
  };

  const handleReset = () => {
    setTimeLeft(getTimeForSession(isWork, workSessions));
    setIsRunning(false);
  };

  return (
    <div className="relative min-h-screen bg-gray-600">
      <button
        onClick={() => setShowSettings(true)}
        disabled={isRunning}
        className={`absolute top-4 right-4 p-2 rounded-full text-gray-200 transition-colors duration-200
          ${isRunning ? "cursor-not-allowed text-gray-500" : "hover:text-white hover:bg-gray-500"}`}
        title="Settings"
      >
        <Cog6ToothIcon className="w-6 h-6" />
      </button>

      <div className="flex flex-col items-center justify-center min-h-screen">
        <TimerCircle
          timeLeft={timeLeft}
          totalTime={getTimeForSession(isWork, workSessions)}
          isWork={isWork}
          isRunning={isRunning}
          workSessions={workSessions}
          onClick={toggleTimer}
        />
        <div className="flex gap-4 mt-4">
          <button
            onClick={handleReset}
            disabled={isRunning}
            className={`p-2 rounded-full text-gray-200 transition-colors duration-200
              ${isRunning ? "cursor-not-allowed text-gray-500" : "hover:text-white hover:bg-gray-500"}`}
            title="Reset current session"
          >
            <ArrowPathIcon className="w-6 h-6" />
          </button>
          <button
            onClick={handleSkip}
            disabled={isRunning}
            className={`p-2 rounded-full text-gray-200 transition-colors duration-200
                ${isRunning ? "cursor-not-allowed text-gray-500" : "hover:text-white hover:bg-gray-500"}`}
            title="Skip to next session"
          >
            <ArrowRightIcon className="w-6 h-6" />
          </button>
        </div>
      </div>

      <SettingsModal
        showSettings={showSettings}
        workMinutes={workMinutes}
        shortBreakMinutes={shortBreakMinutes}
        longBreakMinutes={longBreakMinutes}
        longBreakInterval={longBreakInterval}
        autoStart={autoStart}
        notify={notify}
        onWorkMinutesChange={setWorkMinutes}
        onShortBreakMinutesChange={setShortBreakMinutes}
        onLongBreakMinutesChange={setLongBreakMinutes}
        onLongBreakIntervalChange={setLongBreakInterval}
        onAutoStartChange={setAutoStart}
        onNotifyChange={setNotify}
        onClose={() => setShowSettings(false)}
      />
    </div >
  );
}
