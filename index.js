var attackerArmy = [];
var defenderArmy = [];

var attackerInjs = [];
var attackersDeads = [];
var attackersCaps = [];

var defenderInjs = [];
var defendersDeads = [];
var defendersCaps = [];

var attackerArmyCount = 0;
var defenderArmyCount = 0;

var attTotArt=0;
var attTotCav=0;
var attTotInf=0;

var defTotArt=0;
var defTotCav=0;
var defTotInf=0;

var isBattleOver = false;

$("#battle-btn").click(function(event) {
  var audio = new Audio('sword.wav');
  audio.play();
  battle();
  $("#result-div").removeClass("invisible");
  $("#result-div").fadeOut(0).fadeIn("slow", function() {
    // Animation complete
  });
});

function battle() {
  attackerArmy = [];
  defenderArmy = [];

  attackerInjs = [];
  attackersDeads = [];
  attackersCaps = [];

  defenderInjs = [];
  defendersDeads = [];
  defendersCaps = [];

  attTotArt = 0;
  attTotCav = 0;
  attTotInf = 0;

  defTotArt = 0;
  defTotCav = 0;
  defTotInf = 0;

  isBattleOver = false;

  var attackerTableBodies = document.querySelector(".table-attacker-body").getElementsByTagName('tr');
  var attackerType;
  var attackerCount;
  var attackerHp;
  var attackerStr;
  var attackerRgd;
  var attackerRacc;
  console.log(attackerTableBodies.length);
  for (var i = 0; i < attackerTableBodies.length; i++) {

    var sel = attackerTableBodies[i].getElementsByTagName('td')[0].getElementsByTagName('select')[0];

    attackerType = sel.options[sel.selectedIndex].text;

    attackerCount = attackerTableBodies[i].getElementsByTagName('td')[1].getElementsByTagName('div')[0].getElementsByTagName('input')[0].value;
    attackerHp = attackerTableBodies[i].getElementsByTagName('td')[2].getElementsByTagName('div')[0].getElementsByTagName('input')[0].value;
    attackerStr = attackerTableBodies[i].getElementsByTagName('td')[3].getElementsByTagName('div')[0].getElementsByTagName('input')[0].value;
    attackerRgd = attackerTableBodies[i].getElementsByTagName('td')[4].getElementsByTagName('div')[0].getElementsByTagName('input')[0].value;
    attackerRacc = attackerTableBodies[i].getElementsByTagName('td')[5].getElementsByTagName('div')[0].getElementsByTagName('input')[0].value;

    for (var j = 0; j < parseInt(attackerCount, 10); j++) {

      switch (attackerType) {
        case "Artillery":
          attTotArt++;
          break;
        case "Cavalry":
          attTotCav++;
          break;
        case "Infantry":
          attTotInf++;
          break;
        case "Pike":
          attTotInf++;
          break;
        default:
      }

      var troop = new Troop(attackerType, parseInt(attackerHp, 10), parseInt(attackerStr, 10), parseInt(attackerRgd, 10), parseInt(attackerRacc, 10));
      attackerArmy.push(troop);
    }

  }

  var defenderTableBodies = document.querySelector(".table-defender-body").getElementsByTagName('tr');
  var defenderType;
  var defenderCount;
  var defenderHp;
  var defenderStr;
  var defenderRgd;
  var defenderRacc;

  for (var n = 0; n < defenderTableBodies.length; n++) {

    var selDef = defenderTableBodies[n].getElementsByTagName('td')[0].getElementsByTagName('select')[0];

    defenderType = selDef.options[selDef.selectedIndex].text;

    defenderCount = defenderTableBodies[n].getElementsByTagName('td')[1].getElementsByTagName('div')[0].getElementsByTagName('input')[0].value;
    defenderHp = defenderTableBodies[n].getElementsByTagName('td')[2].getElementsByTagName('div')[0].getElementsByTagName('input')[0].value;
    defenderStr = defenderTableBodies[n].getElementsByTagName('td')[3].getElementsByTagName('div')[0].getElementsByTagName('input')[0].value;
    defenderRgd = defenderTableBodies[n].getElementsByTagName('td')[4].getElementsByTagName('div')[0].getElementsByTagName('input')[0].value;
    defenderRacc = defenderTableBodies[n].getElementsByTagName('td')[5].getElementsByTagName('div')[0].getElementsByTagName('input')[0].value;

    for (var m = 0; m < parseInt(defenderCount, 10); m++) {

      switch (defenderType) {
        case "Artillery":
          defTotArt++;
          break;
        case "Cavalry":
          defTotCav++;
          break;
        case "Infantry":
          defTotInf++;
          break;
        case "Pike":
          defTotInf++;
          break;
        default:
      }

      var troopDef = new Troop(defenderType, parseInt(defenderHp, 10), parseInt(defenderStr, 10), parseInt(defenderRgd, 10), parseInt(defenderRacc, 10));
      defenderArmy.push(troopDef);
    }

  }

  attackerArmyCount = attackerArmy.length;
  defenderArmyCount = defenderArmy.length;

  displayTot();

  artiRound();
  artiRound();
  artiRound();

  checkBattleState();
  if (isBattleOver === true)
    return;

  cavRound();

  checkBattleState();
  if (isBattleOver === true)
    return;

  for (var k = 0; k < 10; k++) {
    meleeRound();
    checkBattleState();
    if (isBattleOver === true)
      return;
  }

  forceFinish();
}

function getR() {
  return (80 + Math.floor((Math.random() * 41))) / 100;
}

function artiRound() {

  for (var i = 0; i < attackerArmy.length; i++) {
    if (attackerArmy[i].rgd > 0) {
      artiAttack(attackerArmy[i], defenderArmy);
    }
  }

  for (var j = 0; j < defenderArmy.length; j++) {
    if (defenderArmy[j].rgd > 0) {
      artiAttack(defenderArmy[j], attackerArmy);
    }
  }
}

function artiAttack(troop, army) {

  if (tryToShoot(troop.rAcc)) {
    army[Math.floor(Math.random() * army.length)].hp -= (troop.rgd / 3) * getR();
  }


}

function tryToShoot(rAcc) {
  var test = Math.random() * (101);
  /*
  console.log("-----");
  console.log(rAcc);
  console.log(test);
  console.log(test < rAcc);
  console.log("-----");
  */
  return test < rAcc;
}

function tryCap() {
  var test = Math.floor(Math.random() * 6);
  return Math.floor((Math.random() * 6)) === 0;

}

function cavRound() {

  for (var i = 0; i < attackerArmy.length; i++) {
    if (attackerArmy[i].type === "Cavalry") {
      cavAttack(attackerArmy[i], defenderArmy);
    }
  }

  for (var j = 0; j < defenderArmy.length; j++) {
    if (defenderArmy[j].type === "Cavalry") {
      cavAttack(defenderArmy[j], attackerArmy);
    }
  }

}

function cavAttack(troop, army) {
  var target = army[Math.floor(Math.random() * army.length)]
  if (target.type === "Pike") {
    troop.hp -= target.str * getR();
  } else {
    target.hp -= troop.str * 2 * getR();
  }
}

function meleeRound() {
  if (attackerArmy.length >= defenderArmy.length) {
    for (var i = 0; i < attackerArmy.length; i++) {
      meleeAttack(attackerArmy[i], defenderArmy);
    }
  } else {
    for (var j = 0; j < defenderArmy.length; j++) {
      meleeAttack(defenderArmy[j], attackerArmy);
    }
  }
}

function meleeAttack(troop, army) {
  var target = army[Math.floor(Math.random() * army.length)];
  target.hp -= troop.str * getR();
  troop.hp -= target.str * getR();
}

function checkBattleState() {

  console.log("----");
  console.log(attackerArmy.length);
  console.log(defenderArmy.length);

  for (var i = 0; i < attackerArmy.length; i++) {
    if (attackerArmy[i].hp < 0) {
      attackersDeads.push(attackerArmy[i]);
      attackerArmy.splice(i, 1);
      i--;
      continue;
    }

    if (attackerArmy[i].hp < (attackerArmy[i].maxHp / 2)) {
      attackerInjs.push(attackerArmy[i]);
      attackerArmy.splice(i, 1);
      i--;
    }
  }

  for (var j = 0; j < defenderArmy.length; j++) {
    if (defenderArmy[j].hp < 0) {
      defendersDeads.push(defenderArmy[j]);
      defenderArmy.splice(j, 1);
      j--;
      continue;
    }

    if (defenderArmy[j].hp < (defenderArmy[j].maxHp / 2)) {
      defenderInjs.push(defenderArmy[j]);
      defenderArmy.splice(j, 1);
      j--;
    }

    if (attackerArmy.length < attackerArmyCount / 2 || defenderArmy.length < defenderArmyCount / 2) {
      forceFinish();
      return;
    }

  }


}

function forceFinish() {

  isBattleOver = true;

  var attackerWins;

  if (attackerArmy.length >= attackerArmyCount / 2 && defenderArmy.length >= defenderArmyCount / 2) {
    if (attackerArmy.length > defenderArmy.length) {
      attackerWins = true;
    } else {
      attackerWins = false;
    }
  } else {
    if (attackerArmy.length < attackerArmyCount / 2 && defenderArmy.length < defenderArmyCount / 2) {
      if (attackerArmy.length > defenderArmy.length) {
        attackerWins = true;
      } else {
        attackerWins = false;
      }
    } else {
      if (attackerArmy.length < attackerArmyCount / 2) {
        attackerWins = false;
      } else {
        attackerWins = true;
      }
    }
  }

  if (attackerWins === true) {
    $(".result").css('color', '#28a745');
    $(".result").text('Attacker Wins!');

    for (var i = 0; i < defenderArmy.length; i++) {
      if (tryCap() === true) {
        defendersCaps.push(defenderArmy[i]);
        defenderArmy.splice(i, 1);
        i--;
      }
    }
  } else {
    $(".result").css('color', '#dc3545');
    $(".result").text('Defender Wins!');

    for (var j = 0; j < attackerArmy.length; j++) {
      if (tryCap() === true) {
        attackersCaps.push(attackerArmy[j]);
        attackerArmy.splice(j, 1);
        j--;
      }
    }
  }

  var attArtInj = 0;
  var attArtDead = 0;
  var attArtCap = 0;

  var attCavInj = 0;
  var attCavDead = 0;
  var attCavCap = 0;

  var attInfInj = 0;
  var attInfDead = 0;
  var attInfCap = 0;

  var defArtInj = 0;
  var defArtDead = 0;
  var defArtCap = 0;

  var defCavInj = 0;
  var defCavDead = 0;
  var defCavCap = 0;

  var defInfInj = 0;
  var defInfDead = 0;
  var defInfCap = 0;

  // INJURE

  for (var i = 0; i < attackerInjs.length; i++) {
    switch (attackerInjs[i].type) {
      case "Artillery":
        attArtInj++;
        break;
      case "Cavalry":
        attCavInj++;
        break;
      case "Infantry":
        attInfInj++;
        break;
      case "Pike":
        attInfInj++;
        break;
      default:

    }
  }

  console.log(attArtInj);

  for (var i = 0; i < defenderInjs.length; i++) {
    switch (defenderInjs[i].type) {
      case "Artillery":
        defArtInj++;
        break;
      case "Cavalry":
        defCavInj++;
        break;
      case "Infantry":
        defInfInj++;
        break;
      case "Pike":
        defInfInj++;
        break;
      default:

    }
  }

  // DEADS

  for (var i = 0; i < attackersDeads.length; i++) {
    switch (attackersDeads[i].type) {
      case "Artillery":
        attArtDead++;
        break;
      case "Cavalry":
        attCavDead++;
        break;
      case "Infantry":
        attInfDead++;
        break;
      case "Pike":
        attInfDead++;
        break;
      default:

    }
  }

  for (var i = 0; i < defendersDeads.length; i++) {
    switch (defendersDeads[i].type) {
      case "Artillery":
        defArtDead++;
        break;
      case "Cavalry":
        defCavDead++;
        break;
      case "Infantry":
        defInfDead++;
        break;
      case "Pike":
        defInfDead++;
        break;
      default:

    }
  }

  //CAPS

  for (var i = 0; i < attackersCaps.length; i++) {
    switch (attackersCaps[i].type) {
      case "Artillery":
        attArtCap++;
        break;
      case "Cavalry":
        attCavCap++;
        break;
      case "Infantry":
        attInfCap++;
        break;
      case "Pike":
        attInfCap++;
        break;
      default:

    }
  }

  for (var i = 0; i < defendersCaps.length; i++) {
    switch (defendersCaps[i].type) {
      case "Artillery":
        defArtCap++;
        break;
      case "Cavalry":
        defCavCap++;
        break;
      case "Infantry":
        defInfCap++;
        break;
      case "Pike":
        defInfCap++;
        break;
      default:

    }
  }

  $(".att-inj-art").text(attArtInj);
  $(".att-inj-cav").text(attCavInj);
  $(".att-inj-inf").text(attInfInj);

  $(".def-inj-art").text(defArtInj);
  $(".def-inj-cav").text(defCavInj);
  $(".def-inj-inf").text(defInfInj);

  $(".att-dead-art").text(attArtDead);
  $(".att-dead-cav").text(attCavDead);
  $(".att-dead-inf").text(attInfDead);

  $(".def-dead-art").text(defArtDead);
  $(".def-dead-cav").text(defCavDead);
  $(".def-dead-inf").text(defInfDead);

  $(".att-cap-art").text(attArtCap);
  $(".att-cap-cav").text(attCavCap);
  $(".att-cap-inf").text(attInfCap);

  $(".def-cap-art").text(defArtCap);
  $(".def-cap-cav").text(defCavCap);
  $(".def-cap-inf").text(defInfCap);

}

function displayTot() {
  $(".att-tot-art").text(attTotArt);
  $(".att-tot-cav").text(attTotCav);
  $(".att-tot-inf").text(attTotInf);

  $(".def-tot-art").text(defTotArt);
  $(".def-tot-cav").text(defTotCav);
  $(".def-tot-inf").text(defTotInf);
}

$(".add-attacker").click(function(event) {
  $(".table-attacker-body").append(inputBox);
  $(".delete").click(function(event) {
    $(this).closest('tr').remove();
  });
});

$(".add-defender").click(function(event) {
  $(".table-defender-body").append(inputBox);
  $(".delete").click(function(event) {
    $(this).closest('tr').remove();
  });
});

$(".delete").click(function(event) {
  $(this).closest('tr').remove();
});

function Troop(type, hp, str, rgd, racc) {
  this.type = type;
  this.hp = hp;
  this.maxHp = hp;
  this.str = str;
  this.rgd = rgd;
  this.rAcc = racc;
}

var inputBox = '<tr class="table-smaller">\
  <th scope="row"><i class="fa-sharp fa-solid fa-square-minus fa-2x delete"></i></th>\
  <td>\
      <select class="form-select" aria-label="Default select example">\
        <option selected>Artillery</option>\
        <option value="1">Cavalry</option>\
        <option value="2">Pike</option>\
        <option value="3">Infantry</option>\
      </select>\
  </td>\
  <td>\
    <div class="mb-3">\
      <input type="text" class="form-control input-width text-align-center" id="formGroupExampleInput" placeholder="Count" value="0">\
    </div>\
  </td>\
  <td>\
    <div class="mb-3">\
      <input type="text" class="form-control input-width text-align-center" id="formGroupExampleInput" placeholder="HP" value="0">\
    </div>\
  </td>\
  <td>\
    <div class="mb-3">\
      <input type="text" class="form-control input-width text-align-center" id="formGroupExampleInput" placeholder="Str" value="0">\
    </div>\
  </td>\
  <td>\
    <div class="mb-3">\
      <input type="text" class="form-control input-width text-align-center" id="formGroupExampleInput" placeholder="Rgd" value="0">\
    </div>\
  </td>\
  <td>\
    <div class="mb-3">\
      <input type="text" class="form-control input-width text-align-center" id="formGroupExampleInput" placeholder="Racc" value="0">\
    </div>\
  </td>\
</tr>';
