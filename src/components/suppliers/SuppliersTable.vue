<template>
    <v-card class="my-6">
     
  
      <!-- Campo de búsqueda -->
      <v-text-field
        v-model="search"
        label="Buscar"
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        hide-details
        single-line
        class="mb-4"
      ></v-text-field>
  
      <!-- Tabla de proveedores -->
      <v-data-table
        :headers="headers"
        :items="filteredSuppliers"
        item-value="id"
        class="elevation-1"
      >
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn color="primary" @click="editSupplier(item)">Editar</v-btn>
          <v-btn color="error" @click="deleteSupplier(item)">Eliminar</v-btn>
        </template>
      </v-data-table>
  
      <!-- Spinner de carga -->
      <v-overlay :value="loading">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
    </v-card>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  import { listSuppliersApi } from '@/api/SuppliersService';
  import store from '@/store';
  
  const search = ref('');
  const loading = ref(false);
  const headers = ref([
    { title: 'ID', value: 'id' },
    { title: 'Nombre del Proveedor', value: 'name' },
    { title: 'Teléfono', value: 'phone' },
    { title: 'Correo Electrónico', value: 'email' },
    //{ text: 'Acciones', value: 'actions', sortable: false },
  ]);
  
  const suppliers = ref([]);
  
  // Proveedores filtrados según el término de búsqueda
  const filteredSuppliers = computed(() => {
    if (!search.value) {
      return suppliers.value;
    }
    return suppliers.value.filter(supplier =>
      supplier.name.toLowerCase().includes(search.value.toLowerCase()) ||
      supplier.email.toLowerCase().includes(search.value.toLowerCase())
    );
  });
  
  // Función para obtener los proveedores desde la API
  const fetchSuppliers = async () => {
    loading.value = true;
    try {
      const token = store.state.token;
      const response = await listSuppliersApi(token);
      if (response.data && response.data.status) {
        suppliers.value = response.data.data;
      }
    } catch (error) {
      console.error('Error al obtener los proveedores:', error);
    } finally {
      loading.value = false;
    }
  };
  
  // Función para editar un proveedor (implementación pendiente)
  const editSupplier = (supplier) => {
    console.log('Editar proveedor:', supplier);
  };
  
  // Función para eliminar un proveedor (implementación pendiente)
  const deleteSupplier = (supplier) => {
    console.log('Eliminar proveedor:', supplier);
  };
  
  // Llamar a la API cuando el componente se monta
  onMounted(() => {
    fetchSuppliers();
  });
  </script>
  
  <style scoped>
  /* Añade estilos específicos aquí si es necesario */
  </style>
  