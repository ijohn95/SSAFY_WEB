<template>
  <div>
    <b-form class="w-50 ml-auto mr-auto mt-5" @submit.prevent="post">
      <b-form-group id="input-group-1" label="제목" label-for="input-1">
          <b-form-input
          id="input-1"
          v-model="form.title"
          type="text"
          required
          placeholder="제목을 입력해주세요."
        ></b-form-input>
      </b-form-group>
      <b-form-file
          v-model="form.file"
          :state="Boolean(form.file)"
          placeholder="파일을 넣어주세요."
          drop-placeholder="Drop file here"
      ></b-form-file>
      <div class="mt-3">
        Selected file: {{form.file ? form.file.name : ""}}
      </div>

      <b-form-textarea
        class="mt-4"
        id="textarea"
        v-model="form.content"
        placeholder="내용을 입력해주세요."
        rows="15"
        max-rows="10"
      ></b-form-textarea>
      <div class="d-flex justify-content-end mt-3">
        <b-button type="submit" variant="primary">글쓰기</b-button>
      </div>
    </b-form>
  </div>
</template>

<script>
import axios from "axios";

export default {
    data(){
        return{
          form:{
            title:"",
            content:"",
            file:null
          }
        }
    },
    methods:{
        async post(){
          try{
              const {title, content, file} = this.form;
              const formData = new FormData();
              formData.append("user_id", sessionStorage.getItem("id"));
              formData.append("title",title);
              formData.append("content",content);
              formData.append("file",file);
              const {data} = await axios.post("http://localhost:8000/api/post", formData, {
                  headers: {
                      "Content-Type":"multipart/form-data"
                  }
              });
              if(data.upload){
                  alert("게시글 작성이 완료되었습니다.");
                  this.$router.push("/");
              }else{
                throw new Error("게시글 작성 실패");
              }
          } catch (error) {
              console.log(error);
              alert("에러가 발생하였습니다.");
              this.$router.push("/");
          }
      }
    }
}
</script>

<style>

</style>