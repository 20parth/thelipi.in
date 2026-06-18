import QRCode from 'qrcode'

const UPI_ID = '8275320626@ybl'
const PAYEE_NAME = 'LiPi Typing Software'

export interface UpiLinkOptions {
  amount: number
  note: string
}

/** Builds a standard UPI deep link. On Android, tapping this opens the user's
 *  installed UPI app (GPay/PhonePe/Paytm/etc.) with the amount pre-filled. */
export function buildUpiLink({ amount, note }: UpiLinkOptions): string {
  const params = new URLSearchParams({
    pa: UPI_ID,
    pn: PAYEE_NAME,
    am: amount.toFixed(2),
    cu: 'INR',
    tn: note
  })
  return `upi://pay?${params.toString()}`
}

/** Renders the same UPI link as a QR-code data URI (PNG) at build time, so
 *  desktop visitors (and iOS, which doesn't support the upi:// scheme) can
 *  scan it with any UPI app instead of tapping the deep link. */
export async function buildUpiQrDataUri(options: UpiLinkOptions): Promise<string> {
  const link = buildUpiLink(options)
  return QRCode.toDataURL(link, {
    margin: 1,
    width: 280,
    color: { dark: '#1b1f4d', light: '#ffffff' }
  })
}
