<!-- <template>
    <div class="kcgl">
        <header>
            <router-link class="cart" tag="span" to="/cart">购物车</router-link>
            <span class="header-title">商品列表</span>
        </header>
        <div class="tab">
            <ul>
                <li class="cate" v-for="item in tab" :class="{'act':type==item.type}" :key="item.id" @click="setType(item.type)">{{item.name}}</li>
            </ul>
        </div>
        <div class="filter-bar">
            <div class="filter-text" :class="{'filter-act':status=='all'}" @click="setStatus('all')">综合排序</div>
            <div class="filter-text" :class="{'filter-act':status=='sales'}" @click="setStatus('sales')">销量优先</div>
            <div class="filter-text" :class="{'filter-act':status=='priceMax'||status=='priceMin'}" @click="hand">价格</div>
        </div>
        <div class="back">
            <div class="goodslist" v-for="item in show" :key="item.id">
                <div class="list-img">
                    <img :src="item.img">
                </div>
                <div class="list-text">
                    <p>{{item.name}}</p>
                    <p>￥{{item.price}}</p>
                    <p>{{item.sales}}人付款</p>
                    <button class="btn" @click="add(item,'PLUS')">+</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {mapActions, mapState} from 'vuex'
const tab=[
    {
        id:0,
        name:'推荐',
        type:0
    },
    {
        id:1,
        name:'母婴',
        type:1
    },
    {
        id:2,
        name:'鞋包饰品',
        type:2
    },
    {
        id:3,
        name:'食品',
        type:3
    },
    {
        id:4,
        name:'数码家电',
        type:4
    },
    {
        id:5,
        name:'居家百货',
        type:5
    }
]
var boo=true
export default {
    data(){
        return {
            tab,
        }
    },
    computed:{
        ...mapState(['goodsData','type','status']),
        show(){
            var data=null
            if(this.type==0){
                data=this.goodsData.map(item=>item)
            }else{
                data=this.goodsData.filter(item=>item.type==this.type)
            }
            switch(this.status){
                case 'all':
                    return data
                case 'sales':
                    return data.sort((a,b)=>b.sales-a.sales)
                case 'priceMax':
                    return data.sort((a,b)=>a.price-b.price)
                case 'priceMin':
                    return data.sort((a,b)=>b.price-a.price)
            }
        }
    },
    methods:{
        ...mapActions(['setType','setStatus','setCartList']),
        hand(){
            if(boo){
                this.setStatus('priceMax')
                boo=false
            }else{
                this.setStatus('priceMin')
                boo=true
            }
        },
        add(item,_type){
            this.setCartList({
                id:item.id,
                name:item.name,
                price:item.price,
                stock:item.stock,
                img:item.img,
                _type
            })
        }
    },
    created(){
        this.$store.dispatch('setGoodsData')
    }
}
</script>

<style lang='scss' scoped>
.kcgl{
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
    .header-title{
        flex: 1;
        text-align: center;
    }
}

.tab{
    width: 100%;
    height: .6rem;
    background-color: #5D4285;
    overflow: hidden;
    ul{
        max-width: 4.8rem;
        margin: 0 auto;
        white-space: nowrap;
        overflow-x: scroll;
        li{
            display: inline-block;
            width: .8rem;
            height: .7rem;
            line-height: .6rem;
            text-align: center;
            color: #fff;
        }
        .act{
           background-color: #9A51FF;
        }
    }
}

.filter-bar{
    width: 100%;
    display: flex;
    height: .4rem;
    line-height: .4rem;
    justify-content: space-around;
    .filter-text{
        width: 33.3rem;
        text-align: center;
    }
    .filter-act{
        color: #7B57C5;
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
            .btn{
                position: absolute;
                right: 0.1rem;
                bottom: 0.02rem;
                width: 0.32rem;
                height: 0.22rem;
                background-color: #7a45e5;
                font-size: 0.16rem;
                line-height: 0.19rem;
                text-align: center;
                color: #fff;
                border-radius: 0.12rem;
                overflow: hidden;
                border: 0;
            }
        }
    }
}

</style> -->
