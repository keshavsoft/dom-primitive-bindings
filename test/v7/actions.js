export const actions = {
    loadRaka: async () => {
        const response = await fetch("./columns.json");
        const json = await response.json();
    }
};

export default actions;

