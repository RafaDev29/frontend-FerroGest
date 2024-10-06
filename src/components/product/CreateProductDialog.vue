<template>
    <v-dialog v-model="internalVisible" max-width="600px">
      <v-card>
        <v-card-title class="text-h5">
          Crear Producto
        </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-text-field
              v-model="product.name"
              label="Nombre del Producto"
              required
            ></v-text-field>
            <v-text-field
              v-model="product.description"
              label="Descripción"
              required
            ></v-text-field>
            <v-text-field
              v-model="product.category_id"
              label="ID de Categoría"
              type="number"
              required
            ></v-text-field>
            <v-text-field
              v-model="product.unit_of_measure"
              label="Unidad de Medida"
              required
            ></v-text-field>
            <v-text-field
              v-model="product.quantity_available"
              label="Cantidad Disponible"
              type="number"
              required
            ></v-text-field>
            <v-text-field
              v-model="product.reorder_point"
              label="Punto de Reorden"
              type="number"
              required
            ></v-text-field>
            <v-text-field
              v-model="product.supplier_id"
              label="ID de Proveedor"
              type="number"
              required
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="blue darken-1" text @click="closeDialog">
            Cancelar
          </v-btn>
          <v-btn color="blue darken-1" text @click="saveProduct">
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
  import { createProductsApi } from '@/api/ProductsService';
  
  const props = defineProps({
    visible: {
      type: Boolean,
      required: true,
    },
  });
  
  const emit = defineEmits(['update:visible', 'product-created']);
  
  // Estado interno para manejar el cuadro de diálogo
  const internalVisible = ref(props.visible);
  watch(() => props.visible, (newValue) => {
    internalVisible.value = newValue;
  });
  
  watch(internalVisible, (newValue) => {
    emit('update:visible', newValue);
  });
  
  const valid = ref(false);
  const product = ref({
    name: '',
    description: '',
    category_id: 1,
    unit_of_measure: '',
    quantity_available: 0,
    reorder_point: 0,
    supplier_id: 1,
  });
  
  // Cerrar el diálogo
  const closeDialog = () => {
    internalVisible.value = false;
  };
  
  // Guardar el producto llamando al servicio
  const saveProduct = async () => {
    if (valid.value) {
      try {
        const token = store.state.token;
        const response = await createProductsApi(token, product.value);
        if (response.status === 200) {
          console.log('Producto creado exitosamente:', response.data);
          emit('product-created');
          closeDialog();
        } else {
          console.error('Error al crear el producto:', response);
        }
      } catch (error) {
        console.error('Error al crear el producto:', error);
      }
    }
  };
  </script>
  
  <style scoped>
  /* Añade estilos específicos aquí si es necesario */
  </style>
  