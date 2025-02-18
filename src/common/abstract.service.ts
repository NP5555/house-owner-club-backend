import {
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  ObjectLiteral,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult';
import { InsertResult } from 'typeorm/query-builder/result/InsertResult';

export class AbstractService<T extends ObjectLiteral> {
  public repository: Repository<T>;

  constructor(repository: Repository<T>) {
    this.repository = repository
  }
  async findById(id: number | string | Uuid, options: FindOneOptions<T> = {}): Promise<T|null> {
    options.where = { id } as unknown as FindOptionsWhere<T>;

    return this.repository.findOne(options);
  }

  async findOne(findData: FindOptionsWhere<T>): Promise<T | null> {
    return this.repository.findOneBy(findData);
  }

  async findAll(options: FindManyOptions = {}): Promise<T[]> {
    return this.repository.find(options);
  }

  async create(item: QueryDeepPartialEntity<T>): Promise<InsertResult> {
    return this.repository.insert(item);
  }

  async delete(options: any): Promise<DeleteResult> {
    return this.repository.delete(options);
  }

  async updateById(id: number|string, item: QueryDeepPartialEntity<T>): Promise<T> {
    const instance = await this.findById(id) as T;
    Object.assign(instance, item);
    await this.repository.save(instance);
    return instance;
  }

  async updateByKey(findData: FindOptionsWhere<T>, item: QueryDeepPartialEntity<T>): Promise<T> {
    const instance = await this.findOne(findData) as T;
    Object.assign(instance, item);
    await this.repository.save(instance);
    return instance;
  }

  public async getOneQB(queryBuilder: SelectQueryBuilder<T>) {
    return queryBuilder.getOne();
  }

  public async getManyQB(queryBuilder: SelectQueryBuilder<T>) {
    return queryBuilder.getMany();
  }

  public async getRawOneQB<R>(queryBuilder: SelectQueryBuilder<T>) {
    return queryBuilder.getRawOne<R>();
  }

  public async getRawManyQB<R>(queryBuilder: SelectQueryBuilder<T>) {
    return queryBuilder.getRawMany<R>();
  }

  private async hasRefInGivenTables(
    id: string,
    fkField: string,
    relations: { entity: any; field?: string; linkTable?: string; noDelCol?: boolean }[],
    moreTables?: { tableName: string; field?: string; linkTable?: string; noDelCol?: boolean }[],
  ) {
    // 1. Prepare related tables

    let tableName: string, field: string, noDelCol: boolean;
    const relatedTables: {
      tableName: string;
      field: string;
      noDelCol: boolean;
      linkTable?: string;
    }[] = [];
    // Loop relations
    for (let i = 0; i < relations.length; i++) {
      tableName = this.repository.manager.getRepository(relations[i].entity).metadata.tableName;
      field = relations[i].field || fkField;
      noDelCol = !!relations[i].noDelCol;
      relatedTables.push({ tableName, field, noDelCol, linkTable: relations[i].linkTable });
    }

    if (Array.isArray(moreTables)) {
      // Loop more tables
      for (let i = 0; i < moreTables.length; i++) {
        tableName = moreTables[i].tableName;
        field = moreTables[i].field || fkField;
        noDelCol = !!moreTables[i].noDelCol;
        relatedTables.push({ tableName, field, noDelCol, linkTable: moreTables[i].linkTable });
      }
    }

    if (relatedTables.length === 0) return false;

    // 2. Prepared queries
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
