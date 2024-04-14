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
        <div class="row">
          <a class="waves-effect waves-light btn" @click="getUser">Разпознать</a>
        </div>
        <div v-if="isLoadUser">
          <div class="row">
            <p>uuid: {{userData.uuid}}</p>
            <p>ФИО: {{userData.login}}</p>
            <p>тип: {{userData.type.name}}</p>
          </div>
          <div class="row">
            <a class="waves-effect waves-light btn" @click="$router.push(`/hist/${userData.uuid}`)">Посмотреть историю</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "RecognazeUser",
  data(){
    return{
      camera: {
        isCameraOpen: false,
        isPhotoTaken: false,
        isShotPhoto: false,
        isLoading: false,
      },
      user: {
        photo: null
      },
      userData: null,
      isLoadUser: false
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
      this.$refs.canvas.toBlob((blob) => {
        this.user.photo = new File([blob], 'test.png', { type: 'image/png' });
      }, "image/png")
    },
    deletePhoto(){
      this.camera.isPhotoTaken = false
    },
    async getUser(){
      const formData = new FormData()
      formData.append("face_img",  this.user.photo)
      axios.post(

          `/user/get_user/face_recognize`,
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
      ).then((response) => {
        this.userData = response.data
        this.isLoadUser = true
      })
    }
  }
}
</script>

<style scoped>

</style>