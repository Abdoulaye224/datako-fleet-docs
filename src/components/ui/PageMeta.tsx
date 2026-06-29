import { useEffect } from 'react'

interface PageMetaProps {
  title: string
  description?: string
}

export function PageMeta({ title, description }: PageMetaProps) {
  useEffect(() => {
    document.title = `${title} — Datakö Fleet Docs`

    if (description) {
      let meta = document.querySelector('meta[name="description"]')
      if (!meta) {
        meta = document.createElement('meta')
        meta.setAttribute('name', 'description')
        document.head.appendChild(meta)
      }
      meta.setAttribute('content', description)
    }

    return () => {
      document.title = 'Datakö Fleet Docs'
    }
  }, [description, title])

  return null
}
