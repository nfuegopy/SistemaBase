<template>

  <div class="container">
    <div class="header level">
  <div class="level-item">
    <p class="title is-3">Formulario Personal</p>
  </div>
</div>
<table class="table is-fullwidth is-bordered is-striped">
      <thead>
        <tr>
          <th>CI</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Telefono</th>
          <th>Email</th>
          <th>Acciones</th> 
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><input class="input" v-model="newPersonal.CI" type="text" placeholder="CI"></td>
          <td><input class="input" v-model="newPersonal.Nombre" type="text" placeholder="Nombre"></td>
          <td><input class="input" v-model="newPersonal.Apellido" type="text" placeholder="Apellido"></td>
          <td><input class="input" v-model="newPersonal.Telefono" type="text" placeholder="Telefono"></td>
          <td><input class="input" v-model="newPersonal.Email" type="text" placeholder="Email"></td>
          <td><button class="button is-success is-rounded" @click="addPersonal">Guardar</button></td>
        </tr>
        <tr v-for="personal in paginatedPersonales" :key="personal.CI">
          <td>
            <input
              v-if="editingCI === personal.CI"
              class="input"
              v-model="editingPersonal.CI"
              type="text"
            >
            <template v-else>
              {{ personal.CI }}
            </template>
          </td>
          <td>
            <input
              v-if="editingCI === personal.CI"
              class="input"
              v-model="editingPersonal.Nombre"
              type="text"
            >
            <template v-else>
              {{ personal.Nombre }}
            </template>
          </td>
           <td>
            <input
              v-if="editingCI === personal.CI"
              class="input"
              v-model="editingPersonal.Apellido"
              type="text"
            >
            <template v-else>
              {{ personal.Apellido }}
            </template>
          </td>
          <td>
            <input
              v-if="editingCI === personal.CI"
              class="input"
              v-model="editingPersonal.Telefono"
              type="text"
            >
            <template v-else>
              {{ personal.Telefono }}
            </template>
          </td>
          <td>
            <input
              v-if="editingCI === personal.CI"
              class="input"
              v-model="editingPersonal.Email"
              type="text"
            >
            <template v-else>
              {{ personal.Email }}
            </template>
          </td>
          <td>
            <button
              v-if="editingCI !== personal.CI"
              class="button is-warning is-small is-rounded"
              @click="editPersonal(personal)"
              style="margin-right: 0.5em;"
            >
              <span class="icon is-small">
                <i class="fas fa-pencil-alt"></i>
              </span>
            </button>
            <button
              v-if="editingCI === personal.CI"
              class="button is-success is-small is-rounded"
              @click="updatePersonal"
              style="margin-right: 0.5em;"
            >
              <span class="icon is-small">
                <i class="fas fa-check"></i>
              </span>
            </button>
            <button class="button is-danger is-small is-rounded" @click="deletePersonal(personal.CI)">
              <span class="icon is-small">
                <i class="fas fa-trash-alt"></i>
              </span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <nav class="pagination" role="navigation" aria-label="pagination">
     <ul class="pagination-list">
        <li v-for="page in totalPages" :key="page">
          <a class="pagination-link" :class="{ 'is-current': page === currentPage }" @click="goToPage(page)">{{ page }}</a>
        </li>
      </ul>
    </nav>
  </div>
</template>


<script>
import axios from '@/axios.js';

export default {
  data() {
    return {
      personales: [],
      currentPage: 1,
      perPage: 5,
      newPersonal: {
        CI: '',
        Nombre: '',
        Apellido: '',
        Telefono: '',
        Email: ''
      },
      editingCI: null,
      editingPersonal: {
        CI: '',
        Nombre: '',
        Apellido: '',
        Telefono: '',
        Email: ''
      },
    };
  },
  computed: {
    paginatedPersonales() {
      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;
      return this.personales.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.personales.length / this.perPage);
    }
  },
  methods: {
    async addPersonal() {
      try {
        const response = await axios.post('data/insertar-personal', this.newPersonal);
        if (response.data.success) {
          alert('Personal insertado correctamente');
          this.fetchPersonales();
        } else {
          throw new Error('Error al insertar personal');
        }
      } catch (error) {
        console.error(error);
      }
    },
    async fetchPersonales() {
      try {
        const response = await axios.get('/data/personales');  
        if (response.data.success) {
          this.personales = response.data.personales[0];
        } else {
          throw new Error('Error al obtener los datos');
        }
      } catch (error) {
        console.error(error);
      }
    },

    editPersonal(personal) {
      this.editingCI = personal.CI;
      Object.assign(this.editingPersonal, personal);
    },
    async updatePersonal() {
      try {
        const response = await axios.put('data/actualizar-personal', this.editingPersonal);
        if (response.data.success) {
          alert('Personal actualizado correctamente');
          this.editingCI = null;
          this.fetchPersonales();
        } else {
          throw new Error('Error al actualizar personal');
        }
      } catch (error) {
        console.error(error);
      }
    },


    async deletePersonal(CI) {
    try {
      const response = await axios.delete('data/eliminar-personal', { data: { CI } });
      if (response.data.success) {
        alert('Personal eliminado correctamente');
        this.fetchPersonales();
      } else {
        throw new Error('Error al eliminar personal');
      }
    } catch (error) {
      console.error(error);
    }
  },

    goToPage(page) {
      this.currentPage = page;
    }
  },
  mounted() {
    this.fetchPersonales();
  }
};
</script>
