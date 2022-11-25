

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
    backgroundColor: '#1DA584',
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
  response.push([ 'Total', 'Confirmed', 'Deaths', 'Recovered']);

  var status = [0];
  var status = parseInt(status);

  var total = [0];
  var total = parseInt(total);


  for (let i = 0; i < data.data.length; i++) {
    response.push(
      [
        total += data.data[i].confirmed + data.data[i].deaths + data.data[i].recovered,
        status = data.data[i].confirmed,
        status = data.data[i].deaths,
        status = data.data[i].recovered,
        total == [total]
       


      ]
    );
  }

  console.log(response);

  return response;
}




//TableChart

google.charts.load('current', { 'packages': ['table'] });
google.charts.setOnLoadCallback(drawTable);

async function drawTable() {
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Sigla');
  data.addColumn('string', 'Estado');
  data.addColumn('string', 'Casos');
  data.addColumn('string', 'Mortes');
  data.addColumn('string', 'Suspeitos');
  data.addColumn('string', 'Descartados');
  data.addRows();

  var table = new google.visualization.Table(document.getElementById('table_div'));

  table.draw(data, { showRowNumber: true, width: '100%', height: '100%' });
}
