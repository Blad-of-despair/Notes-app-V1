'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function LandingPage({ user }) {
  const [mounted, setMounted] = useState(false);
  const [animationReady, setAnimationReady] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTimeout(() => setAnimationReady(true), 100);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Animated particles background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-20 h-20 bg-blue-300 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-32 h-32 bg-indigo-300 rounded-full blur-3xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-16 h-16 bg-violet-300 rounded-full blur-3xl opacity-25 animate-pulse delay-2000"></div>
      </div>

      {/* Navigation */}
      <nav className="relative glass bg-white/60 backdrop-blur-sm border-b border-white/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Notes<span className="text-indigo-600">Vita</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                href="/login" 
                className="btn btn-outline text-sm"
              >
                Sign In
              </Link>
              <Link 
                href="/register" 
                className="btn btn-primary text-sm"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Hero Section */}
      <main className="relative container mx-auto px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Column - Text Content */}
            <div className={`space-y-8 ${animationReady ? 'fade-in slide-up' : 'opacity-0'}`}>
              <div className="badge inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-full bg-blue-100 text-blue-800">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-2 animate-pulse"></span>
                Trusted by many users
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-slate-800">Your thoughts,</span>
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  beautifully organized
                </span>
                <br />
                <span className="text-slate-700">in seconds</span>
              </h1>

              <p className="text-xl text-slate-600 leading-relaxed max-w-lg">
                Capture ideas instantly with our intuitive note-taking app. Modern, fast, and designed for your workflow. 
                Never lose a thought again.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                {user ? (
                  <Link 
                    href="/notes" 
                    className="btn btn-large btn-primary group"
                  >
                    <span>Go to Your Notes</span>
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                ) : (
                  <Link 
                    href="/register" 
                    className="btn btn-large btn-primary group"
                  >
                    <span>Start Free </span>
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                )}
                
               
              </div>

              <div className="flex items-center space-x-8 pt-4">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-slate-600">Lightning Fast</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-slate-600">End-to-End Encrypted</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-slate-600">Available Everywhere</span>
                </div>
              </div>
            </div>

            {/* Right Column - Image/Visualization */}
            <div className={`relative ${animationReady ? 'fade-in slide-up' : 'opacity-0'}`} style={{ animationDelay: '200ms' }}>
              <div className="relative">
                {/* Mock note preview */}
                <div className="glass bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse delay-300"></div>
                        <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse delay-600"></div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-slate-800 mb-2">Daily Standup Notes</h3>
                      <div className="space-y-2">
                        <div className="h-3 bg-slate-200 rounded-full w-full"></div>
                        <div className="h-3 bg-slate-200 rounded-full w-3/4"></div>
                        <div className="h-3 bg-slate-300 rounded-full w-1/2"></div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center text-sm text-slate-500">
                      <span>Updated 2 hours ago</span>
                      <div className="flex space-x-3">
                        <button className="text-blue-600 hover:text-blue-800 transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button className="text-red-600 hover:text-red-800 transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-2xl opacity-70"></div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full blur-2xl opacity-70"></div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-transparent via-white to-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Everything You Need to Stay Organized
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Modern features designed for the way you work and think
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "⚡",
                title: "Lightning Fast",
                description: "Instant note creation and search with real-time sync"
              },
              {
                icon: "🔄",
                title: "Cloud Sync",
                description: "Access your notes from anywhere on any device"
              },
              {
                icon: "🔒",
                title: "Private & Secure",
                description: "End-to-end encryption keeps your data safe"
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className={`text-center p-8 rounded-3xl glass bg-white/50 backdrop-blur-sm border border-white/20 card hover-card ${
                  animationReady ? 'fade-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${600 + index * 100}ms` }}
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-6 text-center">
          <div className="text-2xl font-bold mb-4">
            Notes<span className="text-blue-400">Vita</span>
          </div>
          <p className="text-slate-400 mb-8">Take control of your thoughts today</p>
          <div className="flex justify-center space-x-4">
            <Link href="/login" className="btn btn-primary">
              Start Writing
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
