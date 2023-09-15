import { Archives } from "@/models";
import { Card, Flex, Text, Grid,Link } from "@aws-amplify/ui-react";
import { StorageImage } from '@aws-amplify/ui-react-storage';
import ReactCountryFlag from "react-country-flag"
import { countries } from "countries-list";
import { useState, useEffect } from "react";
import {Storage} from 'aws-amplify'

export default function ArchiveCard( {archive} : { archive: Archives}) {

   const [fileData, setFileData] = useState();
    const [fileStatus, setFileStatus] = useState(false);
    const [s3DownloadLinks, setS3DownloadLinks] = useState([]);

    // async function listObjectsFromS3() {
    //     const s3Objects = await Storage.list("archives/");
    //     console.log(s3Objects.results)
    //     s3Objects.results.map(async (item) => {
    //       let downloadLink = await generateDownloadLinks(item.key);
    //       setS3DownloadLinks((s3DownloadLinks) => [
    //         ...s3DownloadLinks,
    //         downloadLink,
    //       ]);
    //     });
    //   }

      async function generateDownloadLinks(fileKey) {
        const result = await Storage.get(fileKey, { download: true });
        const url = URL.createObjectURL(result.Body);
        return url;
      }
    
    //   async function downloadBlob(blob, filename) {

    //     const url = URL.createObjectURL(blob);
    //     console.log(filename);
    //     const a = document.createElement("a");
    //     a.href = url;
    //     return a;
    //   }

    useEffect(() => {
        const fetchData = async () => {
            const data = await generateDownloadLinks(archive.archive)
            setFileData(data);
        }
        fetchData();
      }, []);
    //   generateDownloadLinks(archive.archive)
    return (
        <Card variation="elevated" borderRadius="medium">
            <Flex direction='column' >
                <StorageImage imgKey={archive.image} alt={archive.image} objectFit={'contain'}/>
            </Flex>
                <Link href={fileData}>Download</Link>
            <Flex>
            </Flex>
        </Card>
    )
}