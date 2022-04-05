import { NFTStorage, File } from 'nft.storage'
import mime from 'mime'
import fs from 'fs'
import path from 'path'


// read the API key from an environment variable. You'll need to set this before running the example!
//const API_KEY = process.env.NFT_STORAGE_API_KEY
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGQxNDBBNzdBMDUyMDNkMzEwN2IxNzk1MjY0YWY1RjNBZTkxRDQyODAiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY0NjI0MTE0NjQzNywibmFtZSI6InRlc3QifQ.E-iLyaXhsEz9dR7w2ZpzOvpifmtmmcWjtA-VZqS3kPo"

async function storeNFT(imagePath) {
    const image = await fileFromPath(imagePath)

    // create a new NFTStorage client using our API key
    const nftstorage = new NFTStorage({ token: API_KEY })

    // call client.store, passing in the image & metadata
    return nftstorage.store({
        image,
        name: "Place Name",
        description: "Place Description",
    })
}

/**
  * A helper to read a file from a location on disk and return a File object.
  * Note that this reads the entire file into memory and should not be used for
  * very large files. 
  * @param {string} filePath the path to a file to store
  * @returns {File} a File object containing the file content
  */
 async function fileFromPath(filePath) {
    const content = await fs.promises.readFile(filePath)
    const type = mime.getType(filePath)
    return new File([content], path.basename(filePath), { type })
}

async function main() {
    const args = process.argv.slice(2)
    const [imagePath, name, description] = args
    const result = await storeNFT(imagePath, name, description)
    console.log(result)
} 

main()
  .catch(err => {
      console.error(err)
      process.exit(1)
  })