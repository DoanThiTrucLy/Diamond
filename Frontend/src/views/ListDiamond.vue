<template>
    <div class="list-view container mt-4" :key="diamonds.length">
        <h1 class="text-center">Danh sách kim cương</h1>
        <div class="row">
            <div class="col col-md-12">
                <table class="table table-bordered text-center">
                    <thead>
                        <tr>
                            <th scope="col">STT</th>
                            <th scope="col" style="width: 14%;">Ảnh đại diện</th>
                            <th scope="col">Tên sản phẩm</th>
                            <th scope="col">Giác cắt</th>
                            <th scope="col">Đơn giá</th>
                            <th scope="col">Hành động</th>
                        </tr>
                    </thead>
                    <tbody id="datarow">
                        <tr v-for="(diamond, index) in diamonds.slice(startPagination(), endPagination() + 1)" :key="diamond._id">
                            <td>{{ index + 1 }}</td>
                            <td>
                                <img :src="diamond.image[0].url" class="item__img">
                            </td>
                            <td>{{ diamond.name }}</td>
                            <td>{{ diamond.cut }}</td>
                            <td class="text-center text-danger" style="font-weight: 700;">{{ formattedPrice(diamond.price) }}</td>
                            <td>
                                <router-link :to="{name: 'edit-diamond', params: {id: diamond._id}}">
                                    <button type="button" class="btn btn-primary btn-edit-diamond">
                                        <font-awesome-icon :icon="['fas', 'pen']" />
                                        Sửa
                                    </button>
                                </router-link>
                                <button type="button" class="btn btn-danger btn-delete-diamond ml-2" @click="removeDiamond(diamond._id)">
                                    <i class="fa fa-trash" aria-hidden="true"></i> Xóa

                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <Pagination />
            </div>
        </div>
    </div>
</template>

<script>

import Pagination from '../components/Pagination.vue';
import { useUserStore } from '../stores/user.js';
import { usePaginationStore } from '../stores/pagination.js';
import diamondService from '../services/diamond.service.js';


export default {
    components: {Pagination},
    data() {
        return {
            diamonds: []
        };
    },
    setup() {
        const userStore = useUserStore();
        const paginationStore = usePaginationStore();
        return {
            userStore,
            paginationStore
        }
    },

    methods: {
        formattedPrice(price) {
            return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + 'đ';
        },

        async assignValues() {
            const res = await diamondService.allDiamond();
            this.diamonds = res.data;
            this.paginationStore.totalQuantityItems = this.diamonds.length;
            this.paginationStore.quantityItemsPage = 10;
        },

        startPagination() {
            return this.paginationStore.indexFirstItemPage();
        },
        endPagination() {
            return this.paginationStore.indexLastItemPage();
        },

        async removeDiamond(id) {
            const res = await diamondService.remove(id);
            if(res.status === 200) {
                await this.assignValues();
                alert('Xóa sản phẩm thành công');
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
</style>