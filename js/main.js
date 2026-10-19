// Render Menu Items & Separate Upgrades
function renderMenu(categoryFilter = 'all') {
  const container = document.getElementById('menu-container');
  const upgradeContainer = document.getElementById('upgrade-container');
  if (!container) return;
  
  container.innerHTML = '';
  if (upgradeContainer) upgradeContainer.innerHTML = '';

  if (!window.menuData || !Array.isArray(window.menuData)) return;

  window.menuData.forEach(catObj => {
    const catName = catObj.category;
    
    // Check if this is the Upgrade category to render it separately at the bottom
    if (catName.includes("CUSTOMIZE & UPGRADE")) {
      if (upgradeContainer) {
        let upgradeHTML = `
          <div class="upgrade-section">
            <h3 style="font-family:Impact; font-size:24px; letter-spacing:0.5px; margin-bottom:15px; color:var(--ink);">${catName}</h3>
            <div class="upgrade-grid">
        `;
        catObj.items.forEach(item => {
          upgradeHTML += `
            <div class="upgrade-card">
              <div class="item-top">
                <h4 style="margin:0; font-size:16px;">${item.name}</h4>
                <strong style="color:var(--orange);">${item.price}</strong>
              </div>
              ${item.description ? `<p>${item.description}</p>` : ''}
            </div>
          `;
        });
        upgradeHTML += `</div></div>`;
        upgradeContainer.innerHTML = upgradeHTML;
      }
      return;
    }

    // Filter grid categories
    if (categoryFilter !== 'all') {
      const matchKey = categoryFilter.toLowerCase();
      const currentCatKey = catName.toLowerCase();
      if (!currentCatKey.includes(matchKey)) {
        return;
      }
    }

    // Render category items into the main grid
    catObj.items.forEach(item => {
      const card = document.createElement('div');
      card.className = 'menu-card';
      card.innerHTML = `
        <span class="category">${catName}</span>
        <div class="item-top">
          <h3>${item.name}</h3>
          <strong>${item.price}</strong>
        </div>
        <p>${item.description ? item.description.replace(/\n/g, '<br>') : ''}</p>
      `;
      container.appendChild(card);
    });
  });
}

function filterMenu(category, btnElement) {
  document.querySelectorAll('.filters button').forEach(b => b.classList.remove('active'));
  btnElement.classList.add('active');
  renderMenu(category);
}

// Modal Popup & Initialization Logic
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('orderModal');
  const targetUrl = "https://www.meandu.app/westfield-collective-mvo/counter";
		// Clear URL hash on page load to prevent unwanted section jumps on F5 reload
  document.querySelectorAll('.order-trigger').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      if (modal) modal.style.display = 'flex';
    });
  });

  const proceedBtn = document.getElementById('proceedBtn');
  if (proceedBtn) {
    proceedBtn.addEventListener('click', () => {
      window.location.href = targetUrl;
    });
  }

  const cancelBtn = document.getElementById('cancelBtn');
  if (cancelBtn) {
    cancelBtn.addEventListener('click', () => {
      if (modal) modal.style.display = 'none';
    });
  }

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });

  if (window.menuData) {
    renderMenu('all');
  }
});