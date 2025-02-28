import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

if (process.env.GITHUB_USERNAME === undefined || process.env.GITHUB_TOKEN === undefined){
    throw new Error("Missing GitHub credentials. Please set them in the .env file")
}


const GITHUB_USERNAME: string = process.env.GITHUB_USERNAME;
const GITHUB_TOKEN: string  = process.env.GITHUB_TOKEN;
const API_URL: string = 'https://api.github.com';


async function getRepos(): Promise<string[]>{
    try{
        const response:any = await axios.get(`${API_URL}/users/${GITHUB_USERNAME}/repos`,{
            auth:{ username: GITHUB_USERNAME, password: GITHUB_TOKEN }
        });

        return response.data.map((repo:any)=>{
            repo.name
        });
    }

    catch(error){
        console.log(`Error Fetching the repositories ${error.message}`);
        return [];
    }
}







