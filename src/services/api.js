// src/services/api.js
export const fetchProducts = async () => {
  try {
    const response = await fetch("https://data-dawm.github.io/datum/reseller/products.json");
    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
    const data = await response.json();
    return { success: true, body: data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};