import { requestWithToken } from "../utils/useRequestHelper.js";
import { formatPrice } from "../utils/formatPrice.js";
import { checkAuth } from "../utils/checkAuth.js";

await checkAuth()

window.addEventListener('scroll', function () {
  const navbar = document.querySelector('#navbar');
  const scrollTop = window.scrollY;

  if (scrollTop > 0) {
    navbar.classList.add('navbar-fixed');
  } else {
    navbar.classList.remove('navbar-fixed');
  }
});

const userInfo = JSON.parse(localStorage.getItem("userInfo"))

const cartIcon = document.getElementById("cart_link")
const loginIcon = document.getElementById("login_link")
const profileIcon = document.getElementById("profile_link")
const logoutIcon = document.getElementById("logout_link")

profileIcon.innerHTML = userInfo.id ? `
  <i class="fas fa-user"></i>
  ${userInfo.name}
  ` : ""

cartIcon.style.display = userInfo.id ? "inline-block" : "none"
loginIcon.style.display = userInfo.id ? "none" : "inline-block"
profileIcon.style.display = userInfo.id ? "inline-block" : "none"
logoutIcon.style.display = userInfo.id ? "inline-block" : "none"

userForm.name.value = userInfo.name

const handleLogout = () => {
  localStorage.setItem("userInfo", JSON.stringify({}))
  localStorage.setItem("accessToken", "")
  document.location = "/logn_in/login.html"
}

const resUserOrders = await requestWithToken({
  url: "orders/user",
  clientId: userInfo.id,
  token: localStorage.getItem('accessToken'),
  method: "GET"
})

const handleUpdateUsernameInfo = async () => {
  const res = await requestWithToken({
    url: "auth/change-name",
    clientId: userInfo.id,
    token: localStorage.getItem('accessToken'),
    body: JSON.stringify({
      newUsername: userForm.name.value
    }),
    method: "PATCH"
  })

  return res
}

const handleUpdateUserPasswordInfo = async () => {
  const res = await requestWithToken({
    url: "auth/change-password",
    method: "PATCH",
    clientId: userInfo.id,
    token: localStorage.getItem('accessToken'),
    body: JSON.stringify({
      currPassword: userForm.oldPassword.value,
      newPassword: userForm.newPassword.value
    })
  })

  return res
}

const handleChangeUserInfo = async () => {
  const promises = []
  let isValid = true
  const updateField = {
    userName: false,
    password: false,
  }
  if (userForm.name.value !== userInfo.name) {
    promises.push(handleUpdateUsernameInfo())
    updateField.userName = true
  }

  if (userForm.oldPassword.value && userForm.newPassword.value) {
    if (userForm.newPassword.value.trim() !== userForm.confirmNewPassword.value.trim()) {
      console.log("Mật khẩu không khớp");
      isValid = false
    } else {
      promises.push(handleUpdateUserPasswordInfo())
      updateField.password = true
    }
  }

  if (isValid) {
    try {
      await Promise.all(promises)
      if (updateField.password) {
        localStorage.setItem("userInfo", JSON.stringify({}))
        localStorage.setItem("accessToken", "")
        document.location = "/logn_in/login.html"
      } else {
        const currUserInfo = JSON.parse(localStorage.getItem("userInfo"))
        const newUserInfo = {
          ...currUserInfo,
          name: userForm.name.value
        }
        localStorage.setItem("userInfo", JSON.stringify(newUserInfo))
      }
    } catch (error) {
      console.log(error);
    }
  }
}

const showOrders = (orders) => {
  let html = "";
  let d = 0;
  for (let i = 0; i < orders.length; i++) {
    d++
    html += "<tr>";
    html += "<td>" + d + "</td>";
    html += "<td>" + orders[i].trackingNumber + "</td>";
    html += "<td>" + `${orders[i].shippingVendor === "GHTK" ? 'Giao hàng tiết kiệm' : 'Viettel Post'}` + "</td>";
    // html += "<td >" + orders[i].shippingVendor === "GHTK" ? 'Giao hàng tiết kiệm' : 'Viettel Post' + "</td>";
    html += "<td>" + orders[i].status + "</td>";
    html += "<td>" + formatPrice(orders[i].totalPayment) + "</td>";
    html += "<td>" + orders[i].createdAt + "</td>";
    if (orders[i].status === "PROCESSING") {
      html += "<td>" + `<button onclick='handleCancelOrder("${orders[i]._id}")' style='border: none; padding: 6px 28px; border-radius: 8px; background: red; color: #fff'>Huỷ</button>` + "</td>";
    } else {
      html += "<td>" + `<p>-</p>` + "</td>";
    }
    html += "</tr>";
  }
  console.log({html}, document.getElementById("tbl"));
  document.getElementById("tbl").innerHTML = html;
}

const handleCancelOrder = async (orderId) => {
  try {
    const res = await requestWithToken({
      url: `orders/${orderId}`,
      clientId: userInfo.id,
      token: localStorage.getItem('accessToken'),
      body: JSON.stringify({ status: "CANCELED" }),
      method: "PATCH"
    })
  
    const resNewUserOrders = await requestWithToken({
      url: "orders/user",
      clientId: userInfo.id,
      token: localStorage.getItem('accessToken'),
      method: "GET"
    })
    if (!res.Error) {
      showOrders(resNewUserOrders.data)
    }
  } catch (error) {
    console.log(error);
  }

}

showOrders(resUserOrders.data)
// var Product = [
//   {
//     id: 1,
//     name: "Phở",
//     price: "30.000",
//     quantity: "1",
//     total: "100000",
//     time: "17/04/2024",
//   },
//   {
//     id: 2,
//     name: "Phở",
//     price: "30.000",
//     quantity: "1",
//     total: "100000",
//     time: "17/04/2024",
//   },
// ];

// function showProducts() {
//   var html = "";
//   var d = 0;
//   for (var i = 0; i < Product.length; i++) {
//     d++;
//     html + "<tr>";
//     html += "<td>" + d + "</td>";
//     html += "<input type='hidden' value='" + i + "' id='editIndex'>";
//     html += "<td>" + Product[i].name + "</td>";
//     html += "<td >" + Product[i].price + "</td>";
//     html += "<td>" + Product[i].quantity + "</td>";
//     html += "<td>" + Product[i].total + "</td>";
//     html += "<td>" + Product[i].time + "</td>";
//     html += "</tr>";
//   }
//   document.getElementById("tbl").innerHTML = html;
// }
// function updateProfile() {
//   var indexToUpdate = parseInt(document.getElementById("editIndex").value);
//   var newName = document.getElementById("newName").value;
//   var newEmail = document.getElementById("newEmail").value;
//   var oldPassword = document.getElementById("oldPassword").value;
//   var newPassword = document.getElementById("newPassword").value;

//   Proflie[indexToUpdate].name = newName;
//   Proflie[indexToUpdate].email = newEmail;
//   Proflie[indexToUpdate].madeIn = oldPassword;
//   Proflie[indexToUpdate].price = newPassword;
//   document.getElementById("editProfile").style.display = "none";
// }

document.handleChangeUserInfo = handleChangeUserInfo
document.handleCancelOrder = handleCancelOrder
document.showOrders = showOrders
document.handleLogout = handleLogout