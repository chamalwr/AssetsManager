import { HttpService } from '@nestjs/axios';
import { Logger } from '@nestjs/common';
import { AxiosResponse } from 'axios';

import { catchError, firstValueFrom, Observable, throwError } from 'rxjs';
import ConfigurationValidationSchema from './configuration.schema';

async function getConfigs() {
  const http = new HttpService();
  const logger = new Logger('ConfigurationService');
  const headers = {
    source: 'service',
  };
  let configResponseRawData: Observable<AxiosResponse<any>>;

  const configurationUrl = `${process.env.CONFIGURATION_BASE_URL}/${process.env.SERVICE_NAME}/${process.env.STAGE}`;

  configResponseRawData = http.get(configurationUrl, { headers }).pipe(
    catchError((e) => {
      if (e.response && e.response.status === 404) {
        logger.error(
          `Cannot find Configuration on host: ${configurationUrl}. Check parameters and Config host URL`,
        );
      }
      return throwError(() => new Error(e));
    }),
  );

  logger.log(`Fetching Configs from ${configurationUrl}`);
  const respose = await firstValueFrom(configResponseRawData);
  const configData = respose.data;
  await ConfigurationValidationSchema.validateAsync(configData).catch((err) => {
    logger.error(err);
    throw new Error(err);
  });
  logger.log(
    `Configuration validation complete on ${configData.service.name}|${configData.service.stage}|${configData._id}`,
  );
  return configData;
}
export default getConfigs;