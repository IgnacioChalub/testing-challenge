"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Models = void 0;
const client_1 = require("@prisma/client");
exports.Models = Object.getOwnPropertyNames(new client_1.PrismaClient()).filter((model) => !['disconnect', 'connect', 'executeRaw', 'queryRaw', 'transaction', 'on'].includes(model) && !model.startsWith('_'));
//# sourceMappingURL=models.js.map