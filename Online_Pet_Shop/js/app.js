//khai báo ứng dụng Angular với tên 'myApp'
var app=angular.module("myApp",["ngRoute"]);
//tạo ứng dụng có định tuyến và tạo các định tuyến
app.config(function($routeProvider){
    $routeProvider
    .when("/home",{
        templateUrl:"layout/home.html?"+Math.random()
    })
    .when("/shop",{
        templateUrl:"layout/shop.html?"+Math.random()
    })
    .when("/cart",{
      templateUrl:"layout/cart.html?"+Math.random()
    })
    .when("/thanhtoan",{
      templateUrl:"layout/thanhtoan.html?"+Math.random()
    })
    .when("/contact",{
      templateUrl:"layout/contact.html?"+Math.random()
    })
    .otherwise({redirectTo:"/home"});
});

//thêm controller 'myCtrl' vào ứng dụng 'myApp'
app.controller("myCtrl", function ($scope, $http) {

    //function thêm vào giỏ hàng
    $scope.carts = [];
    $scope.addcart = (prd) => {
      if (prd) {
        $scope.carts.push({ 
          id: prd.id, 
          name: prd.name,
          img: prd.img,
          price: prd.price });
      }//end if
    }//end thêm vào giỏ hàng

    //function tính tổng tiền
    $scope.total = 0;
    $scope.setTotals = (item) => {
      if (item) {
        $scope.total += item.price;
      }//end if
    }//end function tính tổng tiền


    //function xóa sản phẩm trong giỏ hàng
    $scope.removeCart = (item) => {
      if (item) {
        $scope.carts.splice($scope.carts.indexOf(item), 1);
        $scope.total -= item.price;
      }//end if
    }//end function xóa sản phẩm trong giỏ hàng
  
    //function sắp xếp sản phẩm theo giá
    $scope.col = 'price';
    $scope.flag = false;
    $scope.sortBy = function (col, flag) {
      $scope.col = col;
      $scope.flag = flag;
    }//end function sắp xếp sản phẩm theo giá
  
    //function lấy (hiển thị) sản phẩm
    $scope.products = [];
    $http.get("products.json")
      .then(function (response) {
        $scope.products = response.data;
        $scope.pageCount = Math.ceil($scope.products.length / $scope.pageSize);
    });//end function lấy (hiển thị) sản phẩm
  
    //phân trang
    $scope.begin = 0;
    $scope.pageSize = 6;
  
    //hiển thị sản phẩm trang đầu 
    $scope.first = function () {
      $scope.begin = 0
    }//end hiển thị sản phẩm trang đầu 
  
    //hiển thị sản phẩm trang trước
    $scope.previous = function () {
      if ($scope.begin > 0)
        $scope.begin -= $scope.pageSize;
    }//end hiển thị sản phẩm trang trước
  
    //hiển thị sản phẩm trang tiếp theo
    $scope.next = function () {
      if ($scope.begin < ($scope.pageCount - 1) * $scope.pageSize) {
        $scope.begin += $scope.pageSize;
      }//end if
    }//end hiển thị sản phẩm trang tiếp theo
  
    //hiển thị sản phẩm trang cuối cùng
    $scope.last = function () {
      $scope.begin = ($scope.pageCount - 1) * $scope.pageSize
    }//end hiển thị sản phẩm trang cuối cùng
  })
  
