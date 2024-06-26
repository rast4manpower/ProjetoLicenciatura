import { useCallback, useState } from 'react'

const useModal = (initialState = false) => {
  const [open, setState] = useState(initialState)

  const handleClose = useCallback(() => setState(false), [])

  const handleOpen = useCallback(() => setState(true), [])

  return {
    open,
    handleOpen,
    handleClose,
  }
}

export default useModal
