import { TrendingUp, TrendingDown } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const tokens = [
  {
    symbol: "ETH",
    name: "Ethereum",
    amount: 5.234,
    price: 2380.45,
    change: 5.67,
    logo: "🔷"
  },
  {
    symbol: "MATIC",
    name: "Polygon",
    amount: 1234.56,
    price: 0.85,
    change: -2.34,
    logo: "🟣"
  },
  {
    symbol: "ARB",
    name: "Arbitrum",
    amount: 892.34,
    price: 1.23,
    change: 12.45,
    logo: "🔵"
  },
  {
    symbol: "OP",
    name: "Optimism",
    amount: 456.78,
    price: 2.15,
    change: -0.89,
    logo: "🔴"
  },
]

export function TokenTable() {
  return (
    <Card className="glass-card col-span-full lg:col-span-3">
      <CardHeader>
        <CardTitle className="gradient-text">Token Balances</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border border-white/10 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-white/10">
                <TableHead>Asset</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Value</TableHead>
                <TableHead className="text-right">24h Change</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tokens.map((token) => (
                <TableRow key={token.symbol} className="border-white/10 hover:bg-white/5">
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{token.logo}</span>
                      <div>
                        <div className="font-medium">{token.symbol}</div>
                        <div className="text-sm text-muted-foreground">{token.name}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    {token.amount.toFixed(3)}
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    ${token.price.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    ${(token.amount * token.price).toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className={`flex items-center justify-end space-x-1 ${
                      token.change >= 0 ? 'text-success' : 'text-destructive'
                    }`}>
                      {token.change >= 0 ? (
                        <TrendingUp className="h-4 w-4" />
                      ) : (
                        <TrendingDown className="h-4 w-4" />
                      )}
                      <span className="font-mono">
                        {token.change >= 0 ? "+" : ""}{token.change.toFixed(2)}%
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}