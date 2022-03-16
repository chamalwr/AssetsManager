import { Module } from '@nestjs/common';
import { IncomeCategoriesModule } from './income-categories/income-categories.module';
import { ExpenseCategoriesModule } from './expense-categories/expense-categories.module';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { ExpenseSheetsModule } from './expense-sheets/expense-sheets.module';
import { IncomeSheetsModule } from './income-sheets/income-sheets.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    IncomeCategoriesModule,
    ExpenseCategoriesModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/assests-manager-schema.gql'),
      sortSchema: true,
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/assets-manager'),
    ExpenseSheetsModule,
    IncomeSheetsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
