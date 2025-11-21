import { Activity, Heart } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-primary via-accent to-secondary py-20 px-4">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnptMCAzYy0xLjY1NyAwLTMgMS4zNDMtMyAzczEuMzQzIDMgMyAzIDMtMS4zNDMgMy0zLTEuMzQzLTMtMy0zeiIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIuMDUiLz48L2c+PC9zdmc+')] opacity-30"></div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-white/20 blur-2xl rounded-full"></div>
              <Activity className="h-16 w-16 text-white relative z-10 animate-pulse" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
            Health Calculator
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-6">
            Track Your Body Metrics with Precision
          </p>
          
          <div className="flex items-center justify-center gap-2 text-white/80">
            <Heart className="h-5 w-5" />
            <p className="text-sm md:text-base">
              Calculate BMI & Body Fat Percentage in Seconds
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {[
            { title: "BMI Calculator", desc: "Quick body mass assessment", icon: "📊" },
            { title: "Body Fat", desc: "Detailed composition analysis", icon: "💪" },
            { title: "Health Ranges", desc: "Know your ideal metrics", icon: "🎯" }
          ].map((feature, idx) => (
            <div 
              key={idx}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="text-4xl mb-3">{feature.icon}</div>
              <h3 className="text-white font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-white/70 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
