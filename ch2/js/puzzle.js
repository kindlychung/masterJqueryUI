var rows = 4;
var cols = 4;
$(document).ready(function(){
  var sliceStr = createSlices(true);
  $('#puzzleContainer').html(sliceStr);
  handleStart();
});

function createSlices(useImage)
{
  var str = '';
  for(var i=0, top=0, c=0; i < rows; i++, top-=100)
  {
    for(var j=0, left=0; j<cols; j++, left-= 100, c++)
    {
      if(useImage)
      {
        str+= '<div style="background-position: ' + left + 'px ' + top +'px;" class="img" data-sequence="'+c+'">';
      }
      else
      {
        str+= '<div style="background-image:none;" class="img imgDroppable">';
      }
      str+= '</div>';
    }
  }
  return str;
}

handleStart = function () {
  $('#start').on('click', function()
  {
    var divs = $('#puzzleContainer > div');
    var allDivs = shuffle(divs);
    $('#pieceBox').empty();
    allDivs.each(function(){
      var leftDistance = Math.floor((Math.random()*280)) + 'px';
      var topDistance = Math.floor((Math.random()*280)) + 'px';
      $(this)
        .addClass('imgDraggable')
        .css({
          position : 'absolute',
          left : leftDistance,
          top : topDistance
        });
      $('#pieceBox').append($(this));
    });
    var sliceStr = createSlices(false);
    $('#puzzleContainer').html(sliceStr);
    $(this).hide();
    $('#reset').show();
    addPuzzleEvents();
  });


  $('#reset').on('click', function()
  {
    var sliceStr = createSlices(true);
    $('#puzzleContainer').html(sliceStr);
    $('#pieceBox').empty();
    $('#message').empty().hide();
    $(this).hide();
    $('#start').show();
  });
}

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

function addPuzzleEvents()
{
  $('.imgDraggable').draggable(
    {
      revert : 'invalid',
      start : function(event, ui ){
        var $this = $(this);
        if($this.hasClass('pieceDropped'))
        {
          $this.removeClass('pieceDropped');
          ($this.parent()).removeClass('piecePresent');
        }
      }
    });
  $('.imgDroppable').droppable({
    hoverClass: "ui-state-highlight",
    accept : function(draggable)
    {
      return !$(this).hasClass('piecePresent');
    },
    drop: function(event, ui) {
      var draggable = ui.draggable;
      var droppedOn = $(this);
      droppedOn.addClass('piecePresent');
      $(draggable).detach().addClass('pieceDropped').css({
        top: 0,
        left: 0,
        position:'relative'
      }).appendTo(droppedOn);
      checkIfPuzzleComplete();
    }
  });
}

function checkIfPuzzleComplete()
{
  if($('#puzzleContainer div.pieceDropped').length != 16)
  {
    return false;
  }
  for(var i = 0; i < 16; i++)
  {
    var puzzlePiece = $('#puzzleContainer div.pieceDropped:eq('+i+')');
    var sequence = parseInt(puzzlePiece.data('sequence'), 10);
    if(i != sequence)
    {
      $('#message').text('Nope! You made the kitty sad :(').show();
      return false;
    }
  }
  $('#message').text('YaY! Kitty is happy now :)').show();
  return true;
}

