# SSIU
### Clonar el proyecto y hacerlo funcionar

- **git clone https://github.com/JorgeLuisMartinez/SSIU.git**
- Ejecutar el comando** npm Install**
- Crear un archivo **.env** en la carpeta raiz del repositorio con la sgte configuración:

```
PORT = 9000
DB_USER = mdi2023
DB_PASS = @t7jhn9jvcp7f
DB_HOST = md1-jjm.postgres.database.azure.com
DB_PORT = 5432
DB_NAME = appmdi2023

TYPEORM_CONNECTION = postgres
TYPEORM_HOST = md1-jjm.postgres.database.azure.com
TYPEORM_USERNAME = mdi2023
TYPEORM_PASSWORD = @t7jhn9jvcp7f
TYPEORM_DATABASE = appmdi2023
TYPEORM_PORT = 5432
TYPEORM_SYNCHRONIZE = false
TYPEORM_LOGGING = true
TYPEORM_ENTITIES = src/**/*.entity.ts

TYPEORM_MIGRATIONS = src/database/migrations/*.ts
TYPEORM_MIGRATIONS_DIR = src/database/migrations
TYPEORM_MIGRATIONS_TABLE_NAME = migrations

JWT_SECRET=RbwJ?Es$t8P3ua$HbQsna@%@xJ4ep@
JWT_ACCESS_TOKEN_EXPIRATION_TIME=10d
```
### Correr el proyecto
- Ejecutar el comando** npm run start:dev** para ejecutar el proyecto.

### Configuracion de insomnia o postman para realizar solicitudes al servidor
- Descargar los archivos de configuracion para importar los endpoints, en el sgte link: https://www.dropbox.com/scl/fo/jz1bihphqcnruikmpeqp8/h?rlkey=dpsplh3ug81kw29c7veom2ndo&dl=0
- Para Insomnia(recomendado, pq es el que estamos usando) importar el tipo de archivo .JSON
- Para Postman importar el archivo .HAR
