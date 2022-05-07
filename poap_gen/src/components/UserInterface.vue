<template>
    <v-container fluid class="p-0">
        <div class="col-12 pl-9 text-center"> 
            <h1> Interface utilisateur</h1>
            <br/>
            <UserEventForm @saveEvent="saveEvent"/>
            <br/>
<!--            <pre> {{events}} </pre> -->
            <UserEvent v-for="(event, index) in events" :key="index" :event="event"/>
        </div>
<!--          {{events}}-->
     <!--    </v-col> -->


    </v-container>
</template>

<script>
import UserEventForm from "./UserEventForm.vue"
import UserEvent from "./UserEvent.vue"

export default {
  name: 'UserInterface',
  components : {
    UserEventForm,
    UserEvent
  },
  props: {
    msg: String
  },
  data () {
      return {events : []}
  }, 
  methods: {
        saveEvent(event) {
            this.events.push(event);
        }
    }
  } 
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
