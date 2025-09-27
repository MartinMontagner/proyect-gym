import '../globals.css';
import {logout} from '@/actions/auth-actions';
export const metadata = {
  title: 'Next Auth',
  description: 'Next.js Authentication',
};

export default function AuthRootLayout({ children }) {
  return (
    <html lang="en">
    <body>
        <header id="auth-header">
            <h1>Bienvenido</h1>
            <form action={logout}>
                <button>Cerrar sesion</button>
            </form>
        </header>
      {children}
    </body>
    </html>
  );
}
