# 📁 BLinkOS Platform - Project Structure

เอกสารอธิบายโครงสร้างโปรเจกต์และหน้าที่ของแต่ละโฟลเดอร์และไฟล์

## 📂 Directory Structure

```
bl1nk-home/
├── app/                          # Next.js 14 App Router
│   ├── api/                      # API Routes (Server-side)
│   │   ├── agents/               # Agents API endpoints
│   │   │   └── route.ts          # GET /api/agents
│   │   ├── auth/                 # Authentication API
│   │   │   └── [...nextauth]/    # NextAuth dynamic route
│   │   │       └── route.ts      # NextAuth handler
│   │   ├── stats/                # Statistics API
│   │   │   └── route.ts          # GET /api/stats
│   │   └── tools/                # Tools API
│   │       └── route.ts          # GET /api/tools
│   ├── auth/                     # Authentication pages
│   │   └── page.tsx              # Auth page
│   ├── dashboard/                # Dashboard pages
│   │   └── page.tsx              # Main dashboard
│   ├── login/                    # Login page
│   │   └── page.tsx              # Login form
│   ├── marketplace/              # Marketplace pages
│   │   └── page.tsx              # Tools marketplace
│   ├── tools/                    # Tools pages
│   │   ├── markdown/             # Markdown editor
│   │   │   └── page.tsx
│   │   ├── todo/                 # Todo list
│   │   │   └── page.tsx
│   │   └── page.tsx              # Tools index
│   ├── components/               # Page-specific components
│   │   ├── liquid-button.tsx     # Liquid button effect
│   │   └── liquid-glass.tsx      # Glass morphism effect
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home page
│   ├── providers.tsx             # Context providers
│   ├── globals.css               # Global styles
│   ├── error.tsx                 # Error boundary
│   ├── loading.tsx               # Loading UI
│   └── not-found.tsx             # 404 page
│
├── components/                    # Reusable React components
│   ├── auth/                     # Authentication components
│   │   ├── auth-card.tsx         # Auth card wrapper
│   │   ├── auth-form.tsx         # Base auth form
│   │   ├── sign-in-form.tsx      # Sign in form
│   │   ├── sign-up-form.tsx      # Sign up form
│   │   ├── social-login.tsx      # OAuth buttons
│   │   └── password-strength.tsx # Password validator
│   ├── ui/                       # Shadcn UI components
│   │   ├── button.tsx            # Button component
│   │   ├── card.tsx              # Card component
│   │   ├── input.tsx             # Input component
│   │   ├── form.tsx              # Form components
│   │   └── ...                   # 50+ UI components
│   ├── AgentCard.tsx             # Agent display card
│   ├── ToolCard.tsx              # Tool display card
│   ├── StatsCard.tsx             # Statistics card
│   ├── Navbar.tsx                # Navigation bar
│   ├── Analytics.tsx             # Analytics wrapper
│   ├── DynamicIslandTodo.tsx     # iOS-style todo
│   ├── theme-provider.tsx        # Theme context
│   ├── theme-switcher.tsx        # Theme toggle
│   └── theme-toggle.tsx          # Theme button
│
├── lib/                          # Utility libraries
│   ├── api.ts                    # API client (Axios)
│   ├── auth.ts                   # NextAuth configuration
│   └── utils.ts                  # Utility functions
│
├── hooks/                        # Custom React hooks
│   ├── use-mobile.ts             # Mobile detection
│   └── use-toast.ts              # Toast notifications
│
├── types/                        # TypeScript type definitions
│   └── next-auth.d.ts           # NextAuth type extensions
│
├── locales/                      # i18n translation files
│   ├── en-US/                    # English (US)
│   │   └── *.json                # Translation files
│   ├── th-TH/                    # Thai
│   ├── fr-FR/                    # French
│   └── ...                       # 15+ languages
│
├── public/                       # Static assets
│   ├── assets/                   # Images, icons
│   ├── favicon.ico               # Site favicon
│   ├── robots.txt                # SEO robots file
│   └── site.webmanifest          # PWA manifest
│
├── scripts/                      # Build & setup scripts
│   └── setup.sh                  # Quick setup script
│
├── styles/                       # Global styles
│   ├── globals.css               # Global CSS
│   └── DynamicIslandTodo.css     # Component styles
│
├── tests/                        # Test files
│   ├── e2e-tests.spec.ts         # E2E tests
│   └── ui-tests.spec.ts          # UI tests
│
├── __tests__/                    # Unit tests
│   ├── components/               # Component tests
│   └── lib/                      # Library tests
│
├── docs/                         # Documentation
│   ├── architecture.md           # Architecture docs
│   ├── PROJECT_STRUCTURE.md      # This file
│   └── DEVELOPMENT.md            # Development guide
│
├── resources/                    # Resource files
│   ├── locales/                  # Additional translations
│   ├── error.html                # Error page template
│   └── splash.html               # Splash screen
│
├── utils/                        # Utility scripts
│   └── gif-creator.js            # GIF generation utility
│
├── .dockerignore                 # Docker ignore rules
├── .gitignore                    # Git ignore rules
├── .coderabbit.yaml              # CodeRabbit config
├── commitlint.config.js          # Commit linting rules
├── docker-compose.yml            # Docker Compose config
├── Dockerfile                    # Docker build file
├── eslint.config.cjs             # ESLint configuration
├── jest.config.js                # Jest configuration
├── jest.setup.js                 # Jest setup file
├── next.config.js                # Next.js configuration
├── package.json                  # Dependencies & scripts
├── postcss.config.js             # PostCSS configuration
├── sentry.client.config.ts       # Sentry client config
├── sentry.server.config.ts       # Sentry server config
├── tailwind.config.ts            # Tailwind CSS config
├── tsconfig.json                 # TypeScript config
│
└── README.md                     # Project README
```

## 📝 File Descriptions

### App Router (`app/`)

#### API Routes (`app/api/`)

**`app/api/agents/route.ts`**
- Endpoint: `GET /api/agents`
- Purpose: ดึงรายการ AI Agents ทั้งหมด
- Returns: Array of Agent objects

**`app/api/auth/[...nextauth]/route.ts`**
- Endpoint: `/api/auth/*` (dynamic)
- Purpose: NextAuth.js authentication handler
- Handles: Login, logout, session management, OAuth callbacks

**`app/api/stats/route.ts`**
- Endpoint: `GET /api/stats`
- Purpose: ดึงสถิติและ metrics
- Returns: Project stats, usage metrics

**`app/api/tools/route.ts`**
- Endpoint: `GET /api/tools`
- Purpose: ดึงรายการ tools ใน marketplace
- Query params: `category`, `search`

#### Pages (`app/*/page.tsx`)

**`app/page.tsx`**
- Route: `/`
- Purpose: Homepage/Landing page
- Features: Hero section, features, pricing, CTA

**`app/login/page.tsx`**
- Route: `/login`
- Purpose: Login page
- Features: Email/password, OAuth buttons

**`app/auth/page.tsx`**
- Route: `/auth`
- Purpose: Authentication page (sign in/sign up)

**`app/dashboard/page.tsx`**
- Route: `/dashboard`
- Purpose: Main dashboard
- Features: Stats cards, usage charts, activity feed
- Protected: Requires authentication

**`app/marketplace/page.tsx`**
- Route: `/marketplace`
- Purpose: Tools marketplace
- Features: Tool browsing, search, install/uninstall

**`app/tools/page.tsx`**
- Route: `/tools`
- Purpose: Tools index page

**`app/tools/markdown/page.tsx`**
- Route: `/tools/markdown`
- Purpose: Markdown editor tool

**`app/tools/todo/page.tsx`**
- Route: `/tools/todo`
- Purpose: Todo list tool (Dynamic Island style)

#### Layout & Providers

**`app/layout.tsx`**
- Root layout component
- Includes: Navbar, Footer, Providers, Analytics
- Sets: Metadata, HTML lang attribute

**`app/providers.tsx`**
- Context providers wrapper
- Includes: ThemeProvider, SessionProvider

**`app/globals.css`**
- Global CSS styles
- CSS variables, animations, utilities

**`app/error.tsx`**
- Error boundary component
- Handles: Unhandled errors, displays error UI

**`app/loading.tsx`**
- Loading UI component
- Shows: Loading spinner/skeleton

**`app/not-found.tsx`**
- 404 page component
- Shows: Not found message, navigation links

### Components (`components/`)

#### Authentication Components (`components/auth/`)

**`auth-card.tsx`**
- Wrapper card for auth forms
- Features: Glass morphism, animations

**`sign-in-form.tsx`**
- Sign in form component
- Features: Email/password, validation, error handling

**`sign-up-form.tsx`**
- Sign up form component
- Features: Registration, password strength

**`social-login.tsx`**
- OAuth login buttons
- Providers: Google, GitHub

**`password-strength.tsx`**
- Password strength indicator
- Features: Visual feedback, requirements

#### UI Components (`components/ui/`)

Shadcn UI components (50+ components):
- **Form components**: `button.tsx`, `input.tsx`, `form.tsx`, `select.tsx`
- **Layout components**: `card.tsx`, `sheet.tsx`, `dialog.tsx`
- **Feedback components**: `toast.tsx`, `alert.tsx`, `progress.tsx`
- **Navigation**: `tabs.tsx`, `breadcrumb.tsx`, `pagination.tsx`
- **Data display**: `table.tsx`, `chart.tsx`, `badge.tsx`
- และอื่นๆ

#### Feature Components

**`AgentCard.tsx`**
- Displays AI Agent information
- Props: Agent data, onClick handler

**`ToolCard.tsx`**
- Displays Tool/Marketplace item
- Features: Install button, rating, downloads

**`StatsCard.tsx`**
- Displays statistics/metrics
- Features: Progress bar, value display

**`Navbar.tsx`**
- Main navigation bar
- Features: Logo, menu items, theme toggle, user menu

**`Analytics.tsx`**
- Analytics wrapper component
- Integrates: Vercel Analytics

**`DynamicIslandTodo.tsx`**
- iOS Dynamic Island style todo list
- Features: Expandable, animations

**`theme-provider.tsx`**
- Theme context provider
- Features: Dark/light mode, persistence

### Libraries (`lib/`)

**`lib/api.ts`**
- API client using Axios
- Features:
  - Request/response interceptors
  - Automatic token injection
  - Error handling
  - Type-safe methods
- Methods:
  - `login()`, `logout()`, `getCurrentUser()`
  - `getAgents()`, `getAgent()`, `executeAgent()`
  - `getTools()`, `installTool()`, `uninstallTool()`
  - `getProjectStats()`, `getUsageMetrics()`, `getActivities()`

**`lib/auth.ts`**
- NextAuth configuration
- Providers: Credentials, Google, GitHub
- Callbacks: JWT, session
- Pages: Custom sign-in page

**`lib/utils.ts`**
- Utility functions
- Includes: `cn()` (className merger), helpers

### Hooks (`hooks/`)

**`use-mobile.ts`**
- Detects mobile devices
- Returns: `isMobile` boolean

**`use-toast.ts`**
- Toast notification hook
- Features: Show, dismiss, queue management

### Types (`types/`)

**`next-auth.d.ts`**
- NextAuth type extensions
- Extends: User, Session types

### Configuration Files

**`package.json`**
- Dependencies and scripts
- Engines: Node >= 18.17.0, npm >= 9.0.0

**`tsconfig.json`**
- TypeScript configuration
- Path aliases: `@/*`, `@/components/*`, `@/lib/*`

**`tailwind.config.ts`**
- Tailwind CSS configuration
- Custom colors, fonts, animations

**`next.config.js`**
- Next.js configuration
- Headers, images, environment variables

**`eslint.config.cjs`**
- ESLint rules and configuration

**`jest.config.js`**
- Jest test configuration

## 🔄 Data Flow

### Authentication Flow

```
User → Login Page → NextAuth → API Client → bl1nk.site API
                                    ↓
                            Save token to localStorage
                                    ↓
                            Redirect to Dashboard
```

### API Request Flow

```
Component → API Client → Axios Interceptor → Add Token → bl1nk.site API
                                                              ↓
                                                    Response/Error
                                                              ↓
                                                    Update Component State
```

### Page Rendering Flow

```
Request → Next.js Router → Page Component → Fetch Data → Render UI
                                                              ↓
                                                    Client-side Hydration
```

## 🎨 Styling Architecture

### CSS Architecture

1. **Global Styles** (`app/globals.css`)
   - CSS variables (colors, spacing)
   - Base styles
   - Animations

2. **Tailwind CSS** (`tailwind.config.ts`)
   - Utility classes
   - Custom theme
   - Responsive breakpoints

3. **Component Styles**
   - Tailwind classes (preferred)
   - CSS modules (if needed)
   - Inline styles (rare)

### Theme System

- **Theme Provider**: `components/theme-provider.tsx`
- **Storage**: localStorage
- **Toggle**: `components/theme-toggle.tsx`
- **CSS Variables**: Defined in `globals.css`

## 🧪 Testing Structure

### Unit Tests (`__tests__/`)

- **Component tests**: `__tests__/components/`
- **Library tests**: `__tests__/lib/`
- **Test utilities**: Jest, React Testing Library

### E2E Tests (`tests/`)

- **E2E tests**: `tests/e2e-tests.spec.ts`
- **UI tests**: `tests/ui-tests.spec.ts`

## 📦 Build Output

### Development

```
.next/
├── cache/              # Next.js cache
├── server/             # Server-side code
└── static/             # Static assets
```

### Production

```
.next/
├── standalone/        # Standalone build
├── static/            # Static files
└── server/            # Server code
```

## 🔐 Environment Variables

### Required

- `NEXT_PUBLIC_API_BASE_URL` - API base URL
- `NEXTAUTH_SECRET` - NextAuth secret
- `NEXTAUTH_URL` - NextAuth URL
- `BLINK_API_KEY` - BLink API key
- `BLINK_CLIENT_ID` - BLink client ID
- `BLINK_CLIENT_SECRET` - BLink client secret

### Optional

- `GOOGLE_CLIENT_ID` - Google OAuth
- `GOOGLE_CLIENT_SECRET` - Google OAuth
- `GITHUB_CLIENT_ID` - GitHub OAuth
- `GITHUB_CLIENT_SECRET` - GitHub OAuth

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Shadcn UI Documentation](https://ui.shadcn.com/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

---

**Last Updated**: 2024-01-15

