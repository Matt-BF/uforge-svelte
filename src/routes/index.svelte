<script>
	import authStore from '../stores/authStore';
	import { goto } from '$app/navigation';
	import firebase from 'firebase/app';

	authStore.subscribe(async ({ isLoggedIn, firebaseControlled }) => {
		if (!isLoggedIn && firebaseControlled) {
			await goto('/login');
		}
	});

	async function logout() {
		await firebase.auth().signOut();
	}
</script>

{#if $authStore.isLoggedIn}
    <h1>Hello {$authStore.user.displayName}</h1>
	<p>{$authStore.user.email}</p>
    <button on:click={logout}>Logout</button>
{:else}
<h1>Loading...</h1>
{/if}






