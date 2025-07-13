import { CheckCircle, Circle } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Step {
  id: number
  title: string
  completed: boolean
}

const steps: Step[] = [
  { id: 1, title: "Connect Wallet", completed: true },
  { id: 2, title: "Complete Profile", completed: true },
  { id: 3, title: "First Task", completed: true },
  { id: 4, title: "Join Community", completed: false },
  { id: 5, title: "Referral Program", completed: false }
]

export function ProgressTracker() {
  const completedSteps = steps.filter(step => step.completed).length
  const progressPercentage = (completedSteps / steps.length) * 100

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <Card className="glass-card neon-glow border-white/20">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold gradient-text mb-2">
              Your Progress
            </CardTitle>
            <p className="text-muted-foreground">
              Complete all steps to unlock premium rewards
            </p>
          </CardHeader>
          <CardContent>
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Progress</span>
                <span className="text-sm font-medium">{completedSteps}/{steps.length}</span>
              </div>
              <Progress 
                value={progressPercentage} 
                className="h-3 bg-secondary/50"
              />
              <div className="text-center mt-2">
                <span className="text-2xl font-bold gradient-text">
                  {Math.round(progressPercentage)}%
                </span>
                <span className="text-muted-foreground ml-2">Complete</span>
              </div>
            </div>

            <div className="grid md:grid-cols-5 gap-4">
              {steps.map((step, index) => (
                <div key={step.id} className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all duration-300 ${
                    step.completed 
                      ? 'bg-success text-white shadow-[0_0_20px_rgba(34,197,94,0.5)]' 
                      : 'bg-muted/20 text-muted-foreground border-2 border-muted/30'
                  }`}>
                    {step.completed ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      <Circle className="w-6 h-6" />
                    )}
                  </div>
                  <span className={`text-sm text-center font-medium ${
                    step.completed ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                    {step.title}
                  </span>
                  {index < steps.length - 1 && (
                    <div className={`hidden md:block w-full h-0.5 mt-6 absolute translate-x-6 ${
                      step.completed && steps[index + 1]?.completed 
                        ? 'bg-success' 
                        : 'bg-muted/30'
                    }`} />
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 rounded-xl bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30">
              <div className="text-center">
                <h3 className="font-semibold mb-1">🎉 Bonus Reward</h3>
                <p className="text-sm text-muted-foreground">
                  Complete all steps to earn an additional <span className="font-bold text-primary">500 DFV tokens</span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}