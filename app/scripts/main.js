

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
			value: snapshot.val()
	}

	if(snapshot.name() == "bid"){

		if(Previous.bid.length != 0){
			var bid_length = Previous.bid.length - 1;
			var bid_last = Previous.bid[bid_length].value;
			if(snapshot.val() > bid_last){
				data.value_color = 'value_color_green';
			} else if (snapshot.val() < bid_last){
				data.value_color = 'value_color_red';
			}
		}


		console.log(data);
		console.log(Previous.bid.length);
		console.log(bid_length);
		console.log(snapshot.val());
		console.log(bid_last);

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

  //console.log(Previous);

}

