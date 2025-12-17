import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Medal, Calendar, Grid3X3, LayoutGrid, Grid2X2, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ScoreData {
  moves: number;
  date: string;
  timestamp: number;
  playerName?: string;
}

interface LeaderboardEntry {
  theme: string;
  gridSize: string;
  score: ScoreData | null;
}

export default function Leaderboard() {
  const [scores, setScores] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    const themes = ['animals', 'emojis', 'flags'];
    const sizes = [4, 6, 8];
    const loadedScores: LeaderboardEntry[] = [];

    themes.forEach(theme => {
      sizes.forEach(size => {
        const key = `best_score_${size}x${size}_${theme}`;
        const stored = localStorage.getItem(key);
        
        let scoreData: ScoreData | null = null;
        
        if (stored) {
          // Check if stored value is JSON or just a number (legacy support)
          try {
            const parsed = JSON.parse(stored);
            if (typeof parsed === 'object' && parsed !== null && 'moves' in parsed) {
              scoreData = parsed;
            } else {
              // Legacy format: just a number
              scoreData = {
                moves: parseInt(stored),
                date: 'Unknown',
                timestamp: 0,
                playerName: 'Anonymous'
              };
            }
          } catch (e) {
            // Legacy format: just a number
            scoreData = {
              moves: parseInt(stored),
              date: 'Unknown',
              timestamp: 0,
              playerName: 'Anonymous'
            };
          }
        }

        if (scoreData) {
          loadedScores.push({
            theme,
            gridSize: `${size}x${size}`,
            score: scoreData
          });
        }
      });
    });

    // Sort by best performance (lowest moves)
    loadedScores.sort((a, b) => {
      if (!a.score || !b.score) return 0;
      return a.score.moves - b.score.moves;
    });

    setScores(loadedScores);
  }, []);

  const getThemeIcon = (theme: string) => {
    switch (theme) {
      case 'animals': return '🐶';
      case 'emojis': return '😀';
      case 'flags': return '🇺🇸';
      default: return '❓';
    }
  };

  const getGridIcon = (size: string) => {
    switch (size) {
      case '4x4': return <Grid2X2 className="h-4 w-4" />;
      case '6x6': return <Grid3X3 className="h-4 w-4" />;
      case '8x8': return <LayoutGrid className="h-4 w-4" />;
      default: return <Grid2X2 className="h-4 w-4" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl animate-in fade-in duration-500">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center justify-center gap-3">
          <Trophy className="h-10 w-10 text-yellow-500" />
          Leaderboard
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Your personal best scores across all themes and difficulties.
        </p>
      </div>

      {scores.length === 0 ? (
        <Card className="card-game border-none text-center py-12">
          <CardContent>
            <div className="flex flex-col items-center gap-4">
              <Medal className="h-16 w-16 text-gray-300 dark:text-gray-600" />
              <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300">No Scores Yet</h3>
              <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                Play a game to set your first record! Your best scores will appear here automatically.
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {scores.map((entry, index) => (
            <Card key={`${entry.theme}-${entry.gridSize}`} className="card-game border-none overflow-hidden hover:scale-[1.01] transition-transform">
              <div className="flex items-center p-4 md:p-6 gap-4 md:gap-8">
                {/* Rank */}
                <div className="shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-linear-to-br from-yellow-100 to-orange-100 dark:from-yellow-900/20 dark:to-orange-900/20 font-display font-bold text-xl text-yellow-600 dark:text-yellow-500">
                  #{index + 1}
                </div>

                {/* Info */}
                <div className="grow grid grid-cols-2 md:grid-cols-5 gap-4 items-center">
                  <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                    <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-medium">
                      <User className="h-4 w-4" />
                      <span className="truncate max-w-[100px]">{entry.score?.playerName || 'Anonymous'}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-2xl" role="img" aria-label={entry.theme}>
                      {getThemeIcon(entry.theme)}
                    </span>
                    <span className="font-medium capitalize text-gray-700 dark:text-gray-200">
                      {entry.theme}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    {getGridIcon(entry.gridSize)}
                    <span>{entry.gridSize}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800">
                      {entry.score?.moves} Moves
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <Calendar className="h-4 w-4" />
                    <span>{entry.score?.date}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
