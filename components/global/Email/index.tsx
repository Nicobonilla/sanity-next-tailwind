import * as React from 'react';
import { Html } from '@react-email/html';

interface EmailProps {
  name: string;
  rut: string;
  phone: string;
  comuna: string;
  email: string;
  mainCategory: string;
  serviceCategory: string;
  message: string;
}

export default function Email(props: EmailProps) {
  const {
    name,
    rut,
    phone,
    comuna,
    email,
    mainCategory,
    serviceCategory,
    message,
  } = props;

  return (
    <Html lang="es">
      <h1>Detalle de Información</h1>
      <p>Nombre: {name}</p>
      <p>RUT: {rut}</p>
      <p>Celular: {phone}</p>
      <p>Comuna: {comuna}</p>
      <p>Email: {email}</p>
      <p>Área: {mainCategory}</p>
      <p>Servicio: {serviceCategory}</p>
      <p>Comentario: {message}</p>
    </Html>
  );
}
