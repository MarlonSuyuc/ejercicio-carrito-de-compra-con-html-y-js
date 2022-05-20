const $buttons = document.querySelectorAll(".btn"),
  $carrito = document.querySelector("#carrito"),
  $template = document.querySelector("#template"),
  fragment = document.createDocumentFragment();
const carritoObj = {};

const agregarAlCarrito = (e) => {
  // console.log(e.target.dataset.fruta);
  const producto = {
    id: e.target.dataset.fruta,
    name: e.target.dataset.fruta,
    cantidad: 1,
  };
  if (carritoObj.hasOwnProperty(producto.name)) {
    producto.cantidad = carritoObj[producto.name].cantidad + 1;
  }

  carritoObj[producto.name] = producto;
  console.log(carritoObj);
  pintarProducto();
};

const pintarProducto = () => {
  $carrito.textContent = "";
  Object.values(carritoObj).forEach((item) => {
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
