/* Globals Interfaces */
interface SessionUser {
  name?: string;
  isAuthenticated: boolean;
}

declare global {
  namespace Express {
    /* Extende properties Profile in User */
    interface User extends Profile {}
    /* Export Request */
    export interface Request {
      dataUser?: SessionUser;
    }
  }
}

declare module 'express-session' {
  interface Session {
    user?: Profile;
  }
}

/* Start App */
const app: Express = express();

const port: number = 8080;

void startApollo(app);

app
  .use(bodyParser.json())
  .use(
    cors({
      origin: ['https://studio.apollographql.com' /* Add Render URL */],
      credentials: true
    })
  )
  .use(cookieParser())
  .use(
    session({
      secret: process.env.SESSION_SECRET as string,
      resave: false,
      saveUninitialized: false
    })
  )
  .use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Request-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
  })
  .use(passport.initialize())
  .use(passport.session())
  .use('/main', (req, res) => {
    res.send('Welcome');
  })
  .use(
    '/',
    (req, res, next) => {
      req.dataUser = {
        name: req.session.user?.displayName,
        isAuthenticated: !!req.session.user
      };
      next();
    },
    router
  );

middlewarePassport();

initDB((err: Error | null, db?: typeof import('mongoose')) => {
  if (err) {
    console.log(err);
  }
});

app.listen(port);
console.log(`Server is running in port ${port}!`);
