import { Connection } from 'mongoose';
export declare class AppService {
    private connection;
    constructor(connection: Connection);
    getHello(): string;
}
