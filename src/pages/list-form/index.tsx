import { useEffect, useState } from 'react'
import { Stack, Typography } from '@mui/material'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { getListForm } from '@/api/form'

type IForm = {
  id: number
  email: string
  subject: string
  body: string
  phone: string
  created_at: string
  updated_at: string
}
export default function ListFormPage() {
  function createData(
    id: number,
    email: string,
    subject: string,
    body: string,
    phone: string,
    created_at: string,
    updated_at: string
  ) {
    return { id, email, subject, body, phone, created_at, updated_at }
  }

  const [form, setForm] = useState<IForm[]>([])

  const fetchApi = async () => {
    try {
      const { data } = await getListForm()
      console.log(data)
      const newForm = data.map((item: IForm) =>
        createData(
          item?.id,
          item?.email,
          item?.subject,
          item?.body,
          item?.phone,
          item?.created_at,
          item?.updated_at
        )
      )
      console.log(newForm)
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
            <TableHead>
              <TableRow>
                <TableCell>id</TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">Subject</TableCell>
                <TableCell align="left">Message</TableCell>
                <TableCell align="left">Phone</TableCell>
                <TableCell align="left">Date Created</TableCell>
                <TableCell align="left">Date Updated</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {form.map((row) => (
                <TableRow
                  key={row?.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="left">{row?.id}</TableCell>
                  <TableCell align="left">{row?.email}</TableCell>
                  <TableCell align="left">{row?.subject}</TableCell>
                  <TableCell align="left">{row?.body}</TableCell>
                  <TableCell align="left">{row?.phone}</TableCell>
                  <TableCell align="left">{row?.created_at}</TableCell>
                  <TableCell align="left">{row?.updated_at}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </Stack>
  )
}
