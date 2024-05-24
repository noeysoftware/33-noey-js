document.addEventListener("DOMContentLoaded", function () {
  const errorMessage = document.getElementById("errorMessage");
  const inputForm = document.getElementById("inputForm");

  let displayedProduct = [];
  let currentID = displayedProduct.length;

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
    inputForm.reset();
  });
});
