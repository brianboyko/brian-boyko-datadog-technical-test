// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { startLog, getLog } from "../../../logic/loadLog";
import type { NextApiRequest, NextApiResponse } from "next";
import { LoadEntry } from "../../../types/load";
interface LogPayload {
  data: LoadEntry[];
}
export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<LogPayload>
) {
  startLog();
  res.status(200).json({ data: getLog() });
}
