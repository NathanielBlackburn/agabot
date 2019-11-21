module.exports = {

  randomElement: (list) => {
    return list.length ? list[Math.floor(Math.random() * list.length)] : null;
  },

  dedupe: (list) =>{
    return list.filter((item, index) => {
      return list.indexOf(item) === index;
    });
  }

};
