import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Ruler, Weight, Calculator } from "lucide-react";
import { toast } from "sonner";

const BMICalculator = () => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBMI] = useState<number | null>(null);
  const [category, setCategory] = useState("");

  const calculateBMI = () => {
    const h = parseFloat(height);
    const w = parseFloat(weight);

    if (!h || !w || h <= 0 || w <= 0) {
      toast.error("Please enter valid height and weight values");
      return;
    }

    // Convert height from cm to meters
    const heightInMeters = h / 100;
    const bmiValue = w / (heightInMeters * heightInMeters);
    
    setBMI(parseFloat(bmiValue.toFixed(1)));

    // Determine category
    if (bmiValue < 18.5) {
      setCategory("Underweight");
    } else if (bmiValue >= 18.5 && bmiValue < 25) {
      setCategory("Normal");
    } else if (bmiValue >= 25 && bmiValue < 30) {
      setCategory("Overweight");
    } else {
      setCategory("Obese");
    }

    toast.success("BMI calculated successfully!");
  };

  const getCategoryColor = () => {
    switch (category) {
      case "Underweight":
        return "bg-warning";
      case "Normal":
        return "bg-success";
      case "Overweight":
        return "bg-warning";
      case "Obese":
        return "bg-destructive";
      default:
        return "bg-muted";
    }
  };

  const getCategoryPosition = () => {
    if (!bmi) return 0;
    if (bmi < 18.5) return (bmi / 18.5) * 25;
    if (bmi < 25) return 25 + ((bmi - 18.5) / 6.5) * 25;
    if (bmi < 30) return 50 + ((bmi - 25) / 5) * 25;
    return Math.min(75 + ((bmi - 30) / 10) * 25, 100);
  };

  return (
    <section id="bmi-calculator" className="py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">BMI Calculator</h2>
          <p className="text-muted-foreground text-lg">
            Calculate your Body Mass Index to understand your weight status
          </p>
        </div>

        <Card className="p-8 shadow-[var(--shadow-card)] border-0 bg-card">
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-2">
              <Label htmlFor="height" className="text-base font-medium flex items-center gap-2">
                <Ruler className="h-5 w-5 text-primary" />
                Height (cm)
              </Label>
              <Input
                id="height"
                type="number"
                placeholder="170"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="h-12 text-lg border-2 focus:border-primary transition-colors"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="weight" className="text-base font-medium flex items-center gap-2">
                <Weight className="h-5 w-5 text-primary" />
                Weight (kg)
              </Label>
              <Input
                id="weight"
                type="number"
                placeholder="70"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="h-12 text-lg border-2 focus:border-primary transition-colors"
              />
            </div>
          </div>

          <Button
            onClick={calculateBMI}
            className="w-full h-14 text-lg font-semibold bg-primary hover:bg-primary/90 transition-all hover:scale-[1.02]"
          >
            <Calculator className="mr-2 h-5 w-5" />
            Calculate BMI
          </Button>

          {bmi !== null && (
            <div className="mt-8 animate-fade-in">
              <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-8 border border-primary/20">
                <div className="text-center mb-6">
                  <p className="text-muted-foreground mb-2">Your BMI</p>
                  <p className="text-6xl font-bold text-primary mb-2">{bmi}</p>
                  <p className={`text-2xl font-semibold ${getCategoryColor().replace('bg-', 'text-')}`}>
                    {category}
                  </p>
                </div>

                <div className="relative h-8 bg-muted rounded-full overflow-hidden mb-4">
                  <div className="absolute inset-0 flex">
                    <div className="flex-1 bg-warning"></div>
                    <div className="flex-1 bg-success"></div>
                    <div className="flex-1 bg-warning"></div>
                    <div className="flex-1 bg-destructive"></div>
                  </div>
                  <div
                    className="absolute top-0 bottom-0 w-1 bg-foreground shadow-lg transition-all duration-500"
                    style={{ left: `${getCategoryPosition()}%` }}
                  ></div>
                </div>

                <div className="grid grid-cols-4 text-xs text-muted-foreground text-center">
                  <div>&lt;18.5</div>
                  <div>18.5-25</div>
                  <div>25-30</div>
                  <div>&gt;30</div>
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>
    </section>
  );
};

export default BMICalculator;
