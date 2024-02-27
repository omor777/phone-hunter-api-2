const loadPhoneData = async (searchText) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  displayPhone(phones);
};

const displayPhone = (phones) => {
  const phoneContainer = document.getElementById("phone-container");
  //reset data first when load new data
  phoneContainer.innerHTML = "";
  phones.forEach((phone) => {
    // console.log(phone);
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="card card-compact  bg-slate-100 shadow-md">
    <figure><img src="${phone.image}" alt="Shoes" /></figure>
    <div class="card-body">
      <h2 class="text-2xl font-semibold text-center">${phone.phone_name}</h2>
      <p>If a dog chews shoes whose shoes does he choose?</p>
      <div class="card-actions justify-center">
        <button class="btn btn-primary">Buy Now</button>
      </div>
    </div>
  </div>
    `;
    phoneContainer.appendChild(div);
  });
  showLoader(false)
};

const handlePhoneSearch = () => {
  showLoader(true);
  const searchInputField = document.getElementById("search-input-field");
  const searchText = searchInputField.value;
  loadPhoneData(searchText);
};

const showLoader = (isLoading) => {
  const loader = document.getElementById("loader");
  if (isLoading) {
    loader.classList.remove("hidden");
  } else {
    loader.classList.add("hidden");
  }
};

// loadPhoneData();
