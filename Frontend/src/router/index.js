import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DiamondView from '../views/DiamondView.vue'
import CartView from '../views/CartView.vue'
import ProductView from '../views/ProductView.vue'
import SignupView from '../views/SignupView.vue'
import SigninView from '../views/SigninView.vue'
import DetailProductView from '../views/DetailProductView.vue'
import DetailDiamondView from '../views/DetailDiamondView.vue'
import CreateDiamond from '../views/CreateDiamond.vue'
import CreateProduct from '../views/CreateProduct.vue'
import Personal_Customer from '../views/Personal_Customer.vue'
import SearchResult from '../views/SearchResult.vue'
import newsView from '../views/newsView.vue'
import ContactView from '../views/ContactView.vue'
import ListProduct from '../views/ListProduct.vue'
import ListDiamond from '../views/ListDiamond.vue'
import ListCustomer from '../views/ListCustomer.vue'
import EditProduct from '../views/EditProduct.vue'
import EditDiamond from '../views/EditDiamond.vue'
import EntireOrder from '../views/EntireOrder.vue'
import Order_Customer from '../views/Order_Customer.vue'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/diamond',
      name: 'diamond',
      component: DiamondView
    },
    {
      path: '/product',
      name: 'product',
      component: ProductView
    },
    {
      path: '/search/result',
      name: 'result-search',
      component: SearchResult
    },
    {
      path: '/auth/signup',
      name: 'signup',
      component: SignupView
    },
    {
      path: '/auth/signin',
      name: 'signin',
      component: SigninView
    },
    {
      path: '/user/:id',
      name: 'personal',
      component: Personal_Customer
    },
    {
      path: '/diamond/:id',
      name: 'detailDiamond',
      component: DetailDiamondView
    },
    {
      path: '/product/:id/edit',
      name: 'edit-product',
      component: EditProduct
    },
    {
      path: '/diamond/:id/edit',
      name: 'edit-diamond',
      component: EditDiamond
    },
    {
      path: '/product/:id',
      name: 'detailProduct',
      component: DetailProductView
    },
    {
      path: '/diamond/create',
      name: 'create-diamond',
      component: CreateDiamond
    },
    {
      path: '/product/create',
      name: 'create-product',
      component: CreateProduct
    },
    {
      path: '/cart',
      name: 'cart',
      component: CartView
    },
    {
      path: '/news',
      name: 'news',
      component: newsView
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactView
    },
    {
      path: '/product/store',
      name: 'listproduct',
      component: ListProduct
    },
    {
      path: '/diamond/store',
      name: 'listdiamond',
      component: ListDiamond
    },
    {
      path: '/customer/store',
      name: 'listcustomer',
      component: ListCustomer
    },
    {
      path: '/list/order',
      name: 'list-order',
      component: EntireOrder
    },
    {
      path: '/user/:id/order',
      name: 'order_customer',
      component: Order_Customer
    },
  ]
})

export default router
