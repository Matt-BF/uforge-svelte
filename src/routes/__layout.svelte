<script context="module">
import { firebaseInit } from "../stores/firebase";

export async function load({ page, fetch, session, context }) {
  await firebaseInit();
  return {
    props: {},
  };
}
</script>

<script>
import "../globals.css";
import { onMount } from "svelte";
import firebase from "firebase/app";
import "firebase/auth";
import authStore from "../stores/authStore";

onMount(() => {
  firebase.auth().onAuthStateChanged((user) => {
    authStore.set({
      isLoggedIn: user !== null,
      user,
      firebaseControlled: true,
    });
  });
});
</script>

<slot />
