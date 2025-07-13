import { Copy, TrendingUp, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function HeroSection() {
  const walletAddress = "0x742d35Cc6627C0532e73...8f4E"
  
  return (
    <section className="pt-24 pb-12 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 gradient-text animate-float">
            Welcome to DeFiVault
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Complete tasks, earn rewards, and climb the leaderboard in the future of decentralized finance.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Wallet Info */}
          <Card className="glass-card neon-glow border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                Wallet Connected
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mb-3">
                <code className="bg-muted/50 px-3 py-1 rounded-lg text-sm font-mono">
                  {walletAddress}
                </code>
                <Button size="sm" variant="outline" className="p-2">
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
              <Badge variant="secondary" className="bg-success/20 text-success border-success/30">
                Verified
              </Badge>
            </CardContent>
          </Card>

          {/* Token Balance */}
          <Card className="glass-card neon-glow-cyan border-accent/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingUp className="w-5 h-5 text-accent" />
                Total Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold gradient-text mb-2">
                2,547.89 DFV
              </div>
              <div className="text-sm text-muted-foreground">
                ≈ $12,847.23 USD
              </div>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="w-3 h-3 text-success" />
                <span className="text-success text-sm">+12.5%</span>
                <span className="text-muted-foreground text-sm">24h</span>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="glass-card neon-glow border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Clock className="w-5 h-5 text-primary" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Task Completed</span>
                  <span className="text-success text-sm font-medium">+100 DFV</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Referral Bonus</span>
                  <span className="text-accent text-sm font-medium">+50 DFV</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Daily Check-in</span>
                  <span className="text-primary text-sm font-medium">+25 DFV</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}