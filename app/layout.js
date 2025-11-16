import "./globals.css"

export const metadata = {
  title: "Markdown Editor",
  description: "A rich text markdown editor with live preview",
    generator: 'v0.app'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
