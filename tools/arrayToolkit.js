module.exports = {

  randomElement: (list) => {
    return list.length ? list[Math.floor(Math.random() * list.length)] : null;
  }

};
