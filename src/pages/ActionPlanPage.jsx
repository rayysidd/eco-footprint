import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaLeaf, FaHome, FaCar, FaUtensils, FaBolt, FaFire, FaCheckCircle } from 'react-icons/fa';

const ActionPlanPage = () => {
    const navigate = useNavigate();
    const [suggestions, setSuggestions] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const storedResults = sessionStorage.getItem('ecoCalcResults');
        if (storedResults) {
            const results = JSON.parse(storedResults);
            setSuggestions(results.suggestions);
        }
    }, []);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth) * 100,
                y: (e.clientY / window.innerHeight) * 100
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    if (suggestions === null) {
        return (
            <div className="min-h-screen relative overflow-hidden">
                {                /* Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-emerald-900/40 to-green-950">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.2),transparent_70%)]"></div>
                    <div className="absolute inset-0 opacity-30">
                        {[...Array(50)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute w-1 h-1 bg-green-400 rounded-full animate-pulse"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                    animationDelay: `${Math.random() * 3}s`,
                                    animationDuration: `${2 + Math.random() * 2}s`
                                }}
                            />
                        ))}
                    </div>
                </div>

                <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
                    <div className="text-center">
                        <div className="relative w-24 h-24 mx-auto mb-12">
                            <div className="absolute inset-0 border-2 border-green-400/50 rounded-full animate-spin"></div>
                            <div className="absolute inset-2 border-2 border-green-300/30 rounded-full animate-spin" style={{animationDirection: 'reverse'}}></div>
                            <div className="absolute inset-4 border-2 border-green-200/20 rounded-full animate-spin"></div>
                            <div className="absolute inset-0 bg-green-400/10 rounded-full blur-xl animate-pulse"></div>
                        </div>
                        
                        <div className="glass-card p-8 max-w-md">
                            <h2 className="text-3xl font-light text-white mb-4 tracking-wide">
                                Crafting Your Future
                            </h2>
                            <p className="text-green-100 mb-8 font-light">Analyzing environmental pathways</p>
                            <button 
                                onClick={() => navigate('/results')} 
                                className="floating-btn group"
                            >
                                <FaArrowLeft className="mr-2 text-sm group-hover:-translate-x-1 transition-transform" /> 
                                Return
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const categoryIcons = {
        home: { icon: FaHome, label: 'Home', color: 'from-emerald-400 to-green-600' },
        transport: { icon: FaCar, label: 'Transport', color: 'from-cyan-400 to-teal-600' },
        food: { icon: FaUtensils, label: 'Food', color: 'from-lime-400 to-green-600' },
        energy: { icon: FaBolt, label: 'Energy', color: 'from-yellow-400 to-amber-600' }
    };

    const getCategoryFromTitle = (title) => {
        const lowerTitle = title.toLowerCase();
        if (lowerTitle.includes('home') || lowerTitle.includes('heating')) return 'home';
        if (lowerTitle.includes('transport') || lowerTitle.includes('travel') || lowerTitle.includes('car')) return 'transport';
        if (lowerTitle.includes('food') || lowerTitle.includes('diet') || lowerTitle.includes('meat')) return 'food';
        return 'energy';
    };

    const filteredSuggestions = selectedCategory === 'all' 
        ? suggestions 
        : suggestions.filter(s => getCategoryFromTitle(s.title) === selectedCategory);

    const getImpactIcon = (priority) => {
        switch(priority) {
            case 'high': return FaFire;
            case 'medium': return FaBolt;
            default: return FaLeaf;
        }
    };

    const getPriorityGlow = (priority) => {
        switch(priority) {
            case 'high': return 'shadow-red-500/50';
            case 'medium': return 'shadow-yellow-500/50';
            default: return 'shadow-green-500/50';
        }
    };

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Dynamic Background */}
            <div className="fixed inset-0 bg-gradient-to-br from-green-950 via-green-900/60 to-emerald-950">
                {/* Interactive Gradient Orb */}
                <div 
                    className="absolute w-96 h-96 bg-gradient-radial from-cyan-400/20 via-blue-500/10 to-transparent rounded-full blur-3xl transition-all duration-1000"
                    style={{
                        left: `${mousePosition.x}%`,
                        top: `${mousePosition.y}%`,
                        transform: 'translate(-50%, -50%)'
                    }}
                ></div>
                
                {/* Floating Particles */}
                <div className="absolute inset-0 opacity-40">
                    {[...Array(30)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-2 h-2 bg-gradient-to-r from-cyan-300 to-blue-200 rounded-full floating-particle"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 10}s`,
                            }}
                        />
                    ))}
                </div>

                {/* Mesh Background */}
                <div className="absolute inset-0 opacity-20" style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, rgba(34,197,94,0.6) 1px, transparent 0)`,
                    backgroundSize: '50px 50px'
                }}></div>
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Floating Header */}
                <div className="text-center mb-20">
                    <div className="glass-card inline-block p-12 mb-8">
                        <h1 className="text-5xl sm:text-7xl font-thin text-white mb-6 tracking-widest">
                            ACTION
                        </h1>
                        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent mx-auto mb-8"></div>
                        <p className="text-xl font-light text-green-100 max-w-2xl mx-auto leading-relaxed">
                            Transform reality through conscious choices
                        </p>
                    </div>
                </div>

                {/* Floating Category Filter */}
                <div className="flex flex-wrap justify-center gap-4 mb-20">
                    {Object.entries(categoryIcons).map(([category, data]) => {
                        const Icon = data.icon;
                        return (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`floating-btn ${selectedCategory === category ? 'active-floating-btn' : ''}`}
                            >
                                <Icon className="mr-2 text-sm" />
                                {data.label}
                            </button>
                        );
                    })}
                </div>

                {/* Floating Action Cards */}
                <div className="space-y-12">
                    {filteredSuggestions.length === 0 ? (
                        // Success State
                        <div className="glass-card p-16 text-center floating-element">
                            <div className="w-20 h-20 mx-auto mb-12 relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full blur-xl animate-pulse"></div>
                                <div className="relative w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                                    <FaCheckCircle className="text-3xl text-white" />
                                </div>
                            </div>
                            
                            <h2 className="text-4xl font-light text-white mb-8 tracking-wide">
                                Perfect Harmony
                            </h2>
                            
                            <p className="text-xl font-light text-green-100 mb-16 leading-relaxed max-w-2xl mx-auto">
                                Your environmental resonance is already aligned with sustainable frequencies. 
                                Continue channeling these positive vibrations.
                            </p>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
                                {[
                                    { icon: FaLeaf, title: 'Maintain Flow', desc: 'Continue current energy patterns' },
                                    { icon: FaHome, title: 'Monitor Waves', desc: 'Track resource harmonics' },
                                    { icon: FaCar, title: 'Sustain Movement', desc: 'Keep transport frequencies aligned' },
                                    { icon: FaUtensils, title: 'Nourish Consciously', desc: 'Maintain dietary resonance' }
                                ].map((item, index) => (
                                    <div key={index} className="glass-mini-card p-8 floating-element" style={{animationDelay: `${index * 0.2}s`}}>
                                        <div className="w-16 h-16 mx-auto mb-6 relative">
                                            <div className="absolute inset-0 bg-green-400/20 rounded-2xl blur-lg"></div>
                                            <div className="relative w-16 h-16 bg-gradient-to-br from-green-400/20 to-emerald-500/20 backdrop-blur-sm rounded-2xl border border-green-400/30 flex items-center justify-center">
                                                <item.icon className="text-xl text-green-300" />
                                            </div>
                                        </div>
                                        <h4 className="text-lg font-light text-white mb-3">{item.title}</h4>
                                        <p className="text-sm font-light text-green-200">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        filteredSuggestions.map((suggestion, index) => {
                            const category = getCategoryFromTitle(suggestion.title);
                            const categoryData = categoryIcons[category];
                            const CategoryIcon = categoryData.icon;
                            const ImpactIcon = getImpactIcon(suggestion.priority);
                            
                            return (
                                <div
                                    key={index}
                                    className="glass-card p-10 floating-element hover:scale-[1.02] transition-all duration-700"
                                    style={{animationDelay: `${index * 0.3}s`}}
                                >
                                    {/* Floating Header */}
                                    <div className="flex items-start justify-between mb-10">
                                        <div className="flex items-start space-x-6">
                                            <div className="relative">
                                                <div className={`absolute inset-0 bg-gradient-to-r ${categoryData.color} rounded-2xl blur-lg opacity-50`}></div>
                                                <div className={`relative w-16 h-16 bg-gradient-to-r ${categoryData.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                                                    <CategoryIcon className="text-xl text-white" />
                                                </div>
                                            </div>
                                            <div>
                                                <h3 className="text-2xl sm:text-3xl font-light text-white mb-4 tracking-wide leading-tight">
                                                    {suggestion.title}
                                                </h3>
                                                <div className="flex items-center space-x-4 text-sm">
                                                    <span className="font-light text-green-200 uppercase tracking-widest">
                                                        {categoryData.label}
                                                    </span>
                                                    <div className="w-1 h-1 bg-green-400 rounded-full glow-pulse"></div>
                                                    <span className="font-light text-green-300">
                                                        {suggestion.priority} Impact
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 flex items-center justify-center shadow-lg ${getPriorityGlow(suggestion.priority)}`}>
                                            <ImpactIcon className="text-green-300 text-lg" />
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <p className="text-green-100 font-light leading-relaxed mb-12 text-lg">
                                        {suggestion.description}
                                    </p>

                                    {/* Implementation Steps */}
                                    <div>
                                        <h4 className="text-xl font-light text-white mb-8 flex items-center tracking-wide">
                                            <div className="w-3 h-3 bg-green-400 rounded-full mr-4 glow-pulse"></div>
                                            Implementation Protocol
                                        </h4>
                                        
                                        <div className="space-y-6">
                                            {suggestion.tips?.map((tip, tipIndex) => (
                                                <div 
                                                    key={tipIndex}
                                                    className="glass-mini-card p-6 flex items-start space-x-6 hover:bg-white/10 transition-all duration-300 floating-element"
                                                    style={{animationDelay: `${(index * 0.3) + (tipIndex * 0.1)}s`}}
                                                >
                                                    <div className="relative flex-shrink-0">
                                                        <div className="absolute inset-0 bg-green-400/50 rounded-full blur-md"></div>
                                                        <div className="relative w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white text-sm font-medium shadow-lg">
                                                            {tipIndex + 1}
                                                        </div>
                                                    </div>
                                                    <p className="text-green-50 font-light leading-relaxed">
                                                        {tip}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                {/* Floating Back Button */}
                <div className="text-center mt-20">
                    <button 
                        onClick={() => navigate('/results')} 
                        className="floating-btn group text-lg px-10 py-4"
                    >
                        <FaArrowLeft className="mr-3 text-sm group-hover:-translate-x-2 transition-transform" /> 
                        Return to Results
                    </button>
                </div>
            </div>

            {/* Custom Styles */}
            <style jsx>{`
                .glass-card {
                    background: rgba(34, 197, 94, 0.08);
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(34, 197, 94, 0.2);
                    border-radius: 24px;
                    box-shadow: 0 8px 32px rgba(0, 50, 0, 0.4), inset 0 1px 0 rgba(34, 197, 94, 0.15);
                }
                
                .glass-mini-card {
                    background: rgba(34, 197, 94, 0.05);
                    backdrop-filter: blur(15px);
                    border: 1px solid rgba(34, 197, 94, 0.15);
                    border-radius: 16px;
                    box-shadow: 0 4px 16px rgba(0, 50, 0, 0.3);
                }
                
                .floating-btn {
                    background: rgba(34, 197, 94, 0.12);
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(34, 197, 94, 0.25);
                    border-radius: 50px;
                    padding: 12px 24px;
                    color: rgba(255, 255, 255, 0.95);
                    font-weight: 300;
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 16px rgba(0, 50, 0, 0.3);
                    display: inline-flex;
                    align-items: center;
                }
                
                .floating-btn:hover {
                    background: rgba(34, 197, 94, 0.2);
                    border-color: rgba(34, 197, 94, 0.6);
                    box-shadow: 0 8px 32px rgba(34, 197, 94, 0.4);
                    transform: translateY(-2px);
                }
                
                .active-floating-btn {
                    background: rgba(34, 197, 94, 0.2);
                    border-color: rgba(34, 197, 94, 0.5);
                    box-shadow: 0 8px 32px rgba(34, 197, 94, 0.3);
                    color: white;
                }
                
                .floating-element {
                    animation: floatIn 1s ease-out forwards;
                    opacity: 0;
                    transform: translateY(30px);
                }
                
                .floating-particle {
                    animation: floatParticle 15s infinite linear;
                }
                
                .glow-pulse {
                    animation: glowPulse 2s ease-in-out infinite alternate;
                }
                
                @keyframes floatIn {
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @keyframes floatParticle {
                    0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
                }
                
                @keyframes glowPulse {
                    0% { box-shadow: 0 0 5px rgba(34, 197, 94, 0.5); }
                    100% { box-shadow: 0 0 20px rgba(34, 197, 94, 0.8), 0 0 30px rgba(34, 197, 94, 0.4); }
                }
                
                .bg-gradient-radial {
                    background: radial-gradient(circle, var(--tw-gradient-stops));
                }
            `}</style>
        </div>
    );
};

export default ActionPlanPage;