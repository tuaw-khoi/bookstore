const startTokenExpirationCheck = (
  setAuthen: any,
  checkTokenExpiration: any
) => {
  const checkAuthen = checkTokenExpiration();
  setAuthen(checkAuthen as any);
};

export default startTokenExpirationCheck;
