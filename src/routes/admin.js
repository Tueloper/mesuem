/* eslint-disable import/extensions */
import { Router } from 'express';
import { Bouncers, GeneralMiddleware } from '../middlewares';
import { AdminController } from '../controller';

const router = Router();
const {
  adminBouncers
} = Bouncers;
const { verifyLocation, verifyCollection, verifyFavorites } = GeneralMiddleware;
const {
  addCollection,
  addFavorite,
  addLocation,
  getCollections,
  getFavorites,
  getLocation,
  deleteCollection,
  deleteFavorite,
  deleteLocation,
  addArtefact,
  getAllArtefact,
  deleteArtefact,
} = AdminController;

// define apis
router.post('/add/location', adminBouncers, verifyLocation, addLocation);
router.post('/add/collection', adminBouncers, verifyCollection, addCollection);
router.post('/add/favorite', adminBouncers, verifyFavorites, addFavorite);
router.get('/get/location', getLocation);
router.get('/get/collection', getCollections);
router.get('/get/favorite', getFavorites);
router.delete('/delete/location', adminBouncers, deleteLocation); // id=[]
router.delete('/delete/collection', adminBouncers, deleteCollection); // id=[]
router.delete('/delete/favorite', adminBouncers, deleteFavorite); // id=[]
router.post('/add/artefact', adminBouncers, addArtefact);
router.get('/getall/artefact', getAllArtefact);
router.get('/getsingle/artefact', adminBouncers, getAllArtefact);
router.delete('/delete/artefact', adminBouncers, deleteArtefact);

export default router;
