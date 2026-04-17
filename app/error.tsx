'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('PAGE ERROR CAUGHT:', error)
  }, [error])

  return (
    <div className="min-h-[50vh] flex items-center justify-center p-8">
      <div className="max-w-md w-full luxury-card p-12 text-center space-y-8">
        <div className="space-y-4">
          <h1 className="heading-serif text-3xl text-vibe-charcoal italic">Page Error</h1>
          <p className="text-vibe-slate/60 text-sm">
            There was a problem loading this section.
          </p>
        </div>
        <button
          onClick={() => reset()}
          className="btn-premium w-full"
        >
          Reload Section
        </button>
      </div>
    </div>
  )
}
