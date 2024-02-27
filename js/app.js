const loadPhoneData = async (searchText, isShow) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  displayPhone(phones, isShow);
};

const displayPhone = (phones, isShow) => {
  const showAllContainer = document.getElementById("show-all-container");
  const phoneContainer = document.getElementById("phone-container");
  //reset data first when load new data
  phoneContainer.innerHTML = "";
  //show all button when more than 12 phones
  if (phones.length > 12 && !isShow) {
    showAllContainer.classList.remove("hidden");
  } else {
    showAllContainer.classList.add("hidden");
  }

  // show 12 phone first time
  if (!isShow) {
    phones = phones.slice(0, 12);
  }
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
        <button onclick='showPhoneDetails("${phone.slug}")' class="btn btn-error">Show Details</button>
      </div>
    </div>
  </div>
    `;
    phoneContainer.appendChild(div);
  });
  toggleLoadingSpinner(false);
};

const showPhoneDetails = async (id) => {
  // get single phone data
  const res = await fetch(
    ` https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  const phone = data.data;

  console.log(phone);

  const modalContainer = document.getElementById("modal-container");
  modalContainer.innerHTML = `
  <img class="block mx-auto" src="${phone?.image}">
  <h3 class="text-2xl font-semibold">${phone.name}</h3>
  <p><strong>Storage :</strong> ${phone?.mainFeatures?.storage}</p>
  <p><strong>Display Size :</strong> ${phone?.mainFeatures?.displaySize}</p>
  <p><strong>Chipset :</strong> ${phone?.mainFeatures?.chipSet}</p>
  <p><strong>Memory :</strong> ${phone?.mainFeatures?.memory}</p>
  <p><strong>Slug :</strong> ${phone?.slug}</p>
  <p><strong>Release data :</strong> ${phone?.releaseDate}</p>
  <p><strong>Brand :</strong> ${phone?.brand}</p>
  <p><strong>GPS :</strong> ${phone?.others?.GPS ?? "No data available"}</p>
  `;

  // show modal
  phone_details_modal.showModal();
};

const handlePhoneSearch = (isShow) => {
  toggleLoadingSpinner(true);
  const searchInputField = document.getElementById("search-input-field");
  const searchText = searchInputField.value;
  loadPhoneData(searchText, isShow);
};

const toggleLoadingSpinner = (isLoading) => {
  const loader = document.getElementById("loader");
  if (isLoading) {
    loader.classList.remove("hidden");
  } else {
    loader.classList.add("hidden");
  }
};

const showAllPhone = () => {
  handlePhoneSearch(true);
};

// loadPhoneData();
