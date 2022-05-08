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
          const formData = new FormData()
          formData.append("file", this.event.image)
          formData.append("image_name", this.event.name)
          formData.append("name", this.event.name)
          formData.append("description", "description")
          formData.append("to", "0x614ACFfC68508d8F0C01Bd235Ee8ae622F8E2558")
          formData.append("isSync", true)

        console.log(this.event)
        axios.post('http://localhost:3000/generate', formData, {
              headers : {
                  'Content-Type': 'multipart/form-data'
              },
        })
            .then(() => {
                console.log("sendPoap", "response")
                this.isActive = true
            })
            .catch(() => console.log("sendPoap", "error"))
      }
  }
}
</script>
