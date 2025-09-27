'use server';
import { redirect } from "next/navigation";
import { createUser, getUserByEmail } from "@/lib/user";
import { hashUserPassword , verifyPassword} from "@/lib/hash";
import { createAuthSession, destroySession } from "@/lib/auth";

export async function signup(prevState,formData) {
    const email = formData.get('email');
    const password = formData.get('password');

    let error = {};

    if(!email.includes('@')){
        error.email = 'Por favor ingresa un correo valido.';
    }

    if( password.trim().length <8){
        error.password = 'Contrasñea demasiado corta.';
    }

    if (Object.keys(error).length > 0){
        return {errors: error};
    }
    const hashedPassword = hashUserPassword(password);
    try{
        const id = createUser(email,hashedPassword);
        await createAuthSession(id);
        redirect('/training');
    } catch (error) {
        if(error.code === 'SQLITE_CONSTRAINT_UNIQUE'){
            return{
                errors: {
                    email: 'Parece que ya existe una cuenta para el correo que has elegido'
                }
            };
        }
        throw error;
    }
}

export async function login (prevState, formData) {
    const email = formData.get('email');
    const password = formData.get('password');

    const existingUser = getUserByEmail(email);
    if(!existingUser) {
        return {
            errors: {
                email: 'No se pudo encontrar una cuenta con ese correo, por favor revise la credenciales'
            }
        }
    }

    const isValidPassword = verifyPassword(existingUser.password,password);

    if(!isValidPassword) {
        return {
            errors: {
                password: 'La contraseña que has ingresado no es correcta, por favor revisa las credenciales'
            }
        }
    }

    await createAuthSession(existingUser.id);
    redirect('/training');
}

export async function auth(mode, prevState, formData) {
    if(mode === 'login'){
        return login(prevState, formData);
    }
    return signup(prevState, formData);
}

export async function logout() {
    await destroySession();
    redirect('/');
}