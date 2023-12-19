import axios from "axios";
const BASE_URL = 'http://35.199.98.167/laravel-dit/public/api/crud'

// Función para obtener todos los elementos
export const getAll = async () => {
    try {
      const response = await axios.get(BASE_URL);
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };

  export const addNew = async (newDATA) => {
    try {
      const response = await axios.post(BASE_URL, newDATA );
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };
  
  // Función para obtener un elemento por ID
  export const getById = async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };
  
  // Función para actualizar un elemento por ID
  export const updateById = async (id, newData) => {
    try {
      const response = await axios.put(`${BASE_URL}/${id}`, newData);
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };
  
  // Función para eliminar un elemento por ID
  export const deleteById = async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };