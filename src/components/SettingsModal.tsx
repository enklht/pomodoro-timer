interface SettingsModalProps {
    showSettings: boolean;
    workMinutes: number;
    shortBreakMinutes: number;
    longBreakMinutes: number;
    autoStart: boolean;
    onWorkMinutesChange: (minutes: number) => void;
    onShortBreakMinutesChange: (minutes: number) => void;
    onLongBreakMinutesChange: (minutes: number) => void;
    onAutoStartChange: (autoStart: boolean) => void;
    onClose: () => void;
}

export function SettingsModal({
    showSettings,
    workMinutes,
    shortBreakMinutes,
    longBreakMinutes,
    autoStart,
    onWorkMinutesChange,
    onShortBreakMinutesChange,
    onLongBreakMinutesChange,
    onAutoStartChange,
    onClose,
}: SettingsModalProps) {
    if (!showSettings) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg w-80 sm:w-96">
                <h2 className="text-xl font-bold mb-4">Settings</h2>

                <div className="mb-4">
                    <label className="block mb-1">Work (min)</label>
                    <input
                        type="number"
                        value={workMinutes}
                        onChange={(e) => onWorkMinutesChange(Number(e.target.value))}
                        className="w-full border rounded px-2 py-1"
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-1">Short Break (min)</label>
                    <input
                        type="number"
                        value={shortBreakMinutes}
                        onChange={(e) => onShortBreakMinutesChange(Number(e.target.value))}
                        className="w-full border rounded px-2 py-1"
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-1">Long Break (min)</label>
                    <input
                        type="number"
                        value={longBreakMinutes}
                        onChange={(e) => onLongBreakMinutesChange(Number(e.target.value))}
                        className="w-full border rounded px-2 py-1"
                    />
                </div>

                <div className="mb-4 flex items-center">
                    <input
                        type="checkbox"
                        checked={autoStart}
                        onChange={(e) => onAutoStartChange(e.target.checked)}
                        className="mr-2"
                    />
                    <label>Auto Start</label>
                </div>

                <div className="flex justify-end space-x-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}
