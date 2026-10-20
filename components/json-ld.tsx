type Props = { data: Record<string, unknown> }

export function JsonLd({ data }: Props) {
  const json = JSON.stringify({ "@context": "https://schema.org", ...data })

  return (
    <script
      type="application/ld+json"
      // Escape "<" so a "</script>" in post content can't close the tag early (XSS)
      dangerouslySetInnerHTML={{ __html: json.replace(/</g, "\\u003c") }}
    />
  )
}
