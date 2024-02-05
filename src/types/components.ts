export interface ILocationState {
  from: {
    pathname: string;
  };
}

export interface ILocation {
  pathname: string;
  state: ILocationState;
  search: string;
  hash: string;
  key: string;
}
