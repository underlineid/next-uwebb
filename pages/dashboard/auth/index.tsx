import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

export default function Auth() {
  const { query, replace } = useRouter()

  useEffect(() => {
    if (!query.type) replace('/auth/login')
  }, [query, replace])

  return (
    <div>
      <h2>AUTH AJA</h2>
    </div>
  )
}
