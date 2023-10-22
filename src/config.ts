const config = {
  bcryptSaltRounds: 10,

  // if changing jwtExpiresIn, also take change in following files
  // - /src/routes/auth/auth.service.ts [_createToken() fn]
  // - /src/tasks.service.ts [@Interval(30 * 60 * 1000)]
  jwtExpiresIn: "30d",
}

export default config;
