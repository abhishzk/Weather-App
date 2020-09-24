function loadDoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var i;
            var xmlDoc = this.responseXML;
            var table;



            var x = xmlDoc.getElementsByTagName("weatherdata");
            console.log(x[0].getElementsByTagName('name')[0].innerHTML);
            var x1 = x[0].getElementsByTagName('forecast')[0].getElementsByTagName('time').length;
            var list = [];
            var list1 = [];
            for (i = 0; i < x1; i++) {

                var date1 = x[0].getElementsByTagName('forecast')[0].getElementsByTagName('time')[i].getAttribute('from').split('T');
                var temp1 = x[0].getElementsByTagName('forecast')[0].getElementsByTagName('time')[i].getElementsByTagName('temperature')[0].getAttribute('value')

                var mydate = new Date(date1[0]);
                list1.push([date1[0], date1[1], parseFloat(temp1), mydate]);


                list.push(x[0].getElementsByTagName('forecast')[0].getElementsByTagName('time')[i].getElementsByTagName('temperature')[0].getAttribute('value') + '<br>');


                console.log('From : ', x[0].getElementsByTagName('forecast')[0].getElementsByTagName('time')[i].getAttribute('from'), 'To : ', x[0].getElementsByTagName('forecast')[0].getElementsByTagName('time')[i].getAttribute('to'), 'Temp :', x[0].getElementsByTagName('forecast')[0].getElementsByTagName('time')[i].getElementsByTagName('temperature')[0].getAttribute('value'));
            }

            var avg_temp_day = countAvg(list1);
            document.getElementById('city').innerHTML = x[0].getElementsByTagName('name')[0].innerHTML;
            document.getElementById('temp').innerHTML = parseInt(avg_temp_day[avg_temp_day.length - 1][0] - 273.15) + '&degC';
            document.getElementById('pressure').innerHTML = 'Pressure: ' + x[0].getElementsByTagName('pressure')[--i].getAttribute('value') + ' ' + x[0].getElementsByTagName('pressure')[i].getAttribute('unit') + '<br>';
            document.getElementById('humidity').innerHTML = 'Humidity: ' + x[0].getElementsByTagName('humidity')[i].getAttribute('value') + ' ' + x[0].getElementsByTagName('humidity')[i].getAttribute('unit') + '<br>';
            document.getElementById('cloud').innerHTML = 'Cloud: ' + x[0].getElementsByTagName('clouds')[i].getAttribute('value') + ' ' + x[0].getElementsByTagName('clouds')[i].getAttribute('all') + ' ' + x[0].getElementsByTagName('clouds')[i].getAttribute('unit') + '<br>';

            var val = '';
            for (i = 0; i < avg_temp_day.length; i++) {
                var div1 = '<th><div class="card_week">';
                var div2 = '<div class="container">';
                var date11 = '<h1 id="temp1"><b>' + avg_temp_day[i][2] + '&degC</b></h1>';
                var img = '<img id="img_cloud1" src="/images/logo1.png" alt="Avatar">';
                var h1 = '<h1 id="temp1"><b>' + parseInt(avg_temp_day[i][0] - 273.15) + '&degC</b></h1>';
                var span1 = '';
                var div_close = '</div></div></th>';
                val += div1 + div2 + img + h1 + span1 + div_close;
            }
            document.getElementById('thead1').innerHTML = '<td width="30%" id="main_tree1">' + document.getElementById('main_tree1').innerHTML + '</td>' + val;

            console.log(avg_temp_day);
        }
    };
    var city11 = document.getElementById('search2').value;
    xhttp.open("GET", "https://api.openweathermap.org/data/2.5/forecast?q=" + city11 + ",us&appid=35c341580b29e497b5b378a300b16fea&mode=xml", true);
    xhttp.send();

    console.log(xhttp);

}

function countAvg(list1) {

    var j = 0,
        i = 0;
    var count = 0;
    var avg = 0;
    var counter = [];
    for (i = 0; i < list1.length; i++) {

        if (list1[j][0] == list1[i][0]) {
            count++;
            avg += list1[i][2];
        } else {
            counter.push([avg / count, count, list1[j][0]]);
            count = 1;
            avg = list1[i][2];
            j = i;
        }

    }
    counter.push([avg / count, count, list1[j][0]]);
    return counter;
}