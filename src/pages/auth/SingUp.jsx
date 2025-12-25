/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Phone, Lock, ChevronRight, ChevronLeft, Wrench, Car, ShieldCheck, Sparkles } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../services/auth.Service';

const SignUp = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  // Backend User Schema එකට අවශ්‍ය fields පමණි
  const [formData, setFormData] = useState({
    type: 'customer',
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    phone: '',
    password: ''
  });

  const roles = [
    { id: 'customer', label: 'Customer', icon: <User size={24} />, desc: 'I need roadside help' },
    { id: 'mechanic', label: 'Mechanic', icon: <Wrench size={24} />, desc: 'I provide assistance' },
    { id: 'garage', label: 'Garage', icon: <Car size={24} />, desc: 'Full service center' },
  ];

  // දැනට පියවර 3 කට සීමා කර ඇත (Role -> Info -> Security)
  const totalSteps = 3;
  const isFinalStep = step === totalSteps;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFinalStep) return nextStep();

    setIsLoading(true);
    try {
      await registerUser(formData);
      
      alert("Registration Successful! Please login to complete your profile.");
      navigate('/login'); 
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const progressWidth = ((step - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#050505] relative overflow-hidden font-sans p-4">
      
      {/* Background Decor */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]" />

      <motion.div layout className="w-full max-w-2xl z-10">
        
        {/* Progress Bar */}
        <div className="mb-8 px-4">
          <div className="flex justify-between mb-2">
            <span className="text-primary text-xs font-black uppercase tracking-widest">Step {step} of {totalSteps}</span>
            <span className="text-gray-500 text-[10px] font-bold uppercase">{formData.type} mode</span>
          </div>
          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
            <motion.div animate={{ width: `${progressWidth}%` }} className="h-full bg-primary" />
          </div>
        </div>

        <div className="bg-white/3 backdrop-blur-2xl border border-white/10 p-8 md:p-12 rounded-[45px] shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatePresence mode="wait">
              
              {/* STEP 1: Role Selection */}
              {step === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {roles.map((role) => (
                    <div 
                      key={role.id} 
                      onClick={() => setFormData({...formData, type: role.id})} 
                      className={`p-6 rounded-[30px] border-2 cursor-pointer transition-all ${
                        formData.type === role.id ? 'border-primary bg-primary/10' : 'border-white/5 bg-white/5 hover:bg-white/10'
                      }`}
                    >
                      <div className={formData.type === role.id ? 'text-primary' : 'text-gray-400'}>{role.icon}</div>
                      <h3 className="text-white font-bold mt-4">{role.label}</h3>
                      <p className="text-gray-500 text-[10px] mt-1">{role.desc}</p>
                    </div>
                  ))}
                </motion.div>
              )}

              {/* STEP 2: Personal Identity */}
              {step === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                 
                  <div className="flex gap-4">
                    <input name="firstName" placeholder="First Name" className="signup-input w-1/2" onChange={handleInputChange} required value={formData.firstName} />
                    <input name="lastName" placeholder="Last Name" className="signup-input w-1/2" onChange={handleInputChange} required value={formData.lastName} />
                  </div>
                 
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input name="username" placeholder="Username" className="signup-input pl-12" onChange={handleInputChange} required value={formData.username} />
                  </div>
               
                    <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input name="phone" placeholder="Phone Number" className="signup-input pl-12" onChange={handleInputChange} required value={formData.phone} />
                  </div>
                </motion.div>
              )}

              {/* STEP 3: Security & Finalize */}
              {step === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                   <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input name="email" type="email" placeholder="Email Address" className="signup-input pl-12" onChange={handleInputChange} required value={formData.email} />
                  </div>

                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input name="password" type="password" placeholder="Password" className="signup-input pl-12" onChange={handleInputChange} required value={formData.password} />
                  </div>

                  <div className="bg-primary/5 p-4 rounded-2xl border border-primary/20 flex gap-3 mt-4">
                    <ShieldCheck className="text-primary" size={20} />
                    <p className="text-[10px] text-gray-400 leading-tight">
                      By creating a {formData.type} account, you agree to our terms. 
                      {formData.type !== 'customer' && " Professional details will be required after login."}
                    </p>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex gap-4 pt-4">
              {step > 1 && (
                <button 
                  type="button" 
                  onClick={prevStep} 
                  className="p-5 rounded-[22px] border border-white/10 text-white hover:bg-white/5 transition-colors"
                >
                  <ChevronLeft size={24} />
                </button>
              )}
              <button 
                type="submit" 
                disabled={isLoading}
                className="flex-1 bg-primary text-black font-black py-5 rounded-[22px] flex items-center justify-center gap-2 uppercase tracking-widest hover:opacity-90 transition-all disabled:opacity-50"
              >
                {isLoading ? "Creating..." : isFinalStep ? "Finish Registration" : "Continue"}
                {!isFinalStep && <ChevronRight size={20} />}
              </button>
            </div>
          </form>

          <p className="mt-8 text-center text-gray-500 text-sm font-medium">
            Joined us before? <Link to="/login" className="text-primary hover:underline">Sign In</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUp;