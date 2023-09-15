import { StorageManager } from "@aws-amplify/ui-react-storage";
import { Flex, withAuthenticator, TextField, Button, SelectField ,TabItem,Tabs, Label} from "@aws-amplify/ui-react"
import {DataStore} from "aws-amplify"
import React, { useRef } from 'react';
import { Post,Archives } from "@/models";
import { useRouter } from "next/router";
import { countries, getEmojiFlag, getUnicode } from 'countries-list';
import ReactCountryFlag from "react-country-flag"
import testJs from '../../test/first.json';

function Create() {
    const [title,setTitle] = React.useState('');
    const [body,setBody] = React.useState('');
    const [files,setFiles] = React.useState({});
    const [date,setDate] = React.useState('');
    const [country,setCountry] = React.useState('');
    const [link,setLink] = React.useState('');
    const [linkFan,setLinkFan] = React.useState('');
    const [image,setImage] = React.useState('');
    const [archive,setArchive] = React.useState('');
    const router = useRouter();

    const imageRef = useRef(null);
    const archiveRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        DataStore.save(
            new Post({
               title,
               body,
               date,
               country,
               link,
               linkFan,
               images: Object.keys(files), 
               archive,
            })
        ).then(() => {
            console.log('success')
        })
        setTitle('')
        setBody('')
        setArchive('')
        setCountry('')
        setDate('')
        setLink('')
        setLinkFan('')
        setFiles({})
        imageRef.current.clearFiles();
        archiveRef.current.clearFiles();
    }

    const handleSubmitArchive = (e) => {
        e.preventDefault();
        DataStore.save(
            new Archives({
               image,
               archive,
            })
        ).then(() => {
            router.push('/');
        })
    }
    return (
        // <Tabs>
        //     <TabItem title="Creative">
            <Flex as= "form" direction="column" onSubmit={handleSubmit}>
                <TextField label="title" value={title} onChange={e => {setTitle(e.target.value)}} />
                <TextField label="body" value={body} onChange={e => {setBody(e.target.value)}} />
                <TextField label="date" type="date" value={date} onChange={e => {setDate(e.target.value)}} />
                <SelectField label='Country' onChange={e => {setCountry(e.target.value)}}>
                    {Object.entries(countries).map(countryItem => {
                        return(
                            <option value={countryItem[0]} key={countryItem[1].name}>{countryItem[1].name}</option>
                        )
                    })}
                </SelectField>
                <TextField label="link"  value={link} onChange={e => {setLink(e.target.value)}} />
                <TextField label="linkFan"  value={linkFan} onChange={e => {setLinkFan(e.target.value)}} />
                <Label>Image</Label>
                <StorageManager
                accessLevel="public"
                acceptedFileTypes={['images/*']}
                maxFileCount={1}
                onUploadSuccess={({ key = '' }) => {
                    setFiles((prevFiles) => {
                        return {
                            ...prevFiles,[key]: true
                        }
                    })
                }}
                ref={imageRef}
                />
                <Label>Archive</Label>
                <StorageManager
                path='archives/'
                accessLevel="public"
                acceptedFileTypes={[
                    '.rar',
                    '.zip',
                  ]}
                maxFileCount={1}
                onUploadSuccess={({ key = '' }) => {
                    setArchive(key)
                }}
                ref={archiveRef}
                />
                <Button type='submit'>Submit</Button>
            </Flex>
        //     </TabItem>
        //     <TabItem title="Archives">
        //     <Flex as= "form" direction="column" onSubmit={handleSubmitArchive}>
        //         <Label>Archive</Label>
        //         <StorageManager
        //         path='archives/'
        //         accessLevel="public"
        //         acceptedFileTypes={['*']}
        //         maxFileCount={1}
        //         onUploadSuccess={({ key = '' }) => {
        //             setArchive(key)
        //         }}
        //         />
        //         <Label>Image</Label>
        //         <StorageManager
        //         path='archives/'
        //         accessLevel="public"
        //         acceptedFileTypes={['*']}
        //         maxFileCount={1}
        //         onUploadSuccess={({ key = '' }) => {
        //             setImage(key)
        //         }}
        //         />
        //        <Button type='submit'>Submit</Button>
        //     </Flex>
        //     </TabItem>

            
        // </Tabs>
    )
}

export default withAuthenticator(Create)