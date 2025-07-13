import { TrendingUp, TrendingDown } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const portfolioData = [
  { chain: "Ethereum", value: 12450.32, change: 5.67, color: "from-blue-500 to-blue-600" },
  { chain: "Polygon", value: 3234.18, change: -2.34, color: "from-purple-500 to-purple-600" },
  { chain: "Arbitrum", value: 8721.45, change: 12.45, color: "from-cyan-500 to-cyan-600" },
]

export function PortfolioValue() {
  const totalValue = portfolioData.reduce((sum, item) => sum + item.value, 0)
  const totalChange = portfolioData.reduce((sum, item) => sum + (item.value * item.change / 100), 0)
  const totalChangePercent = (totalChange / (totalValue - totalChange)) * 100

  return (
    <Card className="glass-card neon-glow col-span-full lg:col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="gradient-text">Total Portfolio Value</span>
          <Badge
            variant={totalChangePercent >= 0 ? "default" : "destructive"}
            className="flex items-center space-x-1"
          >
            {totalChangePercent >= 0 ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            <span>{totalChangePercent >= 0 ? "+" : ""}{totalChangePercent.toFixed(2)}%</span>
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Total value */}
        <div className="text-center">
          <div className="text-4xl font-bold text-foreground">
            ${totalValue.toLocaleString()}
          </div>
          <div className={`text-lg ${totalChangePercent >= 0 ? 'text-success' : 'text-destructive'}`}>
            {totalChangePercent >= 0 ? "+" : ""}${totalChange.toFixed(2)} (24h)
          </div>
        </div>

        {/* Chain breakdown */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-muted-foreground">By Chain</h3>
          {portfolioData.map((item) => (
            <div key={item.chain} className="flex items-center justify-between p-3 glass-card rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`h-3 w-3 rounded-full bg-gradient-to-r ${item.color}`}></div>
                <span className="font-medium">{item.chain}</span>
              </div>
              <div className="text-right">
                <div className="font-medium">${item.value.toLocaleString()}</div>
                <div className={`text-sm ${item.change >= 0 ? 'text-success' : 'text-destructive'}`}>
                  {item.change >= 0 ? "+" : ""}{item.change}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}