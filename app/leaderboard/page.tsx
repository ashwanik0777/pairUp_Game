"use client";

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
    <div className="min-h-screen container mx-auto px-4 py-12 max-w-6xl animate-in fade-in duration-500">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center justify-center gap-3">
          <Trophy className="h-10 w-10 text-yellow-500" />
          Leaderboard
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Your best scores across all themes and difficulty levels
        </p>
      </div>

      {scores.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-3xl">
          <p className="text-xl text-gray-500 dark:text-gray-400">No games played yet. Start playing to see your scores here!</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {scores.map((entry, index) => (
            <Card key={`${entry.theme}-${entry.gridSize}`} className="card-game border-none hover:shadow-lg transition-all duration-300 overflow-hidden group">
              <div className={`h-2 w-full ${
                index === 0 ? 'bg-yellow-400' : 
                index === 1 ? 'bg-gray-400' : 
                index === 2 ? 'bg-orange-400' : 'bg-purple-400'
              }`} />
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl" role="img" aria-label={entry.theme}>
                      {getThemeIcon(entry.theme)}
                    </span>
                    <Badge variant="outline" className="capitalize">
                      {entry.theme}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md">
                    {getGridIcon(entry.gridSize)}
                    <span className="text-xs font-medium">{entry.gridSize}</span>
                  </div>
                </div>
                <CardTitle className="mt-2 flex items-center gap-2">
                  {index < 3 && (
                    <Medal className={`h-5 w-5 ${
                      index === 0 ? 'text-yellow-500' : 
                      index === 1 ? 'text-gray-400' : 
                      'text-orange-500'
                    }`} />
                  )}
                  <span className="capitalize">{entry.score?.playerName || 'Anonymous'}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Best Score</p>
                      <p className="text-3xl font-bold text-purple-600 dark:text-purple-400 font-display">
                        {entry.score?.moves} <span className="text-sm font-normal text-gray-500 dark:text-gray-400">moves</span>
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-xs text-gray-400 mb-1 justify-end">
                        <Calendar className="h-3 w-3" />
                        {entry.score?.date}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
