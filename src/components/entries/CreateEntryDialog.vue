<template>
    <v-dialog v-model="internalVisible" max-width="600px">
      <v-card>
        <v-card-title class="text-h5">
          Crear Entrada de Almacén
        </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-text-field
              v-model="entry.product_id"
              label="ID del Producto"
              type="number"
              required
            ></v-text-field>
            <v-text-field
              v-model="entry.entry_date"
              label="Fecha de Entrada"
              type="date"
              required
            ></v-text-field>
            <v-text-field
              v-model="entry.quantity"
              label="Cantidad"
              type="number"
              required
            ></v-text-field>
            <v-text-field
              v-model="entry.supplier_id"
              label="ID del Proveedor"
              type="number"
              required
            ></v-text-field>
            <v-text-field
              v-model="entry.reference_document"
              label="Documento de Referencia"
              required
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="blue darken-1" text @click="closeDialog">
            Cancelar
          </v-btn>
          <v-btn color="blue darken-1" text @click="saveEntry">
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
  import { createEntriesApi } from '@/api/EntriesService';
  
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
  const entry = ref({
    product_id: '',
    entry_date: '',
    quantity: 0,
    supplier_id: '',
    reference_document: '',
  });
  
  // Cerrar el diálogo
  const closeDialog = () => {
    internalVisible.value = false;
  };
  
  // Guardar la entrada llamando al servicio
  const saveEntry = async () => {
    if (valid.value) {
      try {
        const token = store.state.token;
        const response = await createEntriesApi(token, entry.value);
        if (response.status === 200) {
          console.log('Entrada creada exitosamente:', response.data);
          emit('entry-created');
          closeDialog();
        } else {
          console.error('Error al crear la entrada:', response);
        }
      } catch (error) {
        console.error('Error al crear la entrada:', error);
      }
    }
  };
  </script>
  
  <style scoped>
  /* Añade estilos específicos aquí si es necesario */
  </style>
  