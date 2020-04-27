import { UserRole } from './user.enum';

export class UserModel {

    public id: number;
    public login: string;
    public password: string;
    public role: UserRole;
    public createdDate: Date;
    public updatedDate: Date;
}
