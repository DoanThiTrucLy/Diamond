<template>
    <div class="container" v-if="detailDiamond !== null">
        <div class="row">
            <div class="col-lg-8">
                <div class="sidebar--left">
                    <form method="POST" class="text-center mb-4" @submit.prevent="updateDiamond()">
                        <h3 class="my-4">Cập nhật thông tin sản phẩm</h3>
    
                        <div class="form-group row">
                            <label for="diamond__name" class="col-lg-3 col-form-label form-label">Tên sản phẩm</label>
                            <div class="col-lg-9">
                                <input type="text" class="form-control" id="diamond__name" v-model="detailDiamond.name">
                            </div>
                        </div>
    
                        <div class="form-group row">
                            <label for="diamond__clarity" class="col-lg-3 col-form-label form-label">Độ tinh khiết</label>
                            <div class="col-lg-9">
                                <input type="text" class="form-control" id="diamond__clarity" v-model="detailDiamond.clarity">
                            </div>
                        </div>
    
                        <div class="form-group row">
                            <label for="diamond__size" class="col-lg-3 col-form-label form-label">Size</label>
                            <div class="col-lg-9">
                                <input type="text" class="form-control" id="diamond__size" v-model="detailDiamond.size">
                            </div>
                        </div>
    
                        <div class="form-group row">
                            <label for="diamond__cut" class="col-lg-3 col-form-label form-label">Giác cắt</label>
                            <div class="col-lg-9">
                                <input type="text" class="form-control" id="diamond__cut" v-model="detailDiamond.cut">
                            </div>
                        </div>
    
                        <div class="form-group row">
                            <label for="diamond__price" class="col-lg-3 col-form-label form-label">Giá tiền</label>
                            <div class="col-lg-9">
                                <input type="number" class="form-control w-25" id="diamond__price" v-model="detailDiamond.price">
                            </div>
                        </div>
    
                        <div class="btn-update">
                            <button type="submit" class="btn btn-success">Cập nhật</button>
                        </div>
                    </form>
                </div>
            </div>
            <div class="col-lg-4">
                <div class="sidebar--right">
                    <div class="diamond__img w-100">
                        <img class="w-100" :src="detailDiamond.image[0].url" alt="ảnh bìa sản phẩm">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import diamondService from '../services/diamond.service.js';

export default {
    data() {
        return {
            detailDiamond: null
        }
    },
    methods: {
        async assignValues() {
            const idDiamond = this.$route.params.id;
            const res = await diamondService.detailDiamond(idDiamond);
            this.detailDiamond = res.data;
        },

        async updateDiamond() {
            const res = await diamondService.update(this.detailDiamond._id, this.detailDiamond);
            // const res = await productService.update(this.detailProduct._id, this.detailProduct);
            if(res.status === 200) {
                alert('Cập nhật thông tin thành công!!!');
            }
        }
    },
    async created() {
        await this.assignValues();
    }
}
</script>

<style scoped>
.container {
    min-height: 74.4vh;
}

.form-label {
    font-size: 1.31rem;
    text-align: left;
    font-weight: 600;
}

.btn-update {
    text-align: right;
}

.btn-update .btn {
    padding: 10px 15px;
    font-size: 1.35rem;
}
</style>