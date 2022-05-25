const $carrito = document.getElementById("carrito"),
  $template = document.getElementById("template"),
  $footer = document.getElementById("footer"),
  $templateFooter = document.getElementById("templateFooter");
fragment = document.createDocumentFragment();

document.addEventListener("click", (e) => {
  // console.log(e.target.dataset)
  // console.log(e.target.matches('.card .btn-outline-primary'))
  if (e.target.matches(".card .btn-outline-primary")) {
    // console.log("oo");
    agregarAlCarrito(e);
  }
  // console.log(e.target.matches(".list-group-item .btn-success"));
  if (e.target.matches("#carrito .list-group-item .btn-success")) {
    btnAumentar(e);
  }
  if (e.target.matches("#carrito .list-group-item .btn-danger")) {
    btnDisminuir(e);
  }
});

let carritoObj = [];

const agregarAlCarrito = (e) => {
  // console.log(e.target.dataset.fruta);
  const producto = {
    id: e.target.dataset.fruta,
    name: e.target.dataset.fruta,
    cantidad: 1,
    precio: parseInt(e.target.dataset.precio), //es valor devuelve un string y quiero un numero por eso lo enceramos en un parseInt()
  };
  // console.log(producto);
  const index = carritoObj.findIndex((item) => item.id === producto.id);
  // console.log(index);
  if (index === -1) {
    carritoObj.push(producto);
  } else {
    carritoObj[index].cantidad++;
    // carritoObj[index].precio = carritoObj[index].cantidad * producto.precio;
  }
  console.log(carritoObj);
  pintarProducto();
};

const pintarProducto = () => {
  $carrito.textContent = "";

  carritoObj.forEach((item) => {
    const clone = $template.content.cloneNode(true);
    clone.querySelector(".text-white .lead").textContent = item.name;
    clone.querySelector(".badge").textContent = item.cantidad;
    clone.querySelector("div .lead span").textContent =
      item.precio * item.cantidad;

    clone.querySelector(".btn-danger").dataset.id = item.id; //A los btns de quitar y agregar les creamos un dataser con el valor de id del obj
    clone.querySelector(".btn-success").dataset.id = item.id;
    fragment.appendChild(clone);
  });
  $carrito.appendChild(fragment);
  pintarFooter();
};

const pintarFooter = () => {
  console.log("pimtarFooter");
  $footer.textContent = "";

  const total = carritoObj.reduce(
    (acc, current) => acc + current.cantidad * current.precio,
    0
    //  (acc, current) => acc + current.cantidad * current.precio = 1er parametro del reduce osea el colback
    // 0 = este valor nos dice que lo procece y no devuelva como un numero
  );
  console.log(total);
  const clone = $templateFooter.content.cloneNode(true);
  clone.querySelector(".card .card-body span").textContent = total;
  $footer.appendChild(clone);
  
};

const btnAumentar = (e) => {
  // console.log("llll", e.target.dataset.id);
  carritoObj = carritoObj.map((item) => {
    if (item.id === e.target.dataset.id) {
      item.cantidad++;
    }
    return item;
  });
  pintarProducto(e);
};

const btnDisminuir = (e) => {
  // console.log("llll", e.target.dataset.id);
  carritoObj = carritoObj.filter((item) => {
    if (item.id === e.target.dataset.id) {
      if (item.cantidad > 0) {
        item.cantidad--;
        if (item.cantidad === 0) return;
        return item;
      }
    } else {
      return item;
    }
  });
  pintarProducto(e);
};
