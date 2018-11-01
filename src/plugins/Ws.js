export default {
  install: Vue => {
    Vue.prototype.$watchCoins = ({ onChange, coins }) =>{
      let coinsNames = coins.join(',')
      let pricesWs = returnWs(coinsNames)

      pricesWs.onmessage = msg => {
        onChange(JSON.parse(msg.data))
      }
    }
  }
}

function returnWs(coinsNames) {
  return new WebSocket(`wss://ws.coincap.io/prices?assets=${coinsNames}`)
}