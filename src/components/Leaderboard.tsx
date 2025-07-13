import { Trophy, Medal, Award, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface LeaderboardEntry {
  id: string
  rank: number
  username: string
  avatar: string
  points: number
  change: number
  badge?: string
}

const leaderboardData: LeaderboardEntry[] = [
  {
    id: "1",
    rank: 1,
    username: "CryptoKing",
    avatar: "/api/placeholder/40/40",
    points: 15420,
    change: 5,
    badge: "👑"
  },
  {
    id: "2", 
    rank: 2,
    username: "DeFiQueen",
    avatar: "/api/placeholder/40/40",
    points: 12350,
    change: 2,
    badge: "🚀"
  },
  {
    id: "3",
    rank: 3,
    username: "TokenMaster",
    avatar: "/api/placeholder/40/40", 
    points: 11240,
    change: -1,
    badge: "💎"
  },
  {
    id: "4",
    rank: 4,
    username: "BlockchainPro",
    avatar: "/api/placeholder/40/40",
    points: 9870,
    change: 3
  },
  {
    id: "5",
    rank: 5,
    username: "SmartTrader",
    avatar: "/api/placeholder/40/40",
    points: 8950,
    change: -2
  }
]

export function Leaderboard() {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Trophy className="w-5 h-5 text-yellow-500" />
      case 2: return <Medal className="w-5 h-5 text-gray-400" />
      case 3: return <Award className="w-5 h-5 text-amber-600" />
      default: return <span className="w-5 h-5 flex items-center justify-center text-sm font-bold text-muted-foreground">#{rank}</span>
    }
  }

  const getChangeColor = (change: number) => {
    if (change > 0) return "text-success"
    if (change < 0) return "text-destructive"
    return "text-muted-foreground"
  }

  return (
    <section className="py-16 px-4" id="leaderboard">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 gradient-text">Referral Leaderboard</h2>
          <p className="text-xl text-muted-foreground">
            Top performers in our community earn exclusive rewards
          </p>
        </div>

        <Card className="glass-card neon-glow border-white/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Trophy className="w-6 h-6 text-primary" />
              Top Earners
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {leaderboardData.map((entry) => (
                <div 
                  key={entry.id}
                  className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 hover:scale-[1.02] ${
                    entry.rank <= 3 
                      ? 'bg-gradient-to-r from-primary/10 to-accent/10 border-primary/30 shadow-[0_0_20px_rgba(124,58,237,0.3)]' 
                      : 'bg-muted/20 border-muted/30'
                  }`}
                >
                  {/* Rank */}
                  <div className="flex items-center justify-center w-10">
                    {getRankIcon(entry.rank)}
                  </div>

                  {/* Avatar */}
                  <Avatar className="w-12 h-12 border-2 border-primary/30">
                    <AvatarImage src={entry.avatar} />
                    <AvatarFallback className="bg-gradient-to-r from-primary to-accent text-white font-bold">
                      {entry.username.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  {/* User Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold">{entry.username}</span>
                      {entry.badge && (
                        <span className="text-lg">{entry.badge}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Points:</span>
                      <span className="font-bold text-primary">{entry.points.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Change */}
                  <div className="flex items-center gap-1">
                    <TrendingUp className={`w-4 h-4 ${getChangeColor(entry.change)} ${entry.change < 0 ? 'rotate-180' : ''}`} />
                    <span className={`text-sm font-medium ${getChangeColor(entry.change)}`}>
                      {entry.change > 0 ? '+' : ''}{entry.change}
                    </span>
                  </div>

                  {/* Rewards */}
                  <div className="text-right">
                    <Badge 
                      variant="outline" 
                      className={entry.rank <= 3 ? 'border-accent/50 text-accent' : 'border-muted/50'}
                    >
                      {entry.rank <= 3 ? `${500 - (entry.rank - 1) * 100} DFV` : '50 DFV'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-accent/20 to-primary/20 border border-accent/30">
              <div className="text-center">
                <h3 className="font-semibold mb-2">🏆 Weekly Rewards</h3>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="font-bold text-yellow-500">1st Place</div>
                    <div>500 DFV + NFT</div>
                  </div>
                  <div>
                    <div className="font-bold text-gray-400">2nd Place</div>
                    <div>300 DFV</div>
                  </div>
                  <div>
                    <div className="font-bold text-amber-600">3rd Place</div>
                    <div>200 DFV</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}