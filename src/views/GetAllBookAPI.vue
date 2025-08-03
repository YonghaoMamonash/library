<template>
  <div class="container mt-4">
    <div class="card">
      <div class="card-header">
        <h2>Get All Books API</h2>
      </div>
      <div class="card-body">
        <div v-if="loading" class="text-center">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <p>Loading books data...</p>
        </div>
        
        <div v-else-if="error" class="alert alert-danger">
          <h5>Error loading books data</h5>
          <p>{{ error }}</p>
        </div>
        
        <div v-else class="api-response">
          <h4>All Books in JSON Format:</h4>
          <div class="json-display">
            <pre>{{ formattedBooksJson }}</pre>
          </div>
          
          <div class="stats mt-3">
            <div class="row">
              <div class="col-md-6">
                <div class="stat-card">
                  <h5>Total Authors</h5>
                  <p class="stat-number">{{ totalAuthors }}</p>
                </div>
              </div>
              <div class="col-md-6">
                <div class="stat-card">
                  <h5>Total Books</h5>
                  <p class="stat-number">{{ totalBooks }}</p>
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
import { ref, computed, onMounted } from 'vue'

const authors = ref([])
const loading = ref(false)
const error = ref(null)

const totalAuthors = computed(() => authors.value.length)
const totalBooks = computed(() => {
  return authors.value.reduce((total, author) => {
    return total + (author.famousWorks ? author.famousWorks.length : 0)
  }, 0)
})

const formattedBooksJson = computed(() => {
  const allBooks = []
  
  authors.value.forEach(author => {
    if (author.famousWorks) {
      author.famousWorks.forEach(book => {
        allBooks.push({
          title: typeof book === 'string' ? book : book.title,
          year: typeof book === 'object' ? book.year : null,
          author: author.name,
          authorId: author.id || authors.value.indexOf(author) + 1
        })
      })
    }
  })
  
  const response = {
    success: true,
    totalAuthors: totalAuthors.value,
    totalBooks: totalBooks.value,
    books: allBooks,
    timestamp: new Date().toISOString()
  }
  
  return JSON.stringify(response, null, 2)
})

const loadBooksData = async () => {
  loading.value = true
  error.value = null
  
  try {
    const response = await fetch('src/assets/json/authors.json')
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    authors.value = data
    
    console.log('Books data loaded:', data)
    
  } catch (err) {
    error.value = `Error loading books data: ${err.message}`
    console.error('Error loading books data:', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadBooksData()
})
</script>

<style scoped>
.container {
  max-width: 1000px;
  margin: 0 auto;
}

.card {
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card-header {
  background-color: #17a2b8;
  color: white;
  text-align: center;
  border-radius: 10px 10px 0 0;
}

.json-display {
  max-height: 500px;
  overflow-y: auto;
  border: 1px solid #ddd;
  border-radius: 5px;
}

pre {
  background-color: #f8f9fa;
  padding: 15px;
  margin: 0;
  font-size: 0.875rem;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.stats {
  margin-top: 20px;
}

.stat-card {
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 5px;
  text-align: center;
  border: 1px solid #dee2e6;
}

.stat-number {
  font-size: 2rem;
  font-weight: bold;
  color: #17a2b8;
  margin: 0;
}
</style>
