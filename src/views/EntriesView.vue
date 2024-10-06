<template>
    <v-container>
      <v-row class="py-6">
        <v-col>
          <div class="d-flex justify-space-between align-center">
            <h1 class="text-h4 font-weight-bold">Gestión de Entradas de Almacén</h1>
            <v-btn color="orange" @click="showCreateDialog = true">
              Crear Entrada
            </v-btn>
          </div>
          <EntriesTable />
        </v-col>
      </v-row>
  
      <!-- Componente de formulario para crear una entrada -->
      <CreateEntryDialog v-model:visible="showCreateDialog" />
    </v-container>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import EntriesTable from '@/components/entries/EntriesTable.vue';
  import CreateEntryDialog from '@/components/entries/CreateEntryDialog.vue';
  
  const showCreateDialog = ref(false);
  </script>
  
  <style scoped>
  /* Añade estilos específicos aquí si es necesario */
  </style>
  