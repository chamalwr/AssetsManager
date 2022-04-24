import { Module } from '@nestjs/common';
import { NewrelicInterceptor } from './newrelic-interceptor';

@Module({
    providers: [NewrelicInterceptor],
    exports: [NewrelicInterceptor, ObservabilityModule]
})
export class ObservabilityModule {}
