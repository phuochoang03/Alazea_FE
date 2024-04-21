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
