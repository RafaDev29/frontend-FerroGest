<template>
    <v-container>
      <v-row class="py-6">
        <v-col>
          <div class="d-flex justify-space-between align-center">
            <h1 class="text-h4 font-weight-bold">Gestión de Productos</h1>
            <v-btn color="orange" @click="showCreateDialog = true">
              Crear +
            </v-btn>
          </div>
          <ProductTable />
        </v-col>
      </v-row>
  
      <!-- Componente de formulario para crear un producto -->
      <CreateProductDialog v-model:visible="showCreateDialog" />
    </v-container>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import ProductTable from '@/components/product/ProductTable.vue';
  import CreateProductDialog from '@/components/product/CreateProductDialog.vue';
  
  const showCreateDialog = ref(false);
  </script>
  
  <style scoped>
  /* Añade estilos específicos aquí si es necesario */
  </style>
  