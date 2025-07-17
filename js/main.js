const productos = [
    {
        id: 1,
        image: "assets/img/vaperred-Photoroom.jpg",
        nombre: "Vaper Elfbar Rojo",
        precio: 27000
    },
    {
        id: 2,
        image: "assets/img/vapergreen.jpg",
        nombre: "Vaper Elfbar Verde",
        precio: 27000
    },
    {
        id: 3,
        image: "assets/img/vaperpurple.jpg",
        nombre: "Vaper Elfbar Violeta",
        precio: 27000
    },
    {
        id: 4,
        image: "assets/img/jbltune2.jpg",
        nombre: "Auriculares JBL Tune",
        precio: 53000
    },
    {
        id: 5,
        image: "assets/img/jblwavebeambl1.jpg",
        nombre: "Auriculares JBL Wave Beam 2 Bl",
        precio: 85000
    },
    {
        id: 6,
        image: "assets/img/jblwavebeamne1.jpg",
        nombre: "Auriculares JBL Wave Beam 2 Ne",
        precio: 85000
    },
    {
        id: 7,
        image: "assets/img/vasotermico1.jpg",
        nombre: "Vaso Termico Stanley (710ml)",
        precio: 90000
    },
    {
        id: 8,
        image: "assets/img/jblflip1.jpg",
        nombre: "Parlante JBL Flip 6",
        precio: 180000
    },
    {
        id: 9,
        image: "assets/img/jblgo1.jpg",
        nombre: "Parlante JBL Go 4",
        precio: 60000
    },
]

const cartProducts = []
let productsContainer = document.getElementById("products-container")

function renderProductos(productsArray) {
    productsArray.forEach(producto => {
        const card = document.createElement("div")
        card.innerHTML = `  <div class="card" style="width: 18rem">
                                <figure>
                                    <a href="./vaperrojo.html">
                                        <img src="${producto.image}" class="card-img-top" alt="..." />
                                    </a>
                                </figure>
                                <div class="card-body u-card-body">
                                    <p class="pimg">${producto.nombre}<br />${producto.precio}</p>
                                    <div class="u-btn-group">
                                        <button class="productoAgregar button comprar-btn u-comprar-btn" id="${producto.id}">Agregar</button>
                                    </div>
                                </div>
                            </div>`
        productsContainer.appendChild(card)
    })
    agregarAlCarrito(productos)
}
renderProductos(productos)


function agregarAlCarrito(productsArray) {
    const addButton = document.querySelectorAll(".productoAgregar")
    addButton.forEach(button => {
        button.onclick = (e) => {
            const productId = e.currentTarget.id
            const selectedProduct = productsArray.find(producto => producto.id == productId)
            cartProducts.push(selectedProduct)
            console.log(cartProducts)

            localStorage.setItem("cartProducts", JSON.stringify(cartProducts))
        }
    })
}

const inputBusqueda = document.getElementById("input-busqueda")
const formBusqueda = document.getElementById("form-busqueda")

function limpiarProductos() {
    productsContainer.innerHTML = ""
}

inputBusqueda.addEventListener("input", () => {
    const texto = inputBusqueda.value.toLowerCase().trim()
    const resultados = productos.filter(producto =>
        producto.nombre.toLowerCase().includes(texto)
    )
    limpiarProductos()
    renderProductos(resultados)
})





