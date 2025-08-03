<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <div class="card">
          <div class="card-header">
            <h3 class="text-center">🔐 Library Login</h3>
          </div>
          <div class="card-body">
            <form @submit.prevent="handleLogin">
              <div class="mb-3">
                <label for="loginUsername" class="form-label">Username</label>
                <input
                  type="text"
                  class="form-control"
                  id="loginUsername"
                  v-model="loginData.username"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="loginPassword" class="form-label">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="loginPassword"
                  v-model="loginData.password"
                  required
                />
              </div>
              <div v-if="errorMessage" class="alert alert-danger">
                {{ errorMessage }}
              </div>
              <div class="d-grid">
                <button type="submit" class="btn btn-primary">Login</button>
              </div>
            </form>
            
            <div class="mt-4 text-center">
              <div class="card">
                <div class="card-body">
                  <h6 class="card-title">Demo Credentials</h6>
                  <p class="card-text small">
                    <strong>Username:</strong> admin<br>
                    <strong>Password:</strong> password123
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const loginData = ref({
  username: '',
  password: ''
})

const errorMessage = ref('')

const handleLogin = () => {
  // Hardcoded credentials for demo
  if (loginData.value.username === 'admin' && loginData.value.password === 'password123') {
    authStore.login()
    router.push('/about')
  } else {
    errorMessage.value = 'Invalid username or password'
  }
}
</script>

<style scoped>
.container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 80vw;
  margin: 0 auto;
  padding: 20px;
  border-radius: 10px;
}

.card {
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card-header {
  background-color: #275fda;
  color: white;
  padding: 15px;
  border-radius: 10px 10px 0 0;
}
</style>
