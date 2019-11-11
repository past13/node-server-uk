import { Locations } from "../models/locationSchema";

export default class LocationService {
    
    public async getLocations () {
        return await Locations.find({}, (location) => {
            return location;
        });
    }

    public async getLocationByName (locationtName: string) {
        return await Locations.findOne({ name: locationtName }, (locationt) => {
            return locationt;
        });
    }

    public async deleteLocationById (locationId: string) {
        return await Locations.deleteOne({_id: locationId});
    }

    public async addLocation (body: any) {
        const { name, country, city, address, postCode } = body;
        const updatedAt = new Date();

        const locationExist = await this.getLocationByName(name);
        if (!locationExist) {
            const location = new Locations({
                name,
                country,
                city,
                address,
                postCode,
                updatedAt
            });
    
            await location.save();
            return location;

        } else {
            return "locationExist";
        }

    }
}