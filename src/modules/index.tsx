import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography
} from '@mui/material'
import ContentImageModule from './content-image'
import HeroBannerModule from './hero-banner'
import NewsLetterModule from './news-letter'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const registerComponents = {
  HeroBannerModule: {
    name: 'Hero Banner Module',
    comp: HeroBannerModule
  },
  ContentImageModule: {
    name: 'Content Image Module',
    comp: ContentImageModule
  },
  NewsLetterModule: {
    name: 'News Letter Module',
    comp: NewsLetterModule
  }
}

export type registerComponentType = keyof typeof registerComponents

export type ComponentModuleType = {
  onChange: <T extends object>(data: T) => void
  data: object | null
}

export default function ComponentModule({
  component,
  data,
  onChange
}: {
  component: registerComponentType
} & ComponentModuleType) {
  const componentModule = registerComponents[component]
  return (
    <Accordion defaultExpanded>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography variant="h5">{componentModule?.name}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <componentModule.comp data={data as never} onChange={onChange} />
      </AccordionDetails>
    </Accordion>
  )
}
