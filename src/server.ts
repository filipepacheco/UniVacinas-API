import App from '@/app';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import UsersRoute from '@routes/users.route';
import validateEnv from '@utils/validateEnv';
import VaccinesRoute from '@routes/vaccine.route';
import ScheduleRoute from '@routes/schedule.route';

validateEnv();

const app = new App([new IndexRoute(), new UsersRoute(), new AuthRoute(), new VaccinesRoute(), new ScheduleRoute()]);

app.listen();
