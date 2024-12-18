<template>
    <div class="page-checkout">
        <div class="columns is-multiline">
            <div class="column is-12">
                <h1 class="title">Checkout</h1>
            </div>

            <div class="column is-12 box">
                <table class="table is-fullwidth">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="item in cart.items" :key="item.product.id">
                            <td>{{ item.product.name }}</td>
                            <td>${{ item.product.price }}</td>
                            <td>{{ item.quantity }}</td>
                            <td>${{ getItemTotal(item).toFixed(2) }}</td>
                        </tr>
                    </tbody>

                    <tfoot>
                        <tr>
                            <td colspan="2">Total</td>
                            <td>{{ cartTotalLength }}</td>
                            <td>${{ cartTotalPrice.toFixed(2) }}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>

            <div class="column is-12 box">
                <div class="subtitle">Shipping Details</div>

                <p class="has-text-grey mb-4">All fields are required.</p>

                <div class="columns is-multiline">
                    <div class="column is-6">
                        <div class="field">
                            <label>First Name</label>
                            <div class="control">
                                <input type="text" class="input" v-model="first_name">
                            </div>
                        </div>

                        <div class="field">
                            <label>Last Name</label>
                            <div class="control">
                                <input type="text" class="input" v-model="last_name">
                            </div>
                        </div>

                        <div class="field">
                            <label>E-mail</label>
                            <div class="control">
                                <input type="email" class="input" v-model="email">
                            </div>
                        </div>

                        <div class="field">
                            <label>Phone Number</label>
                            <div class="control">
                                <input type="number" class="input" v-model="phone">
                            </div>
                        </div>
                    </div>

                    <div class="column is-6">
                        <div class="field">
                            <label>Address</label>
                            <div class="control">
                                <input type="text" class="input" v-model="address">
                            </div>
                        </div>

                        <div class="field">
                            <label>Zip Code</label>
                            <div class="control">
                                <input type="text" class="input" v-model="zip">
                            </div>
                        </div>

                        <div class="field">
                            <label>Place</label>
                            <div class="control">
                                <input type="text" class="input" v-model="place">
                            </div>
                        </div>
                    </div>
                </div>

                <div class="notification is-danger mt-4" v-if="errors.length">
                    <p v-for="error in errors" :key="error">{{ error }}</p>
                </div>

                <hr>

                <template v-if="cartTotalLength">
                    <router-link to="/cart/checkout/success" class="button is-success" @click="submitForm">Proceed to Pay</router-link>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Checkout',
    data() {
        return {
            cart: {
                items: [],
            },
            first_name: '',
            last_name: '',
            email: '',
            phone: '',
            address: '',
            zip: '',
            place: '',
            errors: [],
        }
    },
    mounted() {
        document.title = 'Checkout | Sellofy';

        this.cart = this.$store.state.cart
    },
    methods: {
        getItemTotal(item) {
            return item.quantity * item.product.price
        },

        submitForm() {
            this.errors = []

            if( this.first_name === '' ) {
                this.errors.push('First name is required')
            }
            if( this.last_name === '' ) {
                this.errors.push('Last name is required')
            }
            if( this.email === '' ) {
                this.errors.push('Email is required')
            }
            if( this.phone === '' ) {
                this.errors.push('Phone is required')
            }
            if( this.address === '' ) {
                this.errors.push('Address is required')
            }
            if( this.zip === '' ) {
                this.errors.push('Zip is required')
                }
            if( this.place === '' ) {
                this.errors.push('Place is required')
            }
        }
    },
    computed: {
        cartTotalPrice() {
            return this.cart.items.reduce((acc, curVal) => { 
                return acc += curVal.product.price * curVal.quantity
            }, 0)
        },
        cartTotalLength() {
            return this.cart.items.reduce((acc, curVal) => {
                return acc += curVal.quantity
            }, 0)
        }
    }
}
</script>