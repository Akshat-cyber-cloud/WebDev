import {PDFParse} from 'pdf-parse';
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import {MistralAIEmbeddings} from "@langchain/mistralai"
import { Pinecone } from '@pinecone-database/pinecone'
import "dotenv/config";
import fs from 'fs';

const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });

const index = pc.index("cohort2-rag");

// let dataBuffer = fs.readFileSync('Story.pdf');
// const parser = new PDFParse({
//     data: dataBuffer
// })

// const data = await parser.getText();

const embeddings = new MistralAIEmbeddings({
    apiKey: process.env.MISTRAL_API_KEY,
    model: "mistral-embed"
})

// const splitter = new RecursiveCharacterTextSplitter({ chunkSize: 500, chunkOverlap: 0 })

// const chunks = await splitter.splitText(data.text);

// const docs = await Promise.all(chunks.map( async(chunk) => {
//     const embedding = await embeddings.embedQuery(chunk);
//     return{
//         text: chunk,
//         embedding
//     }
// }))

// const results = await index.upsert({
//     records: docs.map((doc,i) => ({
//         id: `doc-${i}`,
//         values: doc.embedding,
//         metadata: {
//             text: doc.text
//         }
//     }))
// })

const query = await embeddings.embedQuery("How was the Ayush Breakthrough??");

// console.log(query);

const results = await index.query({
    vector: query,
    topK: 2,
    includeMetadata: true
})

console.log(JSON.stringify(results));