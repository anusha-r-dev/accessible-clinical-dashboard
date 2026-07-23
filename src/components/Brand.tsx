type BrandProps = {
  footer?: boolean
}

export function Brand({ footer = false }: BrandProps) {
  return (
    <a
      className={`brand${footer ? ' brand--footer' : ''}`}
      href="#top"
      aria-label="Accessible Clinical Results Dashboard home"
    >
      <span className="brand-mark" aria-hidden="true">
        <span />
      </span>
      <span>
        <strong>Clinical Results</strong>
        <small>Accessible dashboard</small>
      </span>
    </a>
  )
}
