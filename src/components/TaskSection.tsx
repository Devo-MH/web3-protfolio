import { Twitter, MessageCircle, Wallet, CheckCircle, ExternalLink } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Task {
  id: string
  title: string
  description: string
  reward: number
  icon: React.ElementType
  completed: boolean
  action: string
  difficulty: "Easy" | "Medium" | "Hard"
}

const tasks: Task[] = [
  {
    id: "1",
    title: "Follow on Twitter",
    description: "Follow our official Twitter account for the latest updates and announcements",
    reward: 100,
    icon: Twitter,
    completed: false,
    action: "Follow @DeFiVault",
    difficulty: "Easy"
  },
  {
    id: "2", 
    title: "Join Discord",
    description: "Join our Discord community and introduce yourself in the #general channel",
    reward: 150,
    icon: MessageCircle,
    completed: true,
    action: "Join Server",
    difficulty: "Easy"
  },
  {
    id: "3",
    title: "Submit Wallet",
    description: "Submit your wallet address for verification and receive your first reward",
    reward: 200,
    icon: Wallet,
    completed: false,
    action: "Submit Address",
    difficulty: "Medium"
  }
]

export function TaskSection() {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-success/20 text-success border-success/30"
      case "Medium": return "bg-warning/20 text-warning border-warning/30"
      case "Hard": return "bg-destructive/20 text-destructive border-destructive/30"
      default: return "bg-muted/20 text-muted-foreground border-muted/30"
    }
  }

  return (
    <section className="py-16 px-4" id="tasks">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 gradient-text">Complete Tasks</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Earn DFV tokens by completing simple tasks and engaging with our community
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {tasks.map((task) => {
            const Icon = task.icon
            return (
              <Card 
                key={task.id} 
                className={`glass-card border-white/20 hover:border-primary/50 transition-all duration-300 group ${
                  task.completed ? 'neon-glow-cyan' : 'neon-glow'
                }`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      task.completed 
                        ? 'bg-success/20 text-success' 
                        : 'bg-gradient-to-r from-primary to-accent text-white'
                    }`}>
                      {task.completed ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        <Icon className="w-6 h-6" />
                      )}
                    </div>
                    <Badge 
                      variant="outline" 
                      className={getDifficultyColor(task.difficulty)}
                    >
                      {task.difficulty}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">{task.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                    {task.description}
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-2xl font-bold gradient-text">
                      +{task.reward} DFV
                    </div>
                  </div>
                  <Button 
                    className={`w-full ${
                      task.completed 
                        ? 'bg-success hover:bg-success/80' 
                        : 'bg-gradient-to-r from-primary to-accent hover:from-primary-glow hover:to-accent-glow'
                    } border-0 text-white group-hover:scale-105 transition-transform duration-300`}
                    disabled={task.completed}
                  >
                    {task.completed ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Completed
                      </>
                    ) : (
                      <>
                        {task.action}
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}