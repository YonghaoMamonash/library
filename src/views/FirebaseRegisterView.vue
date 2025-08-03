<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <div class="card">
          <div class="card-header">
            <h3 class="text-center">📝 Firebase Registration</h3>
          </div>
          <div class="card-body">
            <form @submit.prevent="register">
              <div class="mb-3">
                <label for="email" class="form-label">Email address</label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  v-model="email"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  v-model="password"
                  required
                  minlength="6"
                />
                <div class="form-text">Password must be at least 6 characters long.</div>
              </div>
              <div class="mb-3">
                <label for="confirmPassword" class="form-label">Confirm Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="confirmPassword"
                  v-model="confirmPassword"
                  required
                />
                <div v-if="password !== confirmPassword && confirmPassword.length > 0" class="text-danger">
                  Passwords do not match.
                </div>
              </div>
              <div v-if="errorMessage" class="alert alert-danger">
                {{ errorMessage }}
              </div>
              <div v-if="successMessage" class="alert alert-success">
                {{ successMessage }}
              </div>
              <div class="d-grid">
                <button 
                  type="submit" 
                  class="btn btn-success" 
                  :disabled="isLoading || password !== confirmPassword || password.length < 6"
                >
                  <span v-if="isLoading" class="spinner-border spinner-border-sm me-2"></span>
                  {{ isLoading ? 'Creating Account...' : 'Register' }}
                </button>
              </div>
            </form>
            
            <div class="text-center mt-3">
              <p>Already have an account? 
                <router-link to="/firebase-signin" class="text-decoration-none">Sign in here</router-link>
              </p>
            </div>

            <!-- Registration Success Info -->
            <div v-if="registeredUser" class="mt-4 p-3 bg-light rounded">
              <h5>Registration Successful!</h5>
              <p><strong>User ID:</strong> {{ registeredUser.uid }}</p>
              <p><strong>Email:</strong> {{ registeredUser.email }}</p>
              <p><strong>Created:</strong> {{ new Date(registeredUser.metadata.creationTime).toLocaleString() }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase/init'
import { useRouter } from 'vue-router'

const router = useRouter()

// Form data
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const isLoading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')
const registeredUser = ref(null)

// Registration function
const register = async () => {
  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Passwords do not match.'
    return
  }

  if (password.value.length < 6) {
    errorMessage.value = 'Password must be at least 6 characters long.'
    return
  }

  isLoading.value = true
  errorMessage.value = ''
  successMessage.value = ''
  
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value)
    const user = userCredential.user
    
    console.log('User registered successfully:', user)
    registeredUser.value = user
    successMessage.value = `Account created successfully for ${user.email}!`
    
    // Clear form
    email.value = ''
    password.value = ''
    confirmPassword.value = ''
    
    // Log user information to console
    console.log('New User Information:', {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      creationTime: user.metadata.creationTime,
      lastSignInTime: user.metadata.lastSignInTime
    })
    
    // Optionally redirect to sign-in page after a delay
    setTimeout(() => {
      router.push('/firebase-signin')
    }, 3000)
    
  } catch (error) {
    console.error('Registration error:', error)
    errorMessage.value = getErrorMessage(error.code)
  } finally {
    isLoading.value = false
  }
}

// Get user-friendly error messages
const getErrorMessage = (errorCode) => {
  switch (errorCode) {
    case 'auth/email-already-in-use':
      return 'An account with this email address already exists.'
    case 'auth/invalid-email':
      return 'Invalid email address.'
    case 'auth/weak-password':
      return 'Password is too weak. Please use at least 6 characters.'
    case 'auth/network-request-failed':
      return 'Network error. Please check your connection.'
    case 'auth/too-many-requests':
      return 'Too many requests. Please try again later.'
    default:
      return `Registration failed: ${errorCode}`
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
  background-color: #28a745;
  color: white;
  padding: 15px;
  border-radius: 10px 10px 0 0;
}

.spinner-border-sm {
  width: 1rem;
  height: 1rem;
}

.form-text {
  font-size: 0.875rem;
  color: #6c757d;
}
</style>
