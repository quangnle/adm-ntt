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
  Typography
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

  const deleteGroups = async () => {
    try {
      const fetchData = await groupService.deleteMany({
        ids: selectedIds
      })
      if (fetchData) {
        fetchGroup()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const deleteOneGroup = async (selectedId: number) => {
    try {
      const fetchData = await groupService.deleteMany({
        ids: [selectedId]
      })
      if (fetchData) {
        fetchGroup()
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
        per_page: pagination.perPage
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
  }, [categoryId, pagination.page])

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
        key: 'label',
        header: 'Label',
        value: (item: IGroup) => (
          <Stack direction="row" alignItems="center" columnGap={2}>
            {item.image && (
              <img src={item.image} alt="" style={{ maxWidth: 100 }} />
            )}
            <p>{item.label}</p>
          </Stack>
        )
      },
      {
        key: 'title',
        header: 'Title',
        value: (item: IGroup) => (
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
        key: 'label_html',
        header: 'Label HTML'
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
            <IconButton onClick={() => deleteOneGroup(item.id)}>
              <DeleteIcon color="error" />
            </IconButton>
          </Stack>
        )
      }
    ]
  }, [groupList])

  return (
    <Stack pt={2}>
      <Typography variant="h3" mb={2}>
        Groups
      </Typography>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
      >
        <CustomSelect
          label="Category"
          value={categoryId}
          onChange={(event: SelectChangeEvent<unknown>) => {
            setCategoryId(parseInt(event.target.value as string) || 0)
          }}
          sx={{ width: 400 }}
        >
          <MenuItem value={0}>-- Choose Category --</MenuItem>
          {categoriesList?.map((gr) => (
            <MenuItem key={gr.id} value={gr.id}>
              {gr?.title}
            </MenuItem>
          ))}
        </CustomSelect>
        {groupList?.length > 0 && (
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
              onClick={deleteGroups}
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
        )}
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
