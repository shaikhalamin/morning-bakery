import { unstable_getServerSession } from "next-auth/next";
import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "../auth/[...nextauth]";
import axios, { AxiosError } from "axios";
import { API_BASE } from "@/data/utils/api.urls";

const proxyToBackend = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await unstable_getServerSession(req, res, authOptions);
    if (!session) {
      res.json({
        statusCode: 401,
        message: "Authentication failed",
        error: "Unauthorized",
      });
    }
    const { query, body, url, method } = req;
    const proxyUrl = url?.replace("/api/be", "");
    const API_URL = `${API_BASE}/v1${proxyUrl}`;
    const headers = {
      Authorization: `Bearer ${(session as any)?.access_token}`,
    };

    try {
      const apiRes = await axios({
        method: method,
        url: API_URL,
        data: body,
        headers: headers,
      });
      res.status(apiRes.status).json(apiRes.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        res.status(400).json({
          ...error?.response?.data,
        });
      } else {
        res.status(400).json({
          statusCode: 400,
          message: "Unknown server error",
          error: "Bad Request",
        });
      }
    }
  } catch (error) {
    res.json({
      statusCode: 401,
      message: "Authentication failed",
      error: "Unauthorized",
    });
  }
};

export default proxyToBackend;
