import MyTextField from '@/components/form/MyTextField'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Grid,
  Typography
} from '@mui/material'
import { FC, useState } from 'react'
import { ComponentModuleType } from '..'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import TextEditor from '@/components/form/TextEditor'

type TValueItemField = 'icon' | 'title' | 'description'

export interface IItemValues {
  icon: string
  title: string
  description: string
}

export interface IValueCustomerForm {
  heading: string
  content: string | undefined
  items: IItemValues[]
}

const ValuesToCustomerModule: FC<
  ComponentModuleType & {
    data: IValueCustomerForm
    onChange: (data: unknown) => void
  }
> = ({ data, onChange }) => {
  const handleChangeInput = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = event.target
    data.heading = value
    onChange && onChange(data)
  }

  const handleChangeItem = (
    field: TValueItemField,
    index: number,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string
  ) => {
    if (typeof event === 'string') {
      data.items[index][field as unknown as TValueItemField] = event
      onChange && onChange(data)
      return
    }
    const { value } = event.target
    data.items[index][field as unknown as TValueItemField] = value
    onChange && onChange(data)
  }

  const onHandleDelete = (index: number) => {
    const newItems = data.items.filter((_, idx) => {
      return idx !== index
    })
    data.items = newItems
    onChange && onChange(data)
  }
  const onHandleNewItem = () => {
    const newItem: IItemValues = {
      icon: '',
      title: '',
      description: ''
    }
    data.items.push(newItem)
    onChange && onChange(data)
  }

  const [errors, _] = useState<Record<string, string>>({})

  return (
    <Grid container>
      <Grid item xs={12}>
        <MyTextField
          required
          fullWidth
          label="Heading"
          name="heading"
          value={data?.heading}
          placeholder="Enter Heading..."
          onChange={handleChangeInput}
          error={!!errors['heading']}
          helperText={errors['heading']}
        />
        {data.items.map((item: IItemValues, idx: number) => {
          return (
            <div key={idx}>
              <Accordion defaultExpanded>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography variant="h5">{`Item ${idx + 1}`}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <MyTextField
                    required
                    fullWidth
                    label={`Icon-${idx + 1}`}
                    name={`Icon-${idx + 1}`}
                    value={item?.icon || ''}
                    placeholder="Enter Icon..."
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      handleChangeItem('icon', idx, event)
                    }
                    error={!!errors[`Icon-${idx + 1}`]}
                    helperText={errors[`Icon-${idx + 1}`]}
                  />
                  <MyTextField
                    required
                    fullWidth
                    label={`Title-${idx + 1}`}
                    name={`Title-${idx + 1}`}
                    value={item?.title || ''}
                    placeholder="Enter Title..."
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      handleChangeItem('title', idx, event)
                    }
                    error={!!errors[`Title-${idx + 1}`]}
                    helperText={errors[`Title-${idx + 1}`]}
                  />
                  <TextEditor
                    value={item.description}
                    setValue={(value) =>
                      handleChangeItem('description', idx, value)
                    }
                    error={!!errors['content']}
                    helperText={errors['content']}
                  />
                  <Button color="error" onClick={() => onHandleDelete(idx)}>
                    Delete
                  </Button>
                </AccordionDetails>
              </Accordion>
            </div>
          )
        })}
        <Button sx={{ mt: 2 }} onClick={onHandleNewItem}>
          New Item
        </Button>
      </Grid>
    </Grid>
  )
}

export default ValuesToCustomerModule
