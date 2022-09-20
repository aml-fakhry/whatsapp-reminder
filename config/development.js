export const config = {
  dbUrl:
    'mongodb://aml_fakhry:aml1234567890@asis-shard-00-00.wvifm.mongodb.net:27017,asis-shard-00-01.wvifm.mongodb.net:27017,asis-shard-00-02.wvifm.mongodb.net:27017/test?replicaSet=atlas-wdlxf0-shard-0&ssl=true&authSource=admin',
  PORT: process.env.PORT || 3000,
  APP_HOST: 'http://164.90.190.135',
  HASHING_SALT_ROUNDS: 10,
  JWT_PRIVATE_KEY: 'Aml_fakhri_signature',
  JWT_LIFE_TIME: '10d',
  WS_PORT: 3333,
};
