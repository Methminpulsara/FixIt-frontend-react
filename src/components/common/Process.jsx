/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';
import { Search, PhoneCall, CheckCircle, Truck } from 'lucide-react';

const steps = [
  { title: "Search Location", desc: "Tell us where you are stranded. We track coordinates.", icon: Search },
  { title: "Choose Service", desc: "Select towing, battery jump, or mechanical fix.", icon: Truck },
  { title: "Instant Connection", desc: "We connect you with the nearest pro in seconds.", icon: PhoneCall },
  { title: "Problem Fixed", desc: "Get back on the road safely and quickly.", icon: CheckCircle }
];

const Process = () => {
  return (
    // Background transparent
    <section id="process" className="py-32 bg-transparent relative overflow-hidden transition-colors duration-500">
      <div className="container mx-auto px-6 relative z-10">
        
        <div className="text-center mb-40">
          <h2 className="text-6xl md:text-8xl font-black text-dark-bg dark:text-white tracking-tighter uppercase">
            HOW IT <span className="text-primary italic">WORKS.</span>
          </h2>
        </div>

        <div className="relative max-w-5xl mx-auto">
          
          <div className="space-y-40">
            {steps.map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: "easeOut" }}
                className={`flex flex-col md:flex-row items-center gap-20 ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Glass Card */}
                <div className="w-full md:w-1/2 p-10 rounded-[45px] bg-black/5 dark:bg-white/[0.03] backdrop-blur-3xl border border-black/10 dark:border-white/10 hover:border-primary/40 transition-all duration-700 group">
                   <div className="bg-primary/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary transition-colors">
                      <step.icon className="text-primary group-hover:text-black" size={30} />
                   </div>
                   <h3 className="text-4xl font-black text-dark-bg dark:text-white mb-4 tracking-tighter uppercase">0{i+1}. {step.title}</h3>
                   <p className="text-gray-500 dark:text-gray-400 text-lg font-medium leading-relaxed">{step.desc}</p>
                </div>
                <div className="hidden md:block w-1/2"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;