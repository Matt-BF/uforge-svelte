<script>
import firebase from "firebase/app";

async function logout() {
  await firebase.auth().signOut();
}
</script>

<nav class="flex bg-green-600 p-10 justify-evenly">
  <div class="flex gap-5 justify-around">
    <a href="dash">Home</a>
    <a href="about">About</a>
    <button on:click="{logout}">Logout</button>
  </div>
  <p>AA</p>
</nav>
