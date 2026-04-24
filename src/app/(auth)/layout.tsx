export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-6 sm:py-8">
      {children}
    </main>
  )
}

