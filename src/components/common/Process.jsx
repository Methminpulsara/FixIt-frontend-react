/* eslint-disable no-unused-vars */
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Search, PhoneCall, CheckCircle, Truck } from 'lucide-react';

const steps = [
  {
    title: "Search Location",
    desc: "Tell us where you are stranded. We track your precise coordinates in real-time.",
    icon: Search,
    side: "left",
    glow: "bg-blue-500/20"
  },
  {
    title: "Choose Service",
    desc: "Select towing, battery jump, or a quick mechanical fix from our expert list.",
    icon: Truck,
    side: "right",
    glow: "bg-orange-500/20"
  },
  {
    title: "Instant Connection",
    desc: "We connect you with the nearest pro mechanic in seconds via our smart grid.",
    icon: PhoneCall,
    side: "left",
    glow: "bg-green-500/20"
  },
  {
    title: "Problem Fixed",
    desc: "Professional support arrives at your door. Get back on the road safely.",
    icon: CheckCircle,
    side: "right",
    glow: "bg-primary/20"
  }
];

const Process = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // පාරේ ඉර ඇඳෙන වේගය සහ දුර පාලනය
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.8], ["0%", "100%"]);

  return (
    <section id="process" ref={containerRef} className="py-40 relative overflow-hidden bg-light-bg dark:bg-dark-bg transition-colors duration-500">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-secondary/5 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Modern Header */}
        <div className="text-center mb-32">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-primary font-black tracking-[4px] uppercase text-xs"
          >
            Efficiency in Motion
          </motion.span>
          <h2 className="text-6xl md:text-8xl font-black text-dark-bg dark:text-white mt-4 tracking-tighter leading-none">
            SMOOTH <span className="text-transparent" style={{ WebkitTextStroke: '1px var(--color-primary)' }}>FLOW.</span>
          </h2>
        </div>

        <div className="relative">
          {/* Central Animated Road (පාරේ ඉර) */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-[2px] bg-black/5 dark:bg-white/10 hidden md:block">
            <motion.div 
              style={{ height: lineHeight }}
              className="w-full bg-primary shadow-[0_0_20px_#FEB05D]"
            />
          </div>

          <div className="space-y-32">
            {steps.map((step, index) => (
              <div key={index} className={`flex flex-col md:flex-row items-center justify-between w-full ${step.side === 'right' ? 'md:flex-row-reverse' : ''}`}>
                
                {/* Content Card with Glassmorphism */}
                <motion.div 
                  initial={{ opacity: 0, x: step.side === 'left' ? -100 : 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="w-full md:w-[45%] p-12 rounded-[50px] bg-white/50 dark:bg-white/5 backdrop-blur-2xl border border-white/20 dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.05)] dark:shadow-none group relative overflow-hidden transition-all hover:border-primary/50"
                >
                  {/* Internal Glow Effect */}
                  <div className={`absolute -top-20 -right-20 w-40 h-40 ${step.glow} blur-[60px] rounded-full group-hover:scale-150 transition-transform duration-700`} />
                  
                  <div className="relative z-10">
                    <div className="bg-primary p-4 rounded-2xl w-fit shadow-lg shadow-primary/20 mb-8 group-hover:rotate-12 transition-transform">
                      <step.icon className="text-dark-bg" size={28} />
                    </div>
                    <h3 className="text-4xl font-black text-dark-bg dark:text-white mb-4 tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-lg font-medium leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                  {/* Step Number Background */}
                  <span className="absolute -bottom-4 -right-4 text-9xl font-black text-black/5 dark:text-white/[0.03] select-none pointer-events-none">
                    0{index + 1}
                  </span>
                </motion.div>

                {/* Central Point (පාර මැද තිත) */}
                <div className="relative z-20 my-10 md:my-0">
                  <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    className="w-12 h-12 bg-light-bg dark:bg-dark-bg border-4 border-primary rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(254,176,93,0.4)]"
                  >
                    <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
                  </motion.div>
                </div>

                <div className="hidden md:block w-[45%]"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;