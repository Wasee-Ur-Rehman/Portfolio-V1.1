'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { BurgerIcon, CloseIcon } from '../../utils/icons' // Assuming these paths are correct
import Logo from './Logo' // Assuming Logo component exists

// navItems configuration remains the same
const navItems = [
  {
    label: 'Home',
    href: '/#home',
    id: 'home',
  },
  {
    label: 'Projects',
    href: '/#projects',
    id: 'projects',
  },
  {
    label: 'Services',
    href: '/#services',
    id: 'services',
  },
  {
    label: 'Contact',
    href: '/#contact',
    id: 'contact',
  },
]

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [theme, setTheme] = useState('dark')

  const toggleMenu = () => {
    setIsVisible(!isVisible)
  }

  const handleLinkClick = () => {
    if (window.innerWidth < 768) {
      setIsVisible(false)
    }
  }

  // Effect to track the current theme
  useEffect(() => {
    const initialTheme = document.documentElement.getAttribute('data-theme')
    if (initialTheme) {
      setTheme(initialTheme)
    }

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.attributeName === 'data-theme') {
          const newTheme = document.documentElement.getAttribute('data-theme')
          if (newTheme) {
            setTheme(newTheme)
          }
        }
      }
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })

    return () => observer.disconnect()
  }, [])

  // Effect for active link highlighting
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
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

  // This boolean determines if the special text color should be used.
  // It's defined once here to be used for both the brand name and nav links.
  const useBlackText = theme === 'light' || theme === 'retro'

  return (
    <nav className="fixed top-0 left-0 z-50 w-full px-4 py-3 md:py-4">
      <div className="bg-base-100/90 backdrop-blur-sm border-base-200 mx-auto flex h-full max-w-[1200px] items-center justify-between rounded-xl border p-4 shadow-lg">
        <Link href="/">
          <div className="flex items-center gap-2">
            <Logo />
            {/* 
              THE FIX: The same conditional logic is now applied to the brand name.
              It will now be black in light/retro modes and theme-colored in all others.
            */}
            <span
              className={`font-sans text-xl font-bold transition-colors duration-300 ${useBlackText ? 'text-black' : 'text-base-content'
                }`}
            >
              Wasee-Ur-Rehman
            </span>
          </div>
        </Link>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={toggleMenu} aria-label="Toggle Menu">
            <CloseIcon className={`h-6 w-6 text-base-content ${isVisible ? 'block' : 'hidden'}`} />
            <BurgerIcon className={`h-6 w-6 text-base-content ${isVisible ? 'hidden' : 'block'}`} />
          </button>
        </div>

        {/* Navigation Container */}
        <div
          className={`${isVisible ? 'flex' : 'hidden'} 
            animate-fade-in absolute left-0 top-full mt-4 w-full flex-col gap-y-6 rounded-xl border border-base-300 bg-base-200 p-6 shadow-lg 
            md:static md:mt-0 md:flex md:w-auto md:flex-row md:items-center md:gap-x-6 md:border-none md:bg-transparent md:p-0 md:shadow-none`}
        >
          <ul className="flex w-full flex-col gap-y-4 md:w-auto md:flex-row md:gap-x-2">
            {navItems.map(({ label, href, id }) => {
              const isActive = activeSection === id
              return (
                <li key={href} onClick={handleLinkClick} className="w-full text-center md:w-auto">
                  <Link
                    href={href}
                    className={`block w-full rounded-md px-4 py-2 font-sans text-lg transition-all duration-300 hover:text-accent md:py-1 md:text-base ${isActive
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
            onClick={handleLinkClick}
            className="w-full cursor-pointer rounded-lg bg-accent px-4 py-3 text-center text-sm font-medium text-accent-content
                       shadow-lg shadow-accent/20 transition-all duration-300 ease-out hover:scale-105 hover:bg-accent/90 
                       hover:shadow-xl hover:shadow-accent/30 active:scale-95 active:shadow-md md:w-auto md:ml-4"
          >
            waseeurrehmanch@gmail.com
          </a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar