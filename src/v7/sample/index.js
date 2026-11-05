const sampleContainer = () => "app";

const sampleBindings = () => [
  {
    event: "click",
    selector: "#loadBtn",
    action: "loadData"
  }
];

const sampleActions = () => ({
  loadData: () => {}
});

const sample = () => ({
  containerOrId: sampleContainer(),
  bindings: sampleBindings(),
  actions: sampleActions()
});

export { sample, sampleContainer, sampleBindings, sampleActions };
export default sample;
