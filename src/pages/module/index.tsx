import React from 'react'
import { useTranslation } from 'react-i18next'

export default function ModulePage() {
  const { t } = useTranslation()
  return (
    <div>
      <h1>{t('helloWorld', { ns: 'common' })}</h1>
    </div>
  )
}