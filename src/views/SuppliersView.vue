<template>
    <v-container>
      <v-row class="py-6">
        <v-col>
          <div class="d-flex justify-space-between align-center">
            <h1 class="text-h4 font-weight-bold">Gestión de Proveedores</h1>
            <v-btn color="primary" @click="showCreateDialog = true">
              Crear +
            </v-btn>
          </div>
          <SuppliersTable />
        </v-col>
      </v-row>
  
      
      <CreateSupplierDialog v-model:visible="showCreateDialog" />
    </v-container>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import SuppliersTable from '@/components/suppliers/SuppliersTable.vue';
  import CreateSupplierDialog from '@/components/suppliers/CreateSupplierDialog.vue';
  
  const showCreateDialog = ref(false);
  </script>
  
  <style scoped>
  /* Añade estilos específicos aquí si es necesario */
  </style>
  