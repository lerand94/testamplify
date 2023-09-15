import ArchiveCard from '@/components/ArchiveCard';
import { Flex, Collection, Button } from '@aws-amplify/ui-react';
import {DataStore, Predicates, Storage} from 'aws-amplify'
import { Archives as ArchivesModel } from "@/models";
import React from 'react';
import { useState,useEffect } from 'react';


// export function downloadBlob(blob, filename) {
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = filename || 'download';
//     const clickHandler = () => {
//       setTimeout(() => {
//         URL.revokeObjectURL(url);
//         a.removeEventListener('click', clickHandler);
//       }, 150);
//     };
//     a.addEventListener('click', clickHandler, false);
//     a.click();
//     return a;
//   }
  
//   // usage
//   async function download() {
//     const result = await Storage.get(fileKey, { download: true });
//     downloadBlob(result.Body, 'filename');
//   }

// export default function Archives() {
//     // const result = await Storage.get(`archives/test.zip`, { download: true });
//     // console.log(result)

//     const [archives,setArchives] = useState({});

//     useEffect( () => {
//         const fetchData = async () => {
//         //     Storage.list('archives/') // for listing ALL files without prefix, pass '' instead
//         //     .then(({ results }) => {
//         //         console.log(results)
//         //         setArchives('archives/test.zip')
//         //     })
//         //     .catch((err) => console.log(err));
//         //   }
//         const result = await Storage.get(`archives/test.zip`, { download: true });
//             console.log(result)
//             setArchives(result)
//         }
//           fetchData()
//     }, []);
    
//     return(
//         <h1>{archives.Body.blob}</h1>
//     )

// }

export default function Archives() {
    const [gridTemplate,setGridTemplate] = React.useState('repeat(4, 1fr)')
    const [archivesData,setArchivesData] = React.useState<Array<ArchivesModel>>([]);

    React.useEffect(() => {
        const sub = DataStore.observeQuery(ArchivesModel,Predicates.ALL, {
          sort: (archive) => archive.updatedAt("DESCENDING"),
        })
          .subscribe(snapshot => {
            const { items } = snapshot;
            setArchivesData(items);
          })
    
          return () => { sub.unsubscribe() }
      }, []);

    const changeGrid = (e) => {
        
    }

    // const [fileData, setFileData] = useState();
    // const [fileStatus, setFileStatus] = useState(false);
    // const [s3DownloadLinks, setS3DownloadLinks] = useState([]);

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

    //   async function generateDownloadLinks(fileKey) {
    //     const result = await Storage.get(fileKey, { download: true });
    //     return downloadBlob(result.Body, "filename");
    //   }
    
    //   async function downloadBlob(blob, filename) {

    //     const url = URL.createObjectURL(blob);
    //     console.log(filename);
    //     const a = document.createElement("a");
    //     a.href = url;
    //     return a;
    //   }

    // useEffect(() => {
    //     listObjectsFromS3();
    //   }, []);

    // return(
    //     <div>
    //     {s3DownloadLinks.map((item, index) => (
    //         <div key={index}>
    //           <a href={item} target="_blank" download="">
    //             Link {index}
    //           </a>
    //         </div>
    //       ))}
    //       </div>
    // )
    return(
        <Flex direction='column' alignItems='center' padding='xl' backgroundColor="background.secondary">
            <Flex><Button onClick={(e) => changeGrid(e)}>4</Button><Button onClick={(e) => changeGrid(e)}>6</Button><Button onClick={(e) => changeGrid(e)}>8</Button></Flex>
            <Collection items={archivesData} type="grid" templateColumns={gridTemplate} gap='small' isPaginated itemsPerPage={10}>
                {
                    (item,index) => (
                    <ArchiveCard archive={item} key={index} />
                    )
                }
            </Collection>
    </Flex>
    )
}

