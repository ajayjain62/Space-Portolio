"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface MenuItem {
  label: string;
  ariaLabel: string;
  link: string;
}

interface SocialItem {
  label: string;
  link: string;
}

interface StaggeredMenuProps {
  position?: 'left' | 'right';
  items: MenuItem[];
  socialItems?: SocialItem[];
  displaySocials?: boolean;
  displayItemNumbering?: boolean;
  menuButtonColor?: string;
  openMenuButtonColor?: string;
  changeMenuColorOnOpen?: boolean;
  colors?: string[];
  logoUrl?: string;
  accentColor?: string;
  onMenuOpen?: () => void;
  onMenuClose?: () => void;
}

const StaggeredMenu: React.FC<StaggeredMenuProps> = ({
  position = 'right',
  items,
  socialItems = [],
  displaySocials = true,
  displayItemNumbering = false,
  menuButtonColor = '#fff',
  openMenuButtonColor = '#fff',
  changeMenuColorOnOpen = true,
  colors = ['#B19EEF', '#5227FF'],
  logoUrl,
  accentColor = '#ff6b6b',
  onMenuOpen,
  onMenuClose,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      onMenuOpen?.();
    } else {
      document.body.style.overflow = 'unset';
      onMenuClose?.();
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuVariants = {
    closed: {
      x: position === 'right' ? '100%' : '-100%',
      transition: {
        duration: 0.5,
        ease: [0.6, 0.01, -0.05, 0.95],
      },
    },
    open: {
      x: 0,
      transition: {
        duration: 0.5,
        ease: [0.6, 0.01, -0.05, 0.95],
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    closed: {
      x: position === 'right' ? 100 : -100,
      opacity: 0,
    },
    open: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.6, 0.01, -0.05, 0.95],
      },
    },
  };

  const socialVariants = {
    closed: {
      scale: 0,
      opacity: 0,
    },
    open: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.3,
        delay: items.length * 0.1 + 0.3,
      },
    },
  };

  const buttonVariants = {
    closed: {
      rotate: 0,
    },
    open: {
      rotate: 90,
      transition: {
        duration: 0.3,
      },
    },
  };

  const lineVariants = {
    closed: {
      rotate: 0,
      y: 0,
      opacity: 1,
    },
    open: (i: number) => {
      if (i === 1) {
        return {
          opacity: 0,
          transition: {
            duration: 0.2,
          },
        };
      }
      return {
        rotate: i === 0 ? 45 : -45,
        y: i === 0 ? 10 : -10,
        transition: {
          duration: 0.3,
        },
      };
    },
  };

  return (
    <>
      {/* Menu Button */}
      <motion.button
        className="fixed top-8 z-[100] cursor-pointer"
        style={{
          [position]: '2rem',
          color: changeMenuColorOnOpen && isOpen ? openMenuButtonColor : menuButtonColor,
        }}
        onClick={toggleMenu}
        variants={buttonVariants}
        animate={isOpen ? 'open' : 'closed'}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        <div className="relative w-8 h-6">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="absolute left-0 w-full h-0.5 bg-current"
              style={{
                top: i === 0 ? '0px' : i === 1 ? '10px' : '20px',
              }}
              variants={lineVariants}
              custom={i}
              animate={isOpen ? 'open' : 'closed'}
            />
          ))}
        </div>
      </motion.button>

      {/* Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black z-[90]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              exit={{ opacity: 0 }}
              onClick={toggleMenu}
            />

            {/* Menu Panel */}
            <motion.div
              className="fixed top-0 bottom-0 w-full max-w-md z-[95] overflow-y-auto"
              style={{
                [position]: 0,
                background: `linear-gradient(135deg, ${colors[0]} 0%, ${colors[1]} 100%)`,
              }}
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div className="flex flex-col h-full p-12">
                {/* Logo */}
                {logoUrl && (
                  <motion.div
                    className="mb-12"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <Image
                      src={logoUrl}
                      alt="Logo"
                      width={80}
                      height={80}
                      className="object-contain"
                    />
                  </motion.div>
                )}

                {/* Menu Items */}
                <nav className="flex-1 flex flex-col justify-center">
                  <ul className="space-y-6">
                    {items.map((item, index) => (
                      <motion.li
                        key={item.label}
                        variants={itemVariants}
                        initial="closed"
                        animate={isOpen ? "open" : "closed"}
                      >
                        {item.link.startsWith('#') ? (
                          <a
                            href={item.link}
                            className="block text-4xl md:text-5xl font-bold hover:opacity-70 transition-opacity"
                            style={{ 
                              color: '#ffffff',
                              opacity: 1,
                              zIndex: 10,
                              position: 'relative'
                            }}
                            aria-label={item.ariaLabel}
                            onClick={(e) => {
                              e.preventDefault();
                              setIsOpen(false);
                              const element = document.querySelector(item.link);
                              if (element) {
                                element.scrollIntoView({ behavior: 'smooth' });
                              }
                            }}
                          >
                            {displayItemNumbering && (
                              <span
                                className="inline-block mr-4 text-2xl md:text-3xl"
                                style={{ color: accentColor, opacity: 0.5 }}
                              >
                                {String(index + 1).padStart(2, '0')}
                              </span>
                            )}
                            <span style={{ color: '#ffffff', opacity: 1 }}>{item.label}</span>
                          </a>
                        ) : (
                          <Link
                            href={item.link}
                            className="block text-4xl md:text-5xl font-bold hover:opacity-70 transition-opacity"
                            style={{ 
                              color: '#ffffff',
                              opacity: 1,
                              zIndex: 10,
                              position: 'relative'
                            }}
                            aria-label={item.ariaLabel}
                            onClick={() => setIsOpen(false)}
                          >
                            {displayItemNumbering && (
                              <span
                                className="inline-block mr-4 text-2xl md:text-3xl"
                                style={{ color: accentColor, opacity: 0.5 }}
                              >
                                {String(index + 1).padStart(2, '0')}
                              </span>
                            )}
                            <span style={{ color: '#ffffff', opacity: 1 }}>{item.label}</span>
                          </Link>
                        )}
                      </motion.li>
                    ))}
                  </ul>
                </nav>

                {/* Social Items */}
                {displaySocials && socialItems.length > 0 && (
                  <motion.div
                    className="mt-12 pt-8 border-t border-white/20"
                    variants={socialVariants}
                    initial="closed"
                    animate="open"
                  >
                    <div className="flex gap-6">
                      {socialItems.map((social) => (
                        <motion.a
                          key={social.label}
                          href={social.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white hover:opacity-70 transition-opacity text-lg font-medium"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          {social.label}
                        </motion.a>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default StaggeredMenu;
