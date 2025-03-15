export default defineContentScript({
  matches: ["*://www.coursera.org/*"],
  main() {
    console.log('Hello content.');
  },
});
