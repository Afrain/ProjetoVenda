import { ItemSale } from './itemSale.model';
import { Client } from './client.model';

export class Sale {
  id: number;
  client: Client;
  items: ItemSale[] = [];
  total?: number;
}
