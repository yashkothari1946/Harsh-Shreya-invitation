"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Preloader({ onComplete }) {

  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [opening, setOpening] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setLoaded(true);
          return 100;
        }

        return prev + Math.floor(Math.random() * 7) + 3;

      });

    }, 90);

    return () => clearInterval(timer);

  }, []);

  const router = useRouter();

const [selectedCard, setSelectedCard] = useState(null);

const handleCardSelect = (side) => {

  setSelectedCard(side);

  setOpening(true);

  setTimeout(() => {

    setDismissed(true);

  }, 100);

  setTimeout(() => {

    if (side === "groom") {
      router.push("/groom");
    } else {
      router.push("/bride");
    }

  }, 100);

};

  return (

    <AnimatePresence>

      {!dismissed && (

        <motion.div

          initial={{ opacity: 1 }}

          exit={{
            opacity: 0,
            scale: 1.08,
            transition: {
              duration: 1,
            },
          }}

        className="relative min-h-screen z-[9999] overflow-x-hidden overflow-y-auto"

        >
          <div
  className="absolute inset-0 bg-cover bg-center"
  style={{
    backgroundImage: "url('/background.jpg')",
  }}
/>
      
          <div className="absolute inset-0 bg-gradient-to-b from-[#290004]/55 via-[#4a0610]/40 to-[#220003]/75" />

          {/* Golden Glow */}

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,.18)_0%,transparent_70%)]" />

          {/* Content */}

          <div className="
relative
z-20
flex
min-h-screen
flex-col
items-center
justify-start
pt-0 lg:pt-1
pb-0
px-6
text-center
">
                        {/* ===========================
                  HANGING LANTERNS
            =========================== */}

            <motion.img
              src="/latin.jpg"
              alt=""
              className="absolute left-8 top-0 hidden md:block w-28 select-none pointer-events-none"
              animate={{
                rotate: [-3, 3, -3],
                y: [0, 8, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <motion.img
              src="/latin.jpg"
              alt=""
              className="absolute right-8 top-0 hidden md:block w-28 select-none pointer-events-none"
              animate={{
                rotate: [3, -3, 3],
                y: [0, 8, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* ===========================
                  CENTER LOGO
            =========================== */}

            <motion.img
              initial={{
                opacity: 0,
                scale: 0.7,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: 1.2,
              }}
              src="/couplee.jpg"
              alt="Wedding Logo"
           className="w-16 md:w-24 lg:w-28 drop-shadow-[0_0_25px_rgba(212,175,55,.5)] mb-1"
            />
                        {/* ===========================
                  COUPLE NAMES
            =========================== */}

            <motion.h1
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.3,
                duration: 1,
              }}
              className="font-calligraphy-royal text-[#f5d67b] text-3xl md:text-5xl lg:text-5xl tracking-wide drop-shadow-[0_0_18px_rgba(212,175,55,.55)]"
            >
              Harsh
              <span className="mx-4 text-white/90">&</span>
              Shreya
            </motion.h1>

            {/* Golden Divider */}

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 180 }}
              transition={{
                delay: 0.8,
                duration: 1,
              }}
              className="h-[2px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent my-1 rounded-full"
            />

            {/* Subtitle */}

            <motion.p
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 1,
                duration: 1,
              }}
              className="text-[#f8edd2] text-sm md:text-lg tracking-[0.45em] uppercase font-light"
            >
              A Beginning of Forever
            </motion.p>

            <motion.p
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 0.85,
              }}
              transition={{
                delay: 1.4,
                duration: 1,
              }}
             className="max-w-xl mt-1 text-[#f4ead4]/90 leading-6 text-sm md:text-base tracking-wide"
            >
              Together with their families,
              request the honour of your gracious presence
              as they celebrate their wedding ceremony.
            </motion.p>
            
            {/* ===========================
      CHOOSE YOUR SIDE
=========================== */}

{loaded && (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
   className="mt-1 w-full px-4 lg:px-10 pb-0"
  >
    <h3 className="text-[#f5d67b] text-sm md:text-base uppercase tracking-[0.45em] mb-3">
      Choose Your Family
    </h3>

 <div
  className="
    grid
    grid-cols-1
    lg:grid-cols-2
    gap-1
    w-full
    max-w-5xl
    mx-auto
    place-items-center
  "
>

      {/* Harsh Card */}

      <motion.div
  whileHover={{
    y: -8,
    scale: 1.03,
  }}
  whileTap={{ scale: 0.98 }}

  animate={
    selectedCard === "groom"
      ? {
          scale: 1.18,
          rotateY: -18,
          zIndex: 100,
        }
      : {}
  }

  transition={{
    duration: 0.7,
  }}

  onClick={() => handleCardSelect("groom")}

  className="relative cursor-pointer group"
>
        <div className="rounded-[32px] border border-[#d4af37]/40 bg-gradient-to-br from-[#5d0812] via-[#42040d] to-[#230003] p-6 lg:p-8 shadow-[0_20px_60px_rgba(0,0,0,.4)] overflow-hidden">

          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full duration-[1800ms]" />

          <div className="relative z-10">

            <div className="mb-6 flex justify-center">
  <img
    src="https://freepngimg.com/download/king/160219-golden-crown-king-free-download-image.png"
    alt="King Crown"
    className="w-16 h-16 md:w-20 md:h-20 object-contain drop-shadow-[0_0_15px_rgba(212,175,55,.6)]"
  />
</div>
            <h2 className="font-calligraphy-royal text-4xl text-[#f5d67b]">
             Kothari
            </h2>

            <p className="mt-3 uppercase tracking-[0.35em] text-[#f8edd2]/70 text-xs">
              Family
            </p>

            <div className="mt-10 inline-block px-6 py-3 rounded-full border border-[#d4af37]/40 text-[#f5d67b] uppercase tracking-[0.3em] text-xs">
              Open Invitation
            </div>

          </div>

        </div>
      </motion.div>

      {/* Shreya Card */}

      <motion.div
  whileHover={{
    y: -8,
    scale: 1.03,
  }}
  whileTap={{ scale: 0.98 }}

  animate={
    selectedCard === "bride"
      ? {
          scale: 1.18,
          rotateY: 18,
          zIndex: 100,
        }
      : {}
  }

  transition={{
    duration: 0.7,
  }}

  onClick={() => handleCardSelect("bride")}

  className="relative cursor-pointer group"
>
        <div className="rounded-[32px] border border-pink-300/40 bg-gradient-to-br from-[#6d1839] via-[#8f2e5b] to-[#e9c4d2] p-8 shadow-[0_20px_60px_rgba(0,0,0,.4)] overflow-hidden">

          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full duration-[1800ms]" />

          <div className="relative z-10">

            <div className="text-6xl mb-6">🌸</div>

            <h2 className="font-calligraphy-royal text-4xl text-white">
              Vaya
            </h2>

            <p className="mt-3 uppercase tracking-[0.35em] text-white/70 text-xs">
             Family
            </p>

            <div className="mt-10 inline-block px-6 py-3 rounded-full border border-white/40 text-white uppercase tracking-[0.3em] text-xs">
              Open Invitation
            </div>

          </div>

        </div>
      </motion.div>

    </div>

  </motion.div>
)}
            

           <div className="h-0" />
           <div className="mt-0 flex flex-col items-center w-full">
              {!loaded ? (

                <>
                  {/* Percentage */}

                  <motion.span
                    animate={{
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 2,
                    }}
                    className="text-[#f5d67b] text-3xl md:text-4xl font-semibold tracking-[0.15em]"
                  >
                    {progress}%
                  </motion.span>

                  {/* Progress Bar */}

                  <div className="relative mt-6 w-64 md:w-80 h-[3px] rounded-full bg-white/15 overflow-hidden">

                    <motion.div
                      className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#d4af37] via-[#fff1a8] to-[#d4af37]"
                      initial={{ width: 0 }}
                      animate={{
                        width: `${progress}%`,
                      }}
                      transition={{
                        ease: "easeInOut",
                      }}
                    />

                  </div>

                  <motion.p
                    animate={{
                      opacity: [0.4, 1, 0.4],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 2,
                    }}
                    className="mt-5 text-xs uppercase tracking-[0.35em] text-[#f5d67b]/80"
                  >
                    Preparing Your Invitation
                  </motion.p>

                </>

              ) : (

                <>

                </>

              )}

            </div>

            <div className="absolute top-8 left-8 w-24 h-24 border-l border-t border-[#d4af37]/30 pointer-events-none" />
            <div className="absolute top-8 right-8 w-24 h-24 border-r border-t border-[#d4af37]/30 pointer-events-none" />

            <div className="absolute bottom-8 left-8 w-24 h-24 border-l border-b border-[#d4af37]/30 pointer-events-none" />
            <div className="absolute bottom-8 right-8 w-24 h-24 border-r border-b border-[#d4af37]/30 pointer-events-none" />

            {/* Bottom Glow */}

            <motion.div
              animate={{
                opacity: [0.2, 0.45, 0.2],
              }}
              transition={{
                repeat: Infinity,
                duration: 4,
              }}
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[180px] bg-[#d4af37]/10 blur-[90px]"
            />

          </div>

        </motion.div>

      )}

    </AnimatePresence>

  );

}