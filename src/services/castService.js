import Cast from "../models/cast.js";

export default {
    create(castData){
        return Cast.create(castData);
    }
}