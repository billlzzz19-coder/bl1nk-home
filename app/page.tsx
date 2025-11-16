import Link from 'next/link'

export default function HomePage() {
  const agents = [
    { icon: '🧠', name: 'AI Auto-Optimizer', desc: 'Optimizes your code automatically' },
    { icon: '📱', name: 'UI Builder Pro', desc: 'Creates beautiful interfaces' },
    { icon: '⚙️', name: 'Backend Flow Agent', desc: 'Manages server logic' },
  ]

  const problems = [
    { icon: '🚫', title: 'พฤติกรรมแบบกล่องดำ', desc: 'ไม่รู้ว่า AI ทำอะไรอยู่' },
    { icon: '🤖', title: 'คำตอบทั่วไป', desc: 'ไม่เฉพาะเจาะจงกับงาน' },
    { icon: '🔍', title: 'ไม่มีการอ้างอิงแหล่งที่มา', desc: 'ไม่แน่ใจว่าข้อมูลมาจากไหน' },
  ]

  const teamAgents = [
    { icon: '🏗️', name: 'Systems Architect', desc: 'ออกแบบระบบ' },
    { icon: '💻', name: 'Code Specialist', desc: 'เขียนโค้ดคุณภาพสูง' },
    { icon: '🎨', name: 'Design Agent', desc: 'สร้าง UI/UX' },
    { icon: '📊', name: 'Data Analyst', desc: 'วิเคราะห์ข้อมูล' },
    { icon: '🔧', name: 'Infrastructure', desc: 'จัดการเซิร์ฟเวอร์' },
    { icon: '🧪', name: 'QA Specialist', desc: 'ทดสอบระบบ' },
  ]

  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container-custom text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">
            ทีม AI ของคุณ — โปร่งใสทุกขั้นตอน
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            AI Agent 10 ตัวทำงานให้คุณ — แต่คุณควบคุมทุกอย่างเสมอ
          </p>

          <div className="flex gap-4 justify-center mb-16">
            <Link href="/login" className="btn btn-primary text-lg px-8">
              เริ่มทดลองฟรี
            </Link>
            <button className="btn btn-secondary text-lg px-8">
              ดูวิดีโอ 2 นาที
            </button>
          </div>

          {/* Demo Box */}
          <div className="glass rounded-3xl p-8 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {agents.map((agent, idx) => (
                <div key={idx} className="card text-center">
                  <div className="text-5xl mb-3">{agent.icon}</div>
                  <h3 className="font-semibold mb-2">{agent.name}</h3>
                  <p className="text-sm text-gray-400">{agent.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 bg-black/20">
        <div className="container-custom text-center">
          <p className="text-gray-400 text-lg mb-8">
            ได้รับความไว้วางใจจากนักพัฒนา 5,000+ คนทั่วโลก
          </p>
          <div className="glass rounded-2xl p-8 max-w-2xl mx-auto">
            <div className="text-yellow-400 text-2xl mb-3">★★★★★</div>
            <p className="text-lg mb-3">
              "เครื่องมือ AI เดียวที่ฉันไว้ใจให้จัดการโค้ด production"
            </p>
            <p className="text-primary font-semibold">@dev_username</p>
          </div>
        </div>
      </section>

      {/* Problems */}
      <section className="py-20">
        <div className="container-custom">
          <h2 className="section-title">ทำไมเครื่องมือ AI ทั่วไปถึงไม่เพียงพอ</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {problems.map((problem, idx) => (
              <div key={idx} className="card text-center hover:scale-105 transition-transform">
                <div className="text-5xl mb-4">{problem.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{problem.title}</h3>
                <p className="text-gray-400 text-sm">{problem.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-black/20">
        <div className="container-custom">
          <h2 className="section-title">ทำงานอย่างไร</h2>
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            {[
              'คุณอัปโหลดเอกสาร',
              'AI วิเคราะห์ (พร้อมอ้างอิง)',
              'คุณตรวจสอบ',
              'อนุมัติการดำเนินการ',
            ].map((step, idx) => (
              <div key={idx} className="flex flex-col items-center max-w-xs">
                <div className="w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-2xl font-bold mb-3">
                  {idx + 1}
                </div>
                <p className="text-center">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Team */}
      <section className="py-20">
        <div className="container-custom">
          <h2 className="section-title">พบกับทีม AI ของคุณ</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {teamAgents.map((agent, idx) => (
              <div key={idx} className="card text-center hover:scale-105 transition-transform">
                <div className="text-4xl mb-3">{agent.icon}</div>
                <h3 className="font-semibold text-sm mb-1">{agent.name}</h3>
                <p className="text-xs text-gray-400">{agent.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-black/20">
        <div className="container-custom">
          <h2 className="section-title">Pricing</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free */}
            <div className="card">
              <h3 className="text-2xl font-bold mb-2">ฟรี</h3>
              <p className="text-gray-400 mb-4">สำหรับบุคคลทั่วไป</p>
              <div className="text-4xl font-bold gradient-text mb-6">$0</div>
              <button className="btn btn-secondary w-full mb-6">เริ่มทดลองฟรี</button>
              <ul className="text-sm text-gray-400 space-y-2">
                <li>✓ 100 messages/เดือน</li>
                <li>✓ 2-3 Basic Agents</li>
                <li>✓ Local knowledge base</li>
              </ul>
            </div>

            {/* Pro */}
            <div className="card border-2 border-primary relative scale-105">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-secondary px-4 py-1 rounded-full text-sm font-bold">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold mb-2">โปร</h3>
              <p className="text-gray-400 mb-4">สำหรับมืออาชีพ</p>
              <div className="text-4xl font-bold gradient-text mb-6">
                $29<span className="text-base text-gray-400">/เดือน</span>
              </div>
              <button className="btn btn-primary w-full mb-6">เริ่มทดลองฟรี</button>
              <ul className="text-sm text-gray-400 space-y-2">
                <li>✓ Unlimited messages</li>
                <li>✓ 10 Specialized Agents</li>
                <li>✓ Team collaboration</li>
                <li>✓ Priority support</li>
              </ul>
            </div>

            {/* Enterprise */}
            <div className="card">
              <h3 className="text-2xl font-bold mb-2">องค์กร</h3>
              <p className="text-gray-400 mb-4">สำหรับองค์กร</p>
              <div className="text-4xl font-bold gradient-text mb-6">ตามตกลง</div>
              <button className="btn btn-secondary w-full mb-6">ติดต่อเรา</button>
              <ul className="text-sm text-gray-400 space-y-2">
                <li>✓ Self-hosted</li>
                <li>✓ Custom agents</li>
                <li>✓ Dedicated support</li>
                <li>✓ API access</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-bold mb-6">
            Join 5,000+ Developers Building with Confidence
          </h2>
          <Link href="/login" className="btn btn-primary text-lg px-10 mb-4 inline-block">
            เริ่มทดลองฟรี
          </Link>
          <p className="text-gray-400 mb-8">✓ No credit card • ✓ 14-day trial</p>
          <div className="flex justify-center gap-8 flex-wrap text-sm text-gray-500">
            <span>🔒 SOC 2 Compliant</span>
            <span>🌍 GDPR Ready</span>
            <span>⚡ Enterprise Grade</span>
          </div>
        </div>
      </section>
    </div>
  )
}
