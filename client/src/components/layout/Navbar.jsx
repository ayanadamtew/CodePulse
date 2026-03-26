"use client";

import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  FiLogIn, FiUserPlus, FiUser, FiLogOut,
  FiMenu, FiX, FiCode, FiMail, FiInfo,
  FiHome, FiGrid, FiZap,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const NavLink = ({ to, children, onClick, exact = false }) => {
  const location = useLocation();
  const isActive = exact
    ? location.pathname === to
    : location.pathname.startsWith(to);

  return (
    <Link
      to={to}
      onClick={onClick}
      className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 group
                  ${isActive ? "text-white" : "text-slate-400 hover:text-white"}`}
    >
      {children}
      <span
        className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 transition-all duration-300 group-hover:w-4/5
                    ${isActive ? "w-4/5" : "w-0"}`}
      />
    </Link>
  );
};

const MobileNavLink = ({ to, children, onClick, icon }) => (
  <Link
    to={to}
    onClick={onClick}
    className="flex items-center px-4 py-3 rounded-xl text-sm font-medium text-slate-300 hover:bg-white/5 hover:text-white transition-all duration-150"
  >
    {icon && <span className="mr-3 text-emerald-400">{icon}</span>}
    {children}
  </Link>
);

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate("/login");
  };

  const navItems = [
    { to: "/", label: "Home", exact: true, icon: <FiHome /> },
    { to: "/problems", label: "Problems", icon: <FiCode /> },
    { to: "/topics", label: "Topics", icon: <FiGrid /> },
    { to: "/about", label: "About", icon: <FiInfo /> },
    { to: "/contact", label: "Contact", icon: <FiMail /> },
  ];

  const mobileMenuVariants = {
    hidden: { opacity: 0, y: -12, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.25, ease: "easeOut" } },
    exit: { opacity: 0, y: -8, scale: 0.98, transition: { duration: 0.18, ease: "easeIn" } },
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-white/[0.06]"
      style={{ background: 'rgba(5, 8, 22, 0.8)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group shrink-0" onClick={() => setIsMenuOpen(false)}>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/25 group-hover:shadow-emerald-500/50 transition-shadow duration-300">
              <FiZap className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">
              CodePulse
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} exact={item.exact}>
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-2">
            {user ? (
              <>
                <NavLink to="/profile">
                  <FiUser className="inline mr-1.5" />Profile
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-rose-400 border border-rose-500/30 hover:bg-rose-500/10 hover:border-rose-500/60 transition-all duration-200"
                >
                  <FiLogOut className="w-4 h-4" /> Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login">
                  <FiLogIn className="inline mr-1" /> Login
                </NavLink>
                <Link
                  to="/register"
                  className="flex items-center gap-1.5 px-5 py-2 rounded-lg text-sm font-semibold text-white
                             bg-gradient-to-r from-emerald-500 to-teal-600 
                             hover:from-emerald-400 hover:to-teal-500
                             shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/50
                             transition-all duration-300 transform hover:scale-[1.03]"
                >
                  <FiUserPlus className="w-4 h-4" /> Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all"
              aria-label="Toggle menu"
            >
              <AnimatePresence initial={false} mode="wait">
                <motion.div
                  key={isMenuOpen ? "x" : "menu"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  {isMenuOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="md:hidden border-t border-white/[0.06]"
            style={{ background: 'rgba(5, 8, 22, 0.95)' }}
          >
            <div className="px-3 py-3 space-y-1">
              {navItems.map((item) => (
                <MobileNavLink
                  key={item.to}
                  to={item.to}
                  icon={item.icon}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </MobileNavLink>
              ))}

              <div className="my-2 h-px bg-white/5" />

              {user ? (
                <>
                  <MobileNavLink to="/profile" icon={<FiUser />} onClick={() => setIsMenuOpen(false)}>
                    Profile
                  </MobileNavLink>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center px-4 py-3 rounded-xl text-sm font-medium text-rose-400 hover:bg-rose-500/10 transition-all"
                  >
                    <FiLogOut className="mr-3" /> Logout
                  </button>
                </>
              ) : (
                <>
                  <MobileNavLink to="/login" icon={<FiLogIn />} onClick={() => setIsMenuOpen(false)}>
                    Login
                  </MobileNavLink>
                  <Link
                    to="/register"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-center gap-2 mx-1 mt-2 px-4 py-3 rounded-xl text-sm font-semibold text-white
                               bg-gradient-to-r from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/20"
                  >
                    <FiUserPlus className="w-4 h-4" /> Get Started Free
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;