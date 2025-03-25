import React from 'react'
import { Button } from "@/components/ui/button"
import { Link } from 'react-router-dom'
const Header = () => {
  return (
    <div className="relative h-screen w-full">
    {/* Background Image */}
    <div className="absolute inset-0 z-0 opacity-25">
      <img
        src="https://i.ibb.co/Py0Jdmd/bg.jpg"
        alt="Dark atmospheric background"
        className="object-cover h-full w-full"
      />
    </div>

    {/* Content Container */}
    <div className="relative z-10 flex h-full flex-col justify-between">
      {/* Logo/Brand */}
      <div className="flex h-full items-center justify-center">
        <h1 className="text-7xl font-play font-bold text-[#ff5e41] md:text-8xl lg:text-9xl">Noctéa</h1>
      </div>

      {/* Navigation Bar */}
      <div className="bg-black/80 p-4 mx-[104px] rounded-xl">
        <div className="mx-auto flex max-w-6xl justify-between items-center">
            <Link to="/" className="bg-[#1A1A1A] text-[#ff5e41] font-play font-bold px-6 py-3 rounded-lg text-xl">Noctéa</Link>
          <div className='flex space-x-6 items-center'>
            <Link to="#students" className="font-cairo text-gray-300 font-bold hover:text-primary">Students</Link>
            <Link to="#mods" className="font-cairo text-gray-300 font-bold hover:text-primary">Mods</Link>
            <Link to="#resource-packs" className="font-cairo text-gray-300 font-bold hover:text-primary">Resource Packs</Link>
            <Link to="#ultra" className="font-cairo bg-primary text-white font-bold hover:bg-[#ff5e41]/90 px-6 py-2 rounded-lg">Ultra</Link>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Header