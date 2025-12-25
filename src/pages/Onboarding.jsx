/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Briefcase, MapPin, Award, CheckCircle, 
  UploadCloud, Plus, X, Sparkles, Building2, 
  ShieldCheck, ArrowRight, FileText, Sun, Moon 
} from 'lucide-react';

const Onboarding = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [skillInput, setSkillInput] = useState("");
  
  // Theme State (Dark/Light mode switch එක මෙතනටත් ගත්තා)
  const [isDark, setIsDark] = useState(document.documentElement.classList.contains('dark'));
  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  };

  const [mechanicData, setMechanicData] = useState({ experience: '', skills: [] });
  const [garageData, setGarageData] = useState({ name: '', address: '' });

  const addSkill = () => {
    if (skillInput && !mechanicData.skills.includes(skillInput)) {
      setMechanicData({ ...mechanicData, skills: [...mechanicData.skills, skillInput] });
      setSkillInput("");
    }
  };

  const removeSkill = (skillToRemove) => {
    setMechanicData({ ...mechanicData, skills: mechanicData.skills.filter(s => s !== skillToRemove) });
  };

  return (
    <div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-light-bg dark:bg-[#050505] transition-colors duration-700">
      
      {/* 🖼️ Modern Background Image with Overlay */}
    <div className="absolute inset-0 z-0">
  <img 
    src="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80&w=2000" 
    className="w-full h-full object-cover opacity-20 dark:opacity-10 grayscale transition-opacity duration-1000"
    alt="background"
    onError={(e) => {
      e.target.src = "https://images.unsplash.com/photo-1486006396123-c7756711b304?auto=format&fit=crop&q=60&w=1000"; // Backup image
    }}
  />
  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-light-bg/80 dark:via-[#050505]/80 to-light-bg dark:to-[#050505]" />
</div>

      {/* 🌗 Theme Toggle Button (පැත්තකින් ලස්සනට) */}
      <button 
        onClick={toggleTheme}
        className="absolute top-8 right-8 z-50 p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-primary hover:scale-110 transition-all"
      >
        {isDark ? <Sun size={24} /> : <Moon size={24} />}
      </button>

      {/* 📦 Main Glass Container */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-[90%] max-w-5xl h-[85vh] grid grid-cols-1 lg:grid-cols-2 bg-white/30 dark:bg-white/5 backdrop-blur-2xl rounded-[50px] border border-white/20 shadow-2xl overflow-hidden"
      >
        
        {/* Left Side: Visual/Text Area (Boring ගතිය නැති කරන්න) */}
        <div className="hidden lg:flex flex-col justify-center p-12 bg-primary/10 dark:bg-primary/5 border-r border-white/10">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="w-20 h-20 bg-primary rounded-3xl flex items-center justify-center shadow-lg shadow-primary/30 mb-8"
          >
            {type === 'mechanic' ? <Briefcase size={40} className="text-black" /> : <Building2 size={40} className="text-black" />}
          </motion.div>
          <h2 className="text-5xl font-black italic uppercase tracking-tighter dark:text-white text-gray-900 leading-[0.9]">
            Level Up <br /> <span className="text-primary">Your Business.</span>
          </h2>
          <p className="mt-6 text-gray-500 dark:text-gray-400 font-medium max-w-xs leading-relaxed">
            Join the elite network of automotive professionals. One step away from your digital presence.
          </p>
          <div className="mt-10 flex items-center gap-4 text-primary font-bold text-sm uppercase tracking-widest">
            <BadgeCheck /> 100% Secure Verification
          </div>
        </div>

        {/* Right Side: Form Area (Scroll වෙන්නේ මේක විතරයි) */}
        <div className="p-8 md:p-12 overflow-y-auto custom-scrollbar flex flex-col justify-center hide-scrollbar">
          <div className="mb-8">
            <h3 className="text-2xl font-black uppercase dark:text-white text-gray-900 italic">Complete Profile</h3>
            <p className="text-sm text-gray-500">Fill in the details below to continue.</p>
          </div>

          <form className="space-y-6">
            {type === 'mechanic' ? (
              <>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-primary">Experience (Years)</label>
                  <div className="relative">
                    <Award className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input type="number" placeholder="Years" className="w-full bg-white/50 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-primary outline-none dark:text-white text-gray-900 font-bold" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-primary">Specialized Skills</label>
                  <div className="flex gap-2">
                    <input 
                      type="text" value={skillInput} onChange={(e) => setSkillInput(e.target.value)}
                      placeholder="e.g. Hybrid" className="flex-1 bg-white/50 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-2xl py-4 px-6 outline-none dark:text-white text-gray-900 font-bold" 
                    />
                    <button type="button" onClick={addSkill} className="bg-primary p-4 rounded-2xl text-black"><Plus /></button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {mechanicData.skills.map(s => (
                      <span key={s} className="bg-primary/20 text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-2 dark:text-white text-gray-800 border border-primary/30">
                        {s} <X size={12} className="cursor-pointer" onClick={() => removeSkill(s)} />
                      </span>
                    ))}
                  </div>
                </div>

                {/* Mechanic ට විතරක් NIC/Certificates පෙන්වන්න */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-6 border-2 border-dashed border-black/10 dark:border-white/10 rounded-3xl flex flex-col items-center justify-center hover:border-primary transition-all cursor-pointer group">
                    <UploadCloud className="text-gray-400 group-hover:text-primary" />
                    <span className="text-[9px] font-bold uppercase mt-2 text-gray-400">NIC</span>
                  </div>
                  <div className="p-6 border-2 border-dashed border-black/10 dark:border-white/10 rounded-3xl flex flex-col items-center justify-center hover:border-primary transition-all cursor-pointer group">
                    <FileText className="text-gray-400 group-hover:text-primary" />
                    <span className="text-[9px] font-bold uppercase mt-2 text-gray-400">Skill Cert</span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-primary">Garage Name</label>
                  <input type="text" placeholder="Registered Name" className="w-full bg-white/50 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-2xl py-4 px-6 outline-none dark:text-white text-gray-900 font-bold" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-primary">Location Address</label>
                  <textarea placeholder="Physical Address" className="w-full bg-white/50 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-2xl py-4 px-6 outline-none dark:text-white text-gray-900 font-bold h-32 resize-none" />
                </div>
                {/* Garage එකට Upload NIC අවශ්‍ය නැහැ කිව්ව නිසා මෙතන ඒක දැම්මේ නැහැ */}
              </>
            )}

            <button className="w-full bg-primary text-black font-black py-5 rounded-2xl flex items-center justify-center gap-3 uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all">
              Submit Profile <ArrowRight size={20} />
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

const BadgeCheck = () => <ShieldCheck size={20} className="text-primary" />;

export default Onboarding;