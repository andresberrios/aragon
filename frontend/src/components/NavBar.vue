<template>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand :to="{ name: 'home' }">Aragón</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item :to="{ name: 'calendar' }" active-class="active">
          Calendar
        </b-nav-item>
        <b-nav-item :to="{ name: 'procedures' }" active-class="active">
          Procedures
        </b-nav-item>
        <b-nav-item :to="{ name: 'sales.new' }" active-class="active">
          Sales
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {};
</script>
