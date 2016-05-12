'use strict';

/**
 * @ngdoc function
 * @name tixApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tixApp
 */
angular.module('tixApp')
  .controller('MainCtrl', function ($scope,$pusher,$interval,$http,LINKS,$timeout) {
    
    var client = new Pusher('2be55f84069c8f50ee29');
    var pusher = $pusher(client);
    
    var tix = pusher.subscribe('tix');
    

    
    
    tix.bind('support', function(data){
        
        $scope.expiredclients = data.expiredClients;
        
        $scope.expiringclients = data.expiringClients;
        
    });
    
    tix.bind('tickets', function(data){
        
            $scope.stats = null;
        
            $scope.stats = [
            {
                number: data.open,
                title: 'Open Tickets'
            },
            {
                number: data.unassigned,
                title: 'Unassigned'
            },
            {
                number: data.critical,
                title: 'Critical'
            },
            {
                number: data.stale,
                title: 'Stale'
            },
            {
                number: data.opened,
                title: 'Opened'
            },
            {
                number: data.closed,
                title: 'Closed'
            },
            {
                number: data.workorders.pending,
                title: 'Pending W/O'
            },
            {
                number: data.workorders.approved,
                title: 'Approved W/O'
            }
        ];
        
    });
    
    tix.bind('techs', function(data){
        $scope.techs = null;
        $scope.techs = data;
    });
    
    tix.bind('newsletter', function(data){
        $scope.newsletterSubs = {};
        $scope.newsletterSubs.count = data.count;
        $scope.newsletterSubs.percent = data.count * 100 / 50;
    });
    
//    tix.bind('comments2', function(data){
//        $scope.comment = false;
//        $scope.comment = true;
//        $scope.Name = data.Name;
//        $scope.Preview = data.Preview;
//        $scope.Subject = data.Subject;
//        $scope.Date = data.Date;
//    });
    
    $timeout(function(){
        $http.get(LINKS.url+'/tv/newsletter');
    },1000)
    
    $timeout(function(){        
        $http.get(LINKS.url+ '/tv/tickets')
        .success(function(){

        })
        .error(function(){

        });    
    }, 0);
    
    $timeout(function(){
        $http.get(LINKS.url+ '/tv/support')
        .success(function(){

        })
        .error(function(){

        }); 
    }, 5000);
    
    $timeout(function(){
        $http.get(LINKS.url+ '/tv/techs')
        .success(function(){

        })
        .error(function(){

        });
    }, 10000);
    
    $timeout(function(){
        $http.get(LINKS.url+ '/tv/comments')
        .success(function(){

        })
        .error(function(){

        });
    }, 10000);
    
    $interval(function(){
        $http.get(LINKS.url+ '/tv/tickets')
        .success(function(){
            
        })
        .error(function(){
            
        });
    },20000);    
    
    $interval(function(){
        $http.get(LINKS.url+ '/tv/techs')
        .success(function(){
            
        })
        .error(function(){
            
        });
    },30000);
    
    $interval(function(){
        $http.get(LINKS.url+ '/tv/support')
        .success(function(){
            
        })
        .error(function(){
            
        });
    },60000);
    
    $interval(function(){
        $http.get(LINK.url+'/tv/newsletter');
    },60000)
    

    
  });
