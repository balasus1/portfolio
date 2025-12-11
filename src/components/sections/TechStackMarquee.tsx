import { motion } from "framer-motion";

const technologies = [
  { name: "Java", color: "from-red-500 to-orange-500" },
  { name: "ReactJS", color: "from-cyan-400 to-blue-500" },
  { name: "Spring Boot", color: "from-green-500 to-emerald-500" },
  { name: "AWS", color: "from-orange-400 to-yellow-500" },
  { name: "Kafka", color: "from-gray-600 to-gray-800" },
  { name: "Docker", color: "from-blue-400 to-blue-600" },
  { name: "TypeScript", color: "from-blue-500 to-indigo-500" },
  { name: "PostgreSQL", color: "from-blue-600 to-blue-800" },
  { name: "Redux", color: "from-purple-500 to-purple-700" },
  { name: "Spark", color: "from-orange-500 to-red-500" },
  { name: "Jenkins", color: "from-red-400 to-red-600" },
  { name: "Kubernetes", color: "from-blue-500 to-cyan-500" },
];

const TechStackMarquee = () => {
  return (
    <div className="py-8 overflow-hidden bg-secondary/30 border-y border-border/50">
      <div className="relative">
        {/* Gradient Overlays */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

        {/* Scrolling Content */}
        <motion.div
          className="flex gap-8"
          animate={{ x: [0, "-50%"] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 25,
              ease: "linear",
            },
          }}
        >
          {[...technologies, ...technologies].map((tech, index) => (
            <div
              key={`${tech.name}-${index}`}
              className="flex items-center gap-3 px-6 py-3 bg-card/50 rounded-full border border-border/50 whitespace-nowrap"
            >
              <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${tech.color}`} />
              <span className="font-medium text-foreground">{tech.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default TechStackMarquee;
