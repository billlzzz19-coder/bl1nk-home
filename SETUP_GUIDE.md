# 🚀 BLinkOS Platform - Setup Guide

คู่มือติดตั้งและการใช้งานฉบับเต็ม สำหรับนักพัฒนาที่จะรัน Next.js project นี้

---

## ⚡ Quick Start (5 นาที)

```bash
# 1. ติดตั้ง dependencies
npm install

# 2. สร้างไฟล์ .env.local
cp .env.example .env.local

# 3. แก้ไข .env.local (ใส่ API keys ของคุณ)
# เปิดไฟล์ .env.local และกรอกข้อมูลที่จำเป็น

# 4. Generate secret key สำหรับ NextAuth
openssl rand -base64 32
# คัดลอกผลลัพธ์ใส่ใน NEXTAUTH_SECRET

# 5. Run development server
npm run dev

# 6. เปิดเบราว์เซอร์ไปที่ http://localhost:3000
```

---

## 📋 Detailed Steps

### Step 1: ติดตั้ง Node.js

ตรวจสอบเวอร์ชัน Node.js:
```bash
node --version  # ต้องเป็น v18.17.0 ขึ้นไป
npm --version   # ต้องเป็น v9.0.0 ขึ้นไป
```

ถ้ายังไม่มี ให้ดาวน์โหลดจาก: https://nodejs.org/

### Step 2: ติดตั้ง Dependencies

```bash
npm install

# หรือถ้าใช้ pnpm (เร็วกว่า)
pnpm install

# หรือถ้าใช้ yarn
yarn install
```

รอจนกว่า dependencies ทั้งหมดจะติดตั้งเสร็จ (ประมาณ 1-2 นาที)

### Step 3: ตั้งค่า Environment Variables

#### 3.1 สร้างไฟล์ .env.local

```bash
cp .env.example .env.local
```

#### 3.2 กรอกข้อมูลในไฟล์ .env.local

เปิดไฟล์ `.env.local` และกรอกข้อมูลดังนี้:

##### **ส่วน API Configuration** (บังคับ)

```env
NEXT_PUBLIC_API_BASE_URL=https://api.bl1nk.site/v1
NEXT_PUBLIC_API_TIMEOUT=30000
```

##### **ส่วน Authentication** (บังคับ)

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<paste_secret_here>
```

วิธีสร้าง `NEXTAUTH_SECRET`:
```bash
openssl rand -base64 32
```

คัดลอกผลลัพธ์ที่ได้แล้วใส่ลงในไฟล์

##### **ส่วน BLink API Keys** (บังคับ)

```env
BLINK_API_KEY=<your-api-key>
BLINK_CLIENT_ID=<your-client-id>
BLINK_CLIENT_SECRET=<your-client-secret>
```

**วิธีหา API Keys:**
1. ไปที่ https://bl1nk.site/dashboard
2. คลิก "Settings" → "API Keys"
3. สร้าง API Key ใหม่
4. คัดลอก API Key, Client ID, และ Client Secret มาใส่

##### **ส่วน OAuth Providers** (ไม่บังคับ - ถ้าต้องการ Google/GitHub login)

**Google OAuth:**
1. ไปที่ https://console.cloud.google.com/
2. สร้าง project ใหม่
3. ไปที่ "APIs & Services" → "Credentials"
4. สร้าง "OAuth 2.0 Client ID"
5. เพิ่ม Authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
6. คัดลอก Client ID และ Client Secret มาใส่:

```env
GOOGLE_CLIENT_ID=<your-google-client-id>
GOOGLE_CLIENT_SECRET=<your-google-client-secret>
```

**GitHub OAuth:**
1. ไปที่ https://github.com/settings/developers
2. คลิก "New OAuth App"
3. กรอก:
   - Application name: BLinkOS Platform
   - Homepage URL: http://localhost:3000
   - Authorization callback URL: http://localhost:3000/api/auth/callback/github
4. คัดลอก Client ID และ Client Secret มาใส่:

```env
GITHUB_CLIENT_ID=<your-github-client-id>
GITHUB_CLIENT_SECRET=<your-github-client-secret>
```

### Step 4: รัน Development Server

```bash
npm run dev
```

คุณจะเห็นข้อความ:
```
  ▲ Next.js 14.2.0
  - Local:        http://localhost:3000
  - Ready in 2.5s
```

### Step 5: ทดสอบในเบราว์เซอร์

1. เปิด http://localhost:3000
2. คุณจะเห็นหน้า Homepage
3. คลิก "เข้าสู่ระบบ" เพื่อทดสอบ login

---

## 🧪 การทดสอบ Features

### 1. ทดสอบ Homepage
- เปิด http://localhost:3000
- ตรวจสอบว่า animations ทำงาน
- ลอง scroll ดูทุก sections
- คลิกปุ่ม CTA ต่างๆ

### 2. ทดสอบ Login
- ไปที่ http://localhost:3000/login
- ลองใส่ email/password (ถ้า API พร้อม)
- ลอง login ด้วย Google (ถ้าตั้งค่า OAuth แล้ว)
- ลอง login ด้วย GitHub (ถ้าตั้งค่า OAuth แล้ว)

### 3. ทดสอบ Dashboard
- Login เข้าสู่ระบบ
- ไปที่ http://localhost:3000/dashboard
- ตรวจสอบว่า stats แสดงผลถูกต้อง
- ตรวจสอบ donut chart และ activity feed

### 4. ทดสอบ Marketplace
- ไปที่ http://localhost:3000/marketplace
- ทดสอบการค้นหา tools
- ลองคลิก "Install" บน tool card
- ตรวจสอบว่า installed tools แสดงใน sidebar

---

## 🔧 Customization

### เปลี่ยนสี Theme

แก้ไข `tailwind.config.ts`:
```typescript
colors: {
  primary: '#YOUR_COLOR',
  secondary: '#YOUR_COLOR',
  // ...
}
```

### เปลี่ยน Font

1. เปิด `app/globals.css`
2. เปลี่ยน Google Fonts URL:
```css
@import url('https://fonts.googleapis.com/css2?family=YourFont&display=swap');
```

3. อัปเดต `tailwind.config.ts`:
```typescript
fontFamily: {
  sans: ['YourFont', 'sans-serif'],
}
```

### เพิ่ม Agent ใหม่

แก้ไข `app/api/agents/route.ts`:
```typescript
const mockAgents = [
  // ... existing agents
  {
    id: 'new-agent-001',
    name: 'Your New Agent',
    role: 'Agent Role',
    description: 'Agent description',
    icon: '🤖',
    capabilities: ['Capability 1', 'Capability 2'],
    status: 'active',
    version: '1.0.0',
  },
]
```

---

## 🐛 Common Issues & Solutions

### Issue 1: "Module not found" errors

**Solution:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue 2: Port 3000 already in use

**Solution:**
```bash
# Option 1: ใช้ port อื่น
PORT=3001 npm run dev

# Option 2: Kill process ที่ใช้ port 3000
# macOS/Linux:
lsof -ti:3000 | xargs kill -9

# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Issue 3: Authentication not working

**Checklist:**
- [ ] ตรวจสอบ `NEXTAUTH_SECRET` มีค่าหรือไม่
- [ ] ตรวจสอบ `NEXTAUTH_URL` ถูกต้องหรือไม่ (http://localhost:3000)
- [ ] Clear cookies และ localStorage
- [ ] Restart development server

### Issue 4: API calls failing

**Checklist:**
- [ ] ตรวจสอบ `NEXT_PUBLIC_API_BASE_URL` ถูกต้องหรือไม่
- [ ] ตรวจสอบ `BLINK_API_KEY` ถูกต้องและ active
- [ ] เปิด Network tab ใน DevTools ดู error messages
- [ ] ตรวจสอบว่า bl1nk.site API online หรือไม่

---

## 📦 Building for Production

### Build Project

```bash
npm run build
```

ตรวจสอบว่า build สำเร็จไม่มี errors

### Test Production Build Locally

```bash
npm run build
npm start
```

เปิด http://localhost:3000 และทดสอบ

### Deploy to Vercel

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Login
vercel login

# 3. Deploy
vercel

# 4. Deploy to production
vercel --prod
```

### Environment Variables on Vercel

1. ไปที่ Vercel Dashboard
2. เลือก Project
3. ไปที่ "Settings" → "Environment Variables"
4. เพิ่ม variables ทั้งหมดจาก `.env.local`
5. กด "Save"
6. Redeploy project

---

## 📚 Next Steps

เมื่อ setup เสร็จแล้ว คุณสามารถ:

1. **เชื่อมต่อ API จริง**: แทนที่ mock data ใน `app/api/*` routes
2. **เพิ่ม Features**: สร้าง pages และ components ใหม่
3. **เพิ่ม Tests**: ใช้ Jest และ React Testing Library
4. **Optimize Performance**: ใช้ Next.js Image optimization, code splitting
5. **Add Analytics**: ติดตั้ง Google Analytics หรือ Mixpanel

---

## 🎓 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

---

## 💬 Need Help?

- สร้าง issue ใน repository
- Email: support@bl1nk.site
- Discord: (ถ้ามี community server)

---

**Happy Coding! 🚀**
