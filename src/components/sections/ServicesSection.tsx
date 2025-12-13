import { motion } from "framer-motion";
import { 
  Server, 
  Monitor, 
  Cloud, 
  Database, 
  GitBranch, 
  Zap 
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

const services = [
  {
    icon: Server,
    title: "System Architecture",
    description: "Design and implement scalable, fault-tolerant distributed systems using microservices, event-driven architecture, and enterprise patterns.",
    color: "from-cyan-500 to-blue-600",
  },
  {
    icon: Monitor,
    title: "Frontend Development",
    description: "Build responsive, performant web applications with ReactJS, NextJS, Redux, and modern UI/UX principles for exceptional user experiences.",
    color: "from-purple-500 to-pink-600",
  },
  {
    icon: Database,
    title: "Backend Engineering",
    description: "Develop robust APIs and services with Java, Spring Boot, and scalable database solutions optimized for high-throughput operations.",
    color: "from-green-500 to-emerald-600",
  },
  {
    icon: Cloud,
    title: "Cloud Solutions",
    description: "Architect and deploy AWS cloud infrastructure including EC2, Lambda, S3, RDS, and serverless architectures for optimal performance.",
    color: "from-orange-500 to-amber-600",
  },
  {
    icon: GitBranch,
    title: "DevOps & CI/CD",
    description: "Implement automated pipelines with Docker, Jenkins, Kubernetes, and GitOps practices for seamless deployments and operations.",
    color: "from-red-500 to-rose-600",
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    description: "Analyze and optimize application performance through profiling, caching strategies, query tuning, and architecture improvements.",
    color: "from-yellow-500 to-orange-600",
  },
];

const ServicesSection = () => {
  return (
    <section className="services-section-container section-padding relative">
      <div className="services-section-wrapper container-custom">
        <SectionHeading title="What I Do" subtitle="Services">
          End-to-end solutions from architecture to deployment
        </SectionHeading>

        <div className="services-grid grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="glass-card p-6 group cursor-default"
            >
              {/* Icon */}
              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-lg`}
              >
                <service.icon className="w-7 h-7 text-white" />
              </div>

              {/* Title */}
              <h3 className="text-xl font-heading font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground text-sm leading-relaxed">
                {service.description}
              </p>

              {/* Hover Accent */}
              <div
                className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-100 transition-opacity rounded-b-xl`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
