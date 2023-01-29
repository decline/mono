export interface User<I = string> {
  id: I;
  userName: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
}
