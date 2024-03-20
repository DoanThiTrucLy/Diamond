<template >
    <div class="container mt-4 mb-3" style="min-height: 70vh;">
        <div class="row">
            <div class="col-lg-2"></div>
            <form ref="form" method="POST" @submit.prevent="addDiamond" class="form-col col-lg-6">
                <div class="form-group row ">
                    <label for="name-diamond" class="col-sm-3 col-form-label font-weight-bold">Tên kim cương</label>
                    <div class="col-sm-9">
                        <input type="text" v-model="posts.name" class="form-control">

                    </div>
                </div>

                <div class="form-group col">

                    <input type="file" multiple id="photo" class="form-control-file photo__file"
                        style="padding-top: 50px" />
                </div>

                <div class="form-group row">
                    <label for="price-diamond" class="col-sm-3 col-form-label font-weight-bold">Giá</label>
                    <div class="col-sm-9">
                        <input type="number" v-model="posts.price" class="form-control w-50 ">
                    </div>
                </div>

                <div class="form-group row">

                    <label for="color-diamond" class="col-sm-3 col-form-label font-weight-bold">Nước</label>

                    <select name="color" id="color" type="text" v-model="posts.color" class="form-control"
                        style="width: 20%;" placeholder="D">
                        <option value="D">D</option>
                        <option value="E">E</option>
                        <option value="F">F</option>
                        <option value="G">G</option>
                        <option value="H">H</option>
                        <option value="I">I</option>
                        <option value="J">J</option>
                        <option value="K">K</option>
                        <option value="L">L</option>
                        <option value="M">M</option>
                        <option value="N">N</option>
                        <option value="O">O</option>
                        <option value="P">P</option>
                        <option value="Q">Q</option>
                        <option value="R">R</option>
                        <option value="S">S</option>
                        <option value="T">T</option>
                        <option value="U">U</option>
                        <option value="V">V</option>
                        <option value="W">W</option>
                        <option value="X">X</option>
                        <option value="Y">Y</option>
                        <option value="Z">Z</option>
                    </select>
                </div>
                <div class="form-group row">

                    <!-- <div class="col-sm-10">
                        <input type="text" v-model="posts.clarity" class="form-control">
                    </div> -->

                    <label for="clarity-diamond" class="col-sm-3 col-form-label font-weight-bold">Độ tinh khiết</label>

                    <select name="clarity" id="clarity" type="text" v-model="posts.clarity" placeholder="VVS1" class="form-control"
                        style="width: 20%;">
                        <option value="FL">FL</option>
                        <option value="IF">IF</option>
                        <option value="VVS1">VVS1</option>
                        <option value="VVS2">VVS2</option>
                        <option value="VS1">VS1</option>
                        <option value="VS2">VS2</option>
                        <option value="SI1">SI1</option>
                        <option value="SI2">SI2</option>
                        <option value="I1">I1</option>
                        <option value="I2">I2</option>
                        <option value="I3">I3</option>
                    </select>
                </div>
                <div class="form-group row">
                    
                    <!-- <div class="col-sm-10">
                        <input type="text" v-model="posts.cut" class="form-control">
                    </div> -->

                    <label for="cut-diamond" class="col-sm-3 col-form-label font-weight-bold">Giác cắt</label>

                    <select name="cut" id="cut" type="text" v-model="posts.cut" placeholder="EX" class="form-control"
                        style="width: 20%;">
                        <option value="EX">EX</option>
                        <option value="VG">VG</option>
                        <option value="G">G</option>
                        <option value="F">F</option>
                        <option value="P">P</option>
                    </select>
                </div>
                <div class="form-group row">
                    <label for="size-diamond" class="col-sm-3 col-form-label font-weight-bold">Size</label>
                    <div class="col-sm-9">
                        <input type="number" v-model="posts.size" class="form-control w-50 " step="0.1">
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
import diamondService from '../services/diamond.service.js';
export default {
    data() {
        return {
            posts: {
                name: '',
                color: '',
                image: [
                    {
                        public_id: "",
                        url: "",
                    },
                ],
                clarity: '',
                cut: '',
                price: 1000000,
                size: 0.1
            }
        };
    },

    methods: {

        async handleUploadCloud() {
            const files = await document.getElementById('photo').files
            const presetName = import.meta.env.VITE_PRESET_NAME
            const presetFolder = import.meta.env.VITE_FOLDER_diamond
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
                        "Content-Type": "multipart/form-data"
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

        async addDiamond() {
            await this.handleUploadCloud()
            const res = await diamondService.createNewDiamond(this.posts);
            // const res = await axios.post("http://localhost:3000/diamond/store", this.posts)

            if (res.status === 201) {
                alert('Them kim cuong moi thanh cong')
                this.posts.name = "";
                this.posts.clarity = "";
                this.posts.cut = "";
                this.posts.color = "";
                this.posts.image = [this.posts.image[0]] // gan ve 1 mang chua phan tu dau tien
                this.posts.image[0].public_id = "";
                this.posts.image[0].url = "";
                this.posts.price = 1000000 ;
                this.posts.size = 0.1
            }
            else {
                alert('Them kim cuong that bai')
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