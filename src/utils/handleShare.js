import React from 'react';
import { Share } from 'react-native';

async function handleShare(data) {
    try {
        // console.log(data);

        const result = await Share.share({
            message: `Link: ${data.link}`
        });

        if (result.action === Share.sharedAction) {
            if (result.activityType) {
                console.log('ActivityType');
            } else {
                //compartilhou
                console.log('Compartilhado com sucesso!');
            }
        } else if (result.action === Share.dismissedAction) {
            console.log('Modal fechado')
        }

    } catch (error) {
        console.log(error.message);
    }

    return;
}

export default handleShare;