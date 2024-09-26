import { Type } from '@sinclair/typebox'

const DataSourceSchema = Type.Object({
    id: Type.Integer(),
    nombre: Type.String({ maxLength: 100 }),
    tipo: Type.String({ maxLength: 50 }),
    url: Type.String({ maxLength: 225 }),
    activo: Type.Boolean(),
    ultima_actualizacion: Type.String({ format: 'date-time' }),
    numero_propiedades: Type.Integer(),
    error_rate: Type.Number(),
    api_key: Type.Optional(Type.String()),
    headers: Type.Optional(Type.Record(Type.String(), Type.String())),
    parametros: Type.Optional(Type.Record(Type.String(), Type.String())),
    selector_propiedades: Type.Optional(Type.String()),
    transformacion: Type.Optional(Type.String()),
})

const CreateDataSourceSchema = Type.Omit(DataSourceSchema, ['id', 'ultima_actualizacion', 'numero_propiedades', 'error_rate'])

const UpdateDataSourceSchema = Type.Partial(CreateDataSourceSchema)

export { DataSourceSchema, CreateDataSourceSchema, UpdateDataSourceSchema }