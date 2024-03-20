<template >
    <div class="container mt-4 mb-3" style="min-height: 70vh;">
        <div class="row">
            <div class="col-lg-2"></div>
            <form ref="form" method="POST" @submit.prevent="addProduct()" class="form-col col-lg-8">
                <div class="form-group row ">
                    <label for="name-diamond" class="col-lg-3 col-form-label font-weight-bold">Tên </label>
                    <div class="col-lg-9">
                        <input type="text" v-model="posts.name" class="form-control">
                    </div>
                </div>
             
                <div class="form-group col">
                    <input type="file" multiple id = "photo" class="form-control-file photo__file" />
                </div>

                <div class="form-group row">
                    <label for="price-diamond" class="col-lg-3 col-form-label font-weight-bold">Giá</label>
                    <div class="col-lg-9">
                        <input type="number" v-model="posts.price" class="form-control w-25">
                    </div>
                </div>

                <div class="form-group row">
                    <label for="color-diamond" class="col-lg-3 col-form-label font-weight-bold">Chất liệu</label>
                    <div class="col-lg-9">
                        <input type="text" v-model="posts.material" class="form-control">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="clarity-diamond" class="col-lg-3 col-form-label font-weight-bold">Viên chính</label>
                    <div class="col-lg-9">
                        <input type="text" v-model="posts.chief_officer" class="form-control">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="cut-diamond" class="col-lg-3 col-form-label font-weight-bold">Viên phụ</label>
                    <div class="col-lg-9">
                        <input type="text" v-model="posts.Additional_pills" class="form-control">
                    </div>
                </div>
        
                <div class="form-group row">
                    <div class="col-lg-12" style="text-align: right;">
                        <button type="submit" class="btn btn-primary" >Thêm</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>


<script>
import axios from 'axios';
import productService from '../services/product.service.js';

export default {
    data() {
        return {
            posts: {
                name: '',
                material: '',
                image: [
                    {
                        public_id: "",
                        url: "",
                    },
                ],
                chief_officer: '',
                Additional_pills: '',
                price: 1000000
            }
        };
    },
    
    methods: {

        async handleUploadCloud(){
            const files = await document.getElementById('photo').files
            const presetName = import.meta.env.VITE_PRESET_NAME
            const presetFolder = import.meta.env.VITE_FOLDER_product
            const name_cloud = import.meta.env.VITE_CLOUD_NAME

            const api = `https://api.cloudinary.com/v1_1/${name_cloud}/image/upload`
            const imgs_result = []
            for (let i = 0; i < files.length; i++) {
                const form = new FormData();
                form.append('upload_preset', presetName);
                form.append('folder', presetFolder);
                form.append('file', files[i]);
                
                const res = await axios.post(api, form, {
                    headers: {
                        "Content-Type" : "multipart/form-data"
                    }
                })
                const img = {
                    public_id: res.data.public_id,
                    url: res.data.secure_url
                }
                imgs_result.push(img)
            }
            this.posts.image = imgs_result

        },

        async addProduct() {
            await this.handleUploadCloud()
            const res = await productService.createNewProduct(this.posts);
            if(res.status === 201) {
                alert('Them san pham moi thanh cong');
                this.posts.name = "";
                this.posts.material = "";
                this.posts.chief_officer = "";
                this.posts.Additional_pills = "";
                this.posts.image = [this.posts.image[0]] // gan ve 1 mang chua phan tu dau tien
                this.posts.image[0].public_id = "";
                this.posts.image[0].url = "";
                this.posts.price = 1000000
            }
            else{
                alert('Them san pham that bai')
            }
        }
    }
    
    
}
</script>

<style scoped>
form {
    /* background-color: #f0f0f0; */
    padding-top: 20px;
    padding-bottom: 20px;
    border-radius: 15px;


    border: 2px solid #80808000;
    display: flex;
    flex-direction: column;
    align-items: right;
    position: relative;
    border-radius: 15px;
    box-shadow: 0px 0px 14px 0px grey;
    background-color: white;


}

.btn-primary {
    /* background-color: #007bff;
    border-color: #007bff; */
    padding: 5px 10px;
    font-size: 1.3rem;
    /* 
    float: right; */
    /* padding: 7px; */
    /* width: 50%;
    border-radius: 10px; */
    border: none;
    /* position: absolute; */
    /* /* bottom: 10px; */
    cursor: pointer;
    background: linear-gradient(to right, #fc00ff, #00dbde);
}

/* Đổi màu chữ của nút Sign in */
.btn-primary:hover {
    /* background-color: #0056b3;
    border-color: #0056b3; */
    background: linear-gradient(to right, #fc466b, #3f5efb);

}

.form-col {
    background-color: white;
    box-shadow: 0px 0px 14px 0px grey;
    margin-bottom: 2.5rem;
}

.form-group-label {
    font-weight: 600;
}
</style>