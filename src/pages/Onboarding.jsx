/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { Briefcase, MapPin, Award, FileText, CheckCircle, UploadCloud, Plus, X } from 'lucide-react';
import { createMechanicProfile } from '../../services/mechanic.service';
import { createGarageProfile } from '../../services/garage.service';

const Onboarding = () => {
  const { type } = useParams(); // URL එකෙන් 'mechanic' හෝ 'garage' ද යන්න හඳුනා ගනී
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [skillInput, setSkillInput] = useState("");

  // Mechanic Form Data
  const [mechanicData, setMechanicData] = useState({
    experience: '',
    skills: [],
    documents: { nic: '', certificate: '', license: '' }
  });

  // Garage Form Data
  const [garageData, setGarageData] = useState({
    name: '',
    address: '',
    photos: []
  });

  // --- Skills Management (For Mechanic) ---
  const addSkill = () => {
    if (skillInput && !mechanicData.skills.includes(skillInput)) {
      setMechanicData({ ...mechanicData, skills: [...mechanicData.skills, skillInput] });
      setSkillInput("");
    }
  };

  const removeSkill = (skillToRemove) => {
    setMechanicData({ ...mechanicData, skills: mechanicData.skills.filter(s => s !== skillToRemove) });
  };

  // --- Submit Handler ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (type === 'mechanic') {
        await createMechanicProfile(mechanicData);
      } else {
        await createGarageProfile(garageData);
      }
      alert("Profile submitted for approval!");
      navigate('/dashboard'); 
    } catch (error) {
      alert("Submission failed. Check your data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-6">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 blur-[150px] -z-10" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl bg-white/5 backdrop-blur-3xl border border-white/10 p-10 rounded-[40px] shadow-2xl"
      >
        <div className="mb-10 text-center">
          <div className="inline-block p-4 bg-primary/20 rounded-[20px] mb-4 text-primary">
            {type === 'mechanic' ? <Briefcase size={32} /> : <MapPin size={32} />}
          </div>
          <h1 className="text-3xl font-black uppercase tracking-tight">Complete {type} Profile</h1>
          <p className="text-gray-500 text-sm mt-2">Provide your professional details for verification.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* --- MECHANIC FORM FIELDS --- */}
          {type === 'mechanic' && (
            <>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-2">Work Experience (Years)</label>
                <div className="relative">
                  <Award className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={20} />
                  <input 
                    type="number" 
                    required
                    placeholder="e.g. 5"
                    className="signup-input pl-14"
                    onChange={(e) => setMechanicData({...mechanicData, experience: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-2">Specialized Skills</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={skillInput}
                    placeholder="e.g. Hybrid Engine, Auto Painting"
                    className="signup-input flex-1"
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                  />
                  <button type="button" onClick={addSkill} className="bg-primary text-black px-6 rounded-2xl font-black hover:scale-105 transition-transform">
                    <Plus size={24} />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {mechanicData.skills.map(skill => (
                    <span key={skill} className="bg-white/10 px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 border border-white/5">
                      {skill} <X size={14} className="cursor-pointer text-red-500" onClick={() => removeSkill(skill)} />
                    </span>
                  ))}
                </div>
              </div>

              {/* Document Mockup */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-6 border-2 border-dashed border-white/10 rounded-[30px] flex flex-col items-center gap-2 hover:border-primary/50 transition-colors cursor-pointer group">
                  <UploadCloud className="text-gray-500 group-hover:text-primary transition-colors" />
                  <span className="text-[10px] font-bold uppercase text-gray-500">NIC Copy</span>
                </div>
                <div className="p-6 border-2 border-dashed border-white/10 rounded-[30px] flex flex-col items-center gap-2 hover:border-primary/50 transition-colors cursor-pointer group">
                  <UploadCloud className="text-gray-500 group-hover:text-primary transition-colors" />
                  <span className="text-[10px] font-bold uppercase text-gray-500">Certificate</span>
                </div>
              </div>
            </>
          )}

          {/* --- GARAGE FORM FIELDS --- */}
          {type === 'garage' && (
            <>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-2">Garage Registered Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="Royal Auto Care"
                  className="signup-input"
                  onChange={(e) => setGarageData({...garageData, name: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-2">Physical Address</label>
                <textarea 
                  required
                  placeholder="No 45, Highlevel Road, Colombo..."
                  className="signup-input h-32 pt-4"
                  onChange={(e) => setGarageData({...garageData, address: e.target.value})}
                />
              </div>
            </>
          )}

          {/* Action Button */}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-primary text-black font-black py-6 rounded-[25px] flex items-center justify-center gap-3 uppercase tracking-[4px] shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all disabled:opacity-50"
          >
            {loading ? "Processing..." : "Submit Profile for Review"}
            <CheckCircle size={20} />
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Onboarding;