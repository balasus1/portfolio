import { motion } from "framer-motion";
import { skills } from "@/data/portfolioData";
import SectionHeading from "@/components/ui/SectionHeading";

const SkillsSection = () => {
  const layers = [
    { category: "Core", label: "Backend & Core", color: "from-cyan-500 to-blue-600", bgColor: "bg-cyan-500/20", borderColor: "border-cyan-500/50", textColor: "text-cyan-400" },
    { category: "Frontend", label: "Frontend", color: "from-purple-500 to-pink-500", bgColor: "bg-purple-500/20", borderColor: "border-purple-500/50", textColor: "text-purple-400" },
    { category: "DevOps", label: "DevOps & Cloud", color: "from-orange-500 to-amber-500", bgColor: "bg-orange-500/20", borderColor: "border-orange-500/50", textColor: "text-orange-400" },
    { category: "Expertise", label: "Soft Skills", color: "from-green-500 to-emerald-500", bgColor: "bg-green-500/20", borderColor: "border-green-500/50", textColor: "text-green-400" },
  ];

  const getSkillsByLayer = (category: string) =>
    skills.filter((s) => s.category === category);

  return (
    <section id="skills" className="section-padding relative overflow-hidden">
      <div className="container-custom">
        <SectionHeading title="Skills & Expertise" subtitle="What I work with">
          My Confidence level measured in % for each skill
        </SectionHeading>

        {/* Layer Legend - Glassmorphism Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mb-8"
        >
          <div 
            className="px-6 py-4 flex flex-wrap items-center justify-center gap-4 md:gap-6 rounded-xl border-2 relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, hsl(var(--card) / 0.6) 0%, hsl(var(--card) / 0.4) 100%)",
              backdropFilter: "blur(20px)",
              borderColor: "hsl(var(--primary) / 0.2)",
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
            {layers.map((layer) => (
              <div key={layer.category} className="flex items-center gap-2 text-sm relative z-10">
                <div 
                  className={`w-3 h-3 rounded-full bg-gradient-to-r ${layer.color} shadow-lg`}
                  style={{
                    boxShadow: `0 0 10px hsl(var(--primary) / 0.5)`,
                  }}
                />
                <span className={layer.textColor}>{layer.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Honeycomb Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {layers.map((layer, layerIdx) => (
            <motion.div
              key={layer.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: layerIdx * 0.1 }}
              className="p-5 rounded-xl relative overflow-hidden border-2"
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
              <h3 className={`text-sm font-heading font-semibold mb-4 flex items-center gap-2 ${layer.textColor} relative z-10`}>
                <span 
                  className={`w-2 h-2 rounded-full bg-gradient-to-r ${layer.color} shadow-lg`}
                  style={{
                    boxShadow: `0 0 8px hsl(var(--primary) / 0.4)`,
                  }}
                />
                {layer.label}
              </h3>
              
              {/* Honeycomb Pattern */}
              <div className="flex flex-wrap justify-center gap-2 md:gap-3 relative z-10">
                {getSkillsByLayer(layer.category).map((skill, idx) => (
                  <HexagonCell
                    key={skill.name}
                    skill={skill}
                    layer={layer}
                    index={idx}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const HexagonCell = ({
  skill,
  layer,
  index,
}: {
  skill: { name: string; level: number };
  layer: { color: string; bgColor: string; borderColor: string };
  index: number;
}) => {
  const hexSize = 80;

  return (
    <motion.div
      className="group cursor-pointer relative"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.1, zIndex: 50 }}
      style={{
        marginTop: index % 2 === 1 ? hexSize * 0.3 : 0,
      }}
    >
      <div
        className="relative flex items-center justify-center backdrop-blur-md transition-all duration-300 group-hover:shadow-xl"
        style={{
          width: hexSize,
          height: hexSize * 1.1,
          clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
          background: `transparent`,
          boxShadow: `0 4px 16px hsl(var(--primary) / 0.2), inset 0 1px 0 rgba(255,255,255,0.1)`,
        }}
      >
        {/* Glossy gradient overlay */}
        <div
          className="absolute inset-[1px] opacity-30 group-hover:opacity-50 transition-opacity"
          style={{
            clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
            background: `linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 50%, rgba(0,0,0,0.1) 100%)`,
          }}
        />
        {/* Color gradient */}
        <div
          className={`absolute inset-[2px] bg-gradient-to-br ${layer.color} opacity-20 group-hover:opacity-40 transition-opacity`}
          style={{
            clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
          }}
        />
        {/* Shimmer effect */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
          style={{
            clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
            background: "linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)",
            animation: "shimmer 2s ease-in-out infinite",
          }}
        />
        <span className="text-[11px] md:text-xs font-semibold text-foreground text-center leading-tight px-2 z-10 relative drop-shadow-sm">
          {skill.name.length > 12 ? skill.name.slice(0, 11) + "..." : skill.name}
        </span>
      </div>

      {/* Tooltip */}
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
        <div 
          className="px-3 py-2 rounded-lg whitespace-nowrap border-2 relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, hsl(var(--card) / 0.95) 0%, hsl(var(--card) / 0.85) 100%)",
            backdropFilter: "blur(20px)",
            borderColor: "hsl(var(--primary) / 0.3)",
            boxShadow: "0 8px 32px hsl(var(--primary) / 0.2)",
          }}
        >
          {/* Glossy overlay */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%, rgba(0,0,0,0.05) 100%)",
            }}
          />
          <p className="text-xs font-medium relative z-10">{skill.name}</p>
          <div className="flex items-center gap-1 mt-1 relative z-10">
            <div 
              className="h-2 w-16 rounded-full overflow-hidden border"
              style={{
                background: "hsl(var(--secondary) / 0.3)",
                borderColor: "hsl(var(--primary) / 0.2)",
                backdropFilter: "blur(10px)",
              }}
            >
              <div
                className={`h-full bg-gradient-to-r ${layer.color} relative overflow-hidden`}
                style={{ width: `${skill.level}%` }}
              >
                {/* Glossy shine on progress bar */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)",
                    animation: "shimmer 2s ease-in-out infinite",
                  }}
                />
              </div>
            </div>
            <span className="text-[10px] text-muted-foreground">{skill.level}%</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SkillsSection;
