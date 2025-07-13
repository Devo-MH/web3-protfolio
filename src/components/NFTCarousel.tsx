import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const nfts = [
  {
    id: 1,
    name: "CryptoPunk #7804",
    collection: "CryptoPunks",
    image: "🤖",
    price: "420.5 ETH",
    rarity: "Ultra Rare"
  },
  {
    id: 2,
    name: "Bored Ape #2087",
    collection: "BAYC",
    image: "🐒",
    price: "85.2 ETH",
    rarity: "Rare"
  },
  {
    id: 3,
    name: "Azuki #1234",
    collection: "Azuki",
    image: "🎌",
    price: "12.8 ETH",
    rarity: "Common"
  },
]

export function NFTCarousel() {
  return (
    <Card className="glass-card col-span-full lg:col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="gradient-text">NFT Collection</span>
          <div className="flex space-x-2">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {nfts.slice(0, 2).map((nft) => (
            <div key={nft.id} className="glass-card p-4 rounded-lg group hover:neon-glow-cyan transition-all duration-300">
              <div className="flex items-center space-x-4">
                <div className="text-6xl">{nft.image}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-foreground">{nft.name}</h3>
                    <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{nft.collection}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm text-accent">{nft.price}</span>
                    <Badge 
                      variant={nft.rarity === "Ultra Rare" ? "default" : nft.rarity === "Rare" ? "secondary" : "outline"}
                      className="text-xs"
                    >
                      {nft.rarity}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          <Button variant="outline" className="w-full glass-card">
            View All NFTs ({nfts.length})
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}