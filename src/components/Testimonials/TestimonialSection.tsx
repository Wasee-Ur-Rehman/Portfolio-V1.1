'use client'

import { Testimonial } from '@/lib/types'
import { useState } from 'react'
import SectionHeading from '../SectionHeading/SectionHeading'
import TestimonialCard from './TestimonialCard'

interface TestimonialSectionProps {
  recommendations: Testimonial[]
}

const TestimonialSection: React.FC<TestimonialSectionProps> = ({ recommendations }) => {
  const [activeCard, setActiveCard] = useState(0)

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const target = event.currentTarget
    const cardWidth = target.children[0]?.clientWidth || 0
    const scrollPosition = target.scrollLeft + target.clientWidth / 2
    const newActiveCard = Math.floor(scrollPosition / (cardWidth + 32))

    if (newActiveCard !== activeCard) {
      setActiveCard(newActiveCard)
    }
  }

  return (
    <section id="recommendations">
      <SectionHeading
        title="Recommendations"
        subtitle="Don't just take my word for it - see what my colleagues and mentors have to say about our time working together."
      />

      {/* Desktop grid + mobile scrollable carousel */}
      <div>
        {/* Mobile scrollable layout */}
        <div
          onScroll={handleScroll}
          className="hide-scrollbar my-4 flex snap-x snap-mandatory gap-8 overflow-x-auto py-8 sm:hidden"
        >
          {recommendations.map((recommendation, idx) => (
            <div key={idx} className="w-[calc(100%-2rem)] flex-shrink-0 snap-center">
              <TestimonialCard testimonial={recommendation} />
            </div>
          ))}
        </div>

        {/* Desktop centered flex-wrap layout */}
        <div className="hidden sm:flex flex-wrap justify-center gap-8 py-8">
          {recommendations.map((recommendation, idx) => (
            <TestimonialCard key={idx} testimonial={recommendation} />
          ))}
        </div>
      </div>

      {/* Mobile dot indicator */}
      <div className="flex items-center justify-center gap-2 sm:hidden">
        {recommendations.map((_, idx) => (
          <div
            key={idx}
            className={`rounded-full transition-all duration-300 ${idx === activeCard ? 'bg-accent h-3 w-3' : 'bg-base-content/20 h-2 w-2'
              }`}
          />
        ))}
      </div>
    </section>
  )
}

export default TestimonialSection
