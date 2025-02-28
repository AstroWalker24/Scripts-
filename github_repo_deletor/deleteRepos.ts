import axios from 'axios';
import * as dotenv from 'dotenv';
const prompt: any = require('prompt-sync')();

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

        return response.data.map((repo:any)=>repo.name);
    }

    catch(error){
        console.log(`Error Fetching the repositories ${error.message}`);
        return [];
    }
}


async function deleteRepo(repo_name: string): Promise<boolean>{
    try{
        const response: any = await axios.delete(`${API_URL}/repos/${GITHUB_USERNAME}/${repo_name}`,{
            auth:{username: GITHUB_USERNAME, password: GITHUB_TOKEN}
        });
        console.log("Successfully deleted",repo_name);
        
        return true
    }

    catch(error){
        console.log("Error occured while deleting the repository")

        return false 
    }
}

async function main(){
    const repos: string[] = await getRepos();

    if (repos.length === 0){
        console.log("No repos found");
        return ;
    }

    console.log(`Found ${repos.length} repositories`);
    console.log(`${repos}`);


    const delete_name : string = prompt("Enter the repo name you want to delete");

    const success: boolean =  await deleteRepo(delete_name)

}


main();




