import { useEffect, useState } from 'react'
import { Stack, Typography } from '@mui/material'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { getListEmail } from '@/api/email'

type IEmail = {
  id: number
  email: string
  created_at: string
  updated_at: string
}
export default function ListEmailPage() {
  function createData(
    id: number,
    email: string,
    created_at: string,
    updated_at: string
  ) {
    return { id, email, created_at, updated_at }
  }

  const [email, setEmail] = useState<IEmail[]>([])

  const fetchApi = async () => {
    try {
      const { data } = await getListEmail()
      console.log(data)
      const newEmail = data.map((item: IEmail) =>
        createData(item?.id, item?.email, item?.created_at, item?.updated_at)
      )
      console.log(newEmail)
      setEmail(newEmail)
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
          List Email
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
                  Date Created
                </TableCell>
                <TableCell align="left" style={{ color: 'white' }}>
                  Date Updated
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {email.map((row, index) => (
                <TableRow
                  style={{ background: index % 2 == 0 ? '#edeef0' : '' }}
                  key={row?.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="left">{row?.id}</TableCell>
                  <TableCell align="left">{row?.email}</TableCell>
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
