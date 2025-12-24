/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const reviews = [
  { name: "Sajith Bandara", text: "Saved me in the middle of the night! 15 min arrival.", rating: 5 },
  { name: "Nilu Perera", text: "Professional staff and very transparent pricing.", rating: 5 },
  { name: "Kamal Silva", text: "The best recovery app in Sri Lanka. Highly recommend.", rating: 5 },
  { name: "Aruni Jay", text: "Quick battery jumpstart service. Very polite technician.", rating: 5 }
];

const Reviews = () => {
  return (
    <section id="reviews"className="py-32 bg-transparent relative overflow-hidden transition-colors duration-500">
      <div className="container mx-auto px-6 mb-20 text-center">
         <span className="text-primary font-bold tracking-[5px] uppercase text-[10px]">Client Stories</span>
         <h2 className="text-6xl font-black text-dark-bg dark:text-white mt-4 tracking-tighter uppercase">TRUST THE <span className="italic text-primary">FLOW.</span></h2>
      </div>

      <div className="relative flex overflow-hidden group">
        <motion.div 
          className="flex gap-6 whitespace-nowrap py-10"
          animate={{ x: [0, -1500] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          {[...reviews, ...reviews, ...reviews, ...reviews].map((rev, i) => (
            <div key={i} className="inline-block w-[350px] p-8 rounded-[40px] bg-black/5 dark:bg-white/[0.02] border border-black/10 dark:border-white/5 backdrop-blur-xl hover:border-primary/30 transition-all duration-500">
               <Quote className="text-primary/30 mb-4" size={40} />
               <p className="text-dark-bg dark:text-white text-lg font-medium italic mb-8 whitespace-normal leading-relaxed">
                 "{rev.text}"
               </p>
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center font-bold text-dark-bg">
                    {rev.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-dark-bg dark:text-white font-bold text-sm uppercase">{rev.name}</h4>
                    <div className="flex gap-1 mt-1 text-primary">
                      {[...Array(rev.rating)].map((_, i) => <Star key={i} size={10} fill="currentColor" />)}
                    </div>
                  </div>
               </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Reviews;