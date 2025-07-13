import { Bell, ChevronDown, Copy, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const chains = [
  { name: "Ethereum", symbol: "ETH", active: true },
  { name: "Polygon", symbol: "MATIC", active: false },
  { name: "Arbitrum", symbol: "ARB", active: false },
]

export function TopBar() {
  const walletAddress = "0x742d35Cc6634C0532925a3b8D18dDe218c"

  return (
    <header className="h-16 border-b border-border bg-background/80 backdrop-blur-xl px-6 flex items-center justify-between">
      {/* Left section - Wallet info */}
      <div className="flex items-center space-x-4">
        <div className="glass-card px-4 py-2 flex items-center space-x-2">
          <div className="h-2 w-2 bg-success rounded-full animate-pulse"></div>
          <span className="text-sm font-mono text-foreground">
            {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
          </span>
          <Button variant="ghost" size="icon" className="h-4 w-4">
            <Copy className="h-3 w-3" />
          </Button>
        </div>
        
        {/* Chain selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="glass-card flex items-center space-x-2">
              <div className="h-4 w-4 bg-gradient-to-br from-primary to-accent rounded-full"></div>
              <span className="text-sm">
                {chains.find(chain => chain.active)?.name}
              </span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="glass-card border-white/10">
            {chains.map((chain) => (
              <DropdownMenuItem key={chain.symbol} className="flex items-center space-x-2">
                <div className="h-4 w-4 bg-gradient-to-br from-primary to-accent rounded-full"></div>
                <span>{chain.name}</span>
                {chain.active && <Badge variant="secondary" className="ml-auto">Active</Badge>}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Right section - Actions */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <div className="absolute -top-1 -right-1 h-3 w-3 bg-destructive rounded-full flex items-center justify-center">
            <span className="text-xs text-white">3</span>
          </div>
        </Button>

        {/* Theme toggle */}
        <ThemeToggle />

        {/* Portfolio link */}
        <Button variant="outline" size="sm" className="glass-card">
          <ExternalLink className="h-4 w-4 mr-2" />
          View on Explorer
        </Button>
      </div>
    </header>
  )
}