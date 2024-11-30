import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Role } from "../enums/role.enums";

@Schema({
    timestamps: true
})

export class User {

    @Prop()
    name: string;

    @Prop({unique: ['Duplicate email entered']})
    email: string;

    @Prop()
    password: string;

    @Prop({
        type: [{type:  String, enum: Role}],
        default: [Role.USER]
    })
    role: Role[]
} 

export const UserSchema = SchemaFactory.createForClass(User) 