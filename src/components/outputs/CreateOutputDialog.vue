<template>
    <v-dialog v-model="internalVisible" max-width="600px">
      <v-card>
        <v-card-title class="text-h5">
          Crear Salida de Almacén
        </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-text-field
              v-model="output.product_id"
              label="ID del Producto"
              type="number"
              required
            ></v-text-field>
            <v-text-field
              v-model="output.output_date"
              label="Fecha de Salida"
              type="date"
              required
            ></v-text-field>
            <v-text-field
              v-model="output.quantity"
              label="Cantidad"
              type="number"
              required
            ></v-text-field>
            <v-text-field
              v-model="output.destination"
              label="Destino"
              required
            ></v-text-field>
            <v-text-field
              v-model="output.reference_document"
              label="Documento de Referencia"
              required
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="blue darken-1" text @click="closeDialog">
            Cancelar
          </v-btn>
          <v-btn color="blue darken-1" text @click="saveOutput">
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
  import { createOutputsApi } from '@/api/OutputsService';
  
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
  const output = ref({
    product_id: '',
    output_date: '',
    quantity: 0,
    destination: '',
    reference_document: '',
  });
  
  // Cerrar el diálogo
  const closeDialog = () => {
    internalVisible.value = false;
  };
  
  // Guardar la salida llamando al servicio
  const saveOutput = async () => {
    if (valid.value) {
      try {
        const token = store.state.token;
        const response = await createOutputsApi(token, output.value);
        if (response.status === 200) {
          console.log('Salida creada exitosamente:', response.data);
          emit('output-created');
          closeDialog();
        } else {
          console.error('Error al crear la salida:', response);
        }
      } catch (error) {
        console.error('Error al crear la salida:', error);
      }
    }
  };
  </script>
  
  <style scoped>
  /* Añade estilos específicos aquí si es necesario */
  </style>
  