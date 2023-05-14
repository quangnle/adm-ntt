import React, { useEffect, useMemo, useState } from 'react'

import productService from '@/api/product'
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
import { IGroup, IProduct } from '@/constants/types'
import groupService from '@/api/group'
import CustomSelect from '@/components/form/CustomSelect'
import { useLocation } from 'react-router-dom'
import moment from 'moment'

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import useDrawer from '@/hooks/useDrawer'
import CreateProduct from './create'
import SelectGroup from './SelectGroup'
import ConfirmDialog from '@/components/confirm-dialog'

const DEFAULT_PAGINATION = {
  page: 1,
  total: 1,
  perPage: 10
}

export default function ProductPage() {
  const location = useLocation()

  const [groupList, setGroupList] = useState<IGroup[]>([])
  const [groupId, setGroupId] = useState(0)

  const [productList, setProductList] = useState<IProduct[]>([])
  const [pagination, setPagination] = useState(DEFAULT_PAGINATION)

  const [selectedProduct, setSelectProduct] = useState<IProduct | null>(null)
  const [selectedIds, setSelectedIds] = useState<number[]>([])

  const [showDrawer, toggleDrawer, setShowDrawer] = useDrawer()

  const fetchGroups = async () => {
    try {
      const fetchData = await groupService.getAll({ per_page: 1000 })
      if (fetchData) {
        setGroupList(fetchData?.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const fetchProducts = async () => {
    try {
      const fetchData = await productService.getAll({
        group_id: groupId,
        page: pagination.page,
        per_page: pagination.perPage
      })
      if (fetchData) {
        const { data: list, ...pagi } = fetchData
        setProductList(list as IProduct[])
        setPagination(pagi)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchGroups()
  }, [])

  useEffect(() => {
    groupId && fetchProducts()
  }, [groupId, pagination.page])

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
        value: (item: IProduct) => (
          <Stack direction="row" alignItems="center" columnGap={2}>
            {item.image && (
              <img src={item.image} alt="" style={{ maxWidth: 100 }} />
            )}
            <p>{item.title}</p>
          </Stack>
        )
      },
      {
        key: 'description',
        header: 'Description'
      },
      {
        key: 'created_at',
        header: 'Created',
        value: (item: IProduct) => (
          <span style={{ whiteSpace: 'nowrap' }}>
            {moment(item.created_at).format('MM-DD-YYYY')}
          </span>
        )
      },
      {
        key: 'action',
        header: 'Action',
        value: (item: IProduct) => (
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
  }, [productList])

  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showDeleteOneModal, setShowDeleteOneModal] = useState<IProduct | null>(
    null
  )
  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false)
    setShowDeleteOneModal(null)
  }
  const handleConfirmDeleteOneModal = async () => {
    try {
      if (!showDeleteOneModal) return
      const { data } = await productService.deleteMany({
        ids: [showDeleteOneModal?.id]
      })
      if (data) {
        handleCloseDeleteModal()
        fetchProducts()
      }
    } catch (error) {
      console.log(error)
    }
  }
  const handleConfirmDeleteMultiModal = async () => {
    try {
      const { data } = await productService.deleteMany({
        ids: selectedIds
      })
      if (data) {
        handleCloseDeleteModal()
        fetchProducts()
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Stack pt={2}>
      <Typography variant="h3" mb={2}>
        Products
      </Typography>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
      >
        <SelectGroup groupId={groupId} setGroupId={setGroupId} />
      </Stack>

      {groupId !== 0 && (
        <>
          <Stack direction="row" justifyContent="space-between" mb={2}>
            <Button
              variant="outlined"
              onClick={() => {
                setSelectProduct(null)
                setShowDrawer(true)
              }}
            >
              Create New Product
            </Button>
            {!!selectedIds.length && (
              <Stack
                direction="row"
                justifyContent="end"
                alignItems="center"
                spacing={2}
              >
                <Typography>Selected Product: {selectedIds.length}</Typography>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => {
                    setShowDeleteModal(true)
                  }}
                >
                  Delete All
                </Button>
              </Stack>
            )}
          </Stack>
          <MyTable
            data={productList}
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
        </>
      )}

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
          data={selectedProduct}
          groupId={groupId}
          onSuccess={() => {
            setShowDrawer(false)
            fetchProducts()
          }}
        />
      </Drawer>

      <ConfirmDialog
        open={showDeleteOneModal !== null}
        content="Are you sure to delete selected product?"
        handleClose={handleCloseDeleteModal}
        handleAgree={handleConfirmDeleteOneModal}
      />
      <ConfirmDialog
        open={showDeleteModal}
        content="Are you sure to delete all selected product?"
        handleClose={handleCloseDeleteModal}
        handleAgree={handleConfirmDeleteMultiModal}
      />
    </Stack>
  )
}
