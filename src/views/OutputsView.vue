<template>
    <v-container>
      <v-row class="py-6">
        <v-col>
          <div class="d-flex justify-space-between align-center">
            <h1 class="text-h4 font-weight-bold">Gestión de Salidas de Almacén</h1>
            <v-btn color="orange" @click="showCreateDialog = true">
              Crear Salida
            </v-btn>
          </div>
          <OutputsTable />
        </v-col>
      </v-row>
  
      <!-- Componente de formulario para crear una salida -->
      <CreateOutputDialog v-model:visible="showCreateDialog" />
    </v-container>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import OutputsTable from '@/components/outputs/OutputsTable.vue';
  import CreateOutputDialog from '@/components/outputs/CreateOutputDialog.vue';
  
  const showCreateDialog = ref(false);
  </script>
  
  <style scoped>
  /* Añade estilos específicos aquí si es necesario */
  </style>
  