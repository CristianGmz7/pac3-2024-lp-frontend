
import * as Yup from 'yup'

//aqui se implementa formik y yup

// formik
export const loginInitValues = {
  email: '',
  password: '',
}

//yup
export const loginValidationsSchema = Yup.object({
  email: Yup.string()
    .required('El correo electronico es requerido')
    .email('Ingrese un correo electronico valido'),
  password: Yup.string()
    .required('La contraseña es requerida')
});