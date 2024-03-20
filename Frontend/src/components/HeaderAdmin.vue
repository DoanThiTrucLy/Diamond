<template>
    <div class="container-fluid header-top">
        <div class="row" style="height: 55px;">
            <div class="col-lg-5"></div>
            <div class="col-lg-2 h-100">
                <div class="logo__wrapper h-100">
                    <img src="../assets/img/diamond_logo.png" alt="logo" class="logo">
                </div>
            </div>
            <div class="col-lg-5">
                <div class="header-top__sidebar--right h-100">
                    <div class="logo__icon" v-if="userStore.user._id.length === 0">
                        <router-link :to="{ name: 'signin' }" class="nav__link">
                            <font-awesome-icon :icon="['fas', 'user']" />
                            <span style="margin-left: 6px;">
                                Thông tin tài khoản
                            </span>
                        </router-link>
                    </div>
                    <div class="logo__icon" v-else>
                        <font-awesome-icon :icon="['fas', 'user']" />
                        <span style="margin-left: 6px;">
                            {{ userStore.user.name }}
                        </span>

                        <button type="button" class="btn--logout" @click="userStore.logout()">Đăng xuất</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-12">
                <div class="categories">
                    <div class="categories__item">
                        <router-link :to="{ name: 'create-diamond' }" class="nav__link">Thêm kim cương</router-link>
                    </div>
                    <div class="categories__item">
                        <router-link :to="{ name: 'create-product' }" class="nav__link">
                            Thêm sản phẩm
                        </router-link>
                    </div>
                    <div class="categories__item">
                        <router-link :to="{ name: 'listproduct' }" class="nav__link">
                            Danh sách sản phẩm
                        </router-link>
                    </div>

                    <div class="categories__item">
                        <router-link :to="{ name: 'listdiamond' }" class="nav__link">
                            Danh sách kim cương
                        </router-link>
                    </div>
                    <div class="categories__item">
                        <router-link :to="{ name: 'listcustomer' }" class="nav__link">
                            Danh sách khách hàng
                        </router-link>
                    </div>
                    <div class="categories__item">
                        <router-link :to="{ name: 'list-order' }" class="nav__link">
                            Danh sách đơn hàng
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useUserStore } from '../stores/user.js';
import { useSearchStore } from '../stores/search.js';


export default {
    setup() {
        const userStore = useUserStore();
        const searchStore = useSearchStore();
        return {
            userStore,
            searchStore
        }
    },
}
</script>

<style scoped>
.header-top {
    background-color: #fffefb;
    box-shadow: 2px 3px 3px rgba(0, 0, 0, .2);
}

.logo__wrapper {
    display: flex;
    align-items: center;
}

.logo {
    width: 50%;
    height: 80%;
}

.header-top__sidebar--right {
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

.logo__icon {
    margin-right: 0.8rem;
    color: #333;
    display: flex;
    align-items: center;
}

.nav__link {
    color: inherit;
    text-decoration: none;
}

.categories {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    border-top: 1px solid #ccc;
}

.categories__item {
    font-size: 1rem;
    line-height: 3.2rem;
    font-weight: 400;
    text-transform: uppercase;
}

.btn--logout {
    padding: 6px 10px;
    margin-left: 10px;
    border: none;
    background-color: #333;
    color: #fff;
    opacity: 1;
}

.btn--logout:hover {
    opacity: .6;
}
</style>