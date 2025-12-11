import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Heart } from "lucide-react";
import { profileData } from "@/data/portfolioData";
import { useState } from "react";

const Footer = () => {
  const [isHovered, setIsHovered] = useState(false);

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
        { hobby: "Coding Tutorials", desc: "Expanding tech knowledge" },
        { hobby: "Art History", desc: "Appreciating creativity" },
      ],
    },
    {
      title: "Practice",
      color: "from-emerald-400 to-green-500",
      items: [
        { hobby: "Gym Workouts", desc: "Building physical strength" },
        { hobby: "Gardening", desc: "Nurturing plant life" },
        { hobby: "Walking & Hiking", desc: "Exploring nature daily" },
        { hobby: "Carpentry", desc: "Crafting with hands" },
      ],
    },
    {
      title: "Grow",
      color: "from-amber-400 to-orange-500",
      items: [
        { hobby: "Healthy Eating", desc: "Transforming lifestyle" },
        { hobby: "Money Management", desc: "Building wealth habits" },
        { hobby: "Building Apps", desc: "Creating digital solutions" },
        { hobby: "Paintings", desc: "Expressing through art" },
      ],
    },
    {
      title: "Contribute",
      color: "from-rose-400 to-pink-500",
      items: [
        { hobby: "Fitness Mentoring", desc: "Inspiring healthy lives" },
        { hobby: "Community Gardens", desc: "Greening neighborhoods" },
        { hobby: "Teaching Kids", desc: "Shaping young minds" },
        { hobby: "Charity Drives", desc: "Giving back to society" },
      ],
    },
  ];

  return (
    <footer className="relative border-t border-border bg-gradient-to-b from-background to-card/50 overflow-hidden">
      {/* Simple Black & White Ikigai Tree */}
      <div 
        className="absolute left-0 top-0 bottom-0 w-40 sm:w-52 md:w-64 lg:w-80 pointer-events-auto z-10"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <svg
          viewBox="0 0 300 500"
          className="w-full h-full opacity-40"
          style={{ filter: isHovered ? "drop-shadow(0 0 20px hsl(var(--primary) / 0.3))" : "none" }}
        >
          {/* Simple trunk */}
          <motion.path
            d="M150 480 Q145 400 150 350 Q155 300 150 250 Q145 200 150 160"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeLinecap="round"
            className="text-foreground/80"
            animate={isHovered ? { 
              d: ["M150 480 Q145 400 150 350 Q155 300 150 250 Q145 200 150 160", 
                  "M150 480 Q147 400 152 350 Q153 300 148 250 Q147 200 150 160",
                  "M150 480 Q145 400 150 350 Q155 300 150 250 Q145 200 150 160"]
            } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          />

          {/* Main branches */}
          {[
            { d: "M150 250 Q120 230 80 210", delay: 0 },
            { d: "M150 250 Q180 230 220 210", delay: 0.1 },
            { d: "M150 200 Q110 170 70 150", delay: 0.2 },
            { d: "M150 200 Q190 170 230 150", delay: 0.3 },
            { d: "M150 180 Q130 150 100 120", delay: 0.4 },
            { d: "M150 180 Q170 150 200 120", delay: 0.5 },
            { d: "M150 160 Q150 130 150 100", delay: 0.6 },
            { d: "M70 150 Q50 130 30 120", delay: 0.7 },
            { d: "M230 150 Q250 130 270 120", delay: 0.8 },
            { d: "M80 210 Q60 200 40 190", delay: 0.9 },
            { d: "M220 210 Q240 200 260 190", delay: 1.0 },
          ].map((branch, i) => (
            <motion.path
              key={`branch-${i}`}
              d={branch.d}
              fill="none"
              stroke="currentColor"
              strokeWidth={6 - i * 0.3}
              strokeLinecap="round"
              className="text-foreground/70"
              animate={isHovered ? { 
                rotate: [0, -2, 2, 0],
              } : {}}
              transition={{ duration: 1.5, repeat: Infinity, delay: branch.delay }}
              style={{ transformOrigin: "150px 250px" }}
            />
          ))}

          {/* Smaller branches */}
          {[
            "M100 120 Q80 100 60 90",
            "M200 120 Q220 100 240 90",
            "M150 100 Q140 80 130 65",
            "M150 100 Q160 80 170 65",
            "M30 120 Q20 100 15 85",
            "M270 120 Q280 100 285 85",
            "M40 190 Q25 180 15 170",
            "M260 190 Q275 180 285 170",
          ].map((d, i) => (
            <motion.path
              key={`small-branch-${i}`}
              d={d}
              fill="none"
              stroke="currentColor"
              strokeWidth={3}
              strokeLinecap="round"
              className="text-foreground/60"
              animate={isHovered ? { rotate: [0, -3, 3, 0] } : {}}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.1 }}
              style={{ transformOrigin: "150px 200px" }}
            />
          ))}

          {/* Roots */}
          {[
            "M150 480 Q120 470 80 485",
            "M150 480 Q180 470 220 485",
            "M150 480 Q130 475 100 480",
            "M150 480 Q170 475 200 480",
          ].map((d, i) => (
            <path
              key={`root-${i}`}
              d={d}
              fill="none"
              stroke="currentColor"
              strokeWidth={4}
              strokeLinecap="round"
              className="text-foreground/50"
            />
          ))}

          {/* Center Ikigai circle */}
          <motion.circle
            cx="150"
            cy="200"
            r="30"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-primary"
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.circle
            cx="150"
            cy="200"
            r="22"
            fill="hsl(var(--background))"
            stroke="currentColor"
            strokeWidth="1"
            className="text-primary/50"
          />
          <text x="150" y="197" textAnchor="middle" className="fill-primary text-[9px] font-bold tracking-wider">
            IKIGAI
          </text>
          <text x="150" y="208" textAnchor="middle" className="fill-primary/60 text-[6px]">
            生き甲斐
          </text>
        </svg>
      </div>

      <div className="container-custom py-12 md:py-16 relative z-20">
        {/* Ikigai Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 pl-44 sm:pl-56 md:pl-0 md:ml-64 lg:ml-72">
          {ikigaiColumns.map((column, colIndex) => (
            <motion.div
              key={column.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: colIndex * 0.1 }}
              viewport={{ once: true }}
              className="space-y-3 md:space-y-4"
            >
              <h4
                className={`font-heading font-bold text-base md:text-lg bg-gradient-to-r ${column.color} bg-clip-text text-transparent`}
              >
                {column.title}
              </h4>
              <ul className="space-y-2 md:space-y-3">
                {column.items.map((item, itemIndex) => (
                  <motion.li
                    key={item.hobby}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: colIndex * 0.1 + itemIndex * 0.05 }}
                    viewport={{ once: true }}
                    className="group"
                  >
                    <p className="text-xs md:text-sm font-medium text-foreground group-hover:text-primary transition-colors cursor-default">
                      {item.hobby}
                    </p>
                    <p className="text-[10px] md:text-xs text-muted-foreground">
                      {item.desc}
                    </p>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom section */}
        <div className="mt-10 md:mt-12 pt-6 md:pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 pl-44 sm:pl-56 md:pl-0 md:ml-64 lg:ml-72">
          <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4">
            <p className="text-xs md:text-sm text-muted-foreground">
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
          <p className="text-xs md:text-sm text-muted-foreground flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 md:w-4 md:h-4 text-destructive fill-destructive" /> using React & Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
