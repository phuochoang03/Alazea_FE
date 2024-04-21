// tạo thanh nav cố định khi di chuỷen khỏi trang đầu
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('#navbar');
    const scrollTop = window.scrollY;
  
    if (scrollTop > 0) {
      navbar.classList.add('navbar-fixed');
    } else {
      navbar.classList.remove('navbar-fixed');
    }
  });

  var Product = [
    {
      id: 1,
      name: "Phở",
      price: "30.000",
      quantity: "1",
      total: "100000",
      time: "17/04/2024",
    },
    {
      id: 2,
      name: "Phở",
      price: "30.000",
      quantity: "1",
      total: "100000",
      time: "17/04/2024",
    },
  ];



  
function showProducts() {
  var html = "";
  var d = 0;
  for (var i = 0; i < Product.length; i++) {
    d++;
    html + "<tr>";
    html += "<td>" + d + "</td>";
    html += "<input type='hidden' value='" + i + "' id='editIndex'>";
    html += "<td>" + Product[i].name + "</td>";
    html += "<td >" + Product[i].price + "</td>";
    html += "<td>" + Product[i].quantity + "</td>";
    html += "<td>" + Product[i].total + "</td>";
    html += "<td>" + Product[i].time + "</td>";
    html += "</tr>";
  }
  document.getElementById("tbl").innerHTML = html;
}




function listProducts() {
  for (let i = 0; i <= 3; i++) {
    var demo = '<div class="col-3">';
    demo += '<div class="card" style="width: 18rem; border:  none">';
    demo += '<img src="' + Product[i].image + '" class="card-img-top" style="height: 170px; width: 270px; border: none;">'; 
    // Đặt kích thước ảnh là 100% chiều rộng và 400px chiều cao
    demo += '<div class="card-body">';
    demo += '<h5 class="card-title">' + Product[i].name + '</h5>';
    demo += '<p class="card-text price-red">' + Product[i].price + 'VNĐ</p>';   
    demo += '</div>'; 
    demo += '</div>';      
    demo += '</div>';
    console.log(demo);
    document.getElementById("sanphammoi").innerHTML += demo;
  }
}

function loadProduct() {
  showProducts();
  listProducts()
}

function createProduct() {
  var n = Product.length;
  n++;
  var productName = document.getElementById("productName").value;
  var productPrice = document.getElementById("productPrice").value;
  var productQuantity = document.getElementById("productQuantity").value;
  var productQuantity = document.getElementById("productTotal").value;
  var productTime = document.getElementById("productTime").value;

  var newProduct = {
    id: n,
    name: productName,
    price: productPrice,
    quantity: productQuantity,
    total: productQuantity,
    time: productTime,
  };
  Product.push(newProduct);
  showProducts();
}

function updateProfile() {
  var indexToUpdate = parseInt(document.getElementById("editIndex").value);
  var newName = document.getElementById("newName").value;
  var newEmail = document.getElementById("newEmail").value;
  var oldPassword = document.getElementById("oldPassword").value;
  var newPassword  = document.getElementById("newPassword").value;

  Proflie[indexToUpdate].name = newName;
  Proflie[indexToUpdate].email = newEmail;
  Proflie[indexToUpdate].madeIn = oldPassword;
  Proflie[indexToUpdate].price = newPassword;
  document.getElementById("editProfile").style.display = "none";
}
