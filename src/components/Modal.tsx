import { useEffect } from "react"

const Modal: React.FC<{ visible: boolean, children: React.ReactNode, onClose?: () => any, closeFunction?: () => any }> = ({ visible, children, onClose, closeFunction }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (closeFunction) closeFunction()
        if (onClose) onClose()
      }
    }
    window.addEventListener('keydown', handleEsc)
    return () => {
      window.removeEventListener('keydown', handleEsc)
    }
  }, [])
  return (
    <>
      {
        visible && <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center'>
          <div className='bg-white dark:bg-slate-950 rounded-md shadow-md p-4'>
            {children}
          </div>
        </div>
      }
    </>
  )
}

export default Modal;
