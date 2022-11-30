

/* MENU */
window.addEventListener("scroll", function () {
  var btp = this.document.querySelector('.back-to-top');
  var header = this.document.querySelector("header");
  header.classList.toggle("sticky", this.window.scrollY > 0)
  header.style.height = "2%";
  header.style.backgroundColor = "#1DA584";

  btp.classList.toggle("sticky", this.window.scrollY <= 299)
  btp.style.opacity = "0";



  if (this.scrollY > 300) {
    btp.style.opacity = "1";
  }


  if (this.scrollY < 100) {
    header.style.height = "5%";
    header.style.backgroundColor = "rgba(255, 255, 255, 0)";
    header.style.opacity = "1";



    if (this.screen < 740) {
      if (this.scrollY < 1) {
        header.style.height = "5%";
        header.style.backgroundColor = "rgba(255, 255, 255, 0)";
        header.style.opacity = "1";


      }
    }
  }
})
window.addEventListener("scroll", function () {
  var banner = this.document.querySelector(".banner");
  banner.classList.toggle("sticky", this.window.scrollY > 0)
  banner.style.opacity = "1";

  if (this.scrollY < 50) {
    banner.style.opacity = "0.5";
  }

  if (this.scrollY > 600)
    banner.style.opacity = "0.5"
})





window.sr = ScrollReveal({ reset: true });



sr.reveal('.main-social-iframe', {
  rotation: { x: 0, y: 80, z: 0 },
  duration: 4000
})

sr.reveal('.main-combat-iframe', {
  rotation: { x: 0, y: 80, z: 0 },
  duration: 4000
})


sr.reveal('.area-grafico', {
  rotation: { x: 0, y: 80, z: 0 },
  duration: 2000
})


/*Button footer*/

var btn = document.querySelector('.footer-on');
var footer = document.querySelector('.footer');
var showless = document.querySelector('.footer-off');

function ButtonPower() {
  if (footer.style.display === 'block') {
    footer.style.display = 'none';
    btn.style.display = 'block';
    showless.style.display = 'none';
  } else {
    footer.style.display = 'block';
    showless.style.display = 'block';
    btn.style.display = 'none';
    window.scrollTo(5000, 5000);
  }
};

function ButtonOff() {
  if (footer.style.display === 'block') {
    footer.style.display = 'none';
    btn.style.display = 'block';
    showless.style.display = 'none';

  } else {
    footer.style.display = 'block';
    showless.style.display = 'block';
    btn.style.display = 'none';
  }
};


/*API*/
//"https://covid19-brazil-api.now.sh/api/report/v1/countries "
//"https://covid19-brazil-api.vercel.app/api/report/v1"

//-------------------------------------------------------------------------------------------------------

//geochart
google.charts.load('current', {
  'packages': ['geochart'],
});
google.charts.setOnLoadCallback(drawRegionsMap);

async function drawRegionsMap() {
  var json = await obter_inf();
  var data = google.visualization.arrayToDataTable(json);

  var options = {
    backgroundColor: '#1f1f1f',
    dataMode: 'regions',
    colorAxis: { colors: ['#07f9a2', '#09c184', '#0a8967', '#0c5149', '#0c5149'] }
  };

  var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

  chart.draw(data, options);
}


async function obter_inf() {
  var inf = await fetch('https://covid19-brazil-api.now.sh/api/report/v1/countries');
  var data = await inf.json();

  console.log(data);

  var response = [];
  response.push(['Country', 'Confirmed', 'Deaths']);

  for (let i = 0; i < data.data.length; i++) {
    response.push(
      [
        data.data[i].country,
        data.data[i].confirmed,
        data.data[i].deaths
      ]
    );
  }

  console.log(response);

  return response;
}

//-----------------------------------------------------------------------------------------------------


//PieChart
google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(drawChart);

async function drawChart() {
  var json = await pie();
  var data = google.visualization.arrayToDataTable(json);

  var options = {
    backgroundColor: 'transparent',
    FontColor: 'white',
    legend: 'bottom',
    legendColor: 'white',
    legendTextStyle: {
      color: 'white',
    },
    colors: [ '#0c5149', '#07f9a2'],
    is3D: true,

  };

  var chart = new google.visualization.PieChart(document.getElementById('piechart'));

  chart.draw(data, options);
}

async function pie() {
  var inf = await fetch('https://covid19-brazil-api.now.sh/api/report/v1/countries');
  var data = await inf.json();

  console.log(data);

  var response = [];



  var deaths = 0;
  var confirmed = 0;
  var recovered = 0;


  for (let i = 0; i < data.data.length; i++) {
    deaths += data.data[i].deaths,
      confirmed += data.data[i].confirmed,
      recovered += data.data[i].recovered
  }

  response =
    [
      ['Status', 'Total'],
      ['Deaths', deaths],
      ['Confirmed', confirmed],
      ['Recovered', recovered]
    ];

  console.log(response);

  return response;
}


//-----------------------------------------------------------------------------------------------------
//Table Chart
async function carregarDados() {


  await fetch('https://covid19-brazil-api.now.sh/api/report/v1')
    .then(response => response.json())                   
      .then(data => prepararDados(data))

}


function prepararDados(data) {
  if (data != null) {
  
    let lines = document.getElementById('lines');
    lines.innerHTML = '';

  
    for (let i = 0; i < data['data'].length; i++) {
      let auxLine = '';

      if (i % 2 != 0)
        auxLine = '<tr class="listra">';
      else
        auxLine = '<tr>';

      auxLine = auxLine + 
        '<td>' + data['data'][i].uf + '</td>' +
        '<td>' + data['data'][i].state + '</td>' +
        '<td>' + data['data'][i].cases + '</td>' +
        '<td>' + data['data'][i].deaths + '</td>' +
        '<td>' + data['data'][i].suspects + '</td>' +
        '<td>' + data['data'][i].refuses + '</td>' +
        '</tr>',

        lines.innerHTML = lines.innerHTML + auxLine;
    }
  }
}


document.addEventListener("DOMContentLoaded",
  function (event) {
    carregarDados();
  }
)
