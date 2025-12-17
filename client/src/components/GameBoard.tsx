import { useEffect, useState } from 'react';

interface Card {
  id: number;
  content: string;
  isFlipped: boolean;
  isMatched: boolean;
}

interface GameBoardProps {
  theme: 'animals' | 'emojis' | 'flags';
  gridSize: 4 | 6 | 8;
  onMoveChange: (moves: number) => void;
  onMatchChange: (matched: number) => void;
  onGameComplete: () => void;
  resetTrigger: boolean;
}

/**
 * GameBoard Component
 * 
 * Manages the game logic, card state, and game flow.
 * Features:
 * - Initializes cards based on theme and grid size
 * - Handles card flipping and matching logic
 * - Tracks moves and matched pairs
 * - Prevents clicking while cards are flipping
 */
export default function GameBoard({
  theme,
  gridSize,
  onMoveChange,
  onMatchChange,
  onGameComplete,
  resetTrigger,
}: GameBoardProps) {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  // Theme content mapping
  const themeContent = {
    animals: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🐔'],
    emojis: ['😀', '😂', '😍', '🤔', '😎', '🤩', '😴', '🤮', '🤯', '😱', '😡', '😢', '😻', '🎉', '🎈', '🎁'],
    flags: ['🇺🇸', '🇬🇧', '🇯🇵', '🇫🇷', '🇩🇪', '🇮🇳', '🇧🇷', '🇦🇺', '🇨🇦', '🇲🇽', '🇮🇹', '🇪🇸', '🇰🇷', '🇳🇱', '🇸🇪', '🇨🇭'],
  };

  // Initialize game
  useEffect(() => {
    initializeGame();
  }, [theme, gridSize, resetTrigger]);

  const initializeGame = () => {
    const totalCards = gridSize * gridSize;
    const pairsNeeded = totalCards / 2;
    const content = themeContent[theme].slice(0, pairsNeeded);
    
    // Create pairs and shuffle
    const cardPairs = [...content, ...content];
    const shuffled = cardPairs.sort(() => Math.random() - 0.5);

    const newCards = shuffled.map((content, index) => ({
      id: index,
      content,
      isFlipped: false,
      isMatched: false,
    }));

    setCards(newCards);
    setFlippedCards([]);
    setMoves(0);
    setMatchedPairs(0);
    onMoveChange(0);
    onMatchChange(0);
  };

  // Handle card click
  const handleCardClick = (id: number) => {
    if (isProcessing || flippedCards.includes(id) || cards[id].isMatched) {
      return;
    }

    const newFlipped = [...flippedCards, id];
    setFlippedCards(newFlipped);

    // Check for match when two cards are flipped
    if (newFlipped.length === 2) {
      setIsProcessing(true);
      setTimeout(() => {
        checkMatch(newFlipped);
      }, 500);
    }
  };

  const checkMatch = (flipped: number[]) => {
    const [first, second] = flipped;
    const isMatch = cards[first].content === cards[second].content;

    if (isMatch) {
      // Update matched cards
      const updatedCards = [...cards];
      updatedCards[first].isMatched = true;
      updatedCards[second].isMatched = true;
      setCards(updatedCards);

      const newMatched = matchedPairs + 1;
      setMatchedPairs(newMatched);
      onMatchChange(newMatched);

      // Check if game is complete
      if (newMatched === (gridSize * gridSize) / 2) {
        setTimeout(() => onGameComplete(), 500);
      }
    }

    // Update move counter and reset flipped cards
    const newMoves = moves + 1;
    setMoves(newMoves);
    onMoveChange(newMoves);
    setFlippedCards([]);
    setIsProcessing(false);
  };

  const getGridStyle = () => {
    const cols = gridSize;
    return {
      display: 'grid',
      gridTemplateColumns: `repeat(${cols}, 1fr)`,
      gap: '1rem',
      width: '100%',
    };
  };

  return (
    <div style={getGridStyle()}>
      {cards.map(card => (
        <CardButton
          key={card.id}
          id={card.id}
          content={card.content}
          isFlipped={flippedCards.includes(card.id)}
          isMatched={card.isMatched}
          onClick={() => handleCardClick(card.id)}
        />
      ))}
    </div>
  );
}

// Separate component for card rendering
function CardButton({
  id,
  content,
  isFlipped,
  isMatched,
  onClick,
}: {
  id: number;
  content: string;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      disabled={isMatched || isFlipped}
      className="relative overflow-hidden group"
      style={{
        aspectRatio: '1 / 1',
        padding: 0,
        border: 'none',
        borderRadius: '24px',
        fontSize: '2.5rem',
        fontWeight: 'bold',
        cursor: isMatched || isFlipped ? 'default' : 'pointer',
        backgroundColor: isFlipped || isMatched ? '#E8D5F2' : '#D4B5E0',
        backgroundImage: isFlipped || isMatched 
          ? 'linear-gradient(135deg, rgba(212, 181, 224, 0.2) 0%, rgba(168, 230, 213, 0.1) 100%)'
          : 'linear-gradient(135deg, #D4B5E0 0%, #A8E6D5 100%)',
        boxShadow: isMatched 
          ? 'none' 
          : '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: isMatched ? 0.5 : 1,
        transformStyle: 'preserve-3d',
      }}
      onMouseEnter={(e) => {
        if (!isMatched && !isFlipped) {
          (e.currentTarget as HTMLElement).style.transform = 'scale(1.05) translateY(-4px)';
          (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 20px rgba(0, 0, 0, 0.15), 0 0 15px rgba(212, 181, 224, 0.4)';
        }
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = 'scale(1) translateY(0)';
        (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)';
      }}
    >
      {/* Dark mode glow effect */}
      <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 dark:bg-white/10" />
      
      {isFlipped || isMatched ? (
        <span className="animate-in zoom-in duration-300 drop-shadow-sm">{content}</span>
      ) : (
        <span style={{ opacity: 0.6 }} className="text-white drop-shadow-md text-4xl">?</span>
      )}
    </button>
  );
}
