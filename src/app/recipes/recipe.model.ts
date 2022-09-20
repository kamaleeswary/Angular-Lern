import { Ingrediants } from "../shared/ingrediant.model";

export class Recipes {
    public name:  string;
    public description: string;
    public imagePath: string;
    public ingrediants: Ingrediants[];

    constructor(name: string, desc: string, imagePath: string, ingrediants: Ingrediants[]){
        this.name = name;
        this.description = desc;
        this.imagePath = imagePath;
        this.ingrediants = ingrediants;
    }
}
