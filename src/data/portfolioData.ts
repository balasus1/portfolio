export const profileData = {
    name: "Balasubramanian Shanmugham",
    shortName: "My Portfolio",
    title: "Senior Fullstack Developer",
    subtitle: "Solution Architect",
    tagline: "Building Scalable Systems for Future",
    email: "bala.s0027@gmail.com",
    linkedin: "https://www.linkedin.com/in/spike0027/",
    github: "https://github.com/balasus1",
    location: "(11.9416° N, 79.8083° E) - India",
    bio: "Experienced software developer with over 20 years of experience in building scalable, high-performance applications using Java, J2EE and modern front-end technologies including ReactJS, NextJS and Redux. Passionate about designing distributed systems with a focus on performance optimization, scalability, and resilience.",
    resumeUrl: "#",
  };
  
  export const skills = [
    // Core - Backend & Database
    { name: "Spring Boot", category: "Core", level: 90 },
    { name: "Node.js", category: "Core", level: 82 },
    { name: "Python", category: "Core", level: 65 },
    
    // Layer 2 - Frontend
    { name: "ReactJS", category: "Frontend", level: 92 },
    { name: "NextJS", category: "Frontend", level: 85 },
    { name: "TypeScript", category: "Frontend", level: 85 },
    { name: "HTML/CSS", category: "Frontend", level: 90 },
    { name: "Tailwind", category: "Frontend", level: 85 },
    
    // Layer 3 - DevOps & Cloud
    { name: "AWS", category: "DevOps", level: 30 },
    { name: "GCP", category: "DevOps", level: 30 },
    { name: "Docker", category: "DevOps", level: 70 },
    { name: "Jenkins", category: "DevOps", level: 82 },
    { name: "Kubernetes", category: "DevOps", level: 50 },
    { name: "OpenShift", category: "DevOps", level: 50 },
    
    // Outer Layer - Soft Skills & Others
    { name: "Architecture", category: "Expertise", level: 80 },
    { name: "Problem Solving", category: "Expertise", level: 80 },
    { name: "Communication", category: "Expertise", level: 90 },
  ];
  
  export const experiences = [
    {
      id: 1,
      company: "Bahwan CyberTek Pvt Ltd",
      position: "Technical Architect",
      location: "Chennai",
      startDate: "Jun 2018",
      endDate: "Present",
      description: "Leading architecture design and development of enterprise-grade applications for major clients including RBI, NCRTC, and Barnes & Noble.",
      highlights: [
        "Designed scalable Spring Boot backend services with Kafka-based async processing",
        "Built ReactJS frontends for real-time monitoring dashboards",
        "Implemented enterprise RBAC and audit logging for compliance",
      ],
    },
    {
      id: 2,
      company: "Genpact India Pvt. Ltd",
      position: "Principal Consultant",
      location: "Bangalore",
      startDate: "May 2014",
      endDate: "July 2018",
      description: "Architected high-throughput distributed systems for premier Banking client in Investment Management division.",
      highlights: [
        "Built processing engine handling 12M+ interaction records across distributed nodes",
        "Achieved 7,000 interactions/second throughput with fine-tuned DB partitioning",
        "Designed ETL automation frameworks for Investment Management and CRM systems",
      ],
    },
  ];
  
  export const projects = [
    {
      id: 1,
      title: "ReBIT Platform Framework",
      client: "Reserve Bank of India",
      period: "Jan 2025 - Present",
      description: "A robust job scheduling and monitoring platform with real-time status updates, fault-tolerant distributed processing, and enterprise-grade security.",
      technologies: ["ReactJS", "Spring Boot", "Kafka"],
      highlights: [
        "Real-time job monitoring with intuitive UI",
        "Kafka-based async fallback for HTTP failures",
        "RBAC and audit logging for compliance",
        "RedHat's 3Scale API management for authorization and routing client requests"
      ],
      image: "rebit",
      color: "from-cyan-500 to-blue-600",
    },
    {
      id: 2,
      title: "RRTS Passenger Information System",
      client: "NCRTC",
      period: "Oct 2021 - May 2022",
      description: "Real-time train data integration system with secure government server communication and live passenger information displays.",
      technologies: ["Java Sockets", "Spring Boot", "Docker"],
      highlights: [
        "Real-time train movement data feeds",
        "Secure government server integration",
        "Containerized with Docker for consistency",
      ],
      image: "rrts",
      color: "from-purple-500 to-pink-600",
    },
    {
      id: 3,
      title: "Barnes & Noble SHOP",
      client: "Barnes & Noble",
      period: "Jan 2019 - Oct 2021",
      description: "Feature-rich responsive e-commerce platform integrated with LMS merchandising system for Barnes & Nobles.",
      technologies: ["ReactJS"],
      highlights: [
        "Pixel-perfect Figma to React implementation",
        "Complex state management with Redux",
        "LMS merchandising integration",
        "Cloud Assembler calls via Axios"
      ],
      image: "shop",
      color: "from-green-500 to-teal-600",
    },
    {
      id: 4,
      title: "Tranzact ETL Pipeline",
      client: "Tranzact Fintech",
      period: "Nov 2018 - Jan 2019",
      description: "High-performance Apache Spark pipelines for streaming data processing with real-time monitoring and analytics.",
      technologies: ["Apache Spark", "Kafka", "HBase", "Hive", "Oozie", "Ambari"],
      highlights: [
        "Build and handle data frames using Apache Spark and process streaming data to HBase/Hive using OOzie",
        "Performance tuning of Kafka topics by configuring the consumer and producer properties",
        "Real-time monitoring dashboards using Ambari",
      ],
      image: "etl",
      color: "from-orange-500 to-red-600",
    },
    {
      id: 5,
      title: "Investment Banking CRM Tool",
      client: "Morgan Stanley Investment Banking",
      period: "May 2014 - Jul 2018",
      description: "Distributed system capturing multi-channel client interactions with high-throughput processing across clustered infrastructure.",
      technologies: ["Java", "UC4 Scheduler", "Database Partitioning", "Rolodex Integration"],
      highlights: [
        "Capturing raw data from emails, phone calls, SMS, etc. and processing them using UC4 Scheduler",
        "Built entities for the captured data and stored them in the database based on the business requirements",
        "Published the enriched data via Kafka topics to downstream systems for analytics and Rolodex application",
        "12M+ records across 6 servers, 3 nodes",
        "Fine-tuned DB partitioning to reach 7,000 interactions/second throughput",
      ],
      image: "crm",
      color: "from-blue-500 to-indigo-600",
    },
  ];
  
  export const certifications = [
    {
      name: "SCJP 5.0",
      issuer: "Sun Microsystems",
      year: "2006",
    },
    {
      name: "Advanced Cloud Computing, Blockchain & IOT",
      issuer: "IIT Chennai",
      year: "2020",
    },
  ];
  
  export const education = {
    degree: "Bachelor of Technology",
    field: "Electrical & Electronics",
    institution: "Pondicherry University",
    period: "2000 - 2004",
  };
  
  export const blogPosts = [
    {
      id: 1,
      title: "Building Fault-Tolerant Distributed Systems with Kafka",
      excerpt: "Learn how to design resilient microservices architecture using Apache Kafka for async communication and fallback mechanisms.",
      date: "Nov 2024",
      readTime: "8 min read",
      tags: ["Kafka", "Microservices", "CAP Theorem"],
    },
    {
      id: 2,
      title: "Optimizing React Performance at Scale",
      excerpt: "Deep dive into performance optimization techniques for large-scale React applications with complex state management.",
      date: "Oct 2024",
      readTime: "6 min read",
      tags: ["ReactJS", "Performance", "State Management"],
    },
    {
      id: 3,
      title: "AWS Lambda Best Practices for Enterprise",
      excerpt: "Enterprise patterns and best practices for building serverless applications with AWS Lambda and API Gateway.",
      date: "Sep 2024",
      readTime: "10 min read",
      tags: ["Cloud Computing", "AWS"],
    },
  ];
  
  export const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Blog", href: "#blog" },
    { name: "Contact", href: "#contact" },
  ];
  