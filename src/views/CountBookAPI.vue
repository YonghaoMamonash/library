<template>
  <div class="container mt-4">
    <div class="card">
      <div class="card-header">
        <h2>Count Book API</h2>
      </div>
      <div class="card-body">
        <div v-if="loading" class="text-center">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <p>Loading authors data...</p>
        </div>
        
        <div v-else-if="error" class="alert alert-danger">
          <h5>Error loading authors data</h5>
          <p>{{ error }}</p>
        </div>
        
        <div v-else class="api-response">
          <h4>API Response:</h4>
          <pre>{{ JSON.stringify(apiResponse, null, 2) }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const authors = ref([])
const loading = ref(false)
const error = ref(null)
const apiResponse = ref(null)

const authorsCount = ref(0)
const totalBooks = ref(0)

const calculateStats = () => {
  authorsCount.value = authors.value.length
  totalBooks.value = authors.value.reduce((total, author) => {
    return total + (author.famousWorks ? author.famousWorks.length : 0)
  }, 0)
}

const getApiData = async () => {
  loading.value = true
  error.value = null
  
  try {
    const response = await fetch('src/assets/json/authors.json')
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    authors.value = data
    
    calculateStats()
    
    apiResponse.value = {
      success: true,
      data: {
        authorsCount: authorsCount.value,
        totalBooks: totalBooks.value,
        authors: authors.value.map(author => ({
          name: author.name,
          bookCount: author.famousWorks ? author.famousWorks.length : 0,
        }))
      },
      timestamp: new Date().toISOString()
    }
    
  } catch (err) {
    error.value = `Error loading authors data: ${err.message}`
    console.error('Error loading authors data:', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  getApiData()
})

defineExpose({
  getApiData
})
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
}

.card {
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card-header {
  background-color: #28a745;
  color: white;
  text-align: center;
  border-radius: 10px 10px 0 0;
}

.api-response {
  background-color: #f8f9fa;
  border-radius: 5px;
  padding: 15px;
}

pre {
  background-color: #f1f1f1;
  padding: 15px;
  border-radius: 5px;
  overflow-x: auto;
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>
