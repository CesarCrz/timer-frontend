"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, MapPin, ArrowRight, UserPlus, CheckCircle, Check, Plus, Minus } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

function MapLocationComponent() {
  return (
    <div className="max-w-[280px] rounded-lg bg-white shadow-sm overflow-hidden">
      <div className="relative h-32 bg-gray-100">
        <svg viewBox="0 0 280 128" className="w-full h-full">
          {/* Map background with streets */}
          <rect width="280" height="128" fill="#e5e7eb" />

          {/* Streets */}
          <line x1="0" y1="40" x2="280" y2="40" stroke="#d1d5db" strokeWidth="2" />
          <line x1="0" y1="80" x2="280" y2="80" stroke="#d1d5db" strokeWidth="2" />
          <line x1="70" y1="0" x2="70" y2="128" stroke="#d1d5db" strokeWidth="2" />
          <line x1="140" y1="0" x2="140" y2="128" stroke="#d1d5db" strokeWidth="2" />
          <line x1="210" y1="0" x2="210" y2="128" stroke="#d1d5db" strokeWidth="2" />

          {/* Lighter streets */}
          <line x1="0" y1="20" x2="280" y2="20" stroke="#e5e7eb" strokeWidth="1" />
          <line x1="0" y1="60" x2="280" y2="60" stroke="#e5e7eb" strokeWidth="1" />
          <line x1="0" y1="100" x2="280" y2="100" stroke="#e5e7eb" strokeWidth="1" />
          <line x1="35" y1="0" x2="35" y2="128" stroke="#e5e7eb" strokeWidth="1" />
          <line x1="105" y1="0" x2="105" y2="128" stroke="#e5e7eb" strokeWidth="1" />
          <line x1="175" y1="0" x2="175" y2="128" stroke="#e5e7eb" strokeWidth="1" />
          <line x1="245" y1="0" x2="245" y2="128" stroke="#e5e7eb" strokeWidth="1" />

          {/* Red location pin */}
          <g transform="translate(140, 50)">
            {/* Pin shadow */}
            <ellipse cx="0" cy="35" rx="8" ry="3" fill="rgba(0,0,0,0.2)" />

            {/* Pin body */}
            <path
              d="M0,-25 C-10,-25 -18,-17 -18,-7 C-18,3 0,25 0,25 C0,25 18,3 18,-7 C18,-17 10,-25 0,-25 Z"
              fill="#ef4444"
              stroke="#dc2626"
              strokeWidth="1.5"
            />

            {/* Pin inner circle */}
            <circle cx="0" cy="-7" r="6" fill="white" />
          </g>
        </svg>
      </div>
      <div className="p-2 text-xs text-gray-600">
        <p className="font-medium">Santa Catalina 1687 </p>
        <p className="text-[10px]">Guadalajara, Jalisco, México</p>
      </div>
      <div className="px-2 pb-1 text-right">
        <span className="text-[10px] text-gray-400">13:40</span>
      </div>
    </div>
  )
}

function WhatsAppMessage({
  text,
  isUser,
  isLocation,
  delay,
  isVisible,
}: {
  text: string
  isUser: boolean
  isLocation?: boolean
  delay: number
  isVisible: boolean
}) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => setShow(true), delay)
      return () => clearTimeout(timer)
    } else {
      setShow(false)
    }
  }, [isVisible, delay])

  if (!show) return null

  return (
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-2 animate-in fade-in slide-in-from-bottom-4 duration-500`}
    >
      {isLocation ? (
        <MapLocationComponent />
      ) : (
        <div
          className={`max-w-[75%] rounded-lg px-3 py-2 ${
            isUser ? "bg-[#d9fdd3] rounded-br-none" : "bg-white rounded-bl-none shadow-sm"
          }`}
        >
          <p className="text-sm text-gray-800">{text}</p>
          <div className="flex items-center justify-end gap-1 mt-1">
            <span className="text-[10px] text-gray-500">13:40</span>
            {isUser && (
              <div className="flex">
                <Check className="w-3 h-3 text-blue-500 -mr-1.5" />
                <Check className="w-3 h-3 text-blue-500" />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function WhatsAppConversation() {
  const [isVisible, setIsVisible] = useState(false)
  const [animationCycle, setAnimationCycle] = useState(0)
  const conversationRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 },
    )

    if (conversationRef.current) {
      observer.observe(conversationRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (isVisible) {
      const loopTimer = setInterval(() => {
        setIsVisible(false)
        setTimeout(() => {
          setIsVisible(true)
          setAnimationCycle((prev) => prev + 1)
        }, 500)
      }, 10000) // Restart every 10 seconds

      return () => clearInterval(loopTimer)
    }
  }, [isVisible])

  return (
    <div ref={conversationRef} className="relative w-full">
      {/* Desktop View */}
      <div className="hidden lg:block">
        <div className="relative mx-auto max-w-4xl">
          {/* Computer Frame */}
          <div className="relative rounded-2xl bg-gray-900 p-3 shadow-2xl">
            {/* Screen */}
            <div className="relative rounded-lg bg-[#111b21] overflow-hidden" style={{ aspectRatio: "16/10" }}>
              {/* WhatsApp Web Interface */}
              <div className="flex h-full">
                {/* Sidebar */}
                <div className="w-[35%] bg-[#111b21] border-r border-gray-700">
                  <div className="bg-[#202c33] p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-600" />
                    <div className="flex-1">
                      <p className="text-white text-sm font-medium">Timer</p>
                    </div>
                  </div>
                  <div className="p-2">
                    <div className="bg-[#202c33] rounded-lg p-3 border-l-4 border-[#25d366]">
                      <p className="text-white text-sm font-medium">Timer</p>
                      <p className="text-gray-400 text-xs mt-1">Sistema de asistencia</p>
                    </div>
                  </div>
                </div>

                {/* Chat Area */}
                <div className="flex-1 flex flex-col bg-[#0b141a]">
                  {/* Chat Header */}
                  <div className="bg-[#202c33] p-3 flex items-center gap-3 border-b border-gray-700">
                    <div className="w-10 h-10 rounded-full bg-[#25d366] flex items-center justify-center">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">Timer</p>
                      <p className="text-gray-400 text-xs">en línea</p>
                    </div>
                  </div>

                  {/* Messages */}
                  <div
                    className="flex-1 p-4 overflow-y-auto"
                    style={{
                      backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h100v100H0z' fill='%230b141a'/%3E%3Cpath d='M20 20h60v60H20z' fill='none' stroke='%23ffffff' strokeWidth='0.5' opacity='0.03'/%3E%3C/svg%3E\")",
                    }}
                  >
                    <WhatsAppMessage text="Hola Timer!!" isUser={true} delay={0} isVisible={isVisible} />
                    <WhatsAppMessage text="" isUser={true} isLocation={true} delay={2000} isVisible={isVisible} />
                    <WhatsAppMessage
                      text="Hola César, ¿qué quieres marcar, entrada o tu salida?"
                      isUser={false}
                      delay={4000}
                      isVisible={isVisible}
                    />
                    <WhatsAppMessage text="entrada" isUser={true} delay={5500} isVisible={isVisible} />
                    <WhatsAppMessage
                      text="Entrada marcada César a las 8:00 am, buen día laboral!!"
                      isUser={false}
                      delay={7000}
                      isVisible={isVisible}
                    />
                  </div>

                  {/* Input Area */}
                  <div className="bg-[#202c33] p-3 flex items-center gap-2">
                    <div className="flex-1 bg-[#2a3942] rounded-lg px-3 py-2">
                      <p className="text-gray-500 text-sm">Escribe un mensaje</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Computer Stand */}
          <div className="mx-auto mt-2 h-12 w-32 bg-gray-300 rounded-b-lg" />
          <div className="mx-auto h-2 w-48 bg-gray-400 rounded-full" />
        </div>
      </div>

      {/* Tablet View */}
      <div className="hidden md:block lg:hidden">
        <div className="relative mx-auto max-w-2xl">
          {/* Tablet Frame */}
          <div className="relative rounded-3xl bg-gray-900 p-4 shadow-2xl">
            <div className="relative rounded-2xl bg-[#0b141a] overflow-hidden" style={{ aspectRatio: "3/4" }}>
              {/* WhatsApp Interface */}
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="bg-[#202c33] p-4 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#25d366] flex items-center justify-center">
                    <Clock className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="text-white text-base font-medium">Timer</p>
                    <p className="text-gray-400 text-sm">en línea</p>
                  </div>
                </div>

                {/* Messages */}
                <div
                  className="flex-1 p-4 overflow-y-auto"
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h100v100H0z' fill='%230b141a'/%3E%3Cpath d='M20 20h60v60H20z' fill='none' stroke='%23ffffff' strokeWidth='0.5' opacity='0.03'/%3E%3C/svg%3E\")",
                  }}
                >
                  <WhatsAppMessage text="Hola Timer!!" isUser={true} delay={0} isVisible={isVisible} />
                  <WhatsAppMessage text="" isUser={true} isLocation={true} delay={2000} isVisible={isVisible} />
                  <WhatsAppMessage
                    text="Hola César, ¿qué quieres marcar, entrada o tu salida?"
                    isUser={false}
                    delay={4000}
                    isVisible={isVisible}
                  />
                  <WhatsAppMessage text="entrada" isUser={true} delay={5500} isVisible={isVisible} />
                  <WhatsAppMessage
                    text="Entrada marcada César a las 8:00 am, buen día laboral!!"
                    isUser={false}
                    delay={7000}
                    isVisible={isVisible}
                  />
                </div>

                {/* Input */}
                <div className="bg-[#202c33] p-3">
                  <div className="bg-[#2a3942] rounded-full px-4 py-3">
                    <p className="text-gray-500 text-sm">Escribe un mensaje</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="block md:hidden">
        <div className="relative mx-auto max-w-[280px]">
          {/* iPhone Frame */}
          <div className="relative rounded-[2.5rem] bg-gray-900 p-2 shadow-2xl">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-3xl z-10" />

            <div className="relative rounded-[2rem] bg-[#0b141a] overflow-hidden" style={{ aspectRatio: "9/19.5" }}>
              {/* Status Bar */}
              <div className="bg-[#202c33] pt-7 pb-2 px-3 flex items-center justify-between">
                <span className="text-white text-[10px]">12:05</span>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-2 border border-white rounded-sm" />
                </div>
              </div>

              {/* Chat Header */}
              <div className="bg-[#202c33] p-2 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#25d366] flex items-center justify-center">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-white text-xs font-medium">Timer</p>
                  <p className="text-gray-400 text-[10px]">en línea</p>
                </div>
              </div>

              {/* Messages */}
              <div
                className="p-2 min-h-[350px]"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h100v100H0z' fill='%230b141a'/%3E%3Cpath d='M20 20h60v60H20z' fill='none' stroke='%23ffffff' strokeWidth='0.5' opacity='0.03'/%3E%3C/svg%3E\")",
                }}
              >
                <WhatsAppMessage text="Hola Timer!!" isUser={true} delay={0} isVisible={isVisible} />
                <WhatsAppMessage text="" isUser={true} isLocation={true} delay={2000} isVisible={isVisible} />
                <WhatsAppMessage
                  text="Hola César, ¿qué quieres marcar, entrada o tu salida?"
                  isUser={false}
                  delay={4000}
                  isVisible={isVisible}
                />
                <WhatsAppMessage text="entrada" isUser={true} delay={5500} isVisible={isVisible} />
                <WhatsAppMessage
                  text="Entrada marcada César a las 8:00 am, buen día laboral!!"
                  isUser={false}
                  delay={7000}
                  isVisible={isVisible}
                />
              </div>

              {/* Input Area */}
              <div className="absolute bottom-0 left-0 right-0 bg-[#202c33] p-2">
                <div className="bg-[#2a3942] rounded-full px-3 py-1.5">
                  <p className="text-gray-500 text-[10px]">Escribe un mensaje</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Animated Card Component
function AnimatedCard({
  children,
  delay = 0,
}: {
  children: React.ReactNode
  delay?: number
}) {
  const [isVisible, setIsVisible] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay)
        }
      },
      { threshold: 0.2 },
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [delay])

  return (
    <div
      ref={cardRef}
      className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
    >
      {children}
    </div>
  )
}

// Parallax Section Component
function ParallaxSection({
  children,
  speed = 0.5,
  maxOffset = 100,
}: {
  children: React.ReactNode
  speed?: number
  maxOffset?: number
}) {
  const [offsetY, setOffsetY] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        const scrolled = window.scrollY
        const elementTop = rect.top + scrolled
        const offset = (scrolled - elementTop) * speed
        // Clamp the offset to prevent excessive movement
        const clampedOffset = Math.max(-maxOffset, Math.min(maxOffset, offset))
        setOffsetY(clampedOffset)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [speed, maxOffset])

  return (
    <div ref={sectionRef} style={{ transform: `translateY(${offsetY}px)` }}>
      {children}
    </div>
  )
}

function FAQAccordion({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border border-border rounded-xl bg-background overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary/30">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-5 flex items-center justify-between text-left hover:bg-muted/30 transition-colors group"
      >
        <span className="text-base font-semibold text-foreground pr-4 group-hover:text-primary transition-colors">
          {question}
        </span>
        <motion.div
          className="flex-shrink-0 w-8 h-8 rounded-full border-2 border-primary flex items-center justify-center bg-primary/5 group-hover:bg-primary"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3, ease: "easeInOut" }}>
            {isOpen ? (
              <Minus className="w-4 h-4 text-primary group-hover:text-white transition-colors" />
            ) : (
              <Plus className="w-4 h-4 text-primary group-hover:text-white transition-colors" />
            )}
          </motion.div>
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] },
              opacity: { duration: 0.3 },
            }}
          >
            <div className="p-5 pt-0 text-muted-foreground leading-relaxed border-t border-border/50">{answer}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function ProgressiveTimeline() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeStep, setActiveStep] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        const sectionTop = rect.top
        const sectionHeight = rect.height
        const windowHeight = window.innerHeight

        // Calculate progress based on section visibility
        const progress = Math.max(0, Math.min(1, (windowHeight - sectionTop) / (sectionHeight + windowHeight / 2)))
        setScrollProgress(progress)

        // Determine active step based on progress
        if (progress < 0.33) {
          setActiveStep(0)
        } else if (progress < 0.66) {
          setActiveStep(1)
        } else {
          setActiveStep(2)
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Initial call
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const steps = [
    {
      icon: UserPlus,
      num: 1,
      title: "Regístrate",
      desc: "Crea tu cuenta en 2 minutos. Sin tarjeta de crédito para empezar.",
      delay: 0,
    },
    {
      icon: MapPin,
      num: 2,
      title: "Agrega Sucursales y Empleados",
      desc: "Ubica tus sucursales en el mapa. Invita empleados por WhatsApp.",
      delay: 600,
    },
    {
      icon: CheckCircle,
      num: 3,
      title: "Comienza a Registrar",
      desc: "Tus empleados envían su ubicación. Sistema valida y registra automáticamente.",
      delay: 1200,
    },
  ]

  return (
    <div ref={sectionRef} className="grid gap-8 md:grid-cols-3 relative">
      {/* Progressive line segments */}
      <div className="hidden md:block absolute top-10 left-0 right-0 h-0.5 z-0">
        {/* Segment 1 to 2 - stops well before step 2 circle */}
        <div className="absolute left-[20%] w-[24%] h-full bg-gray-200">
          <div
            className="h-full bg-primary transition-all duration-700 ease-out"
            style={{
              width: `${Math.min(100, Math.max(0, (scrollProgress - 0.1) * 300))}%`,
            }}
          />
        </div>
        {/* Segment 2 to 3 - starts after step 2 circle and stops well before step 3 circle */}
        <div className="absolute left-[56%] w-[24%] h-full bg-gray-200">
          <div
            className="h-full bg-primary transition-all duration-700 ease-out"
            style={{
              width: `${Math.min(100, Math.max(0, (scrollProgress - 0.4) * 300))}%`,
            }}
          />
        </div>
      </div>

      {steps.map((step, index) => (
        <AnimatedCard key={index} delay={step.delay}>
          <div
            className={`text-center group transition-all duration-500 relative ${
              activeStep === index ? "scale-110" : "scale-100"
            }`}
          >
            <div
              className={`mb-4 inline-flex h-20 w-20 items-center justify-center rounded-full transition-all duration-500 shadow-lg ${
                activeStep === index
                  ? "bg-primary-200 shadow-xl ring-4 ring-primary/30"
                  : "bg-primary-100 group-hover:bg-primary-200"
              }`}
            >
              <step.icon
                className={`h-10 w-10 transition-all duration-500 ${
                  activeStep === index ? "text-primary-700" : "text-primary-600"
                }`}
              />
            </div>
            <div
              className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full font-bold text-lg shadow-lg transition-all duration-500 ${
                activeStep === index
                  ? "bg-primary text-primary-foreground scale-125 ring-4 ring-primary/30"
                  : "bg-primary text-primary-foreground"
              }`}
            >
              {step.num}
            </div>
            <h3
              className={`mb-3 text-xl font-semibold transition-all duration-500 ${
                activeStep === index ? "text-primary scale-105" : "text-foreground group-hover:text-primary"
              }`}
            >
              {step.title}
            </h3>
            <p className="leading-relaxed text-muted-foreground px-4">{step.desc}</p>
          </div>
        </AnimatedCard>
      ))}
    </div>
  )
}

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary group-hover:scale-110 transition-transform">
              <Clock className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">Timer</span>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            <Link
              href="#features"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full"
            >
              Características
            </Link>
            <Link
              href="/pricing"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full"
            >
              Precios
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full"
            >
              Contacto
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="hover:scale-105 transition-transform" asChild>
              <Link href="/login">Iniciar Sesión</Link>
            </Button>
            <Button size="sm" className="hover:scale-105 transition-transform shadow-lg" asChild>
              <Link href="/register">Comenzar Gratis</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-primary-50 to-background py-20 md:py-32 lg:min-h-screen lg:flex lg:items-center">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              <ParallaxSection speed={0.3} maxOffset={50}>
                <div className="flex flex-col justify-center">
                  <h1 className="mb-6 text-4xl sm:text-5xl font-bold leading-tight tracking-tight text-foreground md:text-6xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
                    <span className="text-primary">El Reloj Checador</span> que Tus Empleados Ya Tienen{" "}
                    <span className="text-primary">en el Bolsillo</span>
                  </h1>
                  <p className="mb-8 text-lg sm:text-xl leading-relaxed text-muted-foreground animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                    Control de asistencia 100% digital con WhatsApp y GPS. Sin hardware, sin instalaciones, sin
                    complicaciones.
                  </p>
                  <div className="flex flex-col gap-3 sm:flex-row animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-400 mb-12 sm:mb-8 lg:mb-0">
                    <Button
                      size="lg"
                      className="text-base group hover:scale-105 transition-transform shadow-xl"
                      asChild
                    >
                      <Link href="/register">
                        Comenzar Gratis
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="text-base bg-transparent hover:scale-105 transition-transform hover:bg-primary/5 hover:border-primary"
                      asChild
                    >
                      <Link href="/contact">Ver Demo en Video</Link>
                    </Button>
                  </div>
                </div>
              </ParallaxSection>

              <div className="relative mt-8 lg:mt-0">
                <WhatsAppConversation />
              </div>
            </div>
          </div>

          {/* Floating 3D Elements */}
          <div className="absolute top-20 right-10 w-20 h-20 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 left-10 w-32 h-32 bg-secondary-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </section>

        {/* Problem Section - No parallax limit on this title as requested */}
        <section className="border-b border-border bg-muted/30 py-20 md:py-24">
          <div className="container mx-auto max-w-7xl px-4">
            <ParallaxSection speed={0.2}>
              <div className="mb-16 text-center">
                <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                  ¿Cansado de Estas Situaciones?
                </h2>
                <p className="text-lg text-muted-foreground">Problemas comunes que Timer resuelve</p>
              </div>
            </ParallaxSection>

            <div className="grid gap-8 md:grid-cols-3">
              <AnimatedCard delay={0}>
                <Card className="border-border bg-background transition-all hover:shadow-2xl hover:scale-105 hover:-translate-y-2 duration-300 h-full group">
                  <CardContent className="p-8">
                    <div className="mb-4 text-6xl group-hover:scale-110 transition-transform">💸</div>
                    <h3 className="mb-3 text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                      Hardware Costoso
                    </h3>
                    <p className="leading-relaxed text-muted-foreground">
                      Inviertes $1,500+ en relojes checadores que se descomponen
                    </p>
                  </CardContent>
                </Card>
              </AnimatedCard>

              <AnimatedCard delay={200}>
                <Card className="border-border bg-background transition-all hover:shadow-2xl hover:scale-105 hover:-translate-y-2 duration-300 h-full group">
                  <CardContent className="p-8">
                    <div className="mb-4 text-6xl group-hover:scale-110 transition-transform">🤥</div>
                    <h3 className="mb-3 text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                      Fraude en Asistencia
                    </h3>
                    <p className="leading-relaxed text-muted-foreground">
                      Empleados marcan por otros. Pierdes $22,880 MXN/año en horas fantasma
                    </p>
                  </CardContent>
                </Card>
              </AnimatedCard>

              <AnimatedCard delay={400}>
                <Card className="border-border bg-background transition-all hover:shadow-2xl hover:scale-105 hover:-translate-y-2 duration-300 h-full group">
                  <CardContent className="p-8">
                    <div className="mb-4 text-6xl group-hover:scale-110 transition-transform">⏱️</div>
                    <h3 className="mb-3 text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                      Pérdida de Tiempo
                    </h3>
                    <p className="leading-relaxed text-muted-foreground">
                      6 horas/quincena calculando nóminas manualmente
                    </p>
                  </CardContent>
                </Card>
              </AnimatedCard>
            </div>
          </div>
        </section>

        <section className="border-b border-border py-20 md:py-24 relative overflow-hidden">
          {/* 3D Background Elements */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary-500/5 rounded-full blur-3xl animate-pulse delay-500" />

          <div className="container mx-auto max-w-7xl px-4 relative z-10">
            <ParallaxSection speed={0.2} maxOffset={60}>
              <div className="mb-16 text-center">
                <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                  Timer Elimina Todos Estos Problemas
                </h2>
                <p className="text-lg text-muted-foreground">Comparación directa con sistemas tradicionales</p>
              </div>
            </ParallaxSection>

            <AnimatedCard>
              <div className="overflow-x-auto rounded-xl border border-border shadow-lg">
                <table className="w-full border-collapse bg-background">
                  <thead>
                    <tr className="border-b-2 border-border bg-muted/50">
                      <th className="p-4 text-left text-lg font-semibold text-foreground">Aspecto</th>
                      <th className="p-4 text-left text-lg font-semibold text-foreground">Hardware Tradicional</th>
                      <th className="bg-secondary-50 p-4 text-left text-lg font-semibold text-foreground">Timer</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border hover:bg-muted/30 transition-colors">
                      <td className="p-4 font-medium text-foreground">Inversión inicial</td>
                      <td className="p-4 text-muted-foreground">$1,500</td>
                      <td className="bg-secondary-50 p-4 font-semibold text-secondary-700">$100</td>
                    </tr>
                    <tr className="border-b border-border hover:bg-muted/30 transition-colors">
                      <td className="p-4 font-medium text-foreground">Multi-sucursal</td>
                      <td className="p-4 text-muted-foreground">$1,500 por ubicación</td>
                      <td className="bg-secondary-50 p-4 font-semibold text-secondary-700">Incluido</td>
                    </tr>
                    <tr className="border-b border-border hover:bg-muted/30 transition-colors">
                      <td className="p-4 font-medium text-foreground">Mantenimiento</td>
                      <td className="p-4 text-muted-foreground">$300/año</td>
                      <td className="bg-secondary-50 p-4 font-semibold text-secondary-700">$0</td>
                    </tr>
                    <tr className="border-b border-border hover:bg-muted/30 transition-colors">
                      <td className="p-4 font-medium text-foreground">Fraude</td>
                      <td className="p-4 text-muted-foreground">Vulnerable</td>
                      <td className="bg-secondary-50 p-4 font-semibold text-secondary-700">Imposible (GPS)</td>
                    </tr>
                    <tr className="hover:bg-muted/30 transition-colors">
                      <td className="p-4 font-medium text-foreground">Setup</td>
                      <td className="p-4 text-muted-foreground">2-4 semanas</td>
                      <td className="bg-secondary-50 p-4 font-semibold text-secondary-700">5 minutos</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </AnimatedCard>
          </div>
        </section>

        <section id="features" className="border-b border-border bg-muted/30 py-20 md:py-24">
          <div className="container mx-auto max-w-7xl px-4">
            <ParallaxSection speed={0.2} maxOffset={60}>
              <div className="mb-16 text-center">
                <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                  Todo lo que Necesitas en un Solo Lugar
                </h2>
                <p className="text-lg text-muted-foreground">Características diseñadas para tu negocio</p>
              </div>
            </ParallaxSection>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: "📱",
                  title: "Sin Hardware",
                  desc: "Elimina relojes checadores. Tus empleados usan su celular",
                  delay: 0,
                },
                {
                  icon: "🗺️",
                  title: "Multi-Sucursal",
                  desc: "Gestiona todas tus ubicaciones desde un solo dashboard",
                  delay: 100,
                },
                {
                  icon: "🎯",
                  title: "Validación GPS",
                  desc: "Imposible falsificar. GPS verifica ubicación real",
                  delay: 200,
                },
                {
                  icon: "📊",
                  title: "Reportes Automáticos",
                  desc: "PDF y Excel listos para nómina en 30 segundos",
                  delay: 300,
                },
                {
                  icon: "⚡",
                  title: "Setup en 5 Minutos",
                  desc: "No requiere técnicos ni capacitación compleja",
                  delay: 400,
                },
                { icon: "🔒", title: "100% Seguro", desc: "Datos encriptados. Cumple con LFPDPPP", delay: 500 },
              ].map((feature, index) => (
                <AnimatedCard key={index} delay={feature.delay}>
                  <Card className="border-border bg-background transition-all hover:border-primary-300 hover:shadow-xl hover:scale-105 duration-300 h-full group">
                    <CardContent className="p-8">
                      <div className="mb-4 text-4xl text-primary-600 group-hover:scale-110 transition-transform">
                        {feature.icon}
                      </div>
                      <h3 className="mb-2 text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                        {feature.title}
                      </h3>
                      <p className="leading-relaxed text-muted-foreground">{feature.desc}</p>
                    </CardContent>
                  </Card>
                </AnimatedCard>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-border py-20 md:py-24 relative overflow-hidden">
          {/* 3D Floating Elements */}
          <div className="absolute top-1/4 left-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-10 w-56 h-56 bg-secondary-500/10 rounded-full blur-3xl animate-pulse delay-700" />

          <div className="container mx-auto max-w-7xl px-4 relative z-10">
            <ParallaxSection speed={0.2} maxOffset={60}>
              <div className="mb-16 text-center">
                <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                  Tan Simple como 1-2-3
                </h2>
                <p className="text-lg text-muted-foreground">Comienza en minutos, no en semanas</p>
              </div>
            </ParallaxSection>

            <ProgressiveTimeline />
          </div>
        </section>

        <section className="border-b border-border py-20 md:py-24 bg-muted/30">
          <div className="container mx-auto max-w-4xl px-4">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                Preguntas Frecuentes
              </h2>
              <p className="text-lg text-muted-foreground">Todo lo que necesitas saber sobre Timer</p>
            </div>

            <div className="space-y-4">
              <FAQAccordion
                question="¿Necesito comprar hardware?"
                answer="No. Timer funciona 100% con los celulares que tus empleados ya tienen. No necesitas invertir en relojes checadores costosos ni en instalaciones complejas."
              />
              <FAQAccordion
                question="¿Qué pasa si mis empleados no tienen smartphone?"
                answer="En México, 89% de población tiene smartphone. Para casos especiales, ofrecemos check-in desde terminal compartida o alternativas flexibles."
              />
              <FAQAccordion
                question="¿Los empleados pueden falsificar su ubicación?"
                answer="Es muy difícil. Timer detecta patrones sospechosos como velocidades imposibles y cambios de ubicación anormales. Además, los Términos prohíben falsificación y cualquier intento queda registrado."
              />
              <FAQAccordion
                question="¿Es legal recopilar ubicación de empleados?"
                answer="Sí, siempre que informes a tus empleados y obtengan su consentimiento explícito. Timer facilita este proceso con formularios de consentimiento integrados y cumple con la LFPDPPP."
              />
              <FAQAccordion
                question="¿Qué pasa si cancelo mi suscripción?"
                answer="Puedes exportar todos tus reportes históricos en cualquier momento. Mantenemos tus datos seguros por 90 días después de la cancelación por si decides regresar."
              />
              <FAQAccordion
                question="¿Timer sustituye a mi contador?"
                answer="No. Timer genera reportes detallados que tu contador usa para calcular la nómina de manera más eficiente. Es una herramienta complementaria que ahorra tiempo y reduce errores."
              />
              <FAQAccordion
                question="¿Funciona en zonas sin internet?"
                answer="Los empleados necesitan conexión a internet para enviar su ubicación por WhatsApp. Estamos trabajando en un modo offline que sincronizará automáticamente cuando haya conexión."
              />
              <FAQAccordion
                question="¿Ofrecen soporte en español?"
                answer="Sí, 100% en español de México. Ofrecemos soporte por email y chat en horario laboral (9am-6pm hora del centro). Tiempo de respuesta promedio: 2 horas."
              />
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="border-b border-border bg-gradient-to-r from-primary to-primary-600 py-20 md:py-24 relative overflow-hidden">
          {/* 3D Animated Background */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse delay-500" />
          </div>

          <div className="container mx-auto max-w-4xl px-4 text-center relative z-10">
            <h2 className="mb-4 text-3xl sm:text-4xl font-bold tracking-tight text-white animate-in fade-in slide-in-from-bottom-8 duration-1000">
              Toma el Control de Tu Nómina Hoy
            </h2>
            <p className="mb-8 text-lg sm:text-xl text-white/90 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
              Únete a cientos de negocios que ya eliminaron los relojes checadores
            </p>
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-gray-100 text-lg sm:text-xl px-8 sm:px-10 py-5 sm:py-6 shadow-xl hover:scale-110 transition-transform duration-300 animate-in fade-in slide-in-from-bottom-8 delay-400"
              asChild
            >
              <Link href="/register">
                Comenzar Gratis - Sin Tarjeta Requerida
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <p className="mt-4 text-sm text-white/80">Configuración en 5 minutos. Cancela cuando quieras.</p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 py-12">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <Link href="/" className="mb-4 flex items-center gap-2 group">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary group-hover:scale-110 transition-transform">
                  <Clock className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold text-foreground">Timer</span>
              </Link>
              <p className="text-sm text-muted-foreground">Control de asistencia 100% digital para equipos modernos.</p>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-semibold text-foreground">Producto</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="#features"
                    className="text-muted-foreground transition-colors hover:text-primary hover:translate-x-1 inline-block"
                  >
                    Características
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pricing"
                    className="text-muted-foreground transition-colors hover:text-primary hover:translate-x-1 inline-block"
                  >
                    Precios
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground transition-colors hover:text-primary hover:translate-x-1 inline-block"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-semibold text-foreground">Empresa</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/contact"
                    className="text-muted-foreground transition-colors hover:text-primary hover:translate-x-1 inline-block"
                  >
                    Contacto
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground transition-colors hover:text-primary hover:translate-x-1 inline-block"
                  >
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-semibold text-foreground">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/terms"
                    className="text-muted-foreground transition-colors hover:text-primary hover:translate-x-1 inline-block"
                  >
                    Términos de Servicio
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="text-muted-foreground transition-colors hover:text-primary hover:translate-x-1 inline-block"
                  >
                    Política de Privacidad
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 border-t border-border pt-8">
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <p className="text-sm text-muted-foreground">© 2025 Timer. Todos los derechos reservados.</p>
              <div className="flex gap-4">
                <Link
                  href="mailto:support@timer.app"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  support@timer.app
                </Link>
                <Link
                  href="mailto:business@timer.app"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  business@timer.app
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
