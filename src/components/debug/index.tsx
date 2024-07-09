import React from 'react'
import Error from './Error'
import AlertBar from './AlertBar'

export default function Debug() {
  if (import.meta.env.PROD) {
    return null
  }
  return (
    <>
      <Error />
      <AlertBar />
    </>
  )
}
