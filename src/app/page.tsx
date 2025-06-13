import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 px-4 text-center">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8">Your Startup Name Goes Here</h1>
      <p className="text-lg text-gray-300 max-w-md mb-8">
        The platform that helps you build amazing products faster than ever before.
      </p>
      <Link href="/sign-in">
        <Button className="bg-cyan-500 hover:bg-cyan-600 text-white font-medium px-8 py-6 text-lg rounded-lg transition-all duration-200 hover:scale-105">
          Get Started
        </Button>
      </Link>
    </div>
  )
}
