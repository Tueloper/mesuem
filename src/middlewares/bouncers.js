import AuthMiddleware from './authMiddleware';
import Permissions from '../util/permissions';

const {
  authenticate, verifyRoles
} = AuthMiddleware;
const {
  individual,
  admin,
  group,
} = Permissions;

// api bouncers to allow routes access for both student/lecturer
const Bouncers = {
  adminBouncers: [authenticate, verifyRoles(admin)],
  inidividualBouncers: [authenticate, verifyRoles(individual)],
  groupBouncers: [authenticate, verifyRoles(group)]
};

export default Bouncers;
