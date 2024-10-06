<template>
    <v-dialog v-model="internalVisible" max-width="600px">
      <v-card>
        <v-card-title class="text-h5">
          Crear Categoría
        </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-text-field
              v-model="category.name"
              label="Nombre de la Categoría"
              required
            ></v-text-field>
            <v-text-field
              v-model="category.description"
              label="Descripción"
              required
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="blue darken-1" text @click="closeDialog">
            Cancelar
          </v-btn>
          <v-btn color="blue darken-1" text @click="saveCategory">
            Guardar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  import { defineProps, defineEmits } from 'vue';
  import store from '@/store';
  import { createCategoryApi } from '@/api/CategoryService';
  
  const props = defineProps({
    visible: {
      type: Boolean,
      required: true,
    },
  });
  
  const emit = defineEmits(['update:visible']);
  
  // Estado interno para manejar el cuadro de diálogo
  const internalVisible = ref(props.visible);
  watch(() => props.visible, (newValue) => {
    internalVisible.value = newValue;
  });
  
  watch(internalVisible, (newValue) => {
    emit('update:visible', newValue);
  });
  
  const valid = ref(false);
  const category = ref({
    name: '',
    description: '',
  });
  
  // Cerrar el diálogo
  const closeDialog = () => {
    internalVisible.value = false;
  };
  
  // Guardar la categoría llamando al servicio
  const saveCategory = async () => {
    if (valid.value) {
      try {
        const token = store.state.token;
        const response = await createCategoryApi(token, category.value);
        if (response.status === 200) {
          console.log('Categoría creada exitosamente:', response.data);
          emit('category-created');
          closeDialog();
        } else {
          console.error('Error al crear la categoría:', response);
        }
      } catch (error) {
        console.error('Error al crear la categoría:', error);
      }
    }
  };
  </script>
  
  <style scoped>
  /* Añade estilos específicos aquí si es necesario */
  </style>
  