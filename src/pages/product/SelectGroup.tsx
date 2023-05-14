import categoryService from '@/api/category'
import groupService from '@/api/group'
import CustomSelect from '@/components/form/CustomSelect'
import { ICategory, IGroup } from '@/constants/types'
import { MenuItem, SelectChangeEvent, Stack } from '@mui/material'
import { useEffect, useState } from 'react'

export default function SelectGroup({
  groupId,
  setGroupId
}: {
  groupId: number
  setGroupId: (id: number) => void
}) {
  const [categoryList, setCategoryList] = useState<ICategory[]>([])
  const [categoryId, setCategoryId] = useState(0)

  const [groupList, setGroupList] = useState<IGroup[]>([])

  const fetchCategories = async () => {
    try {
      const fetchData = await categoryService.getAll({ per_page: 1000 })
      if (fetchData) {
        setCategoryList(fetchData?.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

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

  useEffect(() => {
    fetchCategories()
    fetchGroups()
  }, [])

  useEffect(() => {
    if (groupList?.length) {
      const searchParams = new URLSearchParams(location.search)
      setCategoryId(parseInt(searchParams.get('category') || '0') || 0)
    }
  }, [categoryList])

  useEffect(() => {
    if (groupList?.length) {
      const searchParams = new URLSearchParams(location.search)
      setGroupId(parseInt(searchParams.get('group') || '0') || 0)
    }
  }, [groupList])

  return (
    <Stack direction="row" spacing={2}>
      <CustomSelect
        label="Category"
        value={categoryId}
        onChange={(event: SelectChangeEvent<unknown>) => {
          setCategoryId(parseInt(event.target.value as string) || 0)
          setGroupId(0)
        }}
        sx={{ width: 300 }}
      >
        <MenuItem value={0}>-- Choose Category --</MenuItem>
        {categoryList?.map((gr) => (
          <MenuItem key={gr.id} value={gr.id}>
            {gr?.title}
          </MenuItem>
        ))}
      </CustomSelect>

      <CustomSelect
        label="Group"
        value={groupId}
        onChange={(event: SelectChangeEvent<unknown>) => {
          setGroupId(parseInt(event.target.value as string) || 0)
        }}
        sx={{ width: 300 }}
      >
        <MenuItem value={0}>-- Choose Group --</MenuItem>
        {groupList?.map((gr) => (
          <MenuItem
            key={gr.id}
            value={gr.id}
            sx={{ display: gr.category_id !== categoryId ? 'none' : 'flex' }}
          >
            {gr?.label}
          </MenuItem>
        ))}
      </CustomSelect>
    </Stack>
  )
}
