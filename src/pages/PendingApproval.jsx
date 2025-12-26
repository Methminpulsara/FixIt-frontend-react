// src/pages/PendingApproval.jsx
import React from 'react';
import { Clock, ShieldCheck, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext'; // ඔයාගේ Auth Context එක

const PendingApproval = () => {
  const { logout, user } = useAuth();

  return (
    <div className="h-screen w-full flex items-center justify-center bg-[#050505] text-white p-6">
      <div className="max-w-md w-full bg-white/5 border border-white/10 p-10 rounded-[40px] text-center shadow-2xl backdrop-blur-md">
        <div className="w-20 h-20 bg-yellow-500/20 rounded-full flex items-center justify-center text-yellow-500 mx-auto mb-6 animate-pulse">
          <Clock size={40} />
        </div>
        
        <h2 className="text-3xl font-black uppercase italic mb-2 tracking-tighter">Pending Approval</h2>
        <p className="text-gray-400 font-medium mb-8">
          Hi <span className="text-yellow-500">{user?.username}</span>, your profile is under review by our admin team. This usually takes less than 24 hours.
        </p>

        <div className="space-y-4">
          <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5 text-left">
            <ShieldCheck className="text-yellow-500" />
            <span className="text-sm text-gray-300">Identity and Documents verification in progress</span>
          </div>
        </div>

        <button 
          onClick={logout}
          className="mt-10 flex items-center justify-center gap-2 w-full py-4 bg-red-500/10 text-red-500 border border-red-500/20 rounded-2xl font-bold hover:bg-red-500 hover:text-white transition-all duration-300"
        >
          <LogOut size={18} /> Logout and Check Later
        </button>
      </div>
    </div>
  );
};

export default PendingApproval;