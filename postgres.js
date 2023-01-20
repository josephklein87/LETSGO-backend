const Client = require('pg').Client

const dbConfig = {
	connectionString: 'postgres://rmpwoezhybnyre:72920ab0224fef239f0bbc85dccaa5db6e92a6cb2172588c44d93daff39c5fa0@ec2-3-211-6-217.compute-1.amazonaws.com:5432/d2ncpvdm7ovuvj',
}

if(process.env.DATABASE_URL){
	dbConfig.ssl = { rejectUnauthorized: false }
	dbConfig.connectionString = process.env.DATABASE_URL

}

const client = new Client(dbConfig)


module.exports = client;
