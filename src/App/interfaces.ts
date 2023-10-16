export interface ICargo {
  cargoName?: string
  cargoAmount?: string
}

export interface IShipment {
  resources: ICargo[];
  timeAgo: string;
}

export interface IShipmentForm {
  shipments: IShipment[];
}
