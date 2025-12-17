import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';

interface GameControlsProps {
  theme: 'animals' | 'emojis' | 'flags';
  gridSize: 4 | 6 | 8;
  onThemeChange: (theme: 'animals' | 'emojis' | 'flags') => void;
  onGridSizeChange: (size: 4 | 6 | 8) => void;
  onReset: () => void;
}

/**
 * GameControls Component
 * 
 * Provides controls for theme selection, difficulty level, and game reset.
 * Design: Soft pastel minimalism with card-like containers and smooth transitions.
 * - Theme selector with visual indicators
 * - Difficulty level buttons (grid sizes)
 * - Reset button to start a new game
 */
export default function GameControls({
  theme,
  gridSize,
  onThemeChange,
  onGridSizeChange,
  onReset,
}: GameControlsProps) {
  const themes = [
    { id: 'animals', label: 'Animals', emoji: '🐶' },
    { id: 'emojis', label: 'Emojis', emoji: '😀' },
    { id: 'flags', label: 'Flags', emoji: '🇺🇸' },
  ];

  const difficulties = [
    { size: 4, label: 'Easy', cards: '4x4' },
    { size: 6, label: 'Medium', cards: '6x6' },
    { size: 8, label: 'Hard', cards: '8x8' },
  ];

  return (
    <div className="w-full space-y-6">
      {/* Theme Selector */}
      <div className="card-game p-6 rounded-2xl">
        <h3 className="text-lg font-display text-gray-700 dark:text-gray-200 mb-4">Theme</h3>
        <div className="grid grid-cols-3 gap-3">
          {themes.map(t => (
            <button
              key={t.id}
              onClick={() => onThemeChange(t.id as 'animals' | 'emojis' | 'flags')}
              className={`
                p-4 rounded-2xl font-accent text-center transition-all duration-300
                ${theme === t.id
                  ? 'bg-linear-to-br from-purple-300 to-mint-200 dark:from-purple-600 dark:to-mint-600 text-gray-800 dark:text-white shadow-lg scale-105'
                  : 'bg-white dark:bg-slate-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-600 shadow-md'
                }
              `}
            >
              <div className="text-2xl mb-2">{t.emoji}</div>
              <div className="text-xs font-semibold">{t.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Difficulty Selector */}
      <div className="card-game p-6 rounded-2xl">
        <h3 className="text-lg font-display text-gray-700 dark:text-gray-200 mb-4">Difficulty</h3>
        <div className="space-y-2">
          {difficulties.map(d => (
            <button
              key={d.size}
              onClick={() => onGridSizeChange(d.size as 4 | 6 | 8)}
              className={`
                w-full p-4 rounded-2xl font-accent transition-all duration-300 flex justify-between items-center
                ${gridSize === d.size
                  ? 'bg-linear-to-r from-purple-300 to-mint-200 dark:from-purple-600 dark:to-mint-600 text-gray-800 dark:text-white shadow-lg'
                  : 'bg-white dark:bg-slate-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-600 shadow-md'
                }
              `}
            >
              <span className="font-semibold">{d.label}</span>
              <span className="text-sm opacity-70">{d.cards}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Reset Button */}
      <button
        onClick={onReset}
        className={`
          w-full p-4 rounded-2xl font-accent font-semibold transition-all duration-300
          flex items-center justify-center gap-2
          bg-linear-to-r from-purple-400 to-mint-300 dark:from-purple-600 dark:to-mint-500 text-white shadow-lg
          hover:shadow-xl hover:scale-105 active:scale-95
        `}
      >
        <RotateCcw className="w-5 h-5" />
        New Game
      </button>
    </div>
  );
}
