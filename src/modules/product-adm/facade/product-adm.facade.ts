import { UsecaseInterface } from '../../@shared/usecase/usecase.interface';
import ProductAdmFacadeInterface, {
  AddProductFacadeInputDto,
  CheckStockFacadeInputDto,
  CheckStockFacadeOutputDto,
} from './product-adm.facade.interface';

export interface UsecaseProps {
  addUsecase: UsecaseInterface;
  checkStockUsecase: UsecaseInterface;
}

export default class ProductAdmFacade implements ProductAdmFacadeInterface {
  private _addUsecase: UsecaseInterface;
  private _checkStockUsecase: UsecaseInterface;

  constructor(usecaseProps: UsecaseProps) {
    this._addUsecase = usecaseProps.addUsecase;
    this._checkStockUsecase = usecaseProps.checkStockUsecase;
  }

  async addProduct(input: AddProductFacadeInputDto): Promise<void> {
    return this._addUsecase.execute(input);
  }

  async checkStock(input: CheckStockFacadeInputDto): Promise<CheckStockFacadeOutputDto> {
    return this._checkStockUsecase.execute(input);
  }
}
