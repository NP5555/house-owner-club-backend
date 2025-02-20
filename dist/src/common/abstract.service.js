"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractService = void 0;
class AbstractService {
    constructor(repository) {
        this.repository = repository;
    }
    async findById(id, options = {}) {
        options.where = { id };
        return this.repository.findOne(options);
    }
    async findOne(findData) {
        return this.repository.findOneBy(findData);
    }
    async findAll(options = {}) {
        return this.repository.find(options);
    }
    async create(item) {
        return this.repository.insert(item);
    }
    async delete(options) {
        return this.repository.delete(options);
    }
    async updateById(id, item) {
        const instance = await this.findById(id);
        Object.assign(instance, item);
        await this.repository.save(instance);
        return instance;
    }
    async updateByKey(findData, item) {
        const instance = await this.findOne(findData);
        Object.assign(instance, item);
        await this.repository.save(instance);
        return instance;
    }
    async getOneQB(queryBuilder) {
        return queryBuilder.getOne();
    }
    async getManyQB(queryBuilder) {
        return queryBuilder.getMany();
    }
    async getRawOneQB(queryBuilder) {
        return queryBuilder.getRawOne();
    }
    async getRawManyQB(queryBuilder) {
        return queryBuilder.getRawMany();
    }
    async hasRefInGivenTables(id, fkField, relations, moreTables) {
        let tableName, field, noDelCol;
        const relatedTables = [];
        for (let i = 0; i < relations.length; i++) {
            tableName = this.repository.manager.getRepository(relations[i].entity).metadata.tableName;
            field = relations[i].field || fkField;
            noDelCol = !!relations[i].noDelCol;
            relatedTables.push({ tableName, field, noDelCol, linkTable: relations[i].linkTable });
        }
        if (Array.isArray(moreTables)) {
            for (let i = 0; i < moreTables.length; i++) {
                tableName = moreTables[i].tableName;
                field = moreTables[i].field || fkField;
                noDelCol = !!moreTables[i].noDelCol;
                relatedTables.push({ tableName, field, noDelCol, linkTable: moreTables[i].linkTable });
            }
        }
        if (relatedTables.length === 0)
            return false;
        let rawQuery = '';
        for (let i = 0; i < relatedTables.length; i++) {
            rawQuery += `
                  SELECT '_' as count
                  FROM "${relatedTables[i].tableName}" 
                  WHERE "${relatedTables[i].tableName}"."${relatedTables[i].field}" = '${id}'`;
            if (!relatedTables[i].noDelCol) {
                rawQuery += ` AND "${relatedTables[i].tableName}".deleted = FALSE`;
            }
            if (i !== relatedTables.length - 1) {
                rawQuery += `
                    UNION `;
            }
        }
        const res = await this.repository.manager.query(rawQuery);
        return Array.isArray(res) && res.length > 0;
    }
}
exports.AbstractService = AbstractService;
//# sourceMappingURL=abstract.service.js.map