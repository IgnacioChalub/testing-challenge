import { OnModuleInit, OnModuleDestroy, INestApplication } from '@nestjs/common';
import { DatabaseService } from '@shared/service';
export declare class PrismaService extends DatabaseService implements OnModuleInit, OnModuleDestroy {
    constructor();
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
    enableShutdownHooks(app: INestApplication): Promise<void>;
}
