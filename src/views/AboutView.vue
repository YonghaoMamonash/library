<template>
  <div class="about">
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-8 offset-md-2">
          <h1 class="text-center">About Our Library</h1>
          <p class="text-center lead">
            Welcome to our digital library! We're dedicated to providing a vast collection of books and resources to our community.
          </p>
          
          <div class="row mt-5">
            <div class="col-md-6">
              <h3>📚 Our Mission</h3>
              <p>
                To provide accessible, comprehensive, and quality educational resources to learners of all ages. 
                We believe that knowledge should be available to everyone, regardless of their background or circumstances.
              </p>
            </div>
            <div class="col-md-6">
              <h3>🌟 Our Vision</h3>
              <p>
                To become the leading digital library platform that empowers individuals through knowledge sharing, 
                innovative learning experiences, and community engagement.
              </p>
            </div>
          </div>

          <div class="row mt-4">
            <div class="col-md-6">
              <h3>📖 What We Offer</h3>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">📚 Extensive collection of digital books</li>
                <li class="list-group-item">🎓 Academic resources and journals</li>
                <li class="list-group-item">🎧 Audiobooks and multimedia content</li>
                <li class="list-group-item">💻 Online research databases</li>
                <li class="list-group-item">👥 Community discussion forums</li>
              </ul>
            </div>
            <div class="col-md-6">
              <h3>⭐ Why Choose Us?</h3>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">🔍 Advanced search capabilities</li>
                <li class="list-group-item">📱 Mobile-friendly interface</li>
                <li class="list-group-item">🔒 Secure user accounts</li>
                <li class="list-group-item">📊 Personalized recommendations</li>
                <li class="list-group-item">🕒 24/7 availability</li>
              </ul>
            </div>
          </div>

          <div class="row mt-5">
            <div class="col-12">
              <div class="card">
                <div class="card-body text-center">
                  <h4 class="card-title">Ready to Join?</h4>
                  <p class="card-text">
                    Start your learning journey today by registering for a free account.
                  </p>
                  <router-link to="/" class="btn btn-primary">Register Now</router-link>
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
}

.list-group-item {
  border: none;
  padding: 8px 16px;
}

.lead {
  font-size: 1.25rem;
  color: #6c757d;
}
</style>
