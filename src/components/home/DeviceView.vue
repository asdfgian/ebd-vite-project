<template>
    <div class="px-16 py-4">
        <div class="grid grid-rows-[5rem_1fr] grid-cols-3 gap-4 h-full">
            <div class="col-span-3">
                <div class="w-full h-full bg-white rounded-lg shadow-md flex items-center">
                    <MovementForm v-if="deviceDetails?.id" :deviceId="deviceDetails.id" @movement-created="loadMovementHistory" />
                </div>
            </div>

            <!-- Tabla -->
            <div class="col-span-2 row-start-2">
                <div class="w-full max-h-[46.5rem] bg-white rounded-lg shadow-md p-5 flex flex-col">
                    <div class="flex justify-between items-center mb-2">
                        <span v-if="loading" class="text-gray-600">Cargando dispositivos...</span>
                        <span v-if="error" class="text-red-600">{{ error }}</span>
                        <button @click="openCreate"
                            class="px-4 py-2 bg-orange-ebd text-white rounded hover:bg-orange-500 cursor-pointer">
                            + Nuevo
                        </button>
                    </div>

                    <div class="overflow-y-auto flex-1">
                        <table class="w-full text-sm text-left rtl:text-right text-black">
                            <thead class="text-xs text-white uppercase bg-orange-ebd sticky top-0 z-10">
                                <tr>
                                    <th scope="col" class="px-6 py-3">ID</th>
                                    <th scope="col" class="px-6 py-3">Name</th>
                                    <th scope="col" class="px-6 py-3">Precio</th>
                                    <th scope="col" class="px-6 py-3">Marca</th>
                                    <th scope="col" class="px-6 py-3">Estado</th>
                                    <th scope="col" class="px-6 py-3">Accion</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="device in devices" :key="device.id" class="bg-white border-b border-gray-200 hover:bg-gray-200">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        {{ device.id }}
                                    </th>
                                    <td class="px-6 py-4">{{ device.name }}</td>
                                    <td class="px-6 py-4">S/ {{ device.price || "-" }}</td>
                                    <td class="px-6 py-4">{{ device.brandName || "-" }}</td>
                                    <td class="px-6 py-4">
                                        <span :class="getStatusClass(device.status)">
                                            {{ device.status }}
                                        </span>
                                    </td>
                                    <td class="px-6 py-4">
                                        <a @click="openDetail(device.id)"
                                            class="font-medium text-orange-ebd hover:underline cursor-pointer">Detalles</a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <!-- Detalles -->
            <div class="col-start-3 row-start-2">
                <div class="w-full h-full bg-white rounded-xl shadow-lg p-6 flex flex-col gap-4">
                    <h2 class="text-center text-2xl font-bold text-blue-ebd">{{ deviceDetails?.name || "Sin seleccionar" }}</h2>

                    <div v-if="deviceDetails" class="grid grid-cols-2 gap-4 text-gray-700 text-sm">
                        <div class="bg-gray-100 p-3 rounded-lg">
                            <p class="font-semibold">Modelo:</p>
                            <span>{{ deviceDetails.model || "-" }}</span>
                        </div>
                        <div class="bg-gray-100 p-3 rounded-lg">
                            <p class="font-semibold">Serie:</p>
                            <span>{{ deviceDetails.serialNumber }}</span>
                        </div>
                        <div class="bg-gray-100 p-3 rounded-lg">
                            <p class="font-semibold">Precio:</p>
                            <span>${{ deviceDetails.price }}</span>
                        </div>
                        <div class="bg-gray-100 p-3 rounded-lg">
                            <p class="font-semibold">Estado:</p>
                            <span :class="getStatusClass(deviceDetails.status)">{{ deviceDetails.status }}</span>
                        </div>
                        <div class="col-span-2 bg-gray-100 p-3 rounded-lg">
                            <p class="font-semibold">Descripción:</p>
                            <span>{{ deviceDetails.description || "-" }}</span>
                        </div>

                        <!-- Historial de movimientos -->
                        <div class="col-span-2">
                            <p class="font-semibold mb-2">Historial de movimientos:</p>
                            <div class="flex-1 overflow-y-auto max-h-64 pr-2 border-l-2 border-blue-ebd pl-4">
                                <div v-if="movements.length === 0" class="text-gray-400 text-sm">
                                    No hay movimientos registrados
                                </div>
                                <div v-for="movement in movements" :key="movement.id" class="mb-4">
                                    <div class="absolute w-3 h-3 bg-blue-ebd rounded-full -start-1.5 mt-1.5"></div>
                                    <time class="block text-xs text-gray-400">
                                        {{ formatDate(movement.date) }}
                                    </time>
                                    <div class="flex gap-2">
                                        <h3 class="text-xs font-semibold text-gray-800">{{ movement.type }}</h3>
                                    </div>
                                    <p class="text-xs text-gray-600">{{ movement.comment }}</p>
                                    <p class="text-xs font-bold text-orange-ebd mt-1">
                                        Origen: <span class="font-normal text-gray-600">{{ getUserName(movement.userOriginId) }}</span>
                                        | Destino: <span class="font-normal text-gray-600">{{ getUserName(movement.userDestinationId) }}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-else class="flex items-center justify-center text-gray-400 h-full">
                        Selecciona un dispositivo para ver detalles
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Registra dispositivo -->
    <div v-if="showDeviceCreate" class="fixed inset-0 z-20 bg-gray-100/40 flex justify-center items-center">
        <div class="relative bg-blue-ebd rounded-lg shadow-sm w-full max-w-2xl">
            <div
                class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                    {{ editingDeviceId ? 'Editar dispositivo' : 'Registrar dispositivo' }}
                </h3>
                <button type="button" @click="closeCreateModal"
                    class="text-white bg-transparent rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center hover:bg-blue-950">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                </button>
            </div>
            <form @submit.prevent="saveDevice" class="p-4 md:p-5">
                <div class="grid gap-4 mb-4 grid-cols-2">
                    <div class="col-span-1">
                        <label class="block mb-2 text-sm font-medium text-white">Nombre *</label>
                        <input v-model="createForm.name" type="text"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            placeholder="Ejemplo: Switch" required="">
                    </div>
                    <div class="col-span-1">
                        <label class="block mb-2 text-sm font-medium text-white">Modelo</label>
                        <input v-model="createForm.model" type="text"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white">
                    </div>
                    <div class="col-span-1">
                        <label class="block mb-2 text-sm font-medium text-white">Serie *</label>
                        <input v-model="createForm.serialNumber" type="text"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            placeholder="Ejemplo: CS9300A1Z8X" required="">
                    </div>
                    <div class="col-span-1">
                        <label class="block mb-2 text-sm font-medium text-white">Marca *</label>
                        <input v-model="createForm.brandId" type="number"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            placeholder="ID de marca" required="">
                    </div>
                    <div class="col-span-1">
                        <label class="block mb-2 text-sm font-medium text-white">Estado *</label>
                        <select v-model="createForm.status"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            required="">
                            <option value="">Selecciona un estado</option>
                            <option value="Activo">Activo</option>
                            <option value="Inactivo">Inactivo</option>
                            <option value="Mantenimiento">Mantenimiento</option>
                        </select>
                    </div>
                    <div class="col-span-1">
                        <label class="block mb-2 text-sm font-medium text-white">Precio *</label>
                        <input v-model="createForm.price" type="number" step="0.01"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            placeholder="1002.54" required="">
                    </div>
                    <div class="col-span-2">
                        <label class="block mb-2 text-sm font-medium text-white">Descripción</label>
                        <textarea v-model="createForm.description"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            placeholder="Descripción del dispositivo"></textarea>
                    </div>
                </div>
                <div class="flex justify-end gap-3">
                    <button type="button" @click="closeCreateModal"
                        class="text-gray-800 bg-gray-200 rounded-lg text-sm px-5 py-2.5 cursor-pointer hover:bg-gray-300">
                        Cancelar
                    </button>
                    <button type="submit"
                        class="text-white inline-flex items-center bg-orange-ebd cursor-pointer rounded-lg text-sm px-5 py-2.5 text-center hover:bg-orange-600">
                        {{ editingDeviceId ? 'Actualizar' : 'Guardar' }}
                    </button>
                </div>
            </form>
        </div>

    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import MovementForm from '../shared/MovementForm.vue';
import {
    getAllDevices,
    getDeviceDetail,
    createDeviceApi,
    updateDeviceApi,
} from '../../services/DeviceService';
import { getMovementsByDeviceId } from '../../services/MovementService';
import { getAllUsers } from '../../services/UserService';

const devices = ref([]);
const deviceDetails = ref(null);
const movements = ref([]);
const users = ref([]);
const showDeviceCreate = ref(false);
const loading = ref(true);
const error = ref('');
const editingDeviceId = ref(null);

const createForm = ref({
    name: '',
    description: '',
    price: 0,
    model: '',
    serialNumber: '',
    status: '',
    brandId: 0,
});

const resetForm = () => {
    createForm.value = {
        name: '',
        description: '',
        price: 0,
        model: '',
        serialNumber: '',
        status: '',
        brandId: 0,
    };
    editingDeviceId.value = null;
};

onMounted(async () => {
    try {
        const [devicesResponse, usersResponse] = await Promise.all([
            getAllDevices(),
            getAllUsers(),
        ]);
        devices.value = devicesResponse.data;
        users.value = usersResponse.data;
    } catch (err) {
        error.value = err.response?.data?.message || 'Error al cargar dispositivos';
    } finally {
        loading.value = false;
    }
});

const openDetail = async (id) => {
    try {
        const response = await getDeviceDetail(id);
        deviceDetails.value = response.data;
        await loadMovementHistory();
    } catch (err) {
        console.error('Error al traer detalle:', err);
        error.value = 'Error al cargar el detalle del dispositivo';
    }
};

const loadMovementHistory = async () => {
    try {
        if (deviceDetails.value?.id) {
            const response = await getMovementsByDeviceId(deviceDetails.value.id);
            movements.value = response.data || [];
        }
    } catch (err) {
        console.error('Error al cargar movimientos:', err);
        movements.value = [];
    }
};

const getUserName = (userId) => {
    if (!userId) return "-";
    const user = users.value.find(u => u.id === userId);
    return user?.name || `Usuario ${userId}`;
};

const openCreate = () => {
    resetForm();
    showDeviceCreate.value = true;
};

const closeCreateModal = () => {
    showDeviceCreate.value = false;
    resetForm();
};

const saveDevice = async () => {
    try {
        if (editingDeviceId.value) {
            await updateDeviceApi(editingDeviceId.value, createForm.value);
        } else {
            await createDeviceApi(createForm.value);
        }
        
        // Recargar lista
        const response = await getAllDevices();
        devices.value = response.data;
        
        closeCreateModal();
        error.value = '';
    } catch (err) {
        error.value = err.response?.data?.message || 'Error al guardar dispositivo';
        console.error('Error:', err);
    }
};

const getStatusClass = (status) => {
    const classes = 'px-2 py-1 rounded text-xs font-semibold';
    if (status === 'Activo') return `${classes} bg-green-100 text-green-800`;
    if (status === 'Inactivo') return `${classes} bg-red-100 text-red-800`;
    if (status === 'Mantenimiento') return `${classes} bg-yellow-100 text-yellow-800`;
    return classes;
};

const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleString('es-ES');
};
</script>