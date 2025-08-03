import { ref, computed } from 'vue'

// Global state for authentication
const isAuthenticated = ref(false)
const user = ref(null)

export function useAuthStore() {
  const login = (username, password) => {
    // Simple validation for demo purposes
    if (username && password) {
      isAuthenticated.value = true
      user.value = { username, email: username }
      localStorage.setItem('isAuthenticated', 'true')
      localStorage.setItem('user', JSON.stringify(user.value))
      return true
    }
    return false
  }

  const logout = () => {
    isAuthenticated.value = false
    user.value = null
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('user')
  }

  const checkAuth = () => {
    const stored = localStorage.getItem('isAuthenticated')
    const storedUser = localStorage.getItem('user')
    
    if (stored === 'true' && storedUser) {
      isAuthenticated.value = true
      user.value = JSON.parse(storedUser)
    } else {
      isAuthenticated.value = false
      user.value = null
    }
    
    return isAuthenticated.value
  }

  // Initialize auth state from localStorage
  if (typeof window !== 'undefined') {
    checkAuth()
  }

  return {
    isAuthenticated: computed(() => isAuthenticated.value),
    user: computed(() => user.value),
    login,
    logout,
    checkAuth
  }
}
