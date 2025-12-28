import React, { useState, useEffect } from 'react';
import PendingList from '../../components/admin/PendingList'; 
import { toast } from 'react-hot-toast';
import { getPendingGarages, getPendingMechanics } from '../../services/admin.service';
import { useTheme } from '../../context/ThemeContext'; 
import { Sun, Moon, LogOut } from 'lucide-react'; 
import ThemeToggle from '../../components/shared/ThemeToggle';

const AdminDashboard = () => {
    //  toggleTheme 
    const { isDarkMode } = useTheme(); 
    
    const [activeTab, setActiveTab] = useState('mechanics');
    const [dataStore, setDataStore] = useState({
        mechanics: [],
        garages: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        const fetchAllData = async () => {
            setLoading(true);
            try {
                const [mechanicRes, garageRes] = await Promise.all([
                    getPendingMechanics(),
                    getPendingGarages()
                ]);
                if (isMounted) {
                    setDataStore({
                        mechanics: mechanicRes.data,
                        garages: garageRes.data
                    });
                }
            } catch (error) {
                console.log(error);
                if (isMounted) toast.error("Failed to load dashboard data");
            } finally {
                if (isMounted) setLoading(false);
            }
        };
        fetchAllData();
        return () => { isMounted = false; };
    }, []);

    const handleRemoveItem = (id) => {
        setDataStore(prev => ({
            ...prev,
            [activeTab]: prev[activeTab].filter(item => item._id !== id)
        }));
    };

    return (
        <div className={`min-h-screen p-6 transition-colors duration-700 ${isDarkMode ? 'bg-[#121212] text-white' : 'bg-gray-100 text-gray-900'}`}>
            <div className="max-w-7xl mx-auto">
                
                {/* Header Section with Theme Toggle */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-extrabold tracking-tight">Admin Dashboard</h1>
                        <p className={`mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            Manage verification requests and system overview.
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <ThemeToggle/>
                     
                    </div>
                </div>

                {/* Tabs */}
                <div className={`p-1.5 rounded-xl inline-flex mb-8 shadow-sm border ${isDarkMode ? 'bg-[#1e1e1e] border-gray-800' : 'bg-white border-gray-200'}`}>
                    <button
                        onClick={() => setActiveTab('mechanics')}
                        className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                            activeTab === 'mechanics' 
                            ? 'bg-yellow-500 text-black shadow-md' 
                            : isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'
                        }`}
                    >
                        Pending Mechanics 
                        <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${isDarkMode ? 'bg-white/10' : 'bg-black/10'}`}>
                            {dataStore.mechanics.length}
                        </span>
                    </button>
                    <button
                        onClick={() => setActiveTab('garages')}
                        className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                            activeTab === 'garages' 
                            ? 'bg-yellow-500 text-black shadow-md' 
                            : isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'
                        }`}
                    >
                        Pending Garages
                        <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${isDarkMode ? 'bg-white/10' : 'bg-black/10'}`}>
                            {dataStore.garages.length}
                        </span>
                    </button>
                </div>

                {/* Content Area */}
                <div className={`rounded-2xl p-6 shadow-xl border min-h-[400px] ${isDarkMode ? 'bg-[#1e1e1e] border-gray-800' : 'bg-white border-gray-200'}`}>
                    {loading ? (
                        <div className="flex flex-col items-center justify-center h-64 space-y-4">
                            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-yellow-500"></div>
                            <p className="text-gray-400">Loading pending requests...</p>
                        </div>
                    ) : (
                        <PendingList 
                            data={dataStore[activeTab]} 
                            type={activeTab} 
                            removeFromList={handleRemoveItem} 
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;