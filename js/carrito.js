let cartContainer = document.getElementById('cart-section')
let cartStorage = JSON.parse(localStorage.getItem('cartProducts')) || []

const cartItemTemplate = `
  <div class="card mb-2">
    <div class="card-body d-flex justify-content-between align-items-center">
      <div>
        <h5 class="card-title mb-1">{{nombre}}</h5>
        <p class="mb-0">$ {{precio}} x {{cantidad}} = $ {{subtotal}}</p>
      </div>
      <div class="d-flex gap-2 align-items-center">
        <button class="btn-menos btn btn-outline-secondary button" data-id="{{id}}">-</button>
        <span class="px-2">{{cantidad}}</span>
        <button class="btn-mas btn btn-outline-secondary button" data-id="{{id}}">+</button>
        <button class="btn-eliminar btn btn-danger" data-id="{{id}}">Eliminar</button>
      </div>
    </div>
  </div>
`

function renderCarrito(cartItems) {
  cartContainer.innerHTML = ''

  cartItems.forEach(producto => {
    const item = { ...producto, subtotal: producto.precio * producto.cantidad }
    const markup = Mustache.render(cartItemTemplate, item)
    cartContainer.insertAdjacentHTML('beforeend', markup)
  })

  cartContainer.querySelectorAll('.btn-mas').forEach(btn =>
    btn.addEventListener('click', () => cambiarCantidad(btn.dataset.id, 1))
  )
  cartContainer.querySelectorAll('.btn-menos').forEach(btn =>
    btn.addEventListener('click', () => cambiarCantidad(btn.dataset.id, -1))
  )
  cartContainer.querySelectorAll('.btn-eliminar').forEach(btn =>
    btn.addEventListener('click', () => eliminarProducto(btn.dataset.id))
  )

  mostrarTotal(cartItems)
}

function cambiarCantidad(id, delta) {
  const producto = cartStorage.find(p => p.id == id)
  if (producto) {
    producto.cantidad += delta
    if (producto.cantidad <= 0) {
      eliminarProducto(id)
    } else {
      localStorage.setItem('cartProducts', JSON.stringify(cartStorage))
      renderCarrito(cartStorage)
    }
  }
}

function eliminarProducto(id) {
  cartStorage = cartStorage.filter(p => p.id != id)
  localStorage.setItem('cartProducts', JSON.stringify(cartStorage))
  renderCarrito(cartStorage)
}

function mostrarTotal(cartItems) {
  let total = cartItems.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0)

  let totalDiv = document.getElementById('total-carrito')
  if (!totalDiv) {
    totalDiv = document.createElement('div')
    totalDiv.id = 'total-carrito'
    totalDiv.classList.add('total-carrito', 'mt-3')
    document.querySelector('main.container').appendChild(totalDiv)
  }
  totalDiv.innerHTML = `<h4>Total: $${total}</h4>`
}

function vaciarCarrito() {
  localStorage.removeItem('cartProducts')
  cartStorage = []
  renderCarrito(cartStorage)
}

renderCarrito(cartStorage)

const btnVaciar = document.getElementById('vaciar-carrito')
if (btnVaciar) {
  btnVaciar.addEventListener('click', vaciarCarrito)
}

