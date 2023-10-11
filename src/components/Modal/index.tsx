import React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { makeStyles } from '@mui/styles'

interface ModalProps {
  open: boolean
  onClose: () => void
  title: React.ReactElement | string
  children: React.ReactElement
}

const useStyles = makeStyles(() => ({
  modalContainer: {
    '& .MuiPaper-root': {
      overflow: 'hidden',
    },
  },
}))

const Modal = ({ open, onClose, title, children }: ModalProps) => {
  const classes = useStyles()

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      className={classes.modalContainer}
    >
      <DialogTitle>
        {title}
        <IconButton
          edge="end"
          color="inherit"
          onClick={onClose}
          aria-label="close"
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            paddingRight: '15px',
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  )
}

export default Modal
