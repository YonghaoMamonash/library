<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <div class="card">
          <div class="card-header">
            <h3 class="text-center">🔐 Firebase Sign In</h3>
          </div>
          <div class="card-body">
            <!-- Login Method Selection -->
            <div class="mb-4">
              <label class="form-label">Choose Login Method</label>
              <div class="btn-group w-100" role="group">
                <input type="radio" class="btn-check" name="loginMethod" id="firebase" v-model="loginMethod" value="firebase" autocomplete="off" checked>
                <label class="btn btn-outline-primary" for="firebase">Firebase Login</label>
                
                <input type="radio" class="btn-check" name="loginMethod" id="traditional" v-model="loginMethod" value="traditional" autocomplete="off">
                <label class="btn btn-outline-secondary" for="traditional">Traditional Login</label>
              </div>
            </div>

            <form @submit.prevent="handleLogin">
              <div class="mb-3" v-if="loginMethod === 'firebase'">
                <label for="userRole" class="form-label">Login as</label>
                <select class="form-control" id="userRole" v-model="selectedRole" :required="loginMethod === 'firebase'">
                  <option value="">Select your role</option>
                  <option value="admin">Administrator</option>
                  <option value="librarian">Librarian</option>
                  <option value="member">Library Member</option>
                  <option value="guest">Guest User</option>
                </select>
              </div>
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
                />
              </div>
              <div v-if="errorMessage" class="alert alert-danger">
                {{ errorMessage }}
              </div>
              <div v-if="successMessage" class="alert alert-success">
                {{ successMessage }}
              </div>
              <div class="d-grid">
                <button type="submit" class="btn btn-primary" :disabled="isLoading">
                  <span v-if="isLoading" class="spinner-border spinner-border-sm me-2"></span>
                  <span v-if="loginMethod === 'firebase'">{{ isLoading ? 'Signing In...' : 'Sign in via Firebase' }}</span>
                  <span v-else>{{ isLoading ? 'Signing In...' : 'Traditional Sign In' }}</span>
                </button>
              </div>
            </form>
            
            <div class="text-center mt-3">
              <p>Don't have an account? 
                <router-link to="/firebase-register" class="text-decoration-none">Register here</router-link>
              </p>
            </div>

            <!-- Current User Display -->
            <div v-if="currentUser" class="mt-4 p-3 bg-light rounded">
              <h5>Current User Information (Firebase):</h5>
              <p><strong>Email:</strong> {{ currentUser.email }}</p>
              <p><strong>UID:</strong> {{ currentUser.uid }}</p>
              <p><strong>Role:</strong> <span class="badge bg-primary">{{ userRole || 'No role assigned' }}</span></p>
              <p><strong>Email Verified:</strong> {{ currentUser.emailVerified }}</p>
              <p><strong>Access Level:</strong> {{ getAccessLevel(userRole) }}</p>
              <p><strong>Login Method:</strong> <span class="badge bg-success">Firebase Authentication</span></p>
              <button @click="signOut" class="btn btn-outline-danger btn-sm">Sign Out</button>
            </div>

            <!-- Traditional User Display -->
            <div v-if="authStore.isAuthenticated && !currentUser" class="mt-4 p-3 bg-warning rounded">
              <h5>Current User Information (Traditional):</h5>
              <p><strong>Email:</strong> {{ authStore.user.username }}</p>
              <p><strong>Login Method:</strong> <span class="badge bg-info">Traditional Authentication</span></p>
              <p><strong>Status:</strong> Authenticated via traditional login system</p>
              <button @click="traditionalSignOut" class="btn btn-outline-danger btn-sm">Sign Out</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { signInWithEmailAndPassword, onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth'
import { auth } from '../firebase/init'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

// Form data
const email = ref('')
const password = ref('')
const selectedRole = ref('')
const loginMethod = ref('firebase')
const isLoading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')
const currentUser = ref(null)
const userRole = ref('')

// Handle login based on selected method
const handleLogin = async () => {
  if (loginMethod.value === 'firebase') {
    await firebaseSignIn()
  } else {
    await traditionalSignIn()
  }
}

// Firebase sign in function
const firebaseSignIn = async () => {
  isLoading.value = true
  errorMessage.value = ''
  successMessage.value = ''
  
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value)
    const user = userCredential.user
    
    console.log('Firebase User signed in successfully:', user)
    console.log('Selected Role:', selectedRole.value)
    
    // Store the user role
    userRole.value = selectedRole.value
    
    successMessage.value = `Welcome back, ${user.email}! Logged in as ${selectedRole.value} via Firebase`
    
    // Clear form
    email.value = ''
    password.value = ''
    
    // Log current user to console for verification
    console.log('Current Firebase User with Role:', {
      uid: user.uid,
      email: user.email,
      role: selectedRole.value,
      emailVerified: user.emailVerified,
      displayName: user.displayName,
      photoURL: user.photoURL,
      accessLevel: getAccessLevel(selectedRole.value),
      loginMethod: 'Firebase Authentication'
    })
    
  } catch (error) {
    console.error('Firebase sign in error:', error)
    errorMessage.value = getErrorMessage(error.code)
  } finally {
    isLoading.value = false
  }
}

// Traditional sign in function
const traditionalSignIn = async () => {
  isLoading.value = true
  errorMessage.value = ''
  successMessage.value = ''
  
  try {
    // Simulate traditional login logic
    const success = authStore.login(email.value, password.value)
    
    if (success) {
      console.log('Traditional Login Successful!')
      console.log('User Details:', {
        email: email.value,
        loginMethod: 'Traditional Authentication',
        timestamp: new Date().toISOString()
      })
      
      successMessage.value = `Welcome back, ${email.value}! Logged in via Traditional Authentication`
      
      // Clear form
      email.value = ''
      password.value = ''
      
      // Redirect to home page
      router.push('/')
      
    } else {
      errorMessage.value = 'Invalid email or password for traditional login'
    }
    
  } catch (error) {
    console.error('Traditional sign in error:', error)
    errorMessage.value = 'Traditional login failed. Please try again.'
  } finally {
    isLoading.value = false
  }
}

// Sign out function
const signOut = async () => {
  try {
    await firebaseSignOut(auth)
    console.log('Firebase user signed out successfully')
    successMessage.value = 'Signed out successfully!'
    currentUser.value = null
    userRole.value = ''
  } catch (error) {
    console.error('Firebase sign out error:', error)
    errorMessage.value = 'Failed to sign out. Please try again.'
  }
}

// Traditional sign out function
const traditionalSignOut = () => {
  authStore.logout()
  console.log('Traditional user signed out successfully')
  successMessage.value = 'Traditional user signed out successfully!'
  router.push('/')
}

// Get user-friendly error messages
const getErrorMessage = (errorCode) => {
  switch (errorCode) {
    case 'auth/user-not-found':
      return 'No user found with this email address.'
    case 'auth/wrong-password':
      return 'Incorrect password.'
    case 'auth/invalid-email':
      return 'Invalid email address.'
    case 'auth/user-disabled':
      return 'This user account has been disabled.'
    case 'auth/too-many-requests':
      return 'Too many failed attempts. Please try again later.'
    case 'auth/network-request-failed':
      return 'Network error. Please check your connection.'
    default:
      return `Authentication failed: ${errorCode}`
  }
}

// Get access level based on role
const getAccessLevel = (role) => {
  switch (role) {
    case 'admin':
      return 'Full System Access - Can manage users, books, and system settings'
    case 'librarian':
      return 'Library Management - Can manage books, check-in/check-out, view reports'
    case 'member':
      return 'Member Access - Can browse books, borrow, and view personal history'
    case 'guest':
      return 'Guest Access - Can only browse the catalog'
    default:
      return 'No access level assigned'
  }
}

// Monitor authentication state
onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      currentUser.value = user
      console.log('User is signed in:', user)
    } else {
      currentUser.value = null
      console.log('User is signed out')
    }
  })
})
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

.spinner-border-sm {
  width: 1rem;
  height: 1rem;
}
</style>