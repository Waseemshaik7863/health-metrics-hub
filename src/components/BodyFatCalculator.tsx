import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { User, Ruler, Weight, Calculator } from "lucide-react";
import { toast } from "sonner";

const BodyFatCalculator = () => {
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [waist, setWaist] = useState("");
  const [neck, setNeck] = useState("");
  const [hip, setHip] = useState("");
  const [bodyFat, setBodyFat] = useState<number | null>(null);

  const calculateBodyFat = () => {
    const h = parseFloat(height);
    const w = parseFloat(weight);
    const wa = parseFloat(waist);
    const n = parseFloat(neck);
    const hp = parseFloat(hip);

    if (!h || !w || !wa || !n || h <= 0 || w <= 0 || wa <= 0 || n <= 0) {
      toast.error("Please enter valid measurements");
      return;
    }

    if (gender === "female" && (!hp || hp <= 0)) {
      toast.error("Please enter valid hip measurement");
      return;
    }

    // U.S. Navy Method
    let bodyFatPercentage;
    
    if (gender === "male") {
      bodyFatPercentage = 495 / (1.0324 - 0.19077 * Math.log10(wa - n) + 0.15456 * Math.log10(h)) - 450;
    } else {
      bodyFatPercentage = 495 / (1.29579 - 0.35004 * Math.log10(wa + hp - n) + 0.22100 * Math.log10(h)) - 450;
    }

    setBodyFat(parseFloat(bodyFatPercentage.toFixed(1)));
    toast.success("Body fat percentage calculated!");
  };

  const getBodyFatCategory = () => {
    if (!bodyFat) return { category: "", color: "" };

    const ranges = gender === "male"
      ? [
        { max: 6, category: "Essential Fat", color: "text-warning" },
        { max: 13, category: "Athletes", color: "text-success" },
        { max: 17, category: "Fitness", color: "text-success" },
        { max: 24, category: "Average", color: "text-primary" },
        { max: 100, category: "Obese", color: "text-destructive" }
      ]
      : [
        { max: 13, category: "Essential Fat", color: "text-warning" },
        { max: 20, category: "Athletes", color: "text-success" },
        { max: 24, category: "Fitness", color: "text-success" },
        { max: 31, category: "Average", color: "text-primary" },
        { max: 100, category: "Obese", color: "text-destructive" }
      ];

    const result = ranges.find(range => bodyFat <= range.max);
    return result || { category: "", color: "" };
  };

  const { category: fatCategory, color: fatColor } = getBodyFatCategory();

  return (
    <section id="bodyfat-calculator" className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">Body Fat Calculator</h2>
          <p className="text-muted-foreground text-lg">
            Calculate your body fat percentage using the U.S. Navy Method
          </p>
        </div>

        <Card className="p-8 shadow-[var(--shadow-card)] border-0 bg-card">
          <div className="space-y-6 mb-8">
            <div>
              <Label className="text-base font-medium mb-3 block flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Gender
              </Label>
              <RadioGroup value={gender} onValueChange={setGender} className="flex gap-6">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male" className="cursor-pointer font-normal">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female" className="cursor-pointer font-normal">Female</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="bf-age" className="text-base font-medium">Age (years)</Label>
                <Input
                  id="bf-age"
                  type="number"
                  placeholder="25"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="h-12 text-lg border-2 focus:border-primary transition-colors"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bf-height" className="text-base font-medium flex items-center gap-2">
                  <Ruler className="h-5 w-5 text-primary" />
                  Height (cm)
                </Label>
                <Input
                  id="bf-height"
                  type="number"
                  placeholder="170"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="h-12 text-lg border-2 focus:border-primary transition-colors"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bf-weight" className="text-base font-medium flex items-center gap-2">
                  <Weight className="h-5 w-5 text-primary" />
                  Weight (kg)
                </Label>
                <Input
                  id="bf-weight"
                  type="number"
                  placeholder="70"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="h-12 text-lg border-2 focus:border-primary transition-colors"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="waist" className="text-base font-medium">Waist (cm)</Label>
                <Input
                  id="waist"
                  type="number"
                  placeholder="85"
                  value={waist}
                  onChange={(e) => setWaist(e.target.value)}
                  className="h-12 text-lg border-2 focus:border-primary transition-colors"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="neck" className="text-base font-medium">Neck (cm)</Label>
                <Input
                  id="neck"
                  type="number"
                  placeholder="38"
                  value={neck}
                  onChange={(e) => setNeck(e.target.value)}
                  className="h-12 text-lg border-2 focus:border-primary transition-colors"
                />
              </div>

              {gender === "female" && (
                <div className="space-y-2">
                  <Label htmlFor="hip" className="text-base font-medium">Hip (cm)</Label>
                  <Input
                    id="hip"
                    type="number"
                    placeholder="95"
                    value={hip}
                    onChange={(e) => setHip(e.target.value)}
                    className="h-12 text-lg border-2 focus:border-primary transition-colors"
                  />
                </div>
              )}
            </div>
          </div>

          <Button
            onClick={calculateBodyFat}
            className="w-full h-14 text-lg font-semibold bg-primary hover:bg-primary/90 transition-all hover:scale-[1.02]"
          >
            <Calculator className="mr-2 h-5 w-5" />
            Calculate Body Fat
          </Button>

          {bodyFat !== null && (
            <div className="mt-8 animate-fade-in">
              <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-8 border border-primary/20">
                <div className="text-center mb-6">
                  <p className="text-muted-foreground mb-2">Your Body Fat Percentage</p>
                  <p className="text-6xl font-bold text-primary mb-2">{bodyFat}%</p>
                  <p className={`text-2xl font-semibold ${fatColor}`}>
                    {fatCategory}
                  </p>
                </div>

                <div className="space-y-2 text-sm text-muted-foreground">
                  <p className="font-semibold text-foreground mb-3">Healthy Ranges ({gender}):</p>
                  {gender === "male" ? (
                    <>
                      <p>• Essential Fat: 2-5%</p>
                      <p>• Athletes: 6-13%</p>
                      <p>• Fitness: 14-17%</p>
                      <p>• Average: 18-24%</p>
                      <p>• Obese: 25%+</p>
                    </>
                  ) : (
                    <>
                      <p>• Essential Fat: 10-13%</p>
                      <p>• Athletes: 14-20%</p>
                      <p>• Fitness: 21-24%</p>
                      <p>• Average: 25-31%</p>
                      <p>• Obese: 32%+</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>
    </section>
  );
};

export default BodyFatCalculator;
