<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <div class="card">
          <div class="card-header">
            <h3 class="text-center mb-0">📚 Add Book to Library</h3>
          </div>
          <div class="card-body">
            <form @submit.prevent="addBook">
              <div class="mb-3">
                <label for="isbn" class="form-label">ISBN Number</label>
                <input
                  type="text"
                  class="form-control"
                  id="isbn"
                  v-model="isbn"
                  required
                  placeholder="Enter ISBN number (e.g., 1234)"
                />
                <div class="form-text">ISBN must be a number greater than 1000</div>
              </div>
              <div class="mb-3">
                <label for="name" class="form-label">Book Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  v-model="name"
                  required
                  placeholder="Enter book name"
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
                  {{ isLoading ? 'Adding Book...' : 'Add Book' }}
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- View Toggle Section -->
        <div class="card mt-4">
          <div class="card-body text-center">
            <h5 class="card-title">📖 View Books</h5>
            <p class="card-text">Choose how you want to view the books with ISBN > 1000</p>
            <div class="btn-group" role="group">
              <input type="radio" class="btn-check" name="viewMode" id="basic" :checked="!showAdvanced" @change="showAdvanced = false">
              <label class="btn btn-outline-info" for="basic">Basic View</label>
              
              <input type="radio" class="btn-check" name="viewMode" id="advanced" :checked="showAdvanced" @change="showAdvanced = true">
              <label class="btn btn-outline-success" for="advanced">Advanced CRUD</label>
            </div>
          </div>
        </div>
        
        <!-- Display Books with ISBN > 1000 -->
        <BookList v-if="!showAdvanced" ref="bookListRef" />
        <AdvancedBookList v-else ref="advancedBookListRef" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../firebase/init'
import BookList from '../components/BookList.vue'
import AdvancedBookList from '../components/AdvancedBookList.vue'

const isbn = ref('')
const name = ref('')
const showAdvanced = ref(false)
const isLoading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

// References to components
const bookListRef = ref(null)
const advancedBookListRef = ref(null)

const addBook = async () => {
  isLoading.value = true
  errorMessage.value = ''
  successMessage.value = ''
  
  try {
    const isbnNumber = Number(isbn.value)
    if (isNaN(isbnNumber)) {
      errorMessage.value = 'ISBN must be a valid number'
      return
    }
    
    if (isbnNumber <= 1000) {
      errorMessage.value = 'ISBN must be greater than 1000 to appear in the list below'
    }
    
    await addDoc(collection(db, 'books'), {
      isbn: isbnNumber,
      name: name.value,
      createdAt: new Date().toISOString()
    })
    
    console.log('Book added successfully:', { isbn: isbnNumber, name: name.value })
    
    successMessage.value = `Book "${name.value}" with ISBN ${isbnNumber} has been added successfully!`
    
    isbn.value = ''
    name.value = ''
    
    // Auto-hide success message after 3 seconds
    setTimeout(() => {
      successMessage.value = ''
    }, 3000)
    
    // Refresh the appropriate book list
    if (showAdvanced.value && advancedBookListRef.value) {
      await advancedBookListRef.value.fetchBooks()
    } else if (bookListRef.value) {
      await bookListRef.value.fetchBooks()
    }
  } catch (error) {
    console.error('Error adding book: ', error)
    errorMessage.value = 'Failed to add book. Please try again.'
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 90vw;
  margin: 0 auto;
  padding: 20px;
}

.card {
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}

.card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.card-header {
  background-color: #28a745;
  color: white;
  padding: 15px;
  border-radius: 10px 10px 0 0;
}

.btn-group .btn-check:checked + .btn {
  background-color: #0d6efd;
  color: white;
}

.spinner-border-sm {
  width: 1rem;
  height: 1rem;
}

.form-control:focus {
  border-color: #28a745;
  box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.25);
}

.btn-primary {
  background-color: #28a745;
  border-color: #28a745;
}

.btn-primary:hover {
  background-color: #218838;
  border-color: #1e7e34;
}
</style>

<style scoped>
.container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 90vw;
  margin: 0 auto;
  padding: 20px;
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
</style>
