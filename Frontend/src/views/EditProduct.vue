<template>
    <div class="container" v-if="detailProduct !== null">
        <div class="row">
            <div class="col-lg-8">
                <div class="sidebar--left">
                    <form method="POST" class="text-center mb-4" @submit.prevent="updateProduct()">
                        <h3 class="my-4">Cập nhật thông tin sản phẩm</h3>
    
                        <div class="form-group row">
                            <label for="product__name" class="col-lg-3 col-form-label form-label">Tên sản phẩm</label>
                            <div class="col-lg-9">
                                <input type="text" class="form-control" id="product__name" v-model="detailProduct.name">
                            </div>
                        </div>
    
                        <div class="form-group row">
                            <label for="product__material" class="col-lg-3 col-form-label form-label">Nguyên liệu</label>
                            <div class="col-lg-9">
                                <input type="text" class="form-control" id="product__material" v-model="detailProduct.material">
                            </div>
                        </div>
    
                        <div class="form-group row">
                            <label for="product__main" class="col-lg-3 col-form-label form-label">Viên chính</label>
                            <div class="col-lg-9">
                                <input type="text" class="form-control" id="product__main" v-model="detailProduct.chief_officer">
                            </div>
                        </div>
    
                        <div class="form-group row">
                            <label for="product__extra" class="col-lg-3 col-form-label form-label">Viên phụ</label>
                            <div class="col-lg-9">
                                <input type="text" class="form-control" id="product__extra" v-model="detailProduct.Additional_pills">
                            </div>
                        </div>
    
                        <div class="form-group row">
                            <label for="product__price" class="col-lg-3 col-form-label form-label">Giá tiền</label>
                            <div class="col-lg-9">
                                <input type="number" class="form-control w-25" id="product__price" v-model="detailProduct.price">
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
                    <div class="product__img w-100">
                        <img class="w-100" :src="detailProduct.image[0].url" alt="ảnh bìa sản phẩm">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import productService from '../services/product.service.js';

export default {
    data() {
        return {
            detailProduct: null
        }
    },
    methods: {
        async assignValues() {
            const idProduct = this.$route.params.id;
            const res = await productService.detailProduct(idProduct);
            this.detailProduct = res.data;
        },

        async updateProduct() {
            const res = await productService.update(this.detailProduct._id, this.detailProduct);
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