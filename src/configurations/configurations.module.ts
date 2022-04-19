import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import getConfigs from './configurations.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            ignoreEnvFile: true,
            isGlobal: true,
            load: [getConfigs]
        })
    ],
    exports: []
})
export default class ConfigurationsModule {}
