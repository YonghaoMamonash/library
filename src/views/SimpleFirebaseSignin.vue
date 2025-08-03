<template>
  <h1>Sign in</h1>
  <p><input type="text" placeholder="Email" v-model="email" /></p>
  <p><input type="password" placeholder="Password" v-model="password" /></p>
  <p>
    <label>Login as:</label>
    <select v-model="selectedRole">
      <option value="">Select Role</option>
      <option value="admin">Administrator</option>
      <option value="librarian">Librarian</option>
      <option value="member">Library Member</option>
      <option value="guest">Guest User</option>
    </select>
  </p>
  <p><button @click="signin">Sign in via Firebase</button></p>
</template>

<script setup>
import { ref } from 'vue';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const selectedRole = ref('');
const router = useRouter();
const auth = getAuth();

const signin = () => {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((data) => {
      console.log("Firebase Login Successful!");
      console.log("User Role:", selectedRole.value);
      console.log("User Details:", {
        email: data.user.email,
        uid: data.user.uid,
        role: selectedRole.value,
        accessLevel: getAccessLevel(selectedRole.value)
      });
      router.push("/");
      console.log(auth.currentUser);
    }).catch((error) => {
      console.log(error.code);
      alert("Login failed: " + error.message);
    });
};

const getAccessLevel = (role) => {
  switch (role) {
    case 'admin': return 'Full System Access';
    case 'librarian': return 'Library Management';
    case 'member': return 'Member Access';
    case 'guest': return 'Guest Access';
    default: return 'No access level';
  }
};
</script>
