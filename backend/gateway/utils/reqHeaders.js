import proxy from "express-http-proxy";
const proxyWithHeaders = (serviceUrl) => {
  return proxy(serviceUrl, {
    proxyReqOptDecorator: (proxyReqOpt, srcReq) => {
      if (srcReq.user) {
        proxyReqOpt.headers["x-user-id"] = srcReq.user.userId;
      }
    },
  });
};
export default proxyWithHeaders;
