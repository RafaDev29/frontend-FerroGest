<template>
  <v-container>
    <v-row class="py-6">
      <v-col>
        <div class="d-flex justify-space-between align-center">
          <h1 class="text-h4 font-weight-bold">Gestión de Categorías</h1>
          <v-btn color="orange" @click="showCreateDialog = true">
            Crear +
          </v-btn>
        </div>
        <CategoryTable />
      </v-col>
    </v-row>

    <!-- Componente de formulario para crear una categoría -->
    <CreateCategoryDialog v-model:visible="showCreateDialog" />
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import CategoryTable from '@/components/category/CategoryTable.vue';
import CreateCategoryDialog from '@/components/category/CreateCategoryDialog.vue';

const showCreateDialog = ref(false);
</script>

<style scoped>

</style>
