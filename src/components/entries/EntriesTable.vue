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
  
      <!-- Tabla de entradas -->
      <v-data-table
        :headers="headers"
        :items="filteredEntries"
        item-value="id"
        class="elevation-1"
      >
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn class="mr-2" color="green" @click="editEntry(item)">Editar</v-btn>
          <v-btn color="error" @click="deleteEntry(item)">Eliminar</v-btn>
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
  import { listEntriesApi } from '@/api/EntriesService';
  import store from '@/store';
  
  const search = ref('');
  const loading = ref(false);
  const headers = ref([
    { title: 'ID', value: 'id' },
    { title: 'Producto', value: 'product_name' },
    { title: 'Cantidad', value: 'quantity' },
    { title: 'Proveedor', value: 'supplier_name' },
    { title: 'Usuario', value: 'user_name' },
    { title: 'Documento de Referencia', value: 'reference_document' },
    { title: 'Fecha de Entrada', value: 'entry_date' },
   // { title: 'Acciones', value: 'actions', sortable: false },
  ]);
  
  const entries = ref([]);
  
  // Entradas filtradas según el término de búsqueda
  const filteredEntries = computed(() => {
    if (!search.value) {
      return entries.value;
    }
    return entries.value.filter(entry =>
      entry.product_name.toLowerCase().includes(search.value.toLowerCase()) ||
      entry.supplier_name.toLowerCase().includes(search.value.toLowerCase()) ||
      entry.user_name.toLowerCase().includes(search.value.toLowerCase()) ||
      entry.reference_document.toLowerCase().includes(search.value.toLowerCase())
    );
  });
  
  // Función para obtener las entradas desde la API
  const fetchEntries = async () => {
    loading.value = true;
    try {
      const token = store.state.token;
      const response = await listEntriesApi(token);
      if (response.data && response.data.status) {
        entries.value = response.data.data.map(entry => ({
          id: entry.id,
          entry_date: new Date(entry.entry_date).toLocaleDateString(),
          quantity: entry.quantity,
          supplier_name: entry.supplier.name,
          user_name: entry.user.name,
          reference_document: entry.reference_document,
          product_name: entry.product.name,
        }));
      }
    } catch (error) {
      console.error('Error al obtener las entradas:', error);
    } finally {
      loading.value = false;
    }
  };
  
  // Función para editar una entrada (implementación pendiente)
  const editEntry = (entry) => {
    console.log('Editar entrada:', entry);
  };
  
  // Función para eliminar una entrada (implementación pendiente)
  const deleteEntry = (entry) => {
    console.log('Eliminar entrada:', entry);
  };
  
  // Llamar a la API cuando el componente se monta
  onMounted(() => {
    fetchEntries();
  });
  </script>
  
  <style scoped>
  /* Añade estilos específicos aquí si es necesario */
  </style>
  