import { Keyboard, BookOpen, Gauge, Hand, Volume2, WifiOff, School, Languages, type LucideIcon } from 'lucide-react'

const FEATURES: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: Keyboard,
    title: 'Official Remington Keyboard Layout without ISM',
    desc: 'Type Marathi using the same CDAC GIST-verified Remington layout used in government typing exams, no separate Marathi keyboard or ISM needed.'
  },
  {
    icon: BookOpen,
    title: '17+ Lesson Guided Tutor Mode',
    desc: 'A structured path from vowels and barakhadi to half-letters, conjuncts, rakar, reph, vakar, and exam-level words each lesson with real practice drills.'
  },
  {
    icon: Gauge,
    title: 'Real-Time Speed & Accuracy',
    desc: 'Live WPM and accuracy tracking on every drill, so students always know exactly where they stand before an exam.'
  },
  {
    icon: Hand,
    title: 'On-Screen Guided Keyboard',
    desc: 'A visual keyboard with finger-position colour hints and live Shift-state switching, beginners see exactly which key and which finger to use.'
  },
  {
    icon: Volume2,
    title: 'Keypress & Error Sound Feedback',
    desc: 'Optional audio cues on every keystroke and on mistakes, reinforcing muscle memory for new typists.'
  },
  {
    icon: WifiOff,
    title: 'Works Fully Offline',
    desc: 'Install once, activate with a license key, and practice without needing an internet connection.'
  },
  {
    icon: School,
    title: 'Built for Typing Institutes',
    desc: 'One license per machine, simple activation, and content designed around real exam syllabi ideal for institutes running batches of students.'
  },
  {
    icon: Languages,
    title: 'English + Marathi, One App',
    desc: 'Practice both English and Marathi typing in the same software, switching languages without losing your progress.'
  }
]

export function Features() {
  return (
    <section id="features" className="bg-background py-20 px-4">
      <div className="mx-auto max-w-[1280px]">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Everything you need to master Marathi & English typing</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            LiPi pairs the official Remington layout with a structured tutor, so students go from the basics to
            exam-ready speed without guesswork.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <div key={f.title} className="rounded-xl border border-border bg-white dark:bg-secondary p-6 shadow-sm transition-shadow hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent text-brand">
                <f.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
