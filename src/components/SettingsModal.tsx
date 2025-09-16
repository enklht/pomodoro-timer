import { XMarkIcon } from '@heroicons/react/24/outline';
import React from 'react';

interface SettingsModalProps {
    showSettings: boolean;
    workMinutes: number;
    shortBreakMinutes: number;
    longBreakMinutes: number;
    autoStart: boolean;
    notify: boolean,
    onWorkMinutesChange: (minutes: number) => void;
    onShortBreakMinutesChange: (minutes: number) => void;
    onLongBreakMinutesChange: (minutes: number) => void;
    onAutoStartChange: (autoStart: boolean) => void;
    onNotifyChange: (notify: boolean) => void;
    onClose: () => void;
}

export function SettingsModal({
    showSettings,
    workMinutes,
    shortBreakMinutes,
    longBreakMinutes,
    autoStart,
    notify,
    onWorkMinutesChange,
    onShortBreakMinutesChange,
    onLongBreakMinutesChange,
    onAutoStartChange,
    onNotifyChange,
    onClose,
}: SettingsModalProps) {
    if (!showSettings) return null;

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center z-50"
            onClick={handleOverlayClick}
        >
            <div className="bg-gray-600 text-white p-6 rounded shadow-lg w-80 sm:w-96 relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-1 hover:bg-gray-500 rounded-full transition-colors"
                    aria-label="Close settings"
                >
                    <XMarkIcon className="h-6 w-6" />
                </button>
                <h2 className="text-xl font-bold mb-4">Settings</h2>

                <div className="mb-4">
                    <label className="block mb-1">Work (min)</label>
                    <input
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        value={workMinutes}
                        onChange={(e) => onWorkMinutesChange(Number(e.target.value))}
                        className="w-full border rounded px-2 py-1"
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-1">Short Break (min)</label>
                    <input
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        value={shortBreakMinutes}
                        onChange={(e) => onShortBreakMinutesChange(Number(e.target.value))}
                        className="w-full border rounded px-2 py-1"
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-1">Long Break (min)</label>
                    <input
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        value={longBreakMinutes}
                        onChange={(e) => onLongBreakMinutesChange(Number(e.target.value))}
                        className="w-full border rounded px-2 py-1"
                    />
                </div>

                <div className="mb-4 flex items-center">
                    <label>
                        <input
                            type="checkbox"
                            id="autostart"
                            checked={autoStart}
                            onChange={(e) => onAutoStartChange(e.target.checked)}
                            className="mr-2"
                        />
                        Auto Start
                    </label>
                </div>

                <div className="mb-4 flex items-center">
                    <label>
                        <input
                            type="checkbox"
                            id="autostart"
                            checked={notify}
                            onChange={(e) => onNotifyChange(e.target.checked)}
                            className="mr-2"
                        />
                        Notify
                    </label>
                </div>

                <div className="mb-4 flex items-center">
                    <label>
                        <input
                            type="checkbox"
                            id="autostart"
                            checked={notify}
                            onChange={(e) => onNotifyChange(e.target.checked)}
                            className="mr-2"
                        />
                        Notify
                    </label>
                </div>
            </div>
        </div>
    );
}
