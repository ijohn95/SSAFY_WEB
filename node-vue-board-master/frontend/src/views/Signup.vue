<template>
  <div>
    <b-form @submit.prevent="signUp" class="w-50 ml-auto mr-auto mt-5">
      <div>
        <b-form-group
          id="input-group-1"
          label="아이디(이메일)"
          label-for="input-1"
          description="We'll never share your email with anyone else."
        >
          <span></span>
          <b-form-input
            @blur ="checkingEmail"
            id="input-1"
            v-model="form.email"
            type="email"
            required
            placeholder="이메일을 입력하세요."
          ></b-form-input>
          <span v-if="flagID"></span>
          <span v-else class = "justify-content-center">
            <b-alert show variant="danger mt-3">중복된 Email 입니다.</b-alert>
          </span>
        </b-form-group>
      </div>

      <b-form-group id="input-group-2" label="비밀번호" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.password"
          type = password
          required
          placeholder="비밀번호를 입력하세요."
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="비밀번호 확인" label-for="input-3">
        <b-form-input
          @blur="checkingPassword"
          id="input-3"
          v-model="form.checkpassword"
          type = password
          required
          placeholder="비밀번호를 다시 입력하세요."
        >
        </b-form-input>
        <span v-if="flag"></span>
        <span v-else class = "justify-content-center">
          <b-alert show variant="danger mt-3">비밀번호가 일치하지 않습니다.</b-alert>
        </span>
      </b-form-group>

      <b-form-group id="input-group-4" label="이름" label-for="input-4">
        <b-form-input
          id="input-4"
          v-model="form.name"
          required
          placeholder="이름을 입력하세요."
        ></b-form-input>
      </b-form-group>
      <div class = "mt-5 d-flex justify-content-center">
        <b-button type="submit" variant="primary">회원가입</b-button>
        <b-button type="reset" variant="danger" class = "ml-3">초기화</b-button>
      </div>
    </b-form>
  </div>
</template>

<script>
import axios from "axios";

  export default {
    data() {
      return {
        form: {
          email: '',
          password: '',
          checkpassword: '',
          name: '',
        },
        flag : true,
        flagID: true,
      };
    },
    methods: {
      async checkingEmail(){
        const {email} = this.form;
        try{
              const {data} = await axios.post("http://localhost:8000/api/user/IDcheck",{
                email
              });
              if(data.IDcheck){
                return this.flagID = false;
              } else throw new Error();
          } catch(error){
            return this.flagID = true;
          }
      },

      checkingPassword(){
        if(this.form.password !== this.form.checkpassword){
           this.flag = false;   
        } else {
          this.flag = true;
        }
      },
      async signUp(e){
        // e.preventDefault(); // 새로고침을 막아줌
        const {email, password, checkpassword, name} = this.form;
        if(email && password && checkpassword && name){
          try{
              const {data} = await axios.post("http://localhost:8000/api/user",{
                email,password,name
              });
              // console.log(data);
              if(data.signup){
                alert("회원가입이 완료되었습니다.");
                this.$router.push("/login");
              } 
          } catch(error){
            console.log(error);
          }
        }
      }
    }
  }
</script>