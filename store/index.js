import Vuex from 'vuex'

// create store
const createStore = () => {
  return new Vuex.Store({
    state: {
      fishes: [],
      provinsi: [],
      kota: [],
      sizes: [],
      loading: true
    },

    getters: {
      allFishes: state => state.fishes,
      allProvinces: state => state.provinsi,
      allCitys: state => state.kota,
      allSizes: state => state.sizes,
      stateLoading: state => state.loading
    },

    actions: {
      async fetchFishes ({ dispatch }) {
        const response = await this.$axios.get('list')
        const { data } = response
        const listFish = data.filter(fish => fish.uuid)

        dispatch('fixingFishData', listFish)
      },

      async fetchArea ({ commit }) {
        const response = await this.$axios.get('option_area')

        const { data } = response
        const kotaObj = {}
        const provinsiObj = {}
        const kotaArr = []
        const provinsiArr = []

        data.map((area) => {
          if (area.city) {
            kotaObj[area.city] = true
          }

          if (area.province) {
            provinsiObj[area.province] = true
          }
        })

        for (const key in kotaObj) {
          kotaArr.push(key)
        }

        for (const key in provinsiObj) {
          provinsiArr.push(key)
        }

        commit('setCitys', kotaArr)
        commit('setProvices', provinsiArr)
      },

      async fetchSizes ({ commit }) {
        const response = await this.$axios.get('option_size')

        const { data } = response
        const listSize = data.map(size => size.size)

        commit('setSizes', listSize)
      },

      async filterFish ({ commit, dispatch }, filter) {
        commit('setLoading', true)
        const fixFilter = {}

        for (const key in filter) {
          if (filter[key]) {
            fixFilter[key] = filter[key]
          }
        }

        const queryParams = JSON.stringify(fixFilter)
        const response = await this.$axios.get('list?search=' + queryParams)

        const { data } = response
        const listFish = data.filter(fish => fish.uuid)

        dispatch('fixingFishData', listFish)
      },

      fixingFishData ({ commit }, fishes) {
        const fixFish = []
        for (let i = 0; i < fishes.length; i++) {
          const fish = fishes[i]
          fixFish.push({
            komoditas: fish.komoditas,
            price: fish.price ? parseInt(fish.price.split('.').join('')) : 0,
            area_kota: fish.area_kota,
            area_provinsi: fish.area_provinsi,
            size: parseInt(fish.size)
          })
        }

        commit('setFishes', [...fixFish])
        commit('setLoading', false)
      },

      sortingFish ({ commit, getters }, type) {
        let typeData = ''
        let typeSorting = ''

        const fishes = [...getters.allFishes]
        let sortedFish = []

        if (type === 'Harga Tertinggi') {
          typeData = 'price'
          typeSorting = 'desc'
        } else if (type === 'Harga Terendah') {
          typeData = 'price'
          typeSorting = 'asc'
        } else if (type === 'Ukuran Terbesar') {
          typeData = 'size'
          typeSorting = 'desc'
        } else if (type === 'Ukuran Terkecil') {
          typeData = 'size'
          typeSorting = 'asc'
        } else {
          sortedFish = [...fishes]
        }

        if (typeSorting === 'asc') {
          sortedFish = [...fishes.sort((a, b) => (a[typeData] > b[typeData]) ? 1 : ((b[typeData] > a[typeData]) ? -1 : 0))]
        } else if (typeSorting === 'desc') {
          sortedFish = [...fishes.sort((a, b) => (a[typeData] < b[typeData]) ? 1 : ((b[typeData] < a[typeData]) ? -1 : 0))]
        }

        commit('setFishes', sortedFish)
      }
    },

    mutations: {
      setFishes: (state, fishes) => (state.fishes = [...fishes]),
      setCitys: (state, city) => (state.kota = [...city]),
      setProvices: (state, provice) => (state.provinsi = [...provice]),
      setSizes: (state, sizes) => (state.sizes = [...sizes]),
      setLoading: (state, load) => (state.loading = load)
    }
  })
}

export default createStore
