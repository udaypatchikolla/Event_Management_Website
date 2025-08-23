// import React from 'react'
import { FaCopyright } from "react-icons/fa";

export default function  Footer() {
  return (
    <div className="relative bottom-0 w-full">
      <footer className='mt-12 w-full bg-black text-white'>
        <div className="max-w-6xl mx-auto px-6 py-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <div className="flex items-center gap-2">
              <FaCopyright className="h-4"/>
              <span className="font-semibold">Planora</span>
            </div>
            <p className="text-xs text-gray-300 mt-2">Your destination for discovering and hosting memorable events.</p>
          </div>
          <div className="text-sm">
            <div className="font-semibold mb-2">Explore</div>
            <ul className="space-y-1 text-gray-300">
              <li className="hover:text-white cursor-pointer">Home</li>
              <li className="hover:text-white cursor-pointer">Trending</li>
              <li className="hover:text-white cursor-pointer">Categories</li>
            </ul>
          </div>
          <div className="text-sm">
            <div className="font-semibold mb-2">Organize</div>
            <ul className="space-y-1 text-gray-300">
              <li className="hover:text-white cursor-pointer">Create Event</li>
              <li className="hover:text-white cursor-pointer">Pricing</li>
              <li className="hover:text-white cursor-pointer">Support</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="max-w-6xl mx-auto px-6 h-10 flex items-center text-xs text-gray-400">© {new Date().getFullYear()} Planora. All rights reserved.</div>
        </div>
      </footer>
    </div>
  )
}
