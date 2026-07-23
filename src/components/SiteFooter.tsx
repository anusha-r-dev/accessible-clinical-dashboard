import { Brand } from './Brand'

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <Brand footer />
        <p>A portfolio project by Anusha R. Built with React and TypeScript.</p>
      </div>
      <p>All people and clinical information shown are entirely synthetic.</p>
    </footer>
  )
}
