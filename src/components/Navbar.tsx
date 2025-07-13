import { Wallet, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ui/theme-toggle"

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-white/10 backdrop-blur-xl">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-primary to-accent flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold gradient-text">DeFiVault</span>
        </div>

        {/* Center Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#dashboard" className="text-foreground/80 hover:text-foreground transition-colors">
            Dashboard
          </a>
          <a href="#tasks" className="text-foreground/80 hover:text-foreground transition-colors">
            Tasks
          </a>
          <a href="#leaderboard" className="text-foreground/80 hover:text-foreground transition-colors">
            Leaderboard
          </a>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Button className="neon-glow bg-gradient-to-r from-primary to-accent hover:from-primary-glow hover:to-accent-glow border-0 text-white font-medium">
            <Wallet className="w-4 h-4 mr-2" />
            Connect Wallet
          </Button>
        </div>
      </div>
    </nav>
  )
}