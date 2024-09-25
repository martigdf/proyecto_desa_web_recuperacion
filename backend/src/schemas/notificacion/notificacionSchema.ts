import { Static, Type } from "@sinclair/typebox";
import { UsuarioSchema } from "../usuario/UsuarioSchema.js";
import { PropiedadSchema } from "../propiedades/PropiedadSchema.js";

export const NotificacionSchema = Type.Object({
    id: Type.Number(),
    userId: Type.Ref(UsuarioSchema.properties.id),
    propertyId: Type.Ref(PropiedadSchema.properties.id),
    notificationDate: Type.String({ format: 'date-time' }),
    summary:Type.String(),
    link: Type.String({ maxLength: 225 }),
}, { additionalProperties: false });

export type NotificacionType = Static<typeof NotificacionSchema>;
