"use client";

import React, { useEffect, useRef } from "react";

export default function ParticleBg() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;

    // Handle resize
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Particle settings
    const petals = [];
    const sparkles = [];
    const maxPetals = 45;
    const maxSparkles = 50;

    // Rose Petal Class
    class RosePetal {
      constructor() {
        this.reset();
        this.y = Math.random() * canvas.height; // start scattered
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = -20;
        this.size = Math.random() * 8 + 6;
        this.speedY = Math.random() * 1.2 + 0.8;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.oscSpeed = Math.random() * 0.02 + 0.01;
        this.oscAngle = Math.random() * Math.PI * 2;
        this.opacity = Math.random() * 0.5 + 0.4;
        this.rotation = Math.random() * Math.PI;
        this.rotationSpeed = Math.random() * 0.02 - 0.01;
      }

      update() {
        this.y += this.speedY;
        this.oscAngle += this.oscSpeed;
        this.x += this.speedX + Math.sin(this.oscAngle) * 0.6;
        this.rotation += this.rotationSpeed;

        if (this.y > canvas.height + 20 || this.x < -20 || this.x > canvas.width + 20) {
          this.reset();
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.beginPath();
        // Draw a heart/leaf shape for rose petal
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-this.size, -this.size, -this.size * 1.5, this.size / 2, 0, this.size * 1.5);
        ctx.bezierCurveTo(this.size * 1.5, this.size / 2, this.size, -this.size, 0, 0);
        
        // Deep maroon / rose red color
        ctx.fillStyle = `rgba(140, 12, 27, ${this.opacity})`;
        ctx.fill();
        ctx.restore();
      }
    }

    // Sparkle Class
    class Sparkle {
      constructor() {
        this.reset();
        this.y = Math.random() * canvas.height;
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.5;
        this.alpha = Math.random() * 0.3 + 0.2;
        this.fadeSpeed = Math.random() * 0.008 + 0.003;
        this.growing = Math.random() > 0.5;
      }

      update() {
        if (this.growing) {
          this.alpha += this.fadeSpeed;
          if (this.alpha >= 0.8) {
            this.growing = false;
          }
        } else {
          this.alpha -= this.fadeSpeed;
          if (this.alpha <= 0.1) {
            this.reset();
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        // Golden glowing sparkle
        ctx.fillStyle = `rgba(212, 175, 55, ${this.alpha})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = "rgba(212, 175, 55, 0.8)";
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      }
    }

    // Initialize particles
    for (let i = 0; i < maxPetals; i++) {
      petals.push(new RosePetal());
    }
    for (let i = 0; i < maxSparkles; i++) {
      sparkles.push(new Sparkle());
    }

    // Animation Loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw sparkles first (behind petals)
      sparkles.forEach((sparkle) => {
        sparkle.update();
        sparkle.draw();
      });

      // Draw petals
      petals.forEach((petal) => {
        petal.update();
        petal.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 w-full h-full"
    />
  );
}
