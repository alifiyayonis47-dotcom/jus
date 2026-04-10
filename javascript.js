let keranjang = [];

function pesan(nama, harga) {
    let item = keranjang.find(i => i.nama === nama);

    if (item) {
        item.qty++;
    } else {
        keranjang.push({ nama, harga, qty: 1 });
    }

    updateCart();
}

function updateCart() {
    let cartItems = document.getElementById("cart-items");
    let total = 0;
    let jumlah = 0;

    cartItems.innerHTML = "";

    keranjang.forEach((item, index) => {
        total += item.harga * item.qty;
        jumlah += item.qty;

        cartItems.innerHTML += `
        <div class="cart-item">
            ${item.nama} (${item.qty})
            <div>
                <button onclick="tambah(${index})">+</button>
                <button onclick="kurang(${index})">-</button>
            </div>
        </div>
        `;
    });

    document.getElementById("total").innerText = total;
    document.getElementById("cart-count").innerText = jumlah;
}

function tambah(index) {
    keranjang[index].qty++;
    updateCart();
}

function kurang(index) {
    if (keranjang[index].qty > 1) {
        keranjang[index].qty--;
    } else {
        keranjang.splice(index, 1);
    }
    updateCart();
}

function toggleCart() {
    let box = document.getElementById("cartBox");
    box.style.display = box.style.display === "block" ? "none" : "block";
}

function kirimWA() {
    let text = "Pesanan:%0A";
    let total = 0;

    keranjang.forEach(item => {
        text += `${item.nama} x${item.qty}%0A`;
        total += item.harga * item.qty;
    });

    text += `Total: Rp ${total}`;

    window.open(`https://wa.me/6281234567890?text=${text}`);
}