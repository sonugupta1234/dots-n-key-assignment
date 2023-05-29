
import axios from 'axios'
import { Box, Grid, GridItem, Heading, Image, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

export const GridLayout = () => {

    const [data,setData]=useState([])


    

    useEffect(()=>{
        axios.get('https://products-n5y0.onrender.com/photos')
        .then((res)=>setData(res.data))
        .catch((err)=>console.log(err))
        
    },[])
  return (
    <Box>
        <Heading>Grid Layout</Heading>
        <Box>
      <Grid gridTemplateColumns={'repeat(3,1fr)'} gap="5px">
        {data?.map((el,i)=>{
            return  <>
            <GridItem mt={10}>
                <Image src={el.url} alt=""/>
                <Text>Title:- {el.title}</Text>
            </GridItem>
            
            </>
        })}
      </Grid>
      </Box>
    </Box>
  )
}
