"use client";

import EnhancedNavbar from "@/components/EnhancedNavbar";

export default function TestEnhancedNavbar() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <EnhancedNavbar />
      
      {/* Test sections for scrolling */}
      <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="text-center text-white">
          <h1 className="text-6xl font-bold mb-4">Home Section</h1>
          <p className="text-xl">Welcome to our enhanced navigation experience</p>
        </div>
      </section>

      <section id="services" className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-500 to-teal-600">
        <div className="text-center text-white">
          <h1 className="text-6xl font-bold mb-4">Services Section</h1>
          <p className="text-xl">Explore our premium services</p>
        </div>
      </section>

      <section id="about" className="min-h-screen flex items-center justify-center bg-gradient-to-r from-orange-500 to-red-600">
        <div className="text-center text-white">
          <h1 className="text-6xl font-bold mb-4">About Section</h1>
          <p className="text-xl">Learn more about our company</p>
        </div>
      </section>

      {/* Additional content for scroll testing */}
      <div className="h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">Additional Content</h2>
          <p className="text-lg text-gray-600">Scroll up to see the navigation effects</p>
        </div>
      </div>
    </div>
  );
}