window.addEventListener('scroll', function () {
    const navbar = document.querySelector('#navbar');
    const scrollTop = window.scrollY;

    if (scrollTop > 0) {
        navbar.classList.add('navbar-fixed');
    } else {
        navbar.classList.remove('navbar-fixed');
    }
});

const handleChangeStep = (step) => {
    switch (step) {
        case 1:
            document.getElementById("info").classList.add("active")
            document.getElementById("payment").classList.remove("active")
            document.getElementById("first-step").classList.add("active")
            document.getElementById("last-step").classList.remove("active")
            break;
        case 2:
            document.getElementById("payment").classList.add("active")
            document.getElementById("info").classList.remove("active")
            document.getElementById("first-step").classList.remove("active")
            document.getElementById("last-step").classList.add("active")
            
            break;
        default:
            break;
    }
}

const handleChangeShippingVendor = (vendorCode) => {
    switch (vendorCode) {
        case "GHTK":
            document.getElementById("GHTK").classList.add("active")
            document.getElementById("VT").classList.remove("active")
            break;
        case "VT":
            document.getElementById("VT").classList.add("active")
            document.getElementById("GHTK").classList.remove("active")
            break;
        default:
            break;
    }
}