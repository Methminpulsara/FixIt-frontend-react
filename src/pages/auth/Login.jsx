
/* eslint-disable no-unused-vars */
import toast from 'react-hot-toast'; // මතක ඇතුව import කරගන්න
import { useAuth } from '../../context/AuthContext';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LogIn, Mail, Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/auth.Service';

const Login = () => {

  const navigate = useNavigate();
  const {login} = useAuth();
  
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("")

  const handleInputChange = (e) =>{
    const {name , value} = e.target;

    setFormData((prev)=>({
      ...prev,  // store old data
      [name] : value // only update changin field

    }))

  }


const handleLogin = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError("");

  try {
    const response = await loginUser(formData);
    const { token, user } = response.data;


    // pass login users data for auth context
    login(user,token)

    toast.success(`Welcome back, ${user.name || 'User'}!`);

    if(user.type === "customer"){
      navigate('/dashboard');
    } else {
      navigate(`/onboarding/${user.type}`);
    }

  } catch (error) {
    // ❌ Error Toast එකක්
    const errorMsg = error.response?.data?.message || "Login Failed";
    toast.error(errorMsg);
    setError(errorMsg);
  } finally {
    setLoading(false);
  }
};









  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#050505] relative overflow-hidden font-sans p-4">

      {/* 🎇 Animated Background Glows */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px]"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 10, repeat: Infinity, delay: 1 }}
        className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px]"
      />

      <div className="flex flex-col md:flex-row max-w-5xl w-full items-center gap-12 z-10">

        {/* 🚀 Left Side: Brand/Message (Landing page එකේ Vibe එක) */}
        <div className="hidden lg:block w-1/2">
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-7xl font-black text-white leading-none tracking-tighter"
          >
            ROADSIDE <br />
            <span className="text-primary italic">RESCUE</span> <br />
            IS A CLICK AWAY.
          </motion.h1>
          <p className="text-gray-400 mt-6 text-xl max-w-sm font-medium">
            Join the safest network of roadside assistance in Sri Lanka.
          </p>
        </div>

        {/* 🧊 Right Side: Glass Login Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md"
        >
          <div className="bg-white/3 backdrop-blur-2xl p-10 rounded-4xl shadow-2xl relative">
            {/* 🛡️ Security Badge */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#050505] border border-white/10 p-4 rounded-full">
              <ShieldCheck className="text-primary" size={32} />
            </div>

            <div className="text-center mt-4 mb-10">
              <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter">Login.</h2>
            </div>

            <form 
            onSubmit={handleLogin}
            className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-2">Email</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-primary transition-colors" size={18} />
                  <input
                    name='email'
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-white/5 border border-white/10 py-4 pl-12 pr-4 rounded-[20px] text-white outline-none focus:border-primary/50 focus:bg-white/[0.07] transition-all"
                    placeholder="example@mail.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-2">Password</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-primary transition-colors" size={18} />
                  <input
                    name='password'
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange} 
                    className="w-full bg-white/5 border border-white/10 py-4 pl-12 pr-4 rounded-[20px] text-white outline-none focus:border-primary/50 focus:bg-white/[0.07] transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button 
                type='submit'
                disabled={isLoading}

               className="w-full bg-primary hover:bg-primary/90 text-black font-black py-5 rounded-[22px] flex items-center justify-center gap-2 transition-all uppercase tracking-widest mt-4 shadow-[0_15px_30px_rgba(254,176,93,0.25)] disabled:opacity-50">
                {isLoading ? "Checking..." : "Start Rescue"} <ArrowRight size={20} />
              </button>
            </form>

            <div className="mt-8 text-center flex justify-between text-sm">
              <a href="#" className="text-gray-500 hover:text-white transition-colors">Forgot Password?</a>
              <Link to="/sign-up" className="text-primary font-bold hover:underline">Create Account</Link>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Login;