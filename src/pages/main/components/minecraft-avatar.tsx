import React from 'react'
import { Button } from 'primereact/button'
import { Tooltip } from 'primereact/tooltip'
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react-lite'
import samples from '@/samples.json'

const MinecraftAvatar = observer(({ size = 64 }: { size?: number }) => {
  const { t } = useTranslation()
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const { avatars } = samples
  const imgData = avatars.zeithrold
  React.useEffect(() => {
    const img = new Image()
    img.src = `data:image/png;base64,${imgData}`
    const canvas = canvasRef.current
    if (!img || !canvas)
      return

    const drawImageOnCanvas = () => {
      const ctx = canvas.getContext('2d')
      if (!ctx)
        return
      ctx.imageSmoothingEnabled = false
      ctx.drawImage(img, 8, 8, 8, 8, 0, 0, size, size)
    }

    if (img.complete) {
      drawImageOnCanvas()
    }
    else {
      img.onload = drawImageOnCanvas
    }
  }, [canvasRef, size, imgData])
  return (
    <>
      <Tooltip
        target=".minecraft-avatar"
        position="top"
        pt={{
          text: {
            className: 'p-1 px-2 text-xs',
          },
        }}
        className="flex-1"
      >
        <div className="flex flex-col items-center">
          <span className="mt-0.5">{t('clickToChangeAccount', { ns: 'main' })}</span>
        </div>
      </Tooltip>
      <Button
        text
        className="minecraft-avatar hover:bg-gray-200 p-4 rounded-xl"
      >
        <canvas
          ref={canvasRef}
          width={size}
          height={size}
        />
      </Button>
    </>
  )
})

export default MinecraftAvatar
