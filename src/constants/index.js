import {
  mobile,
  backend,
  blockchain,
  docker,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  ms,
  ibm,
  bct,
  detica,
  carrent,
  jobit,
  tripguide,
  threejs,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Frontend Developer",
    icon: web,
  },
  {
    title: "Backend Developer",
    icon: backend,
  },
  {
    title: "Flutter Developer",
    icon: mobile,
  },
  {
    title: "Blockchain Developer",
    icon: blockchain,
  },
];

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Redux Toolkit",
    icon: redux,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "Three JS",
    icon: threejs,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "figma",
    icon: figma,
  },
  {
    name: "docker",
    icon: docker,
  },
];

const experiences = [
  {
    title: "React.js Developer",
    company_name: "Bahwan Cybertek Corporation",
    icon: bct,
    iconBg: "#383E56",
    date: "July 2018 - Till date",
    points: [
      "Developing and maintaining web applications using React.js, Redux and SCSS.",
      "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
      "Implementing responsive design and ensuring cross-browser compatibility.",
      "Participating in code reviews and providing constructive feedback to other developers.",
      "Periodically testing and debugging web applications to identify and resolve issues.",
      "Identify performance memory footprints, monitor network calls and fixing the performance in the SHOP application using service workers, cache mechanisms, etc.,",
    ],
  },
  {
    title: "Senior Java consultant",
    company_name: "Genpact India Pvt.Ltd (Client:Morgan Stanley)",
    icon: ms,
    iconBg: "#E6DEDD",
    date: "May 2014 - July 2018",
    points: [
      "Design and develop scalable inhouse products for Morgan Stanley for CRM, Fixed Income Credits and derivaties, Wealth Management teams",
      "Used various cutting edge technologies like bigdata, Apache Spark, UCF, middleware libraries and frameworks for system communications",
      "Participated on hackathons conducted in the organization and awarded certificates",
      "Closely involved with the business and frequent interactions with ED and VPs of Morgan Stanley to implement new features to the existing applications",
    ],
  },
  {
    title: "Web Developer",
    company_name: "Digital Harbour (Client: One Detica, BAE Systems)",
    icon: detica,
    iconBg: "#383E56",
    date: "March 2012 - December 2013",
    points: [
      "Developing and maintaining Spring MVC based web application for Anti-money laundering and fraud detection systems",
      "Hands-on experience in implementing Watchlist manager and scenario manager adhering to FACTIVA/OFAC standards",
      "Learned and worked on various RESTful web services, clustering technologies and distributed systems",
      "Deployed to client location Paypal in Chennai for new feature development of watchlist manager modules and user interface",
    ],
  },
  {
    title: "Full stack Developer",
    company_name: "Synova Innovative Technologies Pvt. Ltd. (Client: IBM ISL - Research Labs)",
    icon: ibm,
    iconBg: "#E6DEDD",
    date: "February 2010 - March 2012",
    points: [
      "Member of System Verification Testing (SVT) of IBM Research Labs - Cryptograpy division",
      "SVT for IBM Tivoli and websphere products for Security APIs",
      "Writing testsuites for various cryptographic security APIs of hardware and software devices",
      "Writing automated perl wrappers for IBMJCE, JCER, JCECCA, PKCS11 and expose to hardware crypto devices in z/OS mainframe",
      "Writing JCL and JZOS batch processing tools and jobs for mainframes running on CICS"
    ],
  },
];

const testimonials = [
  {
    testimonial:
      "Bala's expertise in SpringBoot and distributed systems has led to impressive results for our product and clients\n" +
      "and was able to increase the scalability " + 
      "of their system by 50% during peak traffic periods. This significant improvement " +
      "allowed the company to handle a massive surge in users without any interruptions or slowdowns.",
    name: "Dan Branley",
    designation: "Project Manager",
    company: "One Detica",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
  },
  {
    testimonial:
      "Bala has shown himself to be a valuable addition to any team by providing " +
      "high-quality development services. He has demonstrated his expertise in developing " + 
      "and maintaining inhouse applications which captures clients interactions " +
      "and sends periodic summary reports and helped in insighting the usage of the application by the trading platform " +
      "within Morgan Stanley CRM team",
    name: "Nitin Kulkarni",
    designation: "Engagement Manager",
    company: "Genpact India",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    testimonial:
      "When he started in 2009, he was a novoice in automation and gradually within few months, Bala has developed a solid foundation " + 
      "in perl scripting and automating the whole framework and thorough understanding of the framework " +
      " which helped our IBM's Tivoli project very much in the years of his work.",
    name: "Bradley Smith",
    designation: "Development Manager",
    company: "IBM ISL - Poughkeepsie, USA",
    image: "https://randomuser.me/api/portraits/men/9.jpg",
  }
];

const projects = [
  {
    name: "Tranzact - Data Migration Tool",
    description:
      "Developed In-House data migration tool written in Scala using Apache Spark. " +
      "The dataframes are defined to process for enriching the data and migrated to various" + 
      " storage systems like Hive, HBase, MongoDB, etc., for Reporting and Machine Learning applications",
    tags: [
      {
        name: "Scala",
        color: "blue-text-gradient",
      },
      {
        name: "Apache Spark",
        color: "blue-text-gradient",
      },
      {
        name: "mongodb",
        color: "green-text-gradient",
      },
      {
        name: "HBase",
        color: "green-text-gradient",
      },
      {
        name: "oozie",
        color: "green-text-gradient",
      },
      {
        name: "Hive",
        color: "green-text-gradient",
      }
    ],
    image: carrent,
    source_code_link: "https://github.com/",
  },
  {
    name: "SHOP",
    description:
      "A ReactJS web application that enables users to merchandise ebooks, audiobooks, free books, save favorites, add to wishlists, etc.,",
    tags: [
      {
        name: "ReactJS",
        color: "blue-text-gradient",
      },
      {
        name: "Redux",
        color: "blue-text-gradient",
      },
      {
        name: "Axios",
        color: "green-text-gradient",
      },
      {
        name: "scss",
        color: "pink-text-gradient",
      },
      {
        name: "jest",
        color: "pink-text-gradient",
      },
      {
        name: "akamai",
        color: "pink-text-gradient",
      },
    ],
    image: jobit,
    source_code_link: "https://github.com/",
  },
  {
    name: "Email Autologging",
    description:
      "Core Java application capturing interactions in form of telephonic conversations, meetings &emails and processes clients and internal & external participants interactions and logs the data, publishes to downstream sytems like Reporting & analytics team.",
    tags: [
      {
        name: "Java",
        color: "blue-text-gradient",
      },
      {
        name: "Kafka",
        color: "green-text-gradient",
      },
      {
        name: "Apache POI",
        color: "pink-text-gradient",
      },
      {
        name: "Java concurrency",
        color: "green-text-gradient",
      },
      {
        name: "webFarm using Apache Tomcat",
        color: "blue-text-gradient",
      },
    ],
    image: tripguide,
    source_code_link: "https://github.com/",
  },
];

export { services, technologies, experiences, testimonials, projects };
