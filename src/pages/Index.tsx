import { Helmet } from "react-helmet-async";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import ScrollToTop from "@/components/ui/ScrollToTop";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import StatsSection from "@/components/sections/StatsSection";
import ServicesSection from "@/components/sections/ServicesSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CTASection from "@/components/sections/CTASection";
import BlogSection from "@/components/sections/BlogSection";
import ContactSection from "@/components/sections/ContactSection";
import { profileData } from "@/data/portfolioData";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>{profileData.name} | {profileData.title} - Portfolio</title>
        <meta name="description" content={`${profileData.name} - ${profileData.title} with 20+ years of experience in Java, ReactJS, AWS, and enterprise architecture. Available for remote opportunities.`} />
        <meta name="keywords" content="System Architect, Fullstack Engineer, Java Developer, ReactJS, AWS, Remote Developer, Technical Architect" />
        <meta property="og:title" content={`${profileData.name} | ${profileData.title}`} />
        <meta property="og:description" content={profileData.bio} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://balashan.dev" />
      </Helmet>

      <div className="root-container min-h-screen bg-background w-full max-w-full overflow-x-hidden">
        <AnimatedBackground />
        <Navbar />
        
        <main className="main-content w-full max-w-full overflow-x-hidden">
          <HeroSection />
          <AboutSection />
          <StatsSection />
          <ServicesSection />
          <SkillsSection />
          <ExperienceSection />
          <ProjectsSection />
          <TestimonialsSection />
          <CTASection />
          <BlogSection />
          <ContactSection />
        </main>

        <Footer />
        <ScrollToTop />
      </div>
    </>
  );
};

export default Index;
