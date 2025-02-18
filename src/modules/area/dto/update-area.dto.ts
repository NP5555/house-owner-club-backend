import { StringFieldOptional } from "../../../decorators";

export class UpdateAreaDto {
    @StringFieldOptional()
    name: string;

    @StringFieldOptional()
    description: string;

}
