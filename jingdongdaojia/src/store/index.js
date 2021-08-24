import Vuex from 'vuex'
// 存
const setLocalCartList = (state) => {
  const {cartList} = state
  const cartListString = JSON.stringify(cartList)
  localStorage.cartList = cartListString
}
// 取
const getLocaCartList = () => {
  // { shopId: {shopName:'', productList:{ productId: {} }}}
  try {
    return JSON.parse(localStorage.cartList)
  } catch (e) {
    return {}
  }
}
export default Vuex.createStore({
  state: {
    // cartList: {
    //   shopId: {
    //     shopName: '沃尔玛',
    //     productList: {
    //       productId: {
    //         _id: '1',
    //         name: '番茄250g/份',
    //         imgUrl: 'http://www.dell-lee.com/imgs/vue3/tomato.png',
    //         sales: 10,
    //         price: 33.6,
    //         oldPrice: 39.6,
    //         count: 2
    //       }
    //     }
    //   }
    // }
    // { shopId: {shopName:'', productList:{ productId: {} }}}
    cartList: getLocaCartList()
  },
  mutations: {

    changeCartItemInfo(state, payload) {
      // 获取商铺id 产品id 产品信息
      const {shopId, productId, productInfo} = payload
      // 获取state中 购物车信息 注意不要用解构
      const shopInfo = state.cartList[shopId] || {
        shopName: '', productList: {}
      }
      //  之前没存过商铺 就让商铺信息为空
      // if (!shopInfo) { shopInfo = {} }
      //  获取商铺中的产品
      let product = shopInfo.productList[productId]
      // 不存在产品就 让传进来的商品信息填充并将数量改为0
      if (!product) {
        productInfo.count = 0
        product = productInfo
      }
      // 商品存不存在 加payload.num
      product.count = product.count + payload.num
      // 添加进购物车时 默认勾选为true
      if (payload.num > 0) {
        product.check = true
      }
      if (product.count < 0) {
        product.count = 0
      }
      // shopinfo 赋值
      shopInfo.productList[productId] = product
      state.cartList[shopId] = shopInfo
      setLocalCartList(state)
    },
    // 修改商店名称
    changeShopName(state, payload) {
      const {shopId, shopName} = payload
      const shopInfo = state.cartList[shopId] || {
        shopName: '', productList: {}
      }
      shopInfo.shopName = shopName
      state.cartList[shopId] = shopInfo
      setLocalCartList(state)
    },
    // 勾选
    changeCartItemChecked(state, payload) {
      const {shopId, productId} = payload
      const product = state.cartList[shopId].productList[productId]
      product.check = !product.check
      setLocalCartList(state)
    },
    // 清空购物车
    cleanCartProducts(state, payload) {
      const {shopId} = payload
      state.cartList[shopId].productList = {}
      setLocalCartList(state)
    },
    // 全选
    setCartItemsChecked(state, payload) {
      const {shopId} = payload
      const products = state.cartList[shopId].productList
      if (products) {
        for (const key in products) {
          const product = products[key]
          product.check = true
        }
      }
      setLocalCartList(state)
    },
    clearCartData(state, shopId) {
      state.cartList[shopId].productList = {}
    }
  }
})
