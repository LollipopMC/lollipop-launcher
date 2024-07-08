import i18n from 'i18next'
import resources from 'virtual:i18next-loader'
import { initReactI18next } from 'react-i18next'

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'zhcn',
  })
