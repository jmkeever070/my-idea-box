class Idea {
  constructor(title, body, id, quality) {
    this.title = title;
    this.body = body;
    this.id = id || Date.now();
    this.quality = quality || 'Swill';
  }

  saveToStorage(tarheels) {
    console.log(this);
    var stringVar = JSON.stringify(this);
    localStorage.setItem(this.id, stringVar);
  }

  deleteFromStorage() {
    localStorage.removeItem(this.id);
  }

  updateContent() {
    // this needs to only be operating on local storage
    // innerText is for UI updates, so it should exist in main.js
    this.title = this.title.innerText();
    // follow the instructions in main.js first, then down here you need to update the item in localstorage. Not sure if there's an easy way to update (maybe setItem overwrites the object? I'm not sure). But you can always just delete it and then reset

  }

  updateQuality() {

  }

}