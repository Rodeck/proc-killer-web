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
            var data =  [
                
                    {
                        label: "Completed",
                        data: this.getCompletedTodos(),
                        backgroundColor: '#48ab6c'
                    },
                    {
                        label: "Not completed",
                        data: this.getNotCompletedTodos(),
                        backgroundColor: '#eb4034'
                    },
                    {
                        label: "All todos",
                        data: this.getAllTodos(),
                        backgroundColor: '#3e36d1'
                    },
                ];
            return {
                labels: this.getLabels(),
                datasets: data
            }
        }
    },
    methods: {
        getLabels() {
            return this.data.map(x => moment(x.date).format("DD.MM"));
        },
        getAllTodos() {
            return this.data.map(function(x) { 
                return x.all;
                });
        },
        getCompletedTodos() {
            return this.data.map(function(x) { 
                return x.completed;
                });
        },
        getNotCompletedTodos() {
            return this.data.map(function(x) { 
                return x.notCompleted;
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
