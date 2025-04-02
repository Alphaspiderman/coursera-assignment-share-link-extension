export default defineContentScript({
  matches: ["*://coursera.org/*"],
  main() {
    console.log('Hello content.');
  },
});
