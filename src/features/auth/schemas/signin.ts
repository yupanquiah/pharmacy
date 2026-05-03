import * as v from 'valibot'

export const loginFormSchema = v.object({
  email: v.pipe(
    v.string('Tú correo electrónico debe ser una cadena.'),
    v.nonEmpty('Por favor, ingresa tu correo electrónico.'),
    v.email('La dirección de correo electrónico está mal formateada.'),
  ),
  password: v.pipe(
    v.string('Tú contraseña debe ser una cadena.'),
    v.nonEmpty('Por favor, ingresa tu contraseña.'),
    v.minLength(8, 'Tu contraseña debe tener 8 caracteres o más.'),
  ),
})
