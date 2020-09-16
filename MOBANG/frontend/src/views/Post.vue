<template>
  <div class="post-container">
      <PostComponent class="mt-5">
        <div slot="posting">
          <div class="text-center border-bottom p-3">위치 정보</div>
          <div class="d-flex" style="height:300px">
            <div class="h-100 flex-container" style="flex:1">
              주소
            </div>
            <div class="h-100 flex-container border-left" style="flex:10">
              <div class="d-flex w-100 align-items-center justify-content-center">
                <b-form-input class="w-50"
                  v-model="address" placeholder="Enter your address"></b-form-input>
                <b-button variant="primary" @click="getAddress">주소 검색</b-button>
              </div>
            </div>
            <div ref="map" class="h-100 flex-container border-left" style="flex:5">지도</div>
          </div>
        </div>
      </PostComponent>
      <PostComponent>
        <div slot="posting">
          <div class="text-center border-bottom p-3">옵션</div>
          <div class="d-flex">
            <b-form-checkbox-group
            class="w-100"
            v-model="selectedOptions"
            :options="options"
            buttons
            button-variant="primary"
            size="lg" name="button-2">
            
            </b-form-checkbox-group>
          </div>
        </div>
      </PostComponent>
      <PostComponent class="mt-5">
        <div slot="posting">
          <div class="text-center border-bottom p-3">내용</div>
          <div class="d-flex" style="height:300px;">
            <div class="h-100 flex-container border-left" style="flex:5">
              <div class="w-75">
                <b-form-input
                class="w-100" v-model="title"
                placeholder="제목">
                </b-form-input>
                <b-form-textarea
                id="textarea-large" size="lg"
                rows="7" v-model="content"
                placeholder="내용">
                </b-form-textarea>
              </div>
            </div>
          </div>
        </div>
      </PostComponent>
      <PostComponent>
            <div slot="posting" class="room-deal-information-container">
                <div class="room-deal-information-title">사진 등록</div>
                <div class="room-picture-notice">
                    <ul class="room-write-wrapper">
                        <li>사진은 가로로 찍은 사진을 권장합니다. (가로사이즈 최소 800px)</li>
                        <li>사진 용량은 사진 한장당 10MB 까지 등록 가능합니다</li>
                    </ul>
                </div>
                <div class="room-file-upload-wrapper">
                    <div v-if="!files.length" class="room-file-upload-example-container">
                      <div class="room-file-upload-example">
                        <div class="room-file-image-example-wrapper">이미지</div>
                        <div class="room-file-notice-item">
                            실 사진 최소 3장 이상 등록하셔야 하며, 가로사진을 권장합니다.
                        </div>
                        <div class="room-file-notice-item room-file-notice-item-red">
                            로고를 제외한 불필요한 정보(워터마크, 상호, 전화번호 등)가 있는
                            매물은 비공개 처리됩니다.
                        </div>
                        <div class="room-file-notice-item room-file-upload-button">
                            <div class="image-box">
                                <label for="file">일반 사진 등록</label>
                                <input type="file" id="file" ref="files" @change="imageUpload" multiple>
                            </div>
                        </div>
                    </div>
                </div>
                    
                <div v-else class="file-preview-content-container">
                    <div class="file-preview-container">
                        <div v-for="(file,index) in files" :key="index" class="file-preview-wrapper">
                            <div class="file-close-button" @click="fileDeleteButton" :name="file.number">x</div>
                            <img :src="file.preview"/>
                        </div>
                        <div class="file-preview-wrapper-upload">
                            <div class="image-box">
                                <label for="file">추가 사진 등록</label>
                                <input type="file" id="file" ref="files" @change="imageAddUpload" multiple>
                            </div>
                        </div>
                    </div>
                    
                </div>    
                </div>
            </div>
        </PostComponent>
      <b-button @click="writePost" variant="primary" class="w-100 mt-3">작성하기</b-button>
  </div>
</template>

<script>
import PostComponent from "../components/PostComponent"
import {postApi} from "../utils/axios"
export default {
  components:{
    PostComponent
  },
  data(){
    return{
      latitude:"",
      longitude:"",
      address:"",
      selectedOptions:[],
      options:[
        {text:"세탁기",value:"세탁기"},
        {text:"냉장고",value:"냉장고"},
        {text:"침대",value:"침대"},
        {text:"TV",value:"TV"},
      ],
      title:"",
      content:"",
      files:[],
      filePreview:[],
      uploadImageIndex:0,    
    };
  },
  mounted() {
    const addressScript = document.createElement("script");
    addressScript.src =
      "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    document.head.appendChild(addressScript);
    const mapScript = document.createElement("script");
    mapScript.onload = () => kakao.maps.load();
    mapScript.src =
      "http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=a50b26e6cbab60a2fa42c238163d1d6b&libraries=services";
    document.head.appendChild(mapScript);
  },
  methods: {
    getAddress() {
      new daum.Postcode({
        oncomplete: (data) => {
          let mapOption = {
            center: new daum.maps.LatLng(37.537187, 127.005476), //중심좌표
            level: 6, //지도의 확대 레벨
          };
          const mapContainer = this.$refs.map;
          const map = new daum.maps.Map(mapContainer, mapOption);
          let geocoder = new daum.maps.services.Geocoder();
          geocoder.addressSearch(data.address, (results, status) => {
            if (status === daum.maps.services.Status.OK) {
              console.log(results);
              const { y, x, address_name } = results[0];
              console.log(y, x, address_name);

          this.address = address_name;
          let coords = new daum.maps.LatLng(y, x);
          this.latitude = y;
          this.longitude = x;
          mapContainer.style.display = "block";
          map.relayout();
          map.setLevel(4);
          map.setCenter(coords);
          let marker = new daum.maps.Marker({
            position: coords,
            map: map,
          });
        }
      });
    },
    }).open({
      popupName:"Room",
      q:this.address, 
    });
    },
    imageUpload(){
      console.log(this.$refs.files);
      console.log(this.$refs.files.files);

      let num = -1;
      for(let i=0;i<this.$refs.files.files.length;i++){
        this.files=[
          ...this.files,
          {
            file:this.$refs.files.files[i],
            preview: URL.createObjectURL(this.$refs.files.files[i]),
            number:i
          }
        ];
        num=i
      }
      this.uploadImageIndex=num+1;
      console.log(this.files);
    },
    imageAddUpload(){
      console.log(this.$refs.files);
      console.log(this.$refs.files.files);

      let num = -1;
      for(let i=0;i<this.$refs.files.files.length;i++){
        this.files=[
          ...this.files,
          {
            file:this.$refs.files.files[i],
            preview: URL.createObjectURL(this.$refs.files.files[i]),
            number:i+this.uploadImageIndex
          }
        ];
        num=i
      }
      this.uploadImageIndex=this.uploadImageIndex+num+1;
      console.log(this.files);
    },
    fileDeleteButton(e){
      const name = e.target.getAttribute("name");
      this.files = this.files.filter(data=>data.number!==Number(name));
    },
    async writePost(){
      console.log("check");
      console.log(this);
      const {address,latitude,longitude,title,content,files,selectedOptions} = this;
      const formData = new FormData();
      formData.append("title",title);
      formData.append("content",content);
      formData.append("latitude",latitude);
      formData.append("longitude",longitude);
      formData.append("address",address);
      
      selectedOptions.forEach((el)=>{
        formData.append("options",el);
      });
        files.forEach(el=>{
          formData.append("files",el.file);
        });
      formData.append("seller_id",sessionStorage.getItem("id"));
      const {data} = await postApi.post(formData);
      if(data.upload){
        alert("업로드가 완료되었습니다");
        this.$router.push("/list");
      }
      else{
        alert("업로드 할 수 없습니다");
      }
    }
  },
}
//a50b26e6cbab60a2fa42c238163d1d6b
//"https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
</script>

<style>
.post-container{
  width:1180px;
  margin:40px auto;
}
.flex-container{
  display:flex;
  align-items: center;
  justify-content: center;
}
.post-container {
  width: 1180px;
  margin: 40px auto;
}
.flex-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.room-deal-information-container {
  margin-top: 50px;
  color: #222222;
  border: 1px solid #dddddd;
}

.room-deal-information-title {
  text-align: center;
  font-size: 18px;
  line-height: 60px;
  border-bottom: 1px solid #dddddd;
}

.room-deal-information-content-wrapper {
  min-height: 50px;
  display: flex;
}

.room-deal-informtaion-content-title {
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  background-color: #f9f9f9;
}

.room-deal-information-content {
  width: 100%;
  font-size: 14px;
}

.room-deal-option-selector {
  display: flex;
  align-items: center;
  padding: 15px;
}

.room-deal-option-item {
  width: 100px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #cccccc;
  border-radius: 5px;
  cursor: pointer;
}

.room-deal-option-item:last-child {
  margin-left: 10px;
}

.room-deal-option-notice {
  margin-left: auto;
  font-size: 14px;
  color: #888888;
}

.room-deal-option-item-deposit {
  margin-left: 10px;
}

.room-deal-information-wrapper {
  display: flex;
  flex-direction: column;
}

.room-deal-information-option {
  padding: 10px;
  display: flex;
  align-items: center;
}

.room-deal-information-option:last-child {
  border-bottom: 1px solid #dddddd;
}

.room-deal-information-item-type {
  font-size: 13px;
  color: #fff;
  background-color: #61b6e5;
  min-width: 50px;
  height: 26px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
}

.room-deal-information-item-wrapper {
  display: flex;
  align-items: center;
  margin-left: 10px;
  height: 46px;
  width: 100%;
}

.room-deal-information-item-wrapper > input {
  border: 1px solid #dddddd;
  width: 140px;
  height: 100%;
  padding: 0 15px;
  font-size: 15px;
}

.room-deal-inforamtion-won {
  margin: 0 10px;
}

.room-deal-information-example {
  color: #888888;
}

.room-deal-information-option:not(:first-child) {
  margin-top: 10px;
}

.room-deal-inforamtion-divide {
  font-size: 22px;
  margin: 0 8px;
  color: #222222;
  font-weight: 100;
}

.room-deal-close-button-wrapper {
  margin-left: auto;
  cursor: pointer;
}

.room-deal-close-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  background-color: #666666;
  color: rgb(220, 220, 220);
}

.room-deal-cliked {
  background-color: rgb(235, 235, 235);
  color: rgb(170, 170, 170);
}

.room-file-upload-example {
  height: 100%;
}

.room-write-content-container {
  border-top: 1px solid #dddddd;
  min-height: 260px;
}

.room-picture-notice {
  margin: 20px;
  padding: 20px 40px;
  border: 1px solid #dddddd;
}

.file-preview-content-container {
  height: 100%;
}

.room-file-upload-wrapper {
  margin: 20px;
  border: 1px solid #dddddd;
  background-color: #f4f4f4;
  min-height: 350px;
  font-size: 15px;
  color: #888888;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.room-file-upload-example-container {
  display: flex;
  align-items: center;
  justify-content: center;
  /* height: 100%;
  width: 100%; */
}

.room-file-image-example-wrapper {
  text-align: center;
}

.room-file-notice-item {
  margin-top: 5px;
  text-align: center;
}

.room-file-notice-item-red {
  color: #ef4351;
}

.image-box {
  margin-top: 30px;
  padding-bottom: 20px;
  text-align: center;
}

.image-box input[type="file"] {
  position: absolute;
  width: 0;
  height: 0;
  padding: 0;
  overflow: hidden;
  border: 0;
}

.image-box label {
  display: inline-block;
  padding: 10px 20px;
  background-color: #232d4a;
  color: #fff;
  vertical-align: middle;
  font-size: 15px;
  cursor: pointer;
  border-radius: 5px;
}

.file-preview-wrapper {
  padding: 10px;
  position: relative;
}

.file-preview-wrapper > img {
  position: relative;
  width: 190px;
  height: 130px;
  z-index: 10;
}

.file-close-button {
  position: absolute;
  /* align-items: center; */
  line-height: 18px;
  z-index: 99;
  font-size: 18px;
  right: 5px;
  top: 10px;
  color: #fff;
  font-weight: bold;
  background-color: #666666;
  width: 20px;
  height: 20px;
  text-align: center;
  cursor: pointer;
}

.file-preview-container {
  height: 100%;
  display: flex;
  flex-wrap: wrap;
}

.file-preview-wrapper-upload {
  margin: 10px;
  padding-top: 20px;
  background-color: #888888;
  width: 190px;
  height: 130px;
}

.room-write-button-wrapper {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #222222;
}

.room-write-button-wrapper > div {
  width: 160px;
  height: 50px;
  border: 1px solid #dddddd;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  cursor: pointer;
}

.room-write-button {
  margin-left: 15px;
  color: #fff;
  background-color: #1564f9;
}

.room-write-button:hover {
  opacity: 0.8;
}
</style>