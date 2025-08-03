<template>
  <div class="book-list-container">
    <div class="card">
      <div class="card-header">
        <h4 class="text-center mb-0">📖 Books with ISBN > 1000</h4>
        <p class="text-center mb-0 mt-2 opacity-75">Simple view as per tutorial requirements</p>
      </div>
      <div class="card-body">
        <div v-if="isLoading" class="text-center py-4">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <p class="mt-2 text-muted">Loading books...</p>
        </div>

        <div v-else-if="errorMessage" class="alert alert-danger">
          <i class="fas fa-exclamation-triangle me-2"></i>{{ errorMessage }}
        </div>

        <div v-else-if="books.length === 0" class="text-center py-4">
          <div class="text-muted">
            <i class="fas fa-book-open fa-3x mb-3"></i>
            <p>No books found with ISBN greater than 1000.</p>
            <small>Add some books with ISBN > 1000 to see them here!</small>
          </div>
        </div>

        <div v-else>
          <div class="list-group">
            <div v-for="book in books" :key="book.id" class="list-group-item list-group-item-action">
              <div class="d-flex w-100 justify-content-between align-items-center">
                <div>
                  <h6 class="mb-1">{{ book.name }}</h6>
                  <small class="text-muted">ISBN: {{ book.isbn }}</small>
                </div>
                <span class="badge bg-primary rounded-pill">{{ book.isbn }}</span>
              </div>
            </div>
          </div>
          <div class="mt-3 text-center">
            <small class="text-muted">
              <i class="fas fa-info-circle me-1"></i>
              Showing {{ books.length }} book(s) with ISBN greater than 1000
            </small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '../firebase/init'

const books = ref([])
const isLoading = ref(false)
const errorMessage = ref('')

const fetchBooks = async () => {
  isLoading.value = true
  errorMessage.value = ''
  
  try {
    const q = query(collection(db, 'books'), where('isbn', '>', 1000))
    const querySnapshot = await getDocs(q)
    const booksArray = []
    querySnapshot.forEach((doc) => {
      booksArray.push({ id: doc.id, ...doc.data() })
    })
    books.value = booksArray
    console.log('Basic BookList: Fetched books with ISBN > 1000:', booksArray)
  } catch (error) {
    console.error('Error fetching books: ', error)
    errorMessage.value = 'Failed to load books. Please try again.'
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchBooks()
})

// Expose fetchBooks for parent component to refresh
defineExpose({
  fetchBooks
})
</script>

<style scoped>
.book-list-container {
  margin-top: 20px;
}

.card {
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card-header {
  background-color: #17a2b8;
  color: white;
  padding: 15px;
  border-radius: 10px 10px 0 0;
}

.list-group-item {
  border-left: none;
  border-right: none;
  transition: background-color 0.2s;
}

.list-group-item:hover {
  background-color: #f8f9fa;
}

.list-group-item:first-child {
  border-top: none;
  border-radius: 0;
}

.list-group-item:last-child {
  border-bottom: none;
  border-radius: 0;
}

.badge {
  font-size: 0.8em;
}

.spinner-border {
  width: 3rem;
  height: 3rem;
}
</style>
