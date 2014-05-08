/*
 * js-mvc-form
 * Version: 1.1.0
 */

$(function() {
  var $form = $(".todo-form");
  var $input = $form.find("input[type=text]");
  var $list = $(".todo-list");
  var $usual = $(".usual-list");

  function addList(text) {
    var html = '<li class="list-group-item"><input type="checkbox">　' + text + '</li>';
    var $li = $(html);

    $li.find("input[type='checkbox']").change(function() {
      $(this).closest('li').toggleClass('list-group-item-info');
    });
    $list.append($li);
  }

  $form.submit(function (e) {
    e.preventDefault();
    var text = $input.val();
    if(text){
      addList(text);
    }
    $input.val("");
  });

  $usual.find('li').on('click', $usual, function (e) {
    e.preventDefault();
    var text = $(this).text();
    addList(text);
  });

});
