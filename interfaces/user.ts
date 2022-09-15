export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  photo?: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}
