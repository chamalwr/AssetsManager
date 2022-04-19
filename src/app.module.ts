import { Module } from '@nestjs/common';
import { IncomeCategoriesModule } from './income-categories/income-categories.module';
import { ExpenseCategoriesModule } from './expense-categories/expense-categories.module';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { ExpenseSheetsModule } from './expense-sheets/expense-sheets.module';
import { IncomeSheetsModule } from './income-sheets/income-sheets.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigService } from '@nestjs/config';
import ConfigurationsModule from './configurations/configurations.module';

@Module({
  imports: [
    IncomeCategoriesModule,
    ExpenseCategoriesModule,
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [ConfigurationsModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          autoSchemaFile: join(process.cwd(), 'src/assests-manager-schema.gql'),
          sortSchema: true,
          introspection: configService.get('graphql.introspection'),
        }
      }
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigurationsModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          uri: configService.get('dataSources.mongodb.uri')
        }
      }
    }),
    ExpenseSheetsModule,
    IncomeSheetsModule,
    ConfigurationsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
