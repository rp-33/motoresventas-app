import * as Yup from 'yup';
import { Dimensions } from 'react-native';

let { width, height } = Dimensions.get('window');

export const Width = (width < 540) ? width : 540;

export const COIN = 'USD';

export const SignInSchema = Yup.object().shape({
    email: Yup.string()
      .email('Correo electrónico inválido')
      .required('Correo electrónico es obligatorio'),
    password: Yup.string()
      .required('Contraseña es obligatoria'),
});

export const FargotPasswordSchema = {
    email: Yup.object().shape({
        email: Yup.string()
          .email('Correo electrónico inválido')
          .required('Correo electrónico es obligatorio'),
    }),
    code: Yup.object().shape({
        code: Yup.string()
          .required('Código de verificación es obligatorio'),
    })
};

export const ChangePasswordSchema = Yup.object().shape({
    password: Yup.string()
        .min(6, 'Contraseña tiene menos de seis (6) caracteres')
        .max(16, 'Contraseña tiene mas de dieciséis (16) caracteres')
        .required('Contraseña es obligatoria'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Ambas Contraseñas deben coincidir')
        .required('Contraseña es obligatoria'),
});

export const ChangeDisplayNameSchema = Yup.object().shape({
    displayName: Yup.string()
        .required('Nombre y Apellido es obligatorio'),
});

export const ChangePhoneSchema = Yup.object().shape({
    phone: Yup.string()
        .required('Nº telefonico es obligatorio')
        .matches(/^[0-9]+$/, 'Nº telefonico no es un número')
        .min(10, 'Nº telefonico inválido, ejemplo: 4241234567')
        .max(10, 'Nº telefonico inválido, ejemplo: 4241234567'),
});

export const SignUpSchema = Yup.object().shape({
    displayName: Yup.string()
        .required('Nombre y Apellido es obligatorio'),
    email: Yup.string()
        .email('Correo electrónico inválido')
        .required('Correo electrónico es obligatorio'),
    password: Yup.string()
        .min(6, 'Contraseña debe tener al menos seis (6) caracteres')
        .max(16, 'Contraseña tiene mas de dieciséis (16) caracteres')
        .required('Contraseña es obligatoria'),
    repeatPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Ambas Contraseñas deben coincidir')
        .required('Repetir Contraseña es obligatoria'),
});

export const SellersignupSchema = Yup.object().shape({
    name: Yup.string()
        .required('Nombre de la tienda es obligatorio')
        .min(5,'Nombre de la tienda debe tener al menos cinco (5) caracteres'),
    rif: Yup.string()
        .required('RIF es obligatorio')
        .matches(/^[0-9]+$/, 'RIF no es un número')
        .min(9, 'RIF inválido, si su RIF es menor a nueve (9) dígitos, complete con ceros (0) a la izquierda')
        .max(9, 'RIF inválido, tiene mas de nueve (9) dígitos'),
    phone: Yup.string()
        .required('Nº telefonico es obligatorio')
        .matches(/^[0-9]+$/, 'Nº telefonico no es un número')
        .min(10, 'Nº telefonico inválido, ejemplo: 4241234567')
        .max(10, 'Nº telefonico inválido, ejemplo: 4241234567'),
    captcha: Yup.string()
        .required('Captcha es obligatorio')
});

export const AddProductSchema = Yup.object().shape({
    name: Yup.string()
        .required('Nombre del producto es obligatorio')
        .min(5,'Nombre del producto debe tener al menos cinco (5) caracteres')
        .max(25,'Nombre del producto tiene mas de treinta (30) caracteres'),
    serial: Yup.string()
        .required('Serial/Número de pieza es obligatorio'),
    price: Yup.string()
        .required('Precio del producto es obligatorio')
        .matches(/^[0-9]+$/, 'Precio del producto no es un número'),
    description: Yup.string()
        .required('Descripción del producto es obligatorio')
        .min(113,'Descripción del producto debe tener al menos ciento treinta (130) caracteres'),
});

const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/png"
];

export const ImagesSchema = Yup.string()
    .required("Archivo requerido")
    .test(
        "fileFormat",
        "Formato no soportado",
        value => value && SUPPORTED_FORMATS.includes(value)
    )