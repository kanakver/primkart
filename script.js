// Product Data
const products = [
  {
    name: 'Classic Men T-Shirt',
    price: 25,
    category: 'Men',
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80',
    desc: 'Soft cotton t-shirt for everyday comfort.'
  },
  {
    name: 'Elegant Women Dress',
    price: 55,
    category: 'Women',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    desc: 'Chic and stylish dress for all occasions.'
  },
  {
    name: 'Leather Wallet',
    price: 35,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
    desc: 'Premium leather wallet with multiple slots.'
  },
  {
    name: 'Men Running Shoes',
    price: 70,
    category: 'Men',
    image: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80',
    desc: 'Lightweight and durable running shoes.'
  },
  {
    name: 'Women Handbag',
    price: 60,
    category: 'Women',
    image: 'https://images.unsplash.com/photo-1526178613658-3f1622045557?auto=format&fit=crop&w=400&q=80',
    desc: 'Spacious and trendy handbag for daily use.'
  },
  {
    name: 'Sunglasses',
    price: 20,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80',
    desc: 'UV-protected stylish sunglasses.'
  },
  {
    name: 'Men Formal Shirt',
    price: 40,
    category: 'Men',
    image: 'https://images.unsplash.com/photo-1526171111112-3f1622045557?auto=format&fit=crop&w=400&q=80',
    desc: 'Perfect for office and formal events.'
  },
  {
    name: 'Women Sandals',
    price: 30,
    category: 'Women',
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80',
    desc: 'Comfortable sandals for summer days.'
  },
  {
    name: 'Backpack',
    price: 45,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    desc: 'Durable backpack for travel and work.'
  },
  {
    name: 'Women Scarf',
    price: 18,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
    desc: 'Soft scarf to complement any outfit.'
  }
];

let filteredProducts = [...products];
let currentCategory = 'All';
let currentSearch = '';
let currentSort = 'default';

const productGrid = document.getElementById('productGrid');
const searchBar = document.getElementById('searchBar');
const categoryBtns = document.querySelectorAll('.category-btn');
const sortPrice = document.getElementById('sortPrice');

function renderProducts(arr) {
  productGrid.innerHTML = '';
  if (arr.length === 0) {
    productGrid.innerHTML = '<p style="grid-column: 1/-1; text-align:center;">No products found.</p>';
    return;
  }
  arr.forEach((product, idx) => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <div class="product-info">
        <h3 class="product-title">${product.name}</h3>
        <p class="product-category">${product.category}</p>
        <p class="product-price">$${product.price}</p>
      </div>
    `;
    card.addEventListener('click', () => showModal(product));
    productGrid.appendChild(card);
  });
}

function filterAndRender() {
  filteredProducts = products.filter(p => {
    const matchCategory = currentCategory === 'All' || p.category === currentCategory;
    const matchSearch = p.name.toLowerCase().includes(currentSearch.toLowerCase());
    return matchCategory && matchSearch;
  });
  if (currentSort === 'low-high') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (currentSort === 'high-low') {
    filteredProducts.sort((a, b) => b.price - a.price);
  }
  renderProducts(filteredProducts);
}

searchBar.addEventListener('input', e => {
  currentSearch = e.target.value;
  filterAndRender();
});

categoryBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    categoryBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentCategory = btn.dataset.category;
    filterAndRender();
  });
});

sortPrice.addEventListener('change', e => {
  currentSort = e.target.value;
  filterAndRender();
});

// Modal logic
const modal = document.getElementById('modal');
const closeModalBtn = document.getElementById('closeModal');
const modalImg = document.getElementById('modalImg');
const modalTitle = document.getElementById('modalTitle');
const modalCategory = document.getElementById('modalCategory');
const modalPrice = document.getElementById('modalPrice');
const modalDesc = document.getElementById('modalDesc');

function showModal(product) {
  modalImg.src = product.image;
  modalTitle.textContent = product.name;
  modalCategory.textContent = product.category;
  modalPrice.textContent = `$${product.price}`;
  modalDesc.textContent = product.desc;
  modal.classList.remove('hidden');
}
closeModalBtn.addEventListener('click', () => {
  modal.classList.add('hidden');
});
modal.addEventListener('click', e => {
  if (e.target === modal) modal.classList.add('hidden');
});

// Initial render
filterAndRender(); 