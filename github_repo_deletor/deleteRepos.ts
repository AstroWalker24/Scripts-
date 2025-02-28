import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

const GITHUB_USERNAME = process.env.GITHUB_USERNAME;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const API_URL = 'https://api.github.com';


// validating the github username and token
if (!GITHUB_USERNAME || !GITHUB_TOKEN){
    console.error('Please set GIIHUB_USERNAME AND GITHUB_TOKEN in .env file');
    process.exit(1);
}


// 



