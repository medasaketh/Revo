"use client";

import Navbar from "@/components/Nav";
import { useState, useEffect } from "react";  

const img = (id: string) =>
  `https://images.unsplash.com/${id}?w=500&h=480&auto=format&fit=crop&q=75`;

export default function HomePage() {
  const images = [
    img("photo-1520975916090-3105956dac38"),
    img("photo-1521334884684-d80222895322"),
    img("photo-1524504388940-b1c1722653e1"),
    img("photo-1520975867597-0b273d7d7a21"),
    img("photo-1524253482453-3fed8d2fe12b"),
  ];

  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      {/* HERO SECTION */}
      <section className="px-8 pt-24 pb-32 grid md:grid-cols-2 gap-16 items-center">
        
        {/* LEFT TEXT */}
        <div>
          <h1 className="text-5xl md:text-6xl font-semibold leading-tight">
            Stop guessing. Dress with clarity.
          </h1>

          <p className="mt-6 text-lg text-gray-400 max-w-xl">
            Revo uses AI to understand your body, skin, and lifestyle —
            so you know exactly what suits you.
          </p>
        </div>

        {/* RIGHT VISUAL */}
        <div className="flex flex-col gap-6">

        {/* TOP SLIDING IMAGES */}
          <div className="overflow-hidden rounded-2xl h-[240px] relative">
            <div className="flex gap-6 animate-scroll">
      
              {images.slice(0, 4).map((src, i) => (
                <img
                  key={src + i}
                  src={src}
                  loading="lazy"
                  decoding="async"
                  className="w-[250px] h-[240px] object-cover rounded-2xl"
                  alt={`fashion ${i + 1}`}
                />
              ))}

              <img
                src={images[current]}
                alt="fashion slider"
                loading="eager"
                decoding="async"
                className="w-full h-full object-cover rounded-2xl transition-all duration-700 ease-in-out"
              />
            </div>
          </div>

          {/* BOTTOM STATIC IMAGE */}
          <div className="rounded-2xl overflow-hidden h-[240px]">
            <img
              src={images[4]}
              alt="static fashion"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
        </div>

      </section>

      {/* VALUE STRIP */}
      <section className="border-t border-gray-800 px-8 py-16 grid md:grid-cols-3 gap-12 text-sm text-gray-400">
        <div>
          <h3 className="text-white font-medium mb-2">Personalized</h3>
          Built around your body, skin, and lifestyle.
        </div>

        <div>
          <h3 className="text-white font-medium mb-2">Intelligent</h3>
          AI-powered insights, not generic fashion tips.
        </div>

        <div>
          <h3 className="text-white font-medium mb-2">Private</h3>
          Your data stays yours. Always.
        </div>
      </section>
    </div>
  );
}
