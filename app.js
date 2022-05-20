const $buttons = document.querySelectorAll(".btn"),
  $carrito = document.querySelector("#carrito"),
  $template = document.querySelector("#template"),
  fragment = document.createDocumentFragment();
const carritoObj = [];

const agregarAlCarrito = (e) => {
  console.log(e.target.dataset.fruta);
  const producto = {
    id: e.target.dataset.fruta,
    name: e.target.dataset.fruta,
    cantidad: 1,
  };
  const index = carritoObj.findIndex((item) => item.id === producto.id);
  console.log(index);
  if (index === -1) {
    carritoObj.push(producto);
  } else {
    carritoObj[index].cantidad++;
  }
  console.log(carritoObj);
  pintarProducto(carritoObj);
};

const pintarProducto = (array) => {
  $carrito.textContent = "";
  array.forEach((item) => {
    const clone = $template.content.firstElementChild.cloneNode(true);
    clone.querySelector(".lead").textContent = item.name;
    clone.querySelector(".badge").textContent = item.cantidad;
    fragment.appendChild(clone);
  });
  $carrito.appendChild(fragment);
};

$buttons.forEach((btn) => {
  btn.addEventListener("click", agregarAlCarrito);
});
