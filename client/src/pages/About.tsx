import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github, Heart, Code, Brain, Sparkles, Zap, Palette, Smartphone } from "lucide-react";
import { motion } from "framer-motion";

export default function About() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        
        <h1 className="text-4xl md:text-6xl font-display font-bold bg-linear-to-r from-purple-600 to-mint-500 bg-clip-text text-transparent mb-6">
          About PairUp
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
          A modern, relaxing memory matching game designed to train your brain while providing a delightful user experience.
        </p>
      </motion.div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-8 md:grid-cols-2"
      >
        {/* Project Info */}
        <motion.div variants={item}>
          <Card className="card-game border-none h-full hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30">
                  <Palette className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                The Project
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
              <p>
                PairUp was built with a focus on <strong className="text-purple-600 dark:text-purple-400">simplicity</strong> and <strong className="text-mint-600 dark:text-mint-400">aesthetics</strong>. 
                We wanted to create a game that feels good to play, with smooth animations, 
                soft pastel colors, and responsive interactions.
              </p>
              <p>
                Whether you're looking to kill some time or actively improve your short-term memory, 
                PairUp offers multiple difficulty levels and themes to keep things interesting.
              </p>
              <div className="flex flex-wrap gap-2 mt-6">
                <Badge variant="secondary" className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 px-3 py-1">React 19</Badge>
                <Badge variant="secondary" className="bg-mint-100 text-mint-700 dark:bg-emerald-900/30 dark:text-emerald-300 px-3 py-1">TypeScript</Badge>
                <Badge variant="secondary" className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 px-3 py-1">Tailwind CSS</Badge>
                <Badge variant="secondary" className="bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300 px-3 py-1">Vite</Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Developer Info */}
        <motion.div variants={item}>
          <Card className="card-game border-none h-full hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="p-2 rounded-lg bg-mint-100 dark:bg-emerald-900/30">
                  <Code className="h-6 w-6 text-mint-600 dark:text-emerald-400" />
                </div>
                The Developer
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
              <p>
                Developed by <strong className="text-gray-900 dark:text-white">Ashwani Kushwaha</strong>, a passionate developer who loves building 
                interactive web applications with modern technologies.
              </p>
              <p>
                This project showcases the power of modern web development tools and 
                clean UI/UX design principles.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-4 border-t border-gray-100 dark:border-gray-700">
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-800 transition-colors"
                >
                  <Github className="h-5 w-5" />
                  GitHub Profile
                </a>
                <div className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400">
                  <Heart className="h-5 w-5 fill-current" />
                  Made with Love
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Benefits */}
        <motion.div variants={item} className="md:col-span-2">
          <Card className="card-game border-none hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="p-2 rounded-lg bg-peach-100 dark:bg-orange-900/30">
                  <Brain className="h-6 w-6 text-peach-600 dark:text-orange-400" />
                </div>
                Why Play Memory Games?
              </CardTitle>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-3 gap-8 text-gray-600 dark:text-gray-300">
              <div className="space-y-3 p-4 rounded-xl bg-white/50 dark:bg-black/20">
                <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-2">
                  <Zap className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white text-lg">Improve Focus</h4>
                <p className="text-sm leading-relaxed">Regularly playing memory games can help improve your attention span and concentration levels.</p>
              </div>
              <div className="space-y-3 p-4 rounded-xl bg-white/50 dark:bg-black/20">
                <div className="w-10 h-10 rounded-full bg-mint-100 dark:bg-emerald-900/30 flex items-center justify-center mb-2">
                  <Smartphone className="h-5 w-5 text-mint-600 dark:text-emerald-400" />
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white text-lg">Visual Memory</h4>
                <p className="text-sm leading-relaxed">Train your brain to recall visual information and spatial relationships faster and more accurately.</p>
              </div>
              <div className="space-y-3 p-4 rounded-xl bg-white/50 dark:bg-black/20">
                <div className="w-10 h-10 rounded-full bg-peach-100 dark:bg-orange-900/30 flex items-center justify-center mb-2">
                  <Brain className="h-5 w-5 text-peach-600 dark:text-orange-400" />
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white text-lg">Cognitive Skills</h4>
                <p className="text-sm leading-relaxed">Keep your mind sharp and active with engaging mental exercises that challenge your brain.</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
