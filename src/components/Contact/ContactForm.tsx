'use client'

import { useRef, useState } from 'react'
import Button from '../UI/Button'
import Input from '../UI/Input'
import Textarea from '../UI/Textarea'

const ContactForm = () => {
  const formRef = useRef<HTMLFormElement>(null)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = formRef.current
    if (form) {
      fetch('https://formspree.io/f/mldrrqlg', {
        method: 'POST',
        body: new FormData(form),
        headers: {
          Accept: 'application/json',
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.ok || data.success) {
            setSubmitted(true)
          } else {
            alert('There was an error submitting the form. Please try again.')
          }
        })
        .catch(() => {
          alert('Something went wrong. Please check your connection or try again later.')
        })
    }
  }

  return submitted ? (
    <p className="text-accent self-center text-center text-2xl font-medium">
      Thank you! Your message has been sent.
    </p>
  ) : (
    <form ref={formRef} onSubmit={handleSubmit}>
      <Input label="Full name" id="name" name="name" placeholder="Your name here" required />
      <Input
        label="Email address"
        id="email"
        type="email"
        name="email"
        placeholder="Your email address here"
        required
      />
      <Input label="Subject" id="subject" name="subject" placeholder="Your subject here" />
      <Textarea
        label="Message"
        id="message"
        name="message"
        placeholder="Your message here"
        rows={7}
        required
      />
      <Button text="Submit" />
    </form>
  )
}

export default ContactForm
