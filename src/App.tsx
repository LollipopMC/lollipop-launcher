import React from 'react'
import { Button } from 'primereact/button'
import { LogicalSize, getCurrent } from '@tauri-apps/api/window'
import { Smile } from '@styled-icons/boxicons-regular'
import { commands, events } from '@/bindings'

const __VERSION__ = '1.0.0'

export default function App() {
  const [path, setPath] = React.useState('')
  events.demoEvent.listen(({ payload }) => {
    console.log(payload)
  })

  React.useEffect(() => {
    const window = getCurrent()
    const unsubscribe = window.onDragDropEvent(({ payload }) => {
      switch (payload.type) {
        case 'dropped': {
          setPath(JSON.stringify(payload.paths))
          break
        }
      }
    })
    return () => {
      unsubscribe.then(fn => fn())
    }
  })
  return (
    <div>
      <h1>Lollipop</h1>
      <p>It's a lollipop!</p>
      <Button
        onClick={() => {
          const window = getCurrent()
          window.setSize(new LogicalSize(600, 800))
          commands.helloWorld('Lollipop').then(console.log)
        }}
        color="primary"
        size="small"
        label="启动 理工大学"
        className="font-bold"
        icon={({ iconProps }: { iconProps: any }) => {
          return (
            <Smile {...iconProps} size={20} />
          )
        }}
      />
      <span>{path}</span>
    </div>
  )
}

export { __VERSION__ }
