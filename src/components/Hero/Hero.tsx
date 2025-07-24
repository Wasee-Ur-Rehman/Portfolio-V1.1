'use client'
import useRoleSwitcher from '@/hooks/useRoleSwitcher'
import useRotatingAnimation from '@/hooks/useRotatingAnimation'
import Image from 'next/image'
import { HeroImage } from '../../utils/images'
import Ellipse from './Ellipse'

const Hero = () => {
  const ellipseRef = useRotatingAnimation()
  const role = useRoleSwitcher({ roles: ['SOFTWARE ENGINEER', 'AI AUTOMATION SPECIALIST', 'FULL STACK DEVELOPER'] })

  return (
    <section className="bg-primary bg-small-glow bg-small-glow-position md:bg-large-glow-position lg:bg-large-glow min-h-[calc(dvh-4rem)] bg-no-repeat">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-4 px-4 pt-12 pb-10 md:grid-cols-2 lg:p-4">
        <div className="flex min-h-48 flex-col justify-between lg:min-h-56 lg:max-w-[33.75rem]">
          <h1>
            <span className="text-neutral mb-2 block text-3xl font-bold">Hi - I'm Wasee Ur Rehman</span>
            <span className="text-accent block text-[1.75rem] font-bold">{role}</span>
          </h1>

          <h2 className="text-neutral mt-3">
            Delivering innovative software solutions and intelligent automation systems for modern businesses
          </h2>

          <div className="mt-6 flex flex-wrap gap-6">
            <a
              href="#contact"
              aria-label="Contact me"
              className="bg-accent min-w-32 cursor-pointer rounded-lg px-[14px] py-[10px] text-center text-sm font-medium text-[#00071E] 
                         shadow-lg shadow-accent/20 transition-all duration-500 ease-out 
                         hover:shadow-xl hover:shadow-accent/30 hover:scale-105 hover:bg-accent/90 
                         active:scale-95 active:shadow-md">
              Get in Touch
            </a>
            <a
              href="/WaseeUrRehman_Resume.pdf"
              download="WaseeUrRehman_Resume.pdf"
              aria-label="Download Resume"
              className="group text-accent bg-transparent border-2 border-accent cursor-pointer rounded-lg px-[14px] py-[10px] text-sm font-medium
                         shadow-lg shadow-accent/10 transition-all duration-500 ease-out 
                         hover:bg-accent hover:text-[#00071E] hover:shadow-xl hover:shadow-accent/30 hover:scale-105
                         active:scale-95 active:shadow-md">
              Download Resume
            </a>
          </div>

          <div className="mt-4 flex gap-4">
            <a
              href="https://linkedin.com/in/wasee-ur-rehman"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="group flex h-12 w-12 items-center justify-center rounded-full border-2 border-accent 
                         shadow-lg shadow-accent/20 transition-all duration-500 ease-out 
                         hover:bg-accent hover:shadow-xl hover:shadow-accent/30 hover:scale-110 
                         active:scale-95 active:shadow-md">
              <svg
                className="h-6 w-6 text-accent transition-all duration-500 ease-out group-hover:text-[#00071E] group-hover:scale-105"
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a
              href="https://github.com/Wasee-Ur-Rehman"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="group flex h-12 w-12 items-center justify-center rounded-full border-2 border-accent 
                         shadow-lg shadow-accent/20 transition-all duration-500 ease-out 
                         hover:bg-accent hover:shadow-xl hover:shadow-accent/30 hover:scale-110 
                         active:scale-95 active:shadow-md">
              <svg
                className="h-6 w-6 text-accent transition-all duration-500 ease-out group-hover:text-[#00071E] group-hover:scale-105"
                viewBox="0 0 24 25"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12.0099 0.548676C5.36875 0.548676 0 5.957 0 12.6478C0 17.9962 3.43994 22.5234 8.21205 24.1258C8.80869 24.2462 9.02724 23.8655 9.02724 23.5451C9.02724 23.2646 9.00757 22.3032 9.00757 21.3014C5.6667 22.0227 4.97099 19.8591 4.97099 19.8591C4.43409 18.4569 3.63858 18.0965 3.63858 18.0965C2.54511 17.3553 3.71823 17.3553 3.71823 17.3553C4.93117 17.4354 5.56763 18.5972 5.56763 18.5972C6.64118 20.44 8.37111 19.9193 9.06706 19.5988C9.16638 18.8175 9.48473 18.2767 9.82275 17.9763C7.15817 17.6958 4.35469 16.6542 4.35469 12.0067C4.35469 10.6846 4.8316 9.60295 5.58729 8.76171C5.46807 8.4613 5.0504 7.21911 5.70677 5.55654C5.70677 5.55654 6.72083 5.23597 9.00732 6.79849C9.98625 6.53364 10.9958 6.39892 12.0099 6.39778C13.024 6.39778 14.0577 6.53815 15.0123 6.79849C17.299 5.23597 18.3131 5.55654 18.3131 5.55654C18.9695 7.21911 18.5515 8.4613 18.4323 8.76171C19.2079 9.60295 19.6652 10.6846 19.6652 12.0067C19.6652 16.6542 16.8617 17.6756 14.1772 17.9763C14.6148 18.3568 14.9924 19.0779 14.9924 20.2197C14.9924 21.8422 14.9727 23.1444 14.9727 23.5449C14.9727 23.8655 15.1915 24.2462 15.7879 24.126C20.56 22.5232 23.9999 17.9962 23.9999 12.6478C24.0196 5.957 18.6312 0.548676 12.0099 0.548676Z"
                />
              </svg>
            </a>
          </div>
        </div>

        <div className="flex min-h-[18.75rem] items-center justify-center lg:min-h-[35rem]">
          <div className="text-accent relative size-56 sm:size-60 md:size-[20rem] lg:size-[25.75rem]">
            <Image
              src={HeroImage}
              fill={true}
              priority={true}
              sizes="(min-width: 1024px) 25.75rem, (min-width: 768px) 20rem, (min-width: 640px) 15rem, 14rem"
              alt="Wasee Ur Rehman - Software Engineer & Full Stack Developer"
              className="object-cover rounded-full p-2"
            />
            <Ellipse
              ref={ellipseRef}
              className="absolute top-0 left-0 size-56 transition-transform duration-500 ease-out sm:size-60 md:size-[20rem] lg:size-[25.75rem]"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
