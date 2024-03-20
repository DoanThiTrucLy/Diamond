<template>
    <div class="container">
        <div id="carouselExampleControls" class="carousel slide mt-4" data-ride="carousel">
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img src="https://file.hstatic.net/1000381168/collection/web-3_7d7345db617845e3a434d730f95ea6d9.png"
                        class="d-block w-100" alt="img carousel">
                </div>
                <div class="carousel-item">
                    <img src="https://file.hstatic.net/1000381168/collection/kc-gia_554e959de61f48c7870af62028ee572e.png"
                        class="d-block w-100" alt="img carousel">
                </div>
                <div class="carousel-item">
                    <img src="https://file.hstatic.net/1000381168/file/slide-4_39c1b3b42ede456face3e40e1cb58218.png"
                        class="d-block w-100" alt="img carousel">
                </div>
                <div class="carousel-item">
                    <img src="https://file.hstatic.net/1000381168/file/slide-3_6c1af2f5981a4ddfb31d32196d470640.png"
                        class="d-block w-100" alt="img carousel">
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-target="#carouselExampleControls" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-target="#carouselExampleControls" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </button>
        </div>

        <div class="product row my-4">
            <div class="col-lg-3" v-for="(product, index) in products.slice(0, 12)" :key="index">
                <div class="my-2">
                    <div class="card">
                        <router-link :to="{ name: 'detailProduct', params: { id: product._id } }">
                            <div v-for="(image, index) in product.image" :key="index">
                                <span v-if="index == 0">
                                    <img class="card-img-top img-fluid" v-bind:src="image.url">
                                </span>
                            </div>
                        </router-link>
                        <div class="card-body">
                            <p>{{ product.material }}
                                {{ product.clarity }}
                                {{ product.chief_officer }}</p>
                            <h5 class="card-title">{{ product.name }}</h5>
                            <p class="product-price">{{ formattedPrice(product.price) }}đ</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row my-4">
            <div class="col-lg-3" v-for="(diamond, index) in diamonds.slice(0, 12)"
                :key="index">
                <div class="card-grid">
                    <div class="card my-3">
                        <router-link :to="{ name: 'detailDiamond', params: { id: diamond._id } }">
                            <div>
                                <span>
                                    <img class="card-img-top img-fluid" :src="diamond.image[0].url">
                                </span>
                            </div>
                        </router-link>
                        <div class="card-body">
                            <p class="text-center">
                                {{ diamond.color }} |
                                {{ diamond.clarity }} |
                                {{ diamond.cut }}
                            </p>
                            <router-link :to="{ name: 'detailDiamond', params: { id: diamond._id } }">
                                <h5 class="card-title text-center">{{ diamond.name }}</h5>
                            </router-link>

                            <p class="diamond-price text-center">{{ formattedPrice(diamond.price) }}đ</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import productService from '../services/product.service.js';
import diamondService from '../services/diamond.service.js';

export default {
    data() {
        return {
            products: [],
            diamonds: []
        };
    },

    methods: {
        formattedPrice(price) {
            return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        },

        async assignValues() {
            const res = await productService.allProduct();
            const res1 = await diamondService.allDiamond();
            if (res.status === 200) {
                this.products = res.data;
            }

            if(res1.status === 200) {
                this.diamonds = res1.data
            }
        },

        async shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }

    },

    async created() {
        await this.assignValues();
        await this.shuffleArray(this.products);
    },
}
</script>
<style scoped>
.carousel-item {
    height: 520px;
}

.carousel-item img {
    height: 100%;
}

.card-text {
    text-align: center;
    display: flex;
    flex-direction: column;
}

.card {
    width: 100%;
}

.product {
    display: flex;
    flex-direction: row;
    align-items: center;
    text-align: center;
}

.sections {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;


}

.card {
    width: 14.8rem;
    margin: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease;
}

.card:hover {
    transform: scale(1.05);
}

.card .card-img-top {
    max-width: 100%;
}

.card .card-title {
    font-size: 0.8rem;
    margin-top: 10px;


}

.card .card-body {
    padding: 10px;
}

.card p {
    margin: 0;
}

.product-price {
    color: rgb(190, 5, 17);
    font-size: 1rem;
    font-weight: bold;
}
.diamond-price{
    color: rgb(190, 5, 17);
    font-size: 1rem;
    font-weight: bold;
}
</style>