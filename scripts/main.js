

var Firebase;

var bitcoinRef = new Firebase("https://publicdata-cryptocurrency.firebaseio.com/bitcoin");

bitcoinRef.child("bid").on("value", showPrice);
bitcoinRef.child("ask").on("value", showPrice);
bitcoinRef.child("last").on("value", showPrice);

function showPrice(snapshot) {
	var array = {
		"price": snapshot.name(),
		"value": snapshot.val()
	}
  //console.log([snapshot.name(), snapshot.val()]);

  console.log(array);
  $("#action").append(array['price']+' : '+array['value']);


	var template = Handlebars.compile($("#btc_feed").html());
	var data = {
			"price": snapshot.name(),
			"value": snapshot.val()
	}
	var filled = template(data);
	$('#action').html(filled);


}
