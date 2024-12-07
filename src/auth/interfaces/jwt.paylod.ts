export interface JwtPayload  {
    email: string;
    name: string;
    password: string;
    id: string;
    role: 'user' | 'admin' | 'moderator';
}