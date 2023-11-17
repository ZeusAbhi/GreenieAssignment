import { useState } from 'react'

export default function Create() {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  // status can be 'not-submitted', 'loading', 'error', or 'done'
  // not-submitted is the default state
  // loading is when the form is being submitted
  // error is when the form submission fails
  // done is when the form submission succeeds
  const [status, setStatus] = useState<'not-submitted' | 'loading' | 'error' | 'done'>('not-submitted')

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('loading')
    try {
      fetch('/api/create', {
        method: 'POST',
        body: JSON.stringify({
          userName,
          password
        })
      }).then(async (res) => {
        setStatus('done')
      })
    } catch (e) {
      setStatus('error')
    }
  }
  return (
    <>
      <form className='md:max-w-md w-full flex flex-col' onSubmit={submitForm}>
        {status === 'done' && <div className='bg-green-200 dark:bg-green-700 text-green-800 dark:text-green-200 p-4 rounded-md'>User created successfully!</div>}
        {status === 'error' && <div className='bg-red-200 dark:bg-red-700 text-red-800 dark:text-red-200 p-4 rounded-md'>There was an error creating the user.</div>}
        <div className='flex flex-col gap-2 p-4'>
          <label className='text-gray-500 dark:text-white'>Username</label>
          <input className='px-4 py-2 border bg-gray-50 dark:bg-slate-800 border-gray-200 dark:border-slate-600 rounded-md outline-none' placeholder='Username' />
        </div>
        <div className='flex flex-col gap-2 p-4'>
          <label className='text-gray-500 dark:text-white'>Password</label>
          <input className='px-4 py-2 border bg-gray-50 dark:bg-slate-800 border-gray-200 dark:border-slate-600 rounded-md outline-none' placeholder='Password' />
        </div>
        <button className='px-4 py-2 bg-gray-200 dark:bg-slate-700 rounded-md mx-4 disabled:bg-gray-300 disabled:dark:bg-slate-800' disabled={status == 'loading'}>
          {status == 'loading' ? 'Loading' : 'Create User'}
        </button>
      </form>
    </>
  )
}
