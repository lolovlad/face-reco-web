<template>
  <div class="container" style="margin-top: 50px">
    <div class="row">
      <div class="col s6">
        <div v-if="isLoadHist">
          <div class="card blue-grey darken-1" v-for="hist in listHist" :key="hist.uuid">
            <div class="card-content white-text">
              <span class="card-title">{{hist.name}}</span>
              <p>{{hist.description}}</p>
              <p>{{hist.date}}</p>
            </div>
          </div>
        </div>
        <div class="progress" v-else>
          <div class="indeterminate"></div>
        </div>
      </div>
      <div class="col s6">
        <form class="col s12">
          <div class="row">
            <div class="input-field col s12">
              <input placeholder="Название" type="text" v-model="hist.name">
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <textarea class="materialize-textarea" data-length="120" v-model="hist.description"></textarea>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <a class="waves-effect waves-light btn" @click="addHist">Добавить</a>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "HistoriList",
  data(){
    return{
      uuid_user: this.$route.params.uuid,
      hist: {
        uuid_user: this.$route.params.uuid,
        name: "",
        description: ""
      },
      listHist: [],
      isLoadHist: false
    }
  },
  methods: {
    async getHist(){
      await axios.get(`/disease_history/${this.uuid_user}`).then((response) => {
        this.isLoadHist = true
        this.listHist = response.data
      })
    },
    async addHist(){
      await axios.post(
          `/disease_history`,
              this.hist
      ).then((response) => {
        response.status
        this.getHist()
      })
    }
  },
  mounted() {
    this.getHist()
  }
}
</script>

<style scoped>

</style>