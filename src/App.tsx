import React from 'react'
import { Button } from '@nextui-org/button'
import { LogicalSize, getCurrent } from '@tauri-apps/api/window'
import { commands, events } from '@/bindings'

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
        variant="solid"
        color="primary"
        size="lg"
        className="font-bold"
      >
        启动 理工大学
      </Button>
      <span>{path}</span>
    </div>
  )
}
