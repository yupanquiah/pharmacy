import type { AuthLayoutProps } from '~/features/auth/types'

export function AuthFormCard({
  title,
  description,
  children,
}: AuthLayoutProps) {
  return (
    <article className="flex w-full max-w-sm flex-col justify-center">
      <header className="flex flex-col items-center gap-4 pb-10 text-center">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-sm text-balance text-muted-foreground">
          {description}
        </p>
      </header>
      <main>{children}</main>
    </article>
  )
}
