'use client';
import Link from 'next/link';
import {useFormState} from 'react-dom';

import {auth} from '@/actions/auth-actions';

export default function AuthForm({mode}) {
  const [formState,formAction] = useFormState(auth.bind(null, mode),{});
  return (
    <form id="auth-form" action={formAction}>
      <div>
        <img src="/images/auth-icon.jpg" alt="A lock icon" />
      </div>
      <p>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />
      </p>
      <p>
        <label htmlFor="password">Contraseña</label>
        <input type="password" name="password" id="password" />
      </p>
      {formState.errors && (
        <ul id="form-errors">
        {Object.keys(formState.errors).map((error)=>(
           <li key ={error}>{formState.errors[error]}</li>
          ))}
      </ul>
    )}
      <p>
        <button type="submit">
          {mode === 'login' ? 'Ingresar' : 'Crear cuenta'}
        </button>
      </p>
      <p>
        {mode === 'login' && (
          <Link href="/?mode=signup">Crear cuenta.</Link>
        )}
        {mode === 'signup' && (
          <Link href="/?mode=login">Ingresar con cuenta existente</Link>
        )}
      </p>
    </form>
  );
}
