import AsyncStorage from '@react-native-async-storage/async-storage';

// Buscar os links salvos
export async function getLinksSave(key){
    const myLinks = await AsyncStorage.getItem(key);

    let linkSaves = JSON.parse(myLinks) || [];

    return linkSaves;
}

// Salvar um link no storage
export async function saveLink(key, newLink){
    let linksStored = await getLinksSave(key);

    //Verificar se há um link igual já salvo na lista
    const hasLink = linksStored.some(link => link.id === newLink.id);

    if (hasLink){
        console.log('ESSE LINK JA EXISTE NA LISTA.')
        return;
    }

    linksStored.push(newLink);
    await AsyncStorage.setItem(key, JSON.stringify(linksStored));
    console.log('LINK SALVO COM SUCESSO!')
}

// Deletar algum link especifico
export async function deleteLink(links, id){
    let myLinks = links.filter( (item) => {
        return (item.id !== id)
    });

    await AsyncStorage.setItem('1', JSON.stringify(myLinks));

    console.log('LINK DELETADO');

    return myLinks;
}
