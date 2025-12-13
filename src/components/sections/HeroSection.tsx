import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail, MapPin, ExternalLink } from "lucide-react";
import { profileData } from "@/data/portfolioData";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";
import LocationMapTooltip from "@/components/ui/LocationMapTooltip";

const HeroSection = () => {
  const [showMap, setShowMap] = useState(false);
  
  // Extract coordinates from location string
  const coordinates = {
    lat: 11.9416,
    lng: 79.8083,
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const socialLinks = [
    { icon: Github, href: profileData.github, label: "GitHub" },
    { icon: Linkedin, href: profileData.linkedin, label: "LinkedIn" },
    { icon: Mail, href: `mailto:${profileData.email}`, label: "Email" },
  ];

  return (
    <section id="home" className="hero-section-container min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Image */}
      <div className="hero-background absolute inset-0 z-0">
        {/* Background image with opacity */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${heroBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            opacity: 0.30,        // 👈 Your background image opacity
          }}
        />

        {/* Overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/99 via-background/95 to-background/98" />
      </div>

      <div className="hero-content-wrapper container-custom section-padding relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="hero-content max-w-4xl mx-auto text-center"
        >
          {/* Status Badge */}
          <motion.div variants={itemVariants} className="inline-flex items-center gap-3 mb-6">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <div 
              className="relative px-4 py-2 rounded-full border-2 overflow-hidden"
              style={{
                background: "linear-gradient(135deg, hsl(var(--card) / 0.7) 0%, hsl(var(--card) / 0.5) 100%)",
                backdropFilter: "blur(20px)",
                borderColor: "hsl(var(--primary) / 0.3)",
                boxShadow: "0 4px 16px hsl(var(--primary) / 0.2), inset 0 1px 0 rgba(255,255,255,0.2)",
              }}
            >
              {/* Glossy overlay */}
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 50%, rgba(0,0,0,0.05) 100%)",
                }}
              />
              {/* Shimmer effect */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)",
                  animation: "shimmer 3s ease-in-out infinite",
                }}
              />
              <span className="relative z-10 text-sm font-semibold text-foreground tracking-wider">
                Available for <span className="text-primary font-bold">REMOTE OPPORTUNITIES</span>
              </span>
            </div>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold mb-6 leading-tight"
          >
            <span className="gradient-text">{profileData.name.split(" ")[0]}</span>
          </motion.h1>

          {/* Title */}
          <motion.div variants={itemVariants} className="mb-6">
            <h2 
              className="text-xl sm:text-2xl md:text-3xl font-heading font-semibold"
              style={{
                background: "linear-gradient(135deg, hsl(174, 85%, 65%) 0%, hsl(200, 90%, 55%) 50%, hsl(280, 75%, 65%) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                filter: "drop-shadow(0 0 8px hsl(174, 85%, 65% / 0.6))",
              }}
            >
              Senior Fullstack Engineer
            </h2>
          </motion.div>

          {/* Tagline */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-4"
          >
            {profileData.tagline}
          </motion.p>

          {/* Location with radiation effect */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-2 text-muted-foreground mb-8"
          >
            <div 
              className="relative flex items-center gap-2 cursor-pointer group"
              onClick={() => setShowMap(!showMap)}
            >
              <div className="relative flex flex-col items-center">
                {/* Radiation rings */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="absolute w-16 h-16 rounded-full border-2"
                      style={{
                        borderColor: `hsl(var(--primary) / ${0.3 - i * 0.1})`,
                      }}
                      animate={{
                        scale: [1 + i * 0.3, 1.5 + i * 0.5, 1 + i * 0.3],
                        opacity: [0.3 - i * 0.1, 0, 0.3 - i * 0.1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.3,
                        ease: "easeOut",
                      }}
                    />
                  ))}
                </div>
                {/* Bouncing icon */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
                  className="relative z-10"
                >
                  <MapPin className="w-5 h-5 text-primary fill-primary/40 drop-shadow-lg group-hover:text-accent transition-colors" />
                </motion.div>
                {/* Ground glow */}
                <motion.div
                  className="absolute top-6 w-3 h-1 bg-primary/60 rounded-full blur-sm"
                  animate={{ scale: [1, 0.7, 1], opacity: [0.6, 0.3, 0.6] }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
              <span className="group-hover:text-primary transition-colors">{profileData.location}</span>
              
              {/* Map Tooltip */}
              <LocationMapTooltip 
                isVisible={showMap}
                coordinates={coordinates}
                locationName="Puducherry, India"
                onClose={() => setShowMap(false)}
              />
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <Button
              size="lg"
              className="min-w-[180px] font-semibold hover:opacity-90 transition-opacity gap-2"
              style={{
                backgroundColor: "hsl(var(--primary))",
                color: "hsl(var(--primary-foreground))",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "hsl(var(--primary) / 0.9)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "hsl(var(--primary))";
              }}
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              Let's Connect
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="min-w-[180px] font-semibold gap-2"
              style={{
                borderColor: "hsl(var(--primary) / 0.5)",
                backgroundColor: "hsl(var(--secondary))",
                color: "hsl(var(--foreground))",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "hsl(var(--secondary) / 0.8)";
                e.currentTarget.style.borderColor = "hsl(var(--primary) / 0.7)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "hsl(var(--secondary))";
                e.currentTarget.style.borderColor = "hsl(var(--primary) / 0.5)";
              }}
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            >
              <ExternalLink className="w-4 h-4" />
              View Projects
            </Button>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants} className="flex items-center justify-center gap-4">
            {socialLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-social-link"
                className="w-12 h-12 rounded-full glass-card flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all"
                whileHover={{ scale: 1.1, y: -4 }}
                whileTap={{ scale: 0.95 }}
                aria-label={link.label}
              >
                <link.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="hero-scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.button
          onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
          className="hero-scroll-button flex items-center justify-center transition-all cursor-pointer"
          animate={{ 
            y: [0, 8, 0],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity,
            ease: "easeInOut",
          }}
          whileHover={{
            scale: 1.2,
            opacity: 1,
          }}
        >
          <ArrowDown 
            className="w-6 h-6 text-primary"
            style={{
              filter: "drop-shadow(0 0 8px hsl(var(--primary) / 0.6))",
            }}
          />
        </motion.button>
      </motion.div>
    </section>
  );
};

export default HeroSection;
