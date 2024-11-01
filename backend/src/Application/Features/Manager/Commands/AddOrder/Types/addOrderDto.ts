import {
  IsString,
  IsEnum,
  ValidateNested,
  validate,
  IsArray,
  IsNotEmpty,
  IsInt,
  IsBoolean,
} from "class-validator";
import { plainToInstance, Type } from "class-transformer";
import { extractErrors } from "../../../../../../Errors/error.js";

export const validateAddOrderReqBody = async (
  body: Record<string, unknown>,
): Promise<string[]> => {
  const dto = plainToInstance(AddGoodsReqBodyDto, body);
  const errors = await validate(dto, {
    whitelist: true,
    forbidNonWhitelisted: true,
    skipMissingProperties: false,
  });

  console.log('Validation Errors:', JSON.stringify(errors, null, 2));

  if (errors.length > 0) {
    return extractErrors(errors);
  }
  return [];
};



export class OrderDetailDto {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsInt()
  quantity!: number;

  @IsNotEmpty()
  @IsInt()
  price!: number;
}

export class AddGoodsReqBodyDto {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsInt()
  total!: number;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderDetailDto)
  orderDetails!: OrderDetailDto[];

  @IsNotEmpty()
  @IsEnum(["line", "delay"])
  paymentMethod!: string;

  @IsNotEmpty()
  @IsBoolean()
  isPaid!: boolean;
}
