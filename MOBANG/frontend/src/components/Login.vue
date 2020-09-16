<template>
  <transition name="modal">
      <div class="modal-mask">
          <div class="modal-wrapper">
              <div class="modal-container p-4">
                  <div class="h4 modal-header d-flex flex-column align-items-center">
                      <div class="x-button" @click="close">X</div>
                      <div>로그인</div>
                      <div class="w-100 mt-4">
                          <b-form-input class="p-4"
                          placeholder="아이디"
                          v-model="id"
                          type="email">
                          </b-form-input>
                          <b-form-input class="mt-2 p-4"
                          placeholder="비밀번호"
                          v-model="password"
                          type="password">
                          </b-form-input>
                      </div>
                      <div class="mt-3 ml-auto">
                          <b-form-checkbox id="checkbox-1" v-model="seller" name="checkbox-1">
                              판매자로 로그인
                          </b-form-checkbox>

                      </div>
                      <button @click="login" class="login-button">로그인</button>
                      <button @click="moveSignup" class="mt-2 login-button bg-warning">
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
import {userApi,sellerApi} from "../utils/axios";
export default {
    data(){
        return{
            id:"",
            password:"",
            seller:false
        }
    },
    methods:{
        ...mapMutations(["SET_LOGIN_MODAL","SET_REGISTER_MODAL","SET_LOGIN_DATA"]),
        close(){
            this.SET_LOGIN_MODAL(false);
        },
        async login(){
            if(this.id && this.password){
                if(this.seller){
                    const {data} = await sellerApi.loginSeller(this.id,this.password);
                    if(data.login){
                        sessionStorage.setItem("id",data.id);
                        sessionStorage.setItem("auth",data.auth);
                        sessionStorage.setItem("name",data.name);
                        this.SET_LOGIN_DATA({
                            id:data.id,
                            name:data.name,
                            auth:data.auth
                        })
                    }
                    else{
                        console.log("로그인 실패");
                    }
                }
                else{
                    const {data} = await userApi.loginUser(this.id,this.password);
                    if(data.login){
                        sessionStorage.setItem("id",data.id);
                        sessionStorage.setItem("auth",data.auth);
                        sessionStorage.setItem("name",data.name);
                        this.SET_LOGIN_DATA({
                            id:data.id,
                            name:data.name,
                            auth:data.auth
                        })
                    }
                    else{
                        console.log("로그인 실패");
                    }
                }
            }else{
                alert("아이디 및 비밀번호를 다시 입력해주세요");
            }
            this.close();
        },
        moveSignup(){
            this.SET_REGISTER_MODAL(true);
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
    width:420px;
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