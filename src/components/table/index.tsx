import {
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableCellProps,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import { styled } from '@mui/material/styles'

export type TMyTableColumns = {
  key: string
  header?: string | JSX.Element
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value?: (data: any) => JSX.Element | string | JSX.Element

  tableCellSX?: TableCellProps
}

export type TMyTable = {
  columns: TMyTableColumns[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[]
  loading?: boolean
}

const MyTable = (props: TMyTable) => {
  const { data, columns, loading = false } = props
  return (
    <TableContainer component={Paper} style={{ maxHeight: '80vh' }}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table" stickyHeader>
        <TableHead>
          <TableRow>
            {columns?.map((col: TMyTableColumns) => (
              <StyledTableCell key={col.key} {...col.tableCellSX}>
                {col?.header || col?.key}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <Stack component="tr" justifyContent="center" p={3}>
              <td>
                <CircularProgress />
              </td>
            </Stack>
          ) : (
            <>
              {data?.map((row, index: number) => (
                <StyledTableRow key={`row-[${row.id || index}]`}>
                  {columns?.map((col) => (
                    <StyledTableCell
                      key={`cell-[${col.key}]-${index}`}
                      {...col.tableCellSX}
                    >
                      {(col?.value && col?.value(row)) || row[col.key]}
                    </StyledTableCell>
                  ))}
                </StyledTableRow>
              ))}
            </>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    height: 40,
    fontSize: 16
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0
  }
}))

export default MyTable
