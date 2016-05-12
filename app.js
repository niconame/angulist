angular
.module("todolist", [])
.controller('ListCtrl',function(List){
  var self = this;
  self.tasks = [];

  self.auth = function(listName) {
    List.auth(listName)
    .then(function(res){

      self.tasks = List.tasks = res.data.tasks;
      console.log(self.tasks);
    }), function(err){
      console.log("broken");
    };
  };

  self.getTasks = function(){
    List.getTasks()
    .then(function(res){
      self.tasks = List.tasks = res.data.tasks;
    }),function(err){
      console.log(err);
    }
  };

  self.addTask = function(newTaskText){

    List.addTask(newTaskText)
    .then(function(res){
      self.getTasks();
    }),function(err){
      console.log(err);
    }
  };

  self.updateTask = function(taskId,status){

    List.updateTask(taskId, status)
    .then(function(res){
      self.getTasks();
    }),function(err){
      console.log(err);
    }
  };

  self.deleteTask = function(taskId){
    List.deleteTask(taskId)
    .then(function(res){
      self.getTasks();
    }),function(err){
      console.log(err);
    };
  };
});
//service控制API
angular
.module("todolist")
.service('List', function($http){
  this.baseURL = "https://richegg.top";
  this.tasks = [];
  this.auth = function(listName) {
    var data = {
      listName : listName
    };

    var config = {
      withCredentials : true
    };

    return $http.post(this.baseURL + '/lists',data,config);
  }

  this.addTask = function(newTaskText){
    var config = {
      withCredentials : true
    };

    var data = {
      text:newTaskText
    };

    return $http.post(this.baseURL +'/tasks', data, config);
  }

  this.getTasks = function(){
    var config = {
      withCredentials : true
    };
    return $http.get(this.baseURL + '/tasks', config);
  }

  this.updateTask = function(taskId,status){

    var config = {
      withCredentials : true
    };

    var data = {
      isDone: status
    };

    return $http.patch(this.baseURL + '/tasks/' + taskId, data, config)
  }

  this.deleteTask = function(taskId){
    var config = {
      withCredentials : true
    };

    return $http.delete(this.baseURL +'/tasks/' + taskId,config);
  }
});
