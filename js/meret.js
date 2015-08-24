// START BUILDING PAGE = START JQUERY
$(document).ready(function() {

  $("#input_box").val("Type a regular expression here");
  $("#input_box").focus(function(){
    if ($("#input_box").val() == "Type a regular expression here") {
      $("#input_box").val("");
    }
  });
  $("#input_box").focusout(function(){
    if ($("#input_box").val() == "") {
      $("#input_box").val("Type a regular expression here");
    }
  });
  
  function compare_arrays (array_a, array_b) {
    var thesame = true;
    for (var i = 0; i<array_a.length; i++) {
      if (array_a[i] != array_b[i]) {
        thesame = false;
      }
    }
    return thesame;
  }


function display () {  
  // DISPLAY TYPE
  if (q[n].type == "find") {
    type_p_str = "This is a Find task.";
  }
  if (q[n].type == "replace") {
    type_p_str = "This is a Replace task.";
  }
  //$("#type_p").text(type_p_str);
  $("#type_p").css("display", "none"); // delete type perhaps or keep this here for now?
  
  // DISPLAY TEXT
  $("#text_p").html("Exercise " + n + ". <span id='exercise_text'>" + q[n].text + "</span>");
  
  // DISPLAY SUBJECT
  var subject_p_str = "";
  for (var i=0; i<q[n].subject.length; i++) {
    subject_str = q[n].subject[i];
    subject_str = subject_str.replace(/ /g,"&nbsp;");
    //subject_str = subject_str.replace(/\\/g,"&#092;");
    subject_p_str += "<span id='subject_line_"+i+"'>" + subject_str + "</span>";
    if (i < q[n].subject.length-1) {
      subject_p_str += "<br>";
    }
  }
  $("#subject_p").html(subject_p_str);
  
  // DISPLAY RESULT P
  if (q[n].passed) {
    $("#result_p").text("You have completed this exercise.");
  }
  else {
    $("#result_p").text("");
  }
  // NEXT AND PREVIOUS
  if (!q[n-1]) {
    $("#previous").css("display", "none");
  }
  else {
    $("#previous").css("display", "inline");
  }
  if (!q[n+1] || !q[n].passed) {
    $("#next").css("display", "none");
  }
  else {
    $("#next").css("display", "inline");
  }
  
    // DISPLAY HINT
  $("#hint_p").text("Hint: " + q[n].hint);
  $("#hint_p").css("display","none");
  
}
    var n = 1;
    display();
  $("#previous").click(function () {
    if (q[n-1]) {
      n--;
      display();
    }
  });
  $("#next").click(function () {
    if (q[n+1]) {
      n++;
      display();
    }
  });
  
  // DISPLAY MANUAL
  $("#manual_d").css("display","none");
  $("#manual").click(function () {
    if ($("#manual_d").css("display") == "none") {
      $("#manual_d").css("display","block");
    }
    else {
      $("#manual_d").css("display","none");
    }
  });
  

  $("#hint").click(function () {
    if ($("#hint_p").css("display") == "none") {
      $("#hint_p").css("display","block");
    }
    else {
      $("#hint_p").css("display","none");
    }
  });
  
  //$("#submit_button").click (function () {
  $("#input_form").submit (function () {
    //$("#submit_button").css("background-color", "red");
    var pass=false;
    var result = new Array();
    if (q[n].type == "find") {
      for (var i=0; i<q[n].subject.length; i++) {
         $("#subject_line_"+i).css("color", "black");
        if (q[n].subject[i].match($("#input_box").val())) {
          if (q[n].solution[i]==false) {
            $("#subject_line_"+i).css("color", "red");
          }
          else {
            $("#subject_line_"+i).css("color", "green");
          }
          result.push(true);
        }
        else {
          $("#subject_line_"+i).css("color", "black");
          result.push(false);
        }
      } 
    }
    if (q[n].type == "replace") {
    
    }
    if (compare_arrays(q[n].solution,result)) {
      $("#result_p").text("Well done. You are full of win.");
      $("#result_p").css("fontWeight", "bold");
      q[n].passed = true;
      $("#next").css("display", "inline");
    }
    else {
      $("#result_p").text("Fail. Try again.");
      $("#result_p").css("fontWeight", "normal");
      //$("#result_p").text(result[0] + " " + result[1] + " " + result[2] + " ; " + q[n].solution[0] + " " + q[n].solution[1] + " " + q[n].solution[2]);
    }
  });
  
})
