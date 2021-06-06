import React from 'react';
import { View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';

import { ModalContainer, Container, Header, LinkArea, Title, LongUrl, ShortLinkArea, ShortLinkUrl } from './ModalLinkStyles';
import { Feather } from '@expo/vector-icons';
import Clipboard from 'expo-clipboard';

import handleShare from '../utils/handleShare';

export default function ModalLink({ onClose, data }) {

    function copyLink() {
        Clipboard.setString(data.link);
        alert('Link copiado com sucesso!');
    }

    return (
        <ModalContainer>
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={{ flex: 1 }}></View>
            </TouchableWithoutFeedback>

            <Container>

                <Header>
                    <TouchableOpacity onPress={onClose}>
                        <Feather
                            name="x"
                            color="#212743"
                            size={30}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleShare(data)}>
                        <Feather
                            name="share"
                            color="#212743"
                            size={30}
                        />
                    </TouchableOpacity>
                </Header>

                <LinkArea>
                    <Title>Link encurtado</Title>
                    <LongUrl
                    // numberOfLines={1}    // exibir apenas 1 linha
                    >
                        {data.long_url}
                    </LongUrl>

                    <ShortLinkArea
                        activeOpacity={0.6}
                        onPress={copyLink}
                    >
                        <ShortLinkUrl
                            numberOfLines={1}
                        >
                            {data.link}
                        </ShortLinkUrl>
                        <TouchableOpacity onPress={copyLink}>
                            <Feather
                                name="copy"
                                color="#FFF"
                                size={25}
                            />
                        </TouchableOpacity>
                    </ShortLinkArea>
                </LinkArea>

            </Container>
        </ModalContainer>
    )
}