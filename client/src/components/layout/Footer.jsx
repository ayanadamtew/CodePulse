import { Link } from "react-router-dom";
import { FiGithub, FiTwitter, FiLinkedin, FiInstagram, FiZap } from "react-icons/fi";

const FooterLink = ({ to, children }) => (
  <li>
    <Link
      to={to}
      className="text-sm text-slate-500 hover:text-emerald-300 transition-colors duration-200"
    >
      {children}
    </Link>
  </li>
);

const SocialIcon = ({ href, icon: Icon, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="w-9 h-9 rounded-lg border border-white/8 flex items-center justify-center text-slate-500
               hover:text-emerald-400 hover:border-emerald-500/40 hover:bg-emerald-500/10
               transition-all duration-200 hover:scale-110"
  >
    <Icon size={16} />
  </a>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const resources = [
    { to: "/problems", label: "Problems" },
    { to: "/topics",   label: "Topics" },
  ];

  const company = [
    { to: "/about",   label: "About Us" },
    { to: "/contact", label: "Contact" },
  ];

  const socialLinks = [
    { href: "https://github.com/ayanadamtew",   icon: FiGithub,    label: "GitHub" },
    { href: "https://twitter.com/ayuda0117",     icon: FiTwitter,   label: "Twitter" },
    { href: "https://linkedin.com/ayanadamtew", icon: FiLinkedin,  label: "LinkedIn" },
    { href: "https://instagram.com/a_yu.da",    icon: FiInstagram, label: "Instagram" },
  ];

  return (
    <footer className="bg-[#050816] text-slate-400 border-t border-white/[0.05]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="inline-flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                <FiZap className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">CodePulse</span>
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed max-w-xs mb-6">
              Sharpen your skills through consistent practice, AI-powered hints, and
              visual algorithm breakdowns. Land your dream tech role.
            </p>
            <div className="flex gap-2">
              {socialLinks.map((s) => (
                <SocialIcon key={s.label} {...s} />
              ))}
            </div>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-widest mb-5">Resources</h3>
            <ul className="space-y-3">{resources.map((l) => <FooterLink key={l.label} to={l.to}>{l.label}</FooterLink>)}</ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-widest mb-5">Company</h3>
            <ul className="space-y-3">{company.map((l) => <FooterLink key={l.label} to={l.to}>{l.label}</FooterLink>)}</ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t border-white/[0.05] flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-slate-600">
            © {currentYear} CodePulse. All rights reserved.
          </p>
          <p className="text-xs text-slate-600">
            Built with <span className="text-rose-400">♥</span> and passion.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;