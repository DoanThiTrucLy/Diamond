<template >
  <div class="product-view mt-4 container">
    <div>
      <img class="img-fluid"
        src="https://file.hstatic.net/1000381168/collection/bannernhankc_91bf72dff9354f65a22735ac76e8e48e.png">
    </div>

    <div class="row my-4">
      <div class="col-lg-3" v-for="(product, index) in products.slice(startPagination(), endPagination() + 1)" :key="index">
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
              <p class="text-center">{{ product.material }} {{ product.clarity }} {{ product.chief_officer }}</p>
              <router-link :to="{ name: 'detailProduct', params: { id: product._id } }">
                <h5 class="card-title text-center">{{ product.name }}</h5>
              </router-link>
              <p class="product-price">{{ formattedPrice(product.price) }}đ</p>
            </div>
          </div>

        </div>
      </div>
    </div>
    <Pagination v-if="products.length > 0" />
  </div>
</template>
<script>
import productService from '../services/product.service.js';
import { usePaginationStore } from '../stores/pagination.js';
import Pagination from '../components/Pagination.vue';

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
      products: []
    };
  },
  methods: {
    formattedPrice(price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    },
    async assignValues() {
      const res = await productService.allProduct();
      if (res.status === 200) {
        this.products = res.data;
      }

      this.paginationStore.totalQuantityItems = this.products.length;
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

.product-price {
  color: rgb(190, 5, 17);
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
}
</style>
