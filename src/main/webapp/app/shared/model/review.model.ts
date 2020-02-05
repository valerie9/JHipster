export interface IReview {
  id?: number;
  message?: string;
}

export class Review implements IReview {
  constructor(public id?: number, public message?: string) {}
}
