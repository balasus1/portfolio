import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Download, X, Sparkles } from "lucide-react";

interface ResumeFile {
  name: string;
  extension: string;
  path: string;
  type: "pdf" | "doc" | "docx";
}

const ResumeDownloadMenu = ({ onClose }: { onClose: () => void }) => {
  const [resumeFiles, setResumeFiles] = useState<ResumeFile[]>([]);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Detect available resume files
    const files: ResumeFile[] = [
      {
        name: "Bala-Architect_latest_2025",
        extension: "docx",
        path: "/resume/Bala-Architect_latest_2025.docx",
        type: "docx",
      },
    ];

    // Check if PDF exists (you can add this later)
    // You can extend this to check for multiple files
    setResumeFiles(files);

    // Close on outside click
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleDownload = (file: ResumeFile) => {
    const link = document.createElement("a");
    link.href = file.path;
    link.download = `${file.name}.${file.extension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onClose();
  };

  const getFileIcon = (type: string) => {
    return <FileText className="w-5 h-5" />;
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "pdf":
        return "PDF Document";
      case "doc":
      case "docx":
        return "Word Document";
      default:
        return "Document";
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="resume-modal-backdrop fixed inset-0 z-[100] flex items-center justify-center p-4"
        style={{
          background: "radial-gradient(circle at center, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.9) 100%)",
          backdropFilter: "blur(8px)",
        }}
        onClick={onClose}
      >
        {/* Animated background particles */}
        <div className="resume-modal-particles absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                background: `hsl(var(--primary) / ${0.3 + Math.random() * 0.4})`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <motion.div
          ref={menuRef}
          initial={{ scale: 0.8, opacity: 0, y: 50, rotateX: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0, rotateX: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 50, rotateX: 15 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="relative w-full max-w-md mx-4"
          style={{ perspective: "1000px" }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Gaming-style menu container with enhanced glow */}
          <div
            className="resume-modal-content relative overflow-hidden rounded-2xl border-2"
            style={{
              background: "linear-gradient(135deg, hsl(var(--card) / 0.85) 0%, hsl(var(--card) / 0.65) 50%, hsl(var(--card) / 0.85) 100%)",
              backdropFilter: "blur(24px)",
              borderColor: "hsl(var(--primary) / 0.4)",
              boxShadow: `
                0 0 60px hsl(var(--primary) / 0.4),
                0 0 100px hsl(var(--primary) / 0.2),
                0 8px 32px rgba(0, 0, 0, 0.4),
                inset 0 1px 0 rgba(255, 255, 255, 0.1),
                inset 0 -1px 0 rgba(0, 0, 0, 0.2)
              `,
            }}
          >
            {/* Animated border glow with multiple layers */}
            <motion.div
              className="absolute -inset-[2px] rounded-2xl opacity-60"
              style={{
                background: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 50%, hsl(var(--primary)) 100%)",
                backgroundSize: "200% 200%",
                filter: "blur(12px)",
              }}
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%"],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            
            {/* Inner glow ring */}
            <div
              className="absolute inset-[1px] rounded-2xl opacity-30"
              style={{
                background: "radial-gradient(circle at 30% 30%, hsl(var(--primary) / 0.6), transparent 70%)",
              }}
            />

            {/* Corner accent decorations */}
            {[
              { top: 0, left: 0, transform: "rotate(0deg)" },
              { top: 0, right: 0, transform: "rotate(90deg)" },
              { bottom: 0, left: 0, transform: "rotate(-90deg)" },
              { bottom: 0, right: 0, transform: "rotate(180deg)" },
            ].map((pos, i) => (
              <div
                key={i}
                className="absolute w-8 h-8 opacity-40"
                style={{
                  ...pos,
                  background: `linear-gradient(${i * 90}deg, hsl(var(--primary)) 0%, transparent 100%)`,
                  clipPath: "polygon(0 0, 100% 0, 0 100%)",
                }}
              />
            ))}

            {/* Header with gaming style */}
            <div className="resume-modal-header relative p-4 sm:p-6 border-b" style={{ borderColor: "hsl(var(--primary) / 0.2)" }}>
              {/* Shimmer overlay */}
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)",
                  animation: "shimmer 3s ease-in-out infinite",
                }}
              />
              
              <div className="relative flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="p-2 rounded-lg"
                    style={{
                      background: "linear-gradient(135deg, hsl(var(--primary) / 0.3) 0%, hsl(var(--accent) / 0.2) 100%)",
                      border: "1px solid hsl(var(--primary) / 0.4)",
                    }}
                  >
                    <Sparkles className="w-5 h-5 text-primary" />
                  </motion.div>
                  <div>
                    <h3 
                      className="text-lg sm:text-xl font-heading font-bold mb-0.5"
                      style={{
                        background: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        textShadow: "0 0 20px hsl(var(--primary) / 0.5)",
                      }}
                    >
                      Download Resume
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">Choose your preferred format</p>
                  </div>
                </div>
                <motion.button
                  onClick={onClose}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-lg transition-all relative overflow-hidden group"
                  style={{
                    background: "hsl(var(--secondary) / 0.3)",
                    border: "1px solid hsl(var(--primary) / 0.2)",
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
                  <X className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-hover:text-primary relative z-10 transition-colors" />
                </motion.button>
              </div>
            </div>

            {/* Menu Options */}
            <div className="p-3 sm:p-4 space-y-3">
              {resumeFiles.map((file, index) => (
                <motion.button
                  key={file.path}
                  initial={{ opacity: 0, x: -30, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
                  onClick={() => handleDownload(file)}
                  className="w-full group relative overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div
                    className="relative p-3 sm:p-4 rounded-xl border-2 transition-all duration-300"
                    style={{
                      background: "linear-gradient(135deg, hsl(var(--secondary) / 0.4) 0%, hsl(var(--secondary) / 0.25) 100%)",
                      borderColor: "hsl(var(--primary) / 0.3)",
                      backdropFilter: "blur(12px)",
                      boxShadow: "0 4px 16px hsl(var(--primary) / 0.1)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "linear-gradient(135deg, hsl(var(--primary) / 0.25) 0%, hsl(var(--accent) / 0.2) 100%)";
                      e.currentTarget.style.borderColor = "hsl(var(--primary) / 0.6)";
                      e.currentTarget.style.boxShadow = "0 8px 32px hsl(var(--primary) / 0.3), 0 0 0 1px hsl(var(--primary) / 0.2)";
                      e.currentTarget.style.transform = "translateX(6px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "linear-gradient(135deg, hsl(var(--secondary) / 0.4) 0%, hsl(var(--secondary) / 0.25) 100%)";
                      e.currentTarget.style.borderColor = "hsl(var(--primary) / 0.3)";
                      e.currentTarget.style.boxShadow = "0 4px 16px hsl(var(--primary) / 0.1)";
                      e.currentTarget.style.transform = "translateX(0)";
                    }}
                  >
                    {/* Animated border glow on hover */}
                    <div className="absolute -inset-[1px] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 100%)",
                        filter: "blur(8px)",
                        zIndex: -1,
                      }}
                    />
                    
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

                    <div className="relative flex items-center gap-3 sm:gap-4">
                      {/* Icon with animated glow */}
                      <motion.div
                        className="p-2.5 sm:p-3 rounded-lg flex-shrink-0"
                        style={{
                          background: "linear-gradient(135deg, hsl(var(--primary) / 0.25) 0%, hsl(var(--accent) / 0.2) 100%)",
                          border: "1px solid hsl(var(--primary) / 0.4)",
                          boxShadow: "0 0 20px hsl(var(--primary) / 0.2)",
                        }}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                      </motion.div>

                      {/* File Info */}
                      <div className="flex-1 text-left min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="font-semibold text-foreground text-sm sm:text-base">{getTypeLabel(file.type)}</span>
                          <span
                            className="px-2 py-0.5 text-xs font-bold rounded-md"
                            style={{
                              background: "linear-gradient(135deg, hsl(var(--primary) / 0.3) 0%, hsl(var(--accent) / 0.2) 100%)",
                              color: "hsl(var(--primary))",
                              border: "1px solid hsl(var(--primary) / 0.4)",
                            }}
                          >
                            {file.extension.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-muted-foreground truncate">{file.name}</p>
                      </div>

                      {/* Download Icon with animation */}
                      <motion.div
                        className="flex-shrink-0"
                        whileHover={{ scale: 1.2, y: -2 }}
                        animate={{ y: [0, -3, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <Download className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                      </motion.div>
                    </div>
                  </div>
                </motion.button>
              ))}

              {/* Note about PDF */}
              {!resumeFiles.some((f) => f.type === "pdf") && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-4 p-3 rounded-lg text-xs text-muted-foreground text-center relative overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg, hsl(var(--muted) / 0.4) 0%, hsl(var(--muted) / 0.2) 100%)",
                    border: "1px dashed hsl(var(--primary) / 0.3)",
                  }}
                >
                  <span className="relative z-10">PDF version coming soon</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent animate-shimmer" />
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ResumeDownloadMenu;

