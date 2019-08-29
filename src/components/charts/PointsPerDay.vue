<script>
import { Line } from 'vue-chartjs'
import * as moment from 'moment';

export default {
    extends: Line,
    data() {
        return {
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        }
    },
    props: {
        data: Array
    },
    computed: {
        chartData() {
            return {
                labels: this.getLabels(),
                datasets: [
                    {
                        label: "Earned points",
                        data: this.getData()
                    }
                ]
            }
        }
    },
    methods: {
        getLabels() {
            return this.data.map(x => moment(x.date).format("DD.MM"));
        },
        getData() {
            return this.data.map(function(x) { 
                return x.points;
                });
        }
    },
    mounted () {
        this.renderChart(this.chartData, this.options)
    }
}
</script>

<style scoped>


</style>
