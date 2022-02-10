import { Exception } from '@srclaunch/exceptions';
import Logger from '@srclaunch/logger';
import AWS from 'aws-sdk';

AWS.config.update({ region: process.env.AWS_REGION });

const logger = new Logger();

export async function getSecrets(
  paths: string[],
): Promise<AWS.SSM.ParameterList | void> {
  try {
    const ssm = new AWS.SSM({ region: process.env.AWS_REGION });

    const options = {
      Names: paths /* required */,
      WithDecryption: false,
    };

    const parameterPromise = await ssm.getParameters(options).promise();

    logger.debug({
      data: parameterPromise.Parameters,
      message: 'AWS SSM Secrets',
    });

    return parameterPromise.Parameters;
  } catch (err: any) {
    const exception = new Exception(
      `Error caught in getSecret(): ${err.name}`,

      {
        cause: err,
        tags: {
          file: '',
        },
      },
    );

    logger.exception(exception);
  }
}

export async function getParameters(
  paths: string[],
): Promise<AWS.SSM.ParameterList | void> {
  try {
    const ssm = new AWS.SSM({ region: process.env.AWS_REGION });

    const options = {
      Names: paths /* required */,
      WithDecryption: false,
    };
    const parameterPromise = await ssm.getParameters(options).promise();

    logger.debug({
      data: parameterPromise.Parameters,
      message: 'AWS SSM Parameters',
    });

    return parameterPromise.Parameters;
    // parameterPromise.then(
    //   (data: PromiseResult<AWS.SSM.GetParameterResult>, err: AWSError) => {
    //     if (err) throw err;

    //     // an error occurred
    //     console.log(data);

    //     return data; // successful response
    //   },
    // );
  } catch (err: any) {
    const exception = new Exception(
      `Error caught in getParameters(): ${err.name}`,
      {
        cause: err,
        tags: {
          file: '',
        },
      },
    );

    logger.exception(exception);
  }
}
