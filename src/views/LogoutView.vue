<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <div class="card">
          <div class="card-header">
            <h3 class="text-center">👋 Logout</h3>
          </div>
          <div class="card-body text-center">
            <div v-if="isLoggingOut" class="mb-4">
              <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Logging out...</span>
              </div>
              <p class="mt-2">Logging you out...</p>
            </div>
            
            <div v-else-if="loggedOut" class="mb-4">
              <div class="alert alert-success">
                <h5>✅ Successfully Logged Out</h5>
                <p>You have been logged out from all systems.</p>
              </div>
              
              <div class="mt-4 p-3 bg-light rounded">
                <h6>Current User Status:</h6>
                <p><strong>Firebase User:</strong> {{ currentUser ? 'Logged In' : 'Logged Out' }}</p>
                <p><strong>Traditional User:</strong> {{ authStore.isAuthenticated ? 'Logged In' : 'Logged Out' }}</p>
                <p><strong>Timestamp:</strong> {{ logoutTime }}</p>
              </div>
            </div>
            
            <div v-else class="mb-4">
              <h5>Are you sure you want to logout?</h5>
              <p>This will log you out from both Firebase and Traditional authentication systems.</p>
              <button @click="performLogout" class="btn btn-danger me-2">
                Yes, Logout
              </button>
              <router-link to="/" class="btn btn-secondary">
                Cancel
              </router-link>
            </div>
            
            <div v-if="loggedOut" class="mt-3">
              <router-link to="/" class="btn btn-primary me-2">Go to Home</router-link>
              <router-link to="/firebase-signin" class="btn btn-outline-primary">Sign In Again</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { signOut as firebaseSignOut, onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase/init'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const isLoggingOut = ref(false)
const loggedOut = ref(false)
const currentUser = ref(null)
const logoutTime = ref('')

// Perform logout from both systems
const performLogout = async () => {
  isLoggingOut.value = true
  
  try {
    // Logout from Firebase if user is signed in
    if (currentUser.value) {
      await firebaseSignOut(auth)
      console.log('Firebase user logged out successfully')
    }
    
    // Logout from traditional auth
    if (authStore.isAuthenticated) {
      authStore.logout()
      console.log('Traditional user logged out successfully')
    }
    
    // Set logout timestamp
    logoutTime.value = new Date().toLocaleString()
    
    // Log current user status to console for verification
    console.log('Logout completed at:', logoutTime.value)
    console.log('Current user status:', {
      firebaseUser: auth.currentUser,
      traditionalUser: authStore.isAuthenticated,
      timestamp: logoutTime.value
    })
    
    loggedOut.value = true
    
  } catch (error) {
    console.error('Logout error:', error)
    alert('Error during logout: ' + error.message)
  } finally {
    isLoggingOut.value = false
  }
}

// Monitor Firebase authentication state
onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    currentUser.value = user
    if (user) {
      console.log('Firebase user is signed in:', user.email)
    } else {
      console.log('No Firebase user signed in')
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
  background-color: #dc3545;
  color: white;
  padding: 15px;
  border-radius: 10px 10px 0 0;
}
</style>
