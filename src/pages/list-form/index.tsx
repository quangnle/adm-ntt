import { useEffect, useState } from 'react'
import moment from 'moment'
import { IconButton, Stack, Typography } from '@mui/material'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import DeleteIcon from '@mui/icons-material/Delete'
import { deleteListForm, getListForm } from '@/api/form'

type IForm = {
  id: number
  email: string
  subject: string
  body: string
  phone: string
  created_at: string
  updated_at: string
}
function createData(form: IForm) {
  const { id, email, subject, body, phone, created_at, updated_at } = form
  return { id, email, subject, body, phone, created_at, updated_at }
}

export default function ListFormPage() {
  const [form, setForm] = useState<IForm[]>([])
  const [open, setOpen] = useState(false)
  const [idSubscriberCurrent, setIdSubscriberCurrent] = useState<{
    id: number
    email: string
  }>()

  const handleClickOpen = (id: number, email: string) => {
    setOpen(true)
    setIdSubscriberCurrent({ id: id, email })
  }

  const handleClose = () => {
    setOpen(false)
  }

  const onDeleteSubscriber = async () => {
    try {
      if (idSubscriberCurrent?.id) {
        await deleteListForm(idSubscriberCurrent?.id)
        location.reload()
      }
    } catch (error) {
      console.log(error)
    }
  }
  const fetchApi = async () => {
    try {
      const { data } = await getListForm()
      const newForm = data.map((item: IForm) => createData(item))
      setForm(newForm)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchApi()
  }, [])

  return (
    <Stack sx={{ width: '100%', pt: 2 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h3" mb={2}>
          List Form
        </Typography>
      </Stack>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead style={{ background: 'black' }}>
              <TableRow>
                <TableCell align="left" style={{ color: 'white' }}>
                  ID
                </TableCell>
                <TableCell align="left" style={{ color: 'white' }}>
                  Email
                </TableCell>
                <TableCell align="left" style={{ color: 'white' }}>
                  Subject
                </TableCell>
                <TableCell align="left" style={{ color: 'white' }}>
                  Message
                </TableCell>
                <TableCell align="left" style={{ color: 'white' }}>
                  Phone
                </TableCell>
                <TableCell align="left" style={{ color: 'white' }}>
                  Date Created
                </TableCell>
                <TableCell align="center" style={{ color: 'white' }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {form.map((row, index) => (
                <TableRow
                  style={{ background: index % 2 == 0 ? '#edeef0' : '' }}
                  key={row?.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="left">{row?.id}</TableCell>
                  <TableCell align="left">{row?.email}</TableCell>
                  <TableCell align="left">{row?.subject}</TableCell>
                  <TableCell align="left">{row?.body}</TableCell>
                  <TableCell align="left">{row?.phone}</TableCell>
                  <TableCell align="left">
                    {moment(row?.created_at).format('MMMM Do YYYY, h:mm:ss A')}
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleClickOpen(row?.id, row?.email)}
                  >
                    <IconButton>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {'Delete Subscriber!'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure ? Remove this message of
              <span style={{ color: 'seagreen', paddingLeft: '5px' }}>
                {idSubscriberCurrent?.email}
              </span>
              ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button onClick={onDeleteSubscriber} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </Stack>
  )
}
