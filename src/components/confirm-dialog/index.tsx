import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material'
import { FC } from 'react'

type ConfirmDialogProps = {
  open?: boolean
  title?: string
  content?: string
  handleClose?: () => void
  handleAgree?: () => void
}

const ConfirmDialog: FC<ConfirmDialogProps> = ({
  open = false,
  title = 'Are you sure?',
  content = 'Are you sure?',
  handleClose = () => {},
  handleAgree = () => {}
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Disagree</Button>
        <Button color="error" onClick={handleAgree || handleClose} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmDialog
