import { URLSearchParams } from "url";
import fetch from "node-fetch";

export const VTURLReq = async (url: string): Promise<Record<string, any>> => {
  const formStruct = new URLSearchParams();
  formStruct.append(`url`, url);
  return (
    await fetch(`https://www.virustotal.com/api/v3/urls`, {
      method: `POST`,
      body: formStruct,
      headers: {
        "x-apikey": process.env.VIRUS_TOTAL_KEY as string,
      },
    })
  ).json();
};

export const VTSearch = async (query: string): Promise<Record<string, any>> => {
  return await (
    await fetch(`https://www.virustotal.com/api/v3/search?query=${query}`, {
      method: `GET`,
      headers: {
        "x-apikey": process.env.VIRUS_TOTAL_KEY as string,
      },
    })
  ).json();
};
export const VTIDAnalysis = async (
  id: string
): Promise<Record<string, any>> => {
  return await (
    await fetch(`https://www.virustotal.com/api/v3/analyses/${id}`, {
      method: `GET`,
      headers: {
        "x-apikey": process.env.VIRUS_TOTAL_KEY as string,
      },
    })
  ).json();
};
