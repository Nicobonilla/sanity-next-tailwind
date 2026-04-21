import * as React from 'react';
import { Html } from '@react-email/html';

interface EmailProps {
  name: string;
  rut: string;
  phone: string;
  comuna: string;
  email: string;
  consultationFormat: string;
  preferredDate?: string;
  preferredTimeSlot?: string;
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
    consultationFormat,
    preferredDate,
    preferredTimeSlot,
    mainCategory,
    serviceCategory,
    message,
  } = props;

  return (
    <Html lang="es">
      <h1>Detalle de informacion</h1>
      <p><strong>Nombre:</strong> {name}</p>
      <p><strong>RUT:</strong> {rut}</p>
      <p><strong>Celular:</strong> {phone}</p>
      <p><strong>Comuna:</strong> {comuna}</p>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Modalidad preferida:</strong> {consultationFormat}</p>
      <p><strong>Fecha preferida:</strong> {preferredDate || 'Sin preferencia'}</p>
      <p><strong>Bloque horario:</strong> {preferredTimeSlot || 'Sin preferencia'}</p>
      <p><strong>Area:</strong> {mainCategory}</p>
      <p><strong>Servicio:</strong> {serviceCategory}</p>
      <p><strong>Comentario:</strong> {message}</p>
    </Html>
  );
}
