/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Phone, Lock, ChevronRight, ChevronLeft, Wrench, Car, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const SignUp = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    username: '', email: '', phone: '', password: '',
    type: 'customer', // default type
    firstName: '', lastName: ''
  });

  const roles = [
    { id: 'customer', label: 'Customer', icon: <User size={24} />, desc: 'I need roadside help' },
    { id: 'mechanic', label: 'Mechanic', icon: <Wrench size={24} />, desc: 'I provide assistance' },
    { id: 'garage', label: 'Garage', icon: <Car size={24} />, desc: 'We offer full service' },
  ];

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#050505] relative overflow-hidden font-sans p-6">
      
      {/* Background Glow */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px]" />

      <motion.div layout className="w-full max-w-2xl z-10">
        <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 p-8 md:p-12 rounded-[45px] shadow-2xl">
          
          {/* Header */}
          <div className="text-center mb-10">
            <h2 className="text-4xl font-black text-white italic tracking-tighter">
              CREATE <span className="text-primary text-5xl">ACCOUNT.</span>
            </h2>
            <p className="text-gray-500 font-medium mt-2">Step {step} of 3</p>
          </div>

          <form className="space-y-6">
            <AnimatePresence mode="wait">
              
              {/* STEP 1: Select Role */}
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
                <motion.div key="step2" className="space-y-4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                  <div className="flex gap-4">
                    <input type="text" placeholder="First Name" className="signup-input w-1/2" onChange={e => setFormData({...formData, firstName: e.target.value})} />
                    <input type="text" placeholder="Last Name" className="signup-input w-1/2" onChange={e => setFormData({...formData, lastName: e.target.value})} />
                  </div>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input type="text" placeholder="Username" className="signup-input pl-12" onChange={e => setFormData({...formData, username: e.target.value})} />
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input type="email" placeholder="Email Address" className="signup-input pl-12" onChange={e => setFormData({...formData, email: e.target.value})} />
                  </div>
                </motion.div>
              )}

              {/* STEP 3: Secure & Contact */}
              {step === 3 && (
                <motion.div key="step3" className="space-y-4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input type="text" placeholder="Phone Number" className="signup-input pl-12" onChange={e => setFormData({...formData, phone: e.target.value})} />
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input type="password" placeholder="Password" className="signup-input pl-12" onChange={e => setFormData({...formData, password: e.target.value})} />
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
                <button type="button" onClick={prevStep} className="p-5 rounded-[22px] border border-white/10 text-white hover:bg-white/5">
                  <ChevronLeft size={24} />
                </button>
              )}
              {step < 3 ? (
                <button type="button" onClick={nextStep} className="flex-1 bg-white text-black font-black py-5 rounded-[22px] flex items-center justify-center gap-2 uppercase tracking-widest">
                  Next Step <ChevronRight size={20} />
                </button>
              ) : (
                <button type="submit" className="flex-1 bg-primary text-black font-black py-5 rounded-[22px] flex items-center justify-center gap-2 uppercase tracking-widest shadow-[0_15px_30px_rgba(254,176,93,0.2)]">
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