<template>
    <form @submit.prevent="handleOpenModal" class="flex items-center px-5 justify-between w-full">
        <div>
            <label class="block mb-1.5 text-[12px] font-medium text-gray-900">Movimiento*</label>
            <select v-model="form.type" class="bg-orange-ebd border h-9 text-white text-sm rounded block px-2">
                <option disabled value="">Seleccionar</option>
                <option v-for="(mov, index) in movimientos" :key="index" :value="mov">
                    {{ mov }}
                </option>
            </select>
        </div>

        <div class="flex items-center gap-3">
            <div>
                <label class="block mb-1.5 text-[12px] font-medium text-gray-900">Empleado Origen*</label>
                <select v-model="form.userOriginId"
                    class="bg-orange-ebd border h-9 text-white text-sm rounded block w-full px-2">
                    <option :value="null">Seleccione</option>
                    <option v-for="user in users" :key="'origen-' + user.id" :value="user.id">
                        {{ user.name }}
                    </option>
                </select>
            </div>

            <div>
                <label class="block mb-1.5 text-[12px] font-medium text-gray-900">Empleado Destino*</label>
                <select v-model="form.userDestinationId"
                    class="bg-orange-ebd border h-9 text-white text-sm rounded block w-full px-2">
                    <option :value="null">Seleccione</option>
                    <option v-for="user in users" :key="'destino-' + user.id" :value="user.id">
                        {{ user.name }}
                    </option>
                </select>
            </div>
        </div>

        <div>
            <label class="block mb-1.5 text-[12px] font-medium text-white">*</label>
            <button @click="handleOpenModal" type="button"
                class="bg-orange-ebd cursor-pointer text-white px-4 rounded h h-9 hover:opacity-90">
                Registrar
            </button>
        </div>
        <!-- Modal -->
        <div v-if="showModal" class="fixed inset-0 z-20 bg-gray-100/40 flex justify-center items-center"
            @click.self="showModal = false">
            <div class="relative bg-blue-ebd rounded-lg shadow-sm w-[22rem]">
                <div class="flex items-center justify-between p-4 border-b border-gray-200">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                        Agrega un comentario
                    </h3>
                    <button type="button" @click="showModal = false"
                        class="text-white bg-transparent rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center hover:bg-blue-950">
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <span class="sr-only">Cerrar</span>
                    </button>
                </div>

                <div class="p-4">
                    <textarea v-model="form.comment" rows="4"
                        class="block p-2.5 w-full text-sm rounded-lg borderbg-gray-700 border-gray-600 placeholder-gray-400 text-white"
                        placeholder="Escribe un breve comentario aquí..."></textarea>

                    <div class="flex justify-end mt-4">
                        <button type="button" @click="handleSave"
                            class="text-white inline-flex items-center bg-orange-ebd cursor-pointer rounded-lg text-sm px-5 py-2.5 text-center hover:opacity-90">
                            Guardar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </form>

</template>




<script setup>
import { reactive, ref, onMounted } from "vue";
import { getAllUsers } from "../../services/UserService";
import { createMovementApi } from "../../services/MovementService";

const props = defineProps({
    deviceId: {
        type: Number,
        required: true
    }
});

const emit = defineEmits(['movement-created']);

const movimientos = [
    "Ingreso por compra",
    "Ingreso por devolución",
    "Ingreso por ajuste",
    "Salida por venta",
    "Salida por uso interno",
    "Salida por baja",
    "Transferencia interna",
    "Ajuste por inventario",
];

const users = ref([]);

const form = reactive({
    type: "",
    userOriginId: null,
    userDestinationId: null,
    comment: "",
    deviceId: null,
    date: null,
    createdBy: null,
});

const showModal = ref(false);

onMounted(async () => {
    try {
        const response = await getAllUsers();
        users.value = response.data;
        // Obtener el usuario actual del localStorage o contexto
        const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
        form.createdBy = currentUser.id || 1;
        form.deviceId = props.deviceId;
    } catch (err) {
        console.error("Error al cargar usuarios:", err);
    }
});

function handleOpenModal() {
    if (!form.type || !form.userOriginId || !form.userDestinationId) {
        alert("Todos los campos son obligatorios ⚠️");
        return;
    }
    showModal.value = true;
}

async function handleSave() {
    if (!form.comment.trim()) {
        alert("El comentario es obligatorio ⚠️");
        return;
    }

    try {
        const payload = {
            date: new Date(),
            comment: form.comment,
            deviceId: form.deviceId,
            type: form.type,
            userOriginId: form.userOriginId,
            userDestinationId: form.userDestinationId,
            createdBy: form.createdBy,
        };

        await createMovementApi(payload);
        alert("Movimiento registrado ✅");

        // Emitir evento para recargar el historial
        emit('movement-created');

        // Limpiar formulario
        form.type = "";
        form.userOriginId = null;
        form.userDestinationId = null;
        form.comment = "";
        showModal.value = false;
    } catch (err) {
        console.error("Error al guardar movimiento:", err);
        alert("Error al registrar movimiento ❌");
    }
}
</script>
