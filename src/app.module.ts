import { Module } from '@nestjs/common';
import { IncomeCategoriesModule } from './income-categories/income-categories.module';
import { ExpenseCategoriesModule } from './expense-categories/expense-categories.module';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { ExpenseSheetsModule } from './expense-sheets/expense-sheets.module';

@Module({
  imports: [
    IncomeCategoriesModule,
    ExpenseCategoriesModule,
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/assests-manager-schema.gql'),
      sortSchema: true,
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/assets-manager'),
    ExpenseSheetsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
