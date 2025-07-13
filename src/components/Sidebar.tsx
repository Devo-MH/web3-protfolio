import { useState } from "react"
import { LayoutDashboard, Images, Fuel, History, Settings, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const navigation = [
  { name: "Dashboard", icon: LayoutDashboard, href: "#dashboard", active: true },
  { name: "NFTs", icon: Images, href: "#nfts", active: false },
  { name: "Gas Fees", icon: Fuel, href: "#gas", active: false },
  { name: "History", icon: History, href: "#history", active: false },
  { name: "Settings", icon: Settings, href: "#settings", active: false },
]

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Mobile toggle button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden glass-card neon-glow"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed left-0 top-0 h-full w-64 bg-sidebar backdrop-blur-xl border-r border-sidebar-border z-50 transform transition-transform duration-300 md:relative md:transform-none",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
          className
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-center border-b border-sidebar-border">
            <div className="flex items-center space-x-2">
              <img src="/logo.svg" alt="Web3 Portfolio Logo" className="h-6 w-6" />
              <span className="font-bold text-lg text-sidebar-foreground">Web3 Portfolio</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center px-3 py-3 text-sm font-medium rounded-xl transition-all duration-200",
                  item.active
                    ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-lg neon-glow"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-md"
                )}
                onClick={() => setIsOpen(false)}
              >
                <item.icon
                  className={cn(
                    "mr-3 h-5 w-5 transition-colors",
                    item.active ? "text-primary" : "text-sidebar-foreground group-hover:text-sidebar-accent-foreground"
                  )}
                />
                {item.name}
              </a>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-sidebar-border">
            <div className="glass-card p-3 text-center">
              <p className="text-xs text-sidebar-foreground opacity-70">
                Powered by Web3
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}