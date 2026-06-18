import { useEffect, useState } from 'react'

type Hand = 'left' | 'right'
type Finger = 0 | 1 | 2 | 3 | 4
interface FingerInfo { hand: Hand; finger: Finger }

// Ported from lipi-typing-software/src/components/TutorView.tsx so the website
// demo uses the exact same finger/colour mapping as the real desktop app.
const KEY_FINGER: Record<string, FingerInfo> = {
  '`': { hand: 'left', finger: 4 }, '1': { hand: 'left', finger: 4 },
  q: { hand: 'left', finger: 4 }, a: { hand: 'left', finger: 4 }, z: { hand: 'left', finger: 4 },
  '2': { hand: 'left', finger: 3 }, w: { hand: 'left', finger: 3 },
  s: { hand: 'left', finger: 3 }, x: { hand: 'left', finger: 3 },
  '3': { hand: 'left', finger: 2 }, e: { hand: 'left', finger: 2 },
  d: { hand: 'left', finger: 2 }, c: { hand: 'left', finger: 2 },
  '4': { hand: 'left', finger: 1 }, '5': { hand: 'left', finger: 1 },
  r: { hand: 'left', finger: 1 }, t: { hand: 'left', finger: 1 },
  f: { hand: 'left', finger: 1 }, g: { hand: 'left', finger: 1 },
  v: { hand: 'left', finger: 1 }, b: { hand: 'left', finger: 1 },
  ' ': { hand: 'left', finger: 0 },
  '6': { hand: 'right', finger: 1 }, '7': { hand: 'right', finger: 1 },
  y: { hand: 'right', finger: 1 }, u: { hand: 'right', finger: 1 },
  h: { hand: 'right', finger: 1 }, j: { hand: 'right', finger: 1 },
  n: { hand: 'right', finger: 1 }, m: { hand: 'right', finger: 1 },
  '8': { hand: 'right', finger: 2 }, i: { hand: 'right', finger: 2 },
  k: { hand: 'right', finger: 2 }, ',': { hand: 'right', finger: 2 },
  '9': { hand: 'right', finger: 3 }, o: { hand: 'right', finger: 3 },
  l: { hand: 'right', finger: 3 }, '.': { hand: 'right', finger: 3 },
  '0': { hand: 'right', finger: 4 }, '-': { hand: 'right', finger: 4 },
  '=': { hand: 'right', finger: 4 }, p: { hand: 'right', finger: 4 },
  '[': { hand: 'right', finger: 4 }, ']': { hand: 'right', finger: 4 },
  '\\': { hand: 'right', finger: 4 }, ';': { hand: 'right', finger: 4 },
  "'": { hand: 'right', finger: 4 }, '/': { hand: 'right', finger: 4 }
}

const FINGER_COLOR: Record<Finger, string> = { 4: '#9333ea', 3: '#3b82f6', 2: '#10b981', 1: '#f59e0b', 0: '#6b7280' }
const FINGER_NAME: Record<Finger, string> = { 4: 'Pinky', 3: 'Ring', 2: 'Middle', 1: 'Index', 0: 'Thumb' }

const KB_ROWS: { key: string; label: string; flex?: number }[][] = [
  [
    { key: '`', label: '`' }, { key: '1', label: '1' }, { key: '2', label: '2' },
    { key: '3', label: '3' }, { key: '4', label: '4' }, { key: '5', label: '5' },
    { key: '6', label: '6' }, { key: '7', label: '7' }, { key: '8', label: '8' },
    { key: '9', label: '9' }, { key: '0', label: '0' }, { key: '-', label: '-' },
    { key: '=', label: '=' }, { key: 'Backspace', label: '⌫', flex: 1.6 }
  ],
  [
    { key: 'Tab', label: 'Tab', flex: 1.5 },
    { key: 'q', label: 'Q' }, { key: 'w', label: 'W' }, { key: 'e', label: 'E' },
    { key: 'r', label: 'R' }, { key: 't', label: 'T' }, { key: 'y', label: 'Y' },
    { key: 'u', label: 'U' }, { key: 'i', label: 'I' }, { key: 'o', label: 'O' },
    { key: 'p', label: 'P' }, { key: '[', label: '[' }, { key: ']', label: ']' },
    { key: '\\', label: '\\', flex: 1.5 }
  ],
  [
    { key: 'CapsLock', label: 'Caps', flex: 1.75 },
    { key: 'a', label: 'A' }, { key: 's', label: 'S' }, { key: 'd', label: 'D' },
    { key: 'f', label: 'F' }, { key: 'g', label: 'G' }, { key: 'h', label: 'H' },
    { key: 'j', label: 'J' }, { key: 'k', label: 'K' }, { key: 'l', label: 'L' },
    { key: ';', label: ';' }, { key: "'", label: "'" },
    { key: 'Enter', label: 'Enter', flex: 2.25 }
  ],
  [
    { key: 'ShiftL', label: '⇧ Shift', flex: 2.35 },
    { key: 'z', label: 'Z' }, { key: 'x', label: 'X' }, { key: 'c', label: 'C' },
    { key: 'v', label: 'V' }, { key: 'b', label: 'B' }, { key: 'n', label: 'N' },
    { key: 'm', label: 'M' }, { key: ',', label: ',' }, { key: '.', label: '.' },
    { key: '/', label: '/' },
    { key: 'ShiftR', label: 'Shift ⇧', flex: 2.95 }
  ],
  [
    { key: 'Ctrl', label: 'Ctrl', flex: 1.3 }, { key: 'Alt', label: 'Alt', flex: 1.1 },
    { key: ' ', label: 'Space', flex: 6.2 },
    { key: 'AltR', label: 'Alt', flex: 1.1 }, { key: 'CtrlR', label: 'Ctrl', flex: 1.3 }
  ]
]

const NON_TYPE = new Set(['Backspace', 'Tab', 'CapsLock', 'Enter', 'ShiftL', 'ShiftR', 'Ctrl', 'Alt', 'AltR', 'CtrlR'])

function hexToRgba(hex: string, a: number) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r},${g},${b},${a})`
}

// Hand SVG — ported as-is from TutorView.tsx (same gradients/paths as the desktop app).
function HandSVG({ hand, activeFinger }: { hand: Hand; activeFinger: Finger | null }) {
  const p = hand === 'right' ? 'r' : 'l'
  const gx = hand === 'right' ? 'matrix(-1 0 0 1 80 0)' : undefined

  const TIPS: Record<Finger, { cx: number; cy: number; r: number }> = {
    0: { cx: 60, cy: 35, r: 4 },
    1: { cx: 50, cy: 12, r: 3.5 },
    2: { cx: 35, cy: 7, r: 3.5 },
    3: { cx: 22, cy: 12, r: 3.5 },
    4: { cx: 10, cy: 27, r: 3 }
  }

  return (
    <svg viewBox="0 0 80 80" className="h-full w-full" style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id={`${p}g0`} x1="22.9064" y1="80.5292" x2="40.877" y2="48.9656" gradientUnits="userSpaceOnUse"><stop offset="0.00132565" stopColor="#F0C492" /><stop offset="1" stopColor="#F8DBBA" /></linearGradient>
        <linearGradient id={`${p}g1`} x1="-3.20876" y1="65.6606" x2="14.7622" y2="34.0969" gradientUnits="userSpaceOnUse"><stop offset="0.00132565" stopColor="#F0C492" /><stop offset="1" stopColor="#F8DBBA" /></linearGradient>
        <linearGradient id={`${p}g2`} x1="2.13218" y1="68.7004" x2="20.1026" y2="37.1371" gradientUnits="userSpaceOnUse"><stop offset="0.00132565" stopColor="#F0C492" /><stop offset="1" stopColor="#F8DBBA" /></linearGradient>
        <linearGradient id={`${p}g3`} x1="18.4089" y1="77.9674" x2="36.3794" y2="46.4043" gradientUnits="userSpaceOnUse"><stop offset="0.00132565" stopColor="#F0C492" /><stop offset="1" stopColor="#F8DBBA" /></linearGradient>
        <linearGradient id={`${p}g4`} x1="7.36703" y1="71.6809" x2="25.3374" y2="40.1175" gradientUnits="userSpaceOnUse"><stop offset="0.00132565" stopColor="#F0C492" /><stop offset="1" stopColor="#F8DBBA" /></linearGradient>
        <linearGradient id={`${p}g5`} x1="39.5611" y1="22.8453" x2="30.8624" y2="23.0758" gradientUnits="userSpaceOnUse"><stop offset="0.00132565" stopColor="#F0C492" /><stop offset="1" stopColor="#F8DBBA" /></linearGradient>
        <linearGradient id={`${p}g6`} x1="38.2239" y1="39.6901" x2="16.669" y2="37.9474" gradientUnits="userSpaceOnUse"><stop stopColor="#FFBC47" stopOpacity="0" /><stop offset="1" stopColor="#FFA754" /></linearGradient>
        <linearGradient id={`${p}g7`} x1="64.5697" y1="33.92" x2="46.9465" y2="68.1314" gradientUnits="userSpaceOnUse"><stop offset="0.00132565" stopColor="#F0C492" /><stop offset="1" stopColor="#F8DBBA" /></linearGradient>
        <linearGradient id={`${p}g8`} x1="48.8333" y1="25.5747" x2="28.7894" y2="22.1189" gradientUnits="userSpaceOnUse"><stop stopColor="#FFBC47" stopOpacity="0" /><stop offset="1" stopColor="#E68E43" /></linearGradient>
        <linearGradient id={`${p}g9`} x1="37.8726" y1="23.6161" x2="25.7166" y2="23.6161" gradientUnits="userSpaceOnUse"><stop offset="0.00132565" stopColor="#F0C492" /><stop offset="1" stopColor="#F8DBBA" /></linearGradient>
        <linearGradient id={`${p}g10`} x1="30.0171" y1="28.2887" x2="6.17213" y2="29.8438" gradientUnits="userSpaceOnUse"><stop offset="0.00132565" stopColor="#F0C492" /><stop offset="1" stopColor="#F8DBBA" /></linearGradient>
        <linearGradient id={`${p}g11`} x1="20.0133" y1="35.122" x2="10.6826" y2="37.9731" gradientUnits="userSpaceOnUse"><stop stopColor="#FFBC47" stopOpacity="0" /><stop offset="1" stopColor="#E68E43" /></linearGradient>
        <linearGradient id={`${p}g12`} x1="31.1296" y1="25.9745" x2="9.18496" y2="29.3439" gradientUnits="userSpaceOnUse"><stop stopColor="#FFBC47" stopOpacity="0" /><stop offset="1" stopColor="#E68E43" /></linearGradient>
        <linearGradient id={`${p}g13`} x1="42.911" y1="22.9752" x2="26.4953" y2="23.7528" gradientUnits="userSpaceOnUse"><stop stopColor="#FFBC47" stopOpacity="0" /><stop offset="1" stopColor="#E68E43" /></linearGradient>
        <linearGradient id={`${p}g14`} x1="58.1749" y1="30.5925" x2="43.8334" y2="27.6552" gradientUnits="userSpaceOnUse"><stop offset="0.00132565" stopColor="#F0C492" /><stop offset="1" stopColor="#F8DBBA" /></linearGradient>
        <radialGradient id={`${p}g15`} cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(38.8841 51.1424) rotate(87.0101) scale(62.3441 54.2034)">
          <stop offset="0.4114" stopColor="#F0C492" stopOpacity="0" />
          <stop offset="1" stopColor="#E6AF74" />
        </radialGradient>
        <clipPath id={`${p}clip`}>
          <rect width="61.8187" height="68" fill="white" transform="translate(9 6)" />
        </clipPath>
      </defs>

      <g transform={gx}>
        <g clipPath={`url(#${p}clip)`}>
          <path d="M42.3996 34.6294C42.2432 36.042 41.0828 37.7927 40.5722 37.8304C40.0616 37.8681 39.6443 36.6385 39.5553 35.4318C39.4662 34.2251 31.9868 39.7691 31.5367 39.9891C31.1986 40.1542 27.4301 40.323 24.8967 41.6799C24.0523 42.1318 22.5649 44.2708 22.3467 44.3048C21.4726 44.4408 20.5546 43.0678 19.7509 40.9288C18.9473 38.7898 12.7042 45.5405 13.3378 48.6507C14.1872 52.8198 16.1889 66.1895 21.2278 69.8708C29.8379 76.1616 44.0446 74.8659 49.3771 68.6858C54.7096 62.5057 54.9198 58.5987 59.5086 53.5183C63.3927 49.2188 68.3883 49.8778 70.2806 47.6851C71.8718 45.841 69.5177 43.0276 68.6207 42.253C67.0258 40.8769 61.1765 39.3938 56.532 44.7764C54.7257 46.8697 52.4934 48.2476 50.3507 46.398C48.2081 44.5483 48.744 40.31 49.7474 36.8741" fill={`url(#${p}g0)`} />
          <path d="M19.7509 40.928C18.9473 38.789 17.3876 33.0842 16.0467 29.9901C14.7059 26.8961 12.6578 25.8408 10.1739 27.1551C7.69006 28.4694 9.85186 34.2322 10.2895 35.656C10.9597 37.8357 12.5026 45.3388 13.3378 48.6506" fill={`url(#${p}g1)`} />
          <path d="M31.5366 39.9885C31.086 40.2086 29.5745 39.0538 29.1319 35.1332C28.7937 32.1381 28.1508 23.7592 27.2563 19.5178C26.3618 15.2764 25.0413 12.8432 22.4474 12.8228C19.8535 12.8024 18.9578 16.056 19.3046 19.5759C19.733 23.9255 20.4773 28.5885 21.1882 33.0611C21.7439 36.5569 23.2202 44.168 22.3467 44.304" fill={`url(#${p}g2)`} />
          <path d="M49.7464 36.8742C50.7497 33.4384 52.8565 21.116 53.6619 17.8545C54.468 14.5929 52.7674 12.6703 50.6527 12.1678C48.5385 11.6652 46.3162 12.9281 44.9846 19.4451C44.1445 23.5566 43.2253 27.1736 42.3994 34.629L46.5863 38.748L49.7464 36.8742Z" fill={`url(#${p}g3)`} />
          <path d="M39.5551 35.4312C39.466 34.2245 39.5965 22.4876 39.5563 19.9128C39.4815 15.0879 41.4461 6.58901 35.5239 6.02151C32.41 5.72293 31.7473 8.60986 31.6076 9.88024C31.4679 11.1506 31.4988 25.5235 31.5947 26.8229C31.6905 28.123 31.9872 39.7684 31.5365 39.9884" fill={`url(#${p}g4)`} />
          <path d="M31.5939 26.8226C31.6897 28.1227 31.9865 39.7681 31.5358 39.9882C35.4978 39.1029 34.6532 25.7235 34.3756 19.0934C34.1344 13.3443 36.0252 10.1217 34.4621 6.05029C32.2517 6.42306 31.7293 8.76908 31.6075 9.87996C31.4677 11.1503 31.4987 25.5226 31.5939 26.8226Z" fill={`url(#${p}g5)`} />
          <path d="M31.2772 40.0189C30.9582 39.9664 30.236 39.0409 29.8311 38.1191C30.0413 38.9247 30.6639 40.0233 31.2772 40.0189Z" fill={`url(#${p}g6)`} />
          <path d="M68.4001 43.3669C70.157 44.406 70.2769 44.8121 70.2442 44.3003C69.7416 43.3842 69.0294 42.6059 68.6202 42.253C67.0253 40.877 61.1761 39.394 56.5317 44.7762C54.7254 46.8693 52.4931 48.2471 50.3505 46.3976C49.5061 45.6689 49.0177 44.4486 48.7673 43.0219C48.7667 43.0219 48.7661 43.0219 48.7661 43.0226C48.9336 50.4348 55.2712 49.0569 58.0419 46.7531C60.8126 44.4492 63.2414 40.3169 68.4001 43.3669Z" fill={`url(#${p}g7)`} />
          <path d="M49.8473 12.0698C47.9909 12.0698 46.1481 13.7538 44.9846 19.446C44.1445 23.5576 43.2253 27.1746 42.3994 34.6299C42.243 36.0425 41.0826 37.7932 40.572 37.8309C40.6196 37.7895 40.8774 38.0157 41.3979 37.5385C45.6498 33.6408 44.9611 24.4403 46.4331 19.6179C47.6113 15.7548 48.852 14.0938 49.8473 12.0698Z" fill={`url(#${p}g8)`} />
          <path d="M31.5942 26.8232C31.69 28.1232 31.9868 39.7688 31.5361 39.9889C33.651 40.183 34.0133 37.9606 33.7364 34.1927C33.1682 26.4708 32.2038 15.9225 33.8421 9.33378C33.9966 8.71126 33.8674 8.03989 33.439 7.56203C32.3262 6.32007 31.7148 8.90784 31.6072 9.87965C31.4681 11.1507 31.499 25.5231 31.5942 26.8232Z" fill={`url(#${p}g9)`} />
          <path d="M19.3046 19.5757C19.733 23.9252 20.4773 28.5876 21.1882 33.0608C21.744 36.5567 23.2202 44.1678 22.3467 44.3038C26.9379 43.991 20.0563 25.6834 20.8136 13.374C19.4833 14.4453 19.0444 16.9354 19.3046 19.5757Z" fill={`url(#${p}g10)`} />
          <path d="M21.4127 44.3542C21.7601 44.4451 21.9919 44.4228 22.1378 44.3208C21.3762 44.34 20.4885 42.8903 19.751 40.927C18.9474 38.7881 17.3877 33.0836 16.0468 29.9896C15.4577 28.6302 14.7319 27.6652 13.8931 27.1206C14.7357 28.5752 14.0006 28.5517 15.666 32.1897C16.5562 34.1376 19.1538 43.7632 21.4127 44.3542Z" fill={`url(#${p}g11)`} />
          <path d="M27.3873 29.1535C27.5944 32.7891 28.7684 39.6293 31.1422 39.9805C30.5964 39.761 29.4756 38.1828 29.1312 35.1327C28.7931 32.1375 28.1502 23.7586 27.2557 19.5172C26.5312 16.0826 25.5272 13.8342 23.7944 13.0918C27.0752 17.6713 27.1914 25.7152 27.3873 29.1535Z" fill={`url(#${p}g12)`} />
          <path d="M38.2859 21.9899C38.4572 27.438 37.4007 37.0366 40.4144 37.7982C39.9773 37.606 39.6349 36.5112 39.5557 35.4312C39.4667 34.2245 39.5971 22.4876 39.557 19.9128C39.505 16.5703 40.4311 11.4647 39.0364 8.4541C39.7752 12.264 38.1468 17.5761 38.2859 21.9899Z" fill={`url(#${p}g13)`} />
          <path d="M48.7662 43.0225C48.7668 43.0225 48.7668 43.0225 48.7674 43.0225C48.3829 40.8304 49.1389 38.9554 49.7466 36.874C50.7499 33.4381 52.8566 21.1158 53.6621 17.8542C53.9075 16.8601 53.9193 15.9916 53.7585 15.2485C53.3926 16.76 52.3609 18.3426 52.0029 21.3432C51.4286 26.1577 49.3386 33.631 48.6221 36.1983C47.905 38.7662 45.9986 43.2265 48.7662 43.0225Z" fill={`url(#${p}g14)`} />
          <path d="M52.415 56.2247C42.0739 68.2089 32.0864 65.6768 28.6801 63.7809C25.2739 61.8843 22.9149 56.8312 21.3329 48.8794L18.7773 40.728C18.0448 41.1719 15.2796 42.9708 12.4841 44.996C12.8019 46.4073 13.0992 47.7024 13.3385 48.6501C14.1879 52.8192 16.1896 66.1887 21.2284 69.87C29.8392 76.1607 44.0453 74.865 49.3778 68.6849C54.7103 62.5049 54.9205 58.598 59.5093 53.5177C63.3934 49.2182 68.389 49.8772 70.2813 47.6845C71.1462 46.6824 70.8426 45.3947 70.2442 44.303C68.2685 48.7305 62.7542 44.243 52.415 56.2247Z" fill={`url(#${p}g15)`} />
        </g>

        {/* Always rendered (same DOM nodes) so cx/cy/fill transition smoothly between fingers
            on this hand; opacity fades in/out when the active hand switches to the other side. */}
        {(() => {
          const tip = activeFinger !== null ? TIPS[activeFinger] : TIPS[0]
          const color = activeFinger !== null ? FINGER_COLOR[activeFinger] : FINGER_COLOR[0]
          return (
            <g
              style={{
                filter: `drop-shadow(0 0 4px ${color})`,
                opacity: activeFinger !== null ? 1 : 0,
                transition: 'opacity 0.35s ease'
              }}
            >
              <circle
                cx={tip.cx} cy={tip.cy} r={tip.r + 3.5} fill="none" stroke={color} strokeWidth={1.5} opacity={0.35}
                style={{ transition: 'cx 0.35s cubic-bezier(0.4,0,0.2,1), cy 0.35s cubic-bezier(0.4,0,0.2,1), stroke 0.35s ease' }}
              />
              <circle
                cx={tip.cx} cy={tip.cy} r={tip.r} fill={color}
                style={{ transition: 'cx 0.35s cubic-bezier(0.4,0,0.2,1), cy 0.35s cubic-bezier(0.4,0,0.2,1), fill 0.35s ease' }}
              />
            </g>
          )
        })()}
      </g>
    </svg>
  )
}

const WORD = 'student'
const STEP_MS = 750
const PAUSE_MS = 1400

export function TypingDemo() {
  const [pos, setPos] = useState(0)

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>
    function tick() {
      setPos((p) => {
        const next = p + 1
        if (next > WORD.length) {
          timer = setTimeout(tick, PAUSE_MS)
          return 0
        }
        timer = setTimeout(tick, STEP_MS)
        return next
      })
    }
    timer = setTimeout(tick, STEP_MS)
    return () => clearTimeout(timer)
  }, [])

  const curIdx = Math.min(pos, WORD.length - 1)
  const activeKey = WORD[curIdx]
  const fi = KEY_FINGER[activeKey]
  const activeColor = fi ? FINGER_COLOR[fi.finger] : '#1C2158'

  return (
    <section className="bg-background py-20 px-4">
      <div className="mx-auto max-w-[1280px]">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">See how a student learns it</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Tutor Mode highlights the exact key and the exact finger for every letter — this is the same guide
            students see inside the app.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-3xl rounded-2xl border border-border bg-white dark:bg-secondary p-4 shadow-sm sm:p-6 md:p-8">
          {/* Key to press */}
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Key to Press</span>
            <div className="flex items-center gap-1.5 sm:gap-2">
              {WORD.split('').map((ch, i) => {
                const isCur = i === curIdx
                const isPast = i < curIdx
                const chFi = KEY_FINGER[ch]
                const chColor = chFi ? FINGER_COLOR[chFi.finger] : '#1C2158'
                return (
                  <div
                    key={i}
                    style={{
                      backgroundColor: isCur ? chColor : isPast ? 'transparent' : 'hsl(var(--accent))',
                      boxShadow: isCur ? `0 0 24px ${chColor}90` : '0 0 0 rgba(0,0,0,0)',
                      transform: isCur ? 'scale(1.06)' : 'scale(1)',
                      color: isCur ? '#fff' : isPast ? 'hsl(var(--muted-foreground) / 0.4)' : 'hsl(var(--foreground) / 0.8)',
                      width: isCur ? 'clamp(40px, 12vw, 64px)' : 'clamp(24px, 7vw, 40px)',
                      height: isCur ? 'clamp(40px, 12vw, 64px)' : 'clamp(24px, 7vw, 40px)',
                      fontSize: isCur ? 'clamp(18px, 5vw, 28px)' : 'clamp(12px, 3.2vw, 16px)',
                      transition: 'background-color 0.35s cubic-bezier(0.4,0,0.2,1), box-shadow 0.35s ease, transform 0.35s cubic-bezier(0.4,0,0.2,1), color 0.35s ease, width 0.35s ease, height 0.35s ease, font-size 0.35s ease'
                    }}
                    className="flex items-center justify-center rounded-2xl font-mono font-bold"
                  >
                    {ch}
                  </div>
                )
              })}
            </div>
            {fi && (
              <span className="mt-0.5 text-xs text-muted-foreground">
                Use your{' '}
                <span className="font-bold" style={{ color: activeColor }}>
                  {FINGER_NAME[fi.finger]}
                </span>{' '}
                finger — {fi.hand === 'left' ? 'Left' : 'Right'} hand
              </span>
            )}
          </div>

          {/* Keyboard */}
          <div className="mt-8">
            <div
              className="mx-auto w-full max-w-xl rounded-[14px] p-1.5 sm:p-2"
              style={{ background: 'linear-gradient(165deg, #e4e4e4 0%, #d0d0d0 55%, #c2c2c2 100%)' }}
            >
              <div className="flex flex-col gap-[3px] rounded-[9px] p-1 sm:gap-[4px] sm:p-1.5" style={{ background: '#a4a4a4' }}>
                {KB_ROWS.map((row, ri) => (
                  <div key={ri} className="flex gap-[3px] sm:gap-[4px]">
                    {row.map(({ key, label, flex }) => {
                      const lk = key === ' ' ? ' ' : key.toLowerCase()
                      const isActive = !NON_TYPE.has(key) && lk === activeKey
                      const keyFi = KEY_FINGER[lk]
                      const fc = !NON_TYPE.has(key) && keyFi ? FINGER_COLOR[keyFi.finger] : null
                      const restBg = fc
                        ? `linear-gradient(to bottom, ${hexToRgba(fc, 0.1)}, ${hexToRgba(fc, 0.16)}), linear-gradient(to bottom, #ffffff, #eeeeee)`
                        : 'linear-gradient(to bottom, #ffffff, #eeeeee)'
                      return (
                        <div key={key} style={{ flex: flex ?? 1, minWidth: 0 }}>
                          {/* Static gradient layer never changes — only the active overlay's opacity transitions,
                              since CSS can't smoothly interpolate between two different gradients/colours.
                              height/fontSize use clamp() so the whole keyboard scales fluidly with viewport
                              width instead of relying on a fixed min-width that forced horizontal scrolling. */}
                          <div
                            style={{
                              position: 'relative',
                              height: 'clamp(18px, 6vw, 26px)',
                              marginTop: isActive ? 2 : 0,
                              borderRadius: 4,
                              background: restBg,
                              boxShadow: '0 2px 0 rgba(130,130,130,0.85), inset 0 0.5px 0 rgba(255,255,255,1)',
                              opacity: NON_TYPE.has(key) && !isActive ? 0.38 : 1,
                              transition: 'margin-top 0.3s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease'
                            }}
                            className="flex items-center justify-center overflow-hidden font-semibold text-[#1a1a1a]"
                          >
                            <div
                              style={{
                                position: 'absolute',
                                inset: 0,
                                borderRadius: 4,
                                backgroundColor: activeColor,
                                boxShadow: `0 0 0 1.5px ${hexToRgba(activeColor, 0.65)}, 0 0 14px ${hexToRgba(activeColor, 0.55)}`,
                                opacity: isActive ? 1 : 0,
                                transition: 'opacity 0.3s ease'
                              }}
                            />
                            <span
                              style={{
                                position: 'relative',
                                color: isActive ? '#fff' : '#1a1a1a',
                                fontSize: 'clamp(7px, 2.2vw, 10px)',
                                transition: 'color 0.3s ease'
                              }}
                            >
                              {label}
                            </span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Finger placement guide */}
          <div className="mt-8">
            <p className="mb-2 text-center text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              Finger Placement Guide
            </p>
            <div className="flex items-center justify-center gap-3 sm:gap-8">
              <div className="flex flex-col items-center gap-1">
                <div className="h-14 w-14 sm:h-20 sm:w-20 md:h-24 md:w-24">
                  <HandSVG hand="left" activeFinger={fi?.hand === 'left' ? fi.finger : null} />
                </div>
                <span className="text-[9px] font-semibold text-muted-foreground sm:text-[10px]">Left Hand</span>
              </div>

              <div className="flex flex-col gap-1 sm:gap-1.5">
                {([4, 3, 2, 1, 0] as Finger[]).map((f) => (
                  <div key={f} className="flex items-center gap-1.5 sm:gap-2">
                    <div className="h-2 w-2 flex-shrink-0 rounded-full sm:h-2.5 sm:w-2.5" style={{ backgroundColor: FINGER_COLOR[f] }} />
                    <span className="text-[10px] text-muted-foreground sm:text-[11px]">{FINGER_NAME[f]}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col items-center gap-1">
                <div className="h-14 w-14 sm:h-20 sm:w-20 md:h-24 md:w-24">
                  <HandSVG hand="right" activeFinger={fi?.hand === 'right' ? fi.finger : null} />
                </div>
                <span className="text-[9px] font-semibold text-muted-foreground sm:text-[10px]">Right Hand</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
