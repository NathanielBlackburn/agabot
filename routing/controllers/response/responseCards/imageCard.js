module.exports = class ImageCard {

  constructor(urls, clickable) {
    this.cards = [{
      sections: [{
        widgets: urls.map(url => {
          const widget = {
            image: {
              imageUrl: url
            }
          };
          if (clickable) {
            widget.image.onClick = {
              openLink: {
                url: url
              }
            };
          }
          return widget;
        })
      }]
    }];
  }

};
