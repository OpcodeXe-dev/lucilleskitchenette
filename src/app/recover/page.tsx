'use client'

import IsLoggedIn from '@/utils/IsloggedIn'
import supabase from '@/utils/Supabase'
import { useEffect, useState } from 'react'


const ResetPassword: React.FC = () => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isError, setError] = useState('')
  const [loadingPass, setLoadingPass] = useState(false)
  const [successText, setSuccessText] = useState('')
  const [user] = IsLoggedIn()

  const resetPassword = async () => {
    if (loadingPass) return
    setLoadingPass(true)

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.")
      setLoadingPass(false)
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      setLoadingPass(false)
      return
    }

    const hasUpperCase = /[A-Z]/.test(password)
    const hasLowerCase = /[a-z]/.test(password)
    const hasNumber = /\d/.test(password)
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

    if (!hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecialChar) {
      setError('Password must include upper, lower, number, and special char.')
      setLoadingPass(false)
      return
    }

    try {
      const { data, error } = await supabase.auth.updateUser({ password })

      if (error || !user) {
        console.error(error)
        setError(user ? 'Error resetting password' : 'You are not authenticated')
      } else {
        setSuccessText('Password reset successfully')
      }

    } catch (error) {
      console.error(error)
      setError(user ? 'Error resetting password' : 'You are not authenticated')
    } finally {
      setLoadingPass(false)
    }
  }

  useEffect(() => {
    if (isError) {
      const timer = setTimeout(() => setError(''), 5000)
      return () => clearTimeout(timer)
    }
  }, [isError])

  useEffect(() => {
    if (successText) {
      const timer = setTimeout(() => setSuccessText(''), 5000)
      return () => clearTimeout(timer)
    }
  }, [successText])

  return (
    <div className='w-full h-screen p-4 flex items-center justify-center bg-white'>
      <div className='w-full max-w-sm p-6 rounded-xl bg-white  text-black shadow-xl'>

        <h1 className='text-center font-bold text-xl mb-6'>Reset Password</h1>

        <input
          type='password'
          placeholder='New Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='w-full mb-4 p-3 rounded border border-gray-300 focus:outline-yellow-500 bg-white'
        />

        <input
          type='password'
          placeholder='Confirm Password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className='w-full mb-4 p-3 rounded border border-gray-300 focus:outline-yellow-500 bg-white'
        />

        {isError && (
          <div className='w-full mb-3 bg-red-500 text-white text-sm p-2 rounded flex items-center gap-2'>
          {isError}
          </div>
        )}

        {successText && (
          <div className='w-full mb-3 bg-green-600 text-white text-sm p-2 rounded'>
            {successText}
          </div>
        )}

        <button
          onClick={resetPassword}
          className='w-full flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 text-white font-semibold p-3 rounded transition-colors'
        >
          {loadingPass ? <div className='w-5 h-5'>loading...</div> : 'Reset Password'}
        </button>
      </div>
    </div>
  )
}

export default ResetPassword
