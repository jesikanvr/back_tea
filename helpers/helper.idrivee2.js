
const { v4: uuidv4 } = require('uuid');
const { S3 } = require("../idivee2/idrivee2");
const FS = require('fs');
/****************************************************************************************************************/
/*                                              LISTAR CONTENEDOR                                                /
/****************************************************************************************************************/

const listBuckets = () => {
    // list buckets call
    return new Promise((resolve, reject) => {
        S3.listBuckets((err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}
//EJEMPLO DE USO
/* listBuckets().then(res => {
    console.log(res)
}) */

/****************************************************************************************************************/
/*                                              CREAR CONTENEDOR                                                 /
/****************************************************************************************************************/
const createBucket = (name) => {
    // create bucket 'name' is string params
    var params = {
        Bucket: name,
    };
    // create bucket call
    return new Promise((resolve, reject) => {
        S3.createBucket(params, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data); //{ Location: '/' }
            }
        });
    });
}
//EJEMPLO DE USO
/* createBucket('test').then(res => {
    console.log(res)
}) */

/****************************************************************************************************************/
/*                                              ELIMINAR CONTENEDOR                                              /
/****************************************************************************************************************/
const deleteBucket = (name) => {
    // delete bucket 'my-bucket' is string params
    var params = {
        Bucket: name,
    };
    // delete bucket call
    return new Promise((resolve, reject) => {
        S3.deleteBucket(params, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data); // {}
            }
        });
    });
}
//EJEMPLO DE USO
/* deleteBucket('test').then(res => {
    console.log(res)
})  */

/****************************************************************************************************************/
/*                                              LISTAR FICHEROS                                                  /
/****************************************************************************************************************/
const listObjects = (bucketName) => {
    // list of objects in bucket 'bucketName' params
    var params = {
        Bucket: bucketName,
    };
    // list object call
    return new Promise((resolve, reject) => {
        S3.listObjects(params, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}
//EJEMPLO DE USO
/* listObjects('test').then(res => {
    console.log(res)
}) */
//RESPUESTA DE LISTOBJET
/*
{
  IsTruncated: false,
  Marker: '',
  Contents: [
    {
      Key: '102c5855-bdeb-4b99-8b9f-1e0c6dcc6a51', //ESTA KEY SE USA PARA ELIMINAR EL OBJETO
      LastModified: 2024-05-27T19:55:43.694Z,
      ETag: '"a305d3ddee69a207e1c512f89f734bd7"',
      ChecksumAlgorithm: [],
      Size: 19,
      StorageClass: 'STANDARD',
      Owner: [Object]
    }
  ],
  Name: 'test',
  Prefix: '',
  Delimiter: '',
  MaxKeys: 1000,
  CommonPrefixes: []
}
*/

/****************************************************************************************************************/
/*                                              CREAR FICHEROS                                                   /
/****************************************************************************************************************/
const putObject = (bucketName, extension, buffer,) => {
    let key = `${uuidv4()}.${extension}`
    // upload object 'local-object' as 'my-object' in bucket 'my-bucket' params
    var params = {
        Bucket: bucketName,
        Key: key,
        Body: buffer
    };
    // put object call
    return new Promise((resolve, reject) => {
        S3.putObject(params, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve({ key, storage: data }); // { ETag: '"a305d3ddee69a207e1c512f89f734bd7"' }
            }
        });
    });
}
//EJEMPLO DE USO
/* // Full path of object. For example '../files/local-object'
const file = "C:/Users/Abdiel/Documents/desarrollo/Estudio/node/was3/text.txt";
const fileStream = new FS.createReadStream(file);

putObject('test', fileStream).then(res => {
    console.log(res)
}).catch (err => {
    console.log(err)
}) */

/****************************************************************************************************************/
/*                                              ELIMINAR FICHEROS                                                /
/****************************************************************************************************************/
const deleteObject = (bucketName, key) => {
    // delete object 'my-object' in bucket 'my-bucket' params
    var params = {
        Bucket: bucketName,
        Key: key
    };
    // delete object call
    return new Promise((resolve, reject) => {
        S3.deleteObject(params, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data); //{}
            }
        });
    });
}
//EJEMPLO DE USO
/* deleteObject('test', '102c5855-bdeb-4b99-8b9f-1e0c6dcc6a51').then(res => {
    console.log(res)
})  */


/****************************************************************************************************************/
/*                                              OBTENER FICHEROS                                                /
/****************************************************************************************************************/
const getObjectFisicalWrite = (bucketName, key) => {
    // delete object 'my-object' in bucket 'my-bucket' params
    var params = {
        Bucket: bucketName,
        Key: key, // Por ejemplo, 'carpeta/archivo.txt'
    };


    // Crea un flujo de escritura para guardar el archivo localmente
    const fileStream = FS.createWriteStream(`${__dirname}/${key}`);

    // delete object call
    return new Promise((resolve, reject) => {
        // Obtiene el archivo desde S3 y guárdalo localmente
        S3.getObject(params)
            .createReadStream()
            .pipe(fileStream)
            .on('error', (err) => {
                console.error('Error al obtener el archivo:', err);
                reject({ msg: 'error get file ', err })
            })
            .on('close', () => {
                console.log('Archivo descargado correctamente.');
                resolve({ msg: 'get file succes' })
            });
    });
}


const getObject = (bucketName, key) => {
    // delete object 'my-object' in bucket 'my-bucket' params
    var params = {
        Bucket: bucketName,
        Key: key, // Por ejemplo, 'carpeta/archivo.txt'
    };

    // Obtiene el archivo desde S3 y guárdalo en un búfer
    return new Promise((resolve, reject) => {
        S3.getObject(params, (err, data) => {
            if (err) {
                console.error('Error al obtener el archivo:', err);
                reject({ msg: 'error get file ', err })
            } else {
                // Envía el búfer como respuesta
                resolve(data.Body /*El contenido del archivo en un búfer*/)
            }
        });
    });
}

module.exports = {
    listBuckets,
    createBucket,
    deleteBucket,
    listObjects,
    putObject,
    deleteObject,
    getObject,
};