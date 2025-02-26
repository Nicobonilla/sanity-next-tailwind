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
      <p><strong>Nombre:</strong> {name}</p>
      <p><strong>RUT:</strong> {rut}</p>
      <p><strong>Celular:</strong> {phone}</p>
      <p><strong>Comuna:</strong> {comuna}</p>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Área:</strong> {mainCategory}</p>
      <p><strong>Servicio:</strong> {serviceCategory}</p>
      <p><strong>Comentario:</strong> {message}</p>
    </Html>
  );
}
