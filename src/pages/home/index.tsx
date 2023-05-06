import ContentImageModule from '@/modules/content-image'
import HeroBannerModule from '@/modules/hero-banner'
import NewsLetterModule from '@/modules/news-letter'
import { LoadingButton } from '@mui/lab'
import { Paper, Typography } from '@mui/material'
import { useState } from 'react'

export default function Homepage() {
  // const data = useFetchConfig('homepage')
  // const [form, setForm] = useState()
  const [isCreating, setIsCreating] = useState(false)

  const handleSubmitForm = async () => {
    try {
      setIsCreating(true)
    } catch (error) {
      console.log(error)
    } finally {
      setIsCreating(false)
    }
  }
  return (
    <>
      <Typography variant="h3" mb={2}>
        Homepage
      </Typography>

      <Paper sx={{ py: 1, px: 2, mb: 2 }}>
        <Typography variant="h5" mb={2}>
          Hero Banner Module
        </Typography>
        <HeroBannerModule />
      </Paper>

      <Paper sx={{ py: 1, px: 2, mb: 2 }}>
        <Typography variant="h5" mb={2}>
          Content Image Module
        </Typography>
        <ContentImageModule />
      </Paper>

      <Paper sx={{ py: 1, px: 2, mb: 2 }}>
        <Typography variant="h5" mb={2}>
          News Letter Module
        </Typography>
        <NewsLetterModule />
      </Paper>

      <LoadingButton
        variant="contained"
        sx={{ mx: 'auto', mt: 6 }}
        onClick={handleSubmitForm}
        loading={isCreating}
      >
        Update
      </LoadingButton>
    </>
  )
}
