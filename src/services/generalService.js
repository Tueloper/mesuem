/* eslint-disable import/no-unresolved */
import { ApiError } from '../util';

const GeneralService = {
  /**
   * add entity to database
   * @async
   * @param {object} model - database model
   * @param {object} data - model data
   * @returns {Promis-Object} A promise object with entity details
   * @memberof GeneralService
   */
  async addEntity(model, data) {
    try {
      // sequelize method for adding values to the database entities
      const { dataValues: value } = await model.create(data);
      return value;
    } catch (error) {
      throw new Error(error);
    }
  },

  /**
   * find entity in database by key
   * @async
   * @param {object} model - database model
   * @param {object} keys - object containing query key and value
   * e.g { id: 5 }
   * @returns {promise-Object} - A promise object with entity details
   * @memberof GeneralService
   */
  async findByKey(model, keys) {
    try {
      // sequelize method for getting a single value by a single/multiple key
      return model.findOne({ where: keys });
    } catch (error) {
      throw new Error(error);
    }
  },

  /**
   * find multiple by keys
   * @async
   * @param {object} model - database model
   * @param {object} keys - object containing query key and value
   * e.g { id: 5 }
   * @param {number} limit - number of details to return
   * @param {number} offset - number of details to jump
   * @returns {promise-Object} - A promise object with entity details
   * @memberof GeneralService
   */
  async findMultipleWithPaginationByKey(model, keys, limit, offset) {
    try {
      // sequelize method for getting all values by a single/multiple key
      return model.findAll({
        where: keys,
        limit,
        offset
      });
    } catch (error) {
      throw new Error(error);
    }
  },

  /**
   * delete entity in database by key value
   * @async
   * @param {object} model - database model
   * @param {object} keys - query key to delete
   * @returns {promise-object | error} A number showing how many rows were deleted
   * @memberof GeneralService
   */
  async deleteByKey(model, keys) {
    try {
      // sequelize method for deleting values by a single/multiple key
      const numberOfRowsDeleted = await model.destroy({ where: keys });
      if (!numberOfRowsDeleted) throw new ApiError(404, 'Not Found');
      return true;
    } catch (error) {
      throw new Error(error);
    }
  },

  /**
   * update entity in database by key value
   * @async
   * @param {object} model - database model
   * @param {object} updateData - data to update
   * @param {object} keys - query key to update
   * @returns {promise-object | error} A promise object with entity detail
   * @memberof GeneralService
   */
  async updateByKey(model, updateData, keys) {
    try {
      // sequelize method for updating values by a single/multiple key
      const [rowaffected, [entity]] = await model.update(
        updateData, { returning: true, where: keys }
      );
      if (!rowaffected) throw new ApiError(404, 'Not Found');
      return entity;
    } catch (error) {
      throw new Error(error);
    }
  },

  /**
   * get all entities in database (no keys)
   * @async
   * @param {object} model - database model
   * @returns {promise-object | error} A number showing how many rows were deleted
   * @memberof GeneralService
   */
  async allEntities(model) {
    try {
      // get all values in the table
      const entities = await model.findAll({ where: {} });
      return entities;
    } catch (error) {
      throw new Error(error);
    }
  },

  /**
   * find multiple by keys
   * @async
   * @param {object} model - database model
   * @param {object} keys - object containing query key and value
   * e.g { id: 5 }
   * @returns {promise-Object} - A promise object with entity details
   * @memberof GeneralService
   */
  async findMultipleByKey(model, keys) {
    try {
      // get all values by single/multiple keys
      return model.findAll({
        where: keys,
        order: [
          ['createdAt', 'ASC'],
        ]
      });
    } catch (error) {
      throw new Error(error);
    }
  },

  /**
   *returns the counts of a Table
   * @async
   * @param {object} model - database model
   * @param {object} keys - query key to decrement
   * @returns {promise-object | error} A promise object with entity detail
   * @memberof GeneralService
   */
  async rowCountByKey(model, keys) {
    try {
      // get all values by single/multiple keys, get rows and also count values
      const entities = await model.findAndCountAll({ returning: true, where: keys });
      if (!entities) throw new ApiError(404, 'Not Found');
      return entities;
    } catch (error) {
      throw new Error(error);
    }
  },

};

export default GeneralService;
