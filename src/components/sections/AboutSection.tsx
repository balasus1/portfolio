import { motion } from "framer-motion";
import { GraduationCap, Award } from "lucide-react";
import { profileData, education, certifications } from "@/data/portfolioData";
import SectionHeading from "@/components/ui/SectionHeading";

const AboutSection = () => {
  // Extract initials from name
  const getInitials = (name: string) => {
    const parts = name.split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const initials = getInitials(profileData.name);

  return (
    <section id="about" className="about-section-container section-padding relative">
      <div className="about-section-wrapper container-custom">
        <SectionHeading title="About Me" subtitle="Get to know me" />

        <div className="about-cards-grid grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Card - Profile */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="about-profile-card relative"
          >
            <div 
              className="p-8 md:p-10 rounded-xl relative overflow-hidden border-2"
              style={{
                background: "linear-gradient(135deg, hsl(var(--card) / 0.7) 0%, hsl(var(--card) / 0.5) 100%)",
                backdropFilter: "blur(20px)",
                borderColor: "hsl(var(--primary) / 0.15)",
                boxShadow: "0 8px 32px hsl(var(--primary) / 0.1)",
              }}
            >
              {/* Glossy overlay */}
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(0,0,0,0.05) 100%)",
                }}
              />
              
              {/* Decorative gradient */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl opacity-50" />
              
              <div className="relative z-10 flex flex-col items-center text-center">
                {/* Profile Icon/Avatar */}
                <div 
                  className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-5xl font-heading font-bold text-primary-foreground mb-6 shadow-lg relative overflow-hidden"
                  style={{
                    boxShadow: "0 8px 32px hsl(var(--primary) / 0.4)",
                  }}
                >
                  {/* Glossy shine on avatar */}
                  <div 
                    className="absolute inset-0"
                    style={{
                      background: "linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 50%)",
                    }}
                  />
                  <span className="relative z-10">{initials}</span>
                </div>

                {/* Full Name */}
                <h3 className="text-2xl md:text-3xl font-heading font-bold mb-3 text-foreground">
                  {profileData.name}
                </h3>

                {/* Designation */}
                <p 
                  className="font-medium text-lg mb-6"
                  style={{
                    background: "linear-gradient(135deg, hsl(174, 85%, 65%) 0%, hsl(200, 90%, 55%) 50%, hsl(280, 75%, 65%) 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    filter: "drop-shadow(0 0 8px hsl(174, 85%, 65% / 0.6))",
                  }}
                >
                  {profileData.title}
                </p>

                {/* About Me */}
                <div className="mt-4">
                  <h4 
                    className="text-sm font-semibold uppercase tracking-wider mb-3"
                    style={{
                      background: "linear-gradient(135deg, hsl(174, 85%, 65%) 0%, hsl(200, 90%, 55%) 50%, hsl(280, 75%, 65%) 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      filter: "drop-shadow(0 0 8px hsl(174, 85%, 65% / 0.6))",
                    }}
                  >
                    About Me
                  </h4>
                  <p className="text-muted-foreground leading-relaxed text-left">
                    {profileData.bio}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Card - Education & Certifications */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            className="about-education-card"
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div 
              className="p-8 md:p-10 rounded-xl relative overflow-hidden border-2 h-full"
              style={{
                background: "linear-gradient(135deg, hsl(var(--card) / 0.7) 0%, hsl(var(--card) / 0.5) 100%)",
                backdropFilter: "blur(20px)",
                borderColor: "hsl(var(--primary) / 0.15)",
                boxShadow: "0 8px 32px hsl(var(--primary) / 0.1)",
              }}
            >
              {/* Glossy overlay */}
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(0,0,0,0.05) 100%)",
                }}
              />
              
              {/* Decorative gradient */}
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-accent/20 to-primary/20 rounded-full blur-3xl opacity-50" />
              
              <div className="relative z-10 space-y-8">
                {/* Education */}
                <div>
                  <h4 className="flex items-center gap-3 font-heading font-semibold text-xl mb-4 text-foreground">
                    <div 
                      className="p-2 rounded-lg"
                      style={{
                        background: "hsl(var(--primary) / 0.2)",
                        border: "1px solid hsl(var(--primary) / 0.3)",
                      }}
                    >
                      <GraduationCap className="w-5 h-5 text-primary" />
                    </div>
                    Education
                  </h4>
                  <div 
                    className="pl-4 border-l-2 space-y-2"
                    style={{
                      borderColor: "hsl(var(--primary) / 0.3)",
                    }}
                  >
                    <p className="text-foreground font-semibold text-lg">{education.degree}</p>
                    <p className="text-muted-foreground">{education.field}</p>
                    <p className="text-muted-foreground text-sm">{education.institution}</p>
                    <p className="text-primary text-sm font-medium">{education.period}</p>
                  </div>
                </div>

                {/* Certifications */}
                <div>
                  <h4 className="flex items-center gap-3 font-heading font-semibold text-xl mb-4 text-foreground">
                    <div 
                      className="p-2 rounded-lg"
                      style={{
                        background: "hsl(var(--primary) / 0.2)",
                        border: "1px solid hsl(var(--primary) / 0.3)",
                      }}
                    >
                      <Award className="w-5 h-5 text-primary" />
                    </div>
                    Certifications
                  </h4>
                  <div className="space-y-4">
                    {certifications.map((cert, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + index * 0.1 }}
                        className="pl-4 border-l-2"
                        style={{
                          borderColor: "hsl(var(--primary) / 0.3)",
                        }}
                      >
                        <p className="text-foreground font-semibold">{cert.name}</p>
                        <p className="text-muted-foreground text-sm">{cert.issuer}</p>
                        {cert.year && (
                          <p className="text-primary text-xs font-medium mt-1">{cert.year}</p>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
