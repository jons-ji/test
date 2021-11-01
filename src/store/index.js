import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    goodsData:[],
    type:0,
    status:'all',
    cartList:[],
    totalPrice:0,
    totalMount:0,
    editSelect:true
  },
  mutations: {
		SET_GOODS_DATA(state,data){
      state.goodsData=data
    },
    SET_CART(state,data){
      const {totalPrice,totalMount,cartList}=data
      state.cartList=cartList
      state.totalPrice=totalPrice
      state.totalMount=totalMount
      console.log(state.cartList)
    },
    SET_TYPE(state,type){
      state.type=type
    },
    SET_STATUS(state,status){
      state.status=status
    },
    SET_CART_LISt(state,data){
          const {id,img,name,stock,price,_type}=data
          const index=state.cartList.findIndex(item=>item.id==id)
          if(index==-1){
            state.cartList.push({
              id,img,name,stock,price,_type,
              mount:1,
              tprice:price,
              select:false
            })
          }else{
            const item=state.cartList[index]
            if(_type=="PLUS"){
              item.mount+=1
              item.tprice+=price
            }else if(_type=='REDUCE'){
              if(item.mount>1){
                item.mount-=1
                item.tprice-=price
              }else{
                alert('不能再减少了')
              }
            }
          }
          localStorage.setItem('cartList',JSON.stringify(state.cartList))
    },
    SET_CART_SELECT(state,id){
      const index=state.cartList.findIndex(item=>item.id==id)
      state.cartList[index].select=!state.cartList[index].select
      localStorage.setItem('cartList',JSON.stringify(state.cartList))
    },
    SET_TOTAL(state,data){
      const {select,price,mount}=data
      if(select){
        state.totalMount+=mount
        state.totalPrice+=price
      }else{
        state.totalMount-=mount
        state.totalPrice-=price
      }
      localStorage.setItem('totalMount',JSON.stringify(state.totalMount))
      localStorage.setItem('totalPrice',JSON.stringify(state.totalPrice))
    },
    SET_TOTAL_SELECT(state,boo){
      if(boo){
        state.totalMount=0
        state.totalPrice=0
        state.cartList.map(item=>{
          item.select=true
          state.totalMount+=item.mount
          state.totalPrice+=item.tprice
        })
      }else{
        state.cartList.map(item=>{
					item.select=false
					state.totalMount=0
					state.totalPrice=0
				})
      }
      localStorage.setItem('totalMount',JSON.stringify(state.totalMount))
      localStorage.setItem('cartList',JSON.stringify(state.cartList))
      localStorage.setItem('totalPrice',JSON.stringify(state.totalPrice))
    },
    SET_EDIT_SELECT(state,boo){
      state.editSelect=boo
    },
    SET_DELETE(state){
      state.cartList=state.cartList.filter(item=>!item.select)
      state.totalMount=0
      state.totalPrice=0
      localStorage.setItem('totalMount',JSON.stringify(state.totalMount))
      localStorage.setItem('cartList',JSON.stringify(state.cartList))
      localStorage.setItem('totalPrice',JSON.stringify(state.totalPrice))
    }
  },
  actions: {
    setGoodsData({commit}){
      const goodsData=JSON.parse(localStorage.getItem('goodsData'))||[]
      commit('SET_GOODS_DATA',goodsData)
    },
    setCart({commit}){
      const cartList=JSON.parse(localStorage.getItem('cartList'))||[]
      const totalPrice=JSON.parse(localStorage.getItem('totalPrice'))||0
      const totalMount=JSON.parse(localStorage.getItem('totalMount'))||0
      commit('SET_CART',{
        totalPrice,
        cartList,
        totalMount
      })
    },
    setType({commit},type){
      commit('SET_TYPE',type)
    },
    setStatus({commit},status){
      commit('SET_STATUS',status)
    },
    setCartList({commit},data){
      commit('SET_CART_LISt',data)
    },
    setTotal({commit},data){
      commit('SET_TOTAL',data)
    },
    setSelect({commit},id){
      commit('SET_CART_SELECT',id)
    },
    setTotalSelect({commit},boo){
      commit('SET_TOTAL_SELECT',boo)
    }
  },
  modules: {
  }
})
