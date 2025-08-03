<template>
  <div class="book-list-container">
    <div class="card">
      <div class="card-header">
        <h4 class="text-center mb-2">🚀 Advanced Book Management</h4>
        <p class="text-center mb-3 opacity-75">Full CRUD operations with WHERE, ORDER BY, and LIMIT queries</p>
        <div class="d-flex justify-content-between align-items-center">
          <button @click="fetchBooks" class="btn btn-sm btn-outline-light">
            <span v-if="isLoading" class="spinner-border spinner-border-sm me-1"></span>
            Refresh
          </button>
          <div class="d-flex gap-2">
            <select v-model="sortOrder" @change="fetchBooks" class="form-select form-select-sm">
              <option value="asc">ISBN Ascending</option>
              <option value="desc">ISBN Descending</option>
            </select>
            <select v-model="limitCount" @change="fetchBooks" class="form-select form-select-sm">
              <option value="5">Show 5</option>
              <option value="10">Show 10</option>
              <option value="20">Show 20</option>
              <option value="0">Show All</option>
            </select>
          </div>
        </div>
      </div>
      <div class="card-body">
        <div v-if="isLoading" class="text-center py-4">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <p class="mt-2 text-muted">Loading books...</p>
        </div>

        <div v-else-if="errorMessage" class="alert alert-danger">
          {{ errorMessage }}
        </div>

        <div v-else-if="books.length === 0" class="text-center py-4">
          <div class="text-muted">
            <p>No books found with ISBN greater than 1000.</p>
            <small>Add some books with ISBN > 1000 to see them here!</small>
          </div>
        </div>

        <div v-else>
          <div class="row">
            <div v-for="book in books" :key="book.id" class="col-md-6 mb-3">
              <div class="card book-card">
                <div class="card-body">
                  <!-- Edit Mode -->
                  <div v-if="editingBook === book.id">
                    <div class="mb-2">
                      <label class="form-label">Book Name</label>
                      <input
                        v-model="editForm.name"
                        type="text"
                        class="form-control"
                        required
                      />
                    </div>
                    <div class="mb-2">
                      <label class="form-label">ISBN</label>
                      <input
                        v-model.number="editForm.isbn"
                        type="number"
                        class="form-control"
                        required
                      />
                    </div>
                    <div class="d-flex gap-2">
                      <button @click="updateBook(book.id)" class="btn btn-success btn-sm">
                        Save
                      </button>
                      <button @click="cancelEdit" class="btn btn-secondary btn-sm">
                        Cancel
                      </button>
                    </div>
                  </div>
                  
                  <!-- View Mode -->
                  <div v-else>
                    <h5 class="card-title">{{ book.name }}</h5>
                    <p class="card-text">
                      <strong>ISBN:</strong> {{ book.isbn }}<br>
                      <strong>Added:</strong> {{ formatDate(book.createdAt) }}
                    </p>
                    <div class="d-flex justify-content-between align-items-center">
                      <span class="badge bg-primary">ISBN: {{ book.isbn }}</span>
                      <div class="btn-group">
                        <button @click="startEdit(book)" class="btn btn-outline-primary btn-sm">
                          Edit
                        </button>
                        <button @click="deleteBook(book.id)" class="btn btn-outline-danger btn-sm">
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-3 text-center">
            <div class="alert alert-info">
              <strong>Query Details:</strong> WHERE isbn > 1000 | ORDER BY {{ sortOrder === 'asc' ? 'ascending' : 'descending' }} | 
              {{ limitCount > 0 ? `LIMIT ${limitCount}` : 'No limit' }} | 
              <strong>Results:</strong> {{ books.length }} book(s)
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { collection, query, where, getDocs, orderBy, limit, doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { db } from '../firebase/init'

// Data
const books = ref([])
const isLoading = ref(false)
const errorMessage = ref('')
const sortOrder = ref('asc')
const limitCount = ref(10)

// Edit functionality
const editingBook = ref(null)
const editForm = ref({
  name: '',
  isbn: ''
})

// Fetch books function with advanced queries (WHERE, ORDER BY, LIMIT)
const fetchBooks = async () => {
  isLoading.value = true
  errorMessage.value = ''
  
  try {
    // Create query for books with ISBN > 1000
    let q = query(
      collection(db, 'books'),
      where('isbn', '>', 1000),
      orderBy('isbn', sortOrder.value)
    )
    
    // Add limit if specified
    if (limitCount.value > 0) {
      q = query(
        collection(db, 'books'),
        where('isbn', '>', 1000),
        orderBy('isbn', sortOrder.value),
        limit(limitCount.value)
      )
    }
    
    const querySnapshot = await getDocs(q)
    const booksData = []
    
    querySnapshot.forEach((doc) => {
      booksData.push({
        id: doc.id,
        ...doc.data()
      })
    })
    
    books.value = booksData
    console.log('Advanced Query Results:', {
      where: 'isbn > 1000',
      orderBy: `isbn ${sortOrder.value}`,
      limit: limitCount.value > 0 ? limitCount.value : 'no limit',
      count: booksData.length,
      data: booksData
    })
    
  } catch (error) {
    console.error('Error fetching books:', error)
    errorMessage.value = 'Failed to load books. Please try again.'
  } finally {
    isLoading.value = false
  }
}

// Start editing a book
const startEdit = (book) => {
  editingBook.value = book.id
  editForm.value = {
    name: book.name,
    isbn: book.isbn
  }
}

// Cancel edit
const cancelEdit = () => {
  editingBook.value = null
  editForm.value = {
    name: '',
    isbn: ''
  }
}

// Update book (UPDATE operation)
const updateBook = async (bookId) => {
  try {
    const bookRef = doc(db, 'books', bookId)
    await updateDoc(bookRef, {
      name: editForm.value.name,
      isbn: editForm.value.isbn,
      updatedAt: new Date().toISOString()
    })
    
    console.log('Book updated successfully:', {
      id: bookId,
      updatedData: editForm.value
    })
    
    // Refresh the list
    await fetchBooks()
    
    // Exit edit mode
    cancelEdit()
    
  } catch (error) {
    console.error('Error updating book:', error)
    errorMessage.value = 'Failed to update book. Please try again.'
  }
}

// Delete book (DELETE operation)
const deleteBook = async (bookId) => {
  if (!confirm('Are you sure you want to delete this book?')) {
    return
  }
  
  try {
    await deleteDoc(doc(db, 'books', bookId))
    
    console.log('Book deleted successfully:', bookId)
    
    // Refresh the list
    await fetchBooks()
    
  } catch (error) {
    console.error('Error deleting book:', error)
    errorMessage.value = 'Failed to delete book. Please try again.'
  }
}

// Format date function
const formatDate = (dateString) => {
  if (!dateString) return 'Unknown'
  return new Date(dateString).toLocaleDateString()
}

// Load books on component mount
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
  background: linear-gradient(135deg, #6f42c1, #e83e8c);
  color: white;
  padding: 20px;
  border-radius: 10px 10px 0 0;
}

.book-card {
  border: 1px solid #e0e0e0;
  transition: transform 0.2s, box-shadow 0.2s;
  border-radius: 8px;
}

.book-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.badge {
  font-size: 0.8em;
}

.spinner-border {
  width: 3rem;
  height: 3rem;
}

.btn-group .btn {
  border-radius: 4px;
}

.alert-info {
  background-color: #e7f3ff;
  border-color: #b3d7ff;
  color: #004085;
}
</style>
