'use client'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-vibe-cream flex items-center justify-center p-8">
      <div className="max-w-2xl w-full luxury-card p-12 space-y-6">
        <h1 className="heading-serif text-3xl text-vibe-charcoal">Privacy Policy</h1>
        <p className="text-vibe-slate/70 leading-relaxed">
          Our Privacy Policy is currently being updated. Your data security is our priority.
        </p>
        <button 
          onClick={() => window.history.back()}
          className="btn-premium"
        >
          Back
        </button>
      </div>
    </div>
  )
}
