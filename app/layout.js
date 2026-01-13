import './globals.css'

export const metadata = {
  title: 'Nomi - AI-Powered Food Discovery',
  description: 'The AI that knows your taste. Track nutrition, rank restaurants, and get personalized recommendations.',
  keywords: 'diet app, restaurant ranking, AI food recommendations, calorie tracker, meal planning',
  openGraph: {
    title: 'Nomi - AI-Powered Food Discovery',
    description: 'The AI that knows your taste.',
    url: 'https://nomi.ai',
    siteName: 'Nomi',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nomi - AI-Powered Food Discovery',
    description: 'The AI that knows your taste.',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
