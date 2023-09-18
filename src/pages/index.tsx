import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import React, { useState, useRef } from 'react'
import { Post } from '@/models'
import { DataStore, Predicates } from 'aws-amplify'
import {Flex, SearchField, Grid, Pagination, Collection, Button, TextField, Label, Input} from '@aws-amplify/ui-react'
import PostCard from '@/components/PostCard'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [posts,setPosts] = React.useState<Array<Post>>([]);
  const titleRef = useRef('');
  const descRef = useRef('');
  const linkRef = useRef('');
  const countryRef = useRef('');
  const dateFromRef = useRef('');
  const dateToRef = useRef('');
  const [title,setTitle] = useState('');
  const [gridTemplate,setGridTemplate] = React.useState('repeat(4, 1fr)')

  React.useEffect(() => {
    const sub = DataStore.observeQuery(Post,Predicates.ALL, {
      sort: (post) => post.updatedAt("DESCENDING"),
    })
      .subscribe(snapshot => {
        const { items } = snapshot;
        setPosts(items);
      })

      return () => { sub.unsubscribe() }
  }, []);

    const clearFilter = () => {
        titleRef.current.value = null;
        linkRef.current.value = null;
        descRef.current.value = null;
        dateFromRef.current.value = null;
        countryRef.current.value = null;
        dateToRef.current.value = null;
    }

  const clearHandler = async () => {
      let posts;
      posts = await DataStore.query(Post,Predicates.ALL,{
          sort: (post) => post.updatedAt("DESCENDING"),
      });
      setPosts(posts);
    }


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(linkRef.current.value.split(' '))
    let posts;
    if(titleRef.current.value != '' && 
       linkRef.current.value == "" &&
       descRef.current.value == "" &&
       dateFromRef.current.value == "" &&
       dateToRef.current.value == "" &&
       countryRef.current.value == ""
       ){
        console.log('title not empty')
         posts = await DataStore.query(Post, (p) => p.and(p => [
          p.title.contains(titleRef.current.value)
        ]))
   } else if(titleRef.current.value == '' &&
      linkRef.current.value.split(' ').length > 1 &&
      descRef.current.value == "" &&
      dateFromRef.current.value == "" &&
      dateToRef.current.value == "" &&
      countryRef.current.value == "") {
      posts = await DataStore.query(Post, (p) => p.and(p => [
          p.link.contains(linkRef.current.value.split(' ')[0]),
          p.link.contains(linkRef.current.value.split(' ')[1])
      ]))
      }else if(titleRef.current.value == '' &&
        linkRef.current.value.split(' ').length > 1 &&
        descRef.current.value == "" &&
        dateFromRef.current.value != "" &&
        dateToRef.current.value == "" &&
        countryRef.current.value == "") {
        posts = await DataStore.query(Post, (p) => p.and(p => [
            p.link.contains(linkRef.current.value.split(' ')[0]),
            p.link.contains(linkRef.current.value.split(' ')[1]),
            p.date.ge(dateFromRef.current.value),
        ]))
    }else if(titleRef.current.value == '' &&
        linkRef.current.value.split(' ').length > 1 &&
        descRef.current.value == "" &&
        dateFromRef.current.value == "" &&
        dateToRef.current.value != "" &&
        countryRef.current.value == "") {
        posts = await DataStore.query(Post, (p) => p.and(p => [
            p.link.contains(linkRef.current.value.split(' ')[0]),
            p.link.contains(linkRef.current.value.split(' ')[1]),
            p.date.le(dateToRef.current.value),
        ]))
    }else if(titleRef.current.value == '' &&
        linkRef.current.value.split(' ').length > 1 &&
        descRef.current.value == "" &&
        dateFromRef.current.value != "" &&
        dateToRef.current.value != "" &&
        countryRef.current.value == "") {
        posts = await DataStore.query(Post, (p) => p.and(p => [
            p.link.contains(linkRef.current.value.split(' ')[0]),
            p.link.contains(linkRef.current.value.split(' ')[1]),
            p.date.le(dateToRef.current.value),
            p.date.ge(dateFromRef.current.value),
        ]))
    }else if(titleRef.current.value == '' &&
        linkRef.current.value.split(' ').length > 1 &&
        descRef.current.value == "" &&
        dateFromRef.current.value != "" &&
        dateToRef.current.value != "" &&
        countryRef.current.value != "") {
        posts = await DataStore.query(Post, (p) => p.and(p => [
            p.link.contains(linkRef.current.value.split(' ')[0]),
            p.link.contains(linkRef.current.value.split(' ')[1]),
            p.date.le(dateToRef.current.value),
            p.date.ge(dateFromRef.current.value),
            p.country.contains(countryRef.current.value)
        ]))
    }else if(titleRef.current.value == '' &&
        linkRef.current.value.split(' ').length > 1 &&
        descRef.current.value == "" &&
        dateFromRef.current.value == "" &&
        dateToRef.current.value == "" &&
        countryRef.current.value != "") {
        posts = await DataStore.query(Post, (p) => p.and(p => [
            p.link.contains(linkRef.current.value.split(' ')[0]),
            p.link.contains(linkRef.current.value.split(' ')[1]),
            p.country.contains(countryRef.current.value)
        ]))
    }else if(titleRef.current.value == '' &&
        linkRef.current.value.split(' ').length > 1 &&
        descRef.current.value == "" &&
        dateFromRef.current.value == "" &&
        dateToRef.current.value != "" &&
        countryRef.current.value != "") {
        posts = await DataStore.query(Post, (p) => p.and(p => [
            p.link.contains(linkRef.current.value.split(' ')[0]),
            p.link.contains(linkRef.current.value.split(' ')[1]),
            p.date.le(dateToRef.current.value),
            p.country.contains(countryRef.current.value)
        ]))
    }else if(titleRef.current.value == '' &&
        linkRef.current.value.split(' ').length > 1 &&
        descRef.current.value == "" &&
        dateFromRef.current.value != "" &&
        dateToRef.current.value == "" &&
        countryRef.current.value != "") {
        posts = await DataStore.query(Post, (p) => p.and(p => [
            p.link.contains(linkRef.current.value.split(' ')[0]),
            p.link.contains(linkRef.current.value.split(' ')[1]),
            p.date.ge(dateFromRef.current.value),
            p.country.contains(countryRef.current.value)
        ]))
    }else if(titleRef.current.value == '' &&
        linkRef.current.value.split(' ').length > 1 &&
        descRef.current.value != "" &&
        dateFromRef.current.value == "" &&
        dateToRef.current.value == "" &&
        countryRef.current.value == "") {
        posts = await DataStore.query(Post, (p) => p.and(p => [
            p.link.contains(linkRef.current.value.split(' ')[0]),
            p.link.contains(linkRef.current.value.split(' ')[1]),
            p.body.contains(descRef.current.value)
        ]))
    }else if(titleRef.current.value == '' &&
        linkRef.current.value.split(' ').length > 1 &&
        descRef.current.value != "" &&
        dateFromRef.current.value == "" &&
        dateToRef.current.value != "" &&
        countryRef.current.value == "") {
        posts = await DataStore.query(Post, (p) => p.and(p => [
            p.link.contains(linkRef.current.value.split(' ')[0]),
            p.link.contains(linkRef.current.value.split(' ')[1]),
            p.body.contains(descRef.current.value),
            p.date.le(dateToRef.current.value)
        ]))
    }else if(titleRef.current.value == '' &&
        linkRef.current.value.split(' ').length > 1 &&
        descRef.current.value != "" &&
        dateFromRef.current.value != "" &&
        dateToRef.current.value == "" &&
        countryRef.current.value == "") {
        posts = await DataStore.query(Post, (p) => p.and(p => [
            p.link.contains(linkRef.current.value.split(' ')[0]),
            p.link.contains(linkRef.current.value.split(' ')[1]),
            p.body.contains(descRef.current.value),
            p.date.ge(dateFromRef.current.value)
        ]))
    }else if(titleRef.current.value == '' &&
        linkRef.current.value.split(' ').length > 1 &&
        descRef.current.value != "" &&
        dateFromRef.current.value != "" &&
        dateToRef.current.value != "" &&
        countryRef.current.value == "") {
        posts = await DataStore.query(Post, (p) => p.and(p => [
            p.link.contains(linkRef.current.value.split(' ')[0]),
            p.link.contains(linkRef.current.value.split(' ')[1]),
            p.body.contains(descRef.current.value),
            p.date.ge(dateFromRef.current.value),
            p.date.le(dateToRef.current.value)
        ]))
    }else if(titleRef.current.value == '' &&
        linkRef.current.value.split(' ').length > 1 &&
        descRef.current.value != "" &&
        dateFromRef.current.value == "" &&
        dateToRef.current.value == "" &&
        countryRef.current.value != "") {
        posts = await DataStore.query(Post, (p) => p.and(p => [
            p.link.contains(linkRef.current.value.split(' ')[0]),
            p.link.contains(linkRef.current.value.split(' ')[1]),
            p.body.contains(descRef.current.value),
            p.country.contains(countryRef.current.value)
        ]))
    }else if(titleRef.current.value == '' &&
        linkRef.current.value.split(' ').length > 1 &&
        descRef.current.value != "" &&
        dateFromRef.current.value == "" &&
        dateToRef.current.value != "" &&
        countryRef.current.value != "") {
        posts = await DataStore.query(Post, (p) => p.and(p => [
            p.link.contains(linkRef.current.value.split(' ')[0]),
            p.link.contains(linkRef.current.value.split(' ')[1]),
            p.body.contains(descRef.current.value),
            p.country.contains(countryRef.current.value),
            p.date.le(dateToRef.current.value)
        ]))
    } else if(titleRef.current.value == '' &&
        linkRef.current.value.split(' ').length > 1 &&
        descRef.current.value != "" &&
        dateFromRef.current.value != "" &&
        dateToRef.current.value == "" &&
        countryRef.current.value != "") {
        posts = await DataStore.query(Post, (p) => p.and(p => [
            p.link.contains(linkRef.current.value.split(' ')[0]),
            p.link.contains(linkRef.current.value.split(' ')[1]),
            p.body.contains(descRef.current.value),
            p.country.contains(countryRef.current.value),
            p.date.ge(dateFromRef.current.value)
        ]))
    }else if(titleRef.current.value == '' &&
        linkRef.current.value.split(' ').length > 1 &&
        descRef.current.value != "" &&
        dateFromRef.current.value != "" &&
        dateToRef.current.value != "" &&
        countryRef.current.value != "") {
        posts = await DataStore.query(Post, (p) => p.and(p => [
            p.link.contains(linkRef.current.value.split(' ')[0]),
            p.link.contains(linkRef.current.value.split(' ')[1]),
            p.body.contains(descRef.current.value),
            p.country.contains(countryRef.current.value),
            p.date.ge(dateFromRef.current.value),
            p.date.le(dateToRef.current.value)
        ]))
    }else if(titleRef.current.value != '' &&
        linkRef.current.value.split(' ').length > 1 &&
        descRef.current.value == "" &&
        dateFromRef.current.value == "" &&
        dateToRef.current.value == "" &&
        countryRef.current.value == "") {
        posts = await DataStore.query(Post, (p) => p.and(p => [
            p.title.contains(titleRef.current.value),
            p.link.contains(linkRef.current.value.split(' ')[0]),
            p.link.contains(linkRef.current.value.split(' ')[1]),
        ]))
    }else if(titleRef.current.value != '' &&
        linkRef.current.value.split(' ').length > 1 &&
        descRef.current.value == "" &&
        dateFromRef.current.value == "" &&
        dateToRef.current.value != "" &&
        countryRef.current.value == "") {
        posts = await DataStore.query(Post, (p) => p.and(p => [
            p.title.contains(titleRef.current.value),
            p.link.contains(linkRef.current.value.split(' ')[0]),
            p.link.contains(linkRef.current.value.split(' ')[1]),
            p.date.le(dateToRef.current.value)
        ]))
    }else if(titleRef.current.value != '' &&
        linkRef.current.value.split(' ').length > 1 &&
        descRef.current.value == "" &&
        dateFromRef.current.value != "" &&
        dateToRef.current.value == "" &&
        countryRef.current.value == "") {
        posts = await DataStore.query(Post, (p) => p.and(p => [
            p.title.contains(titleRef.current.value),
            p.link.contains(linkRef.current.value.split(' ')[0]),
            p.link.contains(linkRef.current.value.split(' ')[1]),
            p.date.ge(dateFromRef.current.value)
        ]))
    }else if(titleRef.current.value != '' &&
        linkRef.current.value.split(' ').length > 1 &&
        descRef.current.value == "" &&
        dateFromRef.current.value != "" &&
        dateToRef.current.value != "" &&
        countryRef.current.value == "") {
        posts = await DataStore.query(Post, (p) => p.and(p => [
            p.title.contains(titleRef.current.value),
            p.link.contains(linkRef.current.value.split(' ')[0]),
            p.link.contains(linkRef.current.value.split(' ')[1]),
            p.date.ge(dateFromRef.current.value),
            p.date.le(dateToRef.current.value)
        ]))
    }else if(titleRef.current.value != '' &&
        linkRef.current.value.split(' ').length > 1 &&
        descRef.current.value == "" &&
        dateFromRef.current.value == "" &&
        dateToRef.current.value == "" &&
        countryRef.current.value != "") {
        posts = await DataStore.query(Post, (p) => p.and(p => [
            p.title.contains(titleRef.current.value),
            p.link.contains(linkRef.current.value.split(' ')[0]),
            p.link.contains(linkRef.current.value.split(' ')[1]),
            p.country.contains(countryRef.current.value)
        ]))
    }else if(titleRef.current.value != '' &&
        linkRef.current.value.split(' ').length > 1 &&
        descRef.current.value == "" &&
        dateFromRef.current.value != "" &&
        dateToRef.current.value == "" &&
        countryRef.current.value != "") {
        posts = await DataStore.query(Post, (p) => p.and(p => [
            p.title.contains(titleRef.current.value),
            p.link.contains(linkRef.current.value.split(' ')[0]),
            p.link.contains(linkRef.current.value.split(' ')[1]),
            p.country.contains(countryRef.current.value),
            p.date.ge(dateFromRef.current.value)
        ]))
    }
    else if(titleRef.current.value != '' &&
        linkRef.current.value.split(' ').length > 1 &&
        descRef.current.value == "" &&
        dateFromRef.current.value != "" &&
        dateToRef.current.value != "" &&
        countryRef.current.value != "") {
        posts = await DataStore.query(Post, (p) => p.and(p => [
            p.title.contains(titleRef.current.value),
            p.link.contains(linkRef.current.value.split(' ')[0]),
            p.link.contains(linkRef.current.value.split(' ')[1]),
            p.country.contains(countryRef.current.value),
            p.date.ge(dateFromRef.current.value),
            p.date.le(dateToRef.current.value)
        ]))
    }else if(titleRef.current.value != '' &&
        linkRef.current.value.split(' ').length > 1 &&
        descRef.current.value == "" &&
        dateFromRef.current.value == "" &&
        dateToRef.current.value != "" &&
        countryRef.current.value != "") {
        posts = await DataStore.query(Post, (p) => p.and(p => [
            p.title.contains(titleRef.current.value),
            p.link.contains(linkRef.current.value.split(' ')[0]),
            p.link.contains(linkRef.current.value.split(' ')[1]),
            p.country.contains(countryRef.current.value),
            p.date.le(dateToRef.current.value)
        ]))
    }else if(titleRef.current.value != '' &&
        linkRef.current.value.split(' ').length > 1 &&
        descRef.current.value != "" &&
        dateFromRef.current.value == "" &&
        dateToRef.current.value == "" &&
        countryRef.current.value == "") {
        posts = await DataStore.query(Post, (p) => p.and(p => [
            p.title.contains(titleRef.current.value),
            p.link.contains(linkRef.current.value.split(' ')[0]),
            p.link.contains(linkRef.current.value.split(' ')[1]),
            p.body.contains(descRef.current.value)
        ]))
    }else if(titleRef.current.value != '' &&
        linkRef.current.value.split(' ').length > 1 &&
        descRef.current.value != "" &&
        dateFromRef.current.value == "" &&
        dateToRef.current.value != "" &&
        countryRef.current.value == "") {
        posts = await DataStore.query(Post, (p) => p.and(p => [
            p.title.contains(titleRef.current.value),
            p.link.contains(linkRef.current.value.split(' ')[0]),
            p.link.contains(linkRef.current.value.split(' ')[1]),
            p.body.contains(descRef.current.value),
            p.date.le(dateToRef.current.value)
        ]))
    }else if(titleRef.current.value != '' &&
        linkRef.current.value.split(' ').length > 1 &&
        descRef.current.value != "" &&
        dateFromRef.current.value != "" &&
        dateToRef.current.value != "" &&
        countryRef.current.value == "") {
        posts = await DataStore.query(Post, (p) => p.and(p => [
            p.title.contains(titleRef.current.value),
            p.link.contains(linkRef.current.value.split(' ')[0]),
            p.link.contains(linkRef.current.value.split(' ')[1]),
            p.body.contains(descRef.current.value),
            p.date.le(dateToRef.current.value),
            p.date.ge(dateFromRef.current.value)
        ]))
    }else if(titleRef.current.value != '' &&
        linkRef.current.value.split(' ').length > 1 &&
        descRef.current.value != "" &&
        dateFromRef.current.value != "" &&
        dateToRef.current.value == "" &&
        countryRef.current.value == "") {
        posts = await DataStore.query(Post, (p) => p.and(p => [
            p.title.contains(titleRef.current.value),
            p.link.contains(linkRef.current.value.split(' ')[0]),
            p.link.contains(linkRef.current.value.split(' ')[1]),
            p.body.contains(descRef.current.value),
            p.date.ge(dateFromRef.current.value)
        ]))
    }else if(titleRef.current.value != '' &&
        linkRef.current.value.split(' ').length > 1 &&
        descRef.current.value != "" &&
        dateFromRef.current.value == "" &&
        dateToRef.current.value == "" &&
        countryRef.current.value != "") {
        posts = await DataStore.query(Post, (p) => p.and(p => [
            p.title.contains(titleRef.current.value),
            p.link.contains(linkRef.current.value.split(' ')[0]),
            p.link.contains(linkRef.current.value.split(' ')[1]),
            p.body.contains(descRef.current.value),
            p.country.contains(countryRef.current.value)
        ]))
    }else if(titleRef.current.value != '' &&
        linkRef.current.value.split(' ').length > 1 &&
        descRef.current.value != "" &&
        dateFromRef.current.value == "" &&
        dateToRef.current.value != "" &&
        countryRef.current.value != "") {
        posts = await DataStore.query(Post, (p) => p.and(p => [
            p.title.contains(titleRef.current.value),
            p.link.contains(linkRef.current.value.split(' ')[0]),
            p.link.contains(linkRef.current.value.split(' ')[1]),
            p.body.contains(descRef.current.value),
            p.country.contains(countryRef.current.value),
            p.date.le(dateToRef.current.value)
        ]))
    }else if(titleRef.current.value != '' &&
        linkRef.current.value.split(' ').length > 1 &&
        descRef.current.value != "" &&
        dateFromRef.current.value != "" &&
        dateToRef.current.value != "" &&
        countryRef.current.value != "") {
        posts = await DataStore.query(Post, (p) => p.and(p => [
            p.title.contains(titleRef.current.value),
            p.link.contains(linkRef.current.value.split(' ')[0]),
            p.link.contains(linkRef.current.value.split(' ')[1]),
            p.body.contains(descRef.current.value),
            p.country.contains(countryRef.current.value),
            p.date.le(dateToRef.current.value),
            p.date.ge(dateFromRef.current.value)
        ]))
    }else if(titleRef.current.value != '' &&
        linkRef.current.value.split(' ').length > 1 &&
        descRef.current.value != "" &&
        dateFromRef.current.value != "" &&
        dateToRef.current.value == "" &&
        countryRef.current.value != "") {
        posts = await DataStore.query(Post, (p) => p.and(p => [
            p.title.contains(titleRef.current.value),
            p.link.contains(linkRef.current.value.split(' ')[0]),
            p.link.contains(linkRef.current.value.split(' ')[1]),
            p.body.contains(descRef.current.value),
            p.country.contains(countryRef.current.value),
            p.date.ge(dateFromRef.current.value)
        ]))
    }else if(
       titleRef.current.value != '' && 
       linkRef.current.value != "" &&
       descRef.current.value == "" &&
       dateFromRef.current.value == "" &&
       dateToRef.current.value == "" &&
       countryRef.current.value == ""
       ){
        console.log('title and link not empty')
        posts = await DataStore.query(Post, (p) => p.and(p => [
          p.title.contains(titleRef.current.value),
          p.link.contains(linkRef.current.value),
        ]))
       } else if(
       titleRef.current.value != '' && 
       linkRef.current.value != "" &&
       descRef.current.value != "" &&
       dateFromRef.current.value == "" &&
       dateToRef.current.value == "" &&
       countryRef.current.value == ""
       ){
        console.log('title and link and desc not empty')
        posts = await DataStore.query(Post, (p) => p.and(p => [
          p.title.contains(titleRef.current.value),
          p.link.contains(linkRef.current.value),
          p.body.contains(descRef.current.value)
        ]))
       } else if(
       titleRef.current.value != '' && 
       linkRef.current.value != "" &&
       descRef.current.value != "" &&
       dateFromRef.current.value == "" &&
       dateToRef.current.value == "" &&
       countryRef.current.value != ""
       ){
        posts = await DataStore.query(Post, (p) => p.and(p => [
          p.title.contains(titleRef.current.value),
          p.link.contains(linkRef.current.value),
          p.body.contains(descRef.current.value),
          p.country.contains(countryRef.current.value)
        ]))
        console.log('title and link and desc and country not empty')
       }else if(
       titleRef.current.value != '' && 
       linkRef.current.value != "" &&
       descRef.current.value != "" &&
       dateFromRef.current.value == "" &&
       dateToRef.current.value != "" &&
       countryRef.current.value != ""
       ){
        posts = await DataStore.query(Post, (p) => p.and(p => [
          p.title.contains(titleRef.current.value),
          p.link.contains(linkRef.current.value),
          p.body.contains(descRef.current.value),
          p.country.contains(countryRef.current.value),
          p.date.le(dateToRef.current.value)
        ]))

        console.log('title and link and desc and country and dateTo not empty')
       }else if(
       titleRef.current.value != '' && 
       linkRef.current.value != "" &&
       descRef.current.value != "" &&
       dateFromRef.current.value != "" &&
       dateToRef.current.value != "" &&
       countryRef.current.value != ""
       ){
        posts = await DataStore.query(Post, (p) => p.and(p => [
          p.title.contains(titleRef.current.value),
          p.link.contains(linkRef.current.value),
          p.body.contains(descRef.current.value),
          p.country.contains(countryRef.current.value),
          p.date.le(dateToRef.current.value),
          p.date.ge(dateFromRef.current.value),
        ]))
        console.log('title and link and desc and country and dateTo and dateFrom not empty')
       }else if(
       titleRef.current.value == '' && 
       linkRef.current.value != "" &&
       descRef.current.value == "" &&
       dateFromRef.current.value == "" &&
       dateToRef.current.value == "" &&
       countryRef.current.value == ""
       ){
        posts = await DataStore.query(Post, (p) => p.and(p => [
          p.link.contains(linkRef.current.value),
        ]))
        console.log('link not empty')
       }else if(
       titleRef.current.value == '' && 
       linkRef.current.value != "" &&
       descRef.current.value != "" &&
       dateFromRef.current.value == "" &&
       dateToRef.current.value == "" &&
       countryRef.current.value == ""
       ){
        posts = await DataStore.query(Post, (p) => p.and(p => [
          p.link.contains(linkRef.current.value),
          p.body.contains(descRef.current.value),
        ]))
        console.log('link and desc not empty')
       }else if(
       titleRef.current.value == '' && 
       linkRef.current.value != "" &&
       descRef.current.value != "" &&
       dateFromRef.current.value == "" &&
       dateToRef.current.value == "" &&
       countryRef.current.value != ""
       ){
        posts = await DataStore.query(Post, (p) => p.and(p => [
          p.link.contains(linkRef.current.value),
          p.body.contains(descRef.current.value),
          p.country.contains(countryRef.current.value),
        ]))
        console.log('link and desc and country not empty')
       }else if(
       titleRef.current.value == '' && 
       linkRef.current.value != "" &&
       descRef.current.value != "" &&
       dateFromRef.current.value != "" &&
       dateToRef.current.value == "" &&
       countryRef.current.value != ""
       ){
        posts = await DataStore.query(Post, (p) => p.and(p => [
          p.link.contains(linkRef.current.value),
          p.body.contains(descRef.current.value),
          p.country.contains(countryRef.current.value),
          p.date.ge(dateFromRef.current.value),
        ]))
        console.log('link and desc and country and dateFrom not empty')
       }else if(
       titleRef.current.value == '' && 
       linkRef.current.value != "" &&
       descRef.current.value != "" &&
       dateFromRef.current.value != "" &&
       dateToRef.current.value != "" &&
       countryRef.current.value != ""
       ){
        posts = await DataStore.query(Post, (p) => p.and(p => [
          p.link.contains(linkRef.current.value),
          p.body.contains(descRef.current.value),
          p.country.contains(countryRef.current.value),
          p.date.le(dateToRef.current.value),
          p.date.ge(dateFromRef.current.value),
        ]))
        console.log('link and desc and country and dateFrom and dateTo not empty')
       }else if(
       titleRef.current.value == '' && 
       linkRef.current.value == "" &&
       descRef.current.value != "" &&
       dateFromRef.current.value == "" &&
       dateToRef.current.value == "" &&
       countryRef.current.value == ""
       ){
        posts = await DataStore.query(Post, (p) => p.and(p => [
          p.body.contains(descRef.current.value),
        ]))
        console.log('desc not empty')
       }else if(
       titleRef.current.value == '' && 
       linkRef.current.value == "" &&
       descRef.current.value != "" &&
       dateFromRef.current.value == "" &&
       dateToRef.current.value == "" &&
       countryRef.current.value != ""
       ){
        posts = await DataStore.query(Post, (p) => p.and(p => [
          p.body.contains(descRef.current.value),
          p.country.contains(countryRef.current.value),
        ]))
        console.log('desc and country not empty')
       }else if(
       titleRef.current.value == '' && 
       linkRef.current.value == "" &&
       descRef.current.value != "" &&
       dateFromRef.current.value != "" &&
       dateToRef.current.value == "" &&
       countryRef.current.value != ""
       ){
        posts = await DataStore.query(Post, (p) => p.and(p => [
          p.body.contains(descRef.current.value),
          p.country.contains(countryRef.current.value),
          p.date.ge(dateFromRef.current.value),
        ]))
        console.log('desc and country and dateFrom not empty')
       }
       else if(
       titleRef.current.value == '' && 
       linkRef.current.value == "" &&
       descRef.current.value != "" &&
       dateFromRef.current.value != "" &&
       dateToRef.current.value != "" &&
       countryRef.current.value != ""
       ){
        posts = await DataStore.query(Post, (p) => p.and(p => [
          p.body.contains(descRef.current.value),
          p.country.contains(countryRef.current.value),
          p.date.le(dateToRef.current.value),
          p.date.ge(dateFromRef.current.value),
        ]))
        console.log('desc and country and dateFrom and dateTo not empty')
       }else if(
       titleRef.current.value == '' && 
       linkRef.current.value == "" &&
       descRef.current.value == "" &&
       dateFromRef.current.value == "" &&
       dateToRef.current.value == "" &&
       countryRef.current.value != ""
       ){
        posts = await DataStore.query(Post, (p) => p.and(p => [
          p.country.contains(countryRef.current.value),
        ]))
        console.log('country not empty')
       }else if(
       titleRef.current.value == '' && 
       linkRef.current.value == "" &&
       descRef.current.value == "" &&
       dateFromRef.current.value != "" &&
       dateToRef.current.value == "" &&
       countryRef.current.value != ""
       ){
        posts = await DataStore.query(Post, (p) => p.and(p => [
          p.country.contains(countryRef.current.value),
          p.date.ge(dateFromRef.current.value),
        ]))
        console.log('country and dateFrom not empty')
       }else if(
       titleRef.current.value == '' && 
       linkRef.current.value == "" &&
       descRef.current.value == "" &&
       dateFromRef.current.value != "" &&
       dateToRef.current.value != "" &&
       countryRef.current.value != ""
       ){
        posts = await DataStore.query(Post, (p) => p.and(p => [
          p.country.contains(countryRef.current.value),
          p.date.le(dateToRef.current.value),
          p.date.ge(dateFromRef.current.value),
        ]))
        console.log('country and dateFrom and dateTo not empty')
       }else if(
       titleRef.current.value == '' && 
       linkRef.current.value == "" &&
       descRef.current.value == "" &&
       dateFromRef.current.value != "" &&
       dateToRef.current.value == "" &&
       countryRef.current.value == ""
       ){
        posts = await DataStore.query(Post, (p) => p.and(p => [
          p.date.ge(dateFromRef.current.value),
        ]))
        console.log('dateFrom not empty')
       }else if(
       titleRef.current.value == '' && 
       linkRef.current.value == "" &&
       descRef.current.value == "" &&
       dateFromRef.current.value != "" &&
       dateToRef.current.value != "" &&
       countryRef.current.value == ""
       ){
        posts = await DataStore.query(Post, (p) => p.and(p => [
          p.date.le(dateToRef.current.value),
          p.date.ge(dateFromRef.current.value),
        ]))
        console.log('dateFrom and dateTo not empty')
       }else if(
       titleRef.current.value == '' && 
       linkRef.current.value == "" &&
       descRef.current.value == "" &&
       dateFromRef.current.value == "" &&
       dateToRef.current.value != "" &&
       countryRef.current.value == ""
       ){
        posts = await DataStore.query(Post, (p) => p.and(p => [
          p.date.le(dateToRef.current.value),
        ]))
        console.log('dateTo not empty')
       }else if(
       titleRef.current.value != '' && 
       linkRef.current.value == "" &&
       descRef.current.value != "" &&
       dateFromRef.current.value == "" &&
       dateToRef.current.value == "" &&
       countryRef.current.value == ""
       ){
        posts = await DataStore.query(Post, (p) => p.and(p => [
          p.title.contains(titleRef.current.value),
          p.body.contains(descRef.current.value),
        ]))
        console.log('title and desc not empty')
       }else if(
       titleRef.current.value != '' && 
       linkRef.current.value == "" &&
       descRef.current.value != "" &&
       dateFromRef.current.value == "" &&
       dateToRef.current.value == "" &&
       countryRef.current.value != ""
       ){
        posts = await DataStore.query(Post, (p) => p.and(p => [
          p.title.contains(titleRef.current.value),
          p.body.contains(descRef.current.value),
          p.country.contains(countryRef.current.value),
        ]))
        console.log('title and desc and country not empty')
       }else if(
       titleRef.current.value != '' && 
       linkRef.current.value == "" &&
       descRef.current.value != "" &&
       dateFromRef.current.value != "" &&
       dateToRef.current.value == "" &&
       countryRef.current.value != ""
       ){
        posts = await DataStore.query(Post, (p) => p.and(p => [
          p.title.contains(titleRef.current.value),
          p.body.contains(descRef.current.value),
          p.country.contains(countryRef.current.value),
          p.date.ge(dateFromRef.current.value),
        ]))
        console.log('title and desc and country and dateFrom not empty')
       }else if(
       titleRef.current.value != '' && 
       linkRef.current.value == "" &&
       descRef.current.value != "" &&
       dateFromRef.current.value != "" &&
       dateToRef.current.value != "" &&
       countryRef.current.value != ""
       ){
        posts = await DataStore.query(Post, (p) => p.and(p => [
          p.title.contains(titleRef.current.value),
          p.body.contains(descRef.current.value),
          p.country.contains(countryRef.current.value),
          p.date.le(dateToRef.current.value),
          p.date.ge(dateFromRef.current.value),
        ]))
        console.log('title and desc and country and dateFrom and dateTo not empty')
       }else if(
       titleRef.current.value != '' && 
       linkRef.current.value == "" &&
       descRef.current.value == "" &&
       dateFromRef.current.value == "" &&
       dateToRef.current.value == "" &&
       countryRef.current.value != ""
       ){
        posts = await DataStore.query(Post, (p) => p.and(p => [
          p.title.contains(titleRef.current.value),
          p.country.contains(countryRef.current.value),
        ]))
        console.log('title and country not empty')
       }else if(
       titleRef.current.value != '' && 
       linkRef.current.value == "" &&
       descRef.current.value == "" &&
       dateFromRef.current.value != "" &&
       dateToRef.current.value == "" &&
       countryRef.current.value != ""
       ){
        posts = await DataStore.query(Post, (p) => p.and(p => [
          p.title.contains(titleRef.current.value),
          p.country.contains(countryRef.current.value),
          p.date.ge(dateFromRef.current.value),
        ]))
        console.log('title and country and dateFrom not empty')
       }
       else if(
       titleRef.current.value != '' && 
       linkRef.current.value == "" &&
       descRef.current.value == "" &&
       dateFromRef.current.value != "" &&
       dateToRef.current.value != "" &&
       countryRef.current.value != ""
       ){
        posts = await DataStore.query(Post, (p) => p.and(p => [
          p.title.contains(titleRef.current.value),
          p.country.contains(countryRef.current.value),
          p.date.le(dateToRef.current.value),
          p.date.ge(dateFromRef.current.value),
        ]))
        console.log('title and country and dateFrom and dateTo not empty')
       }else if(
       titleRef.current.value != '' && 
       linkRef.current.value == "" &&
       descRef.current.value == "" &&
       dateFromRef.current.value != "" &&
       dateToRef.current.value == "" &&
       countryRef.current.value == ""
       ){
        posts = await DataStore.query(Post, (p) => p.and(p => [
          p.title.contains(titleRef.current.value),
          p.date.ge(dateFromRef.current.value),
        ]))
        console.log('title and dateFrom not empty')
       }
       else if(
       titleRef.current.value != '' && 
       linkRef.current.value == "" &&
       descRef.current.value == "" &&
       dateFromRef.current.value != "" &&
       dateToRef.current.value != "" &&
       countryRef.current.value == ""
       ){
        posts = await DataStore.query(Post, (p) => p.and(p => [
          p.title.contains(titleRef.current.value),
          p.date.le(dateToRef.current.value),
          p.date.ge(dateFromRef.current.value),
        ]))
        console.log('title and dateFrom and dateTo not empty')
       }
       else if(
       titleRef.current.value != '' && 
       linkRef.current.value == "" &&
       descRef.current.value == "" &&
       dateFromRef.current.value == "" &&
       dateToRef.current.value != "" &&
       countryRef.current.value == ""
       ){
        posts = await DataStore.query(Post, (p) => p.and(p => [
          p.title.contains(titleRef.current.value),
          p.date.le(dateToRef.current.value),
        ]))
        console.log('title and dateTo not empty')
       }else if(
       titleRef.current.value == '' && 
       linkRef.current.value != "" &&
       descRef.current.value == "" &&
       dateFromRef.current.value == "" &&
       dateToRef.current.value == "" &&
       countryRef.current.value != ""
       ){
        posts = await DataStore.query(Post, (p) => p.and(p => [
          p.link.contains(linkRef.current.value),
          p.country.contains(countryRef.current.value),
        ]))
        console.log('link and country not empty')
       }else if(
       titleRef.current.value == '' && 
       linkRef.current.value != "" &&
       descRef.current.value == "" &&
       dateFromRef.current.value != "" &&
       dateToRef.current.value == "" &&
       countryRef.current.value != ""
       ){
        posts = await DataStore.query(Post, (p) => p.and(p => [
          p.link.contains(linkRef.current.value),
          p.country.contains(countryRef.current.value),
          p.date.le(dateToRef.current.value),
        ]))
        console.log('link and country and dateFrom not empty')
       }else if(
       titleRef.current.value == '' && 
       linkRef.current.value != "" &&
       descRef.current.value == "" &&
       dateFromRef.current.value != "" &&
       dateToRef.current.value != "" &&
       countryRef.current.value != ""
       ){
        posts = await DataStore.query(Post, (p) => p.and(p => [
          p.link.contains(linkRef.current.value),
          p.country.contains(countryRef.current.value),
          p.date.le(dateToRef.current.value),
          p.date.ge(dateFromRef.current.value),
        ]))
        console.log('link and country and dateFrom and dateTo not empty')
       }else if(
       titleRef.current.value == '' && 
       linkRef.current.value != "" &&
       descRef.current.value == "" &&
       dateFromRef.current.value != "" &&
       dateToRef.current.value == "" &&
       countryRef.current.value == ""
       ){
        posts = await DataStore.query(Post, (p) => p.and(p => [
          p.link.contains(linkRef.current.value),
          p.date.ge(dateFromRef.current.value),
        ]))
        console.log('link and dateFrom not empty')
       }else if(
       titleRef.current.value == '' && 
       linkRef.current.value != "" &&
       descRef.current.value == "" &&
       dateFromRef.current.value != "" &&
       dateToRef.current.value != "" &&
       countryRef.current.value == ""
       ){
        posts = await DataStore.query(Post, (p) => p.and(p => [
          p.link.contains(linkRef.current.value),
          p.date.le(dateToRef.current.value),
          p.date.ge(dateFromRef.current.value),
        ]))
        console.log('link and dateFrom and dateTo not empty')
       }
       else if(
       titleRef.current.value == '' && 
       linkRef.current.value != "" &&
       descRef.current.value == "" &&
       dateFromRef.current.value == "" &&
       dateToRef.current.value != "" &&
       countryRef.current.value == ""
       ){
        posts = await DataStore.query(Post, (p) => p.and(p => [
          p.link.contains(linkRef.current.value),
          p.date.le(dateToRef.current.value),
        ]))
        console.log('link and dateTo not empty')
       }else if(
       titleRef.current.value == '' && 
       linkRef.current.value == "" &&
       descRef.current.value != "" &&
       dateFromRef.current.value != "" &&
       dateToRef.current.value == "" &&
       countryRef.current.value == ""
       ){
        posts = await DataStore.query(Post, (p) => p.and(p => [
          p.body.contains(descRef.current.value),
          p.date.ge(dateFromRef.current.value),
        ]))
        console.log('desc and dateFrom not empty')
       }else if(
       titleRef.current.value == '' && 
       linkRef.current.value == "" &&
       descRef.current.value != "" &&
       dateFromRef.current.value != "" &&
       dateToRef.current.value != "" &&
       countryRef.current.value == ""
       ){
        posts = await DataStore.query(Post, (p) => p.and(p => [
          p.body.contains(descRef.current.value),
          p.date.le(dateToRef.current.value),
          p.date.ge(dateFromRef.current.value),
        ]))
        console.log('desc and dateFrom and dateTo not empty')
       }else if(
       titleRef.current.value == '' && 
       linkRef.current.value == "" &&
       descRef.current.value != "" &&
       dateFromRef.current.value == "" &&
       dateToRef.current.value != "" &&
       countryRef.current.value == ""
       ){
        posts = await DataStore.query(Post, (p) => p.and(p => [
          p.body.contains(descRef.current.value),
          p.date.le(dateToRef.current.value),
        ]))
        console.log('desc and dateTo not empty')
       }else if(
       titleRef.current.value == '' && 
       linkRef.current.value == "" &&
       descRef.current.value == "" &&
       dateFromRef.current.value == "" &&
       dateToRef.current.value != "" &&
       countryRef.current.value != ""
       ){
        posts = await DataStore.query(Post, (p) => p.and(p => [
          p.country.contains(countryRef.current.value),
          p.date.le(dateToRef.current.value),
        ]))
        console.log('country and dateTo not empty')
       }else if(
       titleRef.current.value == '' && 
       linkRef.current.value == "" &&
       descRef.current.value != "" &&
       dateFromRef.current.value == "" &&
       dateToRef.current.value != "" &&
       countryRef.current.value != ""
       ){
        posts = await DataStore.query(Post, (p) => p.and(p => [
          p.body.contains(descRef.current.value),
          p.country.contains(countryRef.current.value),
          p.date.le(dateToRef.current.value),
        ]))
        console.log('desc and country and dateTo not empty')
       }else if(
       titleRef.current.value == '' && 
       linkRef.current.value != "" &&
       descRef.current.value == "" &&
       dateFromRef.current.value == "" &&
       dateToRef.current.value != "" &&
       countryRef.current.value != ""
       ){
        posts = await DataStore.query(Post, (p) => p.and(p => [
          p.link.contains(linkRef.current.value),
          p.country.contains(countryRef.current.value),
          p.date.le(dateToRef.current.value),
        ]))

        console.log('link and country and dateTo not empty')
       }else if(
       titleRef.current.value == '' && 
       linkRef.current.value != "" &&
       descRef.current.value != "" &&
       dateFromRef.current.value == "" &&
       dateToRef.current.value != "" &&
       countryRef.current.value == ""
       ){
        posts = await DataStore.query(Post, (p) => p.and(p => [
          p.link.contains(linkRef.current.value),
          p.body.contains(descRef.current.value),
          p.date.le(dateToRef.current.value),
        ]))
        console.log('link and desc and dateTo not empty')
       }else if(
       titleRef.current.value == '' && 
       linkRef.current.value != "" &&
       descRef.current.value != "" &&
       dateFromRef.current.value != "" &&
       dateToRef.current.value == "" &&
       countryRef.current.value == ""
       ){
        posts = await DataStore.query(Post, (p) => p.and(p => [
          p.link.contains(linkRef.current.value),
          p.body.contains(descRef.current.value),
          p.date.ge(dateFromRef.current.value),
        ]))
        console.log('link and desc and dateFrom not empty')
       }else if(
       titleRef.current.value == '' && 
       linkRef.current.value != "" &&
       descRef.current.value != "" &&
       dateFromRef.current.value != "" &&
       dateToRef.current.value != "" &&
       countryRef.current.value == ""
       ){
        posts = await DataStore.query(Post, (p) => p.and(p => [
          p.link.contains(linkRef.current.value),
          p.body.contains(descRef.current.value),
          p.date.le(dateToRef.current.value),
          p.date.ge(dateFromRef.current.value),
        ]))
        console.log('link and desc and dateTo and dateFrom not empty')
       }
       else if(
       titleRef.current.value == '' && 
       linkRef.current.value != "" &&
       descRef.current.value != "" &&
       dateFromRef.current.value == "" &&
       dateToRef.current.value != "" &&
       countryRef.current.value != ""
       ){
        posts = await DataStore.query(Post, (p) => p.and(p => [
          p.link.contains(linkRef.current.value),
          p.body.contains(descRef.current.value),
          p.country.contains(countryRef.current.value),
          p.date.le(dateToRef.current.value),
        ]))
        console.log('link and desc and country and dateTo not empty')
       }else if(
       titleRef.current.value != '' && 
       linkRef.current.value == "" &&
       descRef.current.value == "" &&
       dateFromRef.current.value == "" &&
       dateToRef.current.value != "" &&
       countryRef.current.value != ""
       ){
        posts = await DataStore.query(Post, (p) => p.and(p => [
          p.title.contains(titleRef.current.value),
          p.country.contains(countryRef.current.value),
          p.date.le(dateToRef.current.value),
        ]))
        console.log('title and country and dateTo not empty')
       }else if(
       titleRef.current.value != '' && 
       linkRef.current.value == "" &&
       descRef.current.value != "" &&
       dateFromRef.current.value == "" &&
       dateToRef.current.value != "" &&
       countryRef.current.value == ""
       ){
        posts = await DataStore.query(Post, (p) => p.and(p => [
          p.title.contains(titleRef.current.value),
          p.body.contains(descRef.current.value),
          p.date.le(dateToRef.current.value),
        ]))
        console.log('title and desc and dateTo not empty')
       }else if(
       titleRef.current.value != '' && 
       linkRef.current.value == "" &&
       descRef.current.value != "" &&
       dateFromRef.current.value != "" &&
       dateToRef.current.value == "" &&
       countryRef.current.value == ""
       ){
        posts = await DataStore.query(Post, (p) => p.and(p => [
          p.title.contains(titleRef.current.value),
          p.body.contains(descRef.current.value),
          p.date.ge(dateFromRef.current.value),
        ]))
        console.log('title and desc and dateFrom not empty')
       }
       else if(
       titleRef.current.value != '' && 
       linkRef.current.value == "" &&
       descRef.current.value != "" &&
       dateFromRef.current.value != "" &&
       dateToRef.current.value != "" &&
       countryRef.current.value == ""
       ){
        posts = await DataStore.query(Post, (p) => p.and(p => [
          p.title.contains(titleRef.current.value),
          p.body.contains(descRef.current.value),
          p.date.le(dateToRef.current.value),
          p.date.ge(dateFromRef.current.value),
        ]))
        console.log('title and desc and dateFrom and dateTo not empty')
       }else if(
       titleRef.current.value != '' && 
       linkRef.current.value == "" &&
       descRef.current.value != "" &&
       dateFromRef.current.value == "" &&
       dateToRef.current.value != "" &&
       countryRef.current.value != ""
       ){
        posts = await DataStore.query(Post, (p) => p.and(p => [
          p.title.contains(titleRef.current.value),
          p.body.contains(descRef.current.value),
          p.country.contains(countryRef.current.value),
          p.date.le(dateToRef.current.value),
        ]))
        console.log('title and desc and country and dateTo not empty')
       }else if(
       titleRef.current.value != '' && 
       linkRef.current.value != "" &&
       descRef.current.value == "" &&
       dateFromRef.current.value == "" &&
       dateToRef.current.value != "" &&
       countryRef.current.value == ""
       ){
        posts = await DataStore.query(Post, (p) => p.and(p => [
          p.title.contains(titleRef.current.value),
          p.link.contains(linkRef.current.value),
          p.date.le(dateToRef.current.value),
        ]))
        console.log('title and link and dateTo not empty')
       }else if(
       titleRef.current.value != '' && 
       linkRef.current.value != "" &&
       descRef.current.value == "" &&
       dateFromRef.current.value != "" &&
       dateToRef.current.value == "" &&
       countryRef.current.value == ""
       ){
        posts = await DataStore.query(Post, (p) => p.and(p => [
          p.title.contains(titleRef.current.value),
          p.link.contains(linkRef.current.value),
          p.date.ge(dateFromRef.current.value),
        ]))
        console.log('title and link and dateFrom not empty')
       }else if(
       titleRef.current.value != '' && 
       linkRef.current.value != "" &&
       descRef.current.value == "" &&
       dateFromRef.current.value != "" &&
       dateToRef.current.value != "" &&
       countryRef.current.value == ""
       ){
        posts = await DataStore.query(Post, (p) => p.and(p => [
          p.title.contains(titleRef.current.value),
          p.link.contains(linkRef.current.value),
          p.date.le(dateToRef.current.value),
          p.date.ge(dateFromRef.current.value),
        ]))
        console.log('title and link and dateFrom and dateTo not empty')
       }else if(
       titleRef.current.value != '' && 
       linkRef.current.value != "" &&
       descRef.current.value == "" &&
       dateFromRef.current.value == "" &&
       dateToRef.current.value == "" &&
       countryRef.current.value != ""
       ){
        posts = await DataStore.query(Post, (p) => p.and(p => [
          p.title.contains(titleRef.current.value),
          p.link.contains(linkRef.current.value),
          p.country.contains(countryRef.current.value),
        ]))
        console.log('title and link and country not empty')
       }else if(
       titleRef.current.value != '' && 
       linkRef.current.value != "" &&
       descRef.current.value == "" &&
       dateFromRef.current.value == "" &&
       dateToRef.current.value != "" &&
       countryRef.current.value != ""
       ){
        posts = await DataStore.query(Post, (p) => p.and(p => [
          p.title.contains(titleRef.current.value),
          p.link.contains(linkRef.current.value),
          p.country.contains(countryRef.current.value),
          p.date.le(dateToRef.current.value),
        ]))
        console.log('title and link and country and dateTo not empty')
       }else if(
       titleRef.current.value != '' && 
       linkRef.current.value != "" &&
       descRef.current.value == "" &&
       dateFromRef.current.value != "" &&
       dateToRef.current.value == "" &&
       countryRef.current.value != ""
       ){
        posts = await DataStore.query(Post, (p) => p.and(p => [
          p.title.contains(titleRef.current.value),
          p.link.contains(linkRef.current.value),
          p.country.contains(countryRef.current.value),
          p.date.ge(dateFromRef.current.value),
        ]))
        console.log('title and link and country and dateFrom not empty')
       }else if(
       titleRef.current.value != '' && 
       linkRef.current.value != "" &&
       descRef.current.value == "" &&
       dateFromRef.current.value != "" &&
       dateToRef.current.value != "" &&
       countryRef.current.value != ""
       ){
        posts = await DataStore.query(Post, (p) => p.and(p => [
          p.title.contains(titleRef.current.value),
          p.link.contains(linkRef.current.value),
          p.country.contains(countryRef.current.value),
          p.date.le(dateToRef.current.value),
          p.date.ge(dateFromRef.current.value),
        ]))
        console.log('title and link and country and dateFrom and dateTo not empty')
       }else if(
       titleRef.current.value != '' && 
       linkRef.current.value != "" &&
       descRef.current.value != "" &&
       dateFromRef.current.value != "" &&
       dateToRef.current.value != "" &&
       countryRef.current.value == ""
       ){
        posts = await DataStore.query(Post, (p) => p.and(p => [
          p.title.contains(titleRef.current.value),
          p.link.contains(linkRef.current.value),
          p.body.contains(descRef.current.value),
          p.date.le(dateToRef.current.value),
          p.date.ge(dateFromRef.current.value),
        ]))
        console.log('title and link and desc and dateFrom and dateTo not empty')
       }else if(
       titleRef.current.value != '' && 
       linkRef.current.value != "" &&
       descRef.current.value != "" &&
       dateFromRef.current.value != "" &&
       dateToRef.current.value == "" &&
       countryRef.current.value == ""
       ){
        posts = await DataStore.query(Post, (p) => p.and(p => [
          p.title.contains(titleRef.current.value),
          p.link.contains(linkRef.current.value),
          p.body.contains(descRef.current.value),
          p.date.ge(dateFromRef.current.value),
        ]))
        console.log('title and link and desc and dateFrom not empty')
       }else if(
       titleRef.current.value != '' && 
       linkRef.current.value != "" &&
       descRef.current.value != "" &&
       dateFromRef.current.value == "" &&
       dateToRef.current.value != "" &&
       countryRef.current.value == ""
       ){
        posts = await DataStore.query(Post, (p) => p.and(p => [
          p.title.contains(titleRef.current.value),
          p.link.contains(linkRef.current.value),
          p.body.contains(descRef.current.value),
          p.date.le(dateToRef.current.value),
        ]))
        console.log('title and link and desc and dateTo not empty')
       }else if(
       titleRef.current.value != '' && 
       linkRef.current.value != "" &&
       descRef.current.value != "" &&
       dateFromRef.current.value == "" &&
       dateToRef.current.value != "" &&
       countryRef.current.value != ""
       ){
        posts = await DataStore.query(Post, (p) => p.and(p => [
          p.title.contains(titleRef.current.value),
          p.link.contains(linkRef.current.value),
          p.body.contains(descRef.current.value),
          p.country.contains(countryRef.current.value),
          p.date.le(dateToRef.current.value),
        ]))
        console.log('title and link and desc and country and dateTo not empty')
       }else {
        posts = await DataStore.query(Post,Predicates.ALL,{
            sort: (post) => post.updatedAt("DESCENDING"),
        });
        console.log('all empty')
       }
 
    setPosts(posts);
}
  const changeGrid = (e) =>{
    setGridTemplate(`repeat(${e.target.innerText}, 1fr)`)
  }

  return (
    <>
      <Flex as='form' direction='raw' onSubmit={handleSubmit} boxShadow={'large'}  alignItems='center' padding='xl' width={'100%'}>
        <Flex justifyContent={'space-between'} width={'100%'}>
            <Flex>
        <Flex direction={'column'}>
          <Label>Title</Label>
            <Input placeholder="Search by title" ref={titleRef}/>
        </Flex>
        <Flex direction={'column'}>
          <Label>Link</Label>
            <Input placeholder="Search by link"  ref={linkRef}/>
        </Flex>
        <Flex direction={'column'}>
          <Label>Description</Label>
            <Input placeholder="Search by description"  ref={descRef}/>
        </Flex>
        <Flex direction={'column'}>
          <Label>Country</Label>
          {/*<SearchField */}
          {/*  label="Search by country"*/}
          {/*  placeholder="Search by country code"*/}
          {/*  ref={countryRef}*/}
          {/*  hasSearchButton={false}*/}
          {/*/>*/}
            <Input placeholder="Search by country code"  ref={countryRef}/>
        </Flex>
        <TextField type='date'
          label="Date from"
          placeholder="Date from" 
          ref={dateFromRef}
          justifyContent={'space-between'}
        />
        <TextField type='date'
          label="Date to"
          placeholder="Date from" 
          ref={dateToRef}
          justifyContent={'space-between'}
        />
            </Flex>
            <Flex>
       <Button type='submit'>Search</Button>
       <Button  onClick={() => {
           clearHandler();
           setTimeout(()=> {
                  clearFilter();
               }
               ,100);
       }} >Clear</Button>
            </Flex>
          </Flex>
      </Flex>
      <Flex boxShadow={'large'} direction='column' padding='xl' backgroundColor="background.secondary" grow={'1'} paddingBottom='5px' width={'100%'}>
        <Flex boxShadow={'medium'} padding={'xs'}  position={'absolute'} bottom={'32px'} right={'32px'} backgroundColor={'#fff'}><Button backgroundColor={'#fff '} onClick={(e) => changeGrid(e)}>4</Button><Button backgroundColor={'#fff'} onClick={(e) => changeGrid(e)}>6</Button><Button backgroundColor={'#fff'} onClick={(e) => changeGrid(e)}>8</Button></Flex>
        <Collection items={posts} type="grid" templateColumns={gridTemplate} gap='xl' isPaginated itemsPerPage={10} >
          {
            (item,index) => (
              <PostCard post={item} key={index} />
            )
          }
        </Collection>
      </Flex>
    </>
  )
}


