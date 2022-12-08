import { unstable_getServerSession } from "next-auth/next";
import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "./auth/[...nextauth]";

const proxyToBackend = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await unstable_getServerSession(req, res, authOptions);
  const { query, body,url } = req;
  if (session) {
    // Signed in
    //console.log(`Session at ${new Date().toLocaleTimeString()}`, JSON.stringify(session, null, 2));
    res.status(200).json({
      session
    });
  } else {
    // Not Signed in
    res.status(401);
  }
};

export default proxyToBackend;
