<template>
  <b-container class="py-5">
    <h1>Página No Encontrada</h1>
    <p>
      La página solicitada no existe.
      <br />
      <router-link :to="{ name: 'home' }">
        Volver al inicio.
      </router-link>
    </p>
  </b-container>
</template>

<script>
export default {};
</script>
