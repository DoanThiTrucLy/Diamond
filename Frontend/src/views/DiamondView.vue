<template >
    <div class="diamond-view mt-4 container">
        <div>
            <img class="img-fluid"
                src="https://file.hstatic.net/1000381168/collection/bst-kcv-lucky-star-1920x820_31f76aa473bc4211a5c85f0ce40afe82.png">
        </div>
        <div class="row my-4">
            <div class="col-lg-3" v-for="(diamond, index) in diamonds.slice(startPagination(), endPagination() + 1)"
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
        <Pagination v-if="diamonds.length > 0" />
    </div>
</template>
<script>

import Pagination from '../components/Pagination.vue';

import { usePaginationStore } from '../stores/pagination.js';
import diamondService from '../services/diamond.service.js';


export default {
    components: { Pagination },
    setup() {
        const paginationStore = usePaginationStore();
        return {
            paginationStore
        }
    },
    data() {
        return {
            diamonds: []
        };
    },
    methods: {
        formattedPrice(price) {
            return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        },
        async assignValues() {
            const res = await diamondService.allDiamond();
            if (res.status === 200) {
                this.diamonds = res.data;
            }
            this.paginationStore.totalQuantityItems = this.diamonds.length;
            this.paginationStore.quantityItemsPage = 8;
        },
        startPagination() {
            return this.paginationStore.indexFirstItemPage();
        },
        endPagination() {
            return this.paginationStore.indexLastItemPage();
        }
    },
    async created() {
        await this.assignValues();
    },
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

