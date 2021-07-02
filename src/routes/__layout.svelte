<script>
	import '../globals.css';
	import firebase from 'firebase/app';
	import 'firebase/auth';
	import { onMount } from 'svelte';
	import authStore from '../stores/authStore';

	onMount(() => {
		const firebaseConfig = {
			apiKey: 'AIzaSyAlZnnGLHTkmy-8HXAbh15wqHo59MKL2V4',
			authDomain: 'svelte-test-c5261.firebaseapp.com',
			projectId: 'svelte-test-c5261',
			storageBucket: 'svelte-test-c5261.appspot.com',
			messagingSenderId: '26461693854',
			appId: '1:26461693854:web:ae59cb1827a579e07d588f',
			measurementId: 'G-F3R8S08GGH'
		};
		if (!firebase.apps.length) {
   			firebase.initializeApp(firebaseConfig);
		}else {
			firebase.app(); // if already initialized, use that one
		}

		firebase.auth().onAuthStateChanged((user) => {
			authStore.set({
				isLoggedIn: user !== null,
				user,
				firebaseControlled: true
			});
		});
	});
</script>

<slot />
