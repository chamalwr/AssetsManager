import { ResolveField, Resolver } from "@nestjs/graphql";
import { IncomeCategory } from "../entities/income-category.entity";
import { IncomeResultError } from "./income-category-result.union";

@Resolver('IncomeCategoryResult')
export class IncomeCategoryResultResolver {
  @ResolveField()
  __resolveType(value) {
    console.log(value)
    if (value.name) {
      return IncomeCategory;
    }
    if (value.operation) {
      return IncomeResultError;
    }
    return null;
  }
}
