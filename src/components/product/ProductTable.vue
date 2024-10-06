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
  
      <!-- Tabla de productos -->
      <v-data-table
        :headers="headers"
        :items="filteredProducts"
        item-value="id"
        class="elevation-1"
      >
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn color="primary" @click="editProduct(item)">Editar</v-btn>
          <v-btn color="error" @click="deleteProduct(item)">Eliminar</v-btn>
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
  import { listProductsApi } from '@/api/ProductsService';
  import store from '@/store';
  
  const search = ref('');
  const loading = ref(false);
  const headers = ref([
    { title: 'ID', value: 'id' },
    { title: 'Nombre del Producto', value: 'name' },
    {title: 'Descripción', value: 'description'},
    { title: 'Categoría', value: 'category_name' },
    { title: 'Cantidad Disponible', value: 'quantity_available' },
   
    // { title: 'Acciones', value: 'actions', sortable: false },
  ]);
  
  const products = ref([]);
  
  // Productos filtrados según el término de búsqueda
  const filteredProducts = computed(() => {
    if (!search.value) {
      return products.value;
    }
    return products.value.filter(product =>
      product.name.toLowerCase().includes(search.value.toLowerCase()) ||
      product.category_name.toLowerCase().includes(search.value.toLowerCase())
    );
  });
  
  // Función para obtener los productos desde la API
  const fetchProducts = async () => {
    loading.value = true;
    try {
      const token = store.state.token;
      const response = await listProductsApi(token);
      if (response.data && response.data.status) {
        products.value = response.data.data;
      }
    } catch (error) {
      console.error('Error al obtener los productos:', error);
    } finally {
      loading.value = false;
    }
  };
  
  // Función para editar un producto (implementación pendiente)
  const editProduct = (product) => {
    console.log('Editar producto:', product);
  };
  
  // Función para eliminar un producto (implementación pendiente)
  const deleteProduct = (product) => {
    console.log('Eliminar producto:', product);
  };
  
  // Llamar a la API cuando el componente se monta
  onMounted(() => {
    fetchProducts();
  });
  </script>
  
  <style scoped>
  /* Añade estilos específicos aquí si es necesario */
  </style>
  