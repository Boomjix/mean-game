import * as mongoose from 'mongoose';
import { logger } from '../logger';
import {readFileSync} from 'fs';
import {resolve} from 'path';
import {stringify} from 'fast-safe-stringify';

export const mockDB = process.env.DB_MOCK === 'true';

///
///
///
///

const {DB_HOST, DB_PORT} = process.env;
const host = DB_HOST === undefined ? 'localhost' : DB_HOST;
const portStr = DB_PORT === undefined ? '27017' : DB_PORT;
const port = parseInt(portStr, 10);

//"mongodb+server://" statt "mongodb://" bei DNS-Name
const url = `mongodb://${host}:${port}`;
const dbName = 'hska';
const user = 'admin';
const pass = 'p';
const authSource = 'admin';
const replicaSet = 'replicaSet';
const ssl = true;
const sslCert = readFileSync(resolve(__dirname,'certificate.cer'));

// https://mongoosejs.com/docs/deprecations.html
const useNewUrlParser = true;

// findOneAndUpdate nutzt findOneAndUpdate() von MongoDB statt findAndModify()

const useFindAndModify = false;

// Mongoose nutzt createIndex() von MongoDB statt ensureIndex()

const useCreateIndex = true;

// Neue Server Discovery
const useUnifiedTopology = true;

mongoose.pluralize(undefined);


export const connectDB = async () => {
    if (mockDB){
        console.warn('Mocking: Keine DB-Verbindung');
        return;

    }

    const { connection } = mongoose;
    console.info(`URL fuer mongoose: ${url}`);

    

    const options: mongoose.ConnectionOptions = {
        user,
        pass,
        authSource,
        dbName,
        replicaSet,
        ssl,
        sslCert,
        useNewUrlParser,
        useCreateIndex,
        useUnifiedTopology,
    };

    try {
        await mongoose.connect(url,options);
    }

     








}