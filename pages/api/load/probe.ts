// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getLoadTimes } from "../../../logic/loadLog";
import type { NextApiRequest, NextApiResponse } from "next";
import type { LoadEntry } from "../../../types/load";

interface LoadPayload {
  data: LoadEntry
}

export default function handler(_req: NextApiRequest, res: NextApiResponse<LoadPayload>) {
  res.status(200).json({ data: getLoadTimes() });
}
