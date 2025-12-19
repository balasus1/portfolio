import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Heart } from "lucide-react";
import { profileData } from "@/data/portfolioData";

const Footer = () => {
  const socialLinks = [
    { icon: Github, href: profileData.github, label: "GitHub" },
    { icon: Linkedin, href: profileData.linkedin, label: "LinkedIn" },
    { icon: Mail, href: `mailto:${profileData.email}`, label: "Email" },
  ];

  const ikigaiColumns = [
    {
      title: "Learn",
      color: "from-cyan-400 to-teal-500",
      items: [
        { hobby: "Nutrition Science", desc: "Understanding healthy living" },
        { hobby: "Financial Literacy", desc: "Mastering money concepts" },
        { hobby: "DSA", desc: "Daily DSA practice" },
        { hobby: "Art & History", desc: "Appreciating creativity" },
      ],
    },
    {
      title: "Practice",
      color: "from-emerald-400 to-green-500",
      items: [
        { hobby: "Healthy Eating", desc: "Transforming lifestyle" },
        { hobby: "Investment Management", desc: "Building wealth habits" },
        { hobby: "Build software & Hardware", desc: "Creating digital solutions" },
        { hobby: "Carpentry & Contemporary Arts", desc: "Crafting with hands" },
      ],
    },
    {
      title: "Grow",
      color: "from-amber-400 to-orange-500",
      items: [
        { hobby: "Gym Workouts", desc: "Building physical strength" },
        { hobby: "Stock Market Monitoring", desc: "Checking stock market trends" },
        { hobby: "State of Art", desc: "Creating digital solutions" },
        { hobby: "Build digital galleries", desc: "Expressing through art" },
      ],
    },
    {
      title: "Contribute",
      color: "from-rose-400 to-pink-500",
      items: [
        { hobby: "Fitness Mentoring", desc: "Inspiring healthy lives" },
        { hobby: "Financial Advisory", desc: "Teaching financial literacy" },
        { hobby: "Indian Defence Sector", desc: "Contributing to the nation's defense" },
        { hobby: "Sell NFTs & Tokens", desc: "Giving back to society" },
      ],
    },
  ];

  return (
    <footer className="footer-container relative border-t border-gray-900 bg-black overflow-hidden">
      {/* Ikigai Image as Translucent Background */}
      <div className="footer-background absolute inset-0 z-0">
        <motion.img
          src="/ikigai.png"
          alt="Ikigai - Life Purpose"
          className="w-full h-full object-cover"
          style={{
            objectPosition: "center",
            opacity: 0.3,
            filter: "blur(0.5px)",
          }}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 0.4, scale: 1 }}
          transition={{ duration: 1 }}
        />
        {/* Lighter gradient overlay for better text readability while showing image */}
        <div 
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.5) 100%)",
          }}
        />
        {/* Subtle radial gradient for depth */}
        <div 
          className="absolute inset-0"
          style={{
            background: "radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.2) 100%)",
          }}
        />
      </div>

      <div className="footer-content-wrapper container-custom py-12 md:py-16 relative z-10">
        {/* Ikigai Columns */}
        <div className="footer-columns-grid grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {ikigaiColumns.map((column, colIndex) => (
            <motion.div
              key={column.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: colIndex * 0.1 }}
              viewport={{ once: true }}
              className="space-y-3 md:space-y-4 relative"
            >
              {/* Subtle background for better text readability */}
              <div 
                className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: "linear-gradient(135deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.1) 100%)",
                  backdropFilter: "blur(4px)",
                }}
              />
              <h4
                className={`font-heading font-bold text-base md:text-lg bg-gradient-to-r ${column.color} bg-clip-text text-transparent relative z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]`}
              >
                {column.title}
              </h4>
              <ul className="space-y-2 md:space-y-3 relative z-10">
                {column.items.map((item, itemIndex) => (
                  <motion.li
                    key={item.hobby}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: colIndex * 0.1 + itemIndex * 0.05 }}
                    viewport={{ once: true }}
                    className="group"
                  >
                    <p 
                      className="text-xs md:text-sm font-medium group-hover:text-primary transition-colors cursor-default drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
                      style={{
                        textShadow: "0 1px 3px rgba(0,0,0,0.9), 0 0 10px rgba(0,0,0,0.5)",
                      }}
                    >
                      {item.hobby}
                    </p>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom section */}
        <div className="footer-bottom-section mt-10 md:mt-12 pt-6 md:pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 relative">
          {/* Subtle backdrop for bottom section */}
          <div 
            className="absolute inset-0 -mx-4 md:-mx-8 opacity-50"
            style={{
              background: "linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 100%)",
            }}
          />
          <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4 relative z-10">
            <p 
              className="text-xs md:text-sm text-muted-foreground"
              style={{
                textShadow: "0 1px 3px rgba(0,0,0,0.9)",
              }}
            >
              © {new Date().getFullYear()} {profileData.name}
            </p>
            <div className="flex gap-2 md:gap-3">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-secondary/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={link.label}
                >
                  <link.icon className="w-3.5 h-3.5 md:w-4 md:h-4" />
                </motion.a>
              ))}
            </div>
          </div>
          <p 
            className="text-xs md:text-sm text-muted-foreground flex items-center gap-1 relative z-10"
            style={{
              textShadow: "0 1px 3px rgba(0,0,0,0.9)",
            }}
          >
            #forRemoteWork #loveMyWork
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
