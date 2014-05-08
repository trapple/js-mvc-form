/*
 * js-mvc-form
 * Version: 2.0.0
 */

$(function() {
  new ViewTodoList($(".todo-list"));

  //test
  Todo.add("item1");
  Todo.add("item2");

  $(".usual-list li").on('click', function () {
    Todo.add($(this).text()); 
  });

  $(".todo-form").on('submit', function (e) {
    e.preventDefault();
    var $input = $(this).find("input[type=text]");
    if($input.val()){
      Todo.add($input.val());
    }
  });

  $(Todo).on('added', function (e, todo) {
   $(".todo-form input[type=text]").val("");
  });

});

/*
 * Model Todo
 */
var Todo = function (data) {
  this.text = data.text;
  this.complete = !!data.complete;
};

//自分自身のインスタンスを保存
Todo.list = [];

Todo.add = function (text) {
  var todo = new Todo({text: text});
  var list = Todo.getTextList();

  if($.inArray(text, list) == -1){
    Todo.list.push(todo);
    $(Todo).trigger('added', todo);
  }
};

Todo.getTextList = function () {
  return $.map(Todo.list, function (todo) {
    return todo.text;
  });
};

Todo.prototype.setComplete = function (complete) {
  this.complete = !!complete; 
  $(this).trigger('changeComplete', this);
};

/*
 * ViewTodoList
 */
var ViewTodoList = function ($el) {
  this.$el = $el;  
  var self = this;
  $(Todo).on('added', function (e, todo) {
    self.add(todo);
  });
}

ViewTodoList.prototype.add = function (todo) {
  var item = new ViewTodoListItem(todo);
  this.$el.append(item.$el);
};

/*
 * ViewTodoListItem
 */

var ViewTodoListItem = function (todo) {
  var self = this;
  this.todo = todo;
  this.$el = $('<li class="list-group-item"><input type="checkbox">　' + todo.text + '</li>');
  this.$checkbox = this.$el.find("input[type='checkbox']");

  this.$checkbox.on('change', function () {
    self.todo.setComplete(self.$checkbox.is(":checked"));
  });

  $(this.todo).on('changeComplete', function () {
    self.onchangeComplete();
  });
};

ViewTodoListItem.prototype.onchangeComplete = function () {
  if(this.todo.complete){
    this.$el.addClass('list-group-item-info');
  }else{
    this.$el.removeClass('list-group-item-info');
  }
};
