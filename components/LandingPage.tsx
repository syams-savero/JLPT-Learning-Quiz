import React from 'react';

interface LandingPageProps {
  onStart: () => void;
}

export default function LandingPage({ onStart }: LandingPageProps) {
    const courses = [
        { name: "Japanese N5", desc: "Beginner Level - Master the basics of the Japanese language.", status: "Locked", icon: "🇯🇵", level: "N5" },
        { name: "Japanese N4", desc: "Intermediate Level - Learn the core Kanji and Grammar.", status: "Locked", icon: "⛩️", level: "N4" },
        { name: "JLPT N3 Quiz", desc: "Advanced Practice - Master N3 Vocabulary and Grammar.", status: "Resume", icon: "🎓", level: "N3" }
    ];

    const features = [
        { title: "Targeted Practice", desc: "Focus specifically on JLPT N3 vocabulary and grammar patterns.", icon: "🎯" },
        { title: "Weekly Structure", desc: "Structured learning path divided into manageable daily sessions.", icon: "📅" },
        { title: "Instant Feedback", desc: "Get immediate results to help you remember corrections longer.", icon: "⚡" }
    ];

    return (
        <div className="flex flex-col min-h-screen bg-white font-sans text-gray-700">
            {/* Header / Nav */}
            <nav className="border-b-2 border-gray-200 py-4 px-6 flex justify-between items-center bg-white sticky top-0 z-20">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg rotate-12 flex items-center justify-center text-white font-black text-xl">J</div>
                    <span className="font-black text-2xl tracking-tighter text-blue-600">JLPT Companion</span>
                </div>
                <div className="hidden md:flex gap-8 font-bold text-gray-400 uppercase text-sm tracking-widest">
                    <a href="#" className="text-blue-600 border-b-2 border-blue-600 pb-1">Study</a>
                    <a href="#" className="hover:text-gray-700 transition-colors">Courses</a>
                    <a href="#" className="hover:text-gray-700 transition-colors">Flashcards</a>
                    <a href="#" className="hover:text-gray-700 transition-colors">About</a>
                </div>
                <div className="flex gap-4">
                    <div className="flex items-center gap-2 font-bold text-blue-600 border-2 border-blue-600 px-3 py-1 rounded-full text-xs">
                        PRO
                    </div>
                </div>
            </nav>

            <main className="flex-1">
                {/* Hero Section */}
                <section className="bg-gradient-to-b from-white to-blue-50 py-20 px-6">
                    <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                        <div className="flex flex-col gap-6 text-center md:text-left">
                            <h1 className="text-4xl md:text-6xl font-black text-gray-800 leading-tight">
                                Master JLPT N3 <br />
                                <span className="text-blue-600">Vocabulary & Grammar.</span>
                            </h1>
                            <p className="text-xl font-bold text-gray-400 max-w-lg">
                                Practice structured daily quizzes designed to help you ace the exam.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 mt-4">
                                <button
                                    onClick={onStart}
                                    className="bg-blue-600 text-white shadow-[0_4px_0_0_#1d4ed8] hover:shadow-[0_2px_0_0_#1d4ed8] hover:translate-y-[2px] rounded-xl font-black transition-all text-lg py-4 px-8"
                                >
                                    Start N3 Quiz Now
                                </button>
                                <button className="bg-white text-gray-700 border-2 border-gray-200 shadow-[0_4px_0_0_#e5e7eb] hover:shadow-[0_2px_0_0_#e5e7eb] hover:translate-y-[2px] rounded-xl font-black transition-all text-lg py-4 px-8">
                                    Explore Library
                                </button>
                            </div>
                        </div>
                        <div className="flex justify-center md:justify-end">
                            <div className="w-72 h-72 md:w-96 md:h-96 relative flex items-center justify-center">
                                <div className="absolute inset-0 bg-blue-600 rounded-full opacity-10 animate-pulse"></div>
                                <div className="text-9xl z-10 filter drop-shadow-xl">🇯🇵</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Courses Grid */}
                <section className="py-20 px-6 max-w-6xl mx-auto">
                    <div className="flex justify-between items-end mb-10">
                        <div>
                            <h2 className="text-3xl font-black text-gray-800">Your Learning Path</h2>
                            <p className="text-gray-400 font-bold">Curated quizzes for your proficiency level.</p>
                        </div>
                        <button className="text-blue-600 font-black uppercase text-sm tracking-widest hover:underline">View All</button>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {courses.map((course, i) => (
                            <div key={i} className="bg-white border-2 border-gray-100 p-6 rounded-3xl shadow-sm hover:shadow-md transition-shadow flex flex-col items-start gap-4">
                                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-3xl">
                                    {course.icon}
                                </div>
                                <div className="w-full">
                                    <div className="flex justify-between items-center w-full mb-1">
                                        <h3 className="text-xl font-black text-gray-800">{course.name}</h3>
                                        <span className="text-xs font-black text-blue-600 bg-blue-100 px-2 py-0.5 rounded uppercase">{course.level}</span>
                                    </div>
                                    <p className="text-sm font-bold text-gray-400 leading-relaxed mb-4">{course.desc}</p>
                                    <button
                                        onClick={course.status === 'Resume' ? onStart : undefined}
                                        className={`w-full py-3 rounded-xl font-black uppercase text-sm border-2 transition-all ${course.status === 'Resume' ? 'border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white shadow-[0_4px_0_0_#2563eb] hover:shadow-[0_2px_0_0_#2563eb] hover:translate-y-[2px]' : 'border-gray-200 text-gray-400 cursor-not-allowed'}`}
                                    >
                                        {course.status}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Features Section */}
                <section className="bg-gray-50 py-24 px-6">
                    <div className="max-w-6xl mx-auto text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-black text-gray-800 mb-4">Why study with us?</h2>
                        <p className="text-gray-400 font-bold text-lg max-w-2xl mx-auto uppercase tracking-wide">Tools designed to help you succeed faster.</p>
                    </div>
                    <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center">
                        {features.map((feature, i) => (
                            <div key={i} className="flex flex-col items-center gap-4">
                                <div className="text-5xl mb-2">{feature.icon}</div>
                                <h3 className="text-xl font-black text-gray-800">{feature.title}</h3>
                                <p className="text-gray-400 font-medium leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="border-t-2 border-gray-200 py-16 px-6 bg-white">
                <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">
                    <div className="col-span-2">
                        <div className="flex items-center gap-2 mb-6 opacity-30">
                            <div className="w-8 h-8 bg-gray-700 rounded-lg rotate-12 flex items-center justify-center text-white font-black text-xl">J</div>
                            <span className="font-black text-2xl tracking-tighter text-gray-700">JLPT Companion</span>
                        </div>
                        <p className="text-gray-400 font-medium max-w-xs">Built for serious language enthusiasts. © 2026.</p>
                    </div>
                    <div>
                        <h4 className="font-black text-gray-800 uppercase text-xs tracking-widest mb-6">Learn</h4>
                        <div className="flex flex-col gap-4 text-gray-400 font-bold text-sm">
                            <a href="#" className="hover:text-blue-600">Grammar Guide</a>
                            <a href="#" className="hover:text-blue-600">Vocabulary</a>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-black text-gray-800 uppercase text-xs tracking-widest mb-6">Contact</h4>
                        <div className="flex flex-col gap-4 text-gray-400 font-bold text-sm">
                            <a href="#" className="hover:text-blue-600">Support</a>
                            <a href="#" className="hover:text-blue-600">Privacy Policy</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
