import React, { useState, useEffect } from 'react';
import { Modal, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import WebView from 'react-native-webview';

import { Feather } from '@expo/vector-icons';

import { Container, Title, ListLinks, ContainerEmpty, WarningText, WebViewHeader, LinkText } from './MyLinksStyles';

import Menu from '../components/Menu';
import ListItem from '../components/ListItem';
import StatusBarPage from '../components/StatusBarPage';
import ModalLink from '../components/ModalLink';

import { getLinksSave, deleteLink } from '../utils/storeLinks';
import handleShare from '../utils/handleShare';

export default function MyLinks() {
    const isFocused = useIsFocused();

    const [links, setLinks] = useState([]);
    const [data, setData] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const [webViewVisible, setWebViewVisible] = useState(false);
    const [uri, setUri] = useState('');

    useEffect(() => {
        async function getLinks() {
            const result = await getLinksSave('sujeitolinks');
            setLinks(result);
            setLoading(false);
        }

        getLinks();

    }, [isFocused]);

    function handleItem(item) {
        // console.log(item);
        setData(item);
        setModalVisible(true);
    }

    function handleWebViewItem(item) {
        // console.log("item = " + item);
        setUri(item);
        setWebViewVisible(true);
    }

    function confirmDelete(id) {
        Alert.alert(
            "Excluir link?",
            "",
            [
                {
                    text: "Cancelar",
                    // onPress: () => console.log("Cancel Pressed"),
                },
                {
                    text: "OK",
                    onPress: () => { handleDelete(id) },
                }
            ]
        );
    }

    async function handleDelete(id) {
        //console.log('item deletado: ' + id);
        const result = await deleteLink(links, id);
        setLinks(result);
    }

    return (
        <Container>
            <StatusBarPage
                barStyle="light-content"
                backgroundColor="#132742"
            />
            { !webViewVisible ?
                <>
                    <Menu />

                    <Title>Meus Links</Title>

                    { loading && (
                        <ActivityIndicator color='#FFF' size={25} />
                    )}

                    {!loading && links.length === 0 && (
                        <ContainerEmpty>
                            <WarningText>Você não possui nenhum link :(</WarningText>
                        </ContainerEmpty>
                    )}

                    <ListLinks
                        data={links}
                        keyExtractor={(item) => String(item.id)}
                        renderItem={({ item }) =>
                            <ListItem
                                data={item}
                                handleItem={handleItem}
                                confirmDelete={confirmDelete}
                                handleWebViewItem={handleWebViewItem}
                            />}
                        contentContainerStyle={{ paddingBottom: 25 }}
                        showsVerticalScrollIndicator={false}
                    />
                </>
                :
                <>
                    <WebViewHeader>
                        <TouchableOpacity onPress={() => setWebViewVisible(false)} >
                            <Feather
                                name="x"
                                color="#F00"
                                size={40}
                            />
                        </TouchableOpacity>
                        <LinkText>
                            {uri}
                        </LinkText>
                        <TouchableOpacity onPress={() => handleShare(data)}>
                            <Feather
                                name="share"
                                color="#FFF"
                                size={30}
                            />
                        </TouchableOpacity>
                    </WebViewHeader>

                    <WebView
                        source={{ uri: uri }}
                    />
                </>
            }

            <Modal
                visible={modalVisible}
                transparent
                animationType="slide"
            >
                <ModalLink onClose={() => setModalVisible(false)} data={data} />
            </Modal>

        </Container>
    )
}