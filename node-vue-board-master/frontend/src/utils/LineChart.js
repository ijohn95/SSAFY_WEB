import {Bar, mixins} from 'vue-chartjs';
// mixin은 vue에서 중복적인 부분을 처리할 때 (data part 한정) 사용
const {reactiveProp} = mixins;

export default {
    extends: Bar,
    mixins:[reactiveProp],
    props:['options'],
    mounted(){
        this.renderChart(this.chartData, this.options);
    }
}