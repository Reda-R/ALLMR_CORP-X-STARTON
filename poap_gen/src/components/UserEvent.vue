<template>
    <v-container fluid >
        <br/>
        <div class="col-12 secondary d-inline-flex">
            <h1 class="col-3 white--text"> {{event.name}}</h1>
            <div class="col-1"></div>
            <v-img class="col-3" max-height="200" max-width="300" :src="event.url"></v-img>
            <div class="col-1"/>
            <v-col>
                <v-btn :disabled="isActive" class="pa-12" @click="sendPoap">Send</v-btn>
            </v-col>
        </div>
        <br/>
    </v-container>
</template>

<script>
import axios from 'axios'
export default {
  name: 'UserEvent',
  props: {
    event: {
        type: Object
    }
  }, data: () => {
      return {
      isActive: false
      }
  }, methods : {
      sendPoap() {
          console.log("sendPoap", "clicked")
        axios.post('http://localhost:8080/', this.event)
            .then(() => {
                console.log("sendPoap", "response")
                this.isActive = true
            })
            .catch(() => console.log("sendPoap", "error"))
      }
  }
}
</script>
