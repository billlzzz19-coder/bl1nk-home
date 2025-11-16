# BLinkOS Platform

**BLinkOS - AI Agent Operating System Platform**

แพลตฟอร์ม AI Agent ที่ให้คุณควบคุมได้ทุกขั้นตอน พร้อมทีม AI 10 ตัวที่เชี่ยวชาญเฉพาะด้าน

## 📋 สารบัญ

- [ภาพรวม](#ภาพรวม)
- [คุณสมบัติหลัก](#คุณสมบัติหลัก)
- [เทคโนโลยีที่ใช้](#เทคโนโลยีที่ใช้)
- [การติดตั้ง](#การติดตั้ง)
- [การใช้งาน](#การใช้งาน)
- [โครงสร้างโปรเจกต์](#โครงสร้างโปรเจกต์)
- [API Documentation](#api-documentation)
- [การพัฒนา](#การพัฒนา)
- [การทดสอบ](#การทดสอบ)
- [การ Deploy](#การ-deploy)
- [Contributing](#contributing)
- [License](#license)

## 🎯 ภาพรวม

BLinkOS เป็นแพลตฟอร์ม AI Agent Operating System ที่ออกแบบมาเพื่อให้ผู้ใช้สามารถควบคุมและจัดการทีม AI Agents ได้อย่างโปร่งใส โดยมี AI Agents หลายตัวที่เชี่ยวชาญในด้านต่างๆ ทำงานร่วมกันเพื่อช่วยเหลือผู้ใช้ในงานต่างๆ

### จุดเด่น

- **โปร่งใสทุกขั้นตอน**: ผู้ใช้สามารถเห็นและควบคุมทุกการทำงานของ AI Agents
- **ทีม AI หลายตัว**: มี AI Agents 10 ตัวที่เชี่ยวชาญเฉพาะด้าน
- **อ้างอิงแหล่งที่มา**: ทุกคำตอบมีแหล่งอ้างอิงที่ชัดเจน
- **Marketplace**: ตลาดเครื่องมือและ Agents ที่สามารถติดตั้งได้
- **Dashboard**: ระบบติดตามและวิเคราะห์การทำงาน

## ✨ คุณสมบัติหลัก

### 1. Authentication & Authorization
- Email/Password authentication
- OAuth providers (Google, GitHub)
- JWT-based session management
- Protected routes

### 2. AI Agents Management
- ระบบจัดการ AI Agents หลายตัว
- ติดตามสถานะการทำงาน (active, idle, busy)
- Execute tasks และ monitor progress
- Activity feed

### 3. Marketplace
- Browse และค้นหา Tools
- Install/Uninstall tools
- Rating และ reviews
- Category filtering

### 4. Dashboard
- Project statistics (progress, build time, errors)
- Usage metrics (CPU, Memory, AI Tokens)
- Activity feed
- Real-time console output

### 5. Tools
- Markdown Editor
- Todo List (Dynamic Island style)
- และอื่นๆ

## 🛠 เทคโนโลยีที่ใช้

### Core Framework
- **Next.js 14** - App Router
- **React 18** - UI Library
- **TypeScript** - Type Safety

### Styling
- **Tailwind CSS** - Utility-first CSS
- **Radix UI** - Accessible component primitives
- **Shadcn UI** - Component library
- **Framer Motion** - Animation

### Authentication
- **NextAuth.js** - Authentication solution
- **JWT** - Token-based authentication

### API & Data
- **Axios** - HTTP client
- **Zod** - Schema validation
- **React Hook Form** - Form management

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Jest** - Testing framework
- **Husky** - Git hooks
- **Commitlint** - Commit message linting

### Monitoring & Analytics
- **Sentry** - Error tracking
- **Vercel Analytics** - Web analytics

## 🚀 การติดตั้ง

### ความต้องการของระบบ

- Node.js >= 18.17.0
- npm >= 9.0.0
- Git

### ขั้นตอนการติดตั้ง

#### วิธีที่ 1: ใช้ Setup Script (แนะนำ)

```bash
# ให้สิทธิ์ execute
chmod +x scripts/setup.sh

# รัน setup script
./scripts/setup.sh
```

#### วิธีที่ 2: ติดตั้งด้วยตนเอง

```bash
# Clone repository
git clone <repository-url>
cd bl1nk-home

# Install dependencies
npm install

# Copy environment file
cp .env.example .env.local

# แก้ไข .env.local และเพิ่ม API keys
# - BLINK_API_KEY
# - BLINK_CLIENT_ID
# - BLINK_CLIENT_SECRET
# - GOOGLE_CLIENT_ID (optional)
# - GOOGLE_CLIENT_SECRET (optional)
# - GITHUB_CLIENT_ID (optional)
# - GITHUB_CLIENT_SECRET (optional)
# - NEXTAUTH_SECRET (generate with: openssl rand -base64 32)

# Run development server
npm run dev
```

เปิดเบราว์เซอร์ไปที่ [http://localhost:3000](http://localhost:3000)

สำหรับรายละเอียดเพิ่มเติม ดูที่ [SETUP_GUIDE.md](./SETUP_GUIDE.md)

## 📖 การใช้งาน

### เริ่มต้นใช้งาน

1. **สมัครสมาชิก/เข้าสู่ระบบ**
   - ไปที่ `/login` หรือ `/auth`
   - ใช้ Email/Password หรือ OAuth (Google/GitHub)

2. **Dashboard**
   - ไปที่ `/dashboard` เพื่อดูภาพรวม
   - ติดตาม progress, usage metrics, และ activities

3. **Marketplace**
   - ไปที่ `/marketplace` เพื่อค้นหาและติดตั้ง tools
   - Filter by category หรือ search

4. **Tools**
   - ไปที่ `/tools` เพื่อใช้งาน tools ต่างๆ
   - Markdown Editor: `/tools/markdown`
   - Todo List: `/tools/todo`

### API Integration

สำหรับรายละเอียดการใช้งาน API ดูที่ [API_INTEGRATION_GUIDE.md](./API_INTEGRATION_GUIDE.md)

## 📁 โครงสร้างโปรเจกต์

```
bl1nk-home/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── agents/        # Agents API
│   │   ├── auth/          # Authentication API
│   │   ├── stats/         # Statistics API
│   │   └── tools/         # Tools API
│   ├── auth/              # Auth pages
│   ├── dashboard/         # Dashboard page
│   ├── login/             # Login page
│   ├── marketplace/       # Marketplace page
│   ├── tools/             # Tools pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── providers.tsx      # Context providers
├── components/            # React components
│   ├── auth/              # Auth components
│   ├── ui/                # UI components (Shadcn)
│   └── ...                # Other components
├── lib/                   # Utility libraries
│   ├── api.ts             # API client
│   ├── auth.ts            # Auth configuration
│   └── utils.ts           # Utility functions
├── hooks/                 # Custom React hooks
├── types/                 # TypeScript types
├── locales/               # i18n translations
├── public/                # Static assets
├── scripts/               # Build scripts
├── styles/                # Global styles
├── tests/                 # Test files
├── docs/                  # Documentation
└── resources/             # Resources files
```

สำหรับรายละเอียดเพิ่มเติม ดูที่ [docs/PROJECT_STRUCTURE.md](./docs/PROJECT_STRUCTURE.md)

## 🔌 API Documentation

### Base URL
```
https://api.bl1nk.site/v1
```

### Authentication
API ใช้ Bearer Token authentication:
```typescript
Authorization: Bearer <token>
```

### Endpoints

#### Authentication
- `POST /auth/login` - Login
- `POST /auth/logout` - Logout
- `GET /auth/me` - Get current user

#### Agents
- `GET /agents` - List all agents
- `GET /agents/:id` - Get agent details
- `POST /agents/:id/execute` - Execute agent task

#### Tools
- `GET /tools` - List tools (with filters)
- `GET /tools/:id` - Get tool details
- `POST /tools/:id/install` - Install tool
- `POST /tools/:id/uninstall` - Uninstall tool
- `GET /tools/installed` - Get installed tools

#### Statistics
- `GET /stats/project` - Get project statistics
- `GET /stats/usage` - Get usage metrics
- `GET /activities` - Get activity feed

สำหรับรายละเอียดเพิ่มเติม ดูที่ [API_INTEGRATION_GUIDE.md](./API_INTEGRATION_GUIDE.md)

## 💻 การพัฒนา

### Scripts

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Start production server

# Code Quality
npm run lint             # Run ESLint
npm run type-check       # TypeScript type checking
npm run format           # Format code with Prettier
npm run format:check     # Check code formatting

# Testing
npm run test             # Run tests
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Run tests with coverage
npm run test:ci          # Run tests in CI mode
```

### Code Style

- ใช้ TypeScript สำหรับทุกไฟล์
- ใช้ functional components
- ใช้ named exports
- ใช้ lowercase with dashes สำหรับชื่อไฟล์
- ใช้ descriptive variable names

สำหรับรายละเอียดเพิ่มเติม ดูที่ [docs/DEVELOPMENT.md](./docs/DEVELOPMENT.md)

## 🧪 การทดสอบ

### Unit Tests
```bash
npm run test
```

### Test Coverage
```bash
npm run test:coverage
```

### E2E Tests
```bash
# Coming soon
```

## 🚢 การ Deploy

### Vercel (แนะนำ)

1. Push code ไปที่ Git repository
2. Import project ใน Vercel
3. Configure environment variables
4. Deploy

### Docker

```bash
# Build image
docker build -t blinkos-platform .

# Run container
docker run -p 3000:3000 blinkos-platform
```

### Environment Variables

ต้องตั้งค่า environment variables ต่อไปนี้:

```env
# API
NEXT_PUBLIC_API_BASE_URL=https://api.bl1nk.site/v1
BLINK_API_KEY=your-api-key
BLINK_CLIENT_ID=your-client-id
BLINK_CLIENT_SECRET=your-client-secret

# Authentication
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=https://your-domain.com

# OAuth (Optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
```

## 🤝 Contributing

เรายินดีรับ contributions! กรุณาอ่าน [CONTRIBUTING.md](./CONTRIBUTING.md) และ [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md) ก่อนเริ่ม

### Workflow

1. Fork repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

### Commit Convention

เราใช้ [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `test:` - Tests
- `chore:` - Build process or auxiliary tools

## 📄 License

ดูที่ [LICENSE](./LICENSE) file

## 📞 ติดต่อ

- Website: [bl1nk.site](https://bl1nk.site)
- Documentation: [docs/](./docs/)
- Issues: [GitHub Issues](https://github.com/your-repo/issues)

## 🙏 Acknowledgments

- Next.js team
- Radix UI team
- Shadcn UI community
- และทุกคนที่ช่วยพัฒนาโปรเจกต์นี้

---

Made with ❤️ by BLinkOS Team
