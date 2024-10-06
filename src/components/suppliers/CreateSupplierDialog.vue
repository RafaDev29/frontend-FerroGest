<template>
    <v-dialog v-model="internalVisible" max-width="600px">
      <v-card>
        <v-card-title class="text-h5">
          Crear Proveedor
        </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-text-field
              v-model="supplier.name"
              label="Nombre del Proveedor"
              required
            ></v-text-field>
            <v-text-field
              v-model="supplier.contact"
              label="Contacto"
              required
            ></v-text-field>
            <v-text-field
              v-model="supplier.address"
              label="Dirección"
              required
            ></v-text-field>
            <v-text-field
              v-model="supplier.phone"
              label="Teléfono"
              required
            ></v-text-field>
            <v-text-field
              v-model="supplier.email"
              label="Correo Electrónico"
              type="email"
              required
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="blue darken-1" text @click="closeDialog">
            Cancelar
          </v-btn>
          <v-btn color="blue darken-1" text @click="saveSupplier">
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
  import { createSuppliersApi } from '@/api/SuppliersService';
  
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
  const supplier = ref({
    name: '',
    contact: '',
    address: '',
    phone: '',
    email: '',
  });
  
  // Cerrar el diálogo
  const closeDialog = () => {
    internalVisible.value = false;
  };
  
  // Guardar el proveedor llamando al servicio
  const saveSupplier = async () => {
    if (valid.value) {
      try {
        const token = store.state.token;
        const response = await createSuppliersApi(token, supplier.value);
        if (response.status === 200) {
          console.log('Proveedor creado exitosamente:', response.data);
          emit('supplier-created');
          closeDialog();
        } else {
          console.error('Error al crear el proveedor:', response);
        }
      } catch (error) {
        console.error('Error al crear el proveedor:', error);
      }
    }
  };
  </script>
  
  <style scoped>
  /* Añade estilos específicos aquí si es necesario */
  </style>
  