<template>
    <v-container fluid >
        <br/>
        <div class="col-12 secondary">
            <h1 class="col-1 white--text pa-12"> {{event.name}}</h1>
            <v-img :src="event.url"></v-img>
        </div>
        <br/>
    </v-container>
</template>

<script>
export default {
  name: 'UserEvent',
  props: {
    event: {
        type: Object
    }
  }
}
</script>
