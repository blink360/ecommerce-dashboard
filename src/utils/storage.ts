export const storeItemInLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getItemFromLocalStorage = (key) =>{
    const retrievedValue = JSON.parse(localStorage.getItem(key));
    return retrievedValue;
}