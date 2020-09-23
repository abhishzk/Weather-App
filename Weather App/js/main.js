var app = new Vue({
    el: "#app",
    data: {
      chart: null,
      city: "",
      dates: [],
      temps: [],
      loading: false,
      errored: false
    },
    methods: {
      getData: function() {
        this.loading = true;
  
        if (this.chart != null) {
          this.chart.destroy();
        }
  
        axios
          .get("https://api.openweathermap.org/data/2.5/forecast", {
            params: {
              q: this.city,
              units: "metric",
              appid: "35c341580b29e497b5b378a300b16fea"
            }
          })
          .then(response => {
            this.dates = response.data.list.map(list => {
              return list.dt_txt;
            });
  
            this.temps = response.data.list.map(list => {
              return list.main.temp;
            });
  
            var ctx = document.getElementById("myChart");
            this.chart = new Chart(ctx, {
              type: "line",
              data: {
                labels: this.dates,
                datasets: [
                  {
                    label: "Avg. Temp",
                    backgroundColor: "rgb(156,39,176, 0.5)",
                    borderColor: "rgb(156,39,176)",
                    fill: false,
                    data: this.temps
                  }
                ]
              },
              options: {
                title: {
                  display: true,
                  text: "Temperature Chart"
                },
                tooltips: {
                  callbacks: {
                    label: function(tooltipItem, data) {
                      var label =
                        data.datasets[tooltipItem.datasetIndex].label || "";
  
                      if (label) {
                        label += ": ";
                      }
  
                      label += Math.floor(tooltipItem.yLabel);
                      return label + "°C";
                    }
                  }
                },
                scales: {
                  xAxes: [
                    {
                      type: "time",
                      time: {
                        unit: "hour",
                        displayFormats: {
                          hour: "M/DD @ hA"
                        },
                        tooltipFormat: "MMM. DD @ hA"
                      },
                      scaleLabel: {
                        display: true,
                        labelString: "Date/Time"
                      }
                    }
                  ],
                  yAxes: [
                    {
                      scaleLabel: {
                        display: true,
                        labelString: "Temperature (°C)"
                      },
                      ticks: {
                        callback: function(value, index, values) {
                          return value + "°C";
                        }
                      }
                    }
                  ]
                }
              }
            });
          })
          .catch(error => {
            console.log(error);
            this.errored = true;
          })
          .finally(() => (this.loading = false));
      }
    }
  });
  

  