

btc_bid = [];
btc_ask = [];
btc_last = [];
// btc_recent = [];

var bitcoinRef = new Firebase("https://publicdata-cryptocurrency.firebaseio.com/bitcoin");

bitcoinRef.child("ask").on("value", showAskPrice);
bitcoinRef.child("last").on("value", showLastPrice); 
bitcoinRef.child("bid").on("value", showBidPrice);

function addBitCoin_dataPoint() { 
    var x = (new Date()).getTime(); // current time
    var o = btc_bid[btc_bid.length-1];
    var y = parseFloat(o.value);   
    bid_series.addPoint([x, y], false, true);
		
		var o1 = btc_ask[btc_ask.length-1];
    var y1 = parseFloat(o1.value);
    ask_series.addPoint([x, y1], false, true); 

		var o2 = btc_last[btc_last.length-1];
    var y2 = parseFloat(o2.value);
    last_series.addPoint([x, y2], true, true);
} 

var bid_series = null;
var ask_series = null;
var last_series = null; 

$(function () {
	    Highcharts.setOptions({
	        global : { useUTC : false }
	    });

	    // Create the chart
	    $('#btc_chart').highcharts('StockChart', {
	        chart : {
	            events : {
	                load : function () {
	                    // set up the updating of the chart each second
	                    bid_series = this.series[0];
	                    ask_series = this.series[1];
	                    last_series = this.series[2];
	                    setInterval(addBitCoin_dataPoint , 2000);
	                }
	            }
	        } ,
	        rangeSelector: {
	            buttons: [{
	                count: 1,
	                type: 'minute',
	                text: '1M'
	            }, {
	                count: 5,
	                type: 'minute',
	                text: '5M'
	            }, {
	                type: 'all',
	                text: 'All'
	            }],
	            inputEnabled: false,
	            selected: 0
	        },
	        title : {
	            text : 'Bitcoin Live Data'
	        },
	        exporting: {
	            enabled: false
	        },
	        series : [{
	            name : 'Bid Price',
	            data : [586.12,586.12,586.12,586.12,586.12,586.12, 547]//( generateData() )
        	}
        	,
        	{
	            name : 'Ask Price',
	            data : [581.12,586.12,586.12,586.12,586.12,586.12, 563]//( generateData() )
	        },
	        {
	            name : 'Last Price',
	            data : [583.12,586.12,586.12,586.12,586.12,586.12, 540]//( generateData() )
        	}
        	]
    });

});


function generateData() {
    // generate an array of random data
    var data = []; // holds our points
    var time = (new Date()).getTime();
    var i = -9; // order of magnitude
    var yCount = btc_bid.length;

    for (i; i <= 0; i += 1) {
				if ( yCount < Math.abs(i) ){
						// Not enought point, can't add to array
				}else {
						data.push([
		           time + i * 1000, // push an x (time
		           btc_bid[Math.abs(i)]
		        ]);
				} 
    }
    return data;
}

/*
var yCount = btc_bid.length();
if (yCount < j){
	// Not enought points, do nothing	
}else {
	data.push([
           time + i * 1000, // push an x (time
           btc_bid[Math.abs(i)]
           //Math.round(btc_bid[i] * 100) // push the y 
           //(j-i) as j is increasing from 0
        ]);
}

*/
var template = ''; 

var fire_data = '';

function showAskPrice(snapshot) {

		template = Handlebars.compile($("#btc_feed").html());

		fire_data = {
				price: snapshot.name(),
				value: snapshot.val()
		}
		if(btc_ask.length != 0){
				var ask_length = btc_ask.length - 1;
				var ask_last = btc_ask[ask_length].value;

				if(snapshot.val() > ask_last){
						fire_data.value_color = 'value_color_green';
				} else if (snapshot.val() < ask_last){
						fire_data.value_color = 'value_color_red';
				}
		}

		$(".ask_action").prepend(template(fire_data));
		btc_ask.push(fire_data);
}


function showLastPrice(snapshot) {
		var template = Handlebars.compile($("#btc_feed").html());

		fire_data = {
				price: snapshot.name(),
				value: snapshot.val()
		}

		if(btc_last.length != 0){
				var bid_length = btc_last.length - 1;
				var bid_last = btc_last[bid_length].value;

				if(snapshot.val() > bid_last){
						fire_data.value_color = 'value_color_green';
				} else if (snapshot.val() < bid_last){
						fire_data.value_color = 'value_color_red';
				}
		}

		$(".last_action").prepend(template(fire_data));
		btc_last.push(fire_data);
}


function showBidPrice(snapshot) {
		var template = Handlebars.compile($("#btc_feed").html());

		fire_data = {
				price: snapshot.name(),
				value: snapshot.val()
		}

		if(btc_bid.length != 0){
				var bid_length = btc_bid.length - 1;
				var bid_last = btc_bid[bid_length].value;

				if(snapshot.val() > bid_last){
						fire_data.value_color = 'value_color_green';
				} else if (snapshot.val() < bid_last){
						fire_data.value_color = 'value_color_red';
				}
		}

		$(".bid_action").prepend(template(fire_data));
		btc_bid.push(fire_data);

/*
		if(snapshot.name() == "bid"){	
				if(btc_bid.length != 0){
						var bid_length = btc_bid.length - 1;
						var bid_last = btc_bid[bid_length].value;

						if(snapshot.val() > bid_last){
								fire_data.value_color = 'value_color_green';
						} else if (snapshot.val() < bid_last){
								fire_data.value_color = 'value_color_red';
						}
				}

				$(".bid_action").prepend(template(fire_data));
				btc_bid.push(fire_data);

				// if(btc_bid.length > 3){ 
				// 	btc_bid.shift();
				// }
		}

	  if(snapshot.name() == "ask"){
			$(".ask_action").prepend(template(fire_data));
			//var ask_push = Previous.ask.push(fire_data);
	  }

	  if(snapshot.name() == "last"){
			$(".last_action").prepend(template(fire_data));
			//var last_push = Previous.last.push(fire_data);
	  }

	  // console.log(btc_bid);
	  // console.log(Previous.bid[0].timestamp);


  $(function () {

  		var value_array = [];
  		// [410, 450, 500, 580, 610, 575, 555]

      $('#btc_chart').highcharts({
          title: {
              text: 'Bitcoin',
              x: 0 //center
          },
          subtitle: {
              text: 'Source: Coinbase.com',
              x: 0
          },
          xAxis: {
              categories: [btc_bid[0].timestamp.getHours() + ':' + btc_bid[0].timestamp.getMinutes() + ':' + btc_bid[0].timestamp.getSeconds(), '2', '3', '4', '5', '6',
                  '7', '8', '9', '10', '11', '12']
  
          },
          yAxis: {
              title: {
                  text: 'Price USD'
              },
              plotLines: [{
                  value: 0,
                  width: 1,
                  color: '#808080'
              }]
          },
          tooltip: {
              valueSuffix: ''
          },
          legend: {
              layout: 'vertical',
              align: 'right',
              verticalAlign: 'middle',
              borderWidth: 0
          },
          series: [{
              name: 'Bid',
              data: value_array
              // [410, 450, 500, 580, 610, 575, 555]
          // }, {
          //     name: 'Last',
          //     data: [0.0, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
          // }, {
          //     name: 'Ask',
          //     data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
          }]
      });
*/


	

		// _.each(btc_bid, function (data) {
		// 	var btc_numerical_values = parseFloat(data.value);
		// 	console.log('Adding ' + btc_numerical_values + ' to my array');
		// 	console.log(btc_numerical_values);
		// 	value_array.push(btc_numerical_values);

		// });

  // });

}


