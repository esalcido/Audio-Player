//https://blog.eduonix.com/web-programming-tutorials/learn-build-audio-player-using-html5/

var playlist = {
	"songs":[
		{"genre":"bachata","song":"07. Sobredosis (ft Ozuna).mp3","cover":"1 Front.jpg","artist":"Romeo Santos"},
		{"genre":"bachata","song":"StanAJ - Romantic (DJ Soltrix & DJ Manuel Citro Bachata Remix).mp3","cover":"hqdefault.jpg","artist":"StanAJ"},
		{"genre":"bachata","song":"13. Propuesta Indecente.mp3","cover":"Front.jpg","artist":"Romeo Santos"},
		{"genre":"bachata","song":"16. Imitadora.mp3","cover":"1 Front.jpg","artist":"Romeo Santos"},
	]
};

var bacahata_list={
	"songs":[
		{"genre":"bachata","song":"10. Bella y Sensual.mp3","cover":"1 Front.jpg","artist":"Romeo Santos"},
		{"genre":"bachata","song":"02 La Diabla.mp3","cover":"Front1.jpg","artist":"Romeo Santos"},
		{"genre":"bachata","song":"05 Mi Santa.mp3","cover":"Front1.jpg","artist":"Romeo Santos"},
		{"genre":"bachata","song":"StanAJ - Romantic (DJ Soltrix & DJ Manuel Citro Bachata Remix).mp3","cover":"hqdefault.jpg","artist":"StanAJ"},
	]
};

var salsa_list={
	"songs":[
		{"genre":"salsa","song":"AAAGH1.mp3","cover":"hqdefault.jpg","artist":"Sound effect"},
	]
};

//add list to up next
var html="";
for( i=0;i<playlist.songs.length; i++){
html+="<li class='track' song='"+ playlist.songs[i].song+"' cover='"+playlist.songs[i].cover+"' artist='"+playlist.songs[i].artist+"' >"+ playlist.songs[i].song+"</li>";
}
console.log(html);
// $('#playlist .hidden').append("<li song='"+ playlist.songs[i].song+"' cover='"+playlist.songs[i].cover+"' artist='"+playlist.songs[i].artist+"' >"+ playlist.songs[i].song+"</li>")
$('#playlist .hidden').append(html);

//add to bachata list
var html2="";
for( i=0;i<bacahata_list.songs.length; i++){
html2+="<li class='track' song='"+ bacahata_list.songs[i].song+"' cover='"+bacahata_list.songs[i].cover+"' artist='"+bacahata_list.songs[i].artist+"' >"+ bacahata_list.songs[i].song+"</li>";
}
console.log(html);
$('#bachata-pl .hidden').append(html2);


var audio;
//var autoplay= true;
var autoplay= document.getElementById("autoplay").checked;
console.log("autoplay: "+ autoplay);



$("#autoplay").change(function(){
	autoplay = $(this).prop('checked');
	
	console.log(autoplay);
});


//hide pause
$('#pause').hide();

initAudio($('#playlist li:first-child'));

function initAudio(element){
	var song = element.attr('song');
	var title = element.text();
	var cover = element.attr('cover');
	var artist = element.attr('artist');

//create audio object
audio = new Audio('media/'+song);

//insert audio info
$('.artist').text(artist);
$('.title').text(title);

//insert song cover
$('img.cover').attr('src','img/covers/'+cover);

$('#playlist li').removeClass('active');
element.addClass('active');

}

//play button
$('#play').click(function(){
	audio.play();
	$('#play').hide();
	$('#pause').show();
	showDuration();
});

//pause button
$('#pause').click(function(){
	audio.pause();
	$('#play').show();
	$('#pause').hide();
});

//stop button
$('#stop').click(function(){
	audio.pause();
	audio.currentTime = 0;
	$('#pause').hide();
	$('#play').show();
});

//next button
$('#next').click(function(){
	audio.pause();
	var next = $('#playlist li.active').next();
	if(next.length == 0){
		next= $('#playlist li:first-child');
	}
	initAudio(next);
	audio.play();
	showDuration();
});

//prev button
$('#prev').click(function(){
	audio.pause();
	var prev = $('#playlist li.active').prev();
	if(prev.length == 0){
		prev = $('#playlist li:last-child');
	}
	initAudio(prev);
	audio.play();
	showDuration();
});

//playlist song click
$('#playlist li').click(function(){
	audio.pause();
	initAudio($(this));
	$('#play').hide();
	$('#pause').show();
	audio.play();
	showDuration();
});



//Audio control and time duration

//volume control
$('#volume').change(function(){
	audio.volume = parseFloat(this.value / 10);
});

//time duration
function showDuration(){
	$(audio).bind('timeupdate',function(){
		//get hours and minutes
		var s = parseInt(audio.currentTime %60);
		var m = parseInt(audio.currentTime / 60)%60;
		if(s < 10){
			s = '0'+s;
		}
		$('#duration').html(m + ':'+s);
		var value = 0;
		if(audio.currentTime>0){
			value= Math.floor((100 / audio.duration)*audio.currentTime);
		}
		$('#progress').css('width',value+'%');

		if(autoplay && audio.ended){
			console.log("Audio has ended. Playing next track.");
			//play next track
			audio.pause();
			var next = $('#playlist li.active').next();
			
			if(next.length == 0){
				next= $('#playlist li:first-child');
			}
			
			initAudio(next);
			audio.play();
			showDuration();
		}
		if(audio.ended){
			$('#play').show();
			$('#pause').hide();
		}
	});
}


