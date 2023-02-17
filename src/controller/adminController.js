/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
import { GeneralService } from '../services';
import { Toolbox } from '../util';
import database from '../models';

const {
  successResponse,
  errorResponse,
} = Toolbox;
const {
  addEntity,
  findByKey,
  deleteByKey,
  findMultipleByKey
} = GeneralService;
const {
  Location,
  Collection,
  Favorite,
  Artefact,
} = database;

const AdminController = {
  /**
   * add Location
   * @async
   * @param {object} req
   * @param {object} res
   * @returns {JSON} a JSON response with user details and Token
   * @memberof AdminController
   */
  async addLocation(req, res) {
    try {
      // add the user using sequelize add command
      const location = await addEntity(Location, { ...req.body });
      return res.status(201).send(
        location
      );
    } catch (error) {
      errorResponse(res, {});
    }
  },

  /**
   * add Collection
   * @async
   * @param {object} req
   * @param {object} res
   * @returns {JSON} a JSON response with user details and Token
   * @memberof AdminController
   */
  async addCollection(req, res) {
    try {
      // add the user using sequelize add command
      const collection = await addEntity(Collection, { ...req.body });
      return res.status(201).send(
        collection
      );
    } catch (error) {
      errorResponse(res, {});
    }
  },

  /**
   * add Favorite
   * @async
   * @param {object} req
   * @param {object} res
   * @returns {JSON} a JSON response with user details and Token
   * @memberof AdminController
   */
  async addFavorite(req, res) {
    try {
      // add the user using sequelize add command
      const favorite = await addEntity(Favorite, { ...req.body });
      return res.status(201).send(
        favorite
      );
    } catch (error) {
      errorResponse(res, {});
    }
  },

  /**
   * get all Favorite
   * @async
   * @param {object} req
   * @param {object} res
   * @returns {JSON} a JSON response with user details and Token
   * @memberof AdminController
   */
  async getFavorites(req, res) {
    try {
      // add the user using sequelize add command
      const favorites = await findMultipleByKey(Favorite, {});
      return res.status(201).send(
        favorites
      );
    } catch (error) {
      errorResponse(res, {});
    }
  },

  /**
   * add Favorite
   * @async
   * @param {object} req
   * @param {object} res
   * @returns {JSON} a JSON response with user details and Token
   * @memberof AdminController
   */
  async getCollections(req, res) {
    try {
      // add the user using sequelize add command
      const collections = await findMultipleByKey(Collection, {});
      return res.status(201).send(
        collections
      );
    } catch (error) {
      errorResponse(res, {});
    }
  },

  /**
   * add Favorite
   * @async
   * @param {object} req
   * @param {object} res
   * @returns {JSON} a JSON response with user details and Token
   * @memberof AdminController
   */
  async getLocation(req, res) {
    try {
      // add the user using sequelize add command
      const locations = await findMultipleByKey(Location, {});
      return res.status(201).send(
        locations
      );
    } catch (error) {
      errorResponse(res, {});
    }
  },

  /**
   * delete Favorite
   * @async
   * @param {object} req
   * @param {object} res
   * @returns {JSON} a JSON response with user details and Token
   * @memberof AdminController
   */
  async deleteFavorite(req, res) {
    try {
      // add the user using sequelize add command
      const favorite = await deleteByKey(Favorite, { id: req.query.id });
      return res.status(201).send(
        favorite
      );
    } catch (error) {
      errorResponse(res, {});
    }
  },

  /**
   * delete Favorite
   * @async
   * @param {object} req
   * @param {object} res
   * @returns {JSON} a JSON response with user details and Token
   * @memberof AdminController
   */
  async deleteLocation(req, res) {
    try {
      // add the user using sequelize add command
      const location = await deleteByKey(Location, { id: req.query.id });
      return res.status(201).send(
        location
      );
    } catch (error) {
      errorResponse(res, {});
    }
  },

  /**
   * delete Favorite
   * @async
   * @param {object} req
   * @param {object} res
   * @returns {JSON} a JSON response with user details and Token
   * @memberof AdminController
   */
  async deleteCollection(req, res) {
    try {
      // add the user using sequelize add command
      const collection = await deleteByKey(Collection, { id: req.query.id });
      return res.status(201).send(
        collection
      );
    } catch (error) {
      errorResponse(res, {});
    }
  },

  /**
   * add artefacts
   * @async
   * @param {object} req
   * @param {object} res
   * @returns {JSON} a JSON response with user details and Token
   * @memberof AdminController
   */
  async addArtefact(req, res) {
    try {
      // add the user using sequelize add command
      const {
        name, description, locationId, collectionId, imageUrl
      } = req.body;
      const artefactBody = {
        name, description, imageUrl, locationId, collectionId
      };

      const artefact = await addEntity(Artefact, { ...artefactBody });

      return res.status(201).send(
        artefact
      );
    } catch (error) {
      errorResponse(res, {});
    }
  },

  /**
   * get all artefacts
   * @async
   * @param {object} req
   * @param {object} res
   * @returns {JSON} a JSON response with user details and Token
   * @memberof AdminController
   */
  async getAllArtefact(req, res) {
    try {
      const artefacts = await Artefact.findAll({
        include: [
          {
            model: Location,
            as: 'location',
            attributes: ['name', 'description'],
          },
          {
            model: Collection,
            as: 'collection',
            attributes: ['name', 'description'],
          }
        ],
        order: [
          ['updatedAt', 'Desc']
        ],
        where: { id: req.query.id || {} }
      }).map((values) => values.get({ plain: true }));

      return res.status(201).send(
        artefacts
      );
    } catch (error) {
      errorResponse(res, {});
    }
  },

  /**
   * add Location
   * @async
   * @param {object} req
   * @param {object} res
   * @returns {JSON} a JSON response with user details and Token
   * @memberof AdminController
   */
  async deleteArtefact(req, res) {
    try {
    // add the user using sequelize add command
      const artefact = await deleteByKey(Artefact, { id: req.query.id });
      return res.status(201).send(
        artefact
      );
    } catch (error) {
      errorResponse(res, {});
    }
  },
};

export default AdminController;
