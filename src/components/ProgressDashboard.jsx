import React from 'react';
import { X, CheckCircle, AlertCircle, BarChart3, Trash2 } from 'lucide-react';
import * as vocabStorage from '../services/vocabStorage';

export default function ProgressDashboard({ categories, onClose }) {
    const allProgress = vocabStorage.getAllProgress(categories);
    const totalMastered = allProgress.reduce((sum, cat) => sum + cat.masteredCount, 0);
    const totalWords = allProgress.reduce((sum, cat) => sum + cat.totalWords, 0);
    const totalMistakes = allProgress.reduce((sum, cat) => sum + cat.mistakeCount, 0);
    const overallPercentage = totalWords > 0 ? Math.round((totalMastered / totalWords) * 100) : 0;

    const handleClearMastered = (catId) => {
        if (window.confirm('Are you sure you want to clear all mastered words for this category?')) {
            vocabStorage.clearAllMastered(catId);
            window.location.reload(); // Simple refresh to update state
        }
    };

    const handleClearMistakes = (catId) => {
        if (window.confirm('Are you sure you want to clear all mistakes for this category?')) {
            vocabStorage.clearAllMistakes(catId);
            window.location.reload();
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[80vh] overflow-hidden shadow-2xl flex flex-col">
                {/* Header */}
                <div className="flex-none flex justify-between items-center p-6 border-b bg-gradient-to-r from-blue-50 to-purple-50">
                    <div className="flex items-center gap-3">
                        <BarChart3 className="text-blue-600" size={28} />
                        <div>
                            <h2 className="font-bold text-2xl text-gray-800">Progress Dashboard</h2>
                            <p className="text-sm text-gray-500">Track your vocabulary mastery</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition">
                        <X size={24} className="text-gray-600" />
                    </button>
                </div>

                {/* Overall Stats */}
                <div className="flex-none grid grid-cols-3 gap-4 p-6 bg-gray-50 border-b">
                    <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600">{totalMastered}</div>
                        <div className="text-xs text-gray-500 mt-1">Words Mastered</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-purple-600">{overallPercentage}%</div>
                        <div className="text-xs text-gray-500 mt-1">Overall Progress</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-red-600">{totalMistakes}</div>
                        <div className="text-xs text-gray-500 mt-1">Total Mistakes</div>
                    </div>
                </div>

                {/* Category List */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {allProgress.map(cat => (
                        <div key={cat.id} className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition">
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <h3 className="font-bold text-lg text-gray-800">{cat.title}</h3>
                                    <p className="text-sm text-gray-500">{cat.masteredCount} / {cat.totalWords} words</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    {cat.mistakeCount > 0 && (
                                        <div className="flex items-center gap-1 bg-red-50 px-2 py-1 rounded-full">
                                            <AlertCircle size={14} className="text-red-500" />
                                            <span className="text-xs font-bold text-red-600">{cat.mistakeCount}</span>
                                        </div>
                                    )}
                                    <div className="text-2xl font-bold text-purple-600">{cat.percentage}%</div>
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="w-full bg-gray-200 rounded-full h-3 mb-3 overflow-hidden">
                                <div
                                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full transition-all duration-500"
                                    style={{ width: `${cat.percentage}%` }}
                                />
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2">
                                {cat.masteredCount > 0 && (
                                    <button
                                        onClick={() => handleClearMastered(cat.id)}
                                        className="flex items-center gap-1 px-3 py-1 text-xs bg-gray-100 hover:bg-red-100 text-gray-600 hover:text-red-600 rounded-lg transition"
                                    >
                                        <Trash2 size={12} />
                                        Clear Mastered
                                    </button>
                                )}
                                {cat.mistakeCount > 0 && (
                                    <button
                                        onClick={() => handleClearMistakes(cat.id)}
                                        className="flex items-center gap-1 px-3 py-1 text-xs bg-gray-100 hover:bg-red-100 text-gray-600 hover:text-red-600 rounded-lg transition"
                                    >
                                        <Trash2 size={12} />
                                        Clear Mistakes
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="flex-none p-4 border-t bg-gray-50">
                    <button onClick={onClose} className="w-full bg-black text-white py-3 rounded-xl font-bold hover:bg-gray-800 transition">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
