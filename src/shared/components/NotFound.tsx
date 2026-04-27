import { Separator } from './ui/separator'

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center">
      <div className="flex items-center gap-4">
        <span className="text-3xl">404</span>
        <Separator orientation="vertical" />
        <p className="text-sm font-light">This page could not be found.</p>
      </div>
    </main>
  )
}
