import { IconArrowLeft } from '@tabler/icons-react'
import { Link } from '@tanstack/react-router'
import type { AuthLayoutProps } from '~/features/auth/types'
import { AuthFormCard } from '~/features/auth/components/AuthFormCard'
import { Button } from '~/shared/components/ui/button'

export function AuthLayout({ children, title, description }: AuthLayoutProps) {
  const year = new Date().getFullYear()

  return (
    <div className="max-w-8xl mx-auto h-full w-full">
      <main className="grid h-full w-full grid-cols-2 p-4 ">
        <section className="flex h-full w-full flex-col items-center justify-between gap-8 px-5 ">
          <header className="w-full">
            <Button
              variant="link"
              className="text-sidebar-primary hover:text-primary"
              asChild
            >
              <Link to="/">
                <IconArrowLeft />
                Regresar
              </Link>
            </Button>
          </header>
          <AuthFormCard title={title} description={description}>
            {children}
          </AuthFormCard>
          <footer className="flex w-full items-end justify-between gap-4">
            <p className="text-center text-sm text-muted-foreground">
              {year} Pharmacy. All rights reserved.
            </p>
            <a
              href="#"
              className="text-sm text-muted-foreground hover:underline"
            >
              Privacy Policy
            </a>
          </footer>
        </section>
        <section className="h-full w-full px-6">
          <div className="relative h-full w-full">
            <div
              className="absolute inset-0 z-0 rounded-2xl"
              style={{
                background: `
                  radial-gradient(ellipse 85% 65% at 8% 8%, rgba(175, 109, 255, 0.42), transparent 60%),
                  radial-gradient(ellipse 75% 60% at 75% 35%, rgba(255, 235, 170, 0.55), transparent 62%),
                  radial-gradient(ellipse 70% 60% at 15% 80%, rgba(255, 100, 180, 0.40), transparent 62%),
                  radial-gradient(ellipse 70% 60% at 92% 92%, rgba(120, 190, 255, 0.45), transparent 62%),
                  linear-gradient(180deg, #f7eaff 0%, #fde2ea 100%)
                `,
              }}
            />
          </div>
        </section>
      </main>
    </div>
  )
}
