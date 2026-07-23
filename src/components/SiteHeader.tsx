import { Brand } from './Brand'

type SiteHeaderProps = {
  onOpenDataInformation: () => void
}

export function SiteHeader({
  onOpenDataInformation,
}: SiteHeaderProps) {
  return (
    <header className="site-header">
      <div className="header-content">
        <Brand />
        <nav aria-label="Primary navigation">
          <a href="#results">Results</a>
          <a href="#about">About this project</a>
        </nav>
        <button
          className="demo-badge"
          type="button"
          aria-haspopup="dialog"
          onClick={onOpenDataInformation}
        >
          <span aria-hidden="true" />
          Synthetic data
        </button>
      </div>
    </header>
  )
}
