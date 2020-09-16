<template>
  <div>
    <table v-if="list.length" class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th class="text-center" scope="col">제목</th>
          <th scope="col">파일</th>
          <th scope="col">날짜</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(li, index) in list" :key="index">
          <th scope="row">{{index+1}}</th>
          <td style="width:60%" class="text-center" @click="detail(li.id)">
            {{li.title}}
          </td>
          <td class ="for-hover text-primary" @click="download(li.file)">
            {{renameFile(li.file)}}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
    data(){
        return{
          list: [],
        };
    },
    methods:{
      async getPostList(){
          const {data} = await axios.get("http://localhost:8000/api/post");
          // console.log(data);
          this.list = data.postList;
      },
      renameFile(data){
        const fileName = `${data.split("&&")[0]}.${data.split("&&")[1].split(".")[1]}`;
        return fileName;
      },
      detail(id){
        this.$router.push(`/detail/${id}`);
      },
      async download(file){
        const res = await axios({
          method: "GET",
          url: "http://localhost:8000/api/download",
          responseType:"blob",
          params:{
            fileName: file
          }
        });
        console.log(res);

        let blob = new Blob([res.data], {type:res.headers["content-type"]});
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download",file);
        document.body.appendChild(link);
        link.click();
      }
    },
    mounted(){
      this.getPostList();
    }
};
</script>

<style>
.for-hover:hover {
  cursor: pointer;
  opacity: 0.5;
}
tr:hover{
  opacity: 0.5;
  cursor: pointer;
}

</style>