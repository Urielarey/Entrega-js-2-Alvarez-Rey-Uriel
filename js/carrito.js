let cartContainer = document.getElementById("cart-section")
let cartStorage = localStorage.getItem("cartProducts")
cartStorage = JSON.parse(cartStorage) || []

function renderCarrito(cartItems) {
    cartContainer.innerHTML = ""

    cartItems.forEach(producto => {
        const card = document.createElement("div")
        card.innerHTML = `
            <h3 class="h2">${producto.nombre}</h3>
            <p class="pimg">$${producto.precio}</p>
        `;
        cartContainer.appendChild(card)
    });

    mostrarTotal(cartItems)
}

function mostrarTotal(cartItems) {
    let total = cartItems.reduce((acc, producto) => acc + producto.precio, 0)

    let totalDiv = document.getElementById("total-carrito")
    if (!totalDiv) {
        totalDiv = document.createElement("div")
        totalDiv.id = "total-carrito";
        totalDiv.classList.add("total-carrito")
        cartContainer.appendChild(totalDiv)
    }

    totalDiv.innerHTML = `<h3 class="h3">Total: $${total}</h3>`
}

function vaciarCarrito() {
    localStorage.removeItem("cartProducts")
    cartStorage = [];
    renderCarrito(cartStorage)
}

renderCarrito(cartStorage)

const btnVaciar = document.getElementById("vaciar-carrito")
if (btnVaciar) {
    btnVaciar.addEventListener("click", vaciarCarrito)
}
