import Hero from "@/components/Hero";
import BMICalculator from "@/components/BMICalculator";
import BodyFatCalculator from "@/components/BodyFatCalculator";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <BMICalculator />
      <BodyFatCalculator />
      
      <footer className="bg-primary/5 py-8 px-4 mt-16">
        <div className="container mx-auto text-center text-muted-foreground">
          <p className="text-sm">
            Health Calculator • BMI & Body Fat Analysis
          </p>
          <p className="text-xs mt-2">
            Note: These calculators provide estimates. Consult healthcare professionals for medical advice.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
