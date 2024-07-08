import React from 'react'
import { Toast } from 'primereact/toast'
import { useTranslation } from 'react-i18next'

export default function Error() {
  const { t } = useTranslation()
  const toastRef = React.useRef<Toast>(null)
  function onError(event: ErrorEvent) {
    toastRef.current?.show({
      severity: 'error',
      summary: t('uncaughtError', { ns: 'debug' }),
      detail: event.message,
      life: 5000,
    })
  }
  React.useEffect(() => {
    window.addEventListener('error', onError)
    return () => {
      window.removeEventListener('error', onError)
    }
  })
  return (
    <Toast ref={toastRef} />
  )
}
