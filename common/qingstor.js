import config from '../config'
import {Config, QingStor} from 'qingstor-sdk'

function init(env) {
    let userConfig = new Config().loadDefaultConfig();
    userConfig.access_key_id = env.access_id;
    userConfig.secret_access_key = env.access_key;

    return new QingStor(userConfig);
}


function uploadObject(sourcePath, destPath) {
    const env = config.qingstor;
    let service = init(env);
    let bucket = service.Bucket(env.bucket_name, env.location);

    return new Promise((resolve, reject) => {
        bucket.putObject(
            destPath,
            {
                body: require('fs').readFileSync(sourcePath),
            },
            (err, data) => {
                if (err) {
                    return reject(err);
                }
                resolve(data);
            }
        );
    });
}

export default { uploadObject }