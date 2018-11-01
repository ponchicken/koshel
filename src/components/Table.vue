<template>
  <div class="coin-table">
    <div class="coin-table-head">
      <div>Rank</div>
      <div class="mobile">Name</div>
      <div class="mobile">Price</div>
      <div>Market Cap</div>
      <div>Volume (24Hr)</div>
      <div class="tablet">Change (24Hr)</div>
    </div>
    <div class="coin-table-body">
      <div 
        :class="`coin-table-row ${coin.changed}`"
        v-for="coin in data" 
        :key="coin.id"
      >
        <div>{{ coin.rank }}</div>
        <div class="coin-name mobile">
          {{ coin.name }}
          <span>{{ coin.symbol }}</span>
        </div>
        <div class="coin-price mobile">{{ coin.priceUsd | us  }}</div>
        <div>${{ coin.marketCapUsd | shorten }}</div>
        <div>${{ coin.volumeUsd24Hr | shorten }}</div>
        <div 
          class="tablet"
          :style="{ color: calcPercentColor(coin.changePercent24Hr) }"
        >{{ coin.changePercent24Hr | percent }}%</div>
      </div>
    </div>
  </div>
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
        this.data = res.data
        this.$watchCoins({
          onChange: this.changeCoins,
          coins: res.data.map(coin => coin.id)
        })
      })
  },
  methods: {
    calcPercentColor(val) {
      return (val > 0) ? '#46bb46' : '#ed3a3a'
    },
    changeCoins(changes) {
      Object.keys(changes).forEach(coinName => {
        this.data.forEach(dataItem => {
          if (dataItem.id === coinName) {
            if (dataItem.priceUsd < changes[coinName])
              dataItem.changed = 'up'
            else
              dataItem.changed = 'down'
            dataItem.priceUsd = changes[coinName]
          }
        })
      })
    }
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