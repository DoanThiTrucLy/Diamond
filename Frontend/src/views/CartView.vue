<template>
    <div class="cart-view container mt-4" :key="products.length">
        <div class="text-center" style="padding-top: 5rem;" v-if="products.length === 0 && diamonds.length === 0">
            <div class="my-4">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUHouSpp9gUpaEqjwTtHzi1dR027wnwx50dw&usqp=CAU"
                    alt="anh gio hang">
            </div>
            <div class="my-4">Giỏ hàng của bạn còn trống</div>
            <div>
                <router-link :to="{ name: 'product' }">
                    <button type="button" class="btn-buy-now">
                        Mua Ngay
                    </button>
                </router-link>
            </div>
        </div>
        <div v-else>

            <h1 class="text-center">Giỏ hàng</h1>
            <div class="row">
                <div class="col col-md-8">
                    <table class="table table-bordered text-center">
                        <thead>
                            <tr>
                                <th scope="col"></th>
                                <th scope="col" style="width: 14%;">Ảnh đại diện</th>
                                <th scope="col">Tên sản phẩm</th>
                                <th scope="col">Số lượng</th>

                                <th scope="col">Đơn giá</th>
                                <th scope="col">Thành tiền</th>
                                <th scope="col">Hành động</th>
                            </tr>
                        </thead>
                        <tbody id="datarow">
                            <tr v-for="(product, index) in products" :key="product._id">
                                <td>
                                    <input type="checkbox" :id="product._id" @click="transferItemToOrder(product, 2)">
                                </td>
                                <td>
                                    <img :src="product.item.image[0].url" class="item__img">
                                </td>
                                <td>{{ product.item.name }}</td>
                                <td class="text-center">
                                    <div style="display: flex; width: 100%; justify-content: center;">
                                        <span style="width: 30%; cursor: pointer; border: 1px solid #888;"
                                            @click="reduce(products[index])">
                                            <font-awesome-icon :icon="['fas', 'minus']" />
                                        </span>
                                        <input type="tel" v-model="product.quantity" style="width: 30%;"
                                            class="text-center">
                                        <span style="width: 30%; cursor: pointer; border: 1px solid #888;"
                                            @click="increase(products[index])">
                                            <font-awesome-icon :icon="['fas', 'plus']" />
                                        </span>
                                    </div>
                                </td>
                                <td class="text-center item-price">{{ formattedPrice(product.item.price) }}đ</td>
                                <td class="text-center item-price">{{ formattedPrice(product.quantity *
                                    product.item.price) }}đ</td>

                                <td>

                                    <button type="button" data-sp-ma="2" class="btn btn-danger btn-delete-sanpham"
                                        @click="handleRemoveInCart(product._id)">
                                        <i class="fa fa-trash" aria-hidden="true"></i>

                                    </button>
                                </td>
                            </tr>
                            <tr v-for="(diamond, index) in diamonds" :key="diamond._id">
                                <td>
                                    <input type="checkbox" :id="diamond._id" @click="transferItemToOrder(diamond, 1)" >
                                </td>
                                <td>
                                    <img :src="diamond.item.image[0].url" class="item__img">
                                </td>
                                <td>{{ diamond.item.name }}</td>
                                <td class="text-center">
                                    <div style="display: flex; width: 100%; justify-content: center;">
                                        <span style="width: 30%; cursor: pointer; border: 1px solid #888;"
                                            @click="reduce(diamonds[index])">
                                            <font-awesome-icon :icon="['fas', 'minus']" />
                                        </span>
                                        <input type="tel" v-model="diamond.quantity" style="width: 30%;"
                                            class="text-center">
                                        <span style="width: 30%; cursor: pointer; border: 1px solid #888;"
                                            @click="increase(diamonds[index])">
                                            <font-awesome-icon :icon="['fas', 'plus']" />
                                        </span>
                                    </div>
                                </td>
                                <td class="text-center item-price">{{ formattedPrice(diamond.item.price) }}đ</td>
                                <td class="text-center item-price">{{ formattedPrice(diamond.quantity *
                                    diamond.item.price) }}đ</td>

                                <td>

                                    <button type="button" data-sp-ma="2" class="btn btn-danger btn-delete-sanpham"
                                        @click="handleRemoveInCart(diamond._id)">
                                        <i class="fa fa-trash" aria-hidden="true"></i>

                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="col col-md-4">
                    <h5>Giao tới</h5>
                    <div>
                        <div class="form__group mt-3">
                            <label class="form__label">Họ tên</label>
                            <input class="form__input" type="text" v-model="user.name">
                        </div>
                        <div class="form__group mt-3">
                            <label class="form__label" for="">SĐT</label>
                            <input class="form__input" type="text" v-model="user.numberphone">
                        </div>
                        <div class="form__group mt-3">
                            <label class="form__label" for="">Địa chỉ</label>
                            <input class="form__input" type="text"  v-model="user.address">
                        </div>
                    </div>

                    <h5 class="my-3">Sản phẩm đặt</h5>
                    <div v-for="(itemOrder, idx) in order" :key="itemOrder.item._id">
                        <span>{{ idx+1 }}. </span>
                        <span>{{itemOrder.item.name  }} (số lượng: {{ itemOrder.quantity }})</span>
                        <p class="item-price" style="font-style: italic;">
                            Thành tiền: {{ formattedPrice(itemOrder.quantity * itemOrder.item.price) }} đ
                        </p>
                    </div>

                    <h5 class="my-3">Tổng tiền</h5>
                    <p class="item-price">
                        {{ formattedPrice(sumPricePayment()) }} đ
                    </p>
                    <hr>
                    <button type="button" data-sp-ma="2" class="button" @click="handleOrder()">Đặt hàng</button>
                </div>
                <div>

                </div>
            </div>
        </div>
    </div>
    
</template>

<script>

import { useUserStore } from '../stores/user.js';
import userService from '../services/user.service.js';
import cartService from '../services/cart.service';
import orderService from '../services/order.service';

export default {
    data() {
        return {
            user: {
                _id: '',
                name: '',
                numberphone: '',
                address: ''
            },
            products: [],
            diamonds: [],
            order: []
        };
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
            return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        },

        async assignValues() {
            const res = await userService.getCart(this.userStore.user._id);
            this.products = res.data.cartProduct;
            this.diamonds = res.data.cartDiamond;

            const res1 = await userService.detailUser(this.userStore.user._id);
            this.user._id = res1.data._id;
            this.user.name = res1.data.name;
            this.user.numberphone = res1.data.numberphone;
            this.user.address = res1.data.address;
        },
        async handleRemoveInCart(item) {
            const res = await cartService.removeInCart(this.userStore.user._id, item);
            if (res.status === 200) {
                await this.assignValues();
            }
        },
        async reduce(product) {
            return product.quantity--;
        },
        async increase(product) {
            return product.quantity++;
        },

        sumPricePayment() {
            const prices = [];
            for (let i = 0; i < this.order.length; i++) {
                const temp = this.order[i].item.price * this.order[i].quantity;
                prices.push(temp);
            }
            let sum = 0;
            for (let i = 0; i < prices.length; i++) {
                sum += prices[i];
                
            }
            return sum;
        },

        async transferItemToOrder(item, categories) { //categories case: 1 is diamond, 2 is product
            let isExist = false;
            let indexRemove = -1;
            for (let i = 0; i < this.order.length; i++) {
                if(this.order[i]._id == item._id) {
                    isExist = true;
                    indexRemove = i;
                    break;
                }
            }

            if(indexRemove !== -1) {
                this.order.splice(indexRemove, 1);
            } else {
                this.order.push(item);
                this.order[this.order.length-1].categories = categories;
            }
            this.sumPricePayment();
            console.log(this.order);
        },

        async handleOrder() {
            const orderDiamonds = []; 
            const orderProducts = []; 
            for (let i = 0; i < this.order.length; i++) {
                if(this.order[i].categories === 1) {
                    const temp = {
                        itemId: this.order[i].item._id,
                        quantity: this.order[i].quantity
                    }
                    orderDiamonds.push(temp);
                } else {
                    const temp = {
                        itemId: this.order[i].item._id,
                        quantity:this.order[i].quantity
                    }
                    orderProducts.push(temp);
                }
                await this.handleRemoveInCart(this.order[i]._id);
            }
            const formOrder = {
                userID: this.user._id,
                contentDiamond: orderDiamonds,
                contentProduct: orderProducts
            }
            const res = await orderService.create(formOrder);
            if(res.status === 201) {
                this.order = [];
                alert('Đặt hàng thành công, đơn hàng sẽ được giao từ 6-10 ngày');
            }
        }
    },

    async created() {
        await this.assignValues();
    },
}

</script>
<style scoped>
.item__img {
    width: 100%;
}

.cart-view {
    min-height: 71vh;
}

.btn-buy-now {
    background-color: purple;
    padding: .5rem 2rem;
    color: #fff;
}

.btn-buy-now:hover {
    background-color: rgb(177, 49, 177);
}

.item-price {
    color: rgb(190, 5, 17);
    font-size: 1rem;
    font-weight: bold;
}

.form__group {
    display: flex;
}

.form__group .form__label {
    flex: 1;
}

.form__group .form__input {
    flex: 2
}

.button { 
    display: block;  
    padding: 12px 15px;
    font-size: 16px;  
    font-weight: 600;
    cursor: pointer;  
    text-align: center;  
    text-decoration: none;  
    outline: none;  
    color: #fff; 
    background-color: rgb(226, 4, 152);  
    border: none;  
    border-radius: 15px;  
    box-shadow: 0 5px #999;
    margin-bottom: 20px;
    float: right;
}

.button:hover {background-color: #f045b4}
.button:active {
    background-color: #e50c51;  
    box-shadow: 0 5px #666;  
    transform: translateY(4px);}
</style>