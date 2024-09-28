import { Static, Type } from "@sinclair/typebox";
import { UsuarioSchema } from "../usuario/UsuarioSchema.js";
import { PropertieSchema } from "../properties/propertySchema.js";

export const NotificationSchema = Type.Object({
    id: Type.Number(),
    userId: Type.Ref(UsuarioSchema.properties.id),
    propertyId: Type.Ref(PropertieSchema.properties.id),
    notificationDate: Type.String({ format: 'date-time' }),
    summary:Type.String(),
    link: Type.String({ maxLength: 225 }),
}, { additionalProperties: false });

export type NotificationType = Static<typeof NotificationSchema>;
