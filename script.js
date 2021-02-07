// Add event handler 
document.getElementById('searchForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const searchInput = document.getElementById('searchInput').value;
    searchFood(searchInput);
});

// Fetch data using search input API
const searchFood = searchInput => {
    if (searchInput) {
        document.getElementById("searchForm").reset();
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.meals === null) {
                    const message = `
                    <div class="col-md-12 text-center text-dark">
                        <h3>No item found with the name "${searchInput}"!</h3>
                    </div>`

                    document.getElementById('row').innerHTML = message;
                    return false;
                } else {
                    displayFoods(data.meals);
                }
            });
    } else {
        const message = `
            <div class="col-md-12 text-center text-dark">
                <h3>Please enter any food name to search!</h3>
            </div>`
        document.getElementById('row').innerHTML = message;
        return false;
    }
};

// Display food items
const displayFoods = foods => {
    const row = document.getElementById('row');
    row.innerHTML = "";

    foods.forEach(food => {
        const column = document.createElement('div');
        column.className = "col-md-3 food-item my-3";

        const foodContent = `
        <div onclick="getDetails('${food.idMeal}')" class="items-image card w-100 overflow-hidden">
            <img src="${food.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title text-center">${food.strMeal}</h5>
            </div>
        </div>
        `
        column.innerHTML = foodContent;
        row.appendChild(column);
    });
};

//  Fetch single item using item id API
const getDetails = idMeal => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
    fetch(url)
        .then(response => response.json())
        .then(data => displayDetails(data.meals));
};

// Display single item
const displayDetails = foods => {
    const modalBody = document.getElementById('modalBody')
    foods.forEach(food => {
        const foodDetails = `
        <div class="card w-100">
            <div class="row g-0">
                <div class="col-md-6">
                    <img src="${food.strMealThumb}" class="card-img-top single-item-image" alt="...">
                </div>
                <div class="col-md-6">
                    <div class="card-body">
                        <h3 class="card-title">${food.strMeal} <span><button id="cancelButton" type="button" class="btn-dark float-end" data-bs-dismiss="modal" aria-label="Close"></button></span></h3>
                        <h5 class="card-title">Ingredients</h5>
                        <ul class="list-unstyled">
                            ${ingredientList(food)}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        `
        modalBody.innerHTML = foodDetails;
        const foodModal = new bootstrap.Modal(document.getElementById('foodModal'));
        foodModal.show();
    });
};

// Create Ingredient list
const ingredientList = food => {
    let li = '';

    for (let i = 1; i <= 20; i++) {
        let strIngredient = 'strIngredient' + i;
        if (food[strIngredient]) {
            li = li + `<li><span><i class="fas fa-check-square text-warning"></i></span> ${food[strIngredient]}</li>`;
        }
    }
    return li;
};