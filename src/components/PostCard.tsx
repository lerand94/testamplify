import { Post } from "@/models";
import { Card, Flex, Text, Grid,Link, Input } from "@aws-amplify/ui-react";
import { StorageImage } from '@aws-amplify/ui-react-storage';
import ReactCountryFlag from "react-country-flag"
import { countries } from "countries-list";
import {Storage} from 'aws-amplify'
import { useState , useEffect} from "react";

export default function PostCard( {post} : { post: Post}) {
    const nameCountry = post.country;

    const [fileData, setFileData] = useState('');

    async function generateDownloadLinks(fileKey) {
        const result = await Storage.get(fileKey, { download: true });
        const url = URL.createObjectURL(result.Body);
        return url;
      }


    useEffect(() => {
    const fetchData = async () => {
        const data = await generateDownloadLinks(post.archive)
        setFileData(data);
    }
    post.archive? fetchData(): null;
    }, []);

    return (
        <Card variation="elevated" borderRadius="medium">
            <Flex direction='column' >
                {post.images.length > 0 ? <StorageImage imgKey={post.images[0]} alt={post.images[0]} objectFit={'contain'}/> : <p>No Images</p>}
            </Flex>
            <Flex direction="column" padding="sm" gap="small">
            <Flex direction={'raw'} justifyContent={'space-between'}>
                <Text fontWeight={'bold'}>{post.date}</Text>
                {post.country ? <Text fontWeight={'bold'}>{countries[nameCountry].name} <ReactCountryFlag svg countryCode={post.country} style={{width: '2em',height: '2em',}}/> </Text> : null}
            </Flex>
            <Flex direction={'column'} justifyContent={'space-between'}>
                <Flex direction={'column'}>
                    <Text fontWeight="bold" fontSize="xl">{post.title}</Text>
                    <Text color="font.tertiary">{post.body}</Text>
                </Flex>
                <Flex direction={'column'}>
                    <Link padding="xs" backgroundColor={'#D9D9D9'} textAlign={'center'} fontWeight={'bold'} color="#000" href={post.linkFan} isExternal={true}>{'FP'}</Link>
                    {/* <Link padding="xs" backgroundColor={'#D9D9D9'} textAlign={'center'} fontWeight={'bold'} color="#000" href={post.link} isExternal={true}>{'CHECK'}</Link> */}
                    <Input defaultValue={post.link ? post.link :'No data'} isReadOnly/>
                    {post.archive ? <Link padding="xs" backgroundColor={'#D9D9D9'} textAlign={'center'} fontWeight={'bold'} color="#000" href={fileData}>Download archive</Link> : null}
                </Flex>
            </Flex>
                {/* <Grid gap="small" templateColumns="repeat(3, 1fr)">{post.images?.map((img,i) => <StorageImage imgKey={img} alt={img} key={i}/>)}</Grid> */}
                {/* {post.images?.map((img,i) => <Image src={img?.toString()} alt={''} key={i}/>)} */}
            </Flex>
        </Card>
    )
}
