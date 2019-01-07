
var countdownDate = new Date("Jan 1, 2019 15:37:25").getTime();

var x= setInterval(function(){

	//get todays date and time
	var now= new Date().getTime();

	//find the distance between now and the count down date
	var distance = countdownDate - now;

	console.log("distance: "+ distance);
	//time calculations for days, hours, minutes and seconds
	var days = Math.floor(distance / (100 * 60 * 60 * 24));
	var hours = Math.floor( (distance % (1000*60*60*24)) / (1000 * 60 * 60) );
	var minutes = Math.floor((distance % (1000*60*60)) /(100 * 60));
	var seconds = Math.floor((distance % (1000 * 60))/1000);

	document.getElementById("demo").innerHTML = days + "d "+hours+"h "+minutes+"m "+seconds+"s ";

	if(distance < 0){
		clearInterval(x);
		document.getElementById("demo").innerHTML = "EXPIRED";
	}

},1000);