import * as mongoose from 'mongoose';
import { logger } from '../logger';
import {readFileSync} from 'fs';
import {resolve} from 'path';
import stringify from 'fast-safe-stringify';

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
    } catch (err) {
        logger.error(`${stringify(err)}`);
        logger.error(`Fehler bei der Datenbankverbindung: ${err.message}\n`);
        process.exit(0);
    }
    logger.info(`DB-Verbindung zu ${connection.db.databaseName} ist aufgebaut`);

    connection.on('disconnecting', () => 
        logger.warn('DB-Verbindung wird geschlossen...'),
    );

    connection.on('disconnected', () =>
        logger.warn('DB-Verbindung ist geschlossen...'),
    );
    connection.on('error', () => logger.error('Fehlerhafte DB Verbindung'));
};     

// In Produktion auf False setzen
export const autoIndex = true;

const temp = 'temp';
export const uploadDir = resolve(__dirname, '..','..','..',temp, 'upload');
logger.debug(`Upload-Verzeichnis: ${uploadDir}`);
export const downloadDir = resolve(

    __dirname,
    '..',
    '..',
    '..',
    temp,
    'download',


);
logger.debug(`Download-Verzeichnis: ${downloadDir}`);

export const optimistic = (schema: mongoose.Schema) => {

    schema.pre('findOneAndUpdate', function(){
    const update = this.getUpdate();
    if(update.__v !== null) {
        delete update.__v;
    }
    const keys = ['$set', '$setOnInsert'];
    for (const key of keys) {

        if (update [key] !== null && update[key].__v !==null){
            delete update[key].__v;
            if (Object.keys(update[key]).length === 0) {
                delete update [key];
            }
        }
    }

    update.$inc = update.$inc || {}; // eslint disable
    update.$inc.__v=1;
    
    
});

};

// Copyright @Bene











