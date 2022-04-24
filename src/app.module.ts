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
import { SecurityModule } from './security/security.module';
import { ObservabilityModule } from './observability/observability.module';
import ConfigurationsModule from './configurations/configurations.module';
require('newrelic');
const apolloServerNewRelicPlugin = require('@newrelic/apollo-server-plugin')

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
          playground: configService.get('graphql.playground'),
          plugins: [apolloServerNewRelicPlugin]
        }
      }
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigurationsModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          uri: configService.get('dataSources.mongodb.uri'),
          dbName: configService.get('dataSources.mongodb.dbName'),
          retryAttempts: 3,
          ssl: true,
          sslValidate: true,
          authMechanism: 'MONGODB-X509',
          tlsCertificateKeyFile: join(
            __dirname,
            'security/cert/assert-manager-db.pem',
          )
        }
      }
    }),
    ExpenseSheetsModule,
    IncomeSheetsModule,
    ConfigurationsModule,
    SecurityModule,
    ObservabilityModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
