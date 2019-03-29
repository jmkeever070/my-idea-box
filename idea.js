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
    // debugger;
    // console.log(this);
    var stringVar = JSON.stringify(this);
    localStorage.setItem(this.id, stringVar);
  }

  updateQuality() {

  }

}