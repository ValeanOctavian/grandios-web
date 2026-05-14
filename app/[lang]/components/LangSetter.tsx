'use client'

import { useParams } from 'next/navigation'
import { useEffect } from 'react'

export function LangSetter() {
  const params = useParams()

  useEffect(() => {
    if (params?.lang) {
      document.documentElement.lang = params.lang as string
    }
  }, [params?.lang])

  return null
}
