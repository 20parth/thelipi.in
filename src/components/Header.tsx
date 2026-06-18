import { useEffect, useState } from 'react'
import { Menu, X, Moon, Sun, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'

const NAV_LINKS = [
  { href: '#features', label: 'Features' },
  { href: '#screenshots', label: 'Screenshots' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#contact', label: 'Contact' }
]

export function Header() {
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
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-4 py-3">
        <a href="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="LiPi logo" width={32} height={32} className="rounded-md" />
          <span className="text-lg font-bold text-brand">LiPi</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-foreground/70 transition-colors hover:text-brand">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground/70 transition-colors hover:bg-accent"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <a
            href="#pricing"
            className="rounded-md bg-brand px-4 py-2 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
          >
            Get License
          </a>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground/70"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <button aria-label="Toggle menu" onClick={() => setMobileMenuOpen((v) => !v)}>
            {mobileMenuOpen ? <X className="h-6 w-6 text-foreground" /> : <Menu className="h-6 w-6 text-foreground" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ y: '-100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '-100%', opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex flex-col bg-background p-4 md:hidden"
          >
            <div className="flex items-center justify-between">
              <a href="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                <img src="/logo.png" alt="LiPi logo" width={32} height={32} className="rounded-md" />
                <span className="text-lg font-bold text-brand">LiPi</span>
              </a>
              <button aria-label="Close menu" onClick={() => setMobileMenuOpen(false)}>
                <X className="h-6 w-6 text-foreground" />
              </button>
            </div>

            <div className="mt-10 flex flex-col space-y-6">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between border-b border-border pb-3 text-lg font-medium text-foreground"
                >
                  <span>{l.label}</span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </a>
              ))}
              <a
                href="#pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-4 h-12 rounded-full bg-brand px-8 text-center text-base font-medium leading-[3rem] text-white"
              >
                Get License
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
