import { StringFieldOptional } from "../../../decorators";

export class UpdateCategoryDto {
    @StringFieldOptional()
    name: string;

    @StringFieldOptional()
    description: string;

}
