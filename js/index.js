//remove button class
const removeBtnClass=()=>{
    const allBtn = document.getElementsByClassName("category-btn");
    // console.log(allBtn)
    for(let btn of allBtn){
        btn.classList.remove("active")
    }
}
//Load category
const loadCategory = () => {
    fetch("https://openapi.programming-hero.com/api/peddy/categories")
        .then(res => res.json())
        .then(data => displayCategory(data.categories
        ))
        .catch(err => (console.log(err)))
}
//Display Category
const displayCategory = (categories) => {
    const categoriesContainer = document.getElementById("categories-container");

    categories.forEach(eachCategory => {
        const { category, category_icon, id } = eachCategory;
        const div = document.createElement("div");
        div.innerHTML =
            `
        <div 
        onclick="LoadPetsByCategory('${category}')"
         class="border rounded-xl flex gap-2 justify-center items-center py-2 category-btn" 
         id="btn-${category}">
        <img class="w-10" src=${category_icon}/>
        <p class="text-2xl font-bold">${category}</p>
        </div>
        `
        categoriesContainer.append(div);
    });

}

// All pets load
const allPetLoad = () => {
    fetch("https://openapi.programming-hero.com/api/peddy/pets")
        .then(res => res.json())
        .then(data => displayAllPet(data.pets))
}
// display all pets
const displayAllPet = (pets) => {
    const allPetContainer = document.getElementById("all-pet-container");
    allPetContainer.innerHTML = "";

    if (pets.length == 0) {
        allPetContainer.classList.remove("grid");
        allPetContainer.innerHTML =
            `
        <div class="text-center bg-gray-100 p-2 lg:p-10 rounded-lg">
       <div class="flex justify-center">
        <img class="" src="./images/error.webp"/>       
       </div>
       <h3 class="text-2xl font-semibold">No Information Available</h3>
        <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at 
        its layout. The point of using Lorem Ipsum is that it has a.</p>
        </div>
        `
    }
    else {
        allPetContainer.classList.add("grid")
    }

    pets.forEach((pet) => {
        const { image, breed, pet_name, date_of_birth, gender, price,petId } = pet;
        const div = document.createElement("div");
        div.innerHTML =
            `
        <div class="card border p-4">
  <figure>
    <img
      src=${image} />
  </figure>
  <div class="mt-4">
    <h2 class="card-title text-2xl font-bold mb-2">${pet_name}</h2>

    <div class="flex items-center gap-2 text-gray-500 font-semibold">
    <img class="w-4 h-4" src="https://img.icons8.com/?size=24&id=X0RUL50ii037&format=png"/>
    <span>Breed: ${breed ? breed : ""}</span>
    </div>

    <div class="flex items-center gap-2 text-gray-500 font-semibold">
    <img class="w-4 h-4" src="https://img.icons8.com/?size=24&id=117762&format=png"/>
    <span>Birth: ${date_of_birth ? date_of_birth : ""}</span>
    </div>

    <div class="flex items-center gap-2 text-gray-500 font-semibold">
    <img class="w-4 h-4" src="https://img.icons8.com/?size=30&id=77877&format=png"/>
    <span>Gender: ${gender ? gender : ""}</span>
    </div>

    <div class="flex items-center gap-2 text-gray-500 font-semibold">
    <img class="w-4 h-4" src="https://img.icons8.com/?size=24&id=89392&format=png"/>
    <span>Price: ${price ? price : ""}$</span>
    </div>

    <div class="divider"></div>

    <div class="flex gap-2">
      <div class="btn btn-outline ">
      <img class="h-4 w-4" src="https://img.icons8.com/?size=24&id=82788&format=png"/>
      </div>
      <button class="btn btn-outline btn-success">Adopt</button>
      <button onclick="loadDetails('${petId}')" class="btn btn-outline btn-success">Details</button>
    </div>
  </div>
</div>
        `
        allPetContainer.append(div)
    })
}

// load pets by category
const LoadPetsByCategory = (category) => {
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
        .then(res => res.json())
        .then(data => {
            removeBtnClass();
            const activeBtn = document.getElementById(`btn-${category}`);
            activeBtn.classList.add("active");
            displayAllPet(data.data);
        })
        .catch(err => console.log(err))
}

//Load Details By Category
const loadDetails=(petId)=>{
    fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`)
    .then(res=>res.json())
    .then(data=>displayPetDetails(data.petData))
    .catch(err=>console.log(err))
}
//Display Details
const displayPetDetails =(petInfo)=>{
    const {breed,image,gender,pet_name,price,date_of_birth,pet_details,vaccinated_status}=petInfo;

    const modalContainer = document.getElementById("modalContainer");

    modalContainer.innerHTML =
    `
    <img class="w-[600px] h-[300px] rounded-lg object-cover" src=${image}/>
    <h3 class="text-2xl font-bold my-4">${pet_name}</h3>

    <div class="grid grid-cols-1 md:grid-cols-2">

    <div class="flex items-center gap-2 text-gray-500 font-semibold">
    <img class="w-4 h-4" src="https://img.icons8.com/?size=24&id=X0RUL50ii037&format=png"/>
    <span>Breed: ${breed ? breed : ""}</span>
    </div>

     <div class="flex items-center gap-2 text-gray-500 font-semibold">
    <img class="w-4 h-4" src="https://img.icons8.com/?size=24&id=117762&format=png"/>
    <span>Birth: ${date_of_birth ? date_of_birth : ""}</span>
    </div>

    <div class="flex items-center gap-2 text-gray-500 font-semibold">
    <img class="w-4 h-4" src="https://img.icons8.com/?size=30&id=77877&format=png"/>
    <span>Gender: ${gender ? gender : ""}</span>
    </div>

    <div class="flex items-center gap-2 text-gray-500 font-semibold">
    <img class="w-4 h-4" src="https://img.icons8.com/?size=24&id=89392&format=png"/>
    <span>Price: ${price ? price : ""}$</span>
    </div>

     <div class="flex items-center gap-2 text-gray-500 font-semibold">
    <img class="w-4 h-4" src="https://img.icons8.com/?size=30&id=77877&format=png"/>
    <span>Gender: ${vaccinated_status ? vaccinated_status : ""}</span>
    </div>

    </div>

    <h4 class="text-lg font-semibold my-5">Details Information</h4>
    <p>${pet_details}</p>
    `
    document.getElementById("customModal").showModal();
}

loadCategory();
allPetLoad();