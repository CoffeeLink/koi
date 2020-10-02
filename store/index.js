import Vuex from 'vuex'

// create store
const createStore = () => {
  return new Vuex.Store({
    state: {
      fishes: [],
      provinsi: [],
      kota: [],
      kotaObj: {},
      sizes: [],
      loading: true
    },

    getters: {
      allFishes: state => state.fishes,
      allProvinces: state => state.provinsi,
      allCitys: state => state.kota,
      allProvWithCity: state => state.kotaObj,
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
        const kotaByProv = {}
        const provinsiObj = {}
        const kotaArr = []
        const provinsiArr = []

        data.map((area) => {
          if (area.province) {
            if (!(area.province in kotaByProv)) {
              kotaByProv[area.province] = []
            }
            provinsiObj[area.province] = true
          }

          if (area.city) {
            kotaByProv[area.province].push(area.city)
            kotaObj[area.city] = true
          }
        })

        for (const key in kotaObj) {
          kotaArr.push(key)
        }

        for (const key in provinsiObj) {
          provinsiArr.push(key)
        }

        commit('setObjCitys', { ...kotaByProv })
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
      },

      async postNewFish ({ commit }, data) {
        try {
          const posted = []
          posted.push(data)
          await this.$axios.post('list', posted)
          const newData = { ...data }
          newData.price = newData.price ? parseInt(newData.price.split('.').join('')) : 0
          newData.area_kota = newData.area_kota ? newData.area_kota : null
          newData.size = parseInt(newData.size)
          commit('addNewFishes', newData)

          return 'Sukses menambahkan data'
        } catch {
          throw new Error('Gagal menambahkan data, check koneksimu')
        }
      }
    },

    mutations: {
      setFishes: (state, fishes) => (state.fishes = [...fishes]),
      setCitys: (state, city) => (state.kota = [...city]),
      setObjCitys: (state, city) => (state.kotaObj = { ...city }),
      setProvices: (state, provice) => (state.provinsi = [...provice]),
      setSizes: (state, sizes) => (state.sizes = [...sizes]),
      setLoading: (state, load) => (state.loading = load),
      addNewFishes: (state, fish) => (state.fishes.push(fish))
    }
  })
}

export default createStore
