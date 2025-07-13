import { Zap, ArrowRight, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const gasData = {
  current: { slow: 15, standard: 25, fast: 40 },
  predicted: { nextHour: 18, next4Hours: 22, next24Hours: 28 }
}

const swapSuggestions = [
  {
    from: "ETH",
    to: "USDC",
    currentGas: 45,
    optimizedGas: 28,
    savings: 17,
    timeWindow: "2-4 PM EST"
  },
  {
    from: "WBTC",
    to: "ETH",
    currentGas: 52,
    optimizedGas: 31,
    savings: 21,
    timeWindow: "Next hour"
  }
]

export function GasOptimizer() {
  return (
    <Card className="glass-card col-span-full lg:col-span-3">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Zap className="h-5 w-5 text-warning" />
          <span className="gradient-text">Gas Fee Optimizer</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current gas prices */}
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Current Gas Prices</h3>
          <div className="grid grid-cols-3 gap-4">
            {Object.entries(gasData.current).map(([speed, price]) => (
              <div key={speed} className="glass-card p-3 text-center rounded-lg">
                <div className="text-sm text-muted-foreground capitalize">{speed}</div>
                <div className="text-xl font-bold text-foreground">{price}</div>
                <div className="text-xs text-muted-foreground">gwei</div>
              </div>
            ))}
          </div>
        </div>

        {/* Gas prediction */}
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Price Predictions</h3>
          <div className="space-y-3">
            {Object.entries(gasData.predicted).map(([period, price]) => (
              <div key={period} className="flex items-center justify-between">
                <span className="text-sm capitalize">
                  {period.replace(/([A-Z])/g, ' $1').toLowerCase()}
                </span>
                <div className="flex items-center space-x-2">
                  <Progress value={(40 - price) * 2} className="w-20" />
                  <span className="font-mono text-sm w-12">{price}g</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Swap suggestions */}
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Optimization Suggestions</h3>
          <div className="space-y-3">
            {swapSuggestions.map((suggestion, index) => (
              <div key={index} className="glass-card p-4 rounded-lg group hover:neon-glow transition-all duration-300">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-sm">{suggestion.from}</span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    <span className="font-mono text-sm">{suggestion.to}</span>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    Save ${suggestion.savings}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{suggestion.timeWindow}</span>
                  </div>
                  <div className="text-right">
                    <div className="line-through text-destructive">{suggestion.currentGas}g</div>
                    <div className="text-success font-medium">{suggestion.optimizedGas}g</div>
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full mt-3 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  Schedule Swap
                </Button>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}