<script>
	import { goto } from '$app/navigation';
    import authStore from '../stores/authStore';
	import LoginCard from '../components/LoginCard.svelte';

    authStore.subscribe(async ({ isLoggedIn }) => {
		if (isLoggedIn) {
			await goto('/');
		}
	});

    let logIn = true;
</script>

<div class="wrapper">
	<div class="left-side">
		<h1>Bem vindo à μForge!</h1>
		<img src="logo_microForge.png" alt="" />
	</div>
	<LoginCard />
        
        
</div>

<style>
	.wrapper {
		display: flex;
		height: 100vh;
		align-items: center;
		justify-content: space-evenly;
	}

	.left-side {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
