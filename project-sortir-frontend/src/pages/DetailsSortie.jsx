/* eslint-disable no-unused-vars */

/* eslint-disable react/no-unescaped-entities */

import { useEffect, useState } from "react";
import { format } from "date-fns";
import fr from 'date-fns/locale/fr';
import serviceSortie from "../services/serviceSortie.js";

import {
    Avatar,
    Badge,
    Box, Button,
    Center,
    Flex,
    Grid, GridItem,
    Heading, Link,
    List,
    ListIcon,
    ListItem, Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Spinner,
    Text, useDisclosure,
} from "@chakra-ui/react";

import {Link as RouterLink, useParams} from "react-router-dom"
import Loading from "../components/Loading.jsx";
import MapComponent2 from "../components/MapComponent2.jsx";

const DetailsSortie = () => {

    const id = useParams().id;
    const [sortie, setSortie] = useState(null);
    const [nomSortie, setNomSortie] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        const fetchSortie = async () => {
            try {
                const sortie = await serviceSortie.getSortie(id);
                console.log(sortie)
                if (sortie) {
                    setSortie(sortie);
                    setNomSortie(sortie.nom);
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des détails de la sortie :", error);
            }
        };
        fetchSortie();
    }, []); // Dépendances vides pour exécuter une fois

    function useDocumentTitle(title) {
        useEffect(() => {
            document.title = title;
        }, [title]);
    }
    useDocumentTitle('Golaf! | '+nomSortie)

    if (!sortie) {
        return (
            <div>
                <Loading/>
            </div>
        );
    }

    return (


        <div>
            <Center mb="6">
                <Heading fontWeight='extrabold' as='h1' size='3xl' color="teal.500">Détails</Heading>
            </Center>

            <Center >
                <Box mb={5} minW="1000px" minH="auto"  borderRadius="lg" overflow="hidden" p={4} bg="gray.50"
                     boxShadow="dark-lg" borderColor='teal.500' borderWidth="5px">
                    <Box p={6}>
                        <Heading fontWeight='extrabold' size="xl" my={4} color="teal.500">
                            {sortie.nom}
                        </Heading>

                        <Grid templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)"]} gap={10} alignItems="start">
                            <Flex direction="column" align="center" justify="center" height="100%">
                            <Box maxWidth={750}>
                                <Text fontSize='2xl' mb="3" color="gray.700">Date & Heure de la sortie : <Box as="span"
                                                                                                              fontWeight="bold">{format(sortie.dateHeureDebut, "d MMMM yyyy à HH:mm", {locale: fr})}</Box></Text>
                                <Text fontSize='2xl' mb="3" color="gray.700">Date limite d'inscription : <Box as="span"
                                                                                                              fontWeight="bold">{format(sortie.dateLimiteInscription, "d MMMM yyyy à HH:mm", {locale: fr})}</Box></Text>
                                <Text fontSize='2xl' mb="3" color="gray.700">Nombre de places : <Box as="span"
                                                                                                     fontWeight="bold">{sortie.nbInscriptionMax} ({sortie.nbInscriptionMax-sortie.participants.length} restante(s))</Box></Text>
                                <Text fontSize='2xl' mb="3" color="gray.700">Durée : <Box as="span"
                                                                                          fontWeight="bold">{sortie.duree} minutes</Box></Text>
                                <Text fontSize='2xl' mb="3" color="gray.700">Informations supplémentaires : <Box as="span"
                                                                                                                 fontWeight="bold">{sortie.description}</Box></Text>
                                <Text fontSize='2xl' mb="3" color="gray.700">Organisateur : <Box as="span"
                                                                                                 fontWeight="bold">{sortie.organisateur.nom}</Box></Text>
                            </Box>
                            </Flex>
                            <Flex direction="column" align="center" justify="center" height="100%">
                            <Box maxWidth={750}>
                                <Text fontSize='2xl' mb="3" color="gray.700">Campus : <Box as="span" fontWeight="bold">{sortie.campus}</Box></Text>
                                <Text fontSize='2xl' mb="3" color="gray.700">Lieu : <Box as="span" fontWeight="bold">{sortie.lieu}</Box></Text>
                                <Text fontSize='2xl' mb="3" color="gray.700">Rue : <Box as="span" fontWeight="bold">{sortie.rue}</Box></Text>
                                <Text fontSize='2xl' mb="3" color="gray.700">Code postal : <Box as="span" fontWeight="bold">{sortie.codePostal}, {sortie.ville}</Box></Text>
                                <Text fontSize='2xl' mb="3" color="gray.700">Latitude : <Box as="span" fontWeight="bold">{sortie.latitude}</Box></Text>
                                <Text fontSize='2xl' mb="3" color="gray.700">Longitude : <Box as="span" fontWeight="bold">{sortie.longitude}</Box></Text>

                                <GridItem colStart={3}>
                                    <Button fontWeight='extrabold'  fontSize='2xl' onClick={onOpen} colorScheme="teal">Afficher sur la carte</Button>

                                    <Modal isOpen={isOpen} onClose={onClose} size='4xl'>
                                        <ModalOverlay bg='none'
                                                      backdropFilter='auto'
                                                      backdropBlur='5px'/>
                                        <ModalContent>
                                            <ModalCloseButton/>
                                            <Center>
                                                <ModalBody >
                                                    <Flex direction="column" align="center" justify="center" height="100%">
                                                        <MapComponent2 longitude={sortie.longitude} latitude={sortie.latitude}/>
                                                    </Flex>
                                                </ModalBody>
                                            </Center>
                                            <ModalFooter>
                                                <Button colorScheme="teal.500" mr={3} onClick={onClose}>
                                                    Fermer
                                                </Button>
                                            </ModalFooter>
                                        </ModalContent>
                                    </Modal>
                                </GridItem>
                            </Box>
                            </Flex>
                        </Grid>
                    </Box>
                </Box>
            </Center>
            <Grid
                templateColumns={["repeat(1, 1fr)", "repeat(3, 1fr)"]}
                gap={6}

                p="5"
                ml="39em"
                >

                <GridItem colSpan={[3, 2]}>
                    <Box
                    boxShadow="xl"
                    p="6"
                    rounded="md"
                    bg="white"
                    >
                    <Heading
                        as="h2"
                        size="2xl"
                        mb="4"
                        textAlign="center"
                        color="teal.500"
                        fontWeight='extrabold'
                    >
                        Participants de la sortie : {sortie.nom}
                    </Heading>
                    <Center>
                        <List
                            spacing={3}
                            borderRadius="md"
                            mt="3em"
                        >
                            {sortie.participants.map((participant, index) => (

                            <ListItem
                                key={index}
                                p="2"
                                ml="5"
                                mr="5"
                                mb="2"
                                fontWeight="extrabold"
                                fontSize="2xl"
                                border="1px"
                                borderColor="gray.200"
                                borderRadius="md"
                                boxShadow="base"
                                bg="white"
                            >
                                <Center key={index}>
                                    <Flex align="center">
                                        <Avatar name={sortie.organisateur.nom} src={`http://localhost:8000/getimage/${participant.image}`}/>
                                        <Text ml={5}><Link as={RouterLink} to={`/profile/${participant.id}`}>{participant.nom}</Link></Text>
                                    </Flex>
                                </Center>
                            </ListItem>
                            ))}
                        </List>
                        </Center>
                    </Box>
                </GridItem>
                </Grid>
        </div>
    )
};

export default DetailsSortie;