import React, { useEffect, useState } from 'react'
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Box,
    Heading,
    Button,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Input,
    FormControl,
    FormLabel
  } from '@chakra-ui/react'
// import axios from 'axios'

export const PostTable = () => {

    const [data,setData]=useState([])
    const [id,setId]=useState(0)
    const [editid,setEditId]=useState(0)
    const [title,setTitle]=useState("")
    const [userid,setUserId]=useState(0)
    const [body,setBody]=useState("")
    const [page,setPage]=useState(1)
    const { isOpen, onOpen, onClose } = useDisclosure()

    const { 
      isOpen: isOpenModal, 
      onOpen: onOpenModal, 
      onClose: onCloseModal
     } = useDisclosure()


     const { 
      isOpen: isOpenPostModal, 
      onOpen: onOpenPostModal, 
      onClose: onClosePostModal
     } = useDisclosure()



    const getdata=async()=>{
       try {
         const response=await fetch(`https://products-n5y0.onrender.com/posts?_page=${page}&_limit=10`)
         const mydata=await response.json()
         console.log(mydata)
         setData(mydata)
       } catch (error) {
         console.log(error)
       }
    }

    const handleDelete=async(id)=>{
        try {
           const response=await fetch(`https://products-n5y0.onrender.com/posts/${id}`,{
            method: 'DELETE'
           }) 
           const mydata=await response.json()
           getdata()
        } catch (error) {
            console.log(error)
        }
    }

    const handlePatch=async()=>{
      const edit_body={
        title,
        body
      }
      try {
        const response=await fetch(`https://products-n5y0.onrender.com/posts/${editid}`,{
        method: 'PATCH',
        body: JSON.stringify(edit_body),
        headers: {
          'Content-Type': 'application/json'
        }})
        const mydata=await response.json()
        getdata()
      } catch (error) {
        console.log(error)
      }
    }
    
    const handlePost=async()=>{

      const post_body={
        userid,
        title,
        body
      }
      try {
        const response=await fetch(`https://products-n5y0.onrender.com/posts`,{
        method: 'POST',
        body: JSON.stringify(post_body),
        headers: {
          'Content-Type': 'application/json'
        }})
        const mydata=await response.json()
        getdata()
      } catch (error) {
        console.log(error)
      }

    }

  useEffect(()=>{
    getdata()
  },[page])
  return (
    <Box>
        <Heading>Post List</Heading>
        <Button onClick={onOpenPostModal}>Add New</Button>
        <Table variant='striped'>
                <Thead>
                    <Tr width="100%">
                        <Th>Id</Th>
                        <Th>Title</Th>
                        <Th>Body</Th>
                        <Th>Action</Th>
                    </Tr>
                </Thead>
            <Tbody>
               {data?.map((el,i)=>{
                return <Tr>
                    <Td>{el.id}</Td>
                    <Td>{el.title}</Td>
                    <Td>{el.body}</Td>
                    <Td onClick={()=>{setEditId(el.id);onOpenModal()}} cursor="pointer">Edit</Td>
                    <Td onClick={()=>{setId(el.id);onOpen()}} cursor="pointer">Delete</Td>
                </Tr>




               })}
            </Tbody>
        </Table>
        <Button onClick={()=>setPage(page-1)} isDisabled={page===1} backgroundColor={'aqua'}>Prev</Button>
        <Button onClick={()=>setPage(page+1)} backgroundColor={'aqua'} ml={6} isDisabled={page===10}>Next</Button>



        <AlertDialog
isOpen={isOpen}
onClose={onClose}
>
<AlertDialogOverlay>
  <AlertDialogContent>
    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
      Confirmation
    </AlertDialogHeader>

    <AlertDialogBody>
      Are you sure you want to delete this post ?
    </AlertDialogBody>

    <AlertDialogFooter>
      <Button  onClick={onClose}>
        No
      </Button>
      <Button colorScheme='red' onClick={()=>{handleDelete(id); onClose()}} ml={3}>
        Yes
      </Button>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialogOverlay>
</AlertDialog>





<Modal
        isOpen={isOpenModal}
        onClose={onCloseModal}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Manage Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input  placeholder='Enter Post Title' onChange={(e)=>setTitle(e.target.value)}/>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Body</FormLabel>
              <Input placeholder='Enter Post body'  onChange={(e)=>setBody(e.target.value)}/>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={()=>{handlePatch();onCloseModal()}}>
              Save
            </Button>
            <Button onClick={onCloseModal}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>








      <Modal
        isOpen={isOpenPostModal}
        onClose={onClosePostModal}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Manage Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
          <FormControl>
              <FormLabel>User Id</FormLabel>
              <Input  placeholder='Enter UserId' type="number" onChange={(e)=>setUserId(e.target.value)}/>
            </FormControl>

            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input  placeholder='Enter Post Title' onChange={(e)=>setTitle(e.target.value)}/>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Body</FormLabel>
              <Input placeholder='Enter Post body'  onChange={(e)=>setBody(e.target.value)}/>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={()=>{handlePost();onClosePostModal()}}>
              Save
            </Button>
            <Button onClick={onClosePostModal}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>


 </Box>




  )


  
  
}
