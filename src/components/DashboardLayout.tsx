import { Sidebar } from "@/components/Sidebar"
import { TopBar } from "@/components/TopBar"
import { PortfolioValue } from "@/components/PortfolioValue"
import { TokenTable } from "@/components/TokenTable"
import { NFTCarousel } from "@/components/NFTCarousel"
import { GasOptimizer } from "@/components/GasOptimizer"

export function DashboardLayout() {
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <TopBar />
        
        {/* Dashboard content */}
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">
            {/* Welcome section */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold gradient-text mb-2">
                Welcome back, Anon
              </h1>
              <p className="text-muted-foreground">
                Here's your Web3 portfolio overview and latest activity.
              </p>
            </div>

            {/* Dashboard grid */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              {/* Portfolio value card */}
              <PortfolioValue />
              
              {/* NFT carousel */}
              <NFTCarousel />
              
              {/* Token balances table */}
              <TokenTable />
              
              {/* Gas optimizer */}
              <GasOptimizer />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}