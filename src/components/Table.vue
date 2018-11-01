<template>
  <table class="coin-table">
    <thead>
      <tr>
        <th>Rank</th>
        <th class="mobile">Name</th>
        <th class="mobile">Price</th>
        <th>Market Cap</th>
        <th>Volume (24Hr)</th>
        <th class="tablet">Change (24Hr)</th>
      </tr>
    </thead>
    <tbody>
      <tr 
        class="coin"
        v-for="coin in data" 
        :key="coin.id"
      >
        <td>{{ coin.rank }}</td>
        <td class="coin-name mobile">
          {{ coin.name }}
          <span>{{ coin.symbol }}</span>
        </td>
        <td class="coin-price mobile">{{ coin.priceUsd | us  }}</td>
        <td>${{ coin.marketCapUsd | shorten }}</td>
        <td>${{ coin.volumeUsd24Hr | shorten }}</td>
        <td class="tablet">{{ coin.changePercent24Hr | percent }}%</td>
      </tr>
    </tbody>
  </table>
</template>


<script>

export default {
  data() {
    return {
      data: []
    }
  },
  mounted() {
    fetch('https://api.coincap.io/v2/assets?limit=15')
      .then(res => res.json())
      .then(res => {
        console.log(res)
        this.data = res.data
      })
  },
  filters: {
    int(val) {
      return parseInt(val)
    },
    us(val) {
      let minimumFractionDigits = 0
      if (val < 1)
        minimumFractionDigits = 8
      return new Intl.NumberFormat('en-EN', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits
      }).format(val)
    },
    percent(val) {
      return parseFloat(val).toFixed(2)
    },
    shorten(val) {
      let num = parseFloat(val)
      if (num < 1000) return parseInt(num)
      if (num < 1000000) return `${parseFloat(num/1000).toFixed(2)}t`
      if (num < 1000000000) return `${parseFloat(num/1000000).toFixed(2)}m`
      return `${parseFloat(num/1000000000).toFixed(2)}b`
    }
  }
}

</script>