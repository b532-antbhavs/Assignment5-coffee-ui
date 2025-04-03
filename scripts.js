document.addEventListener('DOMContentLoaded', function() {
    const beveragePage = document.getElementById('beverage-page');
    const condimentPage = document.getElementById('condiment-page');
    const confirmationPage = document.getElementById('confirmation-page');
    const startOrderBtn = document.getElementById('start-order-btn');
    const confirmOrderBtn = document.getElementById('confirm-order-btn');
    const beverageCards = document.querySelectorAll('.beverage-card');
    const condimentCards = document.querySelectorAll('.condiment-card');
    const selectedBeverageDisplay = document.getElementById('selected-beverage');
    const condimentList = document.getElementById('condiment-list');
    const orderIdDisplay = document.getElementById('order-id');
    const orderDescriptionDisplay = document.getElementById('order-description');
    const orderTotalDisplay = document.getElementById('order-total');

    let currentOrder = {
        beverage: null,
        condiments: []
    };

    beverageCards.forEach(card => {
        card.addEventListener('click', function() {
            beverageCards.forEach(c => c.classList.remove('active'));
            
            this.classList.add('active');
            
            startOrderBtn.disabled = false;
            
            currentOrder.beverage = this.dataset.beverage;
        });
    });

    startOrderBtn.addEventListener('click', function() {
        beveragePage.classList.remove('active');
        condimentPage.classList.add('active');
        
        selectedBeverageDisplay.textContent = currentOrder.beverage.split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
        selectedBeverageDisplay.dataset.beverage = currentOrder.beverage;
    });

    condimentCards.forEach(card => {
        card.addEventListener('click', function() {
            const condiment = this.dataset.condiment;
            
            const index = currentOrder.condiments.indexOf(condiment);
            if (index === -1) {
                currentOrder.condiments.push(condiment);
                renderCondimentList();
            } else {
                currentOrder.condiments.splice(index, 1);
                renderCondimentList();
            }
        });
    });

    function renderCondimentList() {
        condimentList.innerHTML = '';
        currentOrder.condiments.forEach(condiment => {
            const item = document.createElement('div');
            item.className = 'condiment-item removable';
            item.textContent = condiment.charAt(0).toUpperCase() + condiment.slice(1);
            item.dataset.condiment = condiment;
            
            item.addEventListener('click', function() {
                const index = currentOrder.condiments.indexOf(condiment);
                if (index !== -1) {
                    currentOrder.condiments.splice(index, 1);
                    renderCondimentList();
                }
            });
            
            condimentList.appendChild(item);
        });
    }

    selectedBeverageDisplay.addEventListener('click', function() {
        currentOrder.beverage = null;
        currentOrder.condiments = [];
        condimentPage.classList.remove('active');
        beveragePage.classList.add('active');
        beverageCards.forEach(c => c.classList.remove('active'));
        startOrderBtn.disabled = true;
    });

    confirmOrderBtn.addEventListener('click', function() {
        condimentPage.classList.remove('active');
        confirmationPage.classList.add('active');
        
        const beverageName = currentOrder.beverage.split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
        
        let description = beverageName;
        if (currentOrder.condiments.length > 0) {
            description += ' with ' + currentOrder.condiments.map(condiment => 
                condiment.charAt(0).toUpperCase() + condiment.slice(1)
            ).join(' and ');
        }
        
        orderDescriptionDisplay.textContent = description + '!';
        
        orderIdDisplay.textContent = Math.floor(Math.random() * 1000);
        
        const basePrice = 3.5;
        const condimentPrice = currentOrder.condiments.length * 0.5;
        orderTotalDisplay.textContent = (basePrice + condimentPrice).toFixed(2);
    });
});