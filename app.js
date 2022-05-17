const $buttons = document.querySelectorAll(".btn"),
  $carrito = document.querySelector("#carrito"),
  $template = document.querySelector("#template"),
  fragment = document.createDocumentFragment(),
  carritoObj = {};
  
  
  const agregarFruta = (e) => {
  const fruta = {
    id: e.target.dataset.fruta,
    titulo: e.target.dataset.fruta,
    cantidad: 1,
  };
  if (carritoObj.hasOwnProperty(fruta.titulo)) {
    fruta.cantidad = carritoObj[fruta.titulo].cantidad + 1;
  }
  carritoObj[fruta.titulo] = fruta;
  console.log(carritoObj);
  pintarFruta();
};

const pintarFruta = () => {
  $carrito.textContent = "";
  Object.values(carritoObj).forEach((item) => {
    const clone = $template.content.firstElementChild.cloneNode(true);
    clone.querySelector(".lead").textContent = item.titulo;
    clone.querySelector(".badge").textContent = item.cantidad;
    fragment.appendChild(clone);
  });
  $carrito.appendChild(fragment);
};

$buttons.forEach((btn) => {
  btn.addEventListener("click", agregarFruta);
});
