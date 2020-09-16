<template>
  <div class="justify-content-center align-items-center mb-5">
    <div class="bg-primary p-3 text-white text-center h3">방 정보</div>
    <div class="d-flex justify-content-center p-3">
        <b-card 
            bg-variant = "dark" 
            v-bind:header= "[title]" 
            text-variant="white" 
            class="text-center"
            style="max-width: 1200px;"
        >
            <b-card-text class="text-left">
                <div>
                    주소 : {{address}}
                </div>
                <div>
                    내용 : {{content}}
                </div>
                <div>
                    <div v-for="list in Options" :key="list.id">
                        {{list.item}}
                    </div>
                </div>
                <div>
                    등록 날짜 : {{createdAt}}
                </div>
            </b-card-text>
        </b-card>
    </div>
    <div
      v-if="Images.length"
      class="d-flex flex-wrap justify-content-center p-3">
        <div class="border-top shadow ml-3 mt-3 card-wrapper"
        v-for="list in Images" :key="list.id">
                <div v-if="list.image"
                class="post-image"
                :style="{backgroundImage:`url(${list.image})`}"></div>
        </div>
    </div>
  </div>
</template>

<script>
import { postApi } from '../utils/axios';
export default {
    data(){
        return {
            title:"",
            content:"",
            address:"",
            createdAt:0,
            Options:[],
            Images:[]
        }
    },
    async mounted(){
        const {data}=await postApi.getDetail(this.$route.params.id);
        const {
            title,
            content,
            address,
            createdAt,
            updatedAt,
            Options,
            Images
        } = data.room;
        console.log(Options.item);
        this.title = title;
        this.content = content;
        this.address = address;
        const date = createdAt.split("T")[0];
        const time = createdAt.split("T")[1].split(".")[0];
        this.createdAt= date + "  " + time;
        for(const li of Options){
            this.Options.push(li);
        }
        for(const li of Images){
            const res= await postApi.getFile(li.src);
            const blob= new Blob([res.data],{
                type:res.headers["content-type"]
            });
            this.Images.push({...li,image:window.URL.createObjectURL(blob)});
        }
    }
}
</script>

<style>
.post-image{
    width:400px;
    height:300px;
    background-size:cover;
}
.card-wrapper:hover{
    opacity: 0.5;
    cursor: pointer;
}
</style>