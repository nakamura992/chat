'use strict';

function sayUser(message) {
  const chatbox =
  '<li>' +
      '<div class="balloon balloon-r add" id="user">' +
        '<p class="say say-r">' +
          message +
        '</p>' +
      '</div>' +
  '</li>';
  $('#chat-area').append(chatbox);
  $(window).scrollTop($('#chat-area')[0].scrollHeight);
}

function sayOperator(message) {
  const chatbox =
  '<li>' +
    '<div class="balloon" id="ope">' +
      '<img class="img-circle" src="operator.png" alt="image">' +
      '<p class="say">' +
      message +
      '</p>' +
    '</div>' +
  '</li>';
  $('#chat-area').append(chatbox);
  $(window).scrollTop($('#chat-area')[0].scrollHeight);
  // $('#ope').hide().fadeIn(1000);
}



function sendMessage() {
  let req_message = $('#msg-send').val();

  if (req_message !== '') {
    sayUser(req_message);
  } else {
    return ;
  }


  const body = new FormData();
  body.append('message', req_message);
  fetch('/chat', {
    method: 'POST',
    body,
  })

    .then((res) => res.json())
    .then((v) => {
      sayOperator(v.answer);
    });

  $('#msg-send').val('');
}

$(function() {
  $(window).keydown(function(e) {
    if(e.keyCode === 13 && e.shiftKey ) {
      sendMessage();
    }
  });
});