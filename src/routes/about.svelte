<script>
import authStore from "../stores/authStore";
import Loading from "../components/Loading.svelte";
import Navbar from "../components/Navbar.svelte";
import { goto } from "$app/navigation";
import firebase from "firebase/app";

authStore.subscribe(async ({ isLoggedIn, firebaseControlled }) => {
  if (!isLoggedIn && firebaseControlled) {
    await goto("/");
  }
});

async function logout() {
  await firebase.auth().signOut();
}
</script>

{#if $authStore.isLoggedIn}
  <Navbar />
  <h1>about</h1>
{:else}
  <Loading />
{/if}
