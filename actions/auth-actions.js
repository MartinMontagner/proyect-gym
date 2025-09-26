'use server';
import { redirect } from "next/navigation";
import { createUser } from "@/lib/user";
import { hashUserPassword } from "@/lib/hash";

export async function signup(prevState,formData) {
    const email = formData.get('email');
    const password = formData.get('password');

    let error = {};

    if(!email.includes('@')){
        error.email = 'Please enter a valid email address.';
    }

    if( password.trim().length <8){
        error.password = 'Password must be at least 8 characters long.';
    }

    if (Object.keys(error).length > 0){
        return {errors: error};
    }
    const hashedPassword = hashUserPassword(password);
    try{
        createUser(email,hashedPassword);
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
    redirect('/training');
}