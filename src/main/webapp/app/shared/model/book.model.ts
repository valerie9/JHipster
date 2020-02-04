export interface IBook {
  id?: number;
  title?: string;
  price?: string;
}

export class Book implements IBook {
  constructor(public id?: number, public title?: string, public price?: string) {}
}
