# ChainBoard Backend API

A robust Node.js/Express.js backend API for Web3 portfolio management, providing real-time token balances, NFT metadata, gas optimization, and swap recommendations.

## 🚀 Features

- **Portfolio Tracking** - Real-time token balances with USD values
- **NFT Management** - Fetch and display NFT metadata
- **Gas Optimization** - Live gas price estimates and recommendations
- **Swap Recommendations** - 1inch integration for token swaps
- **Caching** - Intelligent caching for improved performance
- **Rate Limiting** - API protection and abuse prevention
- **Security** - Helmet.js, CORS, and input validation

## 🛠️ Tech Stack

- **Runtime**: Node.js + TypeScript
- **Framework**: Express.js
- **APIs**: Alchemy, CoinGecko, EthGasStation, 1inch
- **Caching**: Node-Cache
- **Security**: Helmet, CORS, Rate Limiting
- **Deployment**: Vercel-ready

## 📋 Prerequisites

- Node.js 18+
- npm or yarn
- API keys for external services

## 🔧 Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd chainboard-backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp env.example .env
```

4. **Configure your API keys in `.env`**
```env
ALCHEMY_API_KEY=your_alchemy_api_key
COINGECKO_API_KEY=your_coingecko_api_key
ETHGASSTATION_API_KEY=your_ethgasstation_api_key
ONEINCH_API_KEY=your_1inch_api_key
```

## 🚀 Development

**Start development server:**
```bash
npm run dev
```

**Build for production:**
```bash
npm run build
```

**Start production server:**
```bash
npm start
```

## 📡 API Endpoints

### Health Check
- `GET /api/health` - Server health status

### Portfolio Management
- `GET /api/portfolio/:wallet` - Get token balances with USD values
- `GET /api/nfts/:wallet` - Get NFT metadata for wallet

### Gas Optimization
- `GET /api/gas/eth` - Get current gas estimates
- `GET /api/gas/optimize?urgency=standard` - Get optimized gas recommendations

### Swap Recommendations
- `POST /api/swap/recommendation` - Get swap route recommendations
- `GET /api/swap/tokens` - Get common token list

## 🔑 API Keys Setup

### Required APIs

1. **Alchemy API** (https://www.alchemy.com/)
   - Sign up for free account
   - Create Ethereum mainnet app
   - Copy API key to `ALCHEMY_API_KEY`

2. **CoinGecko API** (https://www.coingecko.com/en/api)
   - Free tier available
   - Copy API key to `COINGECKO_API_KEY`

3. **EthGasStation API** (https://ethgasstation.info/)
   - Free tier available
   - Copy API key to `ETHGASSTATION_API_KEY`

### Optional APIs

4. **1inch API** (https://1inch.dev/)
   - Sign up for API access
   - Copy API key to `ONEINCH_API_KEY`

## 🚀 Deployment

### Vercel Deployment

1. **Push to GitHub**
```bash
git add .
git commit -m "Initial ChainBoard backend"
git push origin main
```

2. **Deploy to Vercel**
   - Connect your GitHub repository
   - Vercel will auto-detect the Node.js project
   - Set environment variables in Vercel dashboard
   - Deploy!

### Environment Variables for Production

Set these in your Vercel dashboard:
- `ALCHEMY_API_KEY`
- `COINGECKO_API_KEY`
- `ETHGASSTATION_API_KEY`
- `ONEINCH_API_KEY`
- `NODE_ENV=production`

## 📊 API Response Examples

### Portfolio Response
```json
{
  "wallet": "0x1234...",
  "totalUsdValue": 15420.50,
  "tokens": [
    {
      "contractAddress": "0xA0b86a33E6441b8C4C8C8C8C8C8C8C8C8C8C8C8",
      "symbol": "USDC",
      "name": "USD Coin",
      "balance": "1000000000",
      "decimals": 6,
      "price": 1.00,
      "usdValue": 1000.00
    }
  ],
  "lastUpdated": "2024-01-15T10:30:00.000Z"
}
```

### Gas Estimates Response
```json
{
  "network": "Ethereum Mainnet",
  "estimates": {
    "low": 20,
    "medium": 30,
    "high": 50,
    "baseFee": 15,
    "priorityFee": {
      "slow": 20,
      "standard": 30,
      "fast": 50
    },
    "estimatedTime": {
      "slow": "5-10 minutes",
      "standard": "2-5 minutes",
      "fast": "1-2 minutes"
    }
  },
  "lastUpdated": "2024-01-15T10:30:00.000Z"
}
```

## 🔒 Security Features

- **Input Validation** - Ethereum address validation
- **Rate Limiting** - 100 requests per 15 minutes per IP
- **CORS Protection** - Configurable origins
- **Helmet.js** - Security headers
- **Request Logging** - Comprehensive request tracking

## 🧪 Testing

```bash
npm test
```

## 📝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

For issues and questions:
- Create an issue in the repository
- Check the API documentation
- Review the environment setup guide
