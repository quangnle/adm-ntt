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
import { ICategory } from '@/constants/types'

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import useDrawer from '@/hooks/useDrawer'
import CreateProduct from './create'
import categoryService from '@/api/category'
import MyTextField from '@/components/form/MyTextField'
import ConfirmDialog from '@/components/confirm-dialog'

const DEFAULT_PAGINATION = {
  page: 1,
  total: 1,
  perPage: 10
}

export default function CategoryPage() {
  const [categoriesList, setCategoriesList] = useState<ICategory[]>([])
  const [pagination, setPagination] = useState(DEFAULT_PAGINATION)
  const [searchTitle, setSearchTitle] = useState('')
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showDeleteOneModal, setShowDeleteOneModal] =
    useState<ICategory | null>(null)

  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(
    null
  )
  const [selectedIds, setSelectedIds] = useState<number[]>([])

  const [showDrawer, toggleDrawer, setShowDrawer] = useDrawer()

  const fetchCategories = async () => {
    try {
      const fetchData = await categoryService.getAll({
        page: pagination.page,
        per_page: pagination.perPage,
        title: searchTitle
      })
      if (fetchData) {
        setCategoriesList(fetchData?.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [searchTitle, pagination.page])

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
        key: 'title',
        header: 'Title',
        value: (item: ICategory) => (
          <Stack direction="row" alignItems="center" columnGap={2}>
            <p>{item.title}</p>
          </Stack>
        )
      },
      {
        key: 'description',
        header: 'Description'
      },
      {
        key: 'thumbnail',
        header: 'Thumbnail',
        value: (item: ICategory) => (
          <Stack direction="row" alignItems="center" columnGap={2}>
            {item.thumbnail && (
              <img src={item.thumbnail} alt="" style={{ maxWidth: 100 }} />
            )}
          </Stack>
        )
      },
      {
        key: 'background',
        header: 'Background',
        value: (item: ICategory) => (
          <Stack direction="row" alignItems="center" columnGap={2}>
            {item.background && (
              <img src={item.background} alt="" style={{ maxWidth: 100 }} />
            )}
          </Stack>
        )
      },
      {
        key: 'action',
        header: 'Action',
        value: (item: ICategory) => (
          <Stack direction="row">
            <IconButton
              onClick={() => {
                setSelectedCategory(item)
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
  }, [categoriesList])
  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false)
    setShowDeleteOneModal(null)
  }
  const handleConfirmDeleteOneModal = async () => {
    try {
      if (!showDeleteOneModal) return
      const { data } = await categoryService.deleteMany({
        ids: [showDeleteOneModal?.id]
      })
      if (data) {
        handleCloseDeleteModal()
        fetchCategories()
      }
    } catch (error) {
      console.log(error)
    }
  }
  const handleConfirmDeleteMultiModal = async () => {
    try {
      const { data } = await categoryService.deleteMany({
        ids: selectedIds
      })
      if (data) {
        handleCloseDeleteModal()
        fetchCategories()
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Stack pt={2}>
      {' '}
      <ConfirmDialog
        open={showDeleteOneModal !== null}
        content="Are you sure to delete selected category?"
        handleClose={handleCloseDeleteModal}
        handleAgree={handleConfirmDeleteOneModal}
      />
      <ConfirmDialog
        open={showDeleteModal}
        content="Are you sure to delete all selected category?"
        handleClose={handleCloseDeleteModal}
        handleAgree={handleConfirmDeleteMultiModal}
      />
      <Typography variant="h3" mb={2}>
        Categories
      </Typography>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
      >
        {' '}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack ml={2} sx={{ width: 300 }}>
            <MyTextField
              style={{ marginBottom: 0 }}
              onChange={debounce((e) => setSearchTitle(e.target.value), 300)}
              fullWidth
              label="Title"
              placeholder="Enter category title"
              name="title"
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
              setSelectedCategory(null)
              setShowDrawer(true)
            }}
          >
            Create New Category
          </Button>
        </Stack>
      </Stack>
      <MyTable
        data={categoriesList}
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
        <CreateProduct
          data={selectedCategory}
          onSuccess={() => {
            setShowDrawer(false)
            fetchCategories()
          }}
        />
      </Drawer>
    </Stack>
  )
}
