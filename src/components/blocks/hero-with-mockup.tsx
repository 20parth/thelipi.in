import type React from 'react'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Mockup } from '@/components/ui/mockup'
import { Glow } from '@/components/ui/glow'

interface HeroWithMockupProps {
  title: string
  description: string
  badge?: string
  primaryCta?: {
    text: string
    href: string
  }
  secondaryCta?: {
    text: string
    href: string
    icon?: React.ReactNode
  }
  mockupImage: {
    src: string
    alt: string
    width: number
    height: number
  }
  className?: string
}

export function HeroWithMockup({
  title,
  description,
  badge = '17-Lesson Marathi Tutor Mode',
  primaryCta = { text: 'See Pricing', href: '#pricing' },
  secondaryCta = { text: 'View Screenshots', href: '#screenshots' },
  mockupImage,
  className
}: HeroWithMockupProps) {
  return (
    <section
      className={cn(
        'relative bg-background text-foreground',
        'py-12 px-4 md:py-24 lg:py-32',
        'overflow-hidden',
        className
      )}
    >
      {/* Dark-mode-only gradient blobs + grain, adapted from the Hero2 reference design */}
      <div className="absolute -right-60 -top-10 z-0 hidden flex-col items-end blur-xl dark:flex">
        <div className="z-1 h-[10rem] w-[60rem] rounded-full bg-gradient-to-b from-purple-600 to-sky-600 blur-[6rem]" />
        <div className="z-1 h-[10rem] w-[90rem] rounded-full bg-gradient-to-b from-pink-900 to-yellow-400 blur-[6rem]" />
        <div className="z-1 h-[10rem] w-[60rem] rounded-full bg-gradient-to-b from-yellow-600 to-sky-500 blur-[6rem]" />
      </div>
      <div className="bg-noise absolute inset-0 z-0 hidden opacity-30 dark:block" />

      <div className="relative mx-auto max-w-[1280px] flex flex-col gap-12 lg:gap-24">
        <div className="relative z-10 flex flex-col items-center gap-6 pt-8 md:pt-16 text-center lg:gap-12">
          {badge && (
            <div className="mx-auto flex max-w-fit items-center justify-center space-x-2 rounded-full bg-accent px-4 py-2 backdrop-blur-sm animate-appear opacity-0 dark:bg-white/10">
              <span className="text-sm font-medium text-foreground dark:text-white">{badge}</span>
              <ArrowRight className="h-4 w-4 text-foreground dark:text-white" />
            </div>
          )}

          <h1
            className={cn(
              'inline-block animate-appear',
              'bg-gradient-to-b from-foreground via-foreground/90 to-muted-foreground',
              'bg-clip-text text-transparent',
              'text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl',
              'leading-[1.1] sm:leading-[1.1]'
            )}
          >
            {title}
          </h1>

          <p
            className={cn(
              'max-w-[600px] animate-appear opacity-0 [animation-delay:150ms]',
              'text-base sm:text-lg md:text-xl',
              'text-muted-foreground',
              'font-medium'
            )}
          >
            {description}
          </p>

          <div className="relative z-10 flex flex-wrap justify-center gap-4 animate-appear opacity-0 [animation-delay:300ms]">
            <Button
              asChild
              size="lg"
              className={cn(
                'bg-gradient-to-b from-brand to-brand/90',
                'hover:from-brand/95 hover:to-brand/85',
                'text-white shadow-lg',
                'transition-all duration-300'
              )}
            >
              <a href={primaryCta.href}>{primaryCta.text}</a>
            </Button>

            <Button asChild size="lg" variant="ghost" className="text-foreground/80 transition-all duration-300">
              <a href={secondaryCta.href}>
                {secondaryCta.icon}
                {secondaryCta.text}
              </a>
            </Button>
          </div>

          <div className="relative w-full pt-12 px-4 sm:px-6 lg:px-8">
            <Mockup
              className={cn(
                'animate-appear opacity-0 [animation-delay:700ms]',
                'shadow-[0_0_50px_-12px_rgba(0,0,0,0.3)]',
                'border-brand/10'
              )}
            >
              <img
                src={mockupImage.src}
                alt={mockupImage.alt}
                width={mockupImage.width}
                height={mockupImage.height}
                className="w-full h-auto"
                loading="lazy"
                decoding="async"
              />
            </Mockup>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Glow variant="above" className="animate-appear-zoom opacity-0 [animation-delay:1000ms]" />
      </div>
    </section>
  )
}
