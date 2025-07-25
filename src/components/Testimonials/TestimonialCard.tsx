'use client'

import { Testimonial } from '@/lib/types'
import Image from 'next/image'
import { FC, useState, useEffect, useRef } from 'react'

interface TestimonialCardProps {
  testimonial: Testimonial
}

const TestimonialCard: FC<TestimonialCardProps> = ({
  testimonial: { name, title, feedback, image, relationship },
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isClamped, setIsClamped] = useState(false)
  const [theme, setTheme] = useState('dark')
  const feedbackRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const el = feedbackRef.current
    if (!el) return

    const checkClamp = () => {
      setIsClamped(el.scrollHeight > el.clientHeight + 1) // +1 for rounding
    }

    checkClamp()
    window.addEventListener('resize', checkClamp)
    return () => window.removeEventListener('resize', checkClamp)
  }, [feedback])

  useEffect(() => {
    const currentTheme = document.documentElement.getAttribute('data-theme')
    if (currentTheme) setTheme(currentTheme)

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          setTheme(document.documentElement.getAttribute('data-theme') || 'dark')
        }
      })
    })
    observer.observe(document.documentElement, { attributes: true })
    return () => observer.disconnect()
  }, [])

  const useBlackText = theme === 'light' || theme === 'retro'
  const primaryTextColor = useBlackText ? 'text-black' : 'text-base-content'
  const secondaryTextColor = useBlackText ? 'text-gray-700' : 'text-neutral'

  return (
    <div className={`w-full sm:w-[420px] shrink-0 rounded-2xl border border-base-300 bg-base-200 p-8 text-left shadow-lg transition-all duration-500 ${!isExpanded ? 'min-h-[28rem]' : ''
      }`}>

      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Image
            src={image}
            alt={name}
            width={56}
            height={56}
            className="rounded-full object-cover shadow-md"
          />
          <div>
            <p className={`text-lg font-semibold ${primaryTextColor}`}>{name}</p>
            <p className={`text-sm ${secondaryTextColor}`}>{title}</p>
          </div>
        </div>

        {/* Feedback */}
        <div className="pt-6">
          <p
            ref={feedbackRef}
            className={`text-base leading-relaxed ${primaryTextColor} ${!isExpanded && 'line-clamp-7'}`}
          >
            {feedback}
          </p>

          {/* Inline toggle below paragraph */}
          {isClamped && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-2 text-accent text-sm font-semibold hover:underline"
            >
              {isExpanded ? 'view Less' : '...view more'}
            </button>
          )}
        </div>

        {/* Footer */}
        <div className="mt-auto border-t border-base-300/70 pt-4">
          <p className={`text-xs italic ${secondaryTextColor}`}>{relationship}</p>
        </div>
      </div>
    </div>
  )
}

export default TestimonialCard
