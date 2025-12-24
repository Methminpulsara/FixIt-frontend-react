/* eslint-disable no-unused-vars */
import { motion, useScroll, useTransform } from 'framer-motion';

const DynamicPath = () => {
  const { scrollYProgress } = useScroll();

  // 🐌 වේගය තවත් අඩු කිරීමට [0, 1] ලක්ෂ්‍යය අවසානයටම ගෙන යා හැකිය.
  // මෙහි 0.95 යනු පේජ් එකේ අවසානයටම යන තෙක් පේළිය හෙමින් ඇඳෙන බවයි.
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 0.95]);

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      <svg
        className="w-full h-full"
        // 📏 viewBox උස 5000 දක්වා වැඩි කළේ Footer එක දක්වාම පාර දිගු කිරීමටයි.
        viewBox="0 0 400 5000" 
        fill="none"
        preserveAspectRatio="none"
      >
        {/* 👁️ කඩ ඉරිවල පෙනුම වැඩි කිරීමට opacity එක (.3) වැඩි කළා */}
        <path
          d="M200 0 
             C 450 400, -50 800, 200 1200 
             C 450 1600, -50 2000, 200 2400 
             C 450 2800, 50 3200, 200 3600
             C 350 4000, 50 4400, 200 4800
             L 200 5000" // 👈 Footer එකේ අවසානයටම පාර ගෙන යන ඉර
          stroke="currentColor"
          className="text-black/30 dark:text-white/30"
          strokeWidth="2"
          strokeDasharray="12 12"
        />

        {/* 🟠 ඇඳෙන ප්‍රධාන පාර */}
        <motion.path
          d="M200 0 
             C 450 400, -50 800, 200 1200 
             C 450 1600, -50 2000, 200 2400 
             C 450 2800, 50 3200, 200 3600
             C 350 4000, 50 4400, 200 4800
             L 200 5000"
          stroke="#FEB05D"
          strokeWidth="3"
          style={{ pathLength }}
          className="drop-shadow-[0_0_12px_#FEB05D]"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

export default DynamicPath;