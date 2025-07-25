'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import Logo from './Logo'

const navItems = [
  { label: 'Home', href: '/#home', id: 'home' },
  { label: 'Projects', href: '/#projects', id: 'projects' },
  { label: 'Services', href: '/#services', id: 'services' },
  { label: 'Contact', href: '/#contact', id: 'contact' },
]

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [theme, setTheme] = useState('dark')

  const toggleMenu = () => setIsVisible(!isVisible)

  const handleLinkClick = () => {
    if (window.innerWidth < 768) setIsVisible(false)
  }

  useEffect(() => {
    const initialTheme = document.documentElement.getAttribute('data-theme')
    if (initialTheme) setTheme(initialTheme)

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.attributeName === 'data-theme') {
          const newTheme = document.documentElement.getAttribute('data-theme')
          if (newTheme) setTheme(newTheme)
        }
      }
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -60% 0px' }
    )

    navItems.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => {
      navItems.forEach(({ id }) => {
        const element = document.getElementById(id)
        if (element) observer.unobserve(element)
      })
    }
  }, [])

  const useBlackText = theme === 'light' || theme === 'retro'
  const iconColorClass = useBlackText ? 'text-black' : 'text-base-content'

  return (
    // The <nav> tag now correctly wraps the entire component including the mobile dropdown
    <nav className="fixed top-0 left-0 z-50 w-full px-4 py-3 md:py-4">
      {/* 
        THE FIX:
        - `md:bg-base-100/90` has been changed to `md:bg-base-100/50`.
        - This makes the desktop navbar background 50% opaque, increasing the transparency
          and enhancing the "glass" effect as requested.
        - The solid `bg-base-100` for mobile remains unchanged.
      */}
      <div className="bg-base-100 md:bg-base-100/50 md:backdrop-blur-sm border-base-200 mx-auto flex h-full max-w-[1200px] items-center justify-between rounded-xl border p-4 shadow-lg">
        <Link href="/">
          <div className="flex items-center gap-2">
            <Logo />
            <span
              className={`font-sans text-xl font-bold transition-colors duration-300 ${useBlackText ? 'text-black' : 'text-base-content'}`}
            >
              Wasee-Ur-Rehman
            </span>
          </div>
        </Link>

        {/* Hamburger button logic from your provided code */}
        <div className="md:hidden">
          <button onClick={toggleMenu} aria-label="Toggle Menu" className="p-1">
            {/* Close (X) Icon */}
            <svg
              className={`h-6 w-6 transition-transform duration-300 ${iconColorClass} ${isVisible ? 'block' : 'hidden'}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            {/* Burger Icon */}
            <svg
              className={`h-6 w-6 transition-transform duration-300 ${iconColorClass} ${isVisible ? 'hidden' : 'block'}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Desktop menu */}
        <div className="hidden md:flex md:items-center md:gap-x-6">
          <ul className="flex gap-x-4">
            {navItems.map(({ label, href, id }) => {
              const isActive = activeSection === id
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`rounded-md px-4 py-2 font-sans text-base transition-all duration-300 hover:text-accent ${isActive
                      ? 'font-semibold text-accent bg-base-300/50'
                      : useBlackText
                        ? 'text-black'
                        : 'text-base-content'
                      }`}
                  >
                    {label}
                  </Link>
                </li>
              )
            })}
          </ul>
          <a
            href="mailto:waseeurrehmanch@gmail.com"
            className="ml-4 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-content shadow-lg hover:scale-105 hover:bg-accent/90 transition-transform"
          >
            waseeurrehmanch@gmail.com
          </a>
        </div>
      </div>

      {/* Mobile dropdown menu (solid background) */}
      {isVisible && (
        <div className="fixed top-[88px] left-4 right-4 z-40 rounded-xl bg-base-100 border border-base-300 shadow-xl md:hidden bg-black">
          <ul className="flex flex-col p-4 gap-4">
            {navItems.map(({ label, href, id }) => {
              const isActive = activeSection === id
              return (
                <li key={href} onClick={handleLinkClick}>
                  <Link
                    href={href}
                    className={`block w-full rounded-md px-4 py-2 text-center text-lg transition-all duration-300 hover:text-accent ${isActive
                      ? 'font-bold text-accent bg-base-300/90'
                      : 'text-white'
                      }`}
                  >
                    {label}
                  </Link>
                </li>
              )
            })}
            <li>
              <a
                href="mailto:waseeurrehmanch@gmail.com"
                onClick={handleLinkClick}
                className="block w-full rounded-lg bg-accent px-4 py-3 text-center text-sm font-medium text-accent-content shadow-lg hover:bg-accent/90 transition"
              >
                waseeurrehmanch@gmail.com
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  )
}

export default Navbar