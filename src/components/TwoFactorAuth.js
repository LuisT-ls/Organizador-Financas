import React from 'react'
import {
  getAuth,
  signInWithPhoneNumber,
  RecaptchaVerifier
} from 'firebase/auth'

function TwoFactorAuth() {
  const auth = getAuth()

  const setupRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      'recaptcha-container',
      {
        size: 'invisible',
        callback: response => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          onSignInSubmit()
        }
      },
      auth
    )
  }

  const onSignInSubmit = () => {
    setupRecaptcha()
    const phoneNumber = '+123456789'
    const appVerifier = window.recaptchaVerifier
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then(confirmationResult => {
        const code = window.prompt(
          'Please enter the verification code that was sent to your mobile device.'
        )
        return confirmationResult.confirm(code)
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <div>
      <div id="recaptcha-container"></div>
      <button onClick={onSignInSubmit}>Sign in with phone number</button>
    </div>
  )
}

export default TwoFactorAuth
