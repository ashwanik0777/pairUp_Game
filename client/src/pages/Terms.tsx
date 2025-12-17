import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Scale, Gavel, AlertCircle, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function Terms() {
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
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <div className="inline-block p-3 rounded-full bg-purple-100 dark:bg-purple-900/30 mb-4">
          <Scale className="h-8 w-8 text-purple-600 dark:text-purple-400" />
        </div>
        <h1 className="text-4xl font-display font-bold text-gray-900 dark:text-white mb-4">
          Terms of Service
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Please read these terms carefully before using PairUp.
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
                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                Acceptance of Terms
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600 dark:text-gray-300 leading-relaxed">
              <p>
                By accessing and using PairUp, you accept and agree to be bound by the terms and provision of this agreement.
                If you do not agree to abide by these terms, please do not use this service.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/30">
                  <Gavel className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                </div>
                Use License
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600 dark:text-gray-300 leading-relaxed">
              <p className="mb-4">
                Permission is granted to temporarily download one copy of the materials (information or software) on PairUp's website for personal, non-commercial transitory viewing only.
              </p>
              <p>
                This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Modify or copy the materials;</li>
                <li>Use the materials for any commercial purpose;</li>
                <li>Attempt to decompile or reverse engineer any software contained on PairUp;</li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30">
                  <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                </div>
                Disclaimer
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600 dark:text-gray-300 leading-relaxed">
              <p>
                The materials on PairUp are provided on an 'as is' basis. PairUp makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
