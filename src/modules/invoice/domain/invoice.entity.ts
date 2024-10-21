import AggregateRoot from '../../@shared/domain/entity/aggregate-root.interface';
import BaseEntity from '../../@shared/domain/entity/base.entity';
import Address from '../../@shared/domain/value-object/address.value-object';
import Id from '../../@shared/domain/value-object/id.value-object';

type EntityProps = {
  id?: Id;
  name: string;
  document: string;
  address: Address;
  items: InvoiceItem[];
  createdAt?: Date;
  updatedAt?: Date;
};

type InvoiceItem = {
  id?: string;
  name: string;
  price: number;
};

export default class Invoice extends BaseEntity implements AggregateRoot {
  private _name: string;
  private _document: string;
  private _address: Address;
  private _items: InvoiceItem[];

  constructor(props: EntityProps) {
    super(props.id, props.createdAt, props.updatedAt);
    this._name = props.name;
    this._document = props.document;
    this._address = props.address;
    this._items = props.items;
  }

  get name(): string {
    return this._name;
  }

  get document(): string {
    return this._document;
  }

  get address(): Address {
    return this._address;
  }

  get items(): InvoiceItem[] {
    return this._items;
  }
}
