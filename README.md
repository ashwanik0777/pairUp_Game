# PairUp - Memory Matching Game

PairUp is a modern, interactive memory matching game built with Next.js 16, React 19, and Tailwind CSS v4. It features a soft pastel aesthetic, smooth animations, and multiple difficulty levels and themes.

<!-- ![PairUp Game Screenshot](public/images/screenshot.png) -->

## 🎮 Features

- **Multiple Themes**: Choose between Animals, Emojis, and Flags.
- **Difficulty Levels**:
  - 4x4 (Easy)
  - 6x6 (Medium)
  - 8x8 (Hard)
- **Game Statistics**: Tracks moves, time elapsed, and matched pairs.
- **Persistence**: Saves your best scores for each difficulty and theme using LocalStorage.
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices.
- **Dark Mode**: Seamless support for light and dark themes.
- **Animations**: Smooth card flips and victory animations using `tw-animate-css`.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/) / Radix UI Primitives
- **Icons**: [Lucide React](https://lucide.dev/)
- **Package Manager**: [pnpm](https://pnpm.io/)

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm (v9 or v10)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/pairup.git
   cd pairup
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Run the development server:**
   ```bash
   pnpm dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Building for Production

To create an optimized production build:

```bash
pnpm build
```

To start the production server:

```bash
pnpm start
```

## 🕹️ How to Play

1. **Select a Theme**: Use the controls on the right sidebar (or bottom on mobile) to choose your preferred card theme (Animals, Emojis, or Flags).
2. **Choose Difficulty**: Select a grid size (4x4, 6x6, or 8x8). Larger grids offer a greater challenge.
3. **Start Matching**: Click on a card to reveal it. Then click another card to try and find its pair.
   - If the cards match, they stay face up.
   - If they don't match, they will flip back over after a short delay.
4. **Win the Game**: Match all pairs on the board to win!
5. **Track Progress**: Your moves and time are tracked in real-time. Try to beat your best score!

## 📂 Project Structure

```
PairUp/
├── app/                 # Next.js App Router pages
│   ├── globals.css      # Global styles and Tailwind imports
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Main game page
├── components/          # React components
│   ├── ui/              # Reusable UI components (buttons, cards, etc.)
│   ├── GameBoard.tsx    # Main game grid component
│   ├── GameCard.tsx     # Individual card component
│   ├── GameControls.tsx # Sidebar controls for theme/difficulty
│   └── GameStats.tsx    # Score and timer display
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
└── public/              # Static assets
```

## 🎨 Customization

### Adding New Themes
You can add new themes by modifying the `shared/const.ts` or relevant constant file where card data is stored. Ensure you have a unique set of icons or images for the new theme.

### Styling
The project uses Tailwind CSS v4. Global styles are defined in `app/globals.css`. The theme uses CSS variables for colors, making it easy to adjust the color palette.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

