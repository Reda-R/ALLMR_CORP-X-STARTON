<template>
  <v-app>
    <v-app-bar
      app
      color="#FFFFFF"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://airdrops.io/wp-content/uploads/2021/03/POAP-logo.png"
          transition="scale-transition"
          width="60"
        />

      </div>

      <v-spacer></v-spacer>

    </v-app-bar>

    <v-main>

      <UserInterface/>
    </v-main>
  </v-app>
</template>

<script>
import UserInterface from './components/UserInterface';

export default {
  name: 'App',

  components: {
    UserInterface,
  },

  data: () => ({
    //
  }),
};
</script>
