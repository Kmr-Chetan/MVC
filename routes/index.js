const expres = require('express');
const router = expres.Router();
const homeController=  require('../controllers/home_controller');
const post_controller=  require('../controllers/post_controller');
const login_controller=  require('../controllers/login_controller');

router.get('/', homeController.home);
router.get('/post', post_controller.post);

router.get('/login', login_controller.login);
router.get('/signup', login_controller.signup);

router.post('/create', login_controller.create);
router.post('/createSession', login_controller.createSession);

router.get('/profile', login_controller.profile);
router.get('/sign_out', login_controller.singnout);

module.exports= router;