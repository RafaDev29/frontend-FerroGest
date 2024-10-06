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
  
      <!-- Tabla de salidas -->
      <v-data-table
        :headers="headers"
        :items="filteredOutputs"
        item-value="id"
        class="elevation-1"
      >
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn color="primary" @click="editOutput(item)">Editar</v-btn>
          <v-btn color="error" @click="deleteOutput(item)">Eliminar</v-btn>
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
  import { listOutputsApi } from '@/api/OutputsService';
  import store from '@/store';
  
  const search = ref('');
  const loading = ref(false);
  const headers = ref([
    { title: 'ID', value: 'id' },
    { title: 'Producto', value: 'product_name' },
    { title: 'Cantidad', value: 'quantity' },
    { title: 'Fecha de Salida', value: 'output_date' },
    { title: 'Usuario', value: 'user_name' },
    { title: 'Destino', value: 'destination' },
    { title: 'Documento de Referencia', value: 'reference_document' },
   // { title: 'Acciones', value: 'actions', sortable: false },
  ]);
  
  const outputs = ref([]);
  
  // Salidas filtradas según el término de búsqueda
  const filteredOutputs = computed(() => {
    if (!search.value) {
      return outputs.value;
    }
    return outputs.value.filter(output =>
      output.product_name.toLowerCase().includes(search.value.toLowerCase()) ||
      output.user_name.toLowerCase().includes(search.value.toLowerCase()) ||
      output.destination.toLowerCase().includes(search.value.toLowerCase()) ||
      output.reference_document.toLowerCase().includes(search.value.toLowerCase())
    );
  });
  
  // Función para obtener las salidas desde la API
  const fetchOutputs = async () => {
    loading.value = true;
    try {
      const token = store.state.token;
      const response = await listOutputsApi(token);
      if (response.data && response.data.status) {
        outputs.value = response.data.data.map(output => ({
          id: output.id,
          output_date: new Date(output.output_date).toLocaleDateString(),
          quantity: output.quantity,
          user_name: output.user.name,
          destination: output.destination,
          reference_document: output.reference_document,
          product_name: output.product.name,
        }));
      }
    } catch (error) {
      console.error('Error al obtener las salidas:', error);
    } finally {
      loading.value = false;
    }
  };
  
  // Función para editar una salida (implementación pendiente)
  const editOutput = (output) => {
    console.log('Editar salida:', output);
  };
  
  // Función para eliminar una salida (implementación pendiente)
  const deleteOutput = (output) => {
    console.log('Eliminar salida:', output);
  };
  
  // Llamar a la API cuando el componente se monta
  onMounted(() => {
    fetchOutputs();
  });
  </script>
  
  <style scoped>
  /* Añade estilos específicos aquí si es necesario */
  </style>
  