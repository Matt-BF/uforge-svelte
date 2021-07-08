<script>
import firebase from "firebase/app";
import { fade } from "svelte/transition";
import authStore from "../stores/authStore";

let email;
let password;
let logIn = true;
let errorMsg = false;
let name;
let message;

async function loginWithGoogle() {
  try {
    const provider = new firebase.auth.GoogleAuthProvider();
    await firebase.auth().signInWithPopup(provider);
  } catch (e) {
    console.log(e);
  }
}

async function createAccount() {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    await firebase.auth().currentUser.updateProfile({ displayName: name });
  } catch (e) {
    errorMsg = true;
    message = e.message;
    setTimeout(() => {
      errorMsg = false;
    }, 3000);
  }
}
async function loginWithEmail() {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
  } catch (e) {
    errorMsg = true;
    message = e.message;
    setTimeout(() => {
      errorMsg = false;
    }, 3000);
  }
}
</script>

<div
  class="md:min-h-2/4 md:min-w-1/3 border-2 rounded-xl border-green-900 flex flex-col items-center">
  {#if errorMsg}
    <p class="text-red-600" out:fade>{message}</p>
  {/if}
  {#if logIn}
    <p class="text-2xl text-gray-800 mb-10">Faça seu login!</p>
    <form class="flex flex-col" on:submit|preventDefault="{loginWithEmail}">
      <input
        class="inputLogin"
        type="email"
        placeholder="Seu email"
        bind:value="{email}"
        in:fade />
      <input
        class="inputLogin"
        type="password"
        placeholder="Sua senha"
        bind:value="{password}"
        in:fade />
      <button
        class="bg-green-600 text-white rounded-xl hover:bg-green-700 mb-5"
        type="submit"
        in:fade>Entrar</button>
    </form>
    <button
      class="px-7 bg-green-600 text-white rounded-xl hover:bg-green-700 mb-5"
      on:click="{loginWithGoogle}"
      in:fade><i class="fab fa-google"></i> Logar com Google</button>
    <p class="text-center">
      Nao tem cadastro?
      <span
        on:click="{() => (logIn = false)}"
        class="cursor-pointer text-green-800">
        {" "}
        Crie o seu agora!
      </span>
    </p>
  {:else}
    <p class="text-2xl text-gray-800 mb-10" in:fade>Faça sua conta!</p>
    <form class="flex flex-col" on:submit|preventDefault="{createAccount}">
      <input
        class="inputLogin"
        type="text"
        placeholder="Seu Nome"
        bind:value="{name}"
        in:fade />
      <input
        class="inputLogin"
        type="email"
        placeholder="Seu email"
        bind:value="{email}"
        in:fade />
      <input
        class="inputLogin"
        type="password"
        placeholder="Sua senha"
        bind:value="{password}"
        in:fade />
      <button
        type="submit"
        class="bg-green-600 text-white rounded-xl hover:bg-green-700 mb-5"
        in:fade>Criar conta</button>
    </form>

    <p class="text-center">
      Já tem uma conta?
      <span
        on:click="{() => (logIn = true)}"
        class="cursor-pointer text-green-800">
        {" "}
        Faça seu LogIn!
      </span>
    </p>
  {/if}
</div>
