import { useState, useEffect } from 'react';
import GameBoard from '@/components/GameBoard';
import GameStats from '@/components/GameStats';
import GameControls from '@/components/GameControls';
import { Button } from '@/components/ui/button';

/**
 * Home Page - PairUp Memory Matching Game
 * 
 * Design: Soft Pastel Minimalism
 * - Soft purple, mint green, and warm white color palette
 * - Generous whitespace and rounded corners
 * - Smooth animations and transitions
 * 
 * Features:
 * - Theme selection (Animals, Emojis, Flags)
 * - Difficulty levels (4x4, 6x6, 8x8)
 * - Move counter and timer
 * - Best score tracking per difficulty
 * - Responsive layout
 */
export default function Home() {
  const [theme, setTheme] = useState<'animals' | 'emojis' | 'flags'>('animals');
  const [gridSize, setGridSize] = useState<4 | 6 | 8>(4);
  const [moves, setMoves] = useState(0);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [isGameActive, setIsGameActive] = useState(true);
  const [resetTrigger, setResetTrigger] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [bestScore, setBestScore] = useState<number | null>(null);
  const [gameTime, setGameTime] = useState(0);

  // Load best score on mount and when difficulty changes
  useEffect(() => {
    const key = `best_score_${gridSize}x${gridSize}_${theme}`;
    const stored = localStorage.getItem(key);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (typeof parsed === 'object' && parsed !== null && 'moves' in parsed) {
          setBestScore(parsed.moves);
        } else {
          setBestScore(parseInt(stored));
        }
      } catch {
        setBestScore(parseInt(stored));
      }
    } else {
      setBestScore(null);
    }
  }, [gridSize, theme]);

  // Save best score when game completes
  useEffect(() => {
    if (gameComplete && moves > 0) {
      const key = `best_score_${gridSize}x${gridSize}_${theme}`;
      const current = localStorage.getItem(key);
      
      let currentScore = Infinity;
      if (current) {
        try {
          const parsed = JSON.parse(current);
          if (typeof parsed === 'object' && parsed !== null && 'moves' in parsed) {
            currentScore = parsed.moves;
          } else {
            currentScore = parseInt(current);
          }
        } catch {
          currentScore = parseInt(current);
        }
      }

      if (moves < currentScore) {
        const playerName = localStorage.getItem("playerName") || "Anonymous";
        const scoreData = {
          moves,
          date: new Date().toLocaleDateString(),
          timestamp: Date.now(),
          playerName
        };
        localStorage.setItem(key, JSON.stringify(scoreData));
        setBestScore(moves);
      }

      // Auto-show completion message
      setTimeout(() => {
        setGameComplete(false);
      }, 3000);
    }
  }, [gameComplete, moves, gridSize, theme]);

  const handleReset = () => {
    setMoves(0);
    setMatchedPairs(0);
    setGameComplete(false);
    setGameTime(0);
    setIsGameActive(true);
    setResetTrigger(!resetTrigger);
  };

  const handleThemeChange = (newTheme: 'animals' | 'emojis' | 'flags') => {
    setTheme(newTheme);
    handleReset();
  };

  const handleGridSizeChange = (newSize: 4 | 6 | 8) => {
    setGridSize(newSize);
    handleReset();
  };

  const handleGameComplete = () => {
    setGameComplete(true);
    setIsGameActive(false);
  };

  const totalCards = (gridSize * gridSize) / 2;

  return (
    <div className="h-full bg-linear-to-br from-purple-100 via-white to-mint-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-300">
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-purple-200 dark:bg-purple-900/20 rounded-full opacity-20 blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-mint-200 dark:bg-emerald-900/20 rounded-full opacity-20 blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-peach-200 dark:bg-orange-900/20 rounded-full opacity-15 blur-3xl animate-float" style={{ animationDelay: '4s' }} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-display text-gray-800 dark:text-gray-100 mb-2">
            PairUp
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">Test your memory skills with card-flipping gameplay</p>
        </div>

        {/* Main Game Container */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
          {/* Game Board - Takes 3 columns on large screens */}
          <div className="lg:col-span-3">
            <div className="card-game p-6 rounded-3xl">
              <div className="overflow-auto p-2">
                <GameBoard
                  theme={theme}
                  gridSize={gridSize}
                  onMoveChange={setMoves}
                  onMatchChange={setMatchedPairs}
                  onGameComplete={handleGameComplete}
                  resetTrigger={resetTrigger}
                />
              </div>
            </div>

            {/* Game Complete Message */}
            {gameComplete && (
              <div className="mt-6 card-game p-6 rounded-2xl text-center animate-match-success">
                <h2 className="text-2xl font-display text-gray-800 dark:text-white mb-2">
                  🎉 Congratulations!
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  You completed the game in <span className="font-accent font-bold text-purple-600 dark:text-purple-400">{moves} moves</span> and <span className="font-accent font-bold text-mint-600 dark:text-mint-400">{gameTime}s</span>!
                </p>
                {bestScore === moves && (
                  <p className="text-sm text-peach-600 dark:text-peach-400 font-accent font-semibold">
                    ✨ New Personal Best!
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Sidebar - Controls and Stats */}
          <div className="lg:col-span-1 space-y-6">
            {/* Stats */}
            <GameStats
              moves={moves}
              matchedPairs={matchedPairs}
              gridSize={gridSize}
              theme={theme}
              isGameActive={isGameActive}
              onTimeUpdate={setGameTime}
            />

            {/* Controls */}
            <GameControls
              theme={theme}
              gridSize={gridSize}
              onThemeChange={handleThemeChange}
              onGridSizeChange={handleGridSizeChange}
              onReset={handleReset}
            />
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* How to Play */}
            <div className="card-game p-6 rounded-2xl">
              <h3 className="text-lg font-display text-gray-800 dark:text-gray-100 mb-4">How to Play</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li className="flex gap-2">
                  <span className="font-accent font-bold text-purple-600 dark:text-purple-400">1.</span>
                  <span>Click on cards to flip them and reveal the content</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-accent font-bold text-mint-600 dark:text-mint-400">2.</span>
                  <span>Find matching pairs by remembering card positions</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-accent font-bold text-peach-600 dark:text-peach-400">3.</span>
                  <span>Match all pairs to complete the game</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-accent font-bold text-purple-600 dark:text-purple-400">4.</span>
                  <span>Try to beat your best score with fewer moves!</span>
                </li>
              </ul>
            </div>

            {/* Tips */}
            <div className="card-game p-6 rounded-2xl">
              <h3 className="text-lg font-display text-gray-800 dark:text-gray-100 mb-4">Tips & Tricks</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li className="flex gap-2">
                  <span>💡</span>
                  <span>Pay attention to card positions to build your memory</span>
                </li>
                <li className="flex gap-2">
                  <span>⏱️</span>
                  <span>Challenge yourself with harder difficulty levels</span>
                </li>
                <li className="flex gap-2">
                  <span>🎯</span>
                  <span>Try different themes to keep the game fresh</span>
                </li>
                <li className="flex gap-2">
                  <span>🏆</span>
                  <span>Compete with friends to see who gets the best score</span>
                </li>
              </ul>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
