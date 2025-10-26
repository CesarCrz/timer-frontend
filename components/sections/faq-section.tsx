"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { FAQ_ITEMS } from "@/constants/faq"
import { cn } from "@/lib/utils"

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Preguntas Frecuentes</h2>
        </div>

        <div className="space-y-2">
          {FAQ_ITEMS.map((item, index) => (
            <div key={index} className="border-b border-gray-200">
              <button
                className="w-full py-4 flex items-center justify-between text-left hover:text-blue-600 transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-semibold text-lg text-gray-900">{item.question}</span>
                <ChevronDown
                  className={cn("w-5 h-5 text-gray-500 transition-transform", openIndex === index && "rotate-180")}
                />
              </button>
              {openIndex === index && <div className="pb-4 text-gray-600 leading-relaxed">{item.answer}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
