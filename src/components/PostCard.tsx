import { Post } from "@/models";
import { Card, Flex, Text, Grid,Link, Input, ScrollView } from "@aws-amplify/ui-react";
import { StorageImage } from '@aws-amplify/ui-react-storage';
import ReactCountryFlag from "react-country-flag"
import { countries } from "countries-list";
import {Storage} from 'aws-amplify'
import { useState , useEffect} from "react";
import ImageViewer from 'react-simple-image-viewer';

export default function PostCard( {post} : { post: Post}) {
    const nameCountry = post.country;

    const [fileData, setFileData] = useState('');
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    const [image,setImage] = useState(null);

    async function generateDownloadLinks(fileKey) {
        const result = await Storage.get(fileKey, { download: true });
        const url = URL.createObjectURL(result.Body);
        return url;
      }
    async function downloadImage(fileKey) {
        const image = await Storage.get(post.images[0]);
        setImage(image);
    }


    useEffect(() => {
    const fetchData = async () => {
        const data = await generateDownloadLinks(post.archive)
        setFileData(data);
    }
    post.archive? fetchData(): null;
    post.images.length > 0 ? downloadImage(post.images[0]) : null;
    }, []);

    return (
        <Card variation="elevated" borderRadius="medium" grow={'1'} display={'flex'} direction={'column'}>
            {isViewerOpen && (
                <ImageViewer
                    src={ [image] }
                    disableScroll={ false }
                    closeOnClickOutside={ true }
                    onClose={ () => setIsViewerOpen(false) }
                />
            )}
            <Flex direction='column' >
                {post.images.length > 0 ? <StorageImage height={'250px'} onClick={ () =>setIsViewerOpen(true) } imgKey={post.images[0]} alt={post.images[0]} objectFit={'contain'}/> : <p>No Images</p>}
            </Flex>
            <Flex direction="column" padding="sm" gap="small" grow={'1'}>
            <Flex direction={'raw'} justifyContent={'space-between'} paddingTop={"medium"}>
                <Text fontWeight={'bold'}>{post.date}</Text>
                {post.country ? <Text fontWeight={'bold'}>{countries[nameCountry].name} <ReactCountryFlag svg countryCode={post.country} style={{width: '2em',height: '2em',}}/> </Text> : null}
            </Flex>
            <Flex direction={'column'} justifyContent={'space-between'} grow={'1'}>
                <Flex direction={'column'}>
                    <Text fontWeight="bold" fontSize="xl">{post.title}</Text>
                    {/*<Text color="font.tertiary">{post.body}</Text>*/}
                    <ScrollView height="350px" color="font.tertiary">{post.body}</ScrollView>
                </Flex>
                <Flex direction={'column'}>
                    <Link padding="xs" backgroundColor={'#D9D9D9'} textAlign={'center'} fontWeight={'bold'} color="#000" href={post.linkFan} isExternal={true}>{'FP'}</Link>
                    {/* <Link padding="xs" backgroundColor={'#D9D9D9'} textAlign={'center'} fontWeight={'bold'} color="#000" href={post.link} isExternal={true}>{'CHECK'}</Link> */}
                    <Input value={post.link ? post.link :'No data'} isReadOnly/>
                    {post.archive ? <Link padding="xs" backgroundColor={'#D9D9D9'} textAlign={'center'} fontWeight={'bold'} color="#000" href={fileData}>Download landing</Link> : null}
                </Flex>
            </Flex>
                {/* <Grid gap="small" templateColumns="repeat(3, 1fr)">{post.images?.map((img,i) => <StorageImage imgKey={img} alt={img} key={i}/>)}</Grid> */}
                {/* {post.images?.map((img,i) => <Image src={img?.toString()} alt={''} key={i}/>)} */}
            </Flex>
        </Card>
    )
}
