

var Firebase;

var bitcoinRef = new Firebase("https://publicdata-cryptocurrency.firebaseio.com/bitcoin");

bitcoinRef.child("bid").on("value", showPrice);
bitcoinRef.child("ask").on("value", showPrice);
bitcoinRef.child("last").on("value", showPrice);

function showPrice(snapshot) {
  console.log(snapshot.name() + ": " + snapshot.val());
}
