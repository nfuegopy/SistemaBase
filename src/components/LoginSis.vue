<template>
  <section class="hero is-fullheight is-primary">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-5-tablet is-4-desktop is-3-widescreen">
            <form @submit.prevent="handleSubmit" class="box has-background-white-ter">
              <div class="field">
                <label class="label">Nombre de Usuario</label>
                <div class="control has-icons-left">
                  <input class="input" type="text" v-model="username" required placeholder="Usuario">
                  <span class="icon is-small is-left">
                    <i class="fas fa-user"></i>
                  </span>
                </div>
              </div>
              <div class="field">
                <label class="label">Contraseña</label>
                <div class="control has-icons-left">
                  <input class="input" type="password" v-model="password" required placeholder="Contraseña">
                  <span class="icon is-small is-left">
                    <i class="fas fa-lock"></i>
                  </span>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <button type="submit" class="button is-link is-fullwidth has-text-weight-medium">Iniciar</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
  <script>
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  import { useStore } from "vuex";
  import axios from '../axios';

  export default {
    setup() {
      const router = useRouter();
      const username = ref("");
      const password = ref("");
      const store = useStore();
      const handleSubmit = async () => {
  try {
    const response = await axios.post('/auth/login', {
      username: username.value,
      password: password.value,
    });
    
    const data = response.data;
    
    if (data.success) {
      localStorage.setItem('token', data.token);
      const userDetailsResponse = await axios.get(`/auth/user-details?username=${username.value}`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      });
      
      const userDetails = userDetailsResponse.data;
      const { nombre, apellido } = userDetails;
      store.commit('setUser', { nombre, apellido });
      router.push({ name: "Home" });
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
};
      return {
        username,
        password,
        handleSubmit,
      };
    },
  };
  </script>
  
  
  <style>
  @import "~bulma/css/bulma.min.css";
  </style>
  @/axios.js