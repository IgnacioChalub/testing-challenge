"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
const runtime_1 = require("@prisma/client/runtime");
const errors_1 = require("../errors");
const service_1 = require("../service");
class BaseRepository {
    constructor(db, model) {
        this.db = db;
        this.model = model;
        if (!service_1.Models.includes(model))
            throw new errors_1.InvalidModelError(`Model ${model} already exists`);
    }
    async create(data) {
        let object = undefined;
        try {
            object = await this.db[this.model].create({ data });
        }
        catch (e) {
            if (e instanceof runtime_1.PrismaClientKnownRequestError)
                throw new errors_1.ResourceAlreadyExistsError(this.model);
            throw e;
        }
        return object;
    }
    async findAll() {
        return this.db[this.model].findMany();
    }
    async findById(id) {
        return this.db[this.model].findUnique({ where: { id } });
    }
    async findMany(query) {
        return this.db[this.model].findMany(Object.assign({}, query));
    }
    findOne(query) {
        return this.db[this.model].findFirst(Object.assign({}, query));
    }
}
exports.BaseRepository = BaseRepository;
//# sourceMappingURL=base.repository.js.map