<template>
  <main id="app" class="app">
    <Table />
  </main>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Table from './components/Table.vue'

export default {
  name: 'app',
  components: {
    Table
  }
}
</script>
