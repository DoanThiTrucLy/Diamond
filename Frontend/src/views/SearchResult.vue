<template >
    <div class="search-result-view mt-4 container" :key="searchStore.contentSearch">
        <h2 class="text-center">KẾT QUẢ TÌM KIẾM</h2>
        <div class="row my-4">
            <div class="col-lg-12">
                <h4>Sản phẩm kim cương</h4>
            </div>
            <div class="col-lg-3" v-for="(product, index) in filteredProducts"
                :key="index">
                <div class="card-grid">
                    <div class="card my-3">
                        <router-link :to="{ name: 'detailProduct', params: { id: product._id } }">
                            <div>
                                <span>
                                    <img class="card-img-top img-fluid" :src="product.image[0].url">
                                </span>
                            </div>
                        </router-link>
                        <div class="card-body">
                            <p class="text-center">{{ product.material }} {{ product.clarity }} {{ product.chief_officer }}
                            </p>
                            <router-link :to="{ name: 'detailProduct', params: { id: product._id } }">
                                <h5 class="card-title text-center">{{ product.name }}</h5>
                            </router-link>
                            <p class="product-price">{{ formattedPrice(product.price) }}đ</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>

        <div class="row my-4">
            <div class="col-lg-12">
                <h4>Kim cương</h4>
            </div>
            <div class="col-lg-3" v-for="(diamond, index) in filteredDiamonds"
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
import { usePaginationStore } from '../stores/pagination.js';
import { useSearchStore } from '../stores/search.js';


export default {
    // components: { Pagination },
    setup() {
        const paginationStore = usePaginationStore();
        const searchStore = useSearchStore();
        return {
            paginationStore,
            searchStore
        }
    },
    data() {
        return {
            products: [],
            diamonds: [],
            filteredProducts: [],
            filteredDiamonds: []
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

            if (res1.status === 200) {
                this.diamonds = res1.data;
            }
        },


        async filterResult() {
            this.filteredProducts = this.products.filter(item => item.name.toLowerCase().includes(this.searchStore.contentSearch.toLowerCase()));
            this.filteredDiamonds = this.diamonds.filter(item => item.name.toLowerCase().includes(this.searchStore.contentSearch.toLowerCase()));
        }
    },

    async created() {
        if (this.searchStore.contentSearch.length === 0) {
            this.$router.push({ name: 'home' });
        }
        await this.assignValues();
        await this.filterResult();
    },
    
    async updated() {
        if (this.searchStore.contentSearch.length === 0) {
            this.$router.push({ name: 'home' });
        }
        await this.assignValues();
        await this.filterResult();
    }
}
</script>
<style scoped>
.card {
    width: 100%;
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
    font-weight: bold;
    margin-top: 10px;
    color: black;
}

.card .card-body {
    padding: 10px;
}

.card p {
    margin: 0;
}

.diamond-price {
    color: rgb(190, 5, 17);
    font-size: 1rem;
    font-weight: bold;
}
</style>

