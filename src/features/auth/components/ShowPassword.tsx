import { IconEye, IconEyeClosed } from '@tabler/icons-react'
import { InputGroupButton } from '~/shared/components/ui/input-group'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '~/shared/components/ui/tooltip'

interface ShowPasswordProps {
  onClick: () => void
  isVisible: boolean
}

export function ShowPassword({ onClick, isVisible }: ShowPasswordProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <InputGroupButton
          variant="ghost"
          size="icon-sm"
          aria-label={isVisible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          onClick={onClick}
        >
          {isVisible ? <IconEyeClosed /> : <IconEye />}
        </InputGroupButton>
      </TooltipTrigger>
      <TooltipContent>
        <p>{isVisible ? 'Ocultar contraseña' : 'Mostrar contraseña'}</p>
      </TooltipContent>
    </Tooltip>
  )
}
