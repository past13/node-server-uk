import { Request, Response } from 'express';
import LocationService from "../service/locationService";

export default class LocationController {       

    public async addLocation (req: Request, res: Response) {
        const body = req.body;
        const service = new LocationService();
        
        try {
            const location = await service.addLocation(body);
            if (location) {
                res.status(200).json(location);
            } else {
                res.status(200).json(location);
            }
        } catch (err) {
            res.status(401).json("Invalid Location");
        }
    }

    public async getLocations (req: Request, res: Response) {
        const service = new LocationService();
        const result = await service.getLocations();

        res.status(200).json(result);
    }

    public async deleteLocation (req: Request, res: Response) {
        const locationId = req.params.id;
        const service = new LocationService();
        const result = await service.deleteLocationById(locationId);
        
        if (result.deletedCount !== undefined && result.deletedCount > 0) {
            res.status(200).json("location deleted");
        } else {
            res.status(200).json("location was not deleted");
        }
    }
}