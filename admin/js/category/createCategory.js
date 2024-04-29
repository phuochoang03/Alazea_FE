import { request, requestWithToken } from "../../../utils/useRequestHelper.js";

const handleRenderProducts = async() => {
        const res = await requestWithToken({
            url: "products",
            clientId: localStorage.getItem("user_id"),
            token: localStorage.getItem("accessToken"),
            method: "GET",
        })
            
        const listCateCheckbox = []

        if(res.data) {
            res.data.map(cate => {
                const cateObj = {
                    name: cate.name, 
                    id: cate._id 
                }
    
                listCateCheckbox.push(cateObj)
            })
            console.log("listCateCheckbox :",listCateCheckbox)
        }
        

        const listCheckbox = document.getElementById("product")
        listCheckbox.innerHTML = "";

        listCateCheckbox.forEach(item => {
          const checkboxWrapper = document.createElement("div");
          checkboxWrapper.classList.add("form-check");
           // Add class for styling
        
          const checkbox = document.createElement("input");
          checkbox.type = "checkbox";
        //   checkbox.checked = "checked";
        //   checkbox.name = "products";
          checkbox.id = `${item.id}`; // Unique ID for each checkbox
          checkbox.value = item.id; // Set value for easier identification

          checkbox.classList.add("form-check-input"); // Add class for styling
        
          const label = document.createElement("label");
          label.classList.add("form-check-label"); // Add class for styling
          label.textContent = item.name;
          label.htmlFor = checkbox.id; // Link label to the checkbox for clicks
        
          checkboxWrapper.appendChild(checkbox);
          checkboxWrapper.appendChild(label);
        
          listCheckbox.appendChild(checkboxWrapper);
        });
        
    }

const handleCreateCategory = async () => {
    // const categoryName = createCategoryForm.categoryName.
    const selectedCheckboxValues = []; // Array to store selected checkbox values
    let checkboxes = document.getElementsByClassName('form-check');
    // const checkboxArray = Array.from(checkboxes);
    // console.log("checkboxArray: ", checkboxArray.length)
    checkboxes.forEach(checkboxDiv => {
      const checkbox = checkboxDiv.querySelector('input[type="checkbox"]');
      console.log("checkbox: ", checkbox) // Get the checkbox within each div
      // Do something with the checkbox
    });
    
    // for (let i = 0; i < checkboxArray.length; i++) {
    //     const checkboxDiv = checkboxArray[i];
    //     console.log("checkboxDiv: ", checkboxDiv); 
    //      // Get the current .form-check div
    //     const checkbox = checkboxDiv.querySelector('input[type="checkbox"]'); // Get the checkbox within the div
    //     console.log("checkbox: ", checkbox); // Log the checkbox
      
    //     // Do something with the checkbox here
    //   }
    console.log("checkboxes: ", checkboxes)
    // const listCheckboxs = [listCheckbox];
    // console.log("listCheckbox: ", listCheckboxs)

// console.log("categoryName",categoryName)
// console.log("categoryProduct",categoryProduct)


    // const data = async () => {
    //     const categoryBody = {
    //         name: categoryName,
    //         product: categoryProduct
    //     }

    //     console.log(productBody);
    
    //     const res = await requestWithToken({
    //         url: "categories",
    //         clientId: "6614e203244a9c4fe791d90d",
    //         token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjE0ZTIwMzI0NGE5YzRmZTc5MWQ5MGQiLCJpYXQiOjE3MTQxMDUxODEsImV4cCI6MTcxNDcwOTk4MX0.2H6sRfraAhWvjE74348AVQwykuTQwfjIK5tJlL1-U28",
    //         method: "POST",
    //         body: JSON.stringify(categoryBody)
    //     })
    
    //     if(!res.Error) {
    //         console.log("Vo day");
    //         window.location.href = "../../pages/forms/basic_danhmuc.html"
    //     }
    //     console.log({res});
    // }


}

handleRenderProducts()

// handleCreateCategory()
// document.handleCreateCategory = handleCreateCategory
