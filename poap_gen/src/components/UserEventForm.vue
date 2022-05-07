<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on">
        Ajouter un evenement
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12">
                <v-text-field label="Nom" outlined dense v-model="model.name"></v-text-field>
              </v-col>
              <v-file-input
                  label="File input"
                  outlined
                   @change="Preview_image"
                   v-model="model.image"
                  dense
                  accept="image/png, image/jpeg">
               </v-file-input>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="saveEvent">
            Save
          </v-btn>
        </v-card-actions>
        <v-img :src="model.url"></v-img>

      </v-card>
      
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: 'UserEventForm',
  data: () => ({
    dialog: false,
      model : {
        name: '',   model : {
        name: '',
        url: null,
        image: null
      }
      }
  }),
  methods: {
    closeForm() {
        this.model.name = ''
        this.model.url = null
        this.model.image = null
        this.dialog = false
    },
    Preview_image() {
      console.log('this.file =', this.model.image);
      this.model.url= URL.createObjectURL(this.model.image)
      console.log('url =', this.model.url)
    },
    async saveEvent() {
        this.$emit('saveEvent',Object.assign({}, this.model))
        this.closeForm()
    }
  }
}
</script>
