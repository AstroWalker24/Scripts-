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
            headers:{Authorization:`token ${GITHUB_TOKEN}`}
        });

        return response.data.map((repo:any)=>repo.name );
    }

    catch(error){
        console.log(`Error Fetching the repositories ${error.message}`);
        return [];
    }
}


async function deleteRepo(repo_name: string): Promise<boolean>{
    try{ 

        const response: any = await axios.delete(`${API_URL}/repos/${GITHUB_USERNAME}/${encodeURIComponent(repo_name)}`,{
           headers:{Authorization:`token ${GITHUB_TOKEN}`},
           timeout:10000
        });

        console.log("Successfully deleted: ",repo_name);
        return true

    }

    catch(error: any){
        console.log(`Error occured while deleting the repo ${error.message}`);
        return false 
    }
}

async function main(){
    const repos: string[] = await getRepos();

    if (repos.length === 0){
        console.log("No repos found");
        return ;
    }

    console.log(`\n Found ${repos.length} repositories`);
    repos.forEach((repo: string)=> console.log(repo));

    const delete_name : string = prompt("\n Enter the repo name you want to delete");

    if (!repos.includes(delete_name)){
        console.log("Invalid Repo name, Enter a valid repo name");
        return ;

    }

    const confirmation: string = prompt(`Are you sure you want to delete ${delete_name} (yes/no)`);

    if (confirmation.toLowerCase() === 'yes'){
        const success: boolean =  await deleteRepo(delete_name);
        if (success){
            console.log("Repo Deleted Successfully");
            return ;
        }
        else{
            console.log("Error occured while deleting the repo");
            return ;
        }
    }

    else{
        console.log("Deletion Aborted");
        return ;
    }


}


main();




