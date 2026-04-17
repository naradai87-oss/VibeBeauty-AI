import BottomNav from '@/components/shared/BottomNav'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white max-w-md mx-auto relative">
      <main className="pb-24">
        {children}
      </main>
      <BottomNav />
    </div>
  )
}
