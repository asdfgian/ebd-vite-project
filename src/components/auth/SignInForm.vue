<script setup>
import { reactive, ref } from 'vue'
import TextField from '../shared/TextField.vue'
import { signIn } from '../../services/AuthService';
import router from '../../config/router';

const form = reactive({
    identifier: '',
    password: ''
})

const errors = reactive({
    identifier: '',
    password: ''
})

const serverError = ref("");

const validateForm = () => {
    let isValid = true

    if (!form.identifier) {
        errors.identifier = 'Este campo es obligatorio'
        isValid = false
    } else if (form.identifier.includes('@')) {
        const emailRegex = /\S+@\S+\.\S+/
        if (!emailRegex.test(form.identifier)) {
            errors.identifier = 'El correo no es válido'
            isValid = false
        } else {
            errors.identifier = ''
        }
    } else {
        errors.identifier = ''
    }

    if (!form.password) {
        errors.password = 'La contraseña es obligatoria'
        isValid = false
    } else if (form.password.length < 6) {
        errors.password = 'Debe tener al menos 6 caracteres'
        isValid = false
    } else {
        errors.password = ''
    }

    return isValid
}

const handleSubmit = async () => {
    serverError.value = "";

    if (!validateForm()) return;

    try {
        const response = await signIn(form);
        const data = response.data;

        if (data?.token) {
            localStorage.setItem("token", data.token);
            router.push("/")
        }
    } catch (error) {
        serverError.value = error.response?.data || "Error inesperado. Intenta nuevamente.";
    }
};

</script>

<template>
    <div class="min-h-screen bg-blue-ebd flex flex-col md:flex-row items-center justify-center px-6">
        <div class="w-full max-w-md bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-lg">
            <h2 class="text-3xl text-white mb-6 font-bold text-center md:text-left">
                Iniciar Sesión
            </h2>

            <form @submit.prevent="handleSubmit" class="space-y-5">
                <div>
                    <label class="block mb-2 font-medium text-white">Correo o nombre de usuario*</label>
                    <TextField v-model="form.identifier" type="text" placeholder="usuario123 o jhon@example.com" />
                    <p v-if="errors.identifier" class="text-red-400 text-sm mt-1">{{ errors.identifier }}</p>
                </div>

                <div>
                    <label class="block mb-2 font-medium text-white">Contraseña*</label>
                    <TextField v-model="form.password" type="password" placeholder="••••••••" />
                    <p v-if="errors.password" class="text-red-400 text-sm mt-1">{{ errors.password }}</p>
                    <p v-if="serverError" class="text-red-400 text-sm mt-1 font-bold">{{ serverError }}</p>
                </div>

                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div class="flex items-center">
                        <input type="checkbox" id="remember"
                            class="w-5 h-5 text-orange-ebd border-gray-300 rounded-sm focus:ring-orange-ebd" />
                        <label for="remember" class="ml-2 text-sm font-medium text-white">
                            Recordármelo
                        </label>
                    </div>
                    <a href="forgot-password" class="text-sm font-medium text-white hover:underline">
                        ¿Olvidaste tu contraseña?
                    </a>
                </div>

                <button type="submit"
                    class="bg-orange-ebd hover:bg-orange-500 transition-colors text-white py-3 px-4 rounded-md w-full font-bold cursor-pointer">
                    Iniciar Sesión
                </button>

                <p class="text-center text-white mt-4 text-sm">
                    ¿Aún no estás registrado?
                    <router-link class="text-orange-ebd hover:underline" to="/sign-up">Crear una cuenta</router-link>
                </p>
            </form>
        </div>

        <div class="mt-10 md:mt-0 md:ml-16">
            <img class="w-48 md:w-64" src="/ebd-logo.png" alt="Logo EBD" />
        </div>
    </div>
</template>
