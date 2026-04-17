'use client'

import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('GLOBAL ERROR CAUGHT:', error)
  }, [error])

  return (
    <html>
      <body className="min-h-screen bg-vibe-cream flex items-center justify-center p-8">
        <div className="max-w-md w-full luxury-card p-12 text-center space-y-8">
          <div className="space-y-4">
            <h1 className="heading-serif text-3xl text-vibe-charcoal italic">Something went wrong</h1>
            <p className="text-vibe-slate/60 text-sm">
              We encountered an unexpected error. We've been notified and are looking into it.
            </p>
          </div>
          <button
            onClick={() => reset()}
            className="btn-premium w-full"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  )
}
