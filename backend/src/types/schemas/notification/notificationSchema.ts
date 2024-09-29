import { Static, Type } from "@sinclair/typebox";
import { UserSchema } from "../user/userSchema.js";
import { PropertySchema } from "../property/propertySchema.js";

export const NotificationSchema = Type.Object({
    id: Type.Number(),
    userId: Type.Ref(UserSchema.properties.id),
    propertyId: Type.Ref(PropertySchema.properties.id),
    notificationDate: Type.String({ format: 'date-time' }),
    summary:Type.String(),
    link: Type.String({ maxLength: 225 }),
});

export type NotificationType = Static<typeof NotificationSchema>;
