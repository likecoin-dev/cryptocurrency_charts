

var Firebase;

var Previous = {
	bid: [],
	ask: [],
	last: []
};

var bitcoinRef = new Firebase("https://publicdata-cryptocurrency.firebaseio.com/bitcoin");

bitcoinRef.child("bid").on("value", showPrice);
bitcoinRef.child("ask").on("value", showPrice);
bitcoinRef.child("last").on("value", showPrice);

function showPrice(snapshot) {

	var template = Handlebars.compile($("#btc_feed").html());

	var data = {
			price: snapshot.name(),
			value: snapshot.val(),
			timestamp : (function() { return new Date() })()
	}

	if(snapshot.name() == "bid"){

		if(Previous.bid.length != 0){
			var bid_length = Previous.bid.length - 1;
			var bid_last = Previous.bid[bid_length].value;

			$(".value_feed").addClass("value_feed_size");

			if(snapshot.val() > bid_last){
				data.value_color = 'value_color_green';
			} else if (snapshot.val() < bid_last){
				data.value_color = 'value_color_red';
			}
		}



		$(".bid_action").prepend(template(data));
		Previous.bid.push(data);
	}

  if(snapshot.name() == "ask"){
		$(".ask_action").prepend(template(data));
		//var ask_push = Previous.ask.push(data);
  }

  if(snapshot.name() == "last"){
		$(".last_action").prepend(template(data));
		//var last_push = Previous.last.push(data);
  }

  console.log(Previous);
  // console.log(Previous.bid[0].timestamp);


  $(function () {
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
              categories: [Previous.bid[0].timestamp, '2', '3', '4', '5', '6',
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
              data: [400, 410, 450, 500, 580, 610, 575, 555]
          // }, {
          //     name: 'Last',
          //     data: [0.0, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
          // }, {
          //     name: 'Ask',
          //     data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
          }]
      });
  });
}


