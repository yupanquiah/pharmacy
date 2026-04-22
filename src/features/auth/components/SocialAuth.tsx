import type { ReactNode } from 'react'
import { IconBrandGithub, IconBrandGoogleFilled } from '@tabler/icons-react'
import { authClient } from '~/lib/auth-client'
import { Button } from '~/shared/components/ui/button'

type Provider = 'google' | 'github'

const providers: {
  id: Provider
  label: string
  icon: ReactNode
}[] = [
  {
    id: 'google',
    label: 'Google',
    icon: <IconBrandGoogleFilled />,
  },
  {
    id: 'github',
    label: 'GitHub',
    icon: <IconBrandGithub />,
  },
]

const authWithProvider = async (provider: Provider) => {
  await authClient.signIn.social({
    provider,
    callbackURL: '/dashboard',
  })
}

export function SocialAuth() {
  return (
    <section className="flex justify-center gap-4">
      {providers.map((provider) => (
        <Button
          className="flex-1"
          key={provider.id}
          variant="outline"
          type="button"
          onClick={() => void authWithProvider(provider.id)}
        >
          {provider.icon}
          {provider.label}
        </Button>
      ))}
    </section>
  )
}
