<script setup>
import { reactive, ref } from 'vue';
import TextField from '../shared/TextField.vue';

const form = reactive({
    name: '',
    lastname: '',
    username: '',
    email: '',
    gender: '',
    password: '',
    terms: false
})

const errors = reactive({})

const validateForm = () => {
    errors.name = form.name ? '' : 'El nombre es obligatorio'
    errors.lastname = form.lastname ? '' : 'El apellido es obligatorio'
    errors.username = form.username ? '' : 'El usuario es obligatorio'
    errors.email = /\S+@\S+\.\S+/.test(form.email) ? '' : 'Email inválido'
    errors.gender = form.gender ? '' : 'Selecciona un género'
    errors.password = form.password.length >= 6 ? '' : 'Mínimo 6 caracteres'
    errors.terms = form.terms ? '' : 'Debes aceptar los términos'

    return !Object.values(errors).some(e => e)
}

const handleSubmit = () => {
    if (validateForm()) {
        console.log('✅ Datos enviados:', form)
    } else {
        console.log('❌ Errores:', errors)
    }
}
</script>

<template>
    <div class="2xl:container 2xl:mx-auto flex justify-around items-center h-screen bg-blue-ebd px-8">
        <div>
            <img src="../../../public/ebd-logo.png" alt="Logo EBD" class="w-[20rem] drop-shadow-md">
        </div>

        <div class="w-[700px] bg-white/10 backdrop-blur-md p-10 rounded-xl shadow-lg">
            <h2 class="text-4xl mb-5 font-bold text-white">Registro</h2>
            <p class="mb-10 font-medium text-white/90">
                Completa el formulario para crear tu cuenta en nuestra plataforma.
            </p>

            <form @submit.prevent="handleSubmit" class="w-full grid grid-cols-2 grid-rows-4 gap-6">
                <div>
                    <label class="font-medium text-white">Nombres</label>
                    <TextField placeholder="Jhon" v-model="form.name" />
                    <p v-if="errors.name" class="text-red-400 text-sm mt-1">{{ errors.name }}</p>
                </div>

                <div>
                    <label class="font-medium text-white">Apellidos</label>
                    <TextField placeholder="Doe" v-model="form.lastname" />
                    <p v-if="errors.lastname" class="text-red-400 text-sm mt-1">{{ errors.lastname }}</p>
                </div>

                <div>
                    <label class="font-medium text-white">Nombre de usuario</label>
                    <TextField placeholder="JhonDoe" v-model="form.username" />
                    <p v-if="errors.username" class="text-red-400 text-sm mt-1">{{ errors.username }}</p>
                </div>

                <div>
                    <label class="font-medium text-white">Email</label>
                    <TextField placeholder="jhon@example.com" v-model="form.email" />
                    <p v-if="errors.email" class="text-red-400 text-sm mt-1">{{ errors.email }}</p>
                </div>

                <div>
                    <label class="font-medium text-white">Género</label>
                    <select v-model="form.gender"
                        class="bg-white text-blue-ebd text-[17px] focus:outline-orange-ebd rounded-md block w-full h-10 p-2.5 mt-1.5">
                        <option value="" disabled selected>Selecciona tu género</option>
                        <option value="M">Masculino</option>
                        <option value="F">Femenino</option>
                    </select>
                    <p v-if="errors.gender" class="text-red-400 text-sm mt-1">{{ errors.gender }}</p>
                </div>

                <div>
                    <label class="font-medium text-white">Contraseña</label>
                    <TextField type="password" v-model="form.password" />
                    <p v-if="errors.password" class="text-red-400 text-sm mt-1">{{ errors.password }}</p>
                </div>

                <div class="col-span-2 row-start-4">
                    <div class="flex items-center mb-4">
                        <input type="checkbox" v-model="form.terms"
                            class="w-5 h-5 text-orange-ebd bg-gray-100 border-gray-300 rounded-sm focus:ring-orange-ebd">
                        <label class="ms-2 text-[15px] font-medium text-white">
                            Acepto todos los términos, <a href="#" class="underline">políticas de privacidad</a> y más
                        </label>
                    </div>
                    <p v-if="errors.terms" class="text-red-400 text-sm mt-1">{{ errors.terms }}</p>

                    <button
                        class="bg-orange-ebd hover:bg-orange-500 transition-colors text-white py-2 px-4 rounded-md w-[200px] h-12 font-bold cursor-pointer"
                        type="submit">
                        Crear Cuenta
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
