import { Template } from 'meteor/templating';
import Chart from 'chart.js'
import './main.html';

var moodDataDic = {Happy:0, Sad:0, Confused:0, Uncertain:0};
var moodCountChart;


Template.emojiMood.events({
  'click a'(event, instance) {
    // increment the counter when button is clicked
    console.log(instance.data.currentMood);
    moodDataDic[instance.data.currentMood]++;
    var moodsDataValues = [moodDataDic['Happy'], moodDataDic['Sad'], moodDataDic['Confused'], moodDataDic['Uncertain']];
    updateChartData(moodsDataValues);
  },
});

Template.body.helpers({
  emojiMoods:[
      {currentMood:'Happy',emo:'😀'},
      {currentMood:'Sad',emo:'😥'},
      {currentMood:'Confused',emo:'😕'},
      {currentMood:'Uncertain',emo:'😵'}
    ]
});
/*
Template.moodChart.onCreated({
  moodsData = [Happy:0, Sad:0, Confused:0, Uncertain:0];
})
*/
Template.moodChart.onRendered(function (moodsData){
  let myChart = document.getElementById('myChart').getContext('2d');
  var moodsDataValues = [0, 0, 0, 0];

  // Global Options
  Chart.defaults.global.defaultFontFamily = 'Lato';
  Chart.defaults.global.defaultFontSize = 11;
  Chart.defaults.global.defaultFontColor = '#777';

  moodCountChart = new Chart(myChart, {
    type:'bar', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
    data:{
      labels:['Happy', 'Sad', 'Confused', 'Uncertain'],
      datasets:[{
        data:moodsDataValues,
        //backgroundColor:'green',
        backgroundColor:[
          'rgba(255, 206, 40, 0.6)',
          'rgba(255, 30, 30, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)'
        ],
        borderWidth:1,
        borderColor:'#777',
        hoverBorderWidth:3,
        hoverBorderColor:'#000'
      }]
    },
    options:{
      legend: {
      display: false
    },
      tooltips: {
        enabled:true
      },
        scales: {
      yAxes: [{
          ticks: {
              beginAtZero: true
          }
      }],
      xAxes: [{
        barPercentage: 0.9
    }]
      },

    }
  });
});

function updateChartData(data) {
     moodCountChart.data.datasets[0].data = data;
     moodCountChart.update();
};
