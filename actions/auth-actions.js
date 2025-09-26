'use server';
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
}