/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';
import { Truck, Battery, Drill, Fuel, ArrowUpRight } from 'lucide-react';

const services = [
  { title: 'Towing', desc: 'Premium flatbed recovery.', icon: Truck, color: 'bg-secondary', offset: 'mt-0' },
  { title: 'Battery', desc: 'Instant jumpstart service.', icon: Battery, color: 'bg-primary', offset: 'mt-12' },
  { title: 'Mechanical', desc: 'On-site quick repairs.', icon: Drill, color: 'bg-dark-bg border border-white/10', offset: 'mt-0' },
  { title: 'Fuel Delivery', desc: 'Emergency fuel supply.', icon: Fuel, color: 'bg-secondary', offset: 'mt-12' },
];

const Services = () => {
  return (
    <section id="services" className="py-32 bg-transparent relative overflow-hidden transition-colors duration-500">
      <div className="container mx-auto">

        <div className="mb-24">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-primary font-black tracking-[5px] uppercase text-xs"
          >
            Expert Solutions
          </motion.span>
          <h2 className="text-5xl md:text-7xl font-black text-dark-bg dark:text-white mt-4 tracking-tighter leading-none">
            NOT YOUR <br />
            <span className="text-transparent border-t-2 border-primary italic py-2" style={{ WebkitTextStroke: '1px var(--color-primary)' }}>
              AVERAGE
            </span> SERVICE.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, rotate: index % 2 === 0 ? 2 : -2 }}
              className={`${item.color} dark:bg-white/5 dark:backdrop-blur-xl dark:border dark:border-white/10 ${item.offset} p-10 rounded-[60px] min-h-[380px] flex flex-col justify-between relative overflow-hidden group shadow-2xl transition-all duration-500`}
            >
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all duration-500"></div>

              <div className="flex justify-between items-start relative z-10">
                <div className="bg-white/10 dark:bg-primary/20 backdrop-blur-xl p-5 rounded-[30px] border border-white/20">
                  <item.icon className="text-white dark:text-primary" size={32} />
                </div>
                <motion.div whileHover={{ rotate: 45 }} className="text-white/40 dark:text-white/60 cursor-pointer">
                  <ArrowUpRight size={30} />
                </motion.div>
              </div>

              <div className="relative z-10">
                <h3 className="text-3xl font-black text-white dark:text-gray-100 leading-tight mb-3">
                  {item.title}
                </h3>
                <p className="text-white/70 dark:text-gray-400 font-medium leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;