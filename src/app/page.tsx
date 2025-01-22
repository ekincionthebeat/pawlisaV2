import { Squares } from "@/components/onboarding/squares"

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <div className="absolute inset-0">
        <Squares direction="diagonal" speed={0.5} borderColor="#333" />
      </div>
    </main>
  )
} 