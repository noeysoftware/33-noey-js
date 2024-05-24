document.addEventListener("DOMContentLoaded", function () {
  const errorMessage = document.getElementById("errorMessage");
  const inputForm = document.getElementById("inputForm");
  const itemList = document.getElementById("itemList");
  const addToCart = document.getElementById("addToCart");
  const cartSection = document.getElementById("cartSection");
  const cartList = document.getElementById("cartList");

  let displayedProduct = [
    {
      id: 0,
      name: "Cute Cat",
      price: 500,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Cat_August_2010-4.jpg/1200px-Cat_August_2010-4.jpg",
      selected: false,
    },
    {
      id: 1,
      name: "Majestic Cat",
      price: 300,
      image:
        "https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg",
      selected: false,
    },
  ];
  let displayedCart = [];
  let currentID = displayedProduct.length;

  updateSelection(displayedProduct);

  function isImgURL(imageURL) {
    const input = new URL(imageURL);
    return /\.(jpg|jpeg|png|gif)$/.test(input.pathname);
  }
  function checkPrice(inputPrice) {
    return isFinite(inputPrice) && inputPrice >= 0;
  }
  inputForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("productName").value;
    const price = document.getElementById("productPrice").value;
    const image = document.getElementById("productImage").value;

    if (!isImgURL(image)) {
      errorMessage.innerText = "Error : Please input valid image url";
      return;
    }
    if (!checkPrice(price)) {
      errorMessage.innerText = "Error : Please input valid price";
      return;
    }
    errorMessage.innerText = "";
    const product = {
      id: currentID++,
      name: name,
      price: parseFloat(price),
      image: image,
      selected: false,
    };

    displayedProduct.push(product);
    updateSelection(displayedProduct);
    inputForm.reset();
  });

  function updateSelection(displayingProduct) {
    itemList.innerHTML = "";
    displayingProduct.forEach((product) => {
      const newItem = document.createElement("li");
      newItem.className = "flex gap-3";

      const checkBox = document.createElement("input");
      checkBox.type = "checkbox";
      if (product.selected == true) {
        checkBox.checked = true;
      } else {
        checkBox.checked = false;
      }
      checkBox.addEventListener("change", () => selected(product.id, checkBox));

      const shownImage = document.createElement("img");
      shownImage.className = "w-1/4";
      shownImage.src = product.image;

      const infoDiv = document.createElement("div");
      infoDiv.className = "flex flex-col justify-start";

      const productName = document.createElement("h3");
      productName.className = "font-bold text-xl m-0";
      productName.textContent = product.name;

      const productPrice = document.createElement("p");
      productPrice.textContent = "฿" + product.price.toFixed(2);

      infoDiv.appendChild(productName);
      infoDiv.appendChild(productPrice);

      newItem.appendChild(checkBox);
      newItem.appendChild(shownImage);
      newItem.appendChild(infoDiv);

      itemList.appendChild(newItem);
    });
  }

  function selected(selectedID, checkBox) {
    displayedProduct.find((product) => {
      if (product.id == selectedID) {
        if (checkBox.checked) {
          product.selected = true;
        } else {
          product.selected = false;
        }
      }
    });
  }

  addToCart.addEventListener("click", () => {
    displayedCart = [];
    displayedProduct.forEach((product) => {
      if (product.selected == true) {
        displayedCart.push(product);
      }
    });
    updateCart(displayedCart);
  });

  function updateCart(displayedCart) {
    if (displayedCart.length !== 0) {
      cartSection.className = "bg-white rounded-md mt-4 shadow-sm";
    } else {
      cartSection.className = "hidden";
      displayTotal.className = "hidden";
    }
    cartList.innerHTML = "";

    displayedCart.forEach((product) => {
      const newItem = document.createElement("li");
      newItem.className = "flex gap-3";

      const shownImage = document.createElement("img");
      shownImage.className = "w-1/4";
      shownImage.src = product.image;

      const infoDiv = document.createElement("div");
      infoDiv.className = "flex flex-col justify-start";

      const productName = document.createElement("h3");
      productName.className = "font-bold text-xl m-0";
      productName.textContent = product.name;

      const productPrice = document.createElement("p");
      productPrice.textContent = "฿" + product.price.toFixed(2);

      const removeButton = document.createElement("button");
      removeButton.className =
        "bg-red-400 hover:bg-red-700 text-white rounded-md px-2 w-24";
      removeButton.innerText = "Remove";
      removeButton.addEventListener("click", () => removeFromCart(product.id));

      infoDiv.appendChild(productName);
      infoDiv.appendChild(productPrice);
      infoDiv.appendChild(removeButton);

      newItem.appendChild(shownImage);
      newItem.appendChild(infoDiv);

      cartList.appendChild(newItem);
      cartList.scrollIntoView();
    });
  }

  function removeFromCart(selectedId) {
    displayedCart = displayedCart.filter(
      (product) => product.id !== selectedId
    );
    updateCart(displayedCart);
  }
});
