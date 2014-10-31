// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ionic.contrib.frostedGlass'])
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})




//模块 
angular.module('myDemo', ['ionic'])



//configure about modals 
.config(function($stateProvider,$urlRouterProvider,$urlRouterProvider) {


  $stateProvider
  //登陆页面
    .state('login',{
      url:'/login',
      templateUrl:"templates/login.html",
      animation:'slide-right-left'
    })
    //注册页面
    .state('sign-in',{
      url:"/sign-in",
      templateUrl:'templates/sign-in.html',
      animation:'slide-left-right'
    })
  //home
    .state('home',{
      url:'/home',
      templateUrl:'templates/home.html',
      animation:'slide-right-left'
    })
 //projectDetail
    //项目具体信息页，模板
    .state('tabs', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })
    //项目信息页，project
    .state('tabs.project', {
      url: "/project",      
      views: {
        'home-tab': {
          templateUrl: "templates/project.html",
          animation:'slide-right-left'
        }
      }
    })
     //stage---progress
    .state('tabs.progress1', {
      url: "/progress1",
      views: {
        'progress-tab': {
          templateUrl: "templates/progress1.html",

        }
      }
    })
    //member---progress
    .state('tabs.progress2', {
      url: "/progress2",
      views: {
        'progress-tab': {
          templateUrl: "templates/progress2.html",

        }
      }
    })
    //项目信息页，chat
    .state('contact', {
      url: "/chat",
      templateUrl:'templates/chat.html'
     
    });


//
    $urlRouterProvider.otherwise("/login");
  //  $urlRouterProvider.otherwise("tab/project");
})

//project
.factory('Projects',function(){
 return {
    all: function(){
      var projectString = window.localStorage['Projects'];
      if(projectString){
        return angular.fromJson(projectString);
      }
      return [];
    },
    saveProject: function(project){
      window.localStorage['Projects']=angular.toJson(project);
    },
    saveStage:function(stage){
      window.localStorage['Pstages'] = angular.toJson(stage);
    },
    saveMember:function(member){
      window.localStorage['Pteam'] = angular.toJson(member);
    },
    saveTask:function(task){
      window.localStorage['Ptasks'] = angular.toJson(task);
    },
    newProject: function(Pno,creater,projectTitle){
      return {
        PNo:Pno,
        PCreater:creater,
        Ptitle:projectTitle,
        Pteam:[],
        Pstages:[],
        Ptasks:[] 
      };
    },
    newStage:function(stageNo,stagetitle){
      return{
        stageNo:stageNo,
        Stitle:stagetitle
      };
    },
    newMember:function(teamNo,memberName){
      return{
        teamNo:teamNo,
        name:memberName
      };
    },
    newTask:function(taskNo,title,discribe,stage,owner,state){
      return{
        taskNo:taskNo,
        title:title,
        discribe:discribe,
        stage:stage,
        owner:owner,
        state:state
      }
    },
  //get,set  
    getActiveIndex_Project: function(){
      return parseInt(window.localStorage['ActiveIndex']) || 0 ;
    },
    setActiveIndex_Project: function(index){
      window.localStorage['ActiveIndex'] = index;
    },
    getActiveIndex_Stage: function(){
      return parseInt(window.localStorage['ActiveIndex']) || 0 ;
    },
    setActiveIndex_Stage: function(index){
      window.localStorage['ActiveIndex'] = index;
    },
 
    getActiveIndex_Member: function(){
     return parseInt(window.localStorage['ActiveIndex']) || 0 ;
    },
    setActiveIndex_Member: function(index){
      window.localStorage['ActiveIndex'] = index;
    },
    getActiveIndex_Task: function(){
      return parseInt(window.localStorage['ActiveIndex']) || 0 ;
    },
    setActiveIndex_Task: function(index){
      window.localStorage['ActiveIndex'] = index;
    },

  }
  })
//users
.factory('Users',function(){
  return{
    all:function(){
      var userString = window.localStorage['users'];
      if(userString){
        return angular.fromJson(userString);
      }
      return [];
    },
    save:function(users){
      window.localStorage['users'] = angular.toJson(users);
    },
    newUser:function(user){
      return{
        name:user.name,
      account:user.account,
      password:user.password
      };
    },
    getActiveIndex_User : function(){
      return parseInt(window.localStorage['ActiveIndex']) || 0 ;
    },
    setActiveIndex_User : function(index){
      window.localStorage['ActiveIndex'] = index ; 
    }

  }

 })

//taskLog
.factory('taskLogs',function(){
  return {
  all:function(){
    var logString = window.localStoragep['tasklogs'];
    if(logString){
      return angular.fromJson(logString);
    }
    return [];
  },
  save:function(logs){
    window.localStorage['tasklogs'] = angular.toJson(logs);
  },
  newLog:function(logNo,taskNo,discribe){
    return{
      taskNo:taskNo,
      logNo:logNo,
      discribe:discribe
    };
  }
 }
  })




//body  
.controller('RootCtrl',function($scope,$ionicModal,Projects,Users,taskLogs,
                                $ionicActionSheet,$state, $timeout,$ionicPopover,$ionicPopup,
                                $ionicScrollDelegate){
  
  //用户数据
  $scope.users=[
      {name:'Sue',password:'222',account:'111'},
      {name:'Jackson',password:'222',account:'112'}
      ]; 

  //项目数据
  $scope.projects = [{
    PNo:'0',
    PCreater:'Sue',
    Ptitle:'学习项目1',
    Pstages:[ 
        {stageNo:"0",Stitle:'第一阶段'},
        {stageNo:"1",Stitle:"第二阶段"},
        {stageNo:"2",Stitle:'第三阶段'} ],
    Pteam:[
        {teamNo:'0',name:'Jackson'},
        {teamNo:'1',name:'Marry'},
        {teamNo:'2',name:'Sue'},
        {teamNo:'3',name:'Demon'},

        {teamNo:'4',name:'Jey'} ],
    Ptasks:[
        {taskNo:'0',title:'Read1',discribe:"read1 the javascript book",stage:"第一阶段",owner:'Sue',state:'todo'},
        {taskNo:'1',title:'Read2',discribe:"read2 the javascript book",stage:"第二阶段",owner:'Sue',state:'doing'},
        {taskNo:'2',title:'Write1',discribe:"Write1 the javascript book",stage:"第一阶段",owner:'Jackson',state:'todo'},
        {taskNo:'3',title:'Write2',discribe:"Write2 the javascript book",stage:"第二阶段",owner:'Jackson',state:'doing'},
        {taskNo:'4',title:'Speak2',discribe:"Speak2 the javascript book",stage:"第二阶段",owner:'Demon',state:'done'},
        {taskNo:'5',title:'Speak1',discribe:"Speak1 the javascript book",stage:"第一阶段",owner:'Demon',state:'todo'},
        {taskNo:'6',title:'Note1',discribe:"Note1 the javascript book",stage:"第一阶段",owner:'Marry',state:'doing'},
        {taskNo:'7',title:'Note2',discribe:"Note2 the javascript book",stage:"第二阶段",owner:'Marry',state:'done'},
        {taskNo:'8',title:'Listen1',discribe:"Listen1 the javascript book",stage:"第三阶段",owner:'Jey',state:'todo'},
        {taskNo:'9',title:'Listen2',discribe:"Listen2 the javascript book",stage:"第三阶段",owner:'Jey',state:'doing'}
        ]
   },{
    PNo:'1',
    PCreater:'Jackson',
    Ptitle:'测试项目',
    Pstages:[ 
        {stageNo:"0",Stitle:'第一阶段'},
        {stageNo:"1",Stitle:"第二阶段"},
        {stageNo:"2",Stitle:'第三阶段'} ],
    Pteam:[
        {teamNo:'0',name:'Jackson'},
        {teamNo:'1',name:'Marry'},
        {teamNo:'2',name:'Sue'}],
    Ptasks:[
        {taskNo:'0',title:'Read1',discribe:"read1 the javascript book",stage:"第一阶段",owner:'Sue',state:'todo'},
        {taskNo:'1',title:'Read2',discribe:"read2 the javascript book",stage:"第二阶段",owner:'Sue',state:'doing'},
        {taskNo:'2',title:'Write1',discribe:"Write1 the javascript book",stage:"第一阶段",owner:'Jackson',state:'todo'},
        {taskNo:'3',title:'Write2',discribe:"Write2 the javascript book",stage:"第二阶段",owner:'Jackson',state:'doing'}, 
        {taskNo:'6',title:'Note1',discribe:"Note1 the javascript book",stage:"第一阶段",owner:'Marry',state:'doing'},
        {taskNo:'7',title:'Note2',discribe:"Note2 the javascript book",stage:"第三阶段",owner:'Marry',state:'done'}
        ]
   },

   ];



   //active project
  //task 日志
  $scope.taskLogs = [
      {logNo:'0',taskNo:'0',discribe:'x年x月x日 这个项目被创建'},
      {logNo:'9',taskNo:'0',discribe:'x年x月x日 这个项目被修改'},
      {logNo:'1',taskNo:'1',discribe:'x年x月x日 这个项目被创建'},
      {logNo:'2',taskNo:'2',discribe:'x年x月x日 这个项目被创建'},
      {logNo:'3',taskNo:'3',discribe:'x年x月x日 这个项目被创建'},
      {logNo:'4',taskNo:'4',discribe:'x年x月x日 这个项目被创建'},
      {logNo:'5',taskNo:'5',discribe:'x年x月x日 这个项目被创建'},
      {logNo:'6',taskNo:'6',discribe:'x年x月x日 这个项目被创建'},
      {logNo:'7',taskNo:'7',discribe:'x年x月x日 这个项目被创建'},
      {logNo:'8',taskNo:'8',discribe:'x年x月x日 这个项目被创建'},
      ];
  
 //msgProject  项目通知 
    //msgNo:消息编号（唯一）,
    //attr:属性，1 ：其他通知，0：项目通知
    //msgRead: 1 ：已读， 0 ：未读
    //msgPtitle：所属项目
    //msgTitle：通知名称
    //msgContent:通知内容
    //msgDate:通知时间
  $scope.msgNotice = [
    {msgNo:'0',Attr:'0',msgRead:'1',msgPtitle:'学习项目1',msgTitle:'学习项目1第一阶段任务-demon',msgContent:'这是一个学习项目',msgDate:'2014/9/1'},
    {msgNo:'1',Attr:'0',msgRead:'1',msgPtitle:'学习项目1',msgTitle:'学习项目1第一阶段任务-jey',msgContent:'这是一个学习项目',msgDate:'2014/9/1'},
    {msgNo:'2',Attr:'0',msgRead:'0',msgPtitle:'学习项目1',msgTitle:'学习项目1第一阶段任务-demon',msgContent:'这是一个学习项目',msgDate:'2014/9/1'},
    {msgNo:'3',Attr:'0',msgRead:'0',msgPtitle:'学习项目1',msgTitle:'学习项目1第一阶段任务-jackson',msgContent:'这是一个学习项目',msgDate:'2014/9/1'},
    {msgNo:'4',Attr:'0',msgRead:'0',msgPtitle:'学习项目1',msgTitle:'学习项目1第一阶段任务-jey',msgContent:'这是一个学习项目',msgDate:'2014/9/1'},
    {msgNo:'5',Attr:'0',msgRead:'0',msgPtitle:'测试项目',msgTitle:'测试项目1第一阶段任务-jackson',msgContent:'这是一个测试项目',msgDate:'2014/9/1'},
    {msgNo:'6',Attr:'0',msgRead:'0',msgPtitle:'测试项目',msgTitle:'测试项目1第一阶段任务-jackson',msgContent:'这是一个测试项目',msgDate:'2014/9/1'},
    {msgNo:'7',Attr:'0',msgRead:'1',msgPtitle:'测试项目',msgTitle:'测试项目1第一阶段任务-marry',msgContent:'这是一个测试项目',msgDate:'2014/9/1'},
    {msgNo:'8',Attr:'0',msgRead:'0',msgPtitle:'测试项目',msgTitle:'测试项目1第一阶段任务-sue',msgContent:'这是一个测试项目',msgDate:'2014/9/1'},
    {msgNo:'9',Attr:'0',msgRead:'1',msgPtitle:'测试项目',msgTitle:'测试项目1第一阶段任务-sue',msgContent:'这是一个测试项目',msgDate:'2014/9/1'},
    {msgNo:'10',Attr:'1',msgRead:'0',msgPtitle:'九九平台',msgTitle:'系统通知1',msgContent:'欢迎大家使用这个app',msgDate:'2014/9/1'},
    {msgNo:'11',Attr:'1',msgRead:'0',msgPtitle:'九九平台',msgTitle:'系统通知2',msgContent:'大家好',msgDate:'2014/9/1'},
    {msgNo:'12',Attr:'1',msgRead:'0',msgPtitle:'九九平台',msgTitle:'系统通知3',msgContent:'系统正在升级，请耐心等待',msgDate:'2014/9/1'},
    {msgNo:'13',Attr:'1',msgRead:'1',msgPtitle:'九九平台',msgTitle:'升级通知',msgContent:'系统已经升级完毕，请使用',msgDate:'2014/9/1'},
    {msgNo:'14',Attr:'1',msgRead:'1',msgPtitle:'九九平台',msgTitle:'更新通知',msgContent:'系统正在进行更新',msgDate:'2014/9/1'}
    ];

  //init 
  $scope.activeProject = "";
  $scope.activeUser = "";
  $scope.activeMember="";
  $scope.activeStage = "";
  $scope.activeTask = "";



// $scope.myUser = $scope.activeProject.Pteam[2];


//modal , newPersonalTask --------tab,progress
  $ionicModal.fromTemplateUrl('templates/newPersonalTask.html',function(modal){
    $scope.taskModal1=modal;
  },{
     scope:$scope,
     animation:'slide-left-right' 
  });

//modal , newStageTask --------tab,progress
  $ionicModal.fromTemplateUrl('templates/newStageTask.html',function(modal){
    $scope.taskModal2=modal;
  },{
     scope:$scope,
     animation:'slide-left-right' 
  });

//modal , taskDetail -----tab,progress 
  $ionicModal.fromTemplateUrl('templates/taskDetail.html',function(modal){
    $scope.detailModal=modal;
  },{
     scope:$scope,
     animation:'slide-left-right' 
  });

//modal , msgNotice-----home-icon,home
  $ionicModal.fromTemplateUrl('templates/msgNotice.html',function(modal){
    $scope.msgModal = modal ;
  },{
    scope:$scope,
    animation:'slide-left-right'
  })

//modal , msgDetail ----home,msgNotice 
  $ionicModal.fromTemplateUrl('templates/msgDetail.html',function(modal){
    $scope.msgDetailModal = modal ;
  },{
    scope:$scope,
    animation:'slide-in-up'
  });
  

//method , functions about projectDetail  common  
  
  //project 左滑动--progress
  //chat 右滑动--progress
  $scope.toProgress = function(){
   $scope.MyTask($scope.activeUser);
    $state.go('tabs.progress2');

  }
 
  //progress 右滑动-- project
  $scope.toProject  = function(){
    $scope.activeStage = "";
    $scope.activeMember = "";
    $state.go('tabs.project');
  }


//method , refresh tasks (待修改)
  $scope.doRefresh = function(){
      $http.get('/new-items')
      .success(function(newtasks){
        $scope.activeProject.Ptasks = newTasks;
      })
      .finally(function(){
        $scope.$broadcase('scroll.refreshComplete');
      });
   }



  //阻止事件冒泡
  $scope.stopProp = function(){
     $event.stopPropagation();
    
 }

 //返回home页面
 $scope.backHome = function(){
  $state.go('home');
 // alert($scope.activeUser.name);
 }

//method , functions about chat
 
 //返回project 
  $scope.backProject = function(){
   $state.go('tabs.project');
  }


 //添加信息(chat)
  $scope.addNew = function() {
    // Add new data
    
    // Resize the scroll area
    $ionicScrollDelegate.resize();

    // Update the frosted glass system
    $ionicFrostedDelegate.update();

    // If you wish, scroll to the bottom of the scroll box to show the new content
    $timeout(function() {
      $ionicScrollDelegate.scrollBottom(true);
    }, 1);
  }

//method , functions about login , signup
  //登陆
  $scope.login = function(user){
    for(var i= 0; i <$scope.users.length ; i++){
      if(user.account == $scope.users[i].account && user.password == $scope.users[i].password){
             $scope.activeUser = $scope.users[i];
             $state.go('home');
             break ;
      }
    }
      if($scope.activeUser == ""){
        alert("Your account or password is wrong . ");
      }
  }

  //跳转到注册页面
    $scope.toSign = function(){
      $state.go("sign-in");
    }

  //注册
  $scope.signup = function(user){
    var newUser =Users.newUser(user);
    $scope.users.push(newUser);
    Users.save($scope.users);

    $state.go('login'); 
  }  

//method, functions about home 
   
  //选中的项目
   $scope.selectProject = function(project){
   Projects.setActiveIndex_Project(project.PNo);
   $scope.activeProject = $scope.projects[Projects.getActiveIndex_Project()];
    //  alert($scope.activeProject.Ptitle);
    //  alert($scope.activeUser.name);
     }

  //sheet,弹出home菜单
   $ionicPopover.fromTemplateUrl('home-Icon.html', {
    scope: $scope,
    }).then(function(popover) {
    $scope.homeMenu = popover;
   
    });
   $scope.openMenu = function($event) {
      $scope.homeMenu.show($event);   //显示toolbat
      $event.stopPropagation();    //阻止事件冒泡

    };
   $scope.closeMenu = function() {
    $scope.homeMenu.hide();
    };
  //显示有未读通知
    $scope.isMsgRead = 1; 
  
  //新建项目
    $scope.newProject = function(){
      $scope.closeMenu();  //关闭菜单

       var projectTitle = prompt("New Project Name:");
    if(projectTitle){
      var PNo = $scope.projects.length ;
      var PCreater = $scope.activeUser.name;
      var Ptitle = projectTitle ; 
      var newProject = Projects.newProject(PNo,PCreater,Ptitle);
       $scope.projects.push(newProject);
       Projects.saveProject($scope.projects);
      
       }

        //添加member
        var teamNo = newProject.Pteam.length;
        var newMember  = Projects.newMember(teamNo,PCreater);
        $scope.projects[PNo].Pteam.push(newMember);
        Projects.saveMember(newMember);
    }

  //打开通知
   $scope.openNotice = function(){

    $scope.msgModal.show();


    $scope.isMsgRead = 0;
   }  
  //关闭通知
   $scope.closeNotice = function(){
    $scope.msgModal.hide();
   }

  //退出app
   $scope.reLogin = function(){
     $scope.closeMenu();  //关闭菜单

      var confirmPopup = $ionicPopup.confirm({
        title:'Are u sure to Exit ?'
      });
      confirmPopup.then(function(res){
        if(res){
        //  alert('退出');
           $state.go('login');
           $scope.activeUser = "";
           $scope.activeProject="";
         }else{
           // alert('不退出');
         }
      });
   } 

  //通知
   $scope.MsgNotice = function(){
    $scope.closeMenu();
    $scope.openNotice();
    
    }
  //查看具体通知
   $scope.selectMsg = function(msg){
    $scope.activeMsg = msg;
   // alert($scope.activeMsg.msgRead);
     $scope.msgDetailModal.show();  //打开具体通知页
   }

  //关闭具体通知页
   $scope.closeMsgDetail = function(){
    $scope.msgDetailModal.hide();
    //修改阅读状态
    if($scope.activeMsg.msgRead){
      if($scope.activeMsg.msgRead =="0"){
        $scope.activeMsg.msgRead = 1;
      }
    }
    //  alert($scope.activeMsg.msgRead);
    }
 

//method , functions about newStage
  //override , createStage  
  var createStage = function(stageTitle){
    var stageNo = $scope.activeProject.Pstages.length ;
    var newStage = Projects.newStage(stageNo,stageTitle);
    $scope.activeProject.Pstages.push(newStage);
    Projects.saveStage($scope.activeProject.Pstages);
    $scope.manageModal2.hide();

  };

  $scope.openNewStage = function($event){
  //   $scope.show2.hide();
    var stageTitle = prompt("New Stage Name:");
    if(stageTitle){
      createStage(stageTitle);
    }

    //阻止事件冒泡
    $event.stopPropagation();
  };


//method ,functions about newTask
  $scope.createTask = function(task){
    if($scope.activeStage){
       task.stage = $scope.activeStage.Stitle;
    }
    if($scope.activeMember){
        task.owner = $scope.activeMember.name;
    }
      //创建新任务
    var taskNo = $scope.activeProject.Ptasks.length; 
    var newTask = Projects.newTask(taskNo,task.title,task.discribe,task.stage,task.owner,task.state);  
    $scope.activeProject.Ptasks.push(newTask);
    Projects.saveTask($scope.activeProject.Ptasks);


      $scope.taskModal1.hide();
      $scope.taskModal2.hide();
      
      //创建新log
      var logNo = $scope.taskLogs.length;
      var discribe = newTask.title + "被" +$scope.activeUser.name + "创建" ; 
      var newCreateLog = taskLogs.newLog(logNo,taskNo,discribe);
      $scope.taskLogs.push(newCreateLog);
      taskLogs.save($scope.taskLogs);


      //置空
      task.title="";
      task.discribe="";
      task.stage="";
      task.owner = "";
     
   
   }

  $scope.openNewPersonalTask  = function(){
    $scope.taskModal1.show();
  }
  $scope.closeNewPersonalTask = function(){
    $scope.taskModal1.hide();
  }

  $scope.openNewStageTask  = function(){
    $scope.taskModal2.show();
  }
  $scope.closeNewStageTask = function(){
    $scope.taskModal2.hide();
  }


//method ,functions about project

 //显示manage2  sheet
  $scope.show2 = function(){
    var hideSheet = $ionicActionSheet.show({
        buttons:[{text:'Add New Satge'},{text:'Invite New Member'},{text:'Exit the Project'}],
    cancelText:'Cancel',
    cancel:function(){
    },
    buttonClicked : function(index){
      if(index == 0){

        hideSheet();
        var stageTitle = prompt("New Stage Name:");
        if(stageTitle){
           createStage(stageTitle);
        }
      
      }else if(index == 1){
        alert('invite new member is clicked');
      }else if (index == 2){
       //退出项目
     //  $scope.reLogin = function(){
        var confirmPopup = $ionicPopup.confirm({
        title:'Are u sure to exit this program ?'
      });
      confirmPopup.then(function(res){
        if(res){
          for(var i=0 ; i<$scope.activeProject.Pteam.length;i++){
             if($scope.activeProject.Pteam[i].name == $scope.activeUser.name){
                 $scope.activeProject.Pteam.splice($scope.activeProject.Pteam[i].teamNo,1); 
             }
             $state.go('home');
       }
            
         }else{
           // alert('不退出');
         }
      });
  
      }else {
        alert('there are some errors ...');
      }
  
      return true;  //关闭sheet ,false 保持sheet打开
    }

     });
   };3

  //删除操作 , 删除阶段  --连接数据库后需要修改
  $scope.onItemDelete = function(index){
     $ionicPopup.show({
      title:'Confirm Delete',
     subTitle:'Are you sure to delete this stage?',
     scope:$scope,
     buttons:[
        {text:'Cancel'},
        {text:'Yes',
         type:'button-positive',
         onTap:function(stage){

           $scope.activeProject.Pstages.splice(index, 1);  //删除
         }
        }
     ]
     }).then(function(res){
      if(res){
        console.log('you are sure');
      }else{
        console.log('you are not sure');
      }
     });

    };
 
  //阶段列表，默认展开
  $scope.stageShow = true ; 
  //团队成员列表，默认展开
  $scope.memberShow  = true ;
  //阶段列表，展开或隐藏
  $scope.hideStage = function(){
      $scope.stageShow  = !$scope.stageShow;
    }
  $scope.hideMember = function(){
      $scope.memberShow = !$scope.memberShow;
    }

  //我的任务
  $scope.MyTask = function(user){
      for(var i=0 ; i<$scope.activeProject.Pteam.length;i++){
        if($scope.activeProject.Pteam[i].name == user.name){
           $scope.selectMember($scope.activeProject.Pteam[i]);
        }
      }
  
     }

  //当前选中成员
  $scope.selectMember = function(member){
    $scope.activeStage = "" ; //将之前选择过得activeStage置空

    $scope.activeMember = member ; 
    Projects.setActiveIndex_Member(member.teamNo);
    $scope.activeMember = $scope.activeProject.Pteam[Projects.getActiveIndex_Member()];

     $state.go('tabs.progress2');  //跳转到progress2
   };

    //当前选中阶段
  //当前选中阶段
  $scope.selectStage = function(stage){
    $scope.activeMember = "";  //将之前选择过得activeMember置空

    $scope.activeStage = stage ; 
    Projects.setActiveIndex_Stage(stage.stageNo);
    $scope.activeStage = $scope.activeProject.Pstages[Projects.getActiveIndex_Stage()];

    $state.go('tabs.progress1'); //跳转到progress1
  
   }

//method ,functions about progress 
  
 // 改选阶段
  $scope.changeStage = function(stage){
    $scope.activeStage  = stage ;
  }

  // //监控activeStage的改变
  // $scope.$watch('selected',function(){
  //   alert('activeStage 已经改变成'+$scope.activeStage.Stitle);
  // },true);
  
  //改变任务状态
   $ionicPopover.fromTemplateUrl('progress-Icon.html', {
    scope: $scope,
    }).then(function(popover) {
    $scope.popover = popover;
    });
   $scope.openPopover = function(task , $event) {
      $scope.popover.show($event);   //显示toolbat
      $event.stopPropagation();    //阻止事件冒泡

      //绑定activeTask
      Projects.setActiveIndex_Task(task.taskNo);
      $scope.activeTask = $scope.activeProject.Ptasks[Projects.getActiveIndex_Task()];  

    };
   $scope.closePopover = function() {

    $scope.popover.hide();
    };
  
    //选择icon,修改task状态
  $scope.updateTaskState = function(stateString){
      $scope.activeTask.state = stateString; 
      $scope.closePopover();   //更改完状态后关闭pop
  }



//method,functions about  taskDetail
  // openDetail
  $scope.selectTask = function(task){
    $scope.activeTask = task ; 
    Projects.setActiveIndex_Task(task.taskNo);
    $scope.activeTask = $scope.activeProject.Ptasks[Projects.getActiveIndex_Task()];

     $scope.detailModal.show();//打开taskDetail页面
  }


  $scope.closeDetail = function(){
    $scope.detailModal.hide();
  }

  //更新task
  $scope.updateTaskMsg = function(task){

     Projects.saveTask($scope.activeProject.Ptasks);

     $scope.detailModal.hide();

  }




})

