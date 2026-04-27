import * as v from 'valibot'

export const SignupFormSchema = v.pipe(
  v.object({
    name: v.pipe(
      v.string('Tu nombre debe ser una texto.'),
      v.nonEmpty('Por favor ingresa tu nombre.'),
    ),
    email: v.pipe(
      v.string('Tu correo electrónico debe ser una cadena.'),
      v.nonEmpty('Por favor ingresa tu correo electrónico.'),
      v.email('La dirección de correo electrónico está mal formateada.'),
    ),
    password: v.pipe(
      v.string('Tu contraseña debe ser una cadena.'),
      v.nonEmpty('Por favor ingresa tu contraseña.'),
      v.minLength(8, 'Tu contraseña debe tener 8 caracteres o más.'),
    ),
    confirm_password: v.pipe(
      v.string('La confirmación de tu contraseña debe ser una cadena.'),
      v.nonEmpty('Por favor confirma tu contraseña.'),
      v.minLength(
        8,
        'La confirmación de tu contraseña debe tener 8 caracteres o más.',
      ),
    ),
  }),
  v.forward(
    v.partialCheck(
      [['password'], ['confirm_password']],
      (input) => input.password === input.confirm_password,
      'Las contraseñas no coinciden.',
    ),
    ['confirm_password'],
  ),
)
