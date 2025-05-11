declare module 'next/image';
import Image from 'next/image'

export function BackgroundImage() {
  return (
    <div className="relative w-full h-[500px]">
      <Image
        src="/images/hero-bg.jpg"
        alt="Luxury Hotel Background"
        fill
        className="object-cover brightness-50"
        priority
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-5xl font-bold mb-4">Welcome to Luxury Stays</h1>
          <p className="text-xl">Discover the perfect accommodation for your next adventure</p>
        </div>
      </div>
    </div>
  )
} 