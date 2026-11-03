export const rowBinding = {
  event: "click",
  selector: ".ks-btn-show",
  runner: (target) => {
    const row = target.closest("tr");
    const cells = row ? Array.from(row.querySelectorAll("td:not(:last-child)")) : [];
    const columns = ["serial", "itemName", "category", "baseUnit", "openingRate"];
    const data = {};

    cells.forEach((cell, index) => {
      const key = columns[index];
      if (key) data[key] = cell.textContent.trim();
    });

    return data;
  },
  onExtract: (rowData) => {
    console.log("rowData : ", rowData);
  }
};

export const searchBinding = {
  event: "keydown",
  selector: "input[type='search'], input",
  runner: (event) => {
    if (event.key !== "Enter") return null;

    const input = event.target;
    return {
      searchQuery: input.value,
      timestamp: new Date().toLocaleTimeString()
    };
  },
  onExtract: (searchData) => {
    console.log("searchData : ", searchData);
  }
};

export const bindings = [rowBinding, searchBinding];

export default bindings;

