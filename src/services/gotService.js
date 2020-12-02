

export default class GotService {
    constructor(){
        this._apiBase = 'https://www.anapioficeandfire.com/api';
        this._transformChar = this._transformChar.bind(this);
        this._transformBook = this._transformBook.bind(this);
        this._transformHouse = this._transformHouse.bind(this);

    }

    getResource = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`);

        if(!res.ok) throw new Error(`Couldn't fetch ${url}, received ${res.status}`);

        return await res.json();
    }

    getAllCharacters = async () => {
        const characters = await this.getResource(`/characters?page=5&pageSize=10`);
        return characters.map(this._transformChar)
    }

    getCharacter = async (id) => {
        const character = await this.getResource(`/characters/${id}`);
        return this._transformChar(character);
    }

    getAllBooks = async () => {
        const res = await this.getResource(`/books/`);
        return res.map(this._transformBook);
    }

    getBook = async (id) => {
        const res = await this.getResource(`/books/${id}/`);
        return this._transformBook(res);
    }

    getAllHouses = async () => {
        const res = await this.getResource(`/houses/`);
        return res.map(this._transformHouse);
    }

    getHouse = async (id) => {
        const res = await this.getResource(`/houses/${id}/`);
        return this._transformHouse(res)
    }

    isSet(data){
        if(data) {return data}
            else {return 'no data'}
    }
    
    _extractId(item){
        const idRegExp = /\/([0-9]*)$/;
        return item.url.match(idRegExp)[1];
    }

    _transformChar(char){
        return {
            id: this._extractId(char),
            name: this.isSet(char.name),
            gender: this.isSet(char.gender),
            born: this.isSet(char.born),
            died: this.isSet(char.died),
            culture: this.isSet(char.culture)
        }
    }

    _transformHouse(house){
        return{
            id: this._extractId(house),
            name:  this.isSet(house.name),
            region:  this.isSet(house.region),
            words:  this.isSet(house.words),
            title:  this.isSet(house.title),
            overlord:  this.isSet(house.overlord),
            ancestralWeapons:  this.isSet(house.ancestralWeapons)
        }
    }

    _transformBook(book){
        return {
            id: this._extractId(book),
            name: this.isSet(book.name),
            numberOfPages: this.isSet(book.numberOfPages),
            publiser: this.isSet(book.publiser),
            released: this.isSet(book.released)
        }
    }
}
