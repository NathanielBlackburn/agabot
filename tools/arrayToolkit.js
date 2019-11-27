module.exports = {

  randomElement: (list) => {
    return list.length ? list[Math.floor(Math.random() * list.length)] : null;
  },

  dedupe: (list) => {
    return list.filter((item, index) => {
      const jsonItem = JSON.stringify(item);
      return list.findIndex(item => JSON.stringify(item) === jsonItem) === index;
    });
  }

};
