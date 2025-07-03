import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Settings, Volume2, VolumeX, SkipForward } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../../store/useStore';
import toast from 'react-hot-toast';

type TimerMode = 'work' | 'shortBreak' | 'longBreak';

export const AdvancedPomodoro: React.FC = () => {
  const { timerSettings, updateTimerSettings, addStudySession } = useStore();
  const [timeLeft, setTimeLeft] = useState(timerSettings.workDuration * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<TimerMode>('work');
  const [cycle, setCycle] = useState(1);
  const [showSettings, setShowSettings] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const modeConfig = {
    work: { duration: timerSettings.workDuration, label: 'Làm việc', color: 'from-red-500 to-red-600' },
    shortBreak: { duration: timerSettings.shortBreak, label: 'Nghỉ ngắn', color: 'from-green-500 to-green-600' },
    longBreak: { duration: timerSettings.longBreak, label: 'Nghỉ dài', color: 'from-blue-500 to-blue-600' },
  };

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft]);

  useEffect(() => {
    if (timeLeft === 0 && isRunning) {
      handleTimerComplete();
    }
  }, [timeLeft, isRunning]);

  const handleTimerComplete = () => {
    setIsRunning(false);
    
    // Play notification sound
    if (!isMuted && audioRef.current) {
      audioRef.current.play().catch(() => {});
    }

    // Save study session
    if (mode === 'work') {
      addStudySession({
        duration: modeConfig[mode].duration * 60,
        subject: 'Pomodoro Session',
        date: new Date(),
        type: 'pomodoro',
      });
    }

    // Show notification
    toast.success(`${modeConfig[mode].label} hoàn thành!`);

    // Auto-advance to next mode
    if (timerSettings.autoStart) {
      setTimeout(() => {
        handleModeSwitch();
      }, 1000);
    }
  };

  const handleModeSwitch = () => {
    if (mode === 'work') {
      if (cycle % 4 === 0) {
        setMode('longBreak');
      } else {
        setMode('shortBreak');
      }
    } else {
      setMode('work');
      if (mode === 'shortBreak' || mode === 'longBreak') {
        setCycle(prev => prev + 1);
      }
    }
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(modeConfig[mode].duration * 60);
  };

  const switchMode = (newMode: TimerMode) => {
    setMode(newMode);
    setTimeLeft(modeConfig[newMode].duration * 60);
    setIsRunning(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((modeConfig[mode].duration * 60 - timeLeft) / (modeConfig[mode].duration * 60)) * 100;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Pomodoro Timer</h2>
        <p className="text-gray-600 dark:text-gray-400">Chu kỳ {cycle} • {modeConfig[mode].label}</p>
      </div>

      {/* Mode Selector */}
      <div className="flex justify-center mb-8">
        <div className="bg-gray-100 dark:bg-gray-700 rounded-full p-1 flex">
          {Object.entries(modeConfig).map(([key, config]) => (
            <button
              key={key}
              onClick={() => switchMode(key as TimerMode)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                mode === key
                  ? 'bg-white dark:bg-gray-600 text-gray-800 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white'
              }`}
            >
              {config.label}
            </button>
          ))}
        </div>
      </div>

      {/* Timer Display */}
      <div className="relative mb-8">
        <div className="w-64 h-64 mx-auto relative">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              className="text-gray-200 dark:text-gray-700"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="url(#gradient)"
              strokeWidth="3"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 45}`}
              strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
              className="transition-all duration-1000 ease-linear"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#8B5CF6" />
              </linearGradient>
            </defs>
          </svg>
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
                {formatTime(timeLeft)}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {Math.round(progress)}% hoàn thành
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center space-x-4 mb-6">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className={`w-16 h-16 rounded-full bg-gradient-to-r ${modeConfig[mode].color} text-white flex items-center justify-center hover:shadow-lg transition-all duration-300 transform hover:scale-105`}
        >
          {isRunning ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
        </button>
        
        <button
          onClick={resetTimer}
          className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
        
        <button
          onClick={handleModeSwitch}
          className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          <SkipForward className="w-5 h-5" />
        </button>
      </div>

      {/* Additional Controls */}
      <div className="flex justify-center space-x-4">
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>
        
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>

      {/* Settings Panel */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl"
          >
            <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Cài đặt Timer</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Thời gian làm việc (phút)
                </label>
                <input
                  type="number"
                  min="1"
                  max="60"
                  value={timerSettings.workDuration}
                  onChange={(e) => updateTimerSettings({ workDuration: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nghỉ ngắn (phút)
                </label>
                <input
                  type="number"
                  min="1"
                  max="30"
                  value={timerSettings.shortBreak}
                  onChange={(e) => updateTimerSettings({ shortBreak: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nghỉ dài (phút)
                </label>
                <input
                  type="number"
                  min="1"
                  max="60"
                  value={timerSettings.longBreak}
                  onChange={(e) => updateTimerSettings({ longBreak: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white"
                />
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="autoStart"
                  checked={timerSettings.autoStart}
                  onChange={(e) => updateTimerSettings({ autoStart: e.target.checked })}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label htmlFor="autoStart" className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Tự động chuyển chế độ
                </label>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hidden audio element for notifications */}
      <audio ref={audioRef} preload="auto">
        <source src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT" type="audio/wav" />
      </audio>
    </div>
  );
};