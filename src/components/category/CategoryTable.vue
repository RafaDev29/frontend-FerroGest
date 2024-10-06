<template>
    <v-card class="my-6">
      <v-card-title class="text-h6">Lista de Categorías</v-card-title>
  
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
  
      <!-- Tabla de categorías -->
      <v-data-table
        :headers="headers"
        :items="filteredCategories"
        item-value="id"
        class="elevation-1"
      >
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn color="primary" @click="editCategory(item)">Editar</v-btn>
          <v-btn color="error" @click="deleteCategory(item)">Eliminar</v-btn>
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
  import { listCategoryApi } from '@/api/CategoryService';
  import store from '@/store';
  
  const search = ref('');
  const loading = ref(false);
  const headers = ref([
    { title: 'ID', value: 'id' },
    { title: 'Nombre de la Categoría', value: 'name' },
    { title: 'Descripción', value: 'description' },
   // { title: 'Acciones', value: 'actions', sortable: false },
  ]);
  
  const categories = ref([]);
  
  // Categorías filtradas según el término de búsqueda
  const filteredCategories = computed(() => {
    if (!search.value) {
      return categories.value;
    }
    return categories.value.filter(category =>
      category.name.toLowerCase().includes(search.value.toLowerCase()) ||
      category.description.toLowerCase().includes(search.value.toLowerCase())
    );
  });
  
  // Función para obtener las categorías desde la API
  const fetchCategories = async () => {
    loading.value = true;
    try {
      const token = store.state.token;
      const response = await listCategoryApi(token);
      if (response.data && response.data.status) {
        categories.value = response.data.data;
      }
    } catch (error) {
      console.error('Error al obtener las categorías:', error);
    } finally {
      loading.value = false;
    }
  };
  
  // Función para editar una categoría (implementación pendiente)
  const editCategory = (category) => {
    console.log('Editar categoría:', category);
  };
  
  // Función para eliminar una categoría (implementación pendiente)
  const deleteCategory = (category) => {
    console.log('Eliminar categoría:', category);
  };
  
  // Llamar a la API cuando el componente se monta
  onMounted(() => {
    fetchCategories();
  });
  </script>
  
  <style scoped>
  /* Añade estilos específicos aquí si es necesario */
  </style>
  