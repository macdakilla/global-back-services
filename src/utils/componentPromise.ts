export default (path: string) =>
  new Promise((resolve) => {
    try {
      resolve(require(`~/components/${path}`));
    } catch (e) {
      try {
        resolve(require(`~/components/${path}/index`));
      } catch (e) {
        console.error(
          `Components ~/components/${path} || index.vue not found. Loading Error.vue;`
        );
      }
    }
  });
