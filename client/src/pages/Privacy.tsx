import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Lock, Eye, FileText } from "lucide-react";
import { motion } from "framer-motion";

export default function Privacy() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <div className="inline-block p-3 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-4">
          <Shield className="h-8 w-8 text-blue-600 dark:text-blue-400" />
        </div>
        <h1 className="text-4xl font-display font-bold text-gray-900 dark:text-white mb-4">
          Privacy Policy
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          We value your privacy and are committed to protecting your personal data.
        </p>
      </motion.div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-6"
      >
        <motion.div variants={item}>
          <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30">
                  <Eye className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                Information We Collect
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600 dark:text-gray-300 leading-relaxed">
              <p className="mb-4">
                PairUp is designed to be privacy-first. We collect minimal data necessary to provide you with a great gaming experience:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Game Progress:</strong> We store your high scores and game preferences locally on your device.</li>
                <li><strong>Player Name:</strong> If you choose to provide a name, it is stored locally to personalize your experience.</li>
                <li><strong>Usage Data:</strong> We may collect anonymous usage statistics to improve game performance.</li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="p-2 rounded-lg bg-mint-100 dark:bg-emerald-900/30">
                  <Lock className="h-5 w-5 text-mint-600 dark:text-emerald-400" />
                </div>
                How We Use Your Data
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600 dark:text-gray-300 leading-relaxed">
              <p>
                Any data stored is primarily kept on your local device (LocalStorage). We do not sell, trade, or rent your personal identification information to others.
                Your scores are yours and stay on your browser unless you clear your cache.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/30">
                  <FileText className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                </div>
                Changes to This Policy
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600 dark:text-gray-300 leading-relaxed">
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
                You are advised to review this Privacy Policy periodically for any changes.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
