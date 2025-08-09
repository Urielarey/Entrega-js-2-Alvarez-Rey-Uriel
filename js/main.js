const PRODUCTS_JSON = './data/products.json'
let cartProducts = JSON.parse(localStorage.getItem('cartProducts')) || []
const productsContainer = document.getElementById('products-container')
const inputBusqueda = document.getElementById('input-busqueda')
const badgeCarrito = document.getElementById('badge-carrito')

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}
function loadFromStorage(key = 'cartProducts') {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : []
  } catch (err) {
    console.error('Error leyendo storage', err)
    return []
  }
}
function clearStorage(key = 'cartProducts') {
  localStorage.removeItem(key)
}

async function fetchProductos(url) {
  try {
    const res = await fetch(url)
    if (!res.ok) {
      throw new Error('Error al obtener productos: ' + res.status)
    }
    const data = await res.json()
    return data
  } catch (err) {
    console.error('fetchProductos error:', err)
    return []
  } finally {
    
  }
}

const productTemplate = `
  <div class="col-12 col-sm-6 col-md-4">
    <div class="card h-100">
      <img src="{{image}}" class="card-img-top" alt="{{nombre}}">
      <div class="card-body d-flex flex-column">
        <h5 class="card-title">{{nombre}}</h5>
        <p class="card-text mb-2">$ {{precio}}</p>
        <div class="mt-auto">
          <button class="productoAgregar btn btn-primary w-100 button" data-id="{{id}}">Agregar</button>
        </div>
      </div>
    </div>
  </div>
`

function renderProductos(productsArray) {
  productsContainer.innerHTML = ''
  productsArray.forEach(producto => {
    const rendered = Mustache.render(productTemplate, producto)
    productsContainer.insertAdjacentHTML('beforeend', rendered)
  })
  attachAddEvents(productsArray)
  updateBadge()
}

function obtenerNombres(productsArray) {
  return productsArray.map(p => p.nombre)
}

function attachAddEvents(productsArray) {
  const addButtons = document.querySelectorAll('.productoAgregar')
  addButtons.forEach(btn => {
    btn.onclick = (e) => {
      const id = parseInt(e.currentTarget.dataset.id)
      const producto = productsArray.find(p => p.id === id)
      if (!producto) return
      const existing = cartProducts.find(p => p.id === id)
      if (existing) {
        existing.cantidad += 1
      } else {
        cartProducts.push({ ...producto, cantidad: 1 })
      }
      saveToStorage('cartProducts', cartProducts)
      updateBadge()
    }
  })
}

function limpiarProductos() {
  productsContainer.innerHTML = ''
}
if (inputBusqueda) {
  inputBusqueda.addEventListener('input', () => {
    const texto = inputBusqueda.value.toLowerCase().trim()
    fetchProductos(PRODUCTS_JSON).then(productos => {
      const resultados = productos.filter(producto =>
        producto.nombre.toLowerCase().includes(texto)
      )
      limpiarProductos()
      renderProductos(resultados)
    })
  })
}

function updateBadge() {
  const totalItems = cartProducts.reduce((acc, p) => acc + (p.cantidad || 0), 0)
  if (badgeCarrito) {
    badgeCarrito.innerHTML = totalItems > 0 ? `<span class="badge">${totalItems}</span>` : ''
  }
}

(async function init() {
  cartProducts = loadFromStorage()
  const productos = await fetchProductos(PRODUCTS_JSON)
  renderProductos(productos)
  console.log('Nombres de productos (map):', obtenerNombres(productos))
})()



