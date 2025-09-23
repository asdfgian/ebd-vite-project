<template>
    <div class="h-full px-16 py-5">
        <div v-if="loading">Cargando usuarios...</div>
        <div v-else-if="error" class="text-red-600">{{ error }}</div>
        <div class="overflow-x-auto shadow-2xl sm:rounded-lg max-h-[500px] overflow-y-auto">
            <table class="w-full text-sm text-left rtl:text-right text-black">
                <thead class="text-xs text-white uppercase bg-orange-ebd">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            Nombre de usuario
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Nombre
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Estado
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Rol
                        </th>
                        <th class="px-6 py-3">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in users" :key="user.id"
                        class="bg-white border-b border-gray-200 hover:bg-gray-200">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            {{ user.username }}
                        </th>
                        <td class="px-6 py-4">
                            {{ user.name }}
                        </td>
                        <td class="px-6 py-4"
                            :class="user.status == 'A' ? 'text-green-600 font-bold' : 'text-red-600 font-bold'">
                            {{ user.status == 'A' ? "Activo" : "Inactivo" }}
                        </td>
                        <td class="px-6 py-4">
                            {{ user.roleName }}
                        </td>
                        <td class="px-6 py-4 flex gap-4">
                            <a class="font-medium text-orange-ebd hover:underline cursor-pointer"
                                @click="openDetail(user.id)">
                                Ver detalle
                            </a>
                            <a class="font-medium text-orange-ebd hover:underline cursor-pointer"
                                @click="openEdit(user)">
                                Editar
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
            <nav class="flex items-center flex-column flex-wrap md:flex-row justify-between py-2 px-3">
                <span class="text-sm font-normal text-gray-500 mb-4 md:mb-0 block w-full md:inline md:w-auto">Mostrando
                    <span class="font-semibold text-gray-900">{{ users.length }}</span>
                </span>
            </nav>
            <!-- Detalle -->
            <div v-if="showDetail" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                <div class="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
                    <h2 class="text-xl font-bold mb-4">Detalle de Usuario</h2>
                    <img :src="detail?.avatarUrl" alt="avatar"
                        class="w-35 h-35 rounded-full mb-4 mx-auto" />
                    <p><strong>Email:</strong> {{ detail?.email }}</p>
                    <p><strong>Usuario:</strong> {{ detail?.username }}</p>
                    <p><strong>Nombre:</strong> {{ detail?.name }}</p>
                    <p><strong>Teléfono:</strong> {{ detail?.phone || '-' }}</p>
                    <p><strong>Estado:</strong> {{ detail?.status }}</p>
                    <p><strong>Rol:</strong> {{ detail?.roleName }}</p>
                    <p><strong>Departamento:</strong> {{ detail?.departmentId }}</p>
                    <p><strong>Creado:</strong> {{ formatDate(detail?.createdAt) }}</p>
                    <p><strong>Actualizado:</strong> {{ formatDate(detail?.updatedAt) }}</p>

                    <div class="mt-4 flex justify-end">
                        <button @click="showDetail = false" class="px-4 py-2 bg-orange-ebd text-white rounded">
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
            <!-- Editar -->
            <div v-if="showEdit" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                <div class="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
                    <h2 class="text-xl font-bold mb-4">Editar Usuario</h2>
                    <form @submit.prevent="updateUser">
                        <div class="mb-3">
                            <label class="block text-sm">Usuario</label>
                            <input v-model="editForm.username" class="w-full border px-2 py-1 rounded" />
                        </div>
                        <div class="mb-3">
                            <label class="block text-sm">Teléfono</label>
                            <input v-model="editForm.phone" class="w-full border px-2 py-1 rounded" />
                        </div>
                        <div class="mb-3">
                            <label class="block text-sm">Avatar URL</label>
                            <input v-model="editForm.avatarUrl" class="w-full border px-2 py-1 rounded" />
                        </div>
                        <div class="mb-3">
                            <label class="block text-sm">Departamento</label>
                            <input v-model="editForm.departmentId" type="number"
                                class="w-full border px-2 py-1 rounded" />
                        </div>

                        <div class="mt-4 flex justify-end gap-3">
                            <button type="button" @click="showEdit = false"
                                class="px-4 py-2 bg-gray-400 text-white rounded">
                                Cancelar
                            </button>
                            <button type="submit" class="px-4 py-2 bg-orange-ebd text-white rounded">
                                Guardar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getAllUsers, getUserDetail, updateUserApi } from "../../services/UserService";

const users = ref([]);
const loading = ref(true);
const error = ref("");
const showDetail = ref(false);
const detail = ref(null);
const showEdit = ref(false);
const editForm = ref({});

onMounted(async () => {
    try {
        const response = await getAllUsers();
        users.value = response.data;
    } catch (err) {
        error.value = err.response?.data?.message || "Error al cargar usuarios";
    } finally {
        loading.value = false;
    }
});

const openDetail = async (id) => {
    try {
        const response = await getUserDetail(id);
        detail.value = response.data;
        showDetail.value = true;
    } catch (err) {
        console.error("Error al traer detalle:", err);
    }
};

const openEdit = (user) => {
    editForm.value = {
        username: user.username,
        phone: user.phone || "",
        avatarUrl: user.avatarUrl || "",
        departmentId: user.departmentId || null,
    };
    showEdit.value = true;
};

const updateUser = async () => {
    try {
        await updateUserApi(editForm.value);
        showEdit.value = false;
        const response = await getAllUsers();
        users.value = response.data;
    } catch (err) {
        console.error("Error al actualizar usuario:", err);
    }
};

const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleString();
};
</script>