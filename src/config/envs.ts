import 'dotenv/config';
import { get } from 'env-var';


export const envs={
    MONGODB: get('MONGODB').required().asString,
    PORT: get('PORT').required().asPortNumber(),
    DEFAULT_LIMIT: get('DEFAULT_LIMIT').required().default(10).asInt(),
}