module.exports = class ImageCard {

  constructor(urls, clickable) {
    if (!(urls instanceof Array)) {
      urls = [urls];
    }
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
