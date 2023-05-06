import ContentImageModule from './content-image'
import HeroBannerModule from './hero-banner'
import NewsLetterModule from './news-letter'

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
  const compData = data as
    | (object & {
        subHeading: string
        heading: string
        content: string
        rightImg: string
        background: string
      })
    | null
  return <componentModule.comp data={compData} onChange={onChange} />
}
