import axios from "axios";
const request = axios.create({
    baseURL:"http://localhost:8000"
});

export const userApi = {
    registerUser:(email,password,name)=>{
        return request.post('/user',{
            email:email,
            password:password,
            name:name
        })
    },
    loginUser:(email,password)=>{
        return request.post("/user/login",{
            email,
            password
        })
    }
}

export const sellerApi = {
    registerSeller:(email,password,name)=>{
        return request.post('/seller',{
            email:email,
            password:password,
            name:name
        })
    },
    loginSeller:(email,password)=>{
        return request.post("/seller/login",{
            email,
            password
        })
    }
}

export const postApi = {
    post:(formData) => {
        return request.post("/post",formData,{
            headers:{
                "Content-Type":"multipart/form-data"
            }
        })
    },
    getFile:(src)=>{
        return request.get("/post/images",{
            params:{
                src:src
            },
            responseType:"blob"
        })
    },
    //searchKeyword가 없으면 =""로 default설정할 수 있음
    getList:(searchKeyword="")=>{
        return request.get("/post",{
            params:{
                searchKeyword:searchKeyword
            }
        })
    },
    getDetail:(id)=>{
        return request.get(`/post/${id}`,{
            params:{
                id:id
            }
        });
    }
}
