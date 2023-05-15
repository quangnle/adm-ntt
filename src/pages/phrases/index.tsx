import React, { useEffect, useMemo, useState } from 'react'
import MyTable, { TMyTableColumns } from '@/components/table'
import {
  Button,
  Drawer,
  IconButton,
  Pagination,
  Stack,
  Typography,
  debounce
} from '@mui/material'

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import useDrawer from '@/hooks/useDrawer'
import CreateGroup from './create'
import MyTextField from '@/components/form/MyTextField'
import ConfirmDialog from '@/components/confirm-dialog'
import variableService from '@/api/variable'

const DEFAULT_PAGINATION = {
  page: 1,
  total: 1,
  perPage: 10
}

type IForm = {
  id: number
  name: string
  value: string
  lang: string
  group: string
  created_at: string
  updated_at: string
}

export default function PhrasesPage() {
  const [groupList, setGroupList] = useState<IForm[]>([])
  const [pagination, setPagination] = useState(DEFAULT_PAGINATION)

  const [selectedProduct, setSelectProduct] = useState<IForm | null>(null)
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const [searchLabel, setSearchLabel] = useState('')
  const [searchGroup, setSearchGroup] = useState()
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showDeleteOneModal, setShowDeleteOneModal] = useState<IForm | null>(
    null
  )
  const [showDrawer, toggleDrawer, setShowDrawer] = useDrawer()

  const fetchGroup = async () => {
    try {
      const fetchData = await variableService.getAll({
        page: pagination.page,
        per_page: pagination.perPage,
        search: searchLabel === '' ? undefined : searchLabel,
        group: searchGroup === '' ? undefined : searchGroup
      })
      if (fetchData) {
        const { data: list, ...pagi } = fetchData
        setGroupList(list as IForm[])
        setPagination(pagi)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchGroup()
  }, [searchLabel, searchGroup, pagination.page])

  const handleChangePagination = (
    _: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPagination((prev) => ({ ...prev, page: value }))
  }

  const columns: TMyTableColumns[] = useMemo(() => {
    return [
      { key: 'id', header: '#ID' },
      {
        key: 'name',
        header: 'Name'
      },
      {
        key: 'value',
        header: 'Value'
      },
      {
        key: 'lang',
        header: 'Lang'
      },
      {
        key: 'group',
        header: 'Group'
      },
      {
        key: 'action',
        header: 'Action',
        value: (item: IForm) => (
          <Stack direction="row">
            <IconButton
              onClick={() => {
                setSelectProduct(item)
                setShowDrawer(true)
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => setShowDeleteOneModal(item)}>
              <DeleteIcon color="error" />
            </IconButton>
          </Stack>
        )
      }
    ]
  }, [groupList])

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false)
    setShowDeleteOneModal(null)
  }
  const handleConfirmDeleteOneModal = async () => {
    try {
      if (!showDeleteOneModal) return
      const { data } = await variableService.deleteVariable({
        ids: [showDeleteOneModal?.id]
      })
      if (data) {
        handleCloseDeleteModal()
        fetchGroup()
      }
    } catch (error) {
      console.log(error)
    }
  }
  const handleConfirmDeleteMultiModal = async () => {
    try {
      const { data } = await variableService.deleteVariable({
        ids: selectedIds
      })
      if (data) {
        handleCloseDeleteModal()
        fetchGroup()
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Stack pt={2}>
      <ConfirmDialog
        open={showDeleteOneModal !== null}
        content="Are you sure to delete selected group?"
        handleClose={handleCloseDeleteModal}
        handleAgree={handleConfirmDeleteOneModal}
      />
      <ConfirmDialog
        open={showDeleteModal}
        content="Are you sure to delete all selected group?"
        handleClose={handleCloseDeleteModal}
        handleAgree={handleConfirmDeleteMultiModal}
      />
      <Typography variant="h3" mb={2}>
        Phrases
      </Typography>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack ml={2} sx={{ width: 300 }}>
            <MyTextField
              style={{ marginBottom: 0 }}
              onChange={debounce((e) => setSearchGroup(e.target.value), 300)}
              fullWidth
              label="Group"
              placeholder="Enter group name"
              name="group"
            />
          </Stack>
          <Stack ml={2} sx={{ width: 300 }}>
            <MyTextField
              style={{ marginBottom: 0 }}
              onChange={debounce((e) => setSearchLabel(e.target.value), 300)}
              fullWidth
              label="Name"
              placeholder="Enter Phrase name"
              name="name"
            />
          </Stack>
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
        >
          <Button
            style={{ margin: '16px 0', marginRight: 16 }}
            color="error"
            variant="outlined"
            sx={{ mb: 2 }}
            disabled={selectedIds.length == 0}
            onClick={() => setShowDeleteModal(true)}
          >
            Delete
          </Button>
          <Button
            style={{ margin: '16px 0' }}
            variant="outlined"
            sx={{ mb: 2 }}
            onClick={() => {
              setSelectProduct(null)
              setShowDrawer(true)
            }}
          >
            Create New Phrase
          </Button>
        </Stack>
      </Stack>

      <MyTable
        data={groupList}
        columns={columns}
        selectable
        onChangeSelection={setSelectedIds}
      />

      <Pagination
        sx={{ mt: 2, mx: 'auto' }}
        count={Math.ceil(pagination.total / pagination.perPage)}
        page={pagination.page}
        onChange={handleChangePagination}
      />

      <Drawer
        anchor="right"
        open={showDrawer}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            width: 600
          }
        }}
      >
        <CreateGroup
          data={selectedProduct}
          onSuccess={() => {
            setShowDrawer(false)
            fetchGroup()
          }}
        />
      </Drawer>
    </Stack>
  )
}
