import React, { useEffect, useMemo, useState } from 'react'
import MyTable, { TMyTableColumns } from '@/components/table'
import {
  Button,
  Drawer,
  IconButton,
  MenuItem,
  Pagination,
  SelectChangeEvent,
  Stack,
  Typography,
  debounce
} from '@mui/material'
import { IGroup, ICategory } from '@/constants/types'
import CustomSelect from '@/components/form/CustomSelect'
import { useLocation } from 'react-router-dom'

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import useDrawer from '@/hooks/useDrawer'
import categoryService from '@/api/category'
import groupService from '@/api/group'
import CreateGroup from './create'
import MyTextField from '@/components/form/MyTextField'
import ConfirmDialog from '@/components/confirm-dialog'

const DEFAULT_PAGINATION = {
  page: 1,
  total: 1,
  perPage: 10
}

export default function GroupPage() {
  const location = useLocation()

  const [categoriesList, setCategoriesList] = useState<ICategory[]>([])
  const [categoryId, setCategoryId] = useState(0)

  const [groupList, setGroupList] = useState<IGroup[]>([])
  const [pagination, setPagination] = useState(DEFAULT_PAGINATION)

  const [selectedProduct, setSelectProduct] = useState<IGroup | null>(null)
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const [searchLabel, setSearchLabel] = useState('')
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showDeleteOneModal, setShowDeleteOneModal] = useState<IGroup | null>(
    null
  )
  const [showDrawer, toggleDrawer, setShowDrawer] = useDrawer()

  const fetchCategories = async () => {
    try {
      const fetchData = await categoryService.getAll({ per_page: 1000 })
      if (fetchData) {
        setCategoriesList(fetchData?.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const fetchGroup = async () => {
    try {
      const fetchData = await groupService.getAll({
        category_id: categoryId == 0 ? undefined : categoryId,
        page: pagination.page,
        per_page: pagination.perPage,
        label: searchLabel
      })
      if (fetchData) {
        const { data: list, ...pagi } = fetchData
        setGroupList(list as IGroup[])
        setPagination(pagi)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    if (categoriesList?.length) {
      const searchParams = new URLSearchParams(location.search)
      setCategoryId(parseInt(searchParams.get('group') || '0') || 0)
    }
  }, [categoriesList])

  useEffect(() => {
    fetchGroup()
  }, [categoryId, searchLabel, pagination.page])

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
        key: 'image',
        header: 'Image',
        value: (item: IGroup) => (
          <Stack direction="row" alignItems="center" columnGap={2}>
            {item.image && (
              <img src={item.image} alt="" style={{ maxWidth: 100 }} />
            )}
          </Stack>
        )
      },
      {
        key: 'label',
        header: 'Label',
        value: (item: IGroup) => (
          <Stack direction="row" alignItems="center" columnGap={2}>
            <p>{item.label}</p>
          </Stack>
        )
      },
      {
        key: 'description',
        header: 'Description'
      },
      {
        key: 'category',
        header: 'Category',
        value: (item: IGroup) => (
          <Stack direction="row" alignItems="center" columnGap={2}>
            <p>
              {
                categoriesList.find(
                  (category) => category.id == item.category_id
                )?.title
              }
            </p>
          </Stack>
        )
      },
      {
        key: 'action',
        header: 'Action',
        value: (item: IGroup) => (
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
      const { data } = await groupService.deleteMany({
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
      const { data } = await groupService.deleteMany({
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
        Groups
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
          <CustomSelect
            label="Category"
            value={categoryId}
            onChange={(event: SelectChangeEvent<unknown>) => {
              setCategoryId(parseInt(event.target.value as string) || 0)
            }}
            sx={{ width: 300 }}
          >
            <MenuItem value={0}>-- Choose Category --</MenuItem>
            {categoriesList?.map((gr) => (
              <MenuItem key={gr.id} value={gr.id}>
                {gr?.title}
              </MenuItem>
            ))}
          </CustomSelect>
          <Stack ml={2} sx={{ width: 300 }}>
            <MyTextField
              style={{ marginBottom: 0 }}
              onChange={debounce((e) => setSearchLabel(e.target.value), 300)}
              fullWidth
              label="Label"
              placeholder="Enter group label"
              name="label"
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
            Create New Group
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
          categoryList={categoriesList}
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
