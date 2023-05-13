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
import AboutUsModule from './about-us'
import ValuesToCustomerModule, { IValueCustomerForm } from './values-customer'
import ContactDetailModule, { IContactDetailForm } from './contact-detail'

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
  },
  ContactDetailModule: {
    name: 'Detail About Us',
    comp: AboutUsModule
  },
  ValuesToCustomer: {
    name: 'Values To Customer',
    comp: ValuesToCustomerModule
  },
  ContactDetail: {
    name: 'Contact Detail',
    comp: ContactDetailModule
  }
}

export type registerComponentType = keyof typeof registerComponents

export type ComponentModuleType = {
  onChange: (data: unknown) => void | Promise<void>
  data: Record<string, string>
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
        <componentModule.comp
          data={
            data as unknown as Record<string, string> &
              IContactDetailForm &
              IValueCustomerForm
          }
          onChange={onChange}
        />
      </AccordionDetails>
    </Accordion>
  )
}
