import React from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'

export default function AlertBar() {
  const { t } = useTranslation()
  const [visible, setVisible] = React.useState(false)
  return (
    <>
      <Button
        className="absolute bottom-2 right-2 p-2 opacity-50 z-50"
        label={t('debugMode', { ns: 'debug' })}
        outlined
        size="small"
        onClick={
          () => setVisible(true)
        }
      />
      <Dialog
        header={t('dialog.title', { ns: 'debug' })}
        visible={visible}
        onHide={() => setVisible(false)}
        className="w-[96vw] lg:w-[50vw]"
      >
        {t('dialog.description', { ns: 'debug' })}
      </Dialog>
    </>
  )
}
