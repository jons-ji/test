<template>
    <div class="cart">
        <header>
            <router-link tag="span" class="home" to="/about/kcgl">返回</router-link>
            <span class="header-title">购物清单</span>
            <span class="edit" v-show="editSelect" @click="SET_EDIT_SELECT(false)">编辑</span>
            <span class="edit" v-show="!editSelect" @click="SET_EDIT_SELECT(true)">完成</span>
        </header>
        <div class="back">
            <div class="goodslist" v-for="item in cartList" :key="item.id">
                <div class="select">
                    <div class="select-warp" :class="{'select-act':item.select}" @click="hand(item)">
                        <input type="checkbox">
                    </div>
                </div>
                <div class="list-img">
                    <img :src="item.img">
                </div>
                <div class="list-text">
                    <p>{{item.name}}</p>
                    <p>￥{{item.price}}</p>
                    <p>库存{{item.stock}}件</p>
                </div>
                <div class="list-btn">
                    <div class="btn-num" @click="hander(item,'PLUS')">+</div>
                    <div class="btn-num">{{item.mount}}</div>
                    <div class="btn-num" @click="hander(item,'REDUCE')">-</div>
                </div>
            </div>
        </div>
        <div class="floot">
            <div class="select">
                <div class="select-warp" :class="{'select-act':t}">
                    <input type="checkbox" v-model="t">
                </div>
            </div>
            <div>全选</div>
            <div v-show="editSelect">
                合计：
                <span style="color:#9A51FF">￥{{totalPrice}}</span>
            </div>
            <div class="mount" v-show="editSelect">
                结算({{totalMount}})
            </div>
            <div class="mount" v-show="!editSelect" style="background:#ff4069;" @click="SET_DELETE"> 
                删除({{totalMount}})
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions, mapMutations, mapState } from 'vuex'

export default {
    computed:{
        ...mapState(['cartList','totalPrice','totalMount','editSelect']),
        t:{
            get(){
                if(this.cartList.length!=0){
                    const num=this.cartList.every(item=>item.select)
                    return  num
                }
            },
            set(value){
                this.$store.dispatch('setTotalSelect',value)
            }
        }
    },
    methods:{
        ...mapMutations(['SET_EDIT_SELECT','SET_DELETE']),
        ...mapActions(['setCartList','setSelect','setTotal']),
        hander(item,_type){
            if(item.select){
                if(_type=='PLUS'){
                    this.setTotal({
                        select:item.select,
                        mount:1,
                        price:item.price
                    })
                }else if(_type=='REDUCE'){
                    if(item.mount>1){
                        this.setTotal({
                            select:item.select,
                            mount:-1,
                            price:-item.price
                        })
                    }
                }
            }
            this.setCartList({
                id:item.id,
                price:item.price,
                _type
            })
            
        },
        hand(item){
            this.setSelect(item.id)
            this.setTotal({
                select:item.select,
                mount:item.mount,
                price:item.tprice
            })
        }
    },
    created(){
        this.$store.dispatch('setCart')
    }
}
</script>

<style lang='scss' scoped>
.cart{
    width: 999px;
    height: 549px;
    background: rgb(20, 20, 20);
    border-left: 1px solid grey;
}

header{
    width: 100%;
    padding: 0 4%;
    height: 0.44rem;
    line-height: .44rem;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    .header-title{
        text-align: center;
    }
}


.back{
    width: 100%;
    height: 10rem;
    background: #eeeeee;
    .goodslist{
        width: 100%;
        height: .9rem;
        display: flex;
        margin: .1rem 0;
        background: #fff;
        .select{
            width: 12%;
            height: 80%;
            display: flex;
            justify-content: center;
            align-items: center;
            .select-warp{
                width: .15rem;
                height: .15rem;
                border: .02rem solid red;
                border-radius: 50%;
                input{
                    width: .15rem;
                    height: .15rem;
                    opacity: 0;
                }
            }
            .select-act{
                background: #7a45e5;
            }
        }
        .list-img{
            width: 17%;
            height: .9rem;
            margin-right: .1rem;
            padding: .1rem 0;
            box-sizing: border-box;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .list-text{
            flex: 1;
            position: relative;
            p:nth-child(1){
                width: 80%;
                min-height: .4rem;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
            }
            p:nth-child(2){
                color: #7a45e5;
                // margin-top: .3rem;
            }
            p:nth-child(3){
                font-size: 0.12rem;
                color: #888;
            }
        }
        .list-btn{
            padding: 0 .05rem;
            .btn-num{
                width: .24rem;
                height: .24rem;
                text-align: center;
                line-height: .24rem;
            }
        }
    }
}
.floot{
    position: fixed;
    bottom: 0;
    right: 20;
    width: 999px;
    height: .5rem;
    line-height: .5rem;
    display: flex;
    justify-content: space-between;
    margin: .1rem 0;
    background: #fff;
    .select{
        display: in;
        width: 12%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .select-warp{
            width: .15rem;
            height: .15rem;
            border: .02rem solid red;
            border-radius: 50%;
            input{
                width: .15rem;
                height: .15rem;
                opacity: 0;
            }
        }
        .select-act{
            background: #7a45e5;
        }
    }
    .mount{
        width: 1.2rem;
        height: 100%;
        background: #7a45e5;
        text-align: center;
        color: #fff;
    }
}
</style>
