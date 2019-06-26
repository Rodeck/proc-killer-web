<script>
import { Line } from 'vue-chartjs'

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
            return this.data.map(x => x.Date);
        },
        getData() {
            return this.data.map(x => x.Points);
        }
    },
    mounted () {
        this.renderChart(this.chartData, this.options)
    }
}
</script>

<style scoped>


</style>
