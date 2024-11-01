import {
    IsString,
    validate,
    IsNotEmpty,
    IsNumber,
  } from 'class-validator';
  
  export const validateAddToCartReqBody = async (
    body: Record<string, unknown>,
  ): Promise<string[]> => {
    const dto = Object.assign(new AddToCartReqBodyDto(), body);
    const errors = await validate(dto);
    if (errors.length > 0) {
      return errors.map((err) => Object.values(err.constraints ?? {}).join(', '));
    }
    return [];
  };
  
  export class AddToCartReqBodyDto {
    @IsNotEmpty()
    @IsString()
    name!: string;
  
    @IsNotEmpty()
    @IsString()
    barcode!: string;
  
    @IsNotEmpty()
    @IsNumber()
    price!: string;

    @IsNotEmpty()
    @IsNumber()
    orderId!: number;
  }
  