export default function AmbientBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-vibe-cream">
      {/* Soft Ambient Orbs */}
      <div
        className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] rounded-full bg-vibe-primary/5 blur-[120px] animate-orb-1"
      />
      <div
        className="absolute top-[40%] -right-[10%] w-[50%] h-[50%] rounded-full bg-vibe-gold/5 blur-[100px] animate-orb-2"
      />
      <div
        className="absolute -bottom-[10%] left-[20%] w-[40%] h-[40%] rounded-full bg-vibe-secondary/5 blur-[80px] animate-orb-3"
      />
    </div>
  )
}
