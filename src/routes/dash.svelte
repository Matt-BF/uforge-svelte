<script>
import authStore from "../stores/authStore";
import Loading from "../components/Loading.svelte";
import Navbar from "../components/Navbar.svelte";
import { goto } from "$app/navigation";

authStore.subscribe(async ({ isLoggedIn, firebaseControlled }) => {
  if (!isLoggedIn && firebaseControlled) {
    await goto("/");
  }
});
</script>

{#if $authStore.isLoggedIn}
  <Navbar />
  <h1>Hello {$authStore.user.displayName}</h1>
  <p>{$authStore.user.email}</p>
{:else}
  <Loading />
{/if}
