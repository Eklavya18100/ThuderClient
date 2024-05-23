import { Outlet } from 'react-router-dom'
import Sidebar from './sidebar'
import useIsCollapsed from '@/hooks/use-is-collapsed'
import Modal from '@/components/login'
import { useState } from 'react'
import { verifyEmailPassword } from '@/Actions/Login'

export default function AppShell() {
  const [isCollapsed, setIsCollapsed] = useIsCollapsed()
  const [modal, setModal] = useState(true)
  const loading = true
  const [loginValues, setLoginValues] = useState<any>({
    email: '',
    password: '',
  })
  const handleChange = (e: any) => {
    setLoginValues({ ...loginValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    const email = loginValues.email
    const password = loginValues.password

    verifyEmailPassword(email, password)
      .then((data) => {
        if (data.success) {
          localStorage.setItem('user_id', data.user_id)
          console.log('Verification successful:', data)
        } else console.error('Verification failed:')
      })
      .catch((error) => {
        console.error('Verification failed:', error)
      })
    setModal(false)
  }

  return (
    <div className='relative h-full overflow-hidden bg-background'>
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      <main
        id='content'
        className={`overflow-x-hidden pt-16 transition-[margin] md:overflow-y-hidden md:pt-0 ${isCollapsed ? 'md:ml-14' : 'md:ml-64'} h-full`}
      >
        {localStorage.getItem('user_id') == null ? ( //!replace it with jwtcode(token)
          <Modal
            modal={modal}
            setModal={setModal}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            loading={loading}
          />
        ) : (
          ''
        )}
        <Outlet />
      </main>
    </div>
  )
}
