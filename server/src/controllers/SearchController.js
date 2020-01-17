const Dev = require("../models/Dev");
const parseStringAsArray = require("../utils/parseStringAsArray");

class SearchController {
  async index(req, res) {
    console.log(req.query);
    const { latitude, longitude, techs } = req.query;

    const techsArray = parseStringAsArray(techs);

    const devs = await Dev.find({
      techs: {
        $in: techsArray
      },
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude]
          },
          $maxDistance: 10000
        }
      }
    });

    return res.json({ devs });
  }
}

module.exports = new SearchController();
