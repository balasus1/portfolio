import { motion, AnimatePresence } from "framer-motion";
import { MapPin, X } from "lucide-react";

interface LocationMapTooltipProps {
  isVisible: boolean;
  coordinates: { lat: number; lng: number };
  locationName: string;
  onClose?: () => void;
}

const LocationMapTooltip = ({ isVisible, coordinates, locationName, onClose }: LocationMapTooltipProps) => {
  // Using OpenStreetMap static image or embed
  // Static map image URL (no API key needed)
  const staticMapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${coordinates.lng - 0.03},${coordinates.lat - 0.03},${coordinates.lng + 0.03},${coordinates.lat + 0.03}&layer=mapnik&marker=${coordinates.lat},${coordinates.lng}`;
  
  // Alternative: Static image from OpenStreetMap
  const mapImageUrl = `https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/pin-s+ff0000(${coordinates.lng},${coordinates.lat})/${coordinates.lng},${coordinates.lat},12,0/320x240@2x?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw`;
  
  // Using OpenStreetMap embed (works without API key)
  const embedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${coordinates.lng - 0.02},${coordinates.lat - 0.02},${coordinates.lng + 0.02},${coordinates.lat + 0.02}&layer=mapnik&marker=${coordinates.lat},${coordinates.lng}`;

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          
          {/* Map tooltip positioned 2px above clicked location */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ duration: 0.2 }}
            className="location-map-tooltip absolute bottom-full left-1/2 -translate-x-1/2 mb-0.5 z-50"
            style={{ 
              pointerEvents: "auto",
              marginBottom: "2px"
            }}
          >
            <div
              className="location-map-content relative rounded-xl overflow-hidden border-2"
              style={{
                width: "150px",
                height: "150px",
                background: "linear-gradient(135deg, hsl(var(--card) / 0.95) 0%, hsl(var(--card) / 0.85) 100%)",
                backdropFilter: "blur(20px)",
                borderColor: "hsl(var(--primary) / 0.3)",
                boxShadow: `
                  0 8px 32px hsl(var(--primary) / 0.3),
                  0 0 0 1px hsl(var(--primary) / 0.1),
                  inset 0 1px 0 hsl(var(--primary) / 0.2)
                `,
              }}
            >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-1 right-1 z-30 w-6 h-6 rounded-full flex items-center justify-center bg-black/30 hover:bg-black/50 backdrop-blur-sm border border-white/20 transition-all"
              aria-label="Close map"
            >
              <X className="w-3 h-3 text-white" />
            </button>

            {/* Glossy overlay effect */}
            <div
              className="absolute inset-0 z-10 pointer-events-none"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, transparent 100%)",
              }}
            />

            {/* Map container */}
            <div className="relative w-full h-full">
              <iframe
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                marginHeight={0}
                marginWidth={0}
                src={embedUrl}
                className="opacity-90"
                style={{ 
                  filter: "brightness(1.1) contrast(1.1) saturate(1.2)",
                  border: "none",
                }}
                title="Location Map"
              />
              
              {/* Overlay gradient for glossy effect */}
              <div
                className="absolute inset-0 pointer-events-none z-10"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 40%, rgba(0,0,0,0.05) 100%)",
                  backdropFilter: "blur(0.5px)",
                }}
              />
              
              {/* Shimmer effect */}
              <div
                className="absolute inset-0 pointer-events-none z-10"
                style={{
                  background: "linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)",
                  animation: "shimmer 3s ease-in-out infinite",
                }}
              />
            </div>

            {/* Location label */}
            <div
              className="absolute bottom-0 left-0 right-0 p-1.5 z-20"
              style={{
                background: "linear-gradient(to top, hsl(var(--card) / 0.95) 0%, hsl(var(--card) / 0.7) 70%, transparent 100%)",
                backdropFilter: "blur(10px)",
              }}
            >
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-primary flex-shrink-0" />
                <span className="font-medium text-foreground text-[10px] leading-tight truncate">{locationName}</span>
              </div>
            </div>

          </div>
        </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default LocationMapTooltip;

