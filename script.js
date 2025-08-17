const btn=document.querySelector(".togglebtn")
const searchBtn=document.querySelector("#searchbtn")
const inputRecipe=document.querySelector("#searchInput")
const recipeContainer=document.querySelector(".recipe-container")
const recipeDetailContent=document.querySelector(".recipe-detail-content")
const recipeCloseBtn=document.querySelector(".recipe-close-btn")

const fetchIngredients=(meal)=>{
    let ingredientsList=""
    for (let i=1;i<=20;i++){
        const ingredient = meal[`strIngredient${i}`];
        if(ingredient){
        const measure =meal[`strMeasure${i}`];
        ingredientsList+=`<li>${measure} ${ingredient}</li>`
    }
    else{
        break;
    }
}
return ingredientsList;
}

const openRecipe=(meal)=>{
    recipeDetailContent.innerHTML=`
    <h2 class="recipe-name">${meal.strMeal}</h2>
    <h3>Ingredients:</h3>
    <ul class="ingredient-list">${fetchIngredients(meal)}</ul>
    <div>
        <h3>Instructions:</h3>
        <p class="recipe-instructions">${meal.strInstructions}</p>
        </div>
    `
    recipeDetailContent.parentElement.style.display="block";
}
const fetchRecipe =async (query)=>{
    recipeContainer.innerHTML="<h2>Dish in the oven...</h2>";
    const data=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
    const response=await data.json();
    recipeContainer.innerHTML="";
    if (!response.meals) {
        recipeContainer.innerHTML = "<h2>No recipe found 😔</h2>";
        return;
    }
    response.meals.forEach( meal =>{
        const recipeDiv=document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML=`
        <img src="${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>
        <p><span>${meal.strArea}</span> Dish</p>
        <p>Belongs to<span> ${meal.strCategory}</span></p>
        `
        const btn=document.createElement('button')
        btn.innerText="Cooked";

        //adding eventlistener to recipes
        btn.addEventListener("click",()=>{
            openRecipe(meal);
        });


        recipeDiv.appendChild(btn);
        recipeContainer.appendChild(recipeDiv)
    });
};


recipeCloseBtn.addEventListener("click",()=>{
     recipeDetailContent.parentElement.style.display="none";

});

searchBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    const searchInput=inputRecipe.value.trim()
    if(!searchInput){
      recipeContainer.innerHTML=(`<h2>Enter recipe in search box...</h2>`);
      return;
    }    
    fetchRecipe(searchInput);
});


let mode= "light";
btn.addEventListener("click",()=>{
    if (mode==="light"){
        mode="dark"
        document.querySelector("body").style.backgroundColor="#344e41"
        document.querySelector(".hero-heading").style.color="#8ea88dff"
             
        
            }else{
            mode="light"
             document.querySelector("body").style.backgroundColor="#76a175"  
             document.querySelector(".hero-heading").style.color="#012d17" 
            }
});