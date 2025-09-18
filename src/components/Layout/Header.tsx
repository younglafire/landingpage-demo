import React, { useState, useEffect } from 'react';
import { GraduationCap, Menu, X, User, Settings, LogOut, Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../../store/useStore';
import { AuthModal } from '../Auth/AuthModal';

interface HeaderProps {
  onMenuToggle: () => void;
  isMobileMenuOpen: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onMenuToggle, isMobileMenuOpen }) => {
  const { user, isAuthenticated, setUser } = useStore();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    setUser(null);
    setShowUserMenu(false);
  };

  return (
    <>
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 shadow-lg backdrop-blur-lg border-b border-gray-200/70'
            : 'bg-white/80 backdrop-blur-md border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
{/* Logo */}
<div className="flex items-center space-x-2 group cursor-pointer">
  <div className="w-12 h-12 rounded-xl overflow-hidden flex items-center justify-center group-hover:rotate-12 transition-transform duration-300 shadow-md">
    <img 
      src='/logo.png'
      alt="Logo" 
      className="object-cover w-full h-full"
    />
  </div>
  <span className="text-xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
    Study VHU
  </span>
</div>


            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {[
                { label: 'Về Chúng Tôi', href: '#vision' },
                { label: 'Công Cụ', href: '#tools' },
                { label: 'AI Hỗ Trợ', href: '#ai' },
                { label: 'Tài Liệu', href: '#materials' },
                { label: 'Liên Hệ', href: '#contact' },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="relative text-gray-700 hover:text-blue-600 font-medium group"
                >
                  {link.label}
                  <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                </a>
              ))}

              {/* User Menu */}
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-9 h-9 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm ring-2 ring-purple-300 shadow-md">
                      {user?.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-gray-700">{user?.name}</span>
                  </button>

                  <AnimatePresence>
                    {showUserMenu && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200 py-2 overflow-hidden"
                      >
                        <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
                          <p className="text-sm font-semibold text-gray-800">{user?.name}</p>
                          <p className="text-xs text-gray-500">{user?.email}</p>
                        </div>

                        <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 flex items-center space-x-2">
                          <User className="w-4 h-4" />
                          <span>Hồ sơ</span>
                        </button>

                        <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 flex items-center space-x-2">
                          <Settings className="w-4 h-4" />
                          <span>Cài đặt</span>
                        </button>

                        <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 flex items-center space-x-2">
                          <Bell className="w-4 h-4" />
                          <span>Thông báo</span>
                        </button>

                        <hr className="my-2 border-gray-200" />

                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Đăng xuất</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowAuthModal(true)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full shadow-md hover:shadow-xl transition-all"
                >
                  Đăng Nhập
                </motion.button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button className="p-2 rounded-lg hover:bg-gray-100" onClick={onMenuToggle}>
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white/95 backdrop-blur-lg border-t border-gray-200/50 shadow-lg"
            >
              <div className="px-4 py-4 space-y-4">
                {['Về Chúng Tôi', 'Công Cụ', 'AI Hỗ Trợ', 'Tài Liệu', 'Liên Hệ'].map((item, i) => (
                  <motion.a
                    key={i}
                    href={`#${item.toLowerCase().replace(/\s/g, '')}`}
                    whileHover={{ x: 4 }}
                    className="block text-gray-700 hover:text-blue-600 transition-colors font-medium"
                  >
                    {item}
                  </motion.a>
                ))}

                {!isAuthenticated && (
                  <div className="pt-4 border-t border-gray-200">
                    <button
                      onClick={() => setShowAuthModal(true)}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full shadow"
                    >
                      Đăng Nhập
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </>
  );
};
