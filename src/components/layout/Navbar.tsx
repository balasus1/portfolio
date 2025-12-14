import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download } from "lucide-react";
import { navItems, profileData } from "@/data/portfolioData";
import { Button } from "@/components/ui/button";
import ResumeDownloadMenu from "@/components/ui/ResumeDownloadMenu";
import AnimationToggle from "@/components/ui/AnimationToggle";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [showResumeModal, setShowResumeModal] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);

          const sections = navItems.map((item) => item.href.replace("#", ""));
          for (const section of sections.reverse()) {
            const element = document.getElementById(section);
            if (element) {
              const rect = element.getBoundingClientRect();
              if (rect.top <= 100) {
                setActiveSection(section);
                break;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    // Small delay to allow menu to close before scrolling
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: 0 }}
      className={`header-container fixed top-0 left-0 right-0 z-50 ${
        scrolled ? "bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-lg" : "bg-transparent"
      }`}
      style={{
        transform: "translate3d(0, 0, 0)",
        WebkitTransform: "translate3d(0, 0, 0)",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        willChange: "transform",
      }}
    >
      <div className="header-wrapper container-custom">
        <div className="header-content flex items-center justify-between h-20">
          <motion.a
            href="#home"
            className="header-logo text-2xl font-heading font-bold gradient-text"
            whileHover={{ scale: 1.05 }}
          >
            {profileData.shortName}
          </motion.a>

          {/* Desktop Navigation */}
          <div className="nav-menu-desktop hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <motion.button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className={`relative text-sm font-medium transition-colors ${
                  activeSection === item.href.replace("#", "")
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                whileHover={{ y: -2 }}
              >
                {item.name}
                {activeSection === item.href.replace("#", "") && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                  />
                )}
              </motion.button>
            ))}
            {/* Animation Toggle for Desktop/Tablet */}
            <AnimationToggle />
            <Button 
              variant="default" 
              size="sm" 
              className="gap-2"
              onClick={() => setShowResumeModal(true)}
            >
              <Download className="w-4 h-4" />
              Resume
            </Button>
          </div>

          {/* Mobile Menu - Animation Toggle and Hamburger */}
          <div className="mobile-menu-actions md:hidden flex items-center gap-2">
            {/* Animation Toggle for Mobile */}
            <AnimationToggle />
            <button
              className="mobile-menu-toggle p-2 text-foreground rounded-lg hover:bg-muted transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mobile-menu-container md:hidden bg-background/95 backdrop-blur-xl border-b border-border"
          >
            <div className="mobile-menu-content container-custom py-4 flex flex-col gap-2">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleNavClick(item.href)}
                  className={`py-3 px-4 text-left rounded-lg transition-colors ${
                    activeSection === item.href.replace("#", "")
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-secondary"
                  }`}
                >
                  {item.name}
                </motion.button>
              ))}
              <Button 
                variant="default" 
                className="mt-2 gap-2"
                onClick={() => {
                  setShowResumeModal(true);
                  setIsOpen(false);
                }}
              >
                <Download className="w-4 h-4" />
                Download Resume
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Resume Download Modal */}
      {showResumeModal && (
        <ResumeDownloadMenu onClose={() => setShowResumeModal(false)} />
      )}
    </motion.nav>
  );
};

export default Navbar;
