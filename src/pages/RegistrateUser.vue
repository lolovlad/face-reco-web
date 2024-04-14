<template>

  <div class="container" style="margin-top: 50px">
    <div class="row">
      <div class="col s6">
        <div class="row">
          <a class="waves-effect waves-light btn" @click="toggleCamera">Подключить камеру</a>

          <div class="progress" v-show="camera.isCameraOpen && camera.isLoading">
            <div class="indeterminate"></div>
          </div>

          <div v-if="camera.isCameraOpen" v-show="!camera.isLoading">
            <video autoplay v-show="!camera.isPhotoTaken" ref="camera" :width="450" :height="337"></video>
            <canvas v-show="camera.isPhotoTaken" ref="canvas" :width="450" :height="337"></canvas>
          </div>

        </div>
        <div class="row" v-if="camera.isCameraOpen" v-show="!camera.isLoading">
          <a class="waves-effect waves-light btn" @click="takePhoto" v-show="!camera.isPhotoTaken">сделать снимок</a>
          <a class="waves-effect waves-light btn" @click="deletePhoto" v-show="camera.isPhotoTaken">удалить снимок</a>
        </div>
      </div>
      <div class="col s6">
        <form class="col s12">
          <div class="row">
            <div class="input-field col s4">
              <input placeholder="Фамилия" type="text" v-model="user.sename">
            </div>
            <div class="input-field col s4">
              <input placeholder="Имя" type="text" v-model="user.name">
            </div>
            <div class="input-field col s4">
              <input placeholder="Отчество" type="text" v-model="user.secondname">
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <input placeholder="Пароль" type="text" v-model="user.password">
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <a class="waves-effect waves-light btn" @click="regUser">Зарегистрировать</a>
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
  name: "RegistrateUser",
  data(){
    return{
      camera: {
        isCameraOpen: false,
        isPhotoTaken: false,
        isShotPhoto: false,
        isLoading: false,
        photo: null
      },
      user: {
        name: "",
        sename: "",
        secondname: "",
        password: "",
        photo: null,
      }
    }
  },
  methods: {
    toggleCamera(){
      if(this.camera.isCameraOpen){
        this.camera.isCameraOpen = false
        this.camera.isPhotoTaken = false
        this.camera.isShotPhoto = false
        this.stopCameraStream()
      }
      else{
        this.camera.isCameraOpen = true
        this.createCameraElement()
      }
    },
    createCameraElement(){
      this.camera.isLoading = true
      const constraints = (window.constraints = {
        audio: false,
        video: true
      })

      navigator.mediaDevices.getUserMedia(constraints).then(stream => {
        this.camera.isLoading = false
        this.$refs.camera.srcObject = stream
      }).catch(error => {
        this.camera.isLoading = false
        alert("Браузер не поддерживает видеопоток" + error)
      })
    },
    stopCameraStream(){
      let tracks = this.$refs.camera.srcObject.getTracks()

      tracks.forEach(track => {
        track.stop()
      })
    },
    takePhoto(){
      this.camera.isPhotoTaken = true

      this.$refs.canvas.getContext("2d").drawImage(this.$refs.camera, 0, 0, 450, 337)
      this.downloadImage()
    },
    downloadImage(){
      this.camera.photo = this.$refs.canvas.toDataURL()
      this.$refs.canvas.toBlob((blob) => {
        this.user.photo = new File([blob], 'test.png', { type: 'image/png' });
      }, "image/png")
    },
    deletePhoto(){
      this.camera.isPhotoTaken = false
      this.camera.photo = null
    },
    async regUser(){
      const formData = new FormData()
      formData.append("login", `${this.user.sename} ${this.user.name} ${this.user.secondname}`)
      formData.append("password", this.user.password)
      formData.append("id_type", 2)
      formData.append("face_img",  this.user.photo)
      axios.post(

          `/user/`,
          formData,
          {
            timeout: 50000,
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          },

      ).catch((e) => {
            console.log(e)
          }
      )
    }
  }
}
</script>

<style scoped>

</style>