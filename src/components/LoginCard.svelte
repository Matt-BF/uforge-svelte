<script>
    import firebase from "firebase/app"
    import {fade} from "svelte/transition"
    let email;
    let password;
    let logIn = true;
    let errorMsgPass = false;
    let errorMsgEmail = false;
    let name;

    async function loginWithGoogle(){
        try {
            const provider = new firebase.auth.GoogleAuthProvider();
            await firebase.auth().signInWithPopup(provider);
        } catch (e) {
            console.log(e)
        }
    }

    async function createAccount(){
        try {
            await firebase.auth().createUserWithEmailAndPassword(email, password)
            await firebase.auth().currentUser.updateProfile({displayName:name})
        } catch (e) {
            console.log(e)
        }
    }
    async function loginWithEmail(){
        try {
            await firebase.auth().signInWithEmailAndPassword(email,password);
        } catch (e) {
            if(e.code==="auth/wrong-password"){
                errorMsgPass=true
                setTimeout(()=>{errorMsgPass=false},3000)
            } else if(e.code==="auth/user-not-found"){
                errorMsgEmail=true
                setTimeout(()=>{errorMsgEmail=false},3000)
            } else{
                console.log(e)
            }
            
        }
    }
</script>
<div class="login-card">
    {#if logIn}
        <h2> Faça seu login!</h2>
        {#if errorMsgPass}
        <p class="errorMsg text-danger" out:fade>Senha incorreta</p>
        {:else if errorMsgEmail}
        <p class="errorMsg text-danger" out:fade>Usuário sem cadastro</p>
        {/if}
            <form class="login-info" on:submit|preventDefault={loginWithEmail}>
                <input class="form-control" type="email" placeholder="Seu email" bind:value={email} in:fade>
                <input class="form-control" type="password" placeholder="Sua senha"  bind:value={password} in:fade>
                <button id="log_in" class="btn btn-primary" type="submit"  in:fade>Entrar</button>
            </form>
            <button class="btn btn-primary" on:click={loginWithGoogle} in:fade><i class="fab fa-google"></i>Logar com Google</button>
            <button class="btn btn-outline-primary" on:click={()=>logIn=false}> Não tem uma conta? Crie já!</button>
            
        
    {:else}
        <h2 in:fade> Faça sua conta!</h2>
            <form class="login-info" on:submit|preventDefault={createAccount}>
                <input class="form-control" type="text" placeholder="Seu Nome" bind:value={name} in:fade>
                <input class="form-control" type="email" placeholder="Seu email" bind:value={email} in:fade>
                <input class="form-control" type="password" placeholder="Sua senha" bind:value={password} in:fade>
                <button type="submit" class="btn btn-primary" in:fade>Criar conta</button>
            </form>

            <button class="btn btn-outline-primary" on:click={()=>logIn=true} in:fade>Já tem uma conta? Faça seu Log In!</button>
    {/if}
</div>

<style>
    .login-card {
        padding: 0 8rem;
        border: solid 2px var(--secondary-color);
        display:flex;
        flex-direction: column;
        border-radius: 5%;
        min-width: 30%;
        min-height: 40%;
        
    }

    .login-info {
        display: flex;
        flex-direction: column;
        margin-top: 3rem;
        align-items: center;
    }
    h2 {
        align-self: center;
    }

    .form-control {
    margin-bottom: 5px;
    }

    .btn {
        margin-bottom: 15px;
    }

    i {
        margin-right: 15px;
    }

    .btn-outline-primary{
        margin-top: 40px;
    }

    .errorMsg {
        text-align: center;
    }
</style>