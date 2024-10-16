import AggregateRoot from '../../@shared/domain/entity/aggregate-root.interface';
import BaseEntity from '../../@shared/domain/entity/base.entity';
import Id from '../../@shared/domain/value-object/id.value-object';

type TransactionProps = {
  id?: Id;
  orderId: string;
  amount: number;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export default class Transaction extends BaseEntity implements AggregateRoot {
  private _orderId: string;
  private _amount: number;
  private _status: string;

  constructor(props: TransactionProps) {
    super(props.id);
    this._orderId = props.orderId;
    this._amount = props.amount;
    this._status = props.status || 'pending';
  }

  validate(): void {
    if (this._amount <= 0) {
      throw new Error('Amount must be greater than zero');
    }
  }

  approve(): void {
    this._status = 'approved';
  }

  decline(): void {
    this._status = 'declined';
  }

  process(): void {
    if (this._amount < 100) {
      this.decline();
    } else {
      this.approve();
    }
  }

  get orderId(): string {
    return this._orderId;
  }

  get amount(): number {
    return this._amount;
  }

  get status(): string {
    return this._status;
  }
}
