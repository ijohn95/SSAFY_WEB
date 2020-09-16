<template>
  <transition name="modal">
      <div class="modal-mask">
          <div class="modal-wrapper">
              <div class="modal-container p-4">
                  <div class="h4 modal-header d-flex flex-column align-items-center">
                      <div class="x-button" @click="close">X</div>
                      <div>회원가입</div>
                      <div class="w-100 mt-4">
                          <b-form-input class="p-4"
                          placeholder="이름"
                          v-model="name"
                          >
                          </b-form-input>
                          <b-form-input class="mt-3 p-4"
                          placeholder="아이디"
                          v-model="email"
                          type="email"
                          >
                          </b-form-input>
                          <b-form-input class="mt-3 p-4"
                          placeholder="비밀번호"
                          v-model="password"
                          type="password">
                          </b-form-input>
                      </div>
                      <div class="mt-3 ml-auto">
                          <b-form-checkbox id="checkbox-1" v-model="seller" name="checkbox-1">
                              판매자로 회원가입
                          </b-form-checkbox>
                      </div>
                      <button @click="signup" class="mt-4 login-button">
                          회원가입
                      </button>
                  </div>
              </div>
          </div>
      </div>
  </transition>
</template>

<script>
import {mapMutations} from "vuex";
import {userApi,sellerApi} from "../utils/axios"
export default {
    data(){
        return{
            name:"",
            email:"",
            password:"",
            seller:false
        }
    },
    methods:{
        ...mapMutations(["SET_REGISTER_MODAL"]),
        close(){
            this.SET_REGISTER_MODAL(false);
        },
        async signup(){
            this.close();
            try{
                if(this.email && this.name && this.password){
                    if(this.seller){
                        const {data} = await sellerApi.registerSeller(
                            this.email,
                            this.password,
                            this.name
                        )
                        console.log(data);
                        if(data.signup){
                            alert("회원가입에 성공하였습니다.");
                            return;
                        }
                        else{
                            alert("회원가입에 실패하였습니다.");
                            return;
                        }
                    }
                    else{
                        const {data} = await userApi.registerUser(
                            this.email,
                            this.password,
                            this.name
                        )
                        if(data.signup){
                            alert("회원가입에 성공하였습니다.");
                            return;
                        }
                        else{
                            alert("회원가입에 실패하였습니다.");
                            return;
                        }
                    }
                }
            }
            catch(err){
                this.close();
            }
        }
    }
}
</script>

<style>
.modal-mask{
    position: fixed;
    z-index: 9998;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background-color:rgba(0,0,0,0.5);
    transition: opacity 0.3s ease;
    display:table;
}

.modal-wrapper{
    position: absolute;
    left:50%;
    top:30%;
    transform: translate(-50%,-30%);
}

.modal-container{
    position: relative;
    width:500px;
    margin:0px auto;
    padding:20px 30px;
    background-color: white;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.33);
    transition:all 0.3s ease;

}

.modal-container, .modal-leave-active, .modal-container{
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}

.x-button{
    position: absolute;
    right:1rem;
    top:1rem;
    border:1px solid gray;
    width:1.5rem;
    height:1.5rem;
    display:flex;
    align-items: center;
    justify-content: center;
    font-size:0.9rem;
    border-radius: 50%;
    cursor:pointer;
}
.x-button:hover{
    opacity: 0.5;
}
.login-button{
    background-color: #1564f9;
    width:100%;
    margin-top: 20px;
    border:none;
    padding: 15px;
    color:white;
    font-size:1rem;
}
.login-button:hover{
    opacity: 0.5;
}
</style>