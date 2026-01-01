/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';
import { Search, MapPin, Wrench, Sparkles } from 'lucide-react';

const Hero = () => {
  return (
    <section id='hero' className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      
      <div className="absolute inset-0 z-0 organic-shape overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2070" 
          className="w-full h-full object-cover brightness-75 dark:brightness-[0.2] transition-all duration-700"
          alt="FixIt Background"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-dark-bg/80 via-transparent to-primary/10"></div>
      </div>

      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/4 -left-20 w-64 h-64 bg-primary/10 blur-[100px] rounded-full"
      ></motion.div>

      <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
        
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 text-primary px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[3px] mb-8 shadow-xl"
          >
            <Sparkles size={14} className="animate-pulse" />
            Sri Lanka's Premium Recovery
          </motion.div>
          
          <h1 className="text-6xl md:text-[90px] font-black text-white leading-[0.85] tracking-tighter">
            STRANDED? <br />
            <span className="text-primary italic drop-shadow-2xl">FIX IT.</span>
          </h1>
          
          <p className="mt-10 text-xl text-gray-300 max-w-md font-medium leading-relaxed border-l-2 border-primary/30 pl-6">
            Revolutionizing roadside assistance. Professional mechanics at your fingertips, 24/7.
          </p>
        </motion.div>

        {/* Right Content: The Interactive Island Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="relative"
        >
          {/* Main Card */}
          <div className="bg-white/5 dark:bg-black/20 backdrop-blur-[40px] border border-white/20 p-12 rounded-[60px] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.6)] relative z-10 overflow-hidden">
            {/* Inner Glow */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 blur-[60px] rounded-full"></div>
            
            <h2 className="text-4xl font-black text-white mb-10 tracking-tight">Need Help?</h2>
            
            <div className="space-y-8">
              <div className="relative group">
                <MapPin className="absolute left-6 top-6 text-primary group-focus-within:scale-125 transition-transform duration-300" />
                <input 
                  type="text" 
                  placeholder="Drop your location..."
                  className="w-full bg-white/5 border border-white/10 p-6 pl-16 rounded-[30px] text-white outline-none focus:ring-2 focus:ring-primary/40 focus:bg-white/10 transition-all font-bold placeholder:text-gray-500"
                />
              </div>

              <motion.button 
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-primary text-dark-bg font-black py-7 rounded-[35px] flex items-center justify-center gap-4 text-xl shadow-[0_25px_50px_-12px_rgba(254,176,93,0.5)] hover:shadow-primary/60 transition-all"
              >
                <Search strokeWidth={3} />
                FIND MECHANIC
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;