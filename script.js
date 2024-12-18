document.addEventListener('DOMContentLoaded', () => {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const menuSections = document.querySelectorAll('.menu-section');

    // Individual Menu Sections
    // const foodMenu = menuSections.
    
    // const categoryData = data.forEach(category => {
    //     return `<div class="collapsible">
    //             <button class="collapsible-header">${category.Category_name}</button>
    //             <div class="collapsible-content">
    //                 <div class="menu-items">` +
    //                 category.Items.forEach(item => {
    //                     return `<div class="menu-item">
    //                         <img src="${item.item_image}" alt="${item.Name}">
    //                         <div class="item-details">
    //                             <h3>${item.Name} <span class="veg-badge">Veg</span></h3>
    //                             <p>${item.Description}</p>
    //                             <div class="item-footer">
    //                                 <span class="price">₹${item.Price}</span>
    //                                 <div class="add-ons">` +
    //                                 item.Customisation.forEach(opt => {
    //                                     return `<span>${opt.Name} +₹${opt.Price}</span>`
    //                                 })
    //                                 + `</div>
    //                             </div>
    //                         </div>
    //                     </div>`
    //                 }) +   
    //                 `</div>
    //             </div>
    //         </div>`;
    // });
    const categoryMap = [
        {
            "categoryName": 'meals',
            "dataSet": mealsMenuData
        },
        {
            "categoryName": 'food',
            "dataSet": foodMenuData
        },
        {
            "categoryName": 'hot-beverages',
            "dataSet": hotBevMenuData
        },
        {
            "categoryName": 'cold-beverages',
            "dataSet": coldBevMenuData
        },
        {
            "categoryName": 'desserts',
            "dataSet": dessertsMenuData
        }
    ];

    const setCategoryData = function(cat) {
        console.log('data', cat.dataSet);
    // Code rectified by gpt
    const categoryData = cat.dataSet.map(category => {
        const itemsHtml = category.Items.map(item => {
          const customisationHtml = item.Customisation
            .map(opt => {
                return customisationOptions = opt.Options.map(opt1 => `<span>${opt1.Name} +₹${opt1.Price}</span></br>`).join("");
            })
            .join("");
            const itemImage = item.item_image && item.item_image !== 'url' ? `<img src="${item.item_image}" alt="${item.Name}"></img>` : '';
      
          return `
            <div class="menu-item">
              ${itemImage}
              <div class="item-details">
                <h3>${item.Name}</h3>
                <p>${item.Description}</p>
                <div class="item-footer">
                  <span class="price">₹${item.Price}</span>
                  <div class="add-ons">${customisationHtml}</div>
                </div>
              </div>
            </div>`;
        }).join("");
      
        return `
          <div class="collapsible">
            <button class="collapsible-header">${category.Category_name}</button>
            <div class="collapsible-content">
              <div class="menu-items">${itemsHtml}</div>
            </div>
          </div>`;
      }).join("");

        const menuSection = document.querySelector(`div[data-category="${cat.categoryName}"]`);
        menuSection.innerHTML = categoryData;
    }

    categoryMap.forEach(cat => setCategoryData(cat))

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.category;
            
            // Update active button
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Show corresponding menu section
            menuSections.forEach(section => {
                if (section.dataset.category === category) {
                    section.classList.add('active');
                } else {
                    section.classList.remove('active');
                }
            });
        });
    });
    const collapsibles = document.querySelectorAll('.collapsible-header');

    console.log('collapsibles: ', collapsibles);

    collapsibles.forEach(header => {
        header.addEventListener('click', function() {
            this.parentElement.classList.toggle('active');
        });
    });
});