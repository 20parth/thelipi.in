import { useEffect, useState } from 'react'
import { ArrowRight, Menu, X, Moon, Sun } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'

const NAV_LINKS = [
  { href: '#features', label: 'Features' },
  { href: '#screenshots', label: 'Screenshots' },
  { href: '#download', label: 'Download' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#contact', label: 'Contact' }
]

export const DOWNLOAD_URL = 'https://thelipi.in/relese/LiPi-Setup-1.0.0.exe'

export function Hero() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'))
  }, [])

  function toggleTheme() {
    const next = !isDark
    setIsDark(next)
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('theme', next ? 'dark' : 'light')
  }

  return (
    <>
      {/* Navigation lives OUTSIDE the overflow-hidden hero wrapper below — `sticky` only works
          up to the nearest ancestor with overflow:hidden, so nesting it inside that wrapper would
          make it stop sticking the moment the user scrolls past the hero's own height. */}
      <nav className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <a href="/" className="flex items-center">
            <img src="/logo.png" alt="LiPi logo" className="h-12 w-12 rounded-full" />
            <span className="ml-2 text-xl font-bold text-foreground">LiPi</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-6">
              {NAV_LINKS.map((l) => (
                <a key={l.href} href={l.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  {l.label}
                </a>
              ))}
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={toggleTheme}
                aria-label="Toggle dark mode"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground/70 transition-colors hover:bg-accent"
              >
                {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
              <a
                href={DOWNLOAD_URL}
                download
                className="flex h-12 items-center rounded-full bg-foreground px-8 text-base font-medium text-background hover:opacity-90"
              >
                Download
              </a>
            </div>
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground/70"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Toggle menu</span>
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-foreground" />
              ) : (
                <Menu className="h-6 w-6 text-foreground" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Menu with animation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex flex-col p-4 bg-background/95 md:hidden"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img src="/logo.png" alt="LiPi logo" className="h-12 w-12 rounded-full" />
                <span className="ml-2 text-xl font-bold text-foreground">LiPi</span>
              </div>
              <button onClick={() => setMobileMenuOpen(false)}>
                <X className="h-6 w-6 text-foreground" />
              </button>
            </div>
            <div className="mt-8 flex flex-col space-y-6">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between border-b border-border pb-2 text-lg text-foreground"
                >
                  <span>{l.label}</span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </a>
              ))}
              <a
                href={DOWNLOAD_URL}
                download
                onClick={() => setMobileMenuOpen(false)}
                className="flex h-12 items-center justify-center rounded-full bg-foreground px-8 text-base font-medium text-background"
              >
                Download
              </a>
              <a
                href="#pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="flex h-12 items-center justify-center rounded-full border border-border px-8 text-base font-medium text-foreground"
              >
                Get License
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Depth grid */}
      <div className="bg-grid pointer-events-none absolute inset-0 z-0" />

      {/* Gradient background with grain effect — light: violet/purple, dark: full aurora.
          Radial gradients fade to transparent by design, so there's never a hard edge no
          matter how narrow the viewport is or how much blur lands on screen (a fixed blur
          radius isn't enough to soften a 60-90rem-wide solid-colour shape on its own). */}
      <div className="pointer-events-none absolute -right-60 -top-10 z-0 flex flex-col items-end dark:hidden" aria-hidden>
        <div className="h-[10rem] w-[60rem] rounded-full opacity-50 animate-aurora [animation-delay:-2s]" style={{ background: 'radial-gradient(ellipse closest-side, #a78bfa, #d8b4fe 55%, transparent 80%)' }} />
        <div className="h-[10rem] w-[80rem] rounded-full opacity-40 animate-aurora [animation-delay:-8s]" style={{ background: 'radial-gradient(ellipse closest-side, #f0abfc, #a5b4fc 55%, transparent 80%)' }} />
        <div className="h-[10rem] w-[60rem] rounded-full opacity-40 animate-aurora [animation-delay:-12s]" style={{ background: 'radial-gradient(ellipse closest-side, #d8b4fe, #a78bfa 55%, transparent 80%)' }} />
      </div>
      <div className="pointer-events-none absolute -right-60 -top-10 z-0 hidden flex-col items-end dark:flex" aria-hidden>
        <div className="h-[10rem] w-[60rem] rounded-full animate-aurora [animation-delay:-2s]" style={{ background: 'radial-gradient(ellipse closest-side, #9333ea, #0284c7 55%, transparent 80%)' }} />
        <div className="h-[10rem] w-[90rem] rounded-full animate-aurora [animation-delay:-8s]" style={{ background: 'radial-gradient(ellipse closest-side, #831843, #facc15 55%, transparent 80%)' }} />
        <div className="h-[10rem] w-[60rem] rounded-full animate-aurora [animation-delay:-12s]" style={{ background: 'radial-gradient(ellipse closest-side, #ca8a04, #0ea5e9 55%, transparent 80%)' }} />
      </div>
      <div className="bg-noise pointer-events-none absolute inset-0 z-0 hidden opacity-30 dark:block" />

      {/* Content container */}
      <div className="relative z-10">
        {/* Badge */}
        <div className="mx-auto mt-12 flex max-w-fit items-center justify-center space-x-2 rounded-full bg-accent px-4 py-2 backdrop-blur-sm">
          <span className="text-sm font-medium text-foreground">Marathi/English Tutor Mode</span>
          <ArrowRight className="h-4 w-4 text-foreground" />
        </div>

        {/* Hero section */}
        <div className="container mx-auto mt-12 px-4 text-center">
          <h1 className="mx-auto max-w-4xl text-5xl font-bold leading-tight text-foreground md:text-6xl lg:text-7xl">
            Master Marathi &amp; English Typing, the Right Way
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            LiPi teaches the official Remington keyboard layout through a structured, step-by-step Tutor
            Mode — built for students and typing institutes preparing for government exams.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <a
              href={DOWNLOAD_URL}
              download
              className="flex h-12 items-center rounded-full bg-foreground px-8 text-base font-medium text-background hover:opacity-90"
            >
              Download for Windows
            </a>
            <a href="#pricing" className="flex h-12 items-center rounded-full border border-border px-8 text-base font-medium text-foreground hover:bg-accent">
              See Pricing
            </a>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">Currently available for Windows · macOS coming soon</p>

          <div className="relative mx-auto my-20 w-full max-w-6xl">
            <div className="absolute inset-0 rounded shadow-lg bg-foreground/20 blur-[10rem]" />

            {/* Hero Image */}
            <img
              src="/screenshots/hero-mockup.png"
              alt="LiPi typing tutor app — placeholder screenshot"
              width={1248}
              height={765}
              className="relative h-auto w-full rounded shadow-md"
            />
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
