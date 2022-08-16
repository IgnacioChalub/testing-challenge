import { IBaseRepository } from '@shared/repository';
import { DatabaseService } from '@shared/service';
export declare class BaseRepository<T extends {
    id: any;
}> implements IBaseRepository<T> {
    private readonly db;
    private readonly model;
    constructor(db: DatabaseService, model: string);
    create(data: any): Promise<T>;
    findAll(): Promise<T[]>;
    findById(id: T['id']): Promise<T>;
    findMany(query: any): Promise<T[]>;
    findOne(query: any): Promise<T>;
}
