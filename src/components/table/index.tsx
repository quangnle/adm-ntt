import {
  Checkbox,
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
import { useEffect, useState } from 'react'

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
  selectable?: boolean
  onChangeSelection?: (selected: number[]) => void
}

const MyTable = (props: TMyTable) => {
  const {
    data,
    columns,
    loading = false,
    selectable = false,
    onChangeSelection
  } = props

  const [selected, setSelected] = useState<number[]>([])

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = data.map((n) => n.id)
      setSelected(newSelected)
      return
    }
    setSelected([])
  }

  const handleSelectOneClick = (_: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id)
    let newSelected: number[] = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }

    setSelected(newSelected)
  }

  useEffect(() => {
    onChangeSelection && onChangeSelection(selected)
  }, [selected])

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} stickyHeader>
        <TableHead>
          <TableRow>
            {selectable && (
              <StyledTableCell padding="checkbox">
                <Checkbox
                  checked={data.length > 0 && selected.length === data.length}
                  onChange={handleSelectAllClick}
                />
              </StyledTableCell>
            )}
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
                  {selectable && (
                    <StyledTableCell padding="checkbox">
                      <Checkbox
                        checked={selected.includes(row.id)}
                        onClick={(event) => handleSelectOneClick(event, row.id)}
                      />
                    </StyledTableCell>
                  )}
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
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
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
