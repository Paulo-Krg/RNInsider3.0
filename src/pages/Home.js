import React, { useState } from 'react';
import { TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform, Modal, ActivityIndicator, TouchableOpacity } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

import StatusBarPage from '../components/StatusBarPage';
import Menu from '../components/Menu';
import ModalLink from '../components/ModalLink';

import { Feather } from '@expo/vector-icons';
import { ContainerLogo, Logo, ContainerContent, Title, SubTitle, ContainerInput, IconLeft, IconRight, Input, ButtonLink, ButtonLinkText } from './HomeStyles';

import api from '../services/api';
import { saveLink } from '../utils/storeLinks';

export default function Home() {

    const [input, setInput] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({});

    async function handleShortLink() {
        // alert('URL digitada: ' + input);
        // setModalVisible(true);

        setLoading(true);
        try {
            let aux = "https://";

            if ((input.substring(0, 8) != "https://") && input.substring(0, 7) != "http://") {
                aux = aux.concat(input);
                // console.log("não tem https://\n\tinput = " + input + "\n\taux = " + aux);
            } else {
                // console.log("já tem https://");
                aux = input;
            }

            const response = await api.post('/shorten', {
                long_url: aux,
            })

            setData(response.data);
            setModalVisible(true);

            // salvar dados no async storage
            saveLink('sujeitolinks', response.data);

            Keyboard.dismiss();
            setLoading(false);
            setInput('');   // limpar automaticamente o input

        } catch (error) {
            console.log(error.message);
            alert('Ops, parece que algo deu errado!');
            Keyboard.dismiss();
            setLoading(false);

            // setInput('');   // limpar automaticamente o input
        }
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <LinearGradient
                colors={['#1ddbb9', '#132742']}
                style={{ flex: 1, justifyContent: 'center' }}
            >

                <StatusBarPage
                    barStyle="light-content"
                    backgroundColor="#1ddbb9"
                />

                <Menu />

                <KeyboardAvoidingView
                    behavior={Platform.OS === 'android' ? 'padding' : 'position'}
                    enabled={true}
                >

                    <ContainerLogo>
                        <Logo source={require('../images/Logo.png')} resizeMode="contain" />
                    </ContainerLogo>

                    <ContainerContent>
                        <Title>Sujeito Link</Title>
                        <SubTitle>Cole seu link para encurtar</SubTitle>

                        <ContainerInput>
                            <IconLeft>
                                <Feather name="link" size={22} color="#FFF" />
                            </IconLeft>
                            <Input
                                placeholder="Cole seu link aqui..."
                                placeholderTextColor="rgba(255, 255, 255, 0.40)"
                                autoCapitalize="none"
                                autoCorrect={false}
                                selectionColor="rgba(255,255,255,0.7)"
                                keyboardType="url"
                                value={input}
                                onChangeText={(text) => setInput(text)}
                            />

                            <IconRight>
                                <TouchableOpacity onPress={() => setInput('') }>
                                    <Feather name="x" size={22} color="#FFF" />
                                </TouchableOpacity>
                            </IconRight>

                        </ContainerInput>

                        <ButtonLink onPress={handleShortLink} >
                            {
                                loading ? (
                                    <ActivityIndicator color="#121212" size={24} />
                                ) : (
                                    <ButtonLinkText>Gerar Link</ButtonLinkText>
                                )
                            }
                        </ButtonLink>
                    </ContainerContent>

                </KeyboardAvoidingView>

                <Modal
                    visible={modalVisible}
                    transparent
                    animationType="slide"
                >
                    <ModalLink onClose={() => setModalVisible(false)} data={data} />
                </Modal>

            </LinearGradient>
        </TouchableWithoutFeedback >
    )
}