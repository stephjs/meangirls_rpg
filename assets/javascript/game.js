$(document).ready(function() {
	
	$("#cady").data({
		name: "Cady",
		taunt: "It's not my fault you're in love with me or something!",
		hp: 120,
		insult: 5,
		counter: 10,
		attack: function(enemyObj){
			enemyObj.hp = enemyObj.hp - 10;
		}
	});

	$("#regina").data({
		name: "Regina",
		taunt: "Stop trying to make fetch happen! It's not going to happen!",
		hp: 150,
		insult: 10,
		counter: 15,
		attack: function(enemyObj){
			enemyObj.hp = enemyObj.hp - 8;
		}
	});
	
	$("#gretchen").data({
		name: "Gretchen",
		taunt: "You're wearing sweatpants. It's Monday!",
		hp: 110,
		insult: 7,
		counter: 8,
		attack: function(enemyObj){
			enemyObj.hp = enemyObj.hp - 8;
		}
	});

	$("#karen").data({
		name: "Karen",
		taunt: "You can't sit with us.",
		hp: 90,
		insult: 10,
		counter: 6,
		attack: function(enemyObj){
			enemyObj.hp = enemyObj.hp - 8;
		}
	});


	$('#homeroom').show();
	$('#buttonburn').show();
	$('#burnbook').hide();
	$('#battleStation').hide();
	$("#attack_button").hide();
	$("#alertBox").hide();
	var buttonPushed = false;
	$('img').addClass("meanGirl");
	$("#todo").html("<br><p>Pick a Mean Girl to sit with at lunch.</p>");


	$("img.meanGirl").click(function() {
	    $('#homeroom').hide();
	   	$('#burnbook').show();
	   	$(this).appendTo("#playerDiv").width("90%").height("90%").addClass("attacker");
	   	var attacker = $(this);
	   	$("#playerName").html("<br>"+$(this).data("name")+"<br>");
    	$("#playerHp").html("<br>"+ "<span>hp: </span>" +$(this).data("hp"));

	   	$("img").not(this).appendTo("#enemiesDiv").width("28%").height("28%").addClass("defender");
    	$("#frenemies").html("<h1>Frenemies</h1><br>");
    	$('#tauntbox').html("<br><br>" + $(this).data("taunt") +"<br><br>");
    	$("#todo").html("<br><p>Last chance to change your character! <br>When you're ready to play, click the burn book.</p>");
	
    
	    $("#buttonBurn").click(function() {
	    	$('img').unbind('click');
	    	var buttonPushed = true;
	    	$("img.meanGirl").removeClass("meanGirl");
	    	$("#todo").html("<br><p>Choose a frenemy to burn.</p>");
	    	$('#enemyholder').css("float", "clear");
	    	$("img.defender").click(function() {
	    		$("#alertBox").html("");
	    		$("#todo").html("<br>Click the burn button to insult " +$(this).data("name")+".");
	    		$('#battleStation').show();
	    		$("#attack_button").show();
	    		$("#attack_button").show();
	    		$("#alertBox").show();
	    		$("#buttonBurn").hide();
	    		var defender = $(this);
	    		console.log(defender);
	    		$(this).appendTo("#battleDiv").width("90%").height("90%");
	    		$("#battleName").html("<br>"+$(this).data("name")+"<br>");
	    		$("#battleHp").html("<br>"+ "<span>hp: </span>" +$(this).data("hp"));
	    		$("#frenemyBox").css("border", "black 2px solid");

	    		$("#attack_button").click(function(){
					$("#alertBox").html($(attacker).data("name")+" just gave "+$(defender).data("name")+" a MAJOR burn of "+$(attacker).data("insult")+ " hp.");
					$("#alertBox").append("<br><br>"+$(defender).data("name")+" burned "+$(attacker).data("name")+" back, and  "+$(attacker).data("name")+ " lost "+$(defender).data("counter")+ " hp.");
					$("#todo").html("<br>Keep burning " +$(defender).data("name")+" until she's DESTROYED.");
					var meHealth = $(attacker).data("hp");
					var defAmt = $(defender).data("counter");

					meHealth = meHealth - defAmt;
					console.log("My health: "+meHealth);

					var herHealth = $(defender).data("hp");
					var attAmt = $(attacker).data("insult");

					herHealth = herHealth - attAmt;
					console.log("Her health: "+herHealth);

					$(attacker).data("hp", meHealth);
					$(defender).data("hp", herHealth);
					$("#playerHp").html("<br>"+ "<span>hp: </span>"+meHealth);
					$("#battleHp").html("<br>"+ "<span>hp: </span>"+herHealth);

					if (meHealth <= 0) {
						$("#alertBox").html("");
						alert("You lose, loser.");
						location.reload().delay(5000);
					}else if (herHealth <=0) {
						$("#alertBox").html("");
						$("#todo").html("<br>Select a new frenemy to burn.");
						alert("You gave "+$(defender).data("name")+" the ULTIMATE burn.");
						$(defender).remove();

					}

				});


			});
	    });
	});
});