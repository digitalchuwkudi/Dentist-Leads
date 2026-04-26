/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Chatbot } from './components/Chatbot';
import { Moon, TrendingDown, PhoneCall, Search, Calendar, Bot, Phone, MessageCircle, Menu, X, Rocket, Zap, Mail, ArrowRight, Star, ChevronRight } from 'lucide-react';

const Logo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 0 8px rgba(0,194,168,0.6))' }}>
    <path d="M12 22s-2.5-1.5-3.5-3.5C8 17 6.5 16 6 15c-1-2-1-4-1-4s0-5 3.5-7C11.5 2.8 12 2 12 2s.5.8 3.5 2c3.5 2 3.5 7 3.5 7s0 2-1 4c-.5 1-2 2-2.5 3.5C14.5 20.5 12 22 12 22z" />
    <path d="M12 11c0 2 1 3 3 5" />
    <path d="M12 11c0 2-1 3-3 5" />
  </svg>
);

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* NAV */}
      <nav>
        <div className="nav-logo" style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--white)', fontWeight: '600', fontSize: '1.4rem', letterSpacing: '0.5px' }}>
          <img 
            src="https://i.ibb.co/mCLy2twx/Chat-GPT-Image-Apr-22-2026-03-59-53-PM-removebg-preview.png" 
            alt="Dentist Leads Icon" 
            style={{ height: '48px', width: 'auto', objectFit: 'contain' }} 
          />
          <span>Dentist Leads</span>
        </div>
        <div className="nav-links">
          <a href="#">Home</a>
          <a href="#services">What we do</a>
          <a href="#how">How it works</a>
          <a href="#pricing">Pricing</a>
          <a href="#faq">FAQ</a>
          <a href="#contact">Contact</a>
          <a href="#contact" className="nav-cta" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            Let's get started <Rocket size={18} />
          </a>
        </div>
        <button className="mobile-menu-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* MOBILE MENU */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <a href="#" onClick={() => setIsMobileMenuOpen(false)}>Home</a>
        <a href="#services" onClick={() => setIsMobileMenuOpen(false)}>What we do</a>
        <a href="#how" onClick={() => setIsMobileMenuOpen(false)}>How it works</a>
        <a href="#pricing" onClick={() => setIsMobileMenuOpen(false)}>Pricing</a>
        <a href="#faq" onClick={() => setIsMobileMenuOpen(false)}>FAQ</a>
        <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</a>
        <a href="#contact" className="nav-cta" onClick={() => setIsMobileMenuOpen(false)} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          Let's get started <Rocket size={18} />
        </a>
      </div>

      {/* HERO */}
      <section className="hero relative overflow-hidden bg-transparent w-full" style={{ minHeight: '100vh', padding: 0 }}>
        
        {/* Background color for the whole section */}
        <div className="absolute inset-0 z-[-3]" style={{ backgroundColor: 'var(--navy)' }} />

        {/* 2-Column Grid */}
        <div className="mx-auto w-full max-w-[1600px] flex flex-col lg:flex-row relative z-10" style={{ minHeight: '100vh' }}>
          
          {/* Left Column: Text */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center items-center text-center lg:items-start lg:text-left pt-28 pb-16 px-6 lg:pl-12 lg:pr-8">
            <div className="hero-eyebrow flex justify-center lg:justify-start w-full">AI Patient Acquisition System for Dental Clinics</div>
            <h1 className="text-center lg:text-left w-full">Turn Every Website Visit Into a <em>Booked Patient</em></h1>
            <p className="hero-sub text-center lg:text-left max-w-2xl w-full mx-auto lg:mx-0 m-0 mb-10">Your website shouldn’t just sit there — it should convert. We install a 24/7 AI system that engages, qualifies, and turns every visitor into a real patient — even after hours, on weekends, or when your front desk is busy.</p>
            
            <div style={{ marginTop: '-1rem', marginBottom: '2.5rem', fontSize: '1.05rem', fontWeight: 500, color: 'var(--teal)' }} className="w-full flex justify-center lg:justify-start">
              <p className="flex items-center justify-center lg:justify-start gap-2 w-full m-0 mx-auto lg:mx-0"><ChevronRight size={18} color="var(--teal)" className="shrink-0" /> No missed enquiries. No delayed responses.</p>
            </div>

            <div className="hero-actions flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-5 w-full">
              <button onClick={() => window.dispatchEvent(new Event('open-chatbot'))} className="btn-hero-ai flex-row">
                <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                  <span style={{ fontSize: '0.95rem', color: 'var(--white)', fontWeight: 500, lineHeight: 1.2, margin: '2px 0 3px 0' }}>Chat with our AI</span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.2 }}>Get immediate answers 24/7</span>
                </div>
                <div className="icon-wrap ml-3">
                  <Bot size={18} />
                </div>
              </button>
              
              <a href="#how" className="btn-primary" style={{ padding: '0.9rem 2rem' }}>
                 See How It Works <ArrowRight size={18} />
              </a>
            </div>
            
            <div className="mt-12 grid grid-cols-2 gap-y-8 gap-x-12 text-center lg:text-left w-full max-w-lg mx-auto lg:mx-0 justify-items-center lg:justify-items-start">
              <div className="flex flex-col items-center lg:items-start">
                <div className="stat-num">24<span>/7</span></div>
                <div className="stat-label">AI receptionist, always on</div>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <div className="stat-num">0<span>s</span></div>
                <div className="stat-label">Response time to new enquiries</div>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <div className="stat-num">$4<span>k+</span></div>
                <div className="stat-label">Value of one converted patient</div>
              </div>
              <div className="flex flex-col items-center sm:items-start">
                <div className="stat-num">48<span>hrs</span></div>
                <div className="stat-label">To go live — fully set up</div>
              </div>
            </div>
          </div>

          {/* Right Column: Video */}
          <div className="w-full lg:w-1/2 relative min-h-[400px] lg:min-h-full flex items-center justify-center p-0 lg:p-6 z-10 overflow-visible mt-10 lg:mt-0">
            {/* Faint radial teal glow behind the video */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] max-w-[600px] max-h-[600px] bg-[#00c2a8] rounded-full blur-[120px] opacity-20 pointer-events-none" />

            {/* Video Container with Feathered Edges */}
            <div className="relative w-full max-w-[450px] aspect-[9/16] flex items-center justify-center pointer-events-none"
                 style={{
                    maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 65%)',
                    WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 65%)'
                 }}>
              
              <video
                src="https://res.cloudinary.com/dx41voszq/video/upload/q_auto,f_auto,vc_auto/v1776962211/Futuristic_tooth_rotating_202604230934_gmuzes.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                  transform: 'scale(1.05)',
                  objectPosition: 'center',
                  background: 'transparent'
                }} 
              />
              
              {/* Additional overlay to help hide any edge watermarks */}
              <div className="absolute bottom-0 right-0 w-40 h-24 bg-[#071324] mix-blend-normal blur-2xl z-10 pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="problem" id="problem">
        <span className="section-tag">The problem</span>
        <h2>Your Website Gets Traffic —<br /><em>But Doesn’t Convert</em></h2>
        <p className="section-intro">Every day, potential patients visit your website ready to book.<br />But instead of becoming appointments, they:</p>

        <div className="problem-grid">
          <div className="problem-card">
            <div className="problem-icon"><TrendingDown size={20} /></div>
            <h3>Leave without taking action</h3>
            <p>They land on your site, but there's no immediate way to engage them. They browse and bounce.</p>
          </div>
          <div className="problem-card">
            <div className="problem-icon"><Moon size={20} /></div>
            <h3>Get no immediate response</h3>
            <p>They try to contact you during off hours, nights or weekends, and there is no one available to reply in real-time.</p>
          </div>
          <div className="problem-card">
            <div className="problem-icon"><Search size={20} /></div>
            <h3>Visit another clinic instead</h3>
            <p>Without an instant response, they continue searching Google and simply book with the clinic that replies faster.</p>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
           <h3 style={{ fontSize: '1.4rem', color: 'var(--teal)', fontWeight: 500, fontFamily: 'var(--serif)', fontStyle: 'italic', marginBottom: '0.5rem' }}>The issue isn’t traffic — it’s conversion</h3>
           <p style={{ fontSize: '1.1rem', color: 'var(--white)' }}>Your clinic isn’t losing visitors. <br />You’re losing patients at the point of decision.</p>
        </div>
      </section>

      <div className="relative w-full">
        {/* Sticky Background Video Layer */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="sticky top-0 w-full h-[100vh] overflow-hidden">
             <video 
               src="https://res.cloudinary.com/dx41voszq/video/upload/q_auto,f_auto,vc_auto,ac_none/v1777079142/video_1776967272777028_ng5uji.mp4" 
               autoPlay loop muted playsInline preload="metadata"
               className="absolute inset-0 w-full h-full object-cover" 
               style={{ 
                 opacity: 0.65, 
                 transform: 'translateZ(0)', 
                 willChange: 'transform' 
               }}
             />
             <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628]/10 via-[#0a1628]/60 to-[#0a1628] z-10" />
          </div>
        </div>

        <div className="relative z-20">

      {/* WHAT WE DO */}
      <section id="services">
        <span className="section-tag">What we do</span>
        <h2>We Turn Interest Into<br /><em>Appointments — Automatically</em></h2>
        <p className="section-intro">We install a complete AI Patient Acquisition System into your clinic that:</p>

        <div className="problem-grid" style={{ marginTop: '2rem' }}>
           <div className="problem-card" style={{ background: 'rgba(255,255,255,0.03)' }}>
              <div className="problem-icon" style={{ margin: '0 0 1rem 0' }}><MessageCircle size={20} /></div>
              <h3>Engages visitors instantly</h3>
              <p>Reaches out to every visitor the second they land on your site.</p>
           </div>
           <div className="problem-card" style={{ background: 'rgba(255,255,255,0.03)' }}>
              <div className="problem-icon" style={{ margin: '0 0 1rem 0' }}><PhoneCall size={20} /></div>
              <h3>Answers questions in real-time</h3>
              <p>Provides accurate, clinic-specific answers directly to the patient.</p>
           </div>
           <div className="problem-card" style={{ background: 'rgba(255,255,255,0.03)' }}>
              <div className="problem-icon" style={{ margin: '0 0 1rem 0' }}><TrendingDown size={20} /></div>
               <h3>Handles objections</h3>
              <p>Overcomes price concerns, fear, and builds urgency automatically.</p>
           </div>
           <div className="problem-card" style={{ background: 'rgba(255,255,255,0.03)' }}>
              <div className="problem-icon" style={{ margin: '0 0 1rem 0' }}><Zap size={20} /></div>
              <h3>Delivers ready-to-book patients</h3>
              <p>Captures contact details, pre-qualifies, and sends them directly to your front desk.</p>
           </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
           <p style={{ fontSize: '1.2rem', color: 'var(--white)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}><ChevronRight size={20} color="var(--teal)" className="shrink-0" /> So instead of “website visitors”... <strong>you get patients ready to book</strong>.</p>
        </div>
      </section>

      {/* KEY SECTION */}
      <section id="key-section" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <span className="section-tag">How we convert</span>
        <h2>Where Most Clinics Lose Patients —<br /><em>We Convert Them</em></h2>
        
        <div className="services-three" style={{ marginTop: '3.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', alignItems: 'stretch' }}>
           
           <div className="problem-card grainy-card">
              <h3 style={{ color: 'var(--teal)', fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Moon size={18} /> After-hours visits
              </h3>
              <p style={{ color: 'var(--text-muted)' }}>Patients browse at night or weekends</p>
              <p style={{ marginTop: '1rem', color: 'var(--white)', fontWeight: 500, display: 'flex', alignItems: 'flex-start', gap: '8px', textAlign: 'left' }}><ChevronRight size={18} color="var(--teal)" className="shrink-0 mt-0.5" /> We respond instantly and secure their details</p>
           </div>

           <div className="problem-card grainy-card">
              <h3 style={{ color: 'var(--teal)', fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <PhoneCall size={18} /> Busy front desk
              </h3>
              <p style={{ color: 'var(--text-muted)' }}>Staff can’t answer every enquiry</p>
              <p style={{ marginTop: '1rem', color: 'var(--white)', fontWeight: 500, display: 'flex', alignItems: 'flex-start', gap: '8px', textAlign: 'left' }}><ChevronRight size={18} color="var(--teal)" className="shrink-0 mt-0.5" /> AI handles conversations in real time</p>
           </div>

           <div className="problem-card grainy-card">
              <h3 style={{ color: 'var(--teal)', fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MessageCircle size={18} /> Cold enquiries
              </h3>
              <p style={{ color: 'var(--text-muted)' }}>Patients hesitate, compare, and leave</p>
              <p style={{ marginTop: '1rem', color: 'var(--white)', fontWeight: 500, display: 'flex', alignItems: 'flex-start', gap: '8px', textAlign: 'left' }}><ChevronRight size={18} color="var(--teal)" className="shrink-0 mt-0.5" /> AI builds trust and moves them toward booking</p>
           </div>

           <div className="problem-card grainy-card">
              <h3 style={{ color: 'var(--teal)', fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <TrendingDown size={18} /> Paid traffic leaks
              </h3>
              <p style={{ color: 'var(--text-muted)' }}>You pay for clicks that don’t convert</p>
              <p style={{ marginTop: '1rem', color: 'var(--white)', fontWeight: 500, display: 'flex', alignItems: 'flex-start', gap: '8px', textAlign: 'left' }}><ChevronRight size={18} color="var(--teal)" className="shrink-0 mt-0.5" /> Every visitor is engaged and guided to action</p>
           </div>

        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how" id="how">
        <span className="section-tag">How it works</span>
        <h2>From Visitor → To<br /><em>Booked Patient</em></h2>

        <div className="steps" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
          <div className="step">
            <div className="step-num">Step 1</div>
            <h3>Visitor arrives</h3>
            <p>Traffic comes from Google search, social media ads, or direct referrals.</p>
          </div>
          <div className="step">
            <div className="step-num">Step 2</div>
            <h3>AI engages instantly</h3>
            <p>Our system steps in gracefully, answers questions, and removes doubts.</p>
          </div>
          <div className="step">
            <div className="step-num">Step 3</div>
            <h3>Patient is qualified</h3>
            <p>The patient's true intent, requested treatment, and timeframe urgency is identified directly.</p>
          </div>
          <div className="step">
            <div className="step-num">Step 4</div>
            <h3>Patient delivered</h3>
            <p>Patient name, phone number, and the full chat conversation is sent to you instantly.</p>
          </div>
          <div className="step" style={{ borderRight: 'none' }}>
            <div className="step-num">Step 5</div>
            <h3>Your team books</h3>
            <p>Your team reaches out to a completely warm, ready-to-convert patient.</p>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
           <h3 style={{ fontSize: '1.3rem', color: 'var(--teal)', fontWeight: 500, fontFamily: 'var(--serif)', fontStyle: 'italic', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}><ChevronRight size={20} color="var(--teal)" className="shrink-0" /> No gaps. No delays. No missed opportunities.</h3>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing">
        <span className="section-tag">Pricing</span>
        <h2>Choose Your Patient<br /><em>Acquisition System</em></h2>
        <p className="section-intro">A system upgrade path, not random services. Every plan includes full setup and onboarding. Cancel anytime.</p>

        <div className="pricing-grid">
          <div className="price-card">
            <div style={{ marginBottom: '1.5rem' }}><span className="price-tag" style={{ background: 'rgba(0,194,168,0.08)', padding: '6px 14px', borderRadius: '20px', display: 'inline-block', marginBottom: 0, color: 'var(--teal)' }}>Entry System</span></div>
            <h3>AI Conversion Layer</h3>
            <p style={{fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.5rem'}}>Turn your existing website into a 24/7 patient conversion engine — without rebuilding it.</p>
            <div className="price">$800<sub> setup</sub></div>
            <div className="price-note">then $400 / month</div>
            <div className="price-divider"></div>
            <ul className="price-features" style={{ marginBottom: '2rem' }}>
              <li>AI receptionist (24/7 patient engagement)</li>
              <li>Installs on any existing website</li>
              <li>Instant patient notifications</li>
              <li>Full conversation transcripts</li>
              <li>Basic patient qualification</li>
            </ul>
            <button onClick={(e) => { e.preventDefault(); window.dispatchEvent(new Event('open-chatbot')); }} className="price-cta">
              Activate AI Conversion <ArrowRight size={18} />
            </button>
          </div>

          <div className="price-card">
            <div style={{ marginBottom: '1.5rem' }}><span className="price-tag" style={{ background: 'rgba(0,194,168,0.08)', padding: '6px 14px', borderRadius: '20px', display: 'inline-block', marginBottom: 0, color: 'var(--teal)' }}>Foundation System</span></div>
            <h3>AI Patient Conversion System</h3>
            <p style={{fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.5rem'}}>Turn your website into a 24/7 patient conversion engine.</p>
            <div className="price">$1,500<sub> setup</sub></div>
            <div className="price-note">then $400 / month</div>
            <div className="price-divider"></div>
            <ul className="price-features" style={{ marginBottom: '2rem' }}>
              <li>Custom high-converting dental website</li>
              <li>AI receptionist (24/7 patient engagement)</li>
              <li>Instant patient notifications</li>
              <li>Full conversation transcripts</li>
              <li>Conversion optimization built-in</li>
            </ul>
            <button onClick={(e) => { e.preventDefault(); window.dispatchEvent(new Event('open-chatbot')); }} className="price-cta">
              Start Converting Patients <ArrowRight size={18} />
            </button>
          </div>

          <div className="price-card">
            <div style={{ marginBottom: '1.5rem' }}><span className="price-tag" style={{ background: 'rgba(0,194,168,0.08)', padding: '6px 14px', borderRadius: '20px', display: 'inline-block', marginBottom: 0, color: 'var(--teal)' }}>Growth System</span></div>
            <h3>Patient Demand Engine</h3>
            <p style={{fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.5rem'}}>Drive high-intent patients actively searching for treatment.</p>
            <div className="price">$1,200<sub> setup</sub></div>
            <div className="price-note">then $800 / month + ad spend</div>
            <div className="price-divider"></div>
            <ul className="price-features" style={{ marginBottom: '2rem' }}>
              <li>Google Search campaigns (high intent)</li>
              <li>Social media patient acquisition campaigns</li>
              <li>High-value treatment targeting</li>
              <li>Retargeting (recover lost visitors)</li>
              <li>Monthly optimization & reporting</li>
            </ul>
            <button onClick={(e) => { e.preventDefault(); window.dispatchEvent(new Event('open-chatbot')); }} className="price-cta">
              Start Getting More Patients <ArrowRight size={18} />
            </button>
          </div>

          <div className="price-card featured">
            <div style={{ marginBottom: '1.5rem' }}><span className="price-tag" style={{ background: 'rgba(0,194,168,0.15)', padding: '6px 14px', borderRadius: '20px', display: 'inline-block', marginBottom: 0, color: 'var(--teal)' }}>Full Acquisition System</span></div>
            <h3>The Complete End-To-End System</h3>
            <p style={{fontSize: '0.85rem', color: 'rgba(0,194,168,0.7)', marginTop: '0.5rem'}}>Attract, convert, and deliver booked patients automatically.</p>
            <div className="price">$2,500<sub> setup</sub></div>
            <div className="price-note">then $1,500 / month + ad spend</div>
            <div className="price-divider"></div>
            <ul className="price-features" style={{ marginBottom: '2rem' }}>
              <li>Everything in Foundation System</li>
              <li>Everything in Growth System</li>
              <li>Seamless patient journey (no drop-off)</li>
              <li>AI + ads working together</li>
              <li>Priority support + strategy</li>
            </ul>
            <button onClick={(e) => { e.preventDefault(); window.dispatchEvent(new Event('open-chatbot')); }} className="price-cta">
              Build My Patient System <ArrowRight size={18} />
            </button>
          </div>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(12px)', border: '1px solid rgba(0,194,168,0.2)', padding: '2.5rem', borderRadius: '12px', marginTop: '3.5rem', maxWidth: '800px', margin: '3.5rem auto 0 auto', textAlign: 'center' }}>
          <h3 style={{ fontSize: '1.4rem', color: 'var(--white)', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <Zap size={22} color="var(--teal)" /> 1 New Patient Can Pay For This Entire System
          </h3>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            <div style={{ background: 'rgba(0,194,168,0.05)', padding: '10px 20px', borderRadius: '30px', border: '1px solid rgba(0,194,168,0.1)' }}>
               <span style={{ color: 'var(--text-muted)' }}>Implants:</span> <strong style={{ color: 'var(--white)' }}>$3,000–$5,000</strong>
            </div>
            <div style={{ background: 'rgba(0,194,168,0.05)', padding: '10px 20px', borderRadius: '30px', border: '1px solid rgba(0,194,168,0.1)' }}>
               <span style={{ color: 'var(--text-muted)' }}>Invisalign:</span> <strong style={{ color: 'var(--white)' }}>$2,500–$4,000</strong>
            </div>
          </div>
          <p style={{ fontSize: '1.2rem', color: 'var(--teal)', fontWeight: 500, fontFamily: 'var(--serif)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}><ChevronRight size={20} color="var(--teal)" className="shrink-0" /> Even 1–2 patients/month = massive ROI.</p>
        </div>

        <p style={{textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2rem'}}>Ad spend is paid directly to Google/Meta by you. We charge only for management.</p>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials">
        <span className="section-tag">What clients say</span>
        <h2>Real results from<br /><em>real dental clinics</em></h2>
        <p className="section-intro">Don't take our word for it — here's what clinic owners say after working with Dentist Leads.</p>

        <div className="testi-grid">
          <div className="testi-card">
            <div className="testi-stars">★★★★★</div>
            <p className="testi-quote">"We used to lose at least 3 or 4 booking opportunities every weekend. Now the AI handles them instantly and our front desk calls them back Monday with warm patients already in hand. First month we booked two Invisalign consults we would have completely missed."</p>
            <div className="testi-author">
              <div className="testi-avatar"><img src="https://picsum.photos/seed/dentist1/100/100" alt="Dr. David M." referrerPolicy="no-referrer" /></div>
              <div>
                <div className="testi-name">Dr. David M.</div>
                <div className="testi-role">Principal Dentist · Family Dental Practice</div>
              </div>
            </div>
          </div>

          <div className="testi-card">
            <div className="testi-stars">★★★★★</div>
            <p className="testi-quote">"The Google ads campaign alone brought in 11 new patient enquiries in the first 3 weeks. What surprised me was how qualified they were — people asking specifically about implants and whitening, not just general checkups. The ROI was obvious within the first month."</p>
            <div className="testi-author">
              <div className="testi-avatar"><img src="https://picsum.photos/seed/dentist2/100/100" alt="Dr. Sarah N." referrerPolicy="no-referrer" /></div>
              <div>
                <div className="testi-name">Dr. Sarah N.</div>
                <div className="testi-role">Practice Owner · City Smiles Dental</div>
              </div>
            </div>
          </div>

          <div className="testi-card">
            <div className="testi-stars">★★★★★</div>
            <p className="testi-quote">"I was sceptical at first — I've tried agencies before and got a lot of promises with little to show for it. Dentist Leads is different. The demo showed me exactly what the system does before I spent a single dollar. Three months in and we've added roughly $12,000 in new patient revenue."</p>
            <div className="testi-author">
              <div className="testi-avatar"><img src="https://picsum.photos/seed/dentist3/100/100" alt="Dr. Ade O." referrerPolicy="no-referrer" /></div>
              <div>
                <div className="testi-name">Dr. Ade O.</div>
                <div className="testi-role">Clinic Director · Smile Studio</div>
              </div>
            </div>
          </div>

          <div className="testi-card">
            <div className="testi-stars">★★★★★</div>
            <p className="testi-quote">"Setup was genuinely painless. I sent over our service list and pricing on Monday, and by Wednesday the whole system was live. The AI even knew how to handle questions about payment plans and dental anxiety — things our front desk normally has to explain for 10 minutes on the phone."</p>
            <div className="testi-author">
              <div className="testi-avatar"><img src="https://picsum.photos/seed/dentist4/100/100" alt="Rachel C." referrerPolicy="no-referrer" /></div>
              <div>
                <div className="testi-name">Rachel C.</div>
                <div className="testi-role">Practice Manager · Brightside Dental</div>
              </div>
            </div>
          </div>

          <div className="testi-card">
            <div className="testi-stars">★★★★★</div>
            <p className="testi-quote">"What I love is seeing the patient details come through at 10 PM on a Friday with a full conversation already done. The patient has been answered, reassured, and is expecting our call Monday morning. That's a different kind of patient — they're already sold."</p>
            <div className="testi-author">
              <div className="testi-avatar"><img src="https://picsum.photos/seed/dentist5/100/100" alt="Dr. James T." referrerPolicy="no-referrer" /></div>
              <div>
                <div className="testi-name">Dr. James T.</div>
                <div className="testi-role">Owner · Prestige Dental Group</div>
              </div>
            </div>
          </div>

          <div className="testi-card">
            <div className="testi-stars">★★★★★</div>
            <p className="testi-quote">"We went from spending money on ads that went nowhere to having a system where every click has somewhere to land. The combination of the AI site and the ad campaigns working together is what makes the difference. Our cost per booked appointment dropped by almost half."</p>
            <div className="testi-author">
              <div className="testi-avatar"><img src="https://picsum.photos/seed/dentist6/100/100" alt="Dr. Priya M." referrerPolicy="no-referrer" /></div>
              <div>
                <div className="testi-name">Dr. Priya M.</div>
                <div className="testi-role">Principal · Apex Dental Care</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="objections" id="faq">
        <span className="section-tag">Common questions</span>
        <h2>Things dentists<br /><em>always ask us</em></h2>

        <div className="obj-grid">
          <div className="obj-card">
            <div className="obj-q">We already have a website. Do we still need this?</div>
            <div className="obj-a">Most dental websites are brochures — they give information but don't convert visitors. Our AI system turns your site into an active 24/7 receptionist. The two can work together, or we build you a fresh one.</div>
          </div>
          <div className="obj-card">
            <div className="obj-q">How quickly will we see results?</div>
            <div className="obj-a">Your AI system goes live within 48 hours and starts qualifying patients immediately. Paid ad results typically begin within the first 7–14 days as campaigns find their footing.</div>
          </div>
          <div className="obj-card">
            <div className="obj-q">What if a patient asks something the AI doesn't know?</div>
            <div className="obj-a">We train the AI specifically on your treatments, pricing, and FAQs before launch. If a question falls outside its knowledge, it politely captures the patient's details and tells them someone will follow up — so no booking opportunity is ever lost.</div>
          </div>
          <div className="obj-card">
            <div className="obj-q">Do we need a big ad budget to start?</div>
            <div className="obj-a">No. We can run effective campaigns on $300–$500/month in ad spend for a single-location clinic. We'd rather prove results at a lower budget first and scale once you're seeing returns.</div>
          </div>
          <div className="obj-card">
            <div className="obj-q">What happens to the patient details? Do they go into a CRM?</div>
            <div className="obj-a">Every patient enquiry is sent instantly to your email inbox with the patient's name, phone number, and full chat transcript. You can also integrate with any CRM or booking system — we'll set it up for you.</div>
          </div>
          <div className="obj-card">
            <div className="obj-q">Is there a long-term commitment?</div>
            <div className="obj-a">No lock-in contracts. You pay month to month after the setup fee. That said, most clients stay because the system keeps delivering — not because they have to.</div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="cta-section" id="contact" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <span className="section-tag">Contact</span>
        <h2>Ready to grow your practice?</h2>
        <p>Skip the forms. Reach out directly via chat, phone, or instantly schedule a real strategy session where we show you the systems in action.</p>
        
        <div className="contact-grid" style={{ width: '100%', maxWidth: '1000px', marginTop: '2rem' }}>
          
          {/* Card 1: Direct */}
          <div style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(12px)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1rem' }}>
             <div className="problem-icon" style={{ margin: '0' }}><MessageCircle size={20} /></div>
             <h3 style={{ fontSize: '1.2rem', color: 'var(--white)' }}>Simple & Direct</h3>
             <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', flex: 1 }}>Prefer a simple text or email? Reach out directly to our human team and we will reply instantly.</p>
             <div style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '0.75rem' }}>
                <a href="https://wa.me/+2290192206612" target="_blank" rel="noreferrer" className="btn-contact-light-teal" style={{ width: '100%', padding: '0.8rem', gap: '8px' }}>
                   +2290192206612 <MessageCircle size={18} />
                </a>
                <a href="mailto:madudimcjx@gmail.com" className="btn-contact-light-teal" style={{ width: '100%', padding: '0.8rem', gap: '8px', textTransform: 'lowercase' }}>
                   madudimcjx@gmail.com <Mail size={18} />
                </a>
             </div>
          </div>

          {/* Card 2: Calendly/Call */}
          <div style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(12px)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1rem' }}>
             <div className="problem-icon" style={{ margin: '0' }}><Calendar size={20} /></div>
             <h3 style={{ fontSize: '1.2rem', color: 'var(--white)' }}>Book a Strategy Call</h3>
             <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', flex: 1 }}>Pick a time that works for you. We'll run a live assessment of your current setup and show you the AI system in action.</p>
             <button onClick={() => alert('Strategy Call Booking (Calendly) would open here.')} className="btn-contact-light-teal" style={{ width: '100%', marginTop: 'auto' }}>
               Schedule Now <Calendar size={18} />
             </button>
          </div>

          {/* Card 3: AI Agent */}
          <div style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(12px)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1rem' }}>
             <div className="problem-icon" style={{ margin: '0' }}><Bot size={20} /></div>
             <h3 style={{ fontSize: '1.2rem', color: 'var(--white)' }}>Ask AI Receptionist</h3>
             <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', flex: 1 }}>Have a quick question about pricing or features? Ask our own AI Sales Agent for an instant answer right now.</p>
             <button 
                onClick={() => window.dispatchEvent(new Event('open-chatbot'))}
                className="btn-contact-white" style={{ width: '100%', marginTop: 'auto' }}>
                Start AI Chat <Bot size={18} />
             </button>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="footer-content">
          <div className="footer-col">
            <div className="footer-logo" style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '12px', width: '100%', color: 'var(--white)', fontWeight: '600', fontSize: '1.4rem', letterSpacing: '0.5px' }}>
              <img 
                src="https://i.ibb.co/mCLy2twx/Chat-GPT-Image-Apr-22-2026-03-59-53-PM-removebg-preview.png" 
                alt="Dentist Leads Icon" 
                style={{ height: '48px', width: 'auto', objectFit: 'contain' }} 
              />
              <span>Dentist Leads</span>
            </div>
            <p>We install AI-powered patient acquisition systems that turn every website visit into a booked patient — 24/7, without adding pressure to your front desk.</p>
          </div>
          
          <div className="footer-col">
            <h4>Quick Links</h4>
            <div className="footer-links">
              <a href="#">Home</a>
              <a href="#services">What we do</a>
              <a href="#how">How it works</a>
              <a href="#pricing">Pricing</a>
              <a href="#faq">FAQ</a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Contact Us</h4>
            <div className="footer-links footer-contact-links">
              <a href="https://wa.me/+2290192206612" target="_blank" rel="noreferrer">
                <div className="footer-icon-wrap"><MessageCircle size={15} /></div> WhatsApp: +2290192206612
              </a>
              <a href="mailto:madudimcjx@gmail.com">
                <div className="footer-icon-wrap"><Mail size={15} /></div> madudimcjx@gmail.com
              </a>
              <a href="#contact">
                <div className="footer-icon-wrap"><Calendar size={15} /></div> Book a Strategy Call
              </a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>© 2026 Dentist Leads. All rights reserved.</p>
          <p style={{ color: 'var(--teal)', fontWeight: '500' }}>Cooked by Digital Chukwudi</p>
        </div>
      </footer>
        </div>
      </div>

      {/* CHATBOT */}
      <Chatbot />
    </>
  );
}
