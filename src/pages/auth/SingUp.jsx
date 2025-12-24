/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Phone, Lock, ChevronRight, ChevronLeft, Wrench, Car, ShieldCheck, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const SignUp = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    username: '', email: '', phone: '', password: '',
    type: 'customer', firstName: '', lastName: ''
  });

  const roles = [
    { 
      id: 'customer', 
      label: 'Customer', 
      icon: <User size={24} />, 
      desc: 'I need roadside help',
      benefit: 'Get help in minutes, anywhere in Sri Lanka.' 
    },
    { 
      id: 'mechanic', 
      label: 'Mechanic', 
      icon: <Wrench size={24} />, 
      desc: 'I provide assistance',
      benefit: 'Accept jobs nearby and grow your earnings.' 
    },
    { 
      id: 'garage', 
      label: 'Garage', 
      icon: <Car size={24} />, 
      desc: 'We offer full service',
      benefit: 'Manage your workshop and reach more vehicle owners.' 
    },
  ];

  const nextStep = (e) => {
    e.preventDefault();
    setStep(s => s + 1);
  };
  
  const prevStep = () => setStep(s => s - 1);

  const progressWidth = ((step - 1) / 2) * 100;

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#050505] relative overflow-hidden font-sans p-6">
      
      {/* Background Glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[30%] h-[30%] bg-orange-500/10 rounded-full blur-[100px]" />

      <motion.div layout className="w-full max-w-2xl z-10">
        
        {/* Modern Progress Bar Section */}
        <div className="mb-8 px-4">
          <div className="flex justify-between items-end mb-2">
            <span className="text-primary text-xs font-black uppercase tracking-widest flex items-center gap-2">
              <Sparkles size={14} /> Step {step} of 3
            </span>
            <span className="text-gray-500 text-[10px] font-bold uppercase tracking-tighter">
              {step === 1 ? 'Role Selection' : step === 2 ? 'Identity' : 'Security'}
            </span>
          </div>
          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progressWidth}%` }}
              transition={{ duration: 0.5, ease: "circOut" }}
              className="h-full bg-gradient-to-r from-primary to-orange-400"
            />
          </div>
        </div>

        <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 p-8 md:p-12 rounded-[45px] shadow-2xl relative overflow-hidden">
          
          <div className="text-center mb-10">
            <h2 className="text-4xl font-black text-white italic tracking-tighter leading-none">
              CREATE <span className="text-primary text-5xl">ACCOUNT.</span>
            </h2>
            
            <motion.p 
              key={formData.type}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-gray-400 text-sm mt-4 font-medium"
            >
              {roles.find(r => r.id === formData.type).benefit}
            </motion.p>
          </div>

          <form className="space-y-6">
            <AnimatePresence mode="wait">
              
              {/* STEP 1: Role Selection */}
              {step === 1 && (
                <motion.div 
                  key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4"
                >
                  {roles.map((role) => (
                    <div 
                      key={role.id}
                      onClick={() => setFormData({...formData, type: role.id})}
                      className={`p-6 rounded-[30px] border-2 cursor-pointer transition-all ${
                        formData.type === role.id ? 'border-primary bg-primary/10' : 'border-white/5 bg-white/5 hover:bg-white/10'
                      }`}
                    >
                      <div className={`${formData.type === role.id ? 'text-primary' : 'text-gray-400'}`}>{role.icon}</div>
                      <h3 className="text-white font-bold mt-4">{role.label}</h3>
                      <p className="text-gray-500 text-xs mt-1">{role.desc}</p>
                    </div>
                  ))}
                </motion.div>
              )}

              {/* STEP 2: Basic Info */}
              {step === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                  <div className="flex gap-4">
                    <input type="text" placeholder="First Name" className="signup-input w-1/2" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} />
                    <input type="text" placeholder="Last Name" className="signup-input w-1/2" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} />
                  </div>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input type="text" placeholder="Username" className="signup-input pl-12" value={formData.username} onChange={e => setFormData({...formData, username: e.target.value})} />
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input type="email" placeholder="Email Address" className="signup-input pl-12" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                  </div>
                </motion.div>
              )}

              {/* STEP 3: Security */}
              {step === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input type="text" placeholder="Phone Number" className="signup-input pl-12" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input type="password" placeholder="Password" className="signup-input pl-12" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
                  </div>
                  <div className="bg-primary/5 p-4 rounded-2xl flex items-center gap-3 border border-primary/20">
                    <ShieldCheck className="text-primary" size={20} />
                    <p className="text-[10px] text-gray-400 leading-tight">By signing up, you agree to our terms of service and visibility settings.</p>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex gap-4 mt-8">
              {step > 1 && (
                <button type="button" onClick={prevStep} className="p-5 rounded-[22px] border border-white/10 text-white hover:bg-white/5 transition-colors">
                  <ChevronLeft size={24} />
                </button>
              )}
              {step < 3 ? (
                <button type="button" onClick={nextStep} className="flex-1 bg-white text-black font-black py-5 rounded-[22px] flex items-center justify-center gap-2 uppercase tracking-widest hover:bg-gray-200 transition-colors">
                  Next Step <ChevronRight size={20} />
                </button>
              ) : (
                <button type="submit" className="flex-1 bg-primary text-black font-black py-5 rounded-[22px] flex items-center justify-center gap-2 uppercase tracking-widest shadow-[0_15px_30px_rgba(254,176,93,0.2)] hover:scale-[1.02] active:scale-[0.98] transition-all">
                  Create Account
                </button>
              )}
            </div>
          </form>

          <p className="mt-8 text-center text-gray-500 font-medium">
            Already have an account? <Link to="/login" className="text-primary hover:underline">Log In</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUp;