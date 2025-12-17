import { useEffect, useState } from 'react';
import { Clock, Zap } from 'lucide-react';

interface GameStatsProps {
  moves: number;
  matchedPairs: number;
  gridSize: 4 | 6 | 8;
  theme: 'animals' | 'emojis' | 'flags';
  isGameActive: boolean;
  onTimeUpdate?: (seconds: number) => void;
}

/**
 * GameStats Component
 * 
 * Displays game statistics: moves counter, timer, and best score.
 * Design: Soft pastel minimalism with card-like containers.
 * - Real-time timer that starts when game begins
 * - Move counter
 * - Best score display (retrieved from localStorage)
 */
export default function GameStats({
  moves,
  matchedPairs,
  gridSize,
  theme,
  isGameActive,
  onTimeUpdate,
}: GameStatsProps) {
  const [seconds, setSeconds] = useState(0);
  const [bestScore, setBestScore] = useState<number | null>(null);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isGameActive) {
      interval = setInterval(() => {
        setSeconds(prev => {
          const newSeconds = prev + 1;
          onTimeUpdate?.(newSeconds);
          return newSeconds;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isGameActive, onTimeUpdate]);

  // Load best score from localStorage
  useEffect(() => {
    const key = `best_score_${gridSize}x${gridSize}_${theme}`;
    const stored = localStorage.getItem(key);
    if (stored) {
      setBestScore(parseInt(stored));
    }
  }, [gridSize, theme]);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const totalCards = (gridSize * gridSize) / 2;
  const progress = Math.round((matchedPairs / totalCards) * 100);

  return (
    <div className="w-full space-y-4">
      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3">
        {/* Moves */}
        <div className="card-game p-4 rounded-2xl">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-5 h-5 text-purple-400" />
            <span className="text-xs font-accent text-gray-600 dark:text-gray-300">Moves</span>
          </div>
          <div className="text-3xl font-display text-purple-600 dark:text-purple-400">{moves}</div>
        </div>

        {/* Timer */}
        <div className="card-game p-4 rounded-2xl">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-5 h-5 text-mint-400" />
            <span className="text-xs font-accent text-gray-600 dark:text-gray-300">Time</span>
          </div>
          <div className="text-2xl text-center font-display text-mint-600 dark:text-mint-400 font-mono">
            {formatTime(seconds)}
          </div>
        </div>

        {/* Matched Pairs */}
        <div className="card-game p-4 rounded-2xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-accent text-gray-600 dark:text-gray-300">Pairs</span>
          </div>
          <div className="text-3xl font-display text-peach-600 dark:text-peach-400">
            {matchedPairs}/{totalCards}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="card-game p-4 rounded-2xl">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-accent text-gray-600">Progress</span>
          <span className="text-sm font-accent text-gray-600">{progress}%</span>
        </div>
        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-linear-to-r from-purple-400 to-mint-400 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Best Score */}
      {bestScore !== null && (
        <div className="card-game p-4 rounded-2xl">
          <span className="text-xs font-accent text-gray-600">Best Score (Moves)</span>
          <div className="text-2xl font-display text-gray-700 mt-1">{bestScore}</div>
        </div>
      )}
    </div>
  );
}
