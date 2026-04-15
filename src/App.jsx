import { ThemeProvider } from './ThemeContext'
import HeroSection from './HeroSection'
import FeaturesOrbit from './FeaturesOrbit'
import { useTheme } from './ThemeContext'

function AppContent() {
  const { theme } = useTheme()
  return (
    <main style={{ background: 'var(--bg)', margin: 0, padding: 0, overflowX: 'hidden' }}>
      <HeroSection />
      <FeaturesOrbit />
    </main>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}
