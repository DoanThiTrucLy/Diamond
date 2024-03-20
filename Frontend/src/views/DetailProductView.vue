<template>
    <div class="detail-product-view" v-if="product !== null">
        <div class="container my-6 p-5">
            <div class="row">
                <section class="imgs col-lg-5">
                    <div style="border: 1px solid #333;">
                        <img :src="product.image[indexImgIntro].url" class="img--lg w-100">
                    </div>
                    <div class="d-flex justify-content-center mt-2">
                        <div class="img-item__wrapper w-25 mx-1" v-for="(img, index) in product.image" :key="index" @click="() => indexImgIntro = index">
                            <img class="w-100" :src="img.url" alt="anh">
                        </div>
                    </div>
                </section>

                <div class="col-lg-7 product-info-detail">
                    <div>
                        <h2>{{ product.name }}</h2>
                        <br />
                        <p style="color: red; font-weight: 600;">
                            {{ formattedPrice(product.price) }}
                        </p>
                        <div class="w-75">
                            <div class="d-flex mt-2">
                                <span class="w-25">Chất liệu: </span>
                                <select class="w-75" style="flex: 3;">
                                    <option>{{ product.material }}</option>
                                </select>
                            </div>
                            <div class="d-flex  mt-2">
                                <span class="w-25">Viên chính: </span>
                                <select class="w-75">
                                    <option>{{ product.chief_officer }}</option>
                                </select>
                            </div>
                            <div class="d-flex  mt-2">
                                <span class="w-25">Viên phụ: </span>
                                <select class="w-75">
                                    <option>{{ product.Additional_pills }}</option>
                                </select>
                            </div>

                            <div class="d-flex  mt-4">
                                <label class="w-25" for="quantity-order">
                                    Số lượng: 
                                </label>
                                <input style="max-width: 50px; justify-content: flex-start;" type="number" id="quantity-order" min="1" v-model="pushNewItem.quantity">
                            </div>
                        </div>

                        <div class="d-flex justify-content-center w-100">
                            <button type="button" class="mt-4 btn-push-cart" @click="addCartItem()">
                                <font-awesome-icon :icon="['fas', 'cart-shopping']" />
                                Thêm vào giỏ hàng
                            </button>
                            <button type="button" class="mt-4 ml-2 btn-buy-now">
                                <font-awesome-icon :icon="['fas', 'credit-card']" />
                                Mua ngay
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-lg-12 mt-4">
                    <h5 class="text-center">CHI TIẾT SẢN PHẨM</h5>
                    <hr />

                    <div class="row">
                        <div class="col-lg-6">
                            <p style="color: red">
                                <font-awesome-icon :icon="['fas', 'circle-check']" />
                                Cam kết chất lượng
                            </p>
                            <ul style="list-style: none;">
                                <li class="assure-content">
                                    <font-awesome-icon :icon="['fas', 'check']" style="color: red" />
                                    Trang sức/ Ổ trang sức 100% chuẩn xác về hàm lượng và trọng lượng vàng.
                                </li>
                                <li class="assure-content">
                                    <font-awesome-icon :icon="['fas', 'check']" style="color: red" />
                                    Kim cương tự nhiên được nhập khẩu chính ngạch 100% và có giấy kiểm định GIA/ IGI uy tín thế giới và có giá trị toàn cầu. Đầy đủ máy móc, trang thiết bị hiện đại để kiểm tra chất lượng và soi mã số cạnh kim cương.
                                </li>
                                <li class="assure-content">
                                    <font-awesome-icon :icon="['fas', 'check']" style="color: red" />
                                    Đồng hồ chính hãng các thương hiệu: Versace, Mathey- Tissot, Pierre Cardin bảo hành chính hãng.
                                </li>
                                <li class="assure-content">
                                    <font-awesome-icon :icon="['fas', 'check']" style="color: red" />
                                    Trang sức vàng ta 24k (999.9) 100% chuẩn xác về hàm lượng và trọng lượng vàng
                                </li>
                                <li class="assure-content">
                                    <font-awesome-icon :icon="['fas', 'check']" style="color: red" />
                                    Mọi sản phẩm do Thế Giới Kim Cương bán ra đều có hóa đơn tài chính hợp lệ
                                </li>
                            </ul>

                        </div>
                        <div class="col-lg-6">
                            <p style="color: red">
                                <font-awesome-icon :icon="['fas', 'laptop']" />
                                Hướng dẫn mua hàng online
                            </p>
                            <ul style="list-style: none;">
                                <li class="assure-content">
                                    <font-awesome-icon :icon="['fas', 'check']" style="color: red" />
                                    Quý Khách vào trang sản phẩm để xem các sản phẩm được đăng tải trên Website
                                </li>
                                <li class="assure-content">
                                    <font-awesome-icon :icon="['fas', 'check']" style="color: red" />
                                    Thêm vào giỏ hàng.
                                </li>
                                <li class="assure-content">
                                    <font-awesome-icon :icon="['fas', 'check']" style="color: red" />
                                    Kiểm tra thông tin đơn hàng và đặt hàng
                                </li>
                                <li class="assure-content">
                                    <font-awesome-icon :icon="['fas', 'check']" style="color: red" />
                                    Kiểm tra và xác nhận đơn hàng
                                </li>
                                <li class="assure-content">
                                    <font-awesome-icon :icon="['fas', 'check']" style="color: red" />
                                    Đơn hàng thành công sẽ được gửi về email & sms của quý khách, đồng thời nhân viên sẽ liên hệ lại với Quý Khách xác nhận thời gian giao hàng.
                                </li>
                            </ul>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import productService from '../services/product.service.js';
import cartService from '../services/cart.service.js'
import { useUserStore } from '../stores/user.js';

export default {

    data() {
        return {
            pushNewItem: {
                idItem: '',
                idCustomer: '',
                category: 0,
                quantity: 1
            },
            _id: this.$route.params.id,
            indexImgIntro: 0,
            product: null
        }
    },
    setup() {
        const userStore = useUserStore();
        return {
            userStore
        }
    },
    methods: {
        formattedPrice(price) {
            // Định dạng giá tiền với dấu chấm (.) ở giữa
            return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' đ';
        },

        async assignValues() {
            const res = await productService.detailProduct(this._id);
            this.product = res.data;
        },

        opacityImg() {
            const imgs = document.getElementsByClassName('img-item__wrapper');
            for (let i = 0; i < imgs.length; i++) {
                if(i == this.indexImgIntro) {
                    imgs[i].classList.add('active');
                } else {
                    imgs[i].classList.remove('active');
                }
            }
        },
        async addCartItem() {
            this.pushNewItem.idItem = this.$route.params.id;
            this.pushNewItem.idCustomer = this.userStore.user._id;
            const res = await cartService.pushNewItem(this.pushNewItem);
            if(res.status === 200) {
                alert('Sản phẩm đã được thêm vào giỏ hàng thành công');
            }
        }

    },
    async created() {
        await this.assignValues();
    },
    async updated() {
        this.opacityImg();
    }
}
</script>

<style scoped>
.detail-product-view {
    margin: 16px auto;
}

.btn-push-cart,
.btn-buy-now {
    padding: 1.5rem 2.5rem;
    font-size: 1rem;
    font-weight: 700;
    color: #fff;
    border: 1px solid #d7d7d7;
    cursor: pointer;
}

.btn-push-cart {
    background-color: #222;
}

.btn-push-cart:hover {
    background-color: #000;
}

.btn-buy-now {
    background-color: rgb(220, 40, 40);
}

.btn-buy-now:hover {
    background-color: red;
}

.img-item__wrapper {
    border: 1px solid #d5d5d5;
    aspect-ratio: 1/1;
    opacity: .4;
    cursor: pointer;
}

.img-item__wrapper.active {
    opacity: 1;
}

.img-item__wrapper:hover {
    opacity: 1;
}

.assure-content {
    font-size: .8rem;
    text-align: justify;
}
</style>