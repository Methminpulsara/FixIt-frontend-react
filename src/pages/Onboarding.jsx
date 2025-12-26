/* eslint-disable no-unused-vars */
import { useTheme } from '../context/ThemeContext'; 
import toast from 'react-hot-toast';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Briefcase, Award, CheckCircle, 
  UploadCloud, Plus, X, Building2, 
  ArrowRight, FileText, Sun, Moon 
} from 'lucide-react';

// Service functions import කරගන්න
import { createMechanicProfile, uploadMechanicDocument } from '../services/mechanic.service';
import { createGarageProfile } from '../services/garage.service';

const Onboarding = ({typeProp}) => {
  // Global Theme Context එකෙන් මේ ටික ගන්නවා
  const { isDarkMode, toggleTheme } = useTheme();
  
  const { type: urlType } = useParams();
  const  type = typeProp || urlType;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [skillInput, setSkillInput] = useState("");

  // Files State
  const [nicFile, setNicFile] = useState(null);
  const [crtFile, setCertFile] = useState(null);

  // Input Refs
  const nicInputRef = useRef(null);
  const crtInputRef = useRef(null);

  // Data States
  const [mechanicData, setMechanicData] = useState({ experience: '', skills: [] });
  const [garageData, setGarageData] = useState({ name: '', address: '' });

  // 💡 පරණ local isDark logic එක අයින් කළා - දැන් useTheme() එකෙන් කෙලින්ම වැඩ

  const addSkill = () => {
    if (skillInput && !mechanicData.skills.includes(skillInput)) {
      setMechanicData({ ...mechanicData, skills: [...mechanicData.skills, skillInput] });
      setSkillInput("");
    }
  };

  const removeSkill = (skillToRemove) => {
    setMechanicData({ ...mechanicData, skills: mechanicData.skills.filter(s => s !== skillToRemove) });
  };

  const handleFileChange = (e, fileType) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      if (fileType === 'nic') setNicFile(file);
      if (fileType === 'crt') setCertFile(file);
    } else {
      alert("Please upload an image file (JPG/PNG)");
    }
  };

  const handleDrop = (e, fileType) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      if (fileType === 'nic') setNicFile(file);
      if (fileType === 'crt') setCertFile(file);
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  const removeFile = (e, fileType) => {
    e.stopPropagation();
    if (fileType === 'nic') {
        setNicFile(null);
        if (nicInputRef.current) nicInputRef.current.value = "";
    }
    if (fileType === 'crt') {
        setCertFile(null);
        if (crtInputRef.current) crtInputRef.current.value = "";
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  
  const formData = new FormData();

  try {
    if (type === 'mechanic') {
      // 1. මේ ටික තමයි අඩුවෙලා තිබුණේ - Data append කිරීම
      formData.append('experience', mechanicData.experience);
      formData.append('skills', JSON.stringify(mechanicData.skills));
      
      // 2. Files දෙක append කිරීම
      if (nicFile) formData.append('nic', nicFile);
      if (crtFile) formData.append('certificate', crtFile);

      await createMechanicProfile(formData);
      toast.success('Mechanic Profile Created Successfully!');
    } else {
      // Garage එකට අවශ්‍ය data append කිරීම
      formData.append('name', garageData.name);
      formData.append('address', garageData.address);
      
      await createGarageProfile(formData);
      toast.success('Garage Profile Created Successfully!');
    }

    navigate('/dashboard');
  } catch (error) {
    const errorMsg = error.response?.data?.message || "Something went wrong";
    toast.error(`Error: ${errorMsg}`);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-white dark:bg-[#050505] transition-colors duration-700 font-sans">
      
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80&w=2000" 
          className="w-full h-full object-cover opacity-20 dark:opacity-10 grayscale transition-opacity duration-1000"
          alt="background"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/80 dark:via-[#050505]/80 to-white dark:to-[#050505]" />
      </div>

      {/* Theme Toggle Button - දැන් isDarkMode භාවිතා කරයි */}
      <button 
        type="button"
        onClick={toggleTheme} 
        className="absolute top-8 right-8 z-50 p-4 bg-black/5 dark:bg-white/10 backdrop-blur-md border border-black/10 dark:border-white/20 rounded-full text-primary hover:scale-110 transition-all"
      >
        {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
      </button>

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 w-[90%] max-w-5xl h-[85vh] grid grid-cols-1 lg:grid-cols-2 bg-white/40 dark:bg-white/5 backdrop-blur-3xl rounded-[50px] border border-black/5 dark:border-white/10 shadow-2xl overflow-hidden">
        
        {/* Left Side */}
        <div className="hidden lg:flex flex-col justify-center p-10 bg-primary/5 border-r border-black/5 dark:border-white/5 text-center items-center">
            <div className="w-20 h-20 bg-primary/20 rounded-3xl flex items-center justify-center text-primary mb-6 shadow-xl shadow-primary/10">
                {type === 'mechanic' ? <Briefcase size={40} /> : <Building2 size={40} />}
            </div>
            <h2 className="text-4xl font-black uppercase italic dark:text-white text-gray-900 leading-none">
                Get <span className="text-primary">Verified</span>
            </h2>
            <p className="mt-4 text-sm text-gray-500 font-medium max-w-[250px]">Join our professional network and grow your automotive business.</p>
        </div>

        {/* Right Side (Form) */}
        <div className="p-8 md:p-12 overflow-y-auto hide-scrollbar flex flex-col justify-center">
          <div className="mb-8">
            <h3 className="text-2xl font-black uppercase dark:text-white text-gray-900 italic tracking-tight">Complete Profile</h3>
            <p className="text-sm text-gray-500 font-bold uppercase tracking-widest text-primary/80">{type} Registration</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {type === 'mechanic' ? (
              <>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-primary ml-1">Experience (Years)</label>
                  <div className="relative">
                    <Award className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                      required type="number" placeholder="Enter years" 
                      value={mechanicData.experience}
                      onChange={(e) => setMechanicData({...mechanicData, experience: e.target.value})}
                      className="w-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none dark:text-white text-gray-900 font-bold focus:ring-2 focus:ring-primary/50 transition-all" 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-primary ml-1">Skills & Specializations</label>
                  <div className="flex gap-2">
                    <input 
                      type="text" value={skillInput} onChange={(e) => setSkillInput(e.target.value)}
                      placeholder="e.g. Hybrid, AC" className="flex-1 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-2xl py-4 px-6 outline-none dark:text-white text-gray-900 font-bold" 
                    />
                    <button type="button" onClick={addSkill} className="bg-primary p-4 rounded-2xl text-black hover:bg-primary/80 transition-all"><Plus /></button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <AnimatePresence>
                      {mechanicData.skills.map(s => (
                        <motion.span initial={{scale:0.5, opacity:0}} animate={{scale:1, opacity:1}} exit={{scale:0.5, opacity:0}} key={s} className="bg-primary/20 text-[11px] font-bold px-4 py-1.5 rounded-full flex items-center gap-2 dark:text-white text-gray-800 border border-primary/30 shadow-sm">
                          {s} <X size={14} className="cursor-pointer hover:text-red-500 transition-colors" onClick={() => removeSkill(s)} />
                        </motion.span>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>

                {/* File Uploads */}
                <div className="grid grid-cols-2 gap-4">
                  <div 
                    onClick={() => !nicFile && nicInputRef.current.click()}
                    onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, 'nic')}
                    className={`relative p-5 border-2 border-dashed rounded-[30px] flex flex-col items-center justify-center transition-all min-h-[140px] ${nicFile ? 'border-primary bg-primary/5' : 'border-black/10 dark:border-white/10 hover:border-primary/50 bg-black/5 dark:bg-white/5 cursor-pointer'}`}
                  >
                    <input type="file" ref={nicInputRef} hidden accept="image/*" onChange={(e) => handleFileChange(e, 'nic')} />
                    {nicFile ? (
                      <>
                        <CheckCircle className="text-primary mb-2" size={28} />
                        <span className="text-[10px] font-bold text-primary truncate max-w-full px-2">{nicFile.name}</span>
                        <button type="button" onClick={(e) => removeFile(e, 'nic')} className="absolute -top-2 -right-2 bg-red-500 text-white p-1.5 rounded-full shadow-lg hover:bg-red-600 transition-colors z-20"><X size={14} /></button>
                      </>
                    ) : (
                      <>
                        <UploadCloud className="text-gray-400 mb-2" size={24} />
                        <span className="text-[10px] font-black uppercase tracking-tighter text-gray-500">Upload NIC</span>
                      </>
                    )}
                  </div>
                  
                  <div 
                    onClick={() => !crtFile && crtInputRef.current.click()}
                    onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, 'crt')}
                    className={`relative p-5 border-2 border-dashed rounded-[30px] flex flex-col items-center justify-center transition-all min-h-[140px] ${crtFile ? 'border-primary bg-primary/5' : 'border-black/10 dark:border-white/10 hover:border-primary/50 bg-black/5 dark:bg-white/5 cursor-pointer'}`}
                  >
                    <input type="file" ref={crtInputRef} hidden accept="image/*" onChange={(e) => handleFileChange(e, 'crt')} />
                    {crtFile ? (
                      <>
                        <CheckCircle className="text-primary mb-2" size={28} />
                        <span className="text-[10px] font-bold text-primary truncate max-w-full px-2">{crtFile.name}</span>
                        <button type="button" onClick={(e) => removeFile(e, 'crt')} className="absolute -top-2 -right-2 bg-red-500 text-white p-1.5 rounded-full shadow-lg hover:bg-red-600 transition-colors z-20"><X size={14} /></button>
                      </>
                    ) : (
                      <>
                        <FileText className="text-gray-400 mb-2" size={24} />
                        <span className="text-[10px] font-black uppercase tracking-tighter text-gray-500">Skill Cert</span>
                      </>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-primary ml-1">Garage Name</label>
                  <input 
                    required type="text" placeholder="Enter business name" 
                    value={garageData.name}
                    onChange={(e) => setGarageData({...garageData, name: e.target.value})}
                    className="w-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-2xl py-4 px-6 outline-none dark:text-white text-gray-900 font-bold focus:ring-2 focus:ring-primary/50 transition-all" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-primary ml-1">Physical Address</label>
                  <textarea 
                    required placeholder="Enter full address" 
                    value={garageData.address}
                    onChange={(e) => setGarageData({...garageData, address: e.target.value})}
                    className="w-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-2xl py-4 px-6 outline-none dark:text-white text-gray-900 font-bold h-32 resize-none focus:ring-2 focus:ring-primary/50 transition-all" 
                  />
                </div>
              </>
            )}

            <button 
              disabled={loading}
              className="w-full bg-primary text-black font-black py-5 rounded-2xl flex items-center justify-center gap-3 uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 mt-4 group"
            >
              {loading ? "Registering..." : "Complete Setup"} <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Onboarding;