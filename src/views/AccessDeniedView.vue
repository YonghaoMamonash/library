<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <div class="card text-center">
          <div class="card-body">
            <div class="mb-4">
              <i class="bi bi-shield-exclamation" style="font-size: 4rem; color: #dc3545;"></i>
            </div>
            <h1 class="card-title text-danger">Access Denied</h1>
            <p class="card-text lead">
              You need to be logged in to access this page.
            </p>
            <p class="card-text">
              Please log in with your credentials to continue accessing the library resources.
            </p>
            <div class="mt-4">
              <router-link to="/login" class="btn btn-primary me-2">Go to Login</router-link>
              <router-link to="/" class="btn btn-secondary">Back to Home</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// No script needed for now
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
  padding: 2rem;
}

.lead {
  font-size: 1.25rem;
  color: #6c757d;
}
</style>
