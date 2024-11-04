import express, { Express } from 'express';
import { Sequelize } from 'sequelize-typescript';
import { Umzug } from 'umzug';
import { join } from 'path';
import { migrator } from '../../migrations/config/migrator';
import { ProductModel as ProductAdmModel } from '../../modules/product-adm/repository/product.model';
import { productAdmRoute } from '../../modules/product-adm/controller/product-adm.controller';
import { ClientModel } from '../../modules/client-adm/repository/client.model';
import { clientAdmRoute } from '../../modules/client-adm/controller/client-adm.controller';
import { checkoutRoute } from '../../modules/checkout/controller/checkout.controller';
import { OrderModel } from '../../modules/checkout/repository/order.model';
import ProductModel from '../../modules/store-catalog/repository/product.model';
import TransactionModel from '../../modules/payment/repository/transaction.model';
import InvoiceModel from '../../modules/invoice/repository/invoice.model';
import { invoiceRoute } from '../../modules/invoice/controller/invoice.controller';

export const app: Express = express();
app.use(express.json());

app.use('/products', productAdmRoute);
app.use('/clients', clientAdmRoute);
app.use('/checkout', checkoutRoute);
app.use('/invoice', invoiceRoute);

export let sequelize: Sequelize;
export let migration: Umzug<any>;

async function setupDb() {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: join(__dirname, '../../../database.sqlite'),
    logging: false,
  });

  await sequelize.addModels([
    ProductAdmModel,
    ProductModel,
    ClientModel,
    OrderModel,
    TransactionModel,
    InvoiceModel,
  ]);
  migration = migrator(sequelize);
  await migration.up();
}

setupDb();
