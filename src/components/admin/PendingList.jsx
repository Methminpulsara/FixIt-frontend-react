import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { handleGarage, handleMechanic } from '../../services/admin.service'; 
import { X, Eye, Check, XCircle } from 'lucide-react'; 

const API_BASE_URL = "http://localhost:5000/"; 


const PendingList = ({ data, type, removeFromList }) => {
    const [selectedDoc, setSelectedDoc] = useState(null);

    const handleAction = async (id, action) => {
        try {
            if (type === "mechanics") {
                await handleMechanic(id, action);
            } else {
                await handleGarage(id, action);
            }
            toast.success(`User ${action}ed!`);
            removeFromList(id); 

        } catch (error) {
            console.log(error);
            toast.error(`Failed to ${action} user`);
        }
    };

    const getImageUrl = (path) => {
        if (!path) return null;
        const cleanPath = path.replace(/\\/g, "/");
        return `${API_BASE_URL}${cleanPath}`;
    };

    if (!data || data.length === 0) return (
        <div className="flex flex-col items-center justify-center h-64 text-gray-500">
            <p className="text-lg">No pending approvals found.</p>
        </div>
    );

    return (
        <>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 uppercase text-xs font-bold tracking-wider">
                            <th className="py-4 px-6">User Details</th>
                            <th className="py-4 px-6">Documents</th>
                            <th className="py-4 px-6">Experience</th>
                            <th className="py-4 px-6 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                        {data.map((item) => {
                            const user = item.userId; 
                            const docs = item.documents || {};

                            if (!user) return null; 

                            return (
                                <tr key={item._id} className="hover:bg-gray-50 dark:hover:bg-[#252525] transition duration-200">
                                    <td className="py-4 px-6">
                                        <div className="flex flex-col">
                                            <span className="font-semibold text-gray-900 dark:text-white text-base">
                                                {user.firstName} {user.lastName}
                                            </span>
                                            <span className="text-sm text-gray-500 dark:text-gray-400">{user.email}</span>
                                            <span className="text-xs text-yellow-600 dark:text-yellow-500 mt-1 bg-yellow-100 dark:bg-yellow-900/30 w-fit px-2 py-0.5 rounded-full">
                                                {user.phone}
                                            </span>
                                        </div>
                                    </td>

                                    <td className="py-4 px-6">
                                        <div className="flex space-x-3">
                                            {docs.nic && (
                                                <button 
                                                    onClick={() => setSelectedDoc({ url: getImageUrl(docs.nic), title: 'NIC' })}
                                                    className="flex items-center gap-1 text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-3 py-1.5 rounded-lg border border-blue-200 dark:border-blue-800 hover:opacity-80 transition"
                                                >
                                                    <Eye size={14} /> NIC
                                                </button>
                                            )}
                                            {docs.certificate && (
                                                <button 
                                                    onClick={() => setSelectedDoc({ url: getImageUrl(docs.certificate), title: 'Certificate' })}
                                                    className="flex items-center gap-1 text-xs bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 px-3 py-1.5 rounded-lg border border-purple-200 dark:border-purple-800 hover:opacity-80 transition"
                                                >
                                                    <Eye size={14} /> Cert
                                                </button>
                                            )}
                                        </div>
                                    </td>

                                    <td className="py-4 px-6 text-sm text-gray-600 dark:text-gray-300">
                                        {item.experience || 0} Years
                                    </td>

                                    <td className="py-4 px-6">
                                        <div className="flex justify-center space-x-3">
                                            <button 
                                                onClick={() => handleAction(item._id, 'approve')}
                                                className="p-2 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full hover:bg-green-200 dark:hover:bg-green-800 transition shadow-sm"
                                                title="Approve"
                                            >
                                                <Check size={18} />
                                            </button>
                                            <button 
                                                onClick={() => handleAction(item._id, 'reject')}
                                                className="p-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full hover:bg-red-200 dark:hover:bg-red-800 transition shadow-sm"
                                                title="Reject"
                                            >
                                                <XCircle size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Modal for Images */}
            {selectedDoc && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" onClick={() => setSelectedDoc(null)}>
                    <div className="relative bg-white dark:bg-[#1a1a1a] p-2 rounded-xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
                        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-800">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">{selectedDoc.title} Preview</h3>
                            <button onClick={() => setSelectedDoc(null)} className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 dark:text-white">
                                <X size={24} />
                            </button>
                        </div>
                        <div className="p-4 flex justify-center bg-gray-100 dark:bg-black/50 h-full">
                            <img src={selectedDoc.url} alt="Document" className="max-h-[70vh] object-contain rounded-md" />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default PendingList;