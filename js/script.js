const formulario = document.getElementById("formularioProducto");
const listaCarrito = document.getElementById("listaCarrito");
const totalSpan = document.getElementById("total");
const finalizarBtn = document.getElementById("finalizarCompra");
const mensaje = document.getElementById("mensaje");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function renderCarrito() {
  listaCarrito.innerHTML = "";
  let total = 0;

  carrito.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${item.nombre} x ${item.cantidad} = ${(
      item.precio * item.cantidad
    ).toFixed(2)}`;

    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar";
    btnEliminar.onclick = () => {
      carrito.splice(index, 1);
      guardarCarrito();
      renderCarrito();
    };

    li.appendChild(btnEliminar);
    listaCarrito.appendChild(li);

    total += item.precio * item.cantidad;
  });

  totalSpan.textContent = total.toFixed(2);
}

formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const precio = parseFloat(document.getElementById("precio").value);
  const cantidad = parseInt(document.getElementById("cantidad").value);

  if (!nombre || isNaN(precio) || isNaN(cantidad)) return;

  carrito.push({ nombre, precio, cantidad });
  guardarCarrito();
  renderCarrito();

  formulario.reset();
});

finalizarBtn.addEventListener("click", () => {
  if (carrito.length === 0) {
    Swal.fire(
      "Carrito vacío",
      "Agrega productos antes de finalizar la compra",
      "warning"
    );
    return;
  }

  Swal.fire("Compra realizada", "¡Gracias por su compra!", "success");
  carrito = [];
  guardarCarrito();
  renderCarrito();
});

renderCarrito();
