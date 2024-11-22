<template>
    <div class="page-sign-up">
        <div class="column is-4 is-offset-4">
            <h1 class="title">Sign Up</h1>

            <form @submit.prevent="submitForm">
                <div class="field">
                    <label>Username</label>
                    <div class="control">
                        <input type="text" class="input" v-model="username" />
                    </div>
                </div>

                <div class="field">
                    <label>Password</label>
                    <div class="control">
                        <input type="password" class="input" v-model="password" />
                    </div>
                </div>

                <div class="field">
                    <label>Confirm Password</label>
                    <div class="control">
                        <input type="password" class="input" v-model="confirmpassword" />
                    </div>
                </div>

                <div class="notification is-danger" v-if="errors.length">
                    <p v-for="(error, index) in errors" :key="index">{{ error }}</p>
                </div>

                <div class="field">
                    <div class="control">
                        <button class="button is-dark" type="submit">Sign Up</button>
                    </div>
                </div>

                <hr />

                Already have an account? <router-link to="/log-in">Login</router-link>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { toast } from 'bulma-toast';

export default {
    name: 'SignUp',
    data() {
        return {
            username: '',
            password: '',
            confirmpassword: '',
            errors: [],
        };
    },
    mounted() {
        document.title = 'Sign Up | Sellofy';
    },
    methods: {
        async submitForm() {
            this.errors = [];

            // Form validation
            if (!this.username) {
                this.errors.push('Username is required.');
            }
            if (!this.password) {
                this.errors.push('Password is required.');
            }
            if (this.password !== this.confirmpassword) {
                this.errors.push("Passwords don't match.");
            }

            // Stop form submission if there are errors
            if (this.errors.length > 0) {
                return;
            }

            const formData = {
                username: this.username,
                password: this.password,
            };

            try {
                await axios.post('/api/v1/users/', formData);

                // Success notification
                toast({
                    message: 'Account created successfully. Redirecting to login...',
                    type: 'is-success',
                    dismissible: true,
                    pauseOnHover: true,
                    duration: 2000,
                    position: 'top-right',
                });

                // Redirect to login page
                this.$router.push('/log-in');   
            } catch (error) {
                if (error.response && error.response.data) {
                    // Display errors returned from the API
                    for (const property in error.response.data) {
                        this.errors.push(`${property}: ${error.response.data[property]}`);
                    }
                } else {
                    // Generic error message for unexpected issues
                    this.errors.push('Something went wrong. Please try again.');
                }

                console.error(error);
            }
        },
    },
};
</script>

<style>
.page-sign-up {
    margin-top: 50px;
}
</style>