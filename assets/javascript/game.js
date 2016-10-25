$(document).ready(function() {
	
	//all the character objects
	$("#cady").data({
		name: "Cady",
		taunt: "It's not my fault you're in love with me or something!",
		hp: 120,
		insult: 5,
		counter: 10
	});

	$("#regina").data({
		name: "Regina",
		taunt: "Stop trying to make fetch happen! It's not going to happen!",
		hp: 150,
		insult: 10,
		counter: 15
	});
	
	$("#gretchen").data({
		name: "Gretchen",
		taunt: "You're wearing sweatpants. It's Monday!",
		hp: 110,
		insult: 7,
		counter: 8
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

	//click a mean girl to be "you"
	$("img.meanGirl").click(function() {
		var numAttacks = 0;
		var wins = 0;
		//new directions for the player
		$("#todo").html("<br><p>Choose a frenemy to burn.</p>");
		//unbinds click event for other images
		$('img').unbind('click'); 
		//hide some things, show some things
	    $('#homeroom').hide();
	   	$('#burnbook').show();
	   	$("#frenemyBox").show();

	   	//putting the clicked character into the player div
	   	//main character has .attacker class
	   	var attacker = $(this);
	   	// $("#playerDiv").html(attacker).width("100%").addClass("attacker");
	   	attacker.appendTo($("#playerDiv")).width("100%").addClass("attacker");
	   	
	   	//player name and hp for attacker
	   	$("#playerName").html(attacker.data("name")+"<br>");
    	$("#playerHp").html("<br>"+ "<span>hp: </span>" +attacker.data("hp"));

    	//putting other mean girls into enemies div
	   	$("img.meanGirl").not(attacker).appendTo("#enemiesDiv").height("100%").addClass("defender");
    	$('#tauntbox').html("<br><br>" + attacker.data("taunt") +"<br><br>");
    	$('#enemyholder').css("float", "clear");
  
    	//when the defender is chosen
    	$("img.defender").click(function newDefender() {
    		//don't allow more than one defender at a time
    		$("img.defender").unbind("click", newDefender);

    		//clear the alert box
    		$("#alertBox").html("");
    		$("#todo").html("<br>Click the burn button to insult " +$(this).data("name")+".");
    		$("#battleStation").show();
    		$("#attack_button").show();
    		$("#attack_button").show();
    		$("#alertBox").show();
    		$("#buttonBurn").hide();
    		
    		var defender = $(this);
    		console.log(defender);
    		defender.appendTo($("#battleDiv")).width("100%");
    		if (wins == 2) {
    			$("#frenemyBox").hide();
    		}
    		$("#battleName").html(defender.data("name")+"<br>");
    		$("#battleHp").html("<br>"+ "<span>hp: </span>" + defender.data("hp"));
    		$('#tauntbox').html("<br><br>" + defender.data("taunt") +"<br><br>");
    		var meHealth = parseInt($(attacker).data("hp"));
			var defAmt = parseInt($(defender).data("counter"));
			var herHealth = parseInt($(defender).data("hp"));
			var attAmt = parseInt($(attacker).data("insult"));

    		$("#attack_button").click(function launchAttack(){

				meHealth = meHealth - defAmt;
				console.log("My health: "+meHealth);

				var totAttack = attAmt + (numAttacks*attAmt);
				herHealth = herHealth - totAttack;
				console.log("Her health: "+herHealth);

				$(attacker).data("hp", meHealth);
				$(defender).data("hp", herHealth);


				$("#alertBox1").html($(attacker).data("name")+" just gave "+$(defender).data("name")+" a MAJOR burn of "+totAttack+ " hp.");
				$("#alertBox2").html("<br><br>"+$(defender).data("name")+" burned "+$(attacker).data("name")+" back, and  "+$(attacker).data("name")+ " lost "+$(defender).data("counter")+ " hp.");
				$("#todo").html("<br>Keep burning " +$(defender).data("name")+" until she's DESTROYED.");
				$("#playerHp").html("<br>"+ "<span>hp: </span>"+meHealth);
				$("#battleHp").html("<br>"+ "<span>hp: </span>"+herHealth);
				numAttacks++;
				console.log(numAttacks);

				if (meHealth <= 0) {
					$("#alertBox1").html("");
					$("#alertBox2").html("");
					alert("You lose, loser.");
					location.reload().delay(5000);
				}else if (herHealth <=0) {
					wins++;
					$("#alertBox1").html("");
					$("#alertBox2").html("");
					$("#todo").html("<br>Select a new frenemy to burn.");
					alert("You gave "+$(defender).data("name")+" the ULTIMATE burn.");
					$("#attack_button").unbind("click", launchAttack);
					$("img.defender").bind("click", newDefender);
					$("#battleName").html("");
					$("#battleDiv").html("");
					$("#battleHp").html("");
				}
				if (wins == 3) {
					alert("You win! You go, Glenn Coco!");
					location.reload();
				}
			});
	    });
	});
});