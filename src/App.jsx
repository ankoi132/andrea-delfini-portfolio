import Hero from './components/Hero.jsx'
import EngineeringSections from './components/EngineeringSections.jsx'
import ScanlineOverlay from './components/ScanlineOverlay.jsx'

export default function App() {
  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <ScanlineOverlay />
      <Hero />
      <EngineeringSections />
    </main>
  )
}
