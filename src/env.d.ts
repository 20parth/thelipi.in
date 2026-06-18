/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface Window {
  clarity?: (...args: unknown[]) => void
}
