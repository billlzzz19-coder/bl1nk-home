#!/bin/bash

# BLinkOS Platform - Quick Setup Script
# This script helps you set up the project quickly

set -e

echo "🚀 BLinkOS Platform - Quick Setup"
echo "=================================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check Node.js version
echo "📦 Checking Node.js version..."
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed${NC}"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f 2 | cut -d'.' -f 1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo -e "${RED}❌ Node.js version must be >= 18.17.0${NC}"
    echo "Current version: $(node -v)"
    exit 1
fi

echo -e "${GREEN}✓ Node.js $(node -v) detected${NC}"

# Check npm version
echo "📦 Checking npm version..."
NPM_VERSION=$(npm -v | cut -d'.' -f 1)
if [ "$NPM_VERSION" -lt 9 ]; then
    echo -e "${YELLOW}⚠️  npm version is old. Updating...${NC}"
    npm install -g npm@latest
fi

echo -e "${GREEN}✓ npm $(npm -v) detected${NC}"
echo ""

# Install dependencies
echo "📥 Installing dependencies..."
npm install

echo -e "${GREEN}✓ Dependencies installed${NC}"
echo ""

# Setup environment variables
echo "🔧 Setting up environment variables..."

if [ ! -f .env.local ]; then
    cp .env.example .env.local
    echo -e "${GREEN}✓ Created .env.local from .env.example${NC}"

    # Generate NEXTAUTH_SECRET
    if command -v openssl &> /dev/null; then
        SECRET=$(openssl rand -base64 32)

        # Replace placeholder in .env.local
        if [[ "$OSTYPE" == "darwin"* ]]; then
            # macOS
            sed -i '' "s/your-super-secret-key-change-this-in-production/$SECRET/" .env.local
        else
            # Linux
            sed -i "s/your-super-secret-key-change-this-in-production/$SECRET/" .env.local
        fi

        echo -e "${GREEN}✓ Generated NEXTAUTH_SECRET${NC}"
    else
        echo -e "${YELLOW}⚠️  OpenSSL not found. Please manually set NEXTAUTH_SECRET in .env.local${NC}"
    fi

    echo ""
    echo -e "${YELLOW}⚠️  IMPORTANT: You need to configure .env.local with your actual API keys${NC}"
    echo ""
    echo "Please edit .env.local and fill in:"
    echo "  - BLINK_API_KEY"
    echo "  - BLINK_CLIENT_ID"
    echo "  - BLINK_CLIENT_SECRET"
    echo "  - (Optional) GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET"
    echo "  - (Optional) GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET"
    echo ""
else
    echo -e "${GREEN}✓ .env.local already exists${NC}"
fi

echo ""
echo "=================================="
echo -e "${GREEN}✅ Setup complete!${NC}"
echo ""
echo "Next steps:"
echo "  1. Edit .env.local and add your API keys"
echo "  2. Run: npm run dev"
echo "  3. Open: http://localhost:3000"
echo ""
echo "For more information, see:"
echo "  - README.md"
echo "  - SETUP_GUIDE.md"
echo "  - API_INTEGRATION_GUIDE.md"
echo ""
echo "Happy coding! 🎉"
