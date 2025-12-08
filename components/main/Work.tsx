"use client";

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, Clock, Mail, User, MessageSquare, Briefcase, Stars } from 'lucide-react';
import Particles from 'react-particles';
import type { Engine } from 'tsparticles-engine';
import { loadSlim } from 'tsparticles-slim';
import emailjs from '@emailjs/browser';

interface FormData {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
}

function App() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    projectType: '',
    budget: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [activeField, setActiveField] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const templateParams = {
        to_email: 'ajayyy2703@gmail.com',
        from_name: formData.name,
        from_email: formData.email,
        project_type: formData.projectType,
        budget: formData.budget,
        message: formData.message,
      };

      await emailjs.send(
        'service_id', // Replace with your EmailJS service ID
        'template_id', // Replace with your EmailJS template ID
        templateParams,
        'public_key' // Replace with your EmailJS public key
      );

      setSubmitted(true);
      
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          name: '',
          email: '',
          projectType: '',
          budget: '',
          message: '',
        });
      }, 3000);
    } catch (err) {
      setError('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div id="contact" className="relative min-h-screen bg-[#030014] text-white overflow-hidden">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: {
            color: {
              value: "transparent",
            },
          },
          fpsLimit: 120,
          particles: {
            color: {
              value: "#ffffff",
            },
            links: {
              color: "#ffffff",
              distance: 150,
              enable: true,
              opacity: 0.2,
              width: 1,
            },
            move: {
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: true,
              speed: 1,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.3,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 3 },
            },
          },
        }}
      />

      <div className="relative z-10 min-h-screen p-6 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-2xl"
        >
          <div className="text-center mb-10">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block"
            >
              <h1 className="text-5xl font-bold mb-4 flex items-center justify-center gap-3">
                <span className="w-10 h-10 text-purple-500">
                  <Stars />
                </span>
                Let's Create Together
                <span className="w-10 h-10 text-blue-400">
                  <Sparkles />
                </span>
              </h1>
            </motion.div>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-gray-400 text-lg"
            >
              Transform your vision into digital reality
            </motion.p>
          </div>

          <motion.form 
            onSubmit={handleSubmit}
            className="bg-gray-900/40 backdrop-blur-xl rounded-3xl p-8 shadow-[0_0_50px_rgba(192,219,255,0.15)] border border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="space-y-6">
              {['name', 'email', 'projectType', 'budget', 'message'].map((field, index) => (
                <motion.div 
                  key={field}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 * (index + 1) }}
                  className="relative"
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center gap-2 p-4 rounded-xl border transition-all duration-300 ${
                      activeField === field 
                        ? 'border-purple-500 bg-gray-800/50 shadow-[0_0_20px_rgba(168,85,247,0.15)]' 
                        : 'border-gray-600 bg-gray-800/30'
                    }`}
                  >
                    {field === 'name' && <User className="w-5 h-5 text-purple-400" />}
                    {field === 'email' && <Mail className="w-5 h-5 text-purple-400" />}
                    {field === 'projectType' && <Briefcase className="w-5 h-5 text-purple-400" />}
                    {field === 'budget' && <Clock className="w-5 h-5 text-purple-400" />}
                    {field === 'message' && <MessageSquare className="w-5 h-5 text-purple-400" />}

                    {field === 'message' ? (
                      <textarea
                        name={field}
                        value={formData[field as keyof FormData]}
                        onChange={handleChange}
                        onFocus={() => setActiveField(field)}
                        onBlur={() => setActiveField(null)}
                        placeholder={`Your ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                        required
                        rows={4}
                        className="bg-transparent w-full focus:outline-none resize-none"
                      />
                    ) : field === 'projectType' || field === 'budget' ? (
                      <select
                        name={field}
                        value={formData[field as keyof FormData]}
                        onChange={handleChange}
                        onFocus={() => setActiveField(field)}
                        onBlur={() => setActiveField(null)}
                        required
                        className="bg-transparent w-full focus:outline-none"
                      >
                        <option value="" disabled>
                          {field === 'projectType' ? 'Select Project Type' : 'Select Budget Range'}
                        </option>
                        {field === 'projectType' ? (
                          <>
                            <option value="website">Website Development</option>
                            <option value="mobile">Mobile App</option>
                            <option value="desktop">Desktop Application</option>
                            <option value="other">Other</option>
                          </>
                        ) : (
                          <>
                            <option value="small">$5,000 - $10,000</option>
                            <option value="medium">$10,000 - $25,000</option>
                            <option value="large">$25,000 - $50,000</option>
                            <option value="enterprise">$50,000+</option>
                          </>
                        )}
                      </select>
                    ) : (
                      <input
                        type={field === 'email' ? 'email' : 'text'}
                        name={field}
                        value={formData[field as keyof FormData]}
                        onChange={handleChange}
                        onFocus={() => setActiveField(field)}
                        onBlur={() => setActiveField(null)}
                        placeholder={`Your ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                        required
                        className="bg-transparent w-full focus:outline-none"
                      />
                    )}
                  </motion.div>
                </motion.div>
              ))}

              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-400 text-sm mt-2"
                >
                  {error}
                </motion.div>
              )}

              <motion.button
                type="submit"
                disabled={isSubmitting || submitted}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-4 px-6 rounded-xl flex items-center justify-center gap-2 text-white font-medium transition-all duration-300 ${
                  isSubmitting || submitted
                    ? 'bg-green-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Sending...
                  </>
                ) : submitted ? (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Message Sent!
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </motion.button>
            </div>
          </motion.form>
        </motion.div>
      </div>
    </div>
  );
}

export default App;