import React from 'react';
import { View } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import { Feather, Ionicons } from '@expo/vector-icons';

import { ContainerButton, Item, ActionContainerRight, ActionContainerLeft } from './ListItemStyles';

export default function ListItem({ data, handleItem, confirmDelete, handleWebViewItem }) {

    function RightActions() {
        return (
            <ActionContainerRight onPress={() => confirmDelete(data.id)}>
                <Feather
                    name="trash"
                    color="#FFF"
                    size={24}
                />
            </ActionContainerRight>
        );
    }

    function LeftActions() {
        return (
            <ActionContainerLeft onPress={() => handleWebViewItem(data.link)}>
                <Ionicons
                    name="open-outline"
                    color="#FFF"
                    size={24} />
            </ActionContainerLeft>
        );
    }

    return (
        <View>
            <Swipeable renderRightActions={RightActions}
                renderLeftActions={LeftActions}>
                <ContainerButton activeOpacity={0.6} onPress={() => handleItem(data)} >
                    <Feather
                        name="link"
                        color="#FFF"
                        size={24}
                    />
                    <Item>{data.long_url}</Item>
                </ContainerButton>
            </Swipeable>
        </View>
    )
}