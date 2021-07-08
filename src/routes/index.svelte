<script>
import authStore from "../stores/authStore";
import LoginCard from "../components/LoginCard.svelte";
import { goto } from "$app/navigation";

authStore.subscribe(async ({ isLoggedIn }) => {
  if (isLoggedIn) {
    await goto("/dash");
  }
});
</script>

<div
  class="flex flex-col p-5 h-screen lg:flex-row lg:items-center lg:justify-evenly">
  <img class="md:w-1/2 lg:w-1/3 self-center" src="logo_microForge.png" alt="" />
  <LoginCard />
</div>
