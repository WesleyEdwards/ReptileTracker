export type LoginBody = {
  email: string;
  password: string;
};


export type HasId = {
  _id: string
}

export type OrError<T> = T | undefined

export type Condition<T extends HasId> = {
  [P in keyof T]?: T[P][] | T[P]
}