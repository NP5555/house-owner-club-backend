"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const documents_service_1 = require("./documents.service");
const documents_controller_1 = require("./documents.controller");
const documents_entity_1 = require("./entities/documents.entity");
const project_entity_1 = require("../project/entities/project.entity");
let DocumentModule = class DocumentModule {
};
DocumentModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([project_entity_1.ProjectEntity, documents_entity_1.DocumentEntity]),
        ],
        controllers: [documents_controller_1.DocumentController],
        providers: [documents_service_1.DocumentService]
    })
], DocumentModule);
exports.DocumentModule = DocumentModule;
//# sourceMappingURL=documents.module.js.map