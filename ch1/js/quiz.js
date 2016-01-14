$(document).ready(function () {
  createQuizLayout();
  initQuiz();
  $('#reset').on('click', function()
  {
    $('#source li').draggable('destroy');
    $('#target li').droppable('destroy');
    createQuizLayout();
    initQuiz();
  });
});

function shuffle(o)
{
  var tmp;
  for(var i = 0; i < o.length; i++) {
    tmp = o[i];
    j = Math.floor(Math.random() * i)
    o[i] = o[j];
    o[j] = tmp;
  }
  return o;
};


var totalScore = 0;
function initQuiz()
{
  $('#source li').draggable(
    {
      revert : true,
      revertDuration: 200,
      cursor: "move"
    });
  $('#score').text(totalScore + ' points.');

  $('#target li').droppable(
    {
      accept : function(draggable)
      {
        if(parseInt(draggable.data('index'), 10) ===
          parseInt($(this).data('index'), 10))
        {
          return true;
        }
        else
        {
          return false;
        }
      },
      drop: function( event, ui )
      {
        var that = $(this);
        that.addClass( "ui-state-highlight" ).html( 'Correct!'
        ).effect('bounce');
        that.droppable('disable');
        ui.draggable.addClass('correct ui-state-disabled');
        (ui.draggable).draggable('disable');
        totalScore++;
        $('#score').text(totalScore + ' points.');
        if($('li.correct').length == 10)
        {
          $( "#dialog-complete" ).dialog({
            resizable: false,
            modal: true
          });
        }
      }
    });
}

function createQuizLayout() {
//declare arrays of countries and their capitals.
  var countries = ["USA", "UK", "India", "Germany", "Turkey", "France",
    "Nepal", "Japan", "South Africa", "Maldives"];
  var capitals = ["Washington", "London", "Delhi", "Berlin", "Istanbul",
    "Paris", "Kathmandu", "Tokyo", "Capetown", "Male"];
  var arrCountry = [];
  for (var i = 0; i < countries.length; i++) {
    arrCountry.push('<li data-index="' + (i + 1) + '">' + countries[i]
      + '</li>');
  }
  var arrCapital = [];
  for (var i = 0; i < capitals.length; i++) {
    arrCapital.push('<li data-index="' + (i + 1) + '">' + capitals[i]
      + '</li>');
  }
//shuffle the arrays
  arrCountry = shuffle(arrCountry);
  arrCapital = shuffle(arrCapital);
// once country and capital items are ready, we insert them into DOM
  $('#source').html(arrCountry.join(''));
  $('#target').html(arrCapital.join(''));
}



