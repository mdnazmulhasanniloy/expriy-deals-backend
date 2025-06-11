import { Router } from 'express';
import { userController } from './user.controller';
import validateRequest from '../../middleware/validateRequest';
import { userValidation } from './user.validation';
import auth from '../../middleware/auth';
import { USER_ROLE } from './user.constants';
import parseData from '../../middleware/parseData';
import multer, { memoryStorage } from 'multer';

const router = Router();
const storage = memoryStorage();
const upload = multer({ storage });

router.post(
  '/',
  upload.fields([
    { name: 'profile', maxCount: 1 },
    { name: 'document', maxCount: 2 },
  ]),
  parseData(),
  validateRequest(userValidation?.guestValidationSchema),
  userController.createUser,
);

router.patch(
  '/update-my-profile',
  auth(
    USER_ROLE.admin,
    USER_ROLE.sub_admin,
    USER_ROLE.super_admin,
    USER_ROLE.user,
    USER_ROLE.vendor,
  ),
  upload.single('profile'),
  parseData(),
  userController.updateMyProfile,
);

router.patch(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.sub_admin, USER_ROLE.super_admin),
  upload.single('profile'),
  parseData(),
  userController.updateUser,
);

router.patch(
  '/toggle-status/:id',
  auth(USER_ROLE.admin, USER_ROLE.sub_admin, USER_ROLE.super_admin),
  userController.toggleUserStatus,
);

router.delete(
  '/delete-my-account',
  auth(
    USER_ROLE.admin,
    USER_ROLE.sub_admin,
    USER_ROLE.super_admin,
    USER_ROLE.user,
    USER_ROLE.vendor,
  ),
  userController.deleteMYAccount,
);
router.delete(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.sub_admin, USER_ROLE.super_admin),
  userController.deleteUser,
);

router.get(
  '/my-profile',
  auth(
    USER_ROLE.admin,
    USER_ROLE.sub_admin,
    USER_ROLE.super_admin,
    USER_ROLE.user,
    USER_ROLE.vendor,
  ),
  userController.getMyProfile,
);

router.get('/:id', userController.getUserById);

router.get('/', auth(USER_ROLE.admin), userController.getAllUser);

export const userRoutes = router;
